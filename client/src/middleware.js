import { NextResponse } from "next/server";
import { isAdmin, verifyToken } from "@/lib/auth";

export function middleware(request) {
  const payload = verifyToken(request);
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);

  if (!payload) {
    return NextResponse.redirect(loginUrl);
  }

  if (!isAdmin(payload)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
