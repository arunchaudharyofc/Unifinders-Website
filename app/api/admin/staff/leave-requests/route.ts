/**
 * GET /api/admin/staff/leave-requests       — All pending leave requests
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "admin") return err("Admin access required", 403);

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || "PENDING";

  try {
    const requests = await db.leaveRequest.findMany({
      where: { status: status as "PENDING" | "APPROVED" | "REJECTED" },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    // Fetch staff profiles for display
    const userIds = [...new Set(requests.map((r) => r.staffUserId))];
    const profiles = await db.profile.findMany({
      where: { userId: { in: userIds } },
      select: { userId: true, fullName: true, avatar: true },
    });
    const profileMap = new Map(profiles.map((p) => [p.userId, p]));

    return ok(
      requests.map((r) => ({
        id: r.id,
        staffUserId: r.staffUserId,
        staffName: profileMap.get(r.staffUserId)?.fullName || "Unknown",
        staffAvatar: profileMap.get(r.staffUserId)?.avatar || null,
        leaveType: r.leaveType,
        startDate: r.startDate.toISOString(),
        endDate: r.endDate.toISOString(),
        totalDays: r.totalDays,
        reason: r.reason,
        status: r.status,
        createdAt: r.createdAt.toISOString(),
      }))
    );
  } catch (e) {
    console.error("Admin leave list error:", e);
    return err("Failed to fetch leave requests", 500);
  }
}
