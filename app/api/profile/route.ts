/**
 * /api/profile
 * ─────────────
 * GET  — returns logged-in user's profile + student/counselor data
 * PUT  — student updates their own profile
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, requireAuth, parseBody,
  rateLimit, withSecurityHeaders,
} from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  try {
    const profile = await db.profile.findUnique({
      where: { userId: ctx.userId },
      include: {
        student: {
          select: {
            id: true, firstName: true, lastName: true, dateOfBirth: true,
            gender: true, nationality: true, city: true, email: true, phone: true,
            educationLevel: true, englishTest: true, englishScore: true,
            preferredCountries: true, preferredLevel: true, preferredField: true,
            targetIntake: true, budgetRange: true, stage: true, profileStatus: true,
          },
        },
        counselor: {
          select: { id: true, specialization: true, bio: true, maxStudents: true },
        },
      },
    });

    if (!profile) return err("Profile not found", 404);

    const res = ok(profile);
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Profile GET]", e);
    return err("Failed to fetch profile", 500);
  }
}

export async function PUT(req: NextRequest) {
  const limited = rateLimit(req, 10, 60_000);
  if (limited) return limited;

  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body && !(body as object)) return body as Response;
  const b = body as Record<string, unknown>;

  // Only allow safe fields — never allow role or userId override
  const ALLOWED_PROFILE_FIELDS = ["fullName", "avatar", "phone"] as const;
  const ALLOWED_STUDENT_FIELDS = [
    "firstName", "lastName", "dateOfBirth", "gender", "nationality",
    "city", "district", "address", "phone", "emergencyContact",
    "educationLevel", "institutionName", "graduationYear", "gpaOrPercentage", "stream",
    "englishTest", "englishScore", "englishTestDate",
    "preferredCountries", "preferredLevel", "preferredField", "targetIntake", "budgetRange",
  ] as const;

  try {
    // Update Profile row
    const profileData: Record<string, unknown> = {};
    ALLOWED_PROFILE_FIELDS.forEach((f) => {
      if (b[f] !== undefined) profileData[f] = b[f];
    });

    if (Object.keys(profileData).length > 0) {
      await db.profile.update({
        where: { userId: ctx.userId },
        data: profileData as never,
      });
    }

    // Update Student row if exists
    if (ctx.role === "student") {
      const studentData: Record<string, unknown> = {};
      ALLOWED_STUDENT_FIELDS.forEach((f) => {
        if (b[f] !== undefined) studentData[f] = b[f];
      });

      if (Object.keys(studentData).length > 0) {
        await db.student.update({
          where: { userId: ctx.userId },
          data: studentData as never,
        });
      }
    }

    const res = ok({ message: "Profile updated successfully" });
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Profile PUT]", e);
    return err("Failed to update profile", 500);
  }
}
