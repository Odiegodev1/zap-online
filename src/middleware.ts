import { NextRequest, NextResponse } from "next/server";
import { handleGetUser } from "@/lib/server/auth";

export async function middleware(request: NextRequest) {
  const user = await handleGetUser(); // obtenha o usuário corretamente

  const { pathname } = request.nextUrl;

  // Se não estiver em /auth e não tiver user, redirecione para login
  if (!pathname.startsWith('/auth') && !user) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Se estiver em /auth e tiver user, redirecione para home
  if (pathname.startsWith('/auth') && user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Caso contrário, deixe passar normalmente (retorne undefined ou NextResponse.next())
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!.*\\..*|_next).*)',
};
