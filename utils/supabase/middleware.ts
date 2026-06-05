import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname

  // ── Protected & Auth Routes Check ──────────────────────────────────────────
  const protectedPaths = ['/dashboard', '/onboarding', '/staff']
  const authPaths = ['/auth/login', '/auth/register']

  const isProtected = protectedPaths.some(p => path.startsWith(p))
  const isAuth = authPaths.some(p => path === p)

  // Optimization: Skip session checks completely for public routes and API routes.
  // API route handlers each call requireAuth() independently — doing it here too
  // would cause parallel token refreshes that trigger Supabase's token reuse
  // detection (which revokes sessions and logs users out).
  if (!isProtected && !isAuth) {
    return NextResponse.next({ request })
  }

  // Track cookies that the Supabase client wants to set (for token refresh)
  let cookiesToUpdate: Array<{ name: string; value: string; options: Record<string, unknown> }> = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Update request cookies in-place so downstream handlers see fresh tokens
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          // Track for later — we'll set them on the final response
          cookiesToUpdate = cookiesToSet.map(c => ({
            name: c.name,
            value: c.value,
            options: c.options as Record<string, unknown>,
          }))
        },
      },
    }
  )

  // IMPORTANT: Use getUser() not getSession() — getSession() reads from
  // the local cookie without server validation and can return stale data.
  const { data: { user } } = await supabase.auth.getUser()

  // ── Route Protection ──────────────────────────────────────────────────────
  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (user && isAuth) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // ── Build the response with properly forwarded cookies ─────────────────────
  //
  // CRITICAL: On Vercel, middleware runs at the Edge and pages/layouts run as
  // Lambda functions. Simply calling request.cookies.set() does NOT reliably
  // propagate to the Lambda. We MUST explicitly serialize the updated cookies
  // into the request's `cookie` header.
  //
  const requestHeaders = new Headers(request.headers)

  // Serialize ALL cookies (including any refreshed tokens) into the header
  const cookieString = request.cookies
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ')
  requestHeaders.set('cookie', cookieString)

  // Pass user info downstream via headers so layouts don't need to call
  // getUser() again (which could trigger a second token refresh and cause
  // token reuse revocation)
  if (user) {
    requestHeaders.set('x-supabase-user-id', user.id)
    requestHeaders.set('x-supabase-user-email', user.email || '')
  }

  const supabaseResponse = NextResponse.next({
    request: { headers: requestHeaders },
  })

  // Set refreshed cookies on the RESPONSE so the browser stores them
  cookiesToUpdate.forEach(({ name, value, options }) => {
    supabaseResponse.cookies.set(name, value, options)
  })

  return supabaseResponse
}
