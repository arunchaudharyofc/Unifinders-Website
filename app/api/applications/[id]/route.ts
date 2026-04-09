/**
 * /api/applications/[id]
 * ───────────────────────
 * GET   — get single application detail
 * PATCH — counselor/admin: update status + add history entry
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, requireAuth, requireRole,
  parseBody, auditLog, withSecurityHeaders,
} from "@/lib/api-helpers";
import type { ApplicationStatus } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;
  const { id } = await params;

  try {
    const app = await db.application.findUnique({
      where: { id },
      include: {
        student: { select: { firstName: true, lastName: true, email: true, phone: true } },
        university: { select: { name: true, country: true, logoUrl: true, websiteUrl: true } },
        program: { select: { name: true, level: true, field: true, duration: true, tuitionFee: true } },
        statusHistory: { orderBy: { changedAt: "asc" } },
      },
    });

    if (!app || app.deletedAt) return err("Application not found", 404);

    // Students can only view their own applications
    if (ctx.role === "student") {
      const student = await db.student.findUnique({
        where: { userId: ctx.userId },
        select: { id: true },
      });
      if (!student || student.id !== app.studentId) {
        return err("Forbidden", 403);
      }
    }

    const res = ok(app);
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Application GET]", e);
    return err("Failed to fetch application", 500);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin", "counselor"]);
  if (roleGuard) return roleGuard;

  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body && !(body as object)) return body as Response;
  const b = body as Record<string, unknown>;

  try {
    const existing = await db.application.findUnique({
      where: { id },
      select: { id: true, status: true },
    });
    if (!existing || !existing.id) return err("Application not found", 404);

    const newStatus = b.status as ApplicationStatus | undefined;

    const updated = await db.application.update({
      where: { id },
      data: {
        ...(newStatus ? { status: newStatus } : {}),
        ...(b.notes ? { notes: String(b.notes).slice(0, 2000) } : {}),
        ...(b.offerType ? { offerType: String(b.offerType) } : {}),
        ...(b.offerConditions ? { offerConditions: String(b.offerConditions) } : {}),
        ...(b.scholarshipAmount ? { scholarshipAmount: Number(b.scholarshipAmount) } : {}),
        ...(b.visaDecision ? { visaDecision: String(b.visaDecision), visaDecisionAt: new Date() } : {}),
        ...(newStatus === "SUBMITTED" ? { submittedAt: new Date() } : {}),
        ...(newStatus === "CONDITIONAL_OFFER" || newStatus === "UNCONDITIONAL_OFFER"
          ? { offerReceivedAt: new Date() }
          : {}),
        ...(newStatus === "VISA_SUBMITTED" ? { visaAppliedAt: new Date() } : {}),
      },
    });

    // Write status history entry
    if (newStatus && newStatus !== existing.status) {
      await db.applicationStatusHistory.create({
        data: {
          applicationId: id,
          changedById: ctx.userId,
          fromStatus: existing.status,
          toStatus: newStatus,
          note: b.note ? String(b.note).slice(0, 500) : null,
        },
      });
    }

    await auditLog({
      userId: ctx.userId,
      userRole: ctx.role ?? "unknown",
      action: "UPDATE_APPLICATION",
      resource: "applications",
      resourceId: id,
      oldValue: { status: existing.status },
      newValue: { status: newStatus },
      req,
    });

    const res = ok(updated);
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Application PATCH]", e);
    return err("Failed to update application", 500);
  }
}
