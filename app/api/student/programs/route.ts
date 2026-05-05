/**
 * GET /api/student/programs
 * ─────────────────────────
 * Browse & search university programs with filters.
 * Query params: q, countries, levels, fields, intakes, tuitionMin, tuitionMax, sortBy, page, limit
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";
import { createModuleLogger } from "@/lib/logger";
import type { Prisma } from "@prisma/client";

const log = createModuleLogger("API:StudentPrograms");

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;

  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const countries = url.searchParams.get("countries")?.split(",").filter(Boolean) ?? [];
  const levels = url.searchParams.get("levels")?.split(",").filter(Boolean) ?? [];
  const fields = url.searchParams.get("fields")?.split(",").filter(Boolean) ?? [];
  const sortBy = url.searchParams.get("sortBy") || "ranking";
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "12")));
  const tuitionMin = url.searchParams.get("tuitionMin") ? parseFloat(url.searchParams.get("tuitionMin")!) : undefined;
  const tuitionMax = url.searchParams.get("tuitionMax") ? parseFloat(url.searchParams.get("tuitionMax")!) : undefined;

  try {
    const where: Prisma.UniversityProgramWhereInput = {
      isActive: true,
      university: { isActive: true, deletedAt: null },
    };

    // Text search
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { field: { contains: q, mode: "insensitive" } },
        { university: { name: { contains: q, mode: "insensitive" } } },
      ];
    }

    // Country filter
    if (countries.length > 0) {
      where.university = { ...where.university as object, country: { in: countries, mode: "insensitive" } };
    }

    // Level filter
    if (levels.length > 0) {
      where.level = { in: levels, mode: "insensitive" };
    }

    // Field filter
    if (fields.length > 0) {
      where.field = { in: fields, mode: "insensitive" };
    }

    // Tuition filter
    if (tuitionMin !== undefined) {
      where.tuitionFee = { ...where.tuitionFee as object, gte: tuitionMin };
    }
    if (tuitionMax !== undefined) {
      where.tuitionFee = { ...where.tuitionFee as object, lte: tuitionMax };
    }

    // Sort
    let orderBy: Prisma.UniversityProgramOrderByWithRelationInput = {};
    switch (sortBy) {
      case "tuition_asc": orderBy = { tuitionFee: { sort: "asc", nulls: "last" } }; break;
      case "tuition_desc": orderBy = { tuitionFee: { sort: "desc", nulls: "last" } }; break;
      case "name": orderBy = { name: "asc" }; break;
      default: orderBy = { university: { ranking: { sort: "asc", nulls: "last" } } };
    }

    const [programs, total] = await Promise.all([
      db.universityProgram.findMany({
        where,
        include: {
          university: {
            select: {
              id: true, name: true, country: true, city: true, type: true,
              ranking: true, logoUrl: true, coverImageUrl: true, intakes: true,
              minIelts: true, established: true,
            },
          },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.universityProgram.count({ where }),
    ]);

    return withSecurityHeaders(ok({
      data: programs,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }));
  } catch (e) {
    log.error("Programs GET failed", e);
    return err("Failed to fetch programs", 500);
  }
}
