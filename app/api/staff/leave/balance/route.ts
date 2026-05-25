/**
 * GET /api/staff/leave/balance — Get leave balances for current year
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth } from "@/lib/api-helpers";

// Default leave quotas per year
const DEFAULT_QUOTAS: Record<string, number> = {
  ANNUAL: 18,
  SICK: 12,
  CASUAL: 6,
  UNPAID: 30,
  MATERNITY: 98,
  PATERNITY: 15,
  BEREAVEMENT: 5,
  COMPENSATORY: 10,
};

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "staff" && ctx.role !== "admin") return err("Access denied", 403);

  const year = new Date().getFullYear();

  try {
    // Get or initialize balances
    let balances = await db.leaveBalance.findMany({
      where: { staffUserId: ctx.userId, year },
    });

    // If no balances exist for this year, create defaults
    if (balances.length === 0) {
      const types = ["ANNUAL", "SICK", "CASUAL"] as const;
      for (const t of types) {
        await db.leaveBalance.create({
          data: {
            staffUserId: ctx.userId,
            year,
            leaveType: t,
            totalDays: DEFAULT_QUOTAS[t],
            usedDays: 0,
            remainingDays: DEFAULT_QUOTAS[t],
          },
        });
      }
      balances = await db.leaveBalance.findMany({
        where: { staffUserId: ctx.userId, year },
      });
    }

    // Calculate actual used days from approved leaves
    const approvedLeaves = await db.leaveRequest.findMany({
      where: {
        staffUserId: ctx.userId,
        status: "APPROVED",
        startDate: { gte: new Date(year, 0, 1) },
        endDate: { lte: new Date(year, 11, 31) },
      },
    });

    // Aggregate used days per type
    const usedByType: Record<string, number> = {};
    for (const l of approvedLeaves) {
      usedByType[l.leaveType] = (usedByType[l.leaveType] || 0) + l.totalDays;
    }

    return ok(
      balances.map((b) => ({
        leaveType: b.leaveType,
        totalDays: b.totalDays,
        usedDays: usedByType[b.leaveType] || 0,
        remainingDays: b.totalDays - (usedByType[b.leaveType] || 0),
      }))
    );
  } catch (e) {
    console.error("Leave balance error:", e);
    return err("Failed to fetch balances", 500);
  }
}
