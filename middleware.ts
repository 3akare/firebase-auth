import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, reponse: NextResponse) {
  //check users session
  const session = request.cookies.get("session");
  if (!session) return NextResponse.redirect(new URL("/login", request.url));

  //I have no idea what this does
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // If everything goes right, navigate to the intended route
  return NextResponse.next();
}

//Routes to run the middleware for. ie the protected routes
export const config = {
  matcher: ["/success"],
};
