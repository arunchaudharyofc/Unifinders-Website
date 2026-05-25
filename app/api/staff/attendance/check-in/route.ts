/**
 * POST /api/staff/attendance/check-in
 * Records the staff member's check-in for today.
 * Auto-detects LATE status if after 10:00 AM local time (NPT = UTC+5:45).
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, rateLimit } from "@/lib/api-helpers";

const OFFICE_START_HOUR = 10; // 10:00 AM — late threshold

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 5, 60_000);
  if (limited) return limited;

  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  // Only staff & admin
  if (ctx.role !== "staff" && ctx.role !== "admin") {
    return err("Access denied", 403);
  }

  const now = new Date();
  // Nepal timezone offset: UTC+5:45
  const nptOffset = 5 * 60 + 45;
  const nptTime = new Date(now.getTime() + nptOffset * 60_000);
  const todayDate = new Date(nptTime.getFullYear(), nptTime.getMonth(), nptTime.getDate());

  try {
    // Check if already checked in today
    const existing = await db.attendance.findUnique({
      where: {
        staffUserId_date: {
          staffUserId: ctx.userId,
          date: todayDate,
        },
      },
    });

    if (existing?.checkIn) {
      return err("Already checked in today", 409);
    }

    // Determine status
    const isLate = nptTime.getHours() >= OFFICE_START_HOUR;
    const status = isLate ? "LATE" : "PRESENT";

    // Get client IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    const attendance = await db.attendance.upsert({
      where: {
        staffUserId_date: {
          staffUserId: ctx.userId,
          date: todayDate,
        },
      },
      create: {
        staffUserId: ctx.userId,
        date: todayDate,
        checkIn: now,
        status,
        ipAddress: ip,
      },
      update: {
        checkIn: now,
        status,
        ipAddress: ip,
      },
    });

    return ok({
      checkIn: attendance.checkIn?.toISOString() || null,
      checkOut: attendance.checkOut?.toISOString() || null,
      status: attendance.status,
      workHours: attendance.workHours,
    });
  } catch (e) {
    console.error("Check-in error:", e);
    return err("Failed to check in", 500);
  }
}
