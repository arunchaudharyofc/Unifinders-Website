/**
 * GET  /api/staff/daily-log  — Get daily logs (date range)
 * POST /api/staff/daily-log  — Submit today's log
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, rateLimit, parseBody } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "staff" && ctx.role !== "admin") return err("Access denied", 403);

  const url = new URL(req.url);
  const days = parseInt(url.searchParams.get("days") || "30");

  const since = new Date();
  since.setDate(since.getDate() - days);

  try {
    const logs = await db.dailyLog.findMany({
      where: {
        staffUserId: ctx.userId,
        date: { gte: since },
      },
      orderBy: { date: "desc" },
    });

    return ok(
      logs.map((l) => ({
        id: l.id,
        date: l.date.toISOString(),
        summary: l.summary,
        tasksCompleted: l.tasksCompleted,
        highlights: l.highlights,
        blockers: l.blockers,
        createdAt: l.createdAt.toISOString(),
      }))
    );
  } catch (e) {
    console.error("Daily log list error:", e);
    return err("Failed to fetch logs", 500);
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 5, 60_000);
  if (limited) return limited;

  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "staff" && ctx.role !== "admin") return err("Access denied", 403);

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body) return body as Response;
  const b = body as Record<string, unknown>;

  const summary = (b.summary as string)?.trim();
  if (!summary) return err("Summary is required", 422);

  const now = new Date();
  const nptOffset = 5 * 60 + 45;
  const nptTime = new Date(now.getTime() + nptOffset * 60_000);
  const todayDate = new Date(nptTime.getFullYear(), nptTime.getMonth(), nptTime.getDate());

  try {
    const log = await db.dailyLog.upsert({
      where: {
        staffUserId_date: {
          staffUserId: ctx.userId,
          date: todayDate,
        },
      },
      create: {
        staffUserId: ctx.userId,
        date: todayDate,
        summary: summary.slice(0, 2000),
        tasksCompleted: (b.tasksCompleted as number) || 0,
        highlights: (b.highlights as string)?.trim()?.slice(0, 1000) || null,
        blockers: (b.blockers as string)?.trim()?.slice(0, 1000) || null,
      },
      update: {
        summary: summary.slice(0, 2000),
        tasksCompleted: (b.tasksCompleted as number) || 0,
        highlights: (b.highlights as string)?.trim()?.slice(0, 1000) || null,
        blockers: (b.blockers as string)?.trim()?.slice(0, 1000) || null,
      },
    });

    return ok({
      id: log.id,
      date: log.date.toISOString(),
      summary: log.summary,
    }, 201);
  } catch (e) {
    console.error("Daily log submit error:", e);
    return err("Failed to submit log", 500);
  }
}
