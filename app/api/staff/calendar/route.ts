/**
 * GET /api/staff/calendar
 * Returns holidays + attendance for a given month, or upcoming holidays.
 * Query params:
 *   - month, year: filter
 *   - upcoming=true: return next 5 upcoming holidays
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "staff" && ctx.role !== "admin") return err("Access denied", 403);

  const url = new URL(req.url);
  const isUpcoming = url.searchParams.get("upcoming") === "true";

  if (isUpcoming) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const holidays = await db.holiday.findMany({
      where: { date: { gte: today } },
      orderBy: { date: "asc" },
      take: 5,
    });

    return ok({
      holidays: holidays.map((h) => ({
        name: h.name,
        date: h.date.toISOString(),
        type: h.type,
        description: h.description,
      })),
    });
  }

  const now = new Date();
  const month = parseInt(url.searchParams.get("month") || String(now.getMonth() + 1));
  const year = parseInt(url.searchParams.get("year") || String(now.getFullYear()));

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const [holidays, attendance, leaves] = await Promise.all([
      db.holiday.findMany({
        where: { date: { gte: startDate, lte: endDate } },
        orderBy: { date: "asc" },
      }),
      db.attendance.findMany({
        where: {
          staffUserId: ctx.userId,
          date: { gte: startDate, lte: endDate },
        },
        orderBy: { date: "asc" },
      }),
      db.leaveRequest.findMany({
        where: {
          staffUserId: ctx.userId,
          status: { in: ["APPROVED", "PENDING"] },
          startDate: { lte: endDate },
          endDate: { gte: startDate },
        },
      }),
    ]);

    return ok({
      month,
      year,
      holidays: holidays.map((h) => ({
        id: h.id,
        name: h.name,
        date: h.date.toISOString(),
        type: h.type,
        isOptional: h.isOptional,
      })),
      attendance: attendance.map((a) => ({
        date: a.date.toISOString(),
        status: a.status,
        checkIn: a.checkIn?.toISOString() || null,
        checkOut: a.checkOut?.toISOString() || null,
        workHours: a.workHours,
      })),
      leaves: leaves.map((l) => ({
        id: l.id,
        startDate: l.startDate.toISOString(),
        endDate: l.endDate.toISOString(),
        leaveType: l.leaveType,
        status: l.status,
      })),
    });
  } catch (e) {
    console.error("Calendar error:", e);
    return err("Failed to fetch calendar", 500);
  }
}
