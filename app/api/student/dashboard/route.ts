/**
 * GET /api/student/dashboard
 * ──────────────────────────
 * Aggregated dashboard data for the logged-in student:
 * - Profile completion percentage
 * - Stats (recommended programs, shortlisted, applications)
 * - Recommended universities based on profile
 * - Upcoming events
 * - Unread notifications count
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";
import { createModuleLogger } from "@/lib/logger";

const log = createModuleLogger("API:StudentDashboard");

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  try {
    // Fetch student with relations
    const student = await db.student.findUnique({
      where: { userId: ctx.userId },
      include: {
        applications: {
          where: { deletedAt: null },
          select: { id: true, status: true },
        },
      },
    });

    if (!student) {
      return withSecurityHeaders(ok({
        profilePct: 10,
        stats: { recommendedPrograms: 0, shortlistedUniversities: 0, totalApplications: 0 },
        recommendedUniversities: [],
        unreadNotifications: 0,
      }));
    }

    // Calculate profile completion
    const profileFields = [
      student.firstName, student.lastName, student.phone,
      student.dateOfBirth, student.gender, student.nationality,
      student.educationLevel, student.institutionName,
      student.englishTest, student.englishScore,
      student.preferredCountries?.length > 0,
      student.preferredLevel, student.preferredField,
      student.targetIntake, student.city,
    ];
    const filled = profileFields.filter(Boolean).length;
    const profilePct = Math.round((filled / profileFields.length) * 90) + 10;

    // Count bookmarks
    const bookmarkCount = await db.bookmark.count({
      where: { userId: ctx.userId, entityType: "university" },
    });

    // Get recommended universities based on preferred countries
    const preferredCountries = student.preferredCountries ?? [];
    let recommendedUniversities = await db.university.findMany({
      where: {
        isActive: true,
        deletedAt: null,
        ...(preferredCountries.length > 0 ? { country: { in: preferredCountries } } : {}),
      },
      select: {
        id: true, name: true, country: true, city: true, type: true,
        ranking: true, established: true, coverImageUrl: true, logoUrl: true,
        intakes: true, tuitionRangeMin: true, tuitionRangeMax: true,
        _count: { select: { programs: true } },
      },
      orderBy: [{ ranking: { sort: "asc", nulls: "last" } }],
      take: 6,
    });

    // If no results from preferred countries, get top-ranked globally
    if (recommendedUniversities.length === 0) {
      recommendedUniversities = await db.university.findMany({
        where: { isActive: true, deletedAt: null },
        select: {
          id: true, name: true, country: true, city: true, type: true,
          ranking: true, established: true, coverImageUrl: true, logoUrl: true,
          intakes: true, tuitionRangeMin: true, tuitionRangeMax: true,
          _count: { select: { programs: true } },
        },
        orderBy: [{ ranking: { sort: "asc", nulls: "last" } }],
        take: 6,
      });
    }

    // Unread notifications
    const unreadNotifications = await db.notification.count({
      where: { userId: ctx.userId, isRead: false },
    });

    const data = {
      profilePct,
      stats: {
        recommendedPrograms: recommendedUniversities.reduce((sum, u) => sum + (u._count?.programs ?? 0), 0),
        shortlistedUniversities: bookmarkCount,
        totalApplications: student.applications.length,
      },
      recommendedUniversities: recommendedUniversities.map(u => ({
        id: u.id,
        name: u.name,
        country: u.country,
        city: u.city,
        type: u.type ?? "Public",
        ranking: u.ranking,
        established: u.established ? String(u.established) : "N/A",
        coverImageUrl: u.coverImageUrl,
        logoUrl: u.logoUrl,
        intakes: u.intakes,
        courses: u._count?.programs ?? 0,
      })),
      unreadNotifications,
    };

    return withSecurityHeaders(ok(data));
  } catch (e) {
    log.error("Dashboard GET failed", e);
    return err("Failed to load dashboard data", 500);
  }
}
