/**
 * ROOT MIDDLEWARE
 * ---------------
 * Called on every request. Refreshes the Supabase auth session so
 * cookies stay valid across navigations.
 *
 * WITHOUT this file the Supabase SSR client cannot rotate the access-token
 * cookie → getUser() returns null on the next server render → layout.tsx
 * redirects to /auth/login (looks like auto-logout on every page change).
 */
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image  (image optimisation)
     * - favicon.ico  (browser tab icon)
     * - public assets (.svg, .png, .jpg, .jpeg, .gif, .webp)
     *
     * This ensures the session refresh runs on every page/API route while
     * static assets are served without the overhead of auth verification.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
