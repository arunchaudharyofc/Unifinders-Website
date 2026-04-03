import { db } from "./db";
import { EVENTS, BLOG_POSTS, PARTNER_UNIVERSITIES } from "./constants/landing";

/**
 * Data Access Layer (DAL) for Landing Page
 * Fetches real data from Prisma/Supabase if available.
 * Gracefully falls back to `constants/landing.ts` if the database is uninitialized or empty.
 */

// Format output to match existing frontend shapes
export type EventRecord = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  location: string;
  image_url: string | null;
  status?: "upcoming" | "past";
};

export async function getEvents() {
  try {
    // Attempt DB fetch (dummy table logic until full admin CMS is built)
    // We haven't created a dedicated "Event" table yet in prisma schema,
    // so we mock a table response or just return constants for now.
    // If the schema had `model Event`, we'd do: `return await db.event.findMany(...)`
    
    return [...EVENTS] as any;
  } catch (_error) {
    console.error("Failed to fetch events from DB, falling back to constants:", _error);
    return [...EVENTS] as any;
  }
}

export async function getUniversities() {
  try {
    const unis = await db.university.findMany({
      where: { isActive: true },
      take: 20,
      orderBy: { ranking: 'asc' }
    });

    if (unis && unis.length > 0) {
      return unis.map((u: any) => ({
        name: u.name,
        logo: u.logoUrl || "https://logo.clearbit.com/university.edu",
        country: u.country.substring(0, 2).toLowerCase() // mock flag code
      }));
    }
  } catch (_error) {
    console.warn("DB config missing or universities empty. Falling back to static data.");
  }
  
  return [...PARTNER_UNIVERSITIES];
}

export async function getBlogPosts() {
  // Wait until we model the Blog table in Prisma. 
  // Fallback to static blogs for now.
  return [...BLOG_POSTS];
}

export async function getCourses(): Promise<any[]> { return []; }
export async function getCourseBySlug(_slug: string): Promise<any> { return {} as any; }
export async function getCountries(): Promise<any[]> { return []; }
export async function getCountryBySlug(_slug: string): Promise<any> { return {} as any; }
