import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || '';


const protectedRoutes: Record<string, string> = {
  '/dashboard/customer': 'CUSTOMER',
  '/dashboard/technician': 'TECHNICIAN',
  '/dashboard/admin': 'ADMIN',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  
  const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (!matchedRoute) {
    return NextResponse.next();
  }

  const requiredRole = protectedRoutes[matchedRoute];
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== requiredRole) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};