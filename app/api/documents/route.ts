/**
 * /api/documents
 * ──────────────
 * GET  — student: own docs. counselor/admin: all docs for a student.
 * POST — student: initiate document record (pre-signed upload).
 *        File upload uses Supabase Storage — we generate a signed URL here.
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import {
  ok, err, requireAuth, requireRole,
  parseBody, missingFields, rateLimit, withSecurityHeaders,
} from "@/lib/api-helpers";
import type { DocumentType } from "@prisma/client";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const { searchParams } = new URL(req.url);
  const studentIdParam = searchParams.get("studentId");

  try {
    // Counselors/admins can query any student; students see only own docs
    const targetStudentId =
      ctx.role === "student"
        ? (await db.student.findUnique({
            where: { userId: ctx.userId },
            select: { id: true },
          }))?.id
        : studentIdParam ?? undefined;

    if (!targetStudentId) return err("Student not found", 404);

    // Students can only see their own docs
    if (ctx.role === "student") {
      const student = await db.student.findUnique({
        where: { userId: ctx.userId },
        select: { id: true },
      });
      if (!student || student.id !== targetStudentId) {
        return err("Forbidden", 403);
      }
    } else {
      const roleGuard = requireRole(ctx, ["admin", "counselor"]);
      if (roleGuard) return roleGuard;
    }

    const documents = await db.document.findMany({
      where: { studentId: targetStudentId, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });

    const res = ok(documents);
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Documents GET]", e);
    return err("Failed to fetch documents", 500);
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 20, 60_000);
  if (limited) return limited;

  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body && !(body as object)) return body as Response;
  const b = body as Record<string, unknown>;

  const missing = missingFields(b, ["type", "fileName", "mimeType", "fileSizeBytes"]);
  if (missing) return err(missing, 422);

  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(String(b.mimeType))) {
    return err(
      `File type not allowed. Accepted: ${ALLOWED_MIME_TYPES.join(", ")}`,
      422
    );
  }

  // Validate file size
  const fileSize = Number(b.fileSizeBytes);
  if (isNaN(fileSize) || fileSize > MAX_FILE_SIZE) {
    return err("File size exceeds 10MB limit", 422);
  }

  try {
    // Get student record
    const student = await db.student.findUnique({
      where: { userId: ctx.userId },
      select: { id: true },
    });
    if (!student) return err("Student profile not found", 404);

    // Generate storage path: students/{studentId}/{type}/{uuid}-{filename}
    const uuid = crypto.randomUUID();
    const safeFileName = String(b.fileName)
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .slice(0, 100);
    const storagePath = `students/${student.id}/${b.type}/${uuid}-${safeFileName}`;

    // Generate Supabase signed upload URL
    const supabase = await createClient();
    const { data: signedData, error: signedError } =
      await supabase.storage
        .from("documents")
        .createSignedUploadUrl(storagePath);

    if (signedError || !signedData) {
      console.error("[Documents POST] Storage error:", signedError);
      return err("Failed to generate upload URL", 500);
    }

    // Create doc record with PENDING status
    const doc = await db.document.create({
      data: {
        studentId: student.id,
        uploadedById: ctx.userId,
        type: String(b.type) as DocumentType,
        name: b.name ? String(b.name).trim().slice(0, 200) : safeFileName,
        fileName: safeFileName,
        storagePath,
        fileSizeBytes: fileSize,
        mimeType: String(b.mimeType),
        status: "PENDING",
        expiryDate: b.expiryDate ? new Date(String(b.expiryDate)) : null,
      },
    });

    const res = ok(
      {
        documentId: doc.id,
        uploadUrl: signedData.signedUrl,
        storagePath,
      },
      201
    );
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Documents POST]", e);
    return err("Failed to create document record", 500);
  }
}
