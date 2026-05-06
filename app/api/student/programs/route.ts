/**
 * GET /api/student/programs
 * Browse programs with filters (field, level, country, search)
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

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

  const where: any = { isActive: true };
  if (q) where.name = { contains: q, mode: "insensitive" };
  if (level) where.level = level;
  if (field) where.field = { contains: field, mode: "insensitive" };
  if (country) where.university = { country: { contains: country, mode: "insensitive" }, isActive: true };
  else where.university = { isActive: true };

  const [data, total] = await Promise.all([
    db.universityProgram.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: "asc" },
      include: {
        university: {
          select: { id: true, name: true, country: true, city: true, ranking: true, logoUrl: true, coverImageUrl: true },
        },
      },
    }),
    db.universityProgram.count({ where }),
  ]);

  const res = ok({ data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  return withSecurityHeaders(res);
}
