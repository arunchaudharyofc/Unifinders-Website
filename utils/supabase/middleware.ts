import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          
          // Sync request headers so downstream Route Handlers and layouts see the fresh cookies
          const requestHeaders = new Headers(request.headers)
          const cookieString = request.cookies.getAll().map(c => `${c.name}=${c.value}`).join('; ')
          requestHeaders.set('cookie', cookieString)
          
          supabaseResponse = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          })
          
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  let user = null;
  try {
    const { data, error } = await supabase.auth.getUser();
    user = data?.user;
    if (error) {
      console.error("[Middleware updateSession] getUser failed. error:", error);
    }
  } catch (err) {
    console.error("[Middleware updateSession] getUser crashed. error:", err);
  }

  // ── Route Protection ──────────────────────────────────────────────────────
  const path = request.nextUrl.pathname

  // Protect /dashboard, /onboarding, and /staff — redirect to login if not authenticated
  const protectedPaths = ['/dashboard', '/onboarding', '/staff']
  if (protectedPaths.some(p => path.startsWith(p)) && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  // (Login/callback handle the actual role-based destination)
  if (user && (path === '/auth/login' || path === '/auth/register') && !path.startsWith('/auth/callback')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  // ─────────────────────────────────────────────────────────────────────────

  return supabaseResponse
}
