/**
 * Master Seed Script
 * ──────────────────
 * Seeds the database with real university data, study fields,
 * country guides, and help center articles.
 *
 * Usage: npx tsx prisma/seed/index.ts
 */

import { PrismaClient } from "@prisma/client";
import { UNIVERSITIES } from "./universities";
import { STUDY_FIELDS, COUNTRY_GUIDES, HELP_ARTICLES } from "./catalog-data";

const db = new PrismaClient();

async function seedUniversities() {
  console.log("🏫 Seeding universities & programs...");
  let uniCount = 0;
  let progCount = 0;

  for (const uni of UNIVERSITIES) {
    const { programs, ...uniData } = uni;

    const created = await db.university.upsert({
      where: {
        // Use a composite lookup by name+country since we don't have stable IDs
        id: (await db.university.findFirst({
          where: { name: uni.name, country: uni.country },
          select: { id: true },
        }))?.id ?? "new-" + Math.random(),
      },
      create: {
        name: uniData.name,
        country: uniData.country,
        city: uniData.city,
        type: uniData.type,
        established: uniData.established,
        ranking: uniData.ranking,
        websiteUrl: uniData.websiteUrl,
        coverImageUrl: uniData.coverImageUrl,
        description: uniData.description,
        intakes: uniData.intakes,
        minIelts: uniData.minIelts,
        minToefl: uniData.minToefl,
        minGpa: uniData.minGpa,
        tuitionRangeMin: uniData.tuitionRangeMin,
        tuitionRangeMax: uniData.tuitionRangeMax,
        applicationFee: uniData.applicationFee,
        studentCount: uniData.studentCount,
        acceptanceRate: uniData.acceptanceRate,
        isActive: true,
      },
      update: {
        city: uniData.city,
        type: uniData.type,
        established: uniData.established,
        ranking: uniData.ranking,
        websiteUrl: uniData.websiteUrl,
        coverImageUrl: uniData.coverImageUrl,
        description: uniData.description,
        intakes: uniData.intakes,
        minIelts: uniData.minIelts,
        minToefl: uniData.minToefl,
        minGpa: uniData.minGpa,
        tuitionRangeMin: uniData.tuitionRangeMin,
        tuitionRangeMax: uniData.tuitionRangeMax,
        applicationFee: uniData.applicationFee,
        studentCount: uniData.studentCount,
        acceptanceRate: uniData.acceptanceRate,
      },
    });

    uniCount++;

    // Seed programs for this university
    for (const prog of programs) {
      const existing = await db.universityProgram.findFirst({
        where: { universityId: created.id, name: prog.name, level: prog.level },
      });

      if (!existing) {
        await db.universityProgram.create({
          data: {
            universityId: created.id,
            name: prog.name,
            level: prog.level,
            field: prog.field,
            duration: prog.duration,
            tuitionFee: prog.tuitionFee,
            isActive: true,
          },
        });
        progCount++;
      }
    }
  }

  console.log(`   ✅ ${uniCount} universities, ${progCount} new programs`);
}

async function seedStudyFields() {
  console.log("📚 Seeding study fields...");
  let count = 0;

  for (const field of STUDY_FIELDS) {
    await db.studyField.upsert({
      where: { slug: field.slug },
      create: field,
      update: {
        name: field.name,
        iconUrl: field.iconUrl,
        description: field.description,
        displayOrder: field.displayOrder,
      },
    });
    count++;
  }

  console.log(`   ✅ ${count} study fields`);
}

async function seedCountryGuides() {
  console.log("🌍 Seeding country guides...");
  let count = 0;

  for (const guide of COUNTRY_GUIDES) {
    await db.countryGuide.upsert({
      where: { slug: guide.slug },
      create: {
        country: guide.country,
        slug: guide.slug,
        flagEmoji: guide.flagEmoji,
        flagUrl: guide.flagUrl,
        bannerImageUrl: guide.bannerImageUrl,
        overview: guide.overview,
        whyStudyHere: guide.whyStudyHere,
        livingCost: guide.livingCost as object,
        visaRequirements: guide.visaRequirements as object,
        topCities: guide.topCities,
        workRights: guide.workRights as object,
        intakes: guide.intakes,
        currency: guide.currency,
        avgTuitionMin: guide.avgTuitionMin,
        avgTuitionMax: guide.avgTuitionMax,
        universityCount: guide.universityCount,
        displayOrder: guide.displayOrder,
      },
      update: {
        overview: guide.overview,
        whyStudyHere: guide.whyStudyHere,
        livingCost: guide.livingCost as object,
        visaRequirements: guide.visaRequirements as object,
        topCities: guide.topCities,
        workRights: guide.workRights as object,
        intakes: guide.intakes,
        avgTuitionMin: guide.avgTuitionMin,
        avgTuitionMax: guide.avgTuitionMax,
        universityCount: guide.universityCount,
      },
    });
    count++;
  }

  console.log(`   ✅ ${count} country guides`);
}

async function seedHelpArticles() {
  console.log("📖 Seeding help articles...");
  let count = 0;

  for (const article of HELP_ARTICLES) {
    await db.helpArticle.upsert({
      where: { slug: article.slug },
      create: article,
      update: {
        title: article.title,
        content: article.content,
        category: article.category,
        tags: article.tags,
        displayOrder: article.displayOrder,
      },
    });
    count++;
  }

  console.log(`   ✅ ${count} help articles`);
}

async function main() {
  console.log("\n🚀 Starting Unifinders database seed...\n");

  try {
    await seedStudyFields();
    await seedCountryGuides();
    await seedHelpArticles();
    await seedUniversities();

    console.log("\n✨ Seed completed successfully!\n");
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
