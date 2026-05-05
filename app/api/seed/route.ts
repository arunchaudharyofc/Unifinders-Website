/**
 * POST /api/seed — Seeds DB with real university data
 * Only works in development or with admin auth
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, requireRole, withSecurityHeaders } from "@/lib/api-helpers";
import { UNIVERSITIES } from "@/prisma/seed/universities";
import { STUDY_FIELDS, COUNTRY_GUIDES, HELP_ARTICLES } from "@/prisma/seed/catalog-data";

export async function POST(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const roleCheck = requireRole(authResult.ctx, ["admin"]);
  if (roleCheck) return roleCheck;

  const results: string[] = [];

  try {
    // Seed Study Fields
    for (const f of STUDY_FIELDS) {
      await db.studyField.upsert({ where: { slug: f.slug }, create: f, update: { name: f.name, iconUrl: f.iconUrl, description: f.description, displayOrder: f.displayOrder } });
    }
    results.push(`${STUDY_FIELDS.length} study fields`);

    // Seed Country Guides
    for (const g of COUNTRY_GUIDES) {
      await db.countryGuide.upsert({
        where: { slug: g.slug },
        create: { country: g.country, slug: g.slug, flagEmoji: g.flagEmoji, flagUrl: g.flagUrl, bannerImageUrl: g.bannerImageUrl, overview: g.overview, whyStudyHere: g.whyStudyHere, livingCost: g.livingCost as object, visaRequirements: g.visaRequirements as object, topCities: g.topCities, workRights: g.workRights as object, intakes: g.intakes, currency: g.currency, avgTuitionMin: g.avgTuitionMin, avgTuitionMax: g.avgTuitionMax, universityCount: g.universityCount, displayOrder: g.displayOrder },
        update: { overview: g.overview, whyStudyHere: g.whyStudyHere, livingCost: g.livingCost as object, visaRequirements: g.visaRequirements as object, topCities: g.topCities, workRights: g.workRights as object, avgTuitionMin: g.avgTuitionMin, avgTuitionMax: g.avgTuitionMax, universityCount: g.universityCount },
      });
    }
    results.push(`${COUNTRY_GUIDES.length} country guides`);

    // Seed Help Articles
    for (const a of HELP_ARTICLES) {
      await db.helpArticle.upsert({ where: { slug: a.slug }, create: a, update: { title: a.title, content: a.content, category: a.category, tags: a.tags, displayOrder: a.displayOrder } });
    }
    results.push(`${HELP_ARTICLES.length} help articles`);

    // Seed Universities & Programs
    let progCount = 0;
    for (const uni of UNIVERSITIES) {
      const { programs, ...uniData } = uni;
      const existing = await db.university.findFirst({ where: { name: uni.name, country: uni.country }, select: { id: true } });
      const created = await db.university.upsert({
        where: { id: existing?.id ?? "___none___" },
        create: { name: uniData.name, country: uniData.country, city: uniData.city, type: uniData.type, established: uniData.established, ranking: uniData.ranking, websiteUrl: uniData.websiteUrl, coverImageUrl: uniData.coverImageUrl, description: uniData.description, intakes: uniData.intakes, minIelts: uniData.minIelts, minToefl: uniData.minToefl, minGpa: uniData.minGpa, tuitionRangeMin: uniData.tuitionRangeMin, tuitionRangeMax: uniData.tuitionRangeMax, applicationFee: uniData.applicationFee, studentCount: uniData.studentCount, acceptanceRate: uniData.acceptanceRate, isActive: true },
        update: { city: uniData.city, type: uniData.type, established: uniData.established, ranking: uniData.ranking, coverImageUrl: uniData.coverImageUrl, description: uniData.description, intakes: uniData.intakes, minIelts: uniData.minIelts, minToefl: uniData.minToefl, minGpa: uniData.minGpa, tuitionRangeMin: uniData.tuitionRangeMin, tuitionRangeMax: uniData.tuitionRangeMax, applicationFee: uniData.applicationFee, studentCount: uniData.studentCount, acceptanceRate: uniData.acceptanceRate },
      });
      for (const prog of programs) {
        const ep = await db.universityProgram.findFirst({ where: { universityId: created.id, name: prog.name, level: prog.level } });
        if (!ep) {
          await db.universityProgram.create({ data: { universityId: created.id, name: prog.name, level: prog.level, field: prog.field, duration: prog.duration, tuitionFee: prog.tuitionFee, isActive: true } });
          progCount++;
        }
      }
    }
    results.push(`${UNIVERSITIES.length} universities, ${progCount} programs`);

    return withSecurityHeaders(ok({ message: "Seed complete", results }));
  } catch (e: any) {
    console.error("[Seed] Error:", e);
    return err(`Seed failed: ${e.message}`, 500);
  }
}
