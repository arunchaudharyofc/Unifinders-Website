/**
 * GET /api/admin/staff/attendance/report
 * Returns per-staff attendance summary for given month/year.
 * Query params: month (1-12), year (YYYY)
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
  const now = new Date();
  const month = parseInt(url.searchParams.get("month") || String(now.getMonth() + 1));
  const year = parseInt(url.searchParams.get("year") || String(now.getFullYear()));

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    // Get all staff profiles
    const profiles = await db.profile.findMany({
      where: { role: { in: ["staff", "admin"] } },
      include: { staff: true },
      orderBy: { fullName: "asc" },
    });

    // Get all attendance records for the month
    const attendanceRecords = await db.attendance.findMany({
      where: {
        date: { gte: startDate, lte: endDate },
        staffUserId: { in: profiles.map((p) => p.userId) },
      },
    });

    // Group by staffUserId
    const byStaff: Record<string, typeof attendanceRecords> = {};
    for (const rec of attendanceRecords) {
      if (!byStaff[rec.staffUserId]) byStaff[rec.staffUserId] = [];
      byStaff[rec.staffUserId].push(rec);
    }

    // Calculate working days in month (exclude Saturdays)
    let totalWorkDays = 0;
    const d = new Date(startDate);
    const today = new Date();
    const capDay = year === today.getFullYear() && month === today.getMonth() + 1
      ? today.getDate()
      : endDate.getDate();
    while (d.getDate() <= capDay && d <= endDate) {
      if (d.getDay() !== 6) totalWorkDays++;
      d.setDate(d.getDate() + 1);
      if (d.getMonth() !== month - 1) break;
    }

    const report = profiles.map((p) => {
      const recs = byStaff[p.userId] || [];
      const present = recs.filter((r) => r.status === "PRESENT").length;
      const late = recs.filter((r) => r.status === "LATE").length;
      const absent = recs.filter((r) => r.status === "ABSENT").length;
      const onLeave = recs.filter((r) => r.status === "ON_LEAVE").length;
      const hoursArr = recs.filter((r) => r.workHours).map((r) => r.workHours!);
      const avgHours = hoursArr.length > 0
        ? Math.round((hoursArr.reduce((a, b) => a + b, 0) / hoursArr.length) * 10) / 10
        : 0;

      return {
        userId: p.userId,
        fullName: p.fullName,
        avatar: p.avatar,
        role: p.role,
        department: p.staff?.department || (p.role === "admin" ? "Management" : "Academic"),
        designation: p.staff?.designation || (p.role === "admin" ? "Director" : "Counselor"),
        present,
        late,
        absent,
        onLeave,
        totalWorkDays,
        avgHours,
        attendancePct: totalWorkDays > 0
          ? Math.round(((present + late) / totalWorkDays) * 100)
          : 0,
      };
    });

    return ok({ month, year, totalWorkDays, staff: report });
  } catch (e) {
    console.error("Admin attendance report error:", e);
    return err("Failed to generate attendance report", 500);
  }
}
