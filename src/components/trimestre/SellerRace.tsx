"use client";

import { useState } from "react";
import type { Stand } from "@/data/trimestre";
import type { VendedorCalc } from "@/lib/trimestre";
import { Avatar } from "./Avatar";

const brlCurto = (n: number) =>
  n >= 1_000_000
    ? `R$ ${(n / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 2 })} mi`
    : `R$ ${(n / 1_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mil`;

type Props = {
  vendedores: VendedorCalc[];
  stands: Stand[];
  metas: { sorteio: number; iphone: number; iphoneStandMinimo: number };
  fim: string;
};

/** A estrada individual: cada pessoa anda rumo ao sorteio da viagem (R$ 3 mi) e ao iPhone (R$ 3,8 mi). */
export function SellerRace({ vendedores, stands, metas, fim }: Props) {
  const [filtro, setFiltro] = useState<string>("todos");
  const lista = filtro === "todos" ? vendedores : vendedores.filter((v) => v.stand === filtro);
  const marcoSorteio = (metas.sorteio / metas.iphone) * 100;

  return (
    <div>
      <div role="group" aria-label="Filtrar por stand" className="flex flex-wrap gap-2">
        {[{ id: "todos", nome: "Todos", cor: "#ffffff" }, ...stands].map((s) => {
          const ativo = filtro === s.id;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={ativo}
              onClick={() => setFiltro(s.id)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                ativo ? "border-white bg-white text-navy" : "border-white/15 text-white/75 hover:border-white/40"
              }`}
            >
              {s.id !== "todos" && (
                <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: s.cor }} />
              )}
              {s.nome}
            </button>
          );
        })}
      </div>

      <ol className="mt-6 space-y-3">
        {lista.map((v, i) => {
          const pct = v.pctIphone * 100;
          return (
            <li
              key={v.login}
              className="tds-row rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                    v.posicao === 1
                      ? "bg-[var(--gold)] text-navy-900"
                      : v.posicao && v.posicao <= 3
                        ? "bg-white text-navy-900"
                        : "bg-white/10 text-white/80"
                  }`}
                  aria-label={v.posicao ? `${v.posicao}º lugar` : "Na largada"}
                >
                  {v.posicao ?? "·"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold leading-tight">{v.nome}</p>
                  <p className="truncate text-xs text-white/60">{v.standInfo.nome}</p>
                </div>
                <p className="text-right font-extrabold tabular-nums sm:text-lg">
                  {v.vendas > 0 ? (
                    brlCurto(v.vendas)
                  ) : (
                    <span className="text-sm font-semibold text-white/50">Na largada</span>
                  )}
                </p>
              </div>

              {/* Pista */}
              <div className="relative mb-2 mt-9 h-2.5 rounded-full bg-white/10" aria-hidden="true">
                <div
                  className="tds-fill absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${Math.max(pct, 0.8)}%`,
                    background: `linear-gradient(90deg, ${v.standInfo.cor}, #00a79d)`,
                  }}
                />
                <span
                  className="absolute -top-7 -translate-x-1/2 text-base"
                  style={{ left: `${marcoSorteio}%` }}
                  title="Sorteio da viagem"
                >
                  ✈️
                </span>
                <span className="absolute -top-1 h-4.5 w-px bg-white/40" style={{ left: `${marcoSorteio}%` }} />
                <span className="absolute -top-7 right-0 translate-x-1/3 text-base" title="iPhone 16">
                  📱
                </span>
                <span
                  className="tds-runner absolute top-1/2 -translate-y-1/2"
                  style={{
                    left: `clamp(0px, calc(${pct}% - 15px), calc(100% - 30px))`,
                    animationDelay: `${200 + i * 60}ms`,
                  }}
                >
                  <Avatar nome={v.nome} foto={v.foto} cor={v.standInfo.cor} size={30} />
                </span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-white/65 sm:text-sm">
                {v.bateuIphone ? (
                  v.iphoneLiberado ? (
                    <strong className="text-[var(--gold)]">📱 Bateu a meta do iPhone e o stand já liberou!</strong>
                  ) : (
                    <strong className="text-[var(--gold)]">
                      📱 Bateu a meta do iPhone. Falta o stand chegar a R$ 8 mi.
                    </strong>
                  )
                ) : v.bateuSorteio ? (
                  <>
                    <strong className="text-turq">✈️ Já está no sorteio da viagem!</strong> Faltam{" "}
                    {brlCurto(v.faltaIphone)} para o iPhone.
                  </>
                ) : (
                  <>
                    Faltam <strong className="text-white">{brlCurto(v.faltaSorteio)}</strong> para o sorteio da viagem.
                    Ritmo: <strong className="text-white">{brlCurto(v.ritmoSorteioDia)} por dia</strong> até {fim}.
                  </>
                )}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
