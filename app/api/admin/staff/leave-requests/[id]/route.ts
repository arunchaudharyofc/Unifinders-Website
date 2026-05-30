/**
 * PUT /api/admin/staff/leave-requests/[id]  — Approve or reject a leave request
 * Sends email notification to the staff member after decision.
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, parseBody } from "@/lib/api-helpers";
import {
  sendLeaveApprovedEmail,
  sendLeaveRejectedEmail,
} from "@/lib/email-templates";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;
  const { id } = await params;

  if (ctx.role !== "admin") return err("Admin access required", 403);

  const body = await parseBody<Record<string, unknown>>(req);
  if (body instanceof Response) return body;
  const b = body as Record<string, unknown>;

  const action = b.action as string; // "approve" or "reject"
  if (!action || !["approve", "reject"].includes(action)) {
    return err("action must be 'approve' or 'reject'", 422);
  }

  try {
    const leave = await db.leaveRequest.findUnique({ where: { id } });
    if (!leave) return err("Leave request not found", 404);
    if (leave.status !== "PENDING") return err("Can only review pending requests", 400);

    const newStatus = action === "approve" ? "APPROVED" : "REJECTED";
    const reviewNote = (b.note as string)?.trim()?.slice(0, 500) || null;

    const updated = await db.leaveRequest.update({
      where: { id },
      data: {
        status: newStatus,
        reviewedById: ctx.userId,
        reviewedAt: new Date(),
        reviewNote,
      },
    });

    // If approved, mark attendance as ON_LEAVE for those dates
    if (newStatus === "APPROVED") {
      const d = new Date(leave.startDate);
      while (d <= leave.endDate) {
        if (d.getDay() !== 6) {
          // Skip Saturday (Nepal weekly off)
          const dateOnly = new Date(d.getFullYear(), d.getMonth(), d.getDate());
          await db.attendance.upsert({
            where: {
              staffUserId_date: {
                staffUserId: leave.staffUserId,
                date: dateOnly,
              },
            },
            create: {
              staffUserId: leave.staffUserId,
              date: dateOnly,
              status: "ON_LEAVE",
            },
            update: {
              status: "ON_LEAVE",
            },
          });
        }
        d.setDate(d.getDate() + 1);
      }
    }

    // Send email notification to staff member (non-blocking)
    try {
      const staffProfile = await db.profile.findUnique({
        where: { userId: leave.staffUserId },
        select: { fullName: true },
      });
      const staffName = staffProfile?.fullName || "Staff Member";
      // Build email from name pattern (same as other routes)
      const staffEmail = staffName.toLowerCase().includes("staff")
        ? "staff@unifinders.com"
        : `${staffName.toLowerCase().replace(/\s+/g, ".")}@unifinders.com`;

      if (newStatus === "APPROVED") {
        await sendLeaveApprovedEmail({
          staffEmail,
          staffName,
          leaveType: leave.leaveType,
          startDate: leave.startDate.toISOString(),
          endDate: leave.endDate.toISOString(),
          totalDays: leave.totalDays,
          adminNote: reviewNote,
        });
      } else {
        await sendLeaveRejectedEmail({
          staffEmail,
          staffName,
          leaveType: leave.leaveType,
          startDate: leave.startDate.toISOString(),
          endDate: leave.endDate.toISOString(),
          adminNote: reviewNote,
        });
      }
    } catch (emailErr) {
      console.warn("Leave decision email failed (non-critical):", emailErr);
    }

    return ok({
      id: updated.id,
      status: updated.status,
      reviewedAt: updated.reviewedAt?.toISOString(),
    });
  } catch (e) {
    console.error("Leave review error:", e);
    return err("Failed to review leave", 500);
  }
}
