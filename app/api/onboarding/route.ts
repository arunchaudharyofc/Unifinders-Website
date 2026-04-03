/**
 * POST /api/onboarding
 * --------------------
 * Creates or updates a Student + Profile record in Prisma after onboarding wizard completes.
 * Validates auth via Supabase, then upserts the student row.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      firstName, lastName, phone, gender, city, district,
      educationLevel, institutionName, graduationYear, gpaOrPercentage, stream,
      englishTest, englishScore,
      preferredCountries, preferredLevel, preferredField, targetIntake, budgetRange,
    } = body;

    // Upsert Profile row
    await db.profile.upsert({
      where:  { userId: user.id },
      create: { userId: user.id, role: "student", fullName: `${firstName} ${lastName}`, phone },
      update: { fullName: `${firstName} ${lastName}`, phone },
    });

    // Upsert Student row
    await db.student.upsert({
      where:  { userId: user.id },
      create: {
        userId: user.id,
        email: user.email!,
        firstName, lastName, phone: phone || null,
        gender: gender || null, city: city || null, district: district || null,
        educationLevel: educationLevel || null,
        institutionName: institutionName || null,
        graduationYear: graduationYear ? parseInt(graduationYear) : null,
        gpaOrPercentage: gpaOrPercentage || null,
        stream: stream || null,
        englishTest: englishTest || null,
        englishScore: englishScore || null,
        preferredCountries: preferredCountries || [],
        preferredLevel: preferredLevel || null,
        preferredField: preferredField || null,
        targetIntake: targetIntake || null,
        budgetRange: budgetRange || null,
        profileStatus: "COMPLETE",
      },
      update: {
        firstName, lastName, phone: phone || null,
        gender: gender || null, city: city || null, district: district || null,
        educationLevel: educationLevel || null,
        institutionName: institutionName || null,
        graduationYear: graduationYear ? parseInt(graduationYear) : null,
        gpaOrPercentage: gpaOrPercentage || null,
        stream: stream || null,
        englishTest: englishTest || null,
        englishScore: englishScore || null,
        preferredCountries: preferredCountries || [],
        preferredLevel: preferredLevel || null,
        preferredField: preferredField || null,
        targetIntake: targetIntake || null,
        budgetRange: budgetRange || null,
        profileStatus: "COMPLETE",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("[/api/onboarding] Error:", err);
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
