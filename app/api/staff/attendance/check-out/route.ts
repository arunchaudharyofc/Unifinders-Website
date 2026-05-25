/**
 * POST /api/staff/attendance/check-out
 * Records the staff member's check-out and calculates work hours.
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, rateLimit } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 5, 60_000);
  if (limited) return limited;

  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "staff" && ctx.role !== "admin") {
    return err("Access denied", 403);
  }

  const now = new Date();
  const nptOffset = 5 * 60 + 45;
  const nptTime = new Date(now.getTime() + nptOffset * 60_000);
  const todayDate = new Date(nptTime.getFullYear(), nptTime.getMonth(), nptTime.getDate());

  try {
    const existing = await db.attendance.findUnique({
      where: {
        staffUserId_date: {
          staffUserId: ctx.userId,
          date: todayDate,
        },
      },
    });

    if (!existing?.checkIn) {
      return err("You haven't checked in today", 400);
    }
    if (existing.checkOut) {
      return err("Already checked out today", 409);
    }

    // Calculate work hours
    const diffMs = now.getTime() - existing.checkIn.getTime();
    const workHours = Math.round((diffMs / 3600000) * 100) / 100; // 2 decimal places

    // Determine if half-day (less than 4 hours)
    let status = existing.status;
    if (workHours < 4) {
      status = "HALF_DAY";
    }

    const attendance = await db.attendance.update({
      where: { id: existing.id },
      data: {
        checkOut: now,
        workHours,
        status,
      },
    });

    return ok({
      checkIn: attendance.checkIn?.toISOString() || null,
      checkOut: attendance.checkOut?.toISOString() || null,
      status: attendance.status,
      workHours: attendance.workHours,
    });
  } catch (e) {
    console.error("Check-out error:", e);
    return err("Failed to check out", 500);
  }
}
