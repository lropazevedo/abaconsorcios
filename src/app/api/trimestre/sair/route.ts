import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/lib/trimestre-auth";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/trimestredossonhos/entrar/", req.url), 303);
  res.cookies.set(AUTH_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
