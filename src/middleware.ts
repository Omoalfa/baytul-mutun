import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const userRoles = request.cookies.get('roles')?.value

  // Public routes that don't require authentication
  if (publicPaths.some(path => pathname.startsWith(path)) || pathname.startsWith('/_next') || pathname.startsWith('/api/auth')) {
    // Redirect to dashboard if already authenticated
    if (token && pathname !== '/verify-email') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next()
  }

  // Authentication check
  if (!token) {
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/instructor')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control
  const roles = userRoles ? JSON.parse(decodeURIComponent(userRoles)) : []

  // Instructor routes protection
  if (pathname.startsWith('/instructor') && !roles.includes('instructor')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Dashboard routes protection
  if (pathname.startsWith('/dashboard') && !roles.includes('student')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml).*)'],
}
