import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, AUTH_MAX_AGE, conferirCredenciais, criarToken, lerSessao } from "@/lib/trimestre-auth";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const login = conferirCredenciais(String(form.get("login") ?? ""), String(form.get("senha") ?? ""));

  // Pequena espera para dificultar tentativas em sequência.
  await new Promise((r) => setTimeout(r, 400));

  if (!login) {
    return NextResponse.redirect(new URL("/trimestredossonhos/entrar/?erro=1", req.url), 303);
  }

  const token = await criarToken(login);
  const sessao = await lerSessao(token);
  const destino = sessao?.admin ? "/trimestredossonhos/gestor/" : "/trimestredossonhos/";
  const res = NextResponse.redirect(new URL(destino, req.url), 303);
  res.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_MAX_AGE,
  });
  return res;
}
