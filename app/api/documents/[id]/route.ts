/**
 * /api/documents/[id]
 * ────────────────────
 * GET    — generate signed download URL for a document
 * PATCH  — admin/counselor: update document status (verify/reject)
 * DELETE — student: soft-delete own document; admin: hard delete
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import {
  ok, err, requireAuth, requireRole,
  parseBody, auditLog, withSecurityHeaders,
} from "@/lib/api-helpers";
import type { DocumentStatus } from "@prisma/client";

const VALID_STATUSES: DocumentStatus[] = [
  "PENDING", "UNDER_REVIEW", "VERIFIED", "REJECTED", "EXPIRED",
];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;
  const { id } = await params;

  try {
    const doc = await db.document.findUnique({ where: { id } });
    if (!doc || doc.deletedAt) return err("Document not found", 404);

    // Students can only access their own docs
    if (ctx.role === "student") {
      const student = await db.student.findUnique({
        where: { userId: ctx.userId },
        select: { id: true },
      });
      if (!student || student.id !== doc.studentId) {
        return err("Forbidden", 403);
      }
    }

    // Generate a 15-minute signed download URL
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from("documents")
      .createSignedUrl(doc.storagePath, 60 * 15);

    if (error || !data) {
      return err("Failed to generate download URL", 500);
    }

    const res = ok({ ...doc, downloadUrl: data.signedUrl });
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Document GET]", e);
    return err("Failed to fetch document", 500);
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

  if (!b.status || !VALID_STATUSES.includes(b.status as DocumentStatus)) {
    return err(`Status must be one of: ${VALID_STATUSES.join(", ")}`, 422);
  }

  try {
    const existing = await db.document.findUnique({ where: { id } });
    if (!existing || existing.deletedAt) return err("Document not found", 404);

    const updated = await db.document.update({
      where: { id },
      data: {
        status: b.status as DocumentStatus,
        reviewedById: ctx.userId,
        reviewedAt: new Date(),
        reviewNote: b.reviewNote ? String(b.reviewNote).slice(0, 500) : null,
      },
    });

    await auditLog({
      userId: ctx.userId,
      userRole: ctx.role ?? "unknown",
      action: "REVIEW_DOCUMENT",
      resource: "documents",
      resourceId: id,
      oldValue: { status: existing.status },
      newValue: { status: updated.status },
      req,
    });

    const res = ok(updated);
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Document PATCH]", e);
    return err("Failed to update document", 500);
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
    const doc = await db.document.findUnique({ where: { id } });
    if (!doc || doc.deletedAt) return err("Document not found", 404);

    // Students can only delete their OWN docs
    if (ctx.role === "student") {
      const student = await db.student.findUnique({
        where: { userId: ctx.userId },
        select: { id: true },
      });
      if (!student || student.id !== doc.studentId) {
        return err("Forbidden", 403);
      }
    } else {
      // Only admin or counselor can delete others
      const roleGuard = requireRole(ctx, ["admin", "counselor"]);
      if (roleGuard) return roleGuard;
    }

    // Soft delete
    await db.document.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    const res = ok({ message: "Document deleted" });
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Document DELETE]", e);
    return err("Failed to delete document", 500);
  }
}
