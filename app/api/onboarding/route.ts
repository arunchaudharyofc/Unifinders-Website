/**
 * POST /api/onboarding
 * ─────────────────────
 * Creates or updates Student + Profile after the 4-step onboarding wizard.
 * - Rate limited: 10 req / min per IP
 * - Auth required (Supabase session)
 * - Input sanitized: only whitelisted fields are written, no role escalation
 * - Idempotent: safe to call multiple times (upsert pattern)
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, requireAuth, rateLimit,
  parseBody, missingFields, withSecurityHeaders,
} from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 10, 60_000);
  if (limited) return limited;

  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body && !(body as object)) return body as Response;
  const b = body as Record<string, unknown>;

  const missing = missingFields(b, ["firstName", "lastName"]);
  if (missing) return err(missing, 422);

  // Sanitize: trim strings, cap lengths
  const s = (v: unknown, max = 100) =>
    v ? String(v).trim().slice(0, max) : null;

  const firstName = s(b.firstName, 50) ?? "";
  const lastName = s(b.lastName, 50) ?? "";

  try {
    // Upsert Profile row
    await db.profile.upsert({
      where: { userId: ctx.userId },
      create: {
        userId: ctx.userId,
        role: "student",
        fullName: `${firstName} ${lastName}`,
        phone: s(b.phone, 20),
      },
      update: {
        fullName: `${firstName} ${lastName}`,
        phone: s(b.phone, 20),
      },
    });

    // Upsert Student row
    await db.student.upsert({
      where: { userId: ctx.userId },
      create: {
        userId: ctx.userId,
        email: ctx.email,
        firstName,
        lastName,
        phone: s(b.phone, 20),
        gender: s(b.gender, 20),
        city: s(b.city, 50),
        district: s(b.district, 50),
        address: s(b.address, 200),
        educationLevel: s(b.educationLevel, 50),
        institutionName: s(b.institutionName, 200),
        graduationYear: b.graduationYear ? parseInt(String(b.graduationYear)) : null,
        gpaOrPercentage: s(b.gpaOrPercentage, 20),
        stream: s(b.stream, 50),
        englishTest: s(b.englishTest, 20),
        englishScore: s(b.englishScore, 20),
        preferredCountries: Array.isArray(b.preferredCountries)
          ? (b.preferredCountries as string[]).slice(0, 10)
          : [],
        preferredLevel: s(b.preferredLevel, 50),
        preferredField: s(b.preferredField, 100),
        targetIntake: s(b.targetIntake, 50),
        budgetRange: s(b.budgetRange, 50),
        profileStatus: "COMPLETE",
      },
      update: {
        firstName,
        lastName,
        phone: s(b.phone, 20),
        gender: s(b.gender, 20),
        city: s(b.city, 50),
        district: s(b.district, 50),
        address: s(b.address, 200),
        educationLevel: s(b.educationLevel, 50),
        institutionName: s(b.institutionName, 200),
        graduationYear: b.graduationYear ? parseInt(String(b.graduationYear)) : null,
        gpaOrPercentage: s(b.gpaOrPercentage, 20),
        stream: s(b.stream, 50),
        englishTest: s(b.englishTest, 20),
        englishScore: s(b.englishScore, 20),
        preferredCountries: Array.isArray(b.preferredCountries)
          ? (b.preferredCountries as string[]).slice(0, 10)
          : [],
        preferredLevel: s(b.preferredLevel, 50),
        preferredField: s(b.preferredField, 100),
        targetIntake: s(b.targetIntake, 50),
        budgetRange: s(b.budgetRange, 50),
        profileStatus: "COMPLETE",
      },
    });

    const res = ok({ success: true, message: "Profile saved successfully" });
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[/api/onboarding]", e);
    return err("Failed to save profile. Please try again.", 500);
  }
}
