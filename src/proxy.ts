import { NextResponse, type NextRequest } from "next/server";
const protectedRoutes = ["/dashboard", "/settings", "/admin"];
export function proxy(request: NextRequest) { const { pathname } = request.nextUrl; if (!protectedRoutes.some((route) => pathname.startsWith(route))) return NextResponse.next(); const session = request.cookies.get("authjs.session-token") ?? request.cookies.get("__Secure-authjs.session-token"); if (!session) { const signInUrl = new URL("/sign-in", request.url); signInUrl.searchParams.set("callbackUrl", pathname); return NextResponse.redirect(signInUrl); } return NextResponse.next(); }
export const config = { matcher: ["/dashboard/:path*", "/settings/:path*", "/admin/:path*"] };
