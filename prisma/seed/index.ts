/**
 * Master Seed Script — Unifinders Student Portal
 * Seeds: Universities, Programs, Study Fields, Country Guides, Help Articles
 * Run: npx tsx prisma/seed/index.ts
 */
import { PrismaClient } from "@prisma/client";
import { universities, studyFields, countryGuides, helpArticles } from "./universities";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...\n");

  // 1. Study Fields
  await db.studyField.createMany({ data: studyFields, skipDuplicates: true });
  console.log(`   ✅ ${studyFields.length} study fields seeded`);

  // 2. Country Guides
  console.log("🌍 Seeding country guides...");
  for (const guide of countryGuides) {
    await db.countryGuide.upsert({
      where: { slug: guide.slug },
      update: { overview: guide.overview },
      create: {
        country: guide.country, slug: guide.slug, flagEmoji: guide.flagEmoji,
        bannerImageUrl: guide.bannerImageUrl, overview: guide.overview,
        whyStudyHere: guide.whyStudyHere, livingCost: guide.livingCost,
        visaRequirements: guide.visaRequirements, intakes: guide.intakes,
        currency: guide.currency, avgTuitionMin: guide.avgTuitionMin,
        avgTuitionMax: guide.avgTuitionMax, universityCount: guide.universityCount,
        isActive: guide.isActive, displayOrder: guide.displayOrder,
      },
    });
  }
  console.log(`   ✅ ${countryGuides.length} country guides seeded`);

  // 3. Universities + Programs
  console.log("🏛️  Seeding universities and programs...");
  let programCount = 0;
  for (const uni of universities) {
    const { programs, slug, ...uniData } = uni as any;
    let created = await db.university.findFirst({ where: { name: uniData.name, country: uniData.country } });
    if (!created) {
      created = await db.university.create({
        data: {
          name: uniData.name,
          country: uniData.country,
          city: uniData.city,
          type: uniData.type,
          ranking: uniData.ranking,
          established: uniData.established,
          description: uniData.description,
          websiteUrl: uniData.website,
          coverImageUrl: uniData.coverImageUrl,
          logoUrl: uniData.logoUrl,
          intakes: uniData.intakes,
          isActive: uniData.isActive,
          tuitionRangeMin: uniData.tuitionRangeMin,
          tuitionRangeMax: uniData.tuitionRangeMax,
        },
      });
    }
    for (const prog of programs) {
      const existingProg = await db.universityProgram.findFirst({
        where: { universityId: created!.id, name: prog.name },
      });
      if (!existingProg) {
        await db.universityProgram.create({
          data: {
            universityId: created!.id,
            name: prog.name,
            level: prog.level,
            field: prog.field,
            duration: `${prog.durationMonths} months`,
            tuitionFee: prog.tuitionFee,
            isActive: true,
          },
        });
        programCount++;
      }
    }
  }
  console.log(`   ✅ ${universities.length} universities and ${programCount} programs seeded`);

  // 4. Help Articles
  console.log("❓ Seeding help articles...");
  for (const article of helpArticles) {
    await db.helpArticle.upsert({
      where: { slug: article.slug },
      update: { title: article.title, content: article.content },
      create: article,
    });
  }
  console.log(`   ✅ ${helpArticles.length} help articles seeded`);

  console.log("\n🎉 Seed completed successfully!");
}

main().catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); }).finally(() => db.$disconnect());
