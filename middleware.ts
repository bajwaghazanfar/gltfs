import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt_decode from "jwt-decode";
type User = {
  uuid: string;
  name: string;
  type: string;
};
export function middleware(req: NextRequest) {
  const { cookies } = req;
  const url = req.url;

  const token = cookies.get("token");

  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup")
  ) {
    if (token === undefined) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  console.log(req.nextUrl, token);
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (token === undefined) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      return NextResponse.next();
    }
  }
  //DECODING TOKEN HERE

  if (token?.value != null) {
    const decoded: User = jwt_decode(token?.value);

    if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
      if (decoded.type != "admin") {
        return NextResponse.redirect(
          new URL("/dashboard?showErr=Unauthorised!", req.url)
        );
      } else {
        return NextResponse.next();
      }
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
