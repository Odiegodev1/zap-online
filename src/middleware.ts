import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Se não estiver em /auth e não tiver token, redirecione para login
  if (!pathname.startsWith('/auth') && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Se estiver em /auth e tiver token, redirecione para home
  if (pathname.startsWith('/auth') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!.*\\..*|_next).*)',
};
