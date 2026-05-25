/**
 * PUT    /api/staff/tasks/[id]  — Update task status/details
 * DELETE /api/staff/tasks/[id]  — Delete own task
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, parseBody } from "@/lib/api-helpers";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;
  const { id } = await params;

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body) return body as Response;
  const b = body as Record<string, unknown>;

  try {
    const task = await db.staffTask.findUnique({ where: { id } });
    if (!task) return err("Task not found", 404);
    if (task.staffUserId !== ctx.userId && ctx.role !== "admin") {
      return err("Not authorized", 403);
    }

    const updateData: Record<string, unknown> = {};
    if (b.title) updateData.title = (b.title as string).trim().slice(0, 200);
    if (b.description !== undefined) updateData.description = (b.description as string)?.trim()?.slice(0, 1000) || null;
    if (b.status) {
      updateData.status = b.status;
      if (b.status === "DONE") updateData.completedAt = new Date();
      if (b.status === "TODO" || b.status === "IN_PROGRESS") updateData.completedAt = null;
    }
    if (b.priority) updateData.priority = b.priority;
    if (b.dueDate !== undefined) updateData.dueDate = b.dueDate ? new Date(b.dueDate as string) : null;
    if (b.category !== undefined) updateData.category = (b.category as string)?.trim() || null;

    const updated = await db.staffTask.update({
      where: { id },
      data: updateData,
    });

    return ok({
      id: updated.id,
      title: updated.title,
      status: updated.status,
      priority: updated.priority,
      completedAt: updated.completedAt?.toISOString() || null,
    });
  } catch (e) {
    console.error("Task update error:", e);
    return err("Failed to update task", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;
  const { id } = await params;

  try {
    const task = await db.staffTask.findUnique({ where: { id } });
    if (!task) return err("Task not found", 404);
    if (task.staffUserId !== ctx.userId && ctx.role !== "admin") {
      return err("Not authorized", 403);
    }

    await db.staffTask.delete({ where: { id } });
    return ok({ message: "Task deleted" });
  } catch (e) {
    console.error("Task delete error:", e);
    return err("Failed to delete task", 500);
  }
}
