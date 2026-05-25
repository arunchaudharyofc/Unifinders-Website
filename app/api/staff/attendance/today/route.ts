/**
 * GET /api/staff/attendance/today
 * Returns today's attendance record for the authenticated staff member.
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
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
    const record = await db.attendance.findUnique({
      where: {
        staffUserId_date: {
          staffUserId: ctx.userId,
          date: todayDate,
        },
      },
    });

    return ok({
      checkIn: record?.checkIn?.toISOString() || null,
      checkOut: record?.checkOut?.toISOString() || null,
      status: record?.status || null,
      workHours: record?.workHours || null,
    });
  } catch (e) {
    console.error("Attendance today error:", e);
    return err("Failed to fetch attendance", 500);
  }
}
