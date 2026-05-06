/**
 * GET /api/student/country-guide        — list all country guides
 * GET /api/student/country-guide?slug=  — single country guide
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;

  const slug = new URL(req.url).searchParams.get("slug");

  if (slug) {
    const guide = await db.countryGuide.findUnique({ where: { slug } });
    if (!guide) return err("Country guide not found", 404);
    return withSecurityHeaders(ok(guide));
  }

  const guides = await db.countryGuide.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
    select: {
      id: true, country: true, slug: true, flagEmoji: true,
      bannerImageUrl: true, overview: true, intakes: true,
      currency: true, avgTuitionMin: true, avgTuitionMax: true,
      universityCount: true, displayOrder: true,
    },
  });

  return withSecurityHeaders(ok(guides));
}
