/**
 * GET  /api/admin/staff/attendance/regularize — List all pending regularization requests
 * PUT  /api/admin/staff/attendance/regularize — Approve or reject a specific request
 * Sends email notification to staff member after decision.
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, parseBody } from "@/lib/api-helpers";
import {
  sendRegularizationApprovedEmail,
  sendRegularizationRejectedEmail,
} from "@/lib/email-templates";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "admin") return err("Admin access required", 403);

  try {
    const records = await db.attendance.findMany({
      where: {
        notes: { startsWith: "PENDING_REGULARIZATION:" }
      },
      orderBy: { date: "desc" }
    });

    const userIds = [...new Set(records.map((r) => r.staffUserId))];
    const profiles = await db.profile.findMany({
      where: { userId: { in: userIds } },
      select: { userId: true, fullName: true, avatar: true }
    });
    const profileMap = new Map(profiles.map((p) => [p.userId, p]));

    return ok(
      records.map((r) => {
        let reqData = null;
        try {
          const raw = r.notes?.replace("PENDING_REGULARIZATION:", "") || "";
          reqData = JSON.parse(raw);
        } catch {}

        return {
          id: r.id,
          date: r.date.toISOString(),
          notes: r.notes,
          staffUserId: r.staffUserId,
          staffName: profileMap.get(r.staffUserId)?.fullName || "Unknown Staff",
          staffAvatar: profileMap.get(r.staffUserId)?.avatar || null,
          reqData
        };
      })
    );
  } catch (e) {
    console.error("Fetch regularizations error:", e);
    return err("Failed to fetch regularization requests", 500);
  }
}

export async function PUT(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "admin") return err("Admin access required", 403);

  const body = await parseBody<Record<string, unknown>>(req);
  if (body instanceof Response) return body;
  const b = body as Record<string, unknown>;

  const id = b.id as string;
  const action = b.action as string; // "approve" or "reject"
  const adminNote = (b.adminNote as string) || "";

  if (!id || !action || !["approve", "reject"].includes(action)) {
    return err("id and action ('approve' or 'reject') are required", 422);
  }

  try {
    const record = await db.attendance.findUnique({ where: { id } });
    if (!record) return err("Attendance record not found", 404);

    if (!record.notes?.startsWith("PENDING_REGULARIZATION:")) {
      return err("This record does not have a pending regularization request", 400);
    }

    // Parse request data for email
    let reqData = { checkIn: "09:00", checkOut: "17:00", reason: "" };
    try {
      const raw = record.notes.replace("PENDING_REGULARIZATION:", "");
      reqData = JSON.parse(raw);
    } catch {}

    // Fetch staff profile for email
    const staffProfile = await db.profile.findUnique({
      where: { userId: record.staffUserId },
      select: { fullName: true },
    });
    const staffName = staffProfile?.fullName || "Staff Member";
    const staffEmail = staffName.toLowerCase().includes("staff")
      ? "staff@unifinders.com"
      : `${staffName.toLowerCase().replace(/\s+/g, ".")}@unifinders.com`;

    if (action === "reject") {
      await db.attendance.update({
        where: { id },
        data: {
          notes: `REGULARIZATION_REJECTED: ${adminNote}`
        }
      });

      // Send rejection email (non-blocking)
      try {
        await sendRegularizationRejectedEmail({
          staffEmail,
          staffName,
          date: record.date.toISOString(),
          adminNote: adminNote || null,
        });
      } catch (emailErr) {
        console.warn("Regularization rejection email failed (non-critical):", emailErr);
      }

      return ok({ success: true, message: "Regularization rejected successfully" });
    }

    // Approve: Parse and apply times
    const [ciH, ciM] = reqData.checkIn.split(":").map(Number);
    const [coH, coM] = reqData.checkOut.split(":").map(Number);

    const checkInTime = new Date(record.date);
    checkInTime.setHours(ciH, ciM, 0, 0);

    const checkOutTime = new Date(record.date);
    checkOutTime.setHours(coH, coM, 0, 0);

    const workHours = Math.max(0, (checkOutTime.getTime() - checkInTime.getTime()) / 3600000);

    await db.attendance.update({
      where: { id },
      data: {
        checkIn: checkInTime,
        checkOut: checkOutTime,
        status: "PRESENT",
        workHours,
        notes: `REGULARIZED: ${reqData.reason}. Note: ${adminNote}`
      }
    });

    // Send approval email (non-blocking)
    try {
      await sendRegularizationApprovedEmail({
        staffEmail,
        staffName,
        date: record.date.toISOString(),
        checkIn: reqData.checkIn,
        checkOut: reqData.checkOut,
        adminNote: adminNote || null,
      });
    } catch (emailErr) {
      console.warn("Regularization approval email failed (non-critical):", emailErr);
    }

    return ok({ success: true, message: "Regularization approved successfully" });
  } catch (e) {
    console.error("Regularize review error:", e);
    return err("Failed to review regularization request", 500);
  }
}
