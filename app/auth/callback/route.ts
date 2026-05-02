import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { createModuleLogger } from "@/lib/logger";

const log = createModuleLogger("Auth:Callback");

/**
 * OAuth callback handler — Supabase exchanges the code for a session.
 * Redirects to /onboarding for new users, /dashboard for existing.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      log.info("OAuth code exchanged successfully, redirecting to " + next);
      return NextResponse.redirect(`${origin}${next}`);
    }
    log.error("OAuth code exchange failed", error);
  } else {
    log.warn("No OAuth code in callback URL", { searchParams: Object.fromEntries(searchParams) });
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
