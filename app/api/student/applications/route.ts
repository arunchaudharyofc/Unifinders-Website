/**
 * GET /api/student/applications — list student's applications with pagination
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || undefined;
  const country = url.searchParams.get("country") || undefined;
  const q = url.searchParams.get("q") || "";
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(50, parseInt(url.searchParams.get("limit") || "10"));

  try {
    const student = await db.student.findUnique({
      where: { userId: ctx.userId },
      select: { id: true },
    });
    if (!student) return withSecurityHeaders(ok({ data: [], pagination: { page, limit, total: 0, totalPages: 0 } }));

    const where: Record<string, unknown> = { studentId: student.id, deletedAt: null };
    if (status) where.status = status;
    if (country) where.university = { country: { contains: country, mode: "insensitive" } };
    if (q) {
      where.OR = [
        { university: { name: { contains: q, mode: "insensitive" } } },
        { program: { name: { contains: q, mode: "insensitive" } } },
      ];
    }

    const [applications, total] = await Promise.all([
      db.application.findMany({
        where: where as any,
        include: {
          university: { select: { id: true, name: true, country: true, logoUrl: true, coverImageUrl: true } },
          program: { select: { id: true, name: true, level: true, field: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.application.count({ where: where as any }),
    ]);

    return withSecurityHeaders(ok({
      data: applications,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }));
  } catch (e) {
    return err("Failed to fetch applications", 500);
  }
}
