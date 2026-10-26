import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, lerSessao } from "@/lib/trimestre-auth";

/**
 * Protege tudo em /trimestredossonhos (páginas, fotos e imagens), exceto a tela de entrar.
 * A área /trimestredossonhos/gestor só abre para os logins de gestor.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/trimestredossonhos/entrar")) return NextResponse.next();

  const sessao = await lerSessao(req.cookies.get(AUTH_COOKIE)?.value);
  const url = req.nextUrl.clone();
  url.search = "";

  if (!sessao) {
    url.pathname = "/trimestredossonhos/entrar/";
    return NextResponse.redirect(url);
  }
  if (pathname.startsWith("/trimestredossonhos/gestor") && !sessao.admin) {
    url.pathname = "/trimestredossonhos/";
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = {
  matcher: ["/trimestredossonhos", "/trimestredossonhos/:path*"],
};
