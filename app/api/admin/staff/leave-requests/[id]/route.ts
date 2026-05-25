/**
 * PUT /api/admin/staff/leave-requests/[id]  — Approve or reject a leave request
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, parseBody } from "@/lib/api-helpers";

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
  if ("status" in body) return body as Response;
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

    const updated = await db.leaveRequest.update({
      where: { id },
      data: {
        status: newStatus,
        reviewedById: ctx.userId,
        reviewedAt: new Date(),
        reviewNote: (b.note as string)?.trim()?.slice(0, 500) || null,
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
