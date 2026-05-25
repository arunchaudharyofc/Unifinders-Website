import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { createModuleLogger } from "@/lib/logger";

const log = createModuleLogger("Auth:Callback");

/**
 * OAuth / Email-verification callback handler.
 * Supabase exchanges the code for a session, then we decide where to send the user:
 * - New user (no student record) → /onboarding
 * - Existing user → /dashboard
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Get the authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Check user's role from profile for smart redirect
        let destination = "/onboarding";
        try {
          const profile = await db.profile.findUnique({
            where: { userId: user.id },
            select: { role: true },
          });

          if (profile) {
            // Existing user — route by role
            if (profile.role === "staff" || profile.role === "admin") {
              destination = "/staff";
            } else {
              destination = "/dashboard";
            }
          } else {
            // No profile = new user → onboarding
            destination = "/onboarding";
          }
        } catch (e) {
          log.warn("Failed to check profile role, defaulting to onboarding", e);
        }

        // If explicit next param, honour it
        if (next) {
          log.info(`Auth callback: redirecting to explicit next=${next}`);
          return NextResponse.redirect(`${origin}${next}`);
        }

        log.info(`Auth callback: user=${user.id}, redirecting to ${destination}`);
        return NextResponse.redirect(`${origin}${destination}`);
      }

      // Fallback — session exists but no user (shouldn't happen)
      return NextResponse.redirect(`${origin}/dashboard`);
    }

    log.error("Auth code exchange failed", error);
  } else {
    log.warn("No auth code in callback URL", { searchParams: Object.fromEntries(searchParams) });
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
