"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { about } from "@/data/content";

type TabKey = "a" | "b" | "c";

/**
 * Elemento assinatura do site: o conceito "abrir uma nova aba = abrir uma nova possibilidade".
 * O visitante vê abas com dúvidas comuns e clica no "+" para abrir a aba "Nova possibilidade".
 */
export function AbaTabs() {
  const t = about.tabs;
  const uid = useId();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState<TabKey>("b");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const keys: TabKey[] = opened ? ["a", "b", "c"] : ["a", "b"];
  const labels: Record<TabKey, string> = { a: t.a.label, b: t.b.label, c: t.c.label };

  const openNew = () => {
    setOpened(true);
    setActive("c");
    requestAnimationFrame(() => tabRefs.current.c?.focus());
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = keys.indexOf(active);
    let next: TabKey | null = null;
    if (e.key === "ArrowRight") next = keys[(i + 1) % keys.length];
    if (e.key === "ArrowLeft") next = keys[(i - 1 + keys.length) % keys.length];
    if (e.key === "Home") next = keys[0];
    if (e.key === "End") next = keys[keys.length - 1];
    if (next) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="overflow-hidden rounded-[22px] border border-navy/10 bg-white shadow-[0_30px_80px_-40px_rgb(11_18_43/0.45)]">
      {/* Barra de abas */}
      <div className="flex items-end gap-1 overflow-x-auto bg-mist px-3 pt-3 [scrollbar-width:none] sm:px-4">
        <div role="tablist" aria-label="Abas do conceito ABA" className="flex items-end gap-1">
          {keys.map((k) => {
            const selected = active === k;
            return (
              <button
                key={k}
                ref={(el) => {
                  tabRefs.current[k] = el;
                }}
                role="tab"
                type="button"
                id={`${uid}-tab-${k}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel-${k}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(k)}
                onKeyDown={onKey}
                className={`relative flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-t-xl px-3.5 py-2.5 text-[0.82rem] font-semibold transition-colors duration-300 sm:px-4 sm:text-sm ${
                  selected
                    ? k === "c"
                      ? "bg-navy text-white"
                      : "bg-white text-navy"
                    : "text-slate-ink hover:bg-white/60"
                } ${k === "c" ? "aba-tab-new" : ""}`}
              >
                {k === "c" && <span aria-hidden="true" className="tab-piece inline-block h-2.5 w-4 bg-turq" />}
                {labels[k]}
              </button>
            );
          })}
        </div>
        {!opened && (
          <button
            type="button"
            onClick={openNew}
            aria-label="Abrir nova aba: Nova possibilidade"
            className="group relative mb-1 ml-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-colors duration-300 hover:bg-blue"
          >
            <span aria-hidden="true" className="aba-plus-ring absolute inset-0 rounded-full" />
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-4 transition-transform duration-300 group-hover:rotate-90"
            >
              <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Painéis */}
      <div className="relative">
        {(["a", "b"] as const).map((k) => (
          <div
            key={k}
            role="tabpanel"
            id={`${uid}-panel-${k}`}
            aria-labelledby={`${uid}-tab-${k}`}
            hidden={active !== k}
            tabIndex={0}
            className="min-h-[300px] p-6 sm:min-h-[280px] sm:p-8"
          >
            <ul className="space-y-3">
              {t[k].lines.map((line) => (
                <li key={line} className="flex items-center gap-3 text-lg font-medium text-slate-ink sm:text-xl">
                  <span aria-hidden="true" className="h-px w-5 bg-slate/50" />
                  {line}
                </li>
              ))}
            </ul>
            {!opened && (
              <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-mist-50 px-4 py-2 text-sm font-medium text-navy">
                <span aria-hidden="true" className="tab-piece h-2 w-3.5 bg-turq" />
                {t.closedHint}
              </p>
            )}
          </div>
        ))}

        <div
          role="tabpanel"
          id={`${uid}-panel-c`}
          aria-labelledby={`${uid}-tab-c`}
          hidden={active !== "c"}
          tabIndex={0}
          className="aba-panel-new on-dark relative min-h-[300px] overflow-hidden bg-navy p-6 text-white sm:min-h-[280px] sm:p-8"
        >
          <div aria-hidden="true" className="halo -right-24 -top-24 size-80" />
          <p className="relative max-w-[22ch] text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            {t.c.title}
          </p>
          <ol className="relative mt-8 grid gap-5 sm:grid-cols-3">
            {t.c.steps.map((s, i) => (
              <li
                key={s.k}
                className="aba-step border-t border-white/15 pt-4"
                style={{ animationDelay: `${180 + i * 120}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turq">0{i + 1}</p>
                <p className="mt-2 text-lg font-semibold">{s.k}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{s.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        .aba-tab-new { animation: aba-tab-in .7s var(--ease-out) both; transform-origin: left bottom; }
        @keyframes aba-tab-in { from { opacity: 0; transform: translateY(8px) scaleX(.6); } to { opacity: 1; transform: none; } }
        .aba-panel-new:not([hidden]) { animation: aba-panel-in .8s var(--ease-out) both; }
        @keyframes aba-panel-in { from { opacity: 0; clip-path: inset(0 0 100% 0); } to { opacity: 1; clip-path: inset(0 0 0 0); } }
        .aba-step { animation: aba-step-in .8s var(--ease-out) both; }
        @keyframes aba-step-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .aba-plus-ring::after { content: ""; position: absolute; inset: -5px; border-radius: 9999px; border: 1.5px solid var(--color-turq); opacity: 0; animation: aba-ring 4.8s var(--ease-out) infinite; animation-delay: -1.2s; }
        @keyframes aba-ring { 0%, 55% { opacity: 0; transform: scale(.85); } 70% { opacity: .9; } 100% { opacity: 0; transform: scale(1.25); } }
      `}</style>
    </div>
  );
}
