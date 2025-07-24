import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(`${process.env.NEXT_PUBLIC_AUTH_KEY}`)?.value;
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/auth') && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!.*\\..*|_next).*)',
};
