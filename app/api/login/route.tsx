import { auth } from "firebase-admin";
import { customInitApp } from "@/lib/firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

customInitApp();

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      //setup Session Cookies ???
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn: expiresIn,
      });
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };
      //set cookie
      cookies().set(options);
    }
  }
  //Success
  return NextResponse.json({}, { status: 200 });
}

export async function GET(request: NextRequest, response: NextResponse) {
  //Get session cookie
  const session = cookies().get("session")?.value || "";
  //Verify the presence of session cookie
  if (!session) return NextResponse.json({ isLogged: false }, { status: 401 });
  //Verify session cookie on firebase
  const decodedClaims = await auth().verifySessionCookie(session, true);
  if (!decodedClaims)
    return NextResponse.json({ isLogged: false }, { status: 401 });
  //Carry on if everything goes as planned
  return NextResponse.json({ isLogged: true }, { status: 200 });
}
