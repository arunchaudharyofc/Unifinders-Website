/**
 * GET  /api/staff/tasks  — List own tasks (filter: status, today)
 * POST /api/staff/tasks  — Create a personal task
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
  const status = url.searchParams.get("status"); // TODO, IN_PROGRESS, DONE
  const today = url.searchParams.get("today") === "true";

  const where: Record<string, unknown> = { staffUserId: ctx.userId };
  if (status) where.status = status;
  if (today) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    where.updatedAt = { gte: start, lte: end };
  }

  try {
    const tasks = await db.staffTask.findMany({
      where,
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: 100,
    });

    return ok(
      tasks.map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        status: t.status,
        priority: t.priority,
        category: t.category,
        dueDate: t.dueDate?.toISOString() || null,
        completedAt: t.completedAt?.toISOString() || null,
        createdAt: t.createdAt.toISOString(),
      }))
    );
  } catch (e) {
    console.error("Tasks list error:", e);
    return err("Failed to fetch tasks", 500);
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 10, 60_000);
  if (limited) return limited;

  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "staff" && ctx.role !== "admin") return err("Access denied", 403);

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body) return body as Response;
  const b = body as Record<string, unknown>;

  const title = (b.title as string)?.trim();
  if (!title) return err("Title is required", 422);

  try {
    const task = await db.staffTask.create({
      data: {
        staffUserId: ctx.userId,
        assignedById: ctx.userId,
        title: title.slice(0, 200),
        description: (b.description as string)?.trim()?.slice(0, 1000) || null,
        priority: (b.priority as "LOW" | "MEDIUM" | "HIGH" | "URGENT") || "MEDIUM",
        category: (b.category as string)?.trim()?.slice(0, 50) || null,
        dueDate: b.dueDate ? new Date(b.dueDate as string) : null,
      },
    });

    return ok({
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
    }, 201);
  } catch (e) {
    console.error("Task create error:", e);
    return err("Failed to create task", 500);
  }
}
