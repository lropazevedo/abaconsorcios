"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { vendedores } from "@/data/trimestre";
import { exigirGestor } from "@/lib/sessao";
import { adicionarVenda, removerVenda } from "@/lib/vendas-store";

function valorEmReais(texto: string) {
  const limpo = texto.replace(/[^\d,.-]/g, "");
  const normal = limpo.includes(",")
    ? limpo.replace(/\./g, "").replace(",", ".")
    : limpo.replace(/\.(?=\d{3}(\D|$))/g, "");
  return Number(normal);
}

export async function cadastrarVenda(form: FormData) {
  const sessao = await exigirGestor();
  const vendedor = String(form.get("vendedor") ?? "");
  const valor = valorEmReais(String(form.get("valor") ?? ""));
  const data = String(form.get("data") ?? "");
  const obs = String(form.get("obs") ?? "").slice(0, 140);
  const ajuste = form.get("ajuste") === "on";

  if (
    !vendedores.some((v) => v.login === vendedor) ||
    !Number.isFinite(valor) ||
    valor <= 0 ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data)
  ) {
    redirect("/trimestredossonhos/gestor/?erro=1");
  }

  await adicionarVenda({ vendedor, valor: ajuste ? -valor : valor, data, obs, criadoPor: sessao.login });
  revalidatePath("/trimestredossonhos", "layout");
  redirect(`/trimestredossonhos/gestor/?ok=${encodeURIComponent(vendedor)}`);
}

export async function excluirVenda(form: FormData) {
  await exigirGestor();
  await removerVenda(String(form.get("id") ?? ""));
  revalidatePath("/trimestredossonhos", "layout");
  redirect("/trimestredossonhos/gestor/?excluida=1");
}
