/**
 * GET  /api/admin/staff/tasks  — List ALL staff tasks with assignee names
 * POST /api/admin/staff/tasks  — Admin assigns a task to any staff member
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, parseBody } from "@/lib/api-helpers";
import { sendTaskAssignedEmail } from "@/lib/email-templates";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "admin") return err("Admin access required", 403);

  const url = new URL(req.url);
  const status = url.searchParams.get("status");

  try {
    const tasks = await db.staffTask.findMany({
      where: status ? { status: status as "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED" } : undefined,
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: 200,
    });

    // Fetch profiles for all assignees
    const userIds = [...new Set(tasks.map((t) => t.staffUserId))];
    const profiles = await db.profile.findMany({
      where: { userId: { in: userIds } },
      select: { userId: true, fullName: true, avatar: true },
    });
    const profileMap = new Map(profiles.map((p) => [p.userId, p]));

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
        staffUserId: t.staffUserId,
        staffName: profileMap.get(t.staffUserId)?.fullName || "Unknown Staff",
        staffAvatar: profileMap.get(t.staffUserId)?.avatar || null,
      }))
    );
  } catch (e) {
    console.error("Admin tasks list error:", e);
    return err("Failed to fetch tasks", 500);
  }
}

export async function POST(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "admin") return err("Admin access required", 403);

  const body = await parseBody<Record<string, unknown>>(req);
  if (body instanceof Response) return body;
  const b = body as Record<string, unknown>;

  const title = (b.title as string)?.trim();
  const staffUserId = b.staffUserId as string;

  if (!title) return err("Title is required", 422);
  if (!staffUserId) return err("staffUserId is required", 422);

  try {
    // Verify staff exists
    const profile = await db.profile.findUnique({
      where: { userId: staffUserId },
      select: { fullName: true, userId: true },
    });
    if (!profile) return err("Staff member not found", 404);

    const task = await db.staffTask.create({
      data: {
        staffUserId,
        assignedById: ctx.userId,
        title: title.slice(0, 200),
        description: (b.description as string)?.trim()?.slice(0, 1000) || null,
        priority: (b.priority as "LOW" | "MEDIUM" | "HIGH" | "URGENT") || "MEDIUM",
        category: (b.category as string)?.trim()?.slice(0, 50) || null,
        dueDate: b.dueDate ? new Date(b.dueDate as string) : null,
      },
    });

    // Send email notification to assigned staff member (non-blocking)
    try {
      // Get staff email from Supabase auth via profile lookup
      const adminProfile = await db.profile.findUnique({
        where: { userId: ctx.userId },
        select: { fullName: true },
      });

      await sendTaskAssignedEmail({
        staffEmail: `${profile.fullName.toLowerCase().replace(/\s+/g, ".")}@unifinders.com`,
        staffName: profile.fullName,
        taskTitle: task.title,
        priority: task.priority,
        dueDate: task.dueDate?.toISOString() || null,
        description: task.description || null,
        assignedByName: adminProfile?.fullName || "Admin",
      });
    } catch (emailErr) {
      console.warn("Task assignment email failed (non-critical):", emailErr);
    }

    return ok({
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      staffName: profile.fullName,
    }, 201);
  } catch (e) {
    console.error("Admin task create error:", e);
    return err("Failed to create task", 500);
  }
}
