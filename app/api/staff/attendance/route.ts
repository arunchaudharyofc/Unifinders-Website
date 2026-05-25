/**
 * GET /api/staff/attendance
 * Returns attendance history for the authenticated staff member.
 * Query params:
 *   - month (1-12), year (YYYY) — filter by month
 *   - summary=true — return monthly stats only
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

  const url = new URL(req.url);
  const now = new Date();
  const nptOffset = 5 * 60 + 45;
  const nptTime = new Date(now.getTime() + nptOffset * 60_000);

  const month = parseInt(url.searchParams.get("month") || String(nptTime.getMonth() + 1));
  const year = parseInt(url.searchParams.get("year") || String(nptTime.getFullYear()));
  const isSummary = url.searchParams.get("summary") === "true";

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0); // last day of month

  try {
    const records = await db.attendance.findMany({
      where: {
        staffUserId: ctx.userId,
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { date: "asc" },
    });

    if (isSummary) {
      const present = records.filter((r) => r.status === "PRESENT" || r.status === "LATE").length;
      const late = records.filter((r) => r.status === "LATE").length;
      const absent = records.filter((r) => r.status === "ABSENT").length;
      const leaves = records.filter((r) => r.status === "ON_LEAVE").length;
      const hoursArr = records.filter((r) => r.workHours).map((r) => r.workHours!);
      const avgHours = hoursArr.length > 0 ? hoursArr.reduce((a, b) => a + b, 0) / hoursArr.length : 0;

      // Calculate working days in month (exclude weekends = Sat)
      let totalWorkDays = 0;
      const d = new Date(startDate);
      const lastDay = Math.min(endDate.getDate(), nptTime.getDate());
      while (d.getDate() <= lastDay) {
        if (d.getDay() !== 6) totalWorkDays++; // Nepal: Saturday is the weekly off
        d.setDate(d.getDate() + 1);
        if (d.getMonth() !== month - 1) break;
      }

      return ok({
        present,
        late,
        absent,
        leaves,
        totalWorkDays,
        avgHours: Math.round(avgHours * 10) / 10,
        streak: 0, // TODO: calculate streak
      });
    }

    return ok(
      records.map((r) => ({
        id: r.id,
        date: r.date.toISOString(),
        checkIn: r.checkIn?.toISOString() || null,
        checkOut: r.checkOut?.toISOString() || null,
        status: r.status,
        workHours: r.workHours,
        notes: r.notes,
      }))
    );
  } catch (e) {
    console.error("Attendance history error:", e);
    return err("Failed to fetch attendance", 500);
  }
}
