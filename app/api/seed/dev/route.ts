/**
 * GET /api/seed/dev — Dev-only seed endpoint (no auth required)
 * DELETE THIS FILE before deploying to production!
 */
import { db } from "@/lib/db";
import { UNIVERSITIES } from "@/prisma/seed/universities";
import { STUDY_FIELDS, COUNTRY_GUIDES, HELP_ARTICLES } from "@/prisma/seed/catalog-data";
import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const results: string[] = [];
  try {
    // Study Fields
    for (const f of STUDY_FIELDS) {
      await db.studyField.upsert({ where: { slug: f.slug }, create: f, update: { name: f.name, iconUrl: f.iconUrl, description: f.description, displayOrder: f.displayOrder } });
    }
    results.push(`✅ ${STUDY_FIELDS.length} study fields`);

    // Country Guides
    for (const g of COUNTRY_GUIDES) {
      await db.countryGuide.upsert({
        where: { slug: g.slug },
        create: { country: g.country, slug: g.slug, flagEmoji: g.flagEmoji, flagUrl: g.flagUrl, bannerImageUrl: g.bannerImageUrl, overview: g.overview, whyStudyHere: g.whyStudyHere, livingCost: g.livingCost as object, visaRequirements: g.visaRequirements as object, topCities: g.topCities, workRights: g.workRights as object, intakes: g.intakes, currency: g.currency, avgTuitionMin: g.avgTuitionMin, avgTuitionMax: g.avgTuitionMax, universityCount: g.universityCount, displayOrder: g.displayOrder },
        update: { overview: g.overview, livingCost: g.livingCost as object, visaRequirements: g.visaRequirements as object },
      });
    }
    results.push(`✅ ${COUNTRY_GUIDES.length} country guides`);

    // Help Articles
    for (const a of HELP_ARTICLES) {
      await db.helpArticle.upsert({ where: { slug: a.slug }, create: a, update: { title: a.title, content: a.content } });
    }
    results.push(`✅ ${HELP_ARTICLES.length} help articles`);

    // Universities & Programs
    let progCount = 0;
    for (const uni of UNIVERSITIES) {
      const { programs, ...u } = uni;
      const existing = await db.university.findFirst({ where: { name: u.name, country: u.country }, select: { id: true } });
      const created = await db.university.upsert({
        where: { id: existing?.id ?? "___none___" },
        create: { name: u.name, country: u.country, city: u.city, type: u.type, established: u.established, ranking: u.ranking, websiteUrl: u.websiteUrl, coverImageUrl: u.coverImageUrl, description: u.description, intakes: u.intakes, minIelts: u.minIelts, minToefl: u.minToefl, minGpa: u.minGpa, tuitionRangeMin: u.tuitionRangeMin, tuitionRangeMax: u.tuitionRangeMax, applicationFee: u.applicationFee, studentCount: u.studentCount, acceptanceRate: u.acceptanceRate, isActive: true },
        update: { ranking: u.ranking, coverImageUrl: u.coverImageUrl, established: u.established, studentCount: u.studentCount, acceptanceRate: u.acceptanceRate },
      });
      for (const p of programs) {
        const ep = await db.universityProgram.findFirst({ where: { universityId: created.id, name: p.name, level: p.level } });
        if (!ep) { await db.universityProgram.create({ data: { universityId: created.id, name: p.name, level: p.level, field: p.field, duration: p.duration, tuitionFee: p.tuitionFee, isActive: true } }); progCount++; }
      }
    }
    results.push(`✅ ${UNIVERSITIES.length} universities, ${progCount} programs`);

    return NextResponse.json({ success: true, results });
  } catch (e: any) {
    console.error("[Seed]", e);
    return NextResponse.json({ error: e.message, stack: e.stack?.split("\n").slice(0, 5) }, { status: 500 });
  }
}
