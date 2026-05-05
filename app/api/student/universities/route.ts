/**
 * GET /api/student/universities
 * Browse & search universities with filters
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";
import type { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;

  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const countries = url.searchParams.get("countries")?.split(",").filter(Boolean) ?? [];
  const sortBy = url.searchParams.get("sortBy") || "ranking";
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "12")));

  try {
    const where: Prisma.UniversityWhereInput = { isActive: true, deletedAt: null };
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { country: { contains: q, mode: "insensitive" } },
        { city: { contains: q, mode: "insensitive" } },
      ];
    }
    if (countries.length > 0) {
      where.country = { in: countries, mode: "insensitive" };
    }

    let orderBy: Prisma.UniversityOrderByWithRelationInput = {};
    switch (sortBy) {
      case "name": orderBy = { name: "asc" }; break;
      case "tuition_asc": orderBy = { tuitionRangeMin: { sort: "asc", nulls: "last" } }; break;
      case "tuition_desc": orderBy = { tuitionRangeMax: { sort: "desc", nulls: "last" } }; break;
      default: orderBy = { ranking: { sort: "asc", nulls: "last" } };
    }

    const [universities, total] = await Promise.all([
      db.university.findMany({
        where,
        select: {
          id: true, name: true, country: true, city: true, type: true,
          ranking: true, established: true, coverImageUrl: true, logoUrl: true,
          intakes: true, tuitionRangeMin: true, tuitionRangeMax: true,
          description: true, minIelts: true, minToefl: true, studentCount: true,
          _count: { select: { programs: true } },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.university.count({ where }),
    ]);

    return withSecurityHeaders(ok({
      data: universities,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }));
  } catch (e) {
    return err("Failed to fetch universities", 500);
  }
}
