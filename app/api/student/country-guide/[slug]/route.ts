/**
 * GET /api/student/country-guide/[slug]
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;

  const { slug } = await params;

  try {
    const guide = await db.countryGuide.findUnique({ where: { slug } });
    if (!guide) return err("Country guide not found", 404);

    // Also fetch universities for this country
    const universities = await db.university.findMany({
      where: { country: guide.country, isActive: true, deletedAt: null },
      select: {
        id: true, name: true, city: true, ranking: true, logoUrl: true,
        coverImageUrl: true, tuitionRangeMin: true, tuitionRangeMax: true,
        _count: { select: { programs: true } },
      },
      orderBy: { ranking: { sort: "asc", nulls: "last" } },
      take: 20,
    });

    return withSecurityHeaders(ok({ ...guide, universities }));
  } catch (e) {
    return err("Failed to fetch country guide", 500);
  }
}
