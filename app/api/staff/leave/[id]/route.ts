/**
 * DELETE /api/staff/leave/[id]  — Cancel a pending leave request
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth } from "@/lib/api-helpers";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;
  const { id } = await params;

  try {
    const leave = await db.leaveRequest.findUnique({ where: { id } });
    if (!leave) return err("Leave request not found", 404);
    if (leave.staffUserId !== ctx.userId) return err("Not your leave request", 403);
    if (leave.status !== "PENDING") return err("Can only cancel pending requests", 400);

    await db.leaveRequest.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    return ok({ message: "Leave cancelled" });
  } catch (e) {
    console.error("Leave cancel error:", e);
    return err("Failed to cancel leave", 500);
  }
}
