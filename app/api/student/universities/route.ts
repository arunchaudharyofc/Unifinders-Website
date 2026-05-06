/**
 * GET /api/student/universities
 * Browse and search universities with filters
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const country = searchParams.get("country") || "";
  const level = searchParams.get("level") || "";
  const field = searchParams.get("field") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(24, parseInt(searchParams.get("limit") || "12"));
  const skip = (page - 1) * limit;

  const where: any = { isActive: true, deletedAt: null };
  if (q) where.OR = [{ name: { contains: q, mode: "insensitive" } }, { city: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }];
  if (country) where.country = { contains: country, mode: "insensitive" };
  if (level || field) {
    where.programs = { some: { isActive: true, ...(level ? { level } : {}), ...(field ? { field: { contains: field, mode: "insensitive" } } : {}) } };
  }

  const [data, total] = await Promise.all([
    db.university.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ ranking: { sort: "asc", nulls: "last" } }, { name: "asc" }],
      select: {
        id: true, name: true, country: true, city: true, type: true,
        ranking: true, established: true, coverImageUrl: true, logoUrl: true,
        intakes: true, tuitionRangeMin: true, tuitionRangeMax: true, description: true,
        _count: { select: { programs: true } },
      },
    }),
    db.university.count({ where }),
  ]);

  const res = ok({ data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  return withSecurityHeaders(res);
}
