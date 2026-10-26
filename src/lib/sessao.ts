import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE, lerSessao } from "./trimestre-auth";

/** Sessão atual. Se não houver, manda para a tela de entrar. */
export async function exigirSessao() {
  const sessao = await lerSessao((await cookies()).get(AUTH_COOKIE)?.value);
  if (!sessao) redirect("/trimestredossonhos/entrar/");
  return sessao;
}

export async function exigirGestor() {
  const sessao = await exigirSessao();
  if (!sessao.admin) redirect("/trimestredossonhos/");
  return sessao;
}
