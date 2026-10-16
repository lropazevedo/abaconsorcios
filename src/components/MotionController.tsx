"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Entradas discretas: adiciona a classe `.in` em elementos com
 * [data-reveal] ou [data-draw] quando entram na tela.
 * Também pausa animações em loop quando a aba do navegador fica oculta.
 */
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in), [data-draw]:not(.in)"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduce.matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));

    const onReduce = (e: MediaQueryListEvent) => {
      if (e.matches) document.querySelectorAll("[data-reveal], [data-draw]").forEach((el) => el.classList.add("in"));
    };
    reduce.addEventListener("change", onReduce);

    return () => {
      io.disconnect();
      reduce.removeEventListener("change", onReduce);
    };
  }, [pathname]);

  useEffect(() => {
    const onVis = () => document.body.classList.toggle("paused", document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return null;
}
