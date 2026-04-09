/**
 * /api/applications
 * ──────────────────
 * GET  — student: own apps. counselor/admin: all apps with filters.
 * POST — counselor/admin: create an application for a student.
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, requireAuth, requireRole,
  parseBody, missingFields, rateLimit, withSecurityHeaders,
} from "@/lib/api-helpers";
import type { ApplicationStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as ApplicationStatus | null;
  const studentId = searchParams.get("studentId");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));

  try {
    if (ctx.role === "student") {
      // Student sees only their own applications
      const student = await db.student.findUnique({
        where: { userId: ctx.userId },
        select: { id: true },
      });
      if (!student) return err("Student profile not found", 404);

      const [apps, total] = await Promise.all([
        db.application.findMany({
          where: { studentId: student.id, deletedAt: null, ...(status ? { status } : {}) },
          include: {
            university: { select: { name: true, country: true, logoUrl: true } },
            program: { select: { name: true, level: true, field: true } },
          },
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        db.application.count({
          where: { studentId: student.id, deletedAt: null, ...(status ? { status } : {}) },
        }),
      ]);

      const res = ok({ applications: apps, total, page, limit });
      return withSecurityHeaders(res);
    }

    // Counselors / Admins
    const roleGuard = requireRole(ctx, ["admin", "counselor"]);
    if (roleGuard) return roleGuard;

    const where = {
      deletedAt: null as null,
      ...(status ? { status } : {}),
      ...(studentId ? { studentId } : {}),
    };

    const [apps, total] = await Promise.all([
      db.application.findMany({
        where,
        include: {
          student: { select: { firstName: true, lastName: true, email: true } },
          university: { select: { name: true, country: true } },
          program: { select: { name: true, level: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.application.count({ where }),
    ]);

    const res = ok({ applications: apps, total, page, limit });
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Applications GET]", e);
    return err("Failed to fetch applications", 500);
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 10, 60_000);
  if (limited) return limited;

  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  // Only counselor/admin can create applications
  const roleGuard = requireRole(ctx, ["admin", "counselor"]);
  if (roleGuard) return roleGuard;

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body && !(body as object)) return body as Response;
  const b = body as Record<string, unknown>;

  const missing = missingFields(b, ["studentId", "universityId", "intake", "counselorId"]);
  if (missing) return err(missing, 422);

  try {
    // Verify student exists
    const student = await db.student.findUnique({
      where: { id: String(b.studentId) },
      select: { id: true },
    });
    if (!student) return err("Student not found", 404);

    // Verify university exists
    const university = await db.university.findUnique({
      where: { id: String(b.universityId) },
      select: { id: true },
    });
    if (!university) return err("University not found", 404);

    const application = await db.application.create({
      data: {
        studentId: String(b.studentId),
        universityId: String(b.universityId),
        programId: b.programId ? String(b.programId) : null,
        counselorId: String(b.counselorId),
        intake: String(b.intake),
        deadlineDate: b.deadlineDate ? new Date(String(b.deadlineDate)) : null,
        notes: b.notes ? String(b.notes).slice(0, 2000) : null,
        priority: b.priority ? Number(b.priority) : 1,
      },
    });

    // Write initial status history
    await db.applicationStatusHistory.create({
      data: {
        applicationId: application.id,
        changedById: ctx.userId,
        toStatus: "PREPARING",
        note: "Application created",
      },
    });

    const res = ok(application, 201);
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Applications POST]", e);
    return err("Failed to create application", 500);
  }
}
