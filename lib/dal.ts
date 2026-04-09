/**
 * Data Access Layer (DAL)
 * ───────────────────────
 * Single source for ALL data fetching in Server Components.
 * Pattern: try DB → if empty → fallback to constants.
 * This ensures the site never shows a blank page, even before the DB is seeded.
 *
 * @updated 2026-04-09 — Full DB queries for all content types
 */

import { db } from "./db";
import {
  EVENTS as STATIC_EVENTS,
  BLOG_POSTS as STATIC_BLOGS,
  PARTNER_UNIVERSITIES,
} from "./constants/landing";
import { BLOG_POSTS as FALLBACK_BLOGS } from "./constants/blogs";
import { EVENTS as FALLBACK_EVENTS } from "./constants/events";
import { SCHOLARSHIPS as FALLBACK_SCHOLARSHIPS } from "./constants/scholarships";
import { COURSES as FALLBACK_COURSES } from "./constants/courses";

// ─── Types ────────────────────────────────────────────────────────────────────

export type EventRecord = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  location: string;
  image_url: string | null;
  status?: "upcoming" | "past";
};

// ─── Events ───────────────────────────────────────────────────────────────────

export async function getEvents(): Promise<EventRecord[]> {
  try {
    const events = await db.event.findMany({
      where: { deletedAt: null },
      orderBy: { startDate: "asc" },
      take: 20,
    });

    if (events.length > 0) {
      return events.map((e) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        start_date: e.startDate.toISOString(),
        location: e.location,
        image_url: e.coverImage,
        status: e.status === "UPCOMING" || e.status === "ONGOING" ? "upcoming" : "past",
      }));
    }
  } catch (_e) {
    console.warn("[DAL] Events DB unavailable, using fallback");
  }
  // Fallback to events constants (already in correct shape)
  return FALLBACK_EVENTS as unknown as EventRecord[];
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export async function getBlogPosts() {
  try {
    const posts = await db.blogPost.findMany({
      where: { status: "PUBLISHED", deletedAt: null },
      orderBy: { publishedAt: "desc" },
      take: 20,
      select: {
        id: true, slug: true, title: true, excerpt: true, coverImage: true,
        authorName: true, authorAvatar: true, category: true, tags: true,
        readTime: true, publishedAt: true, viewCount: true,
      },
    });

    if (posts.length > 0) return posts;
  } catch (_e) {
    console.warn("[DAL] BlogPosts DB unavailable, using fallback");
  }
  return FALLBACK_BLOGS as unknown as typeof FALLBACK_BLOGS;
}

export async function getBlogBySlug(slug: string) {
  try {
    const post = await db.blogPost.findUnique({
      where: { slug, deletedAt: null },
    });
    if (post) {
      // Increment view count (non-blocking)
      db.blogPost.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } }).catch(() => {});
      return post;
    }
  } catch (_e) {
    console.warn("[DAL] Blog detail DB unavailable, using fallback");
  }
  return FALLBACK_BLOGS.find((b) => "slug" in b && b.slug === slug) ?? null;
}

// ─── Scholarships ─────────────────────────────────────────────────────────────

export async function getScholarships(filters?: { country?: string; level?: string }) {
  try {
    const scholarships = await db.scholarship.findMany({
      where: {
        status: "OPEN",
        deletedAt: null,
        ...(filters?.country ? { country: filters.country } : {}),
        ...(filters?.level ? { level: filters.level } : {}),
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      take: 30,
    });

    if (scholarships.length > 0) return scholarships;
  } catch (_e) {
    console.warn("[DAL] Scholarships DB unavailable, using fallback");
  }
  return FALLBACK_SCHOLARSHIPS;
}

export async function getScholarshipBySlug(slug: string) {
  try {
    const s = await db.scholarship.findUnique({ where: { slug, deletedAt: null } });
    if (s) {
      db.scholarship.update({ where: { id: s.id }, data: { viewCount: { increment: 1 } } }).catch(() => {});
      return s;
    }
  } catch (_e) {
    console.warn("[DAL] Scholarship detail DB unavailable, using fallback");
  }
  return FALLBACK_SCHOLARSHIPS.find((s) => "slug" in s && s.slug === slug) ?? null;
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export async function getCourses(category?: string) {
  try {
    const courses = await db.course.findMany({
      where: {
        isActive: true,
        deletedAt: null,
        ...(category ? { category } : {}),
      },
      orderBy: [{ isFeatured: "desc" }, { enrollmentCount: "desc" }],
    });

    if (courses.length > 0) return courses;
  } catch (_e) {
    console.warn("[DAL] Courses DB unavailable, using fallback");
  }
  return FALLBACK_COURSES;
}

export async function getCourseBySlug(slug: string) {
  try {
    const course = await db.course.findUnique({ where: { slug, deletedAt: null } });
    if (course) return course;
  } catch (_e) {
    console.warn("[DAL] Course detail DB unavailable, using fallback");
  }
  return FALLBACK_COURSES.find((c) => "slug" in c && c.slug === slug) ?? null;
}

// ─── Universities ─────────────────────────────────────────────────────────────

export async function getUniversities(country?: string) {
  try {
    const unis = await db.university.findMany({
      where: { isActive: true, ...(country ? { country } : {}) },
      orderBy: { ranking: "asc" },
      take: 30,
    });

    if (unis.length > 0) {
      return unis.map((u) => ({
        name: u.name,
        logo: u.logoUrl ?? `https://logo.clearbit.com/${u.websiteUrl?.replace(/https?:\/\//, "") ?? "edu.com"}`,
        country: u.country.toLowerCase().slice(0, 2),
      }));
    }
  } catch (_e) {
    console.warn("[DAL] Universities DB unavailable, using fallback");
  }
  return PARTNER_UNIVERSITIES;
}

// ─── Countries ────────────────────────────────────────────────────────────────

export async function getCountries() {
  const { DESTINATIONS } = await import("./constants/destinations");
  return Object.values(DESTINATIONS);
}

export async function getCountryBySlug(slug: string) {
  const { DESTINATIONS } = await import("./constants/destinations");
  return DESTINATIONS[slug] ?? null;
}

// ─── Dashboard: Student ───────────────────────────────────────────────────────

export async function getStudentDashboardData(userId: string) {
  try {
    const student = await db.student.findUnique({
      where: { userId },
      include: {
        applications: {
          where: { deletedAt: null },
          include: {
            university: { select: { name: true, country: true, logoUrl: true } },
            program: { select: { name: true, level: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        documents: {
          where: { deletedAt: null },
          select: { id: true, type: true, status: true, name: true, createdAt: true },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        notifications: {
          where: { isRead: false },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    return student;
  } catch (e) {
    console.error("[DAL] getStudentDashboardData failed:", e);
    return null;
  }
}

// ─── Legacy compat exports ────────────────────────────────────────────────────

export { STATIC_EVENTS, STATIC_BLOGS };
