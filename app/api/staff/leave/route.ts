/**
 * GET  /api/staff/leave          — List own leave requests
 * POST /api/staff/leave          — Apply for leave
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, rateLimit, parseBody } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "staff" && ctx.role !== "admin") return err("Access denied", 403);

  try {
    const leaves = await db.leaveRequest.findMany({
      where: { staffUserId: ctx.userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return ok(
      leaves.map((l) => ({
        id: l.id,
        leaveType: l.leaveType,
        startDate: l.startDate.toISOString(),
        endDate: l.endDate.toISOString(),
        totalDays: l.totalDays,
        reason: l.reason,
        status: l.status,
        reviewNote: l.reviewNote,
        reviewedAt: l.reviewedAt?.toISOString() || null,
        createdAt: l.createdAt.toISOString(),
      }))
    );
  } catch (e) {
    console.error("Leave list error:", e);
    return err("Failed to fetch leaves", 500);
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
  if (body instanceof Response) return body;
  const b = body as Record<string, unknown>;

  const leaveType = b.leaveType as string;
  const startDate = b.startDate as string;
  const endDate = b.endDate as string;
  const reason = b.reason as string;

  if (!leaveType || !startDate || !endDate || !reason) {
    return err("leaveType, startDate, endDate, and reason are required", 422);
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end < start) return err("End date must be after start date", 422);

  // Calculate total days (exclude Saturdays — Nepal weekly off)
  let totalDays = 0;
  const d = new Date(start);
  while (d <= end) {
    if (d.getDay() !== 6) totalDays++; // Skip Saturday
    d.setDate(d.getDate() + 1);
  }

  try {
    // Check for overlapping leave
    const overlap = await db.leaveRequest.findFirst({
      where: {
        staffUserId: ctx.userId,
        status: { in: ["PENDING", "APPROVED"] },
        OR: [
          { startDate: { lte: end }, endDate: { gte: start } },
        ],
      },
    });

    if (overlap) {
      return err("You already have a leave request overlapping these dates", 409);
    }

    const leave = await db.leaveRequest.create({
      data: {
        staffUserId: ctx.userId,
        leaveType: leaveType as "ANNUAL" | "SICK" | "CASUAL" | "UNPAID" | "MATERNITY" | "PATERNITY" | "BEREAVEMENT" | "COMPENSATORY",
        startDate: start,
        endDate: end,
        totalDays,
        reason: reason.trim().slice(0, 500),
      },
    });

    return ok({
      id: leave.id,
      leaveType: leave.leaveType,
      startDate: leave.startDate.toISOString(),
      endDate: leave.endDate.toISOString(),
      totalDays: leave.totalDays,
      status: leave.status,
    }, 201);
  } catch (e) {
    console.error("Leave apply error:", e);
    return err("Failed to apply leave", 500);
  }
}
