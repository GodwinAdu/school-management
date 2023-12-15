import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { fetchAdmin } from "./lib/actions/fetchadmin.actions";


 
export async function middleware(req: NextRequest) {
  const tokenValue = req.cookies.get("token");

  try {
    if (!tokenValue || !tokenValue.value) {
      // return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    const decode = await jwt.verify(
      tokenValue.value,
      process.env.TOKEN_SECRET!
    );
    // Check if the token has expired
    if (!decode) {
      // return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    
  } catch (error) {
    // return NextResponse.redirect(new URL('/', req.nextUrl));
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