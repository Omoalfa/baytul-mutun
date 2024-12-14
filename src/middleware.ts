import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that don't require authentication
const publicPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/',
  '/courses',
  '/courses/catalog',
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    // Redirect to dashboard if already authenticated
    if (token && pathname !== '/verify-email') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Paths to match
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api|_next|_static|favicon.ico|sitemap.xml).*)',
  ],
};
