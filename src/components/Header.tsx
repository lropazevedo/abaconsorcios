"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setSolid(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a, button"));
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out ${
        solid || open ? "bg-navy/95 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-10">
        <Link href="/" aria-label="ABA Consórcios, página inicial" className="shrink-0">
          <Logo variant="negativo" width={164} />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative rounded-full px-3 py-2 text-[0.84rem] font-medium transition-colors duration-300 ${
                    isActive(item.href) ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span aria-hidden="true" className="tab-piece absolute inset-x-3 -bottom-0.5 h-[3px] bg-turq" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contato/"
            className="btn hidden items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/5 sm:inline-flex"
          >
            Fale com a ABA
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="relative inline-flex size-11 items-center justify-center rounded-full text-white xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-[2px] w-6 bg-current transition-transform duration-300 ease-out ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-6 bg-current transition-transform duration-300 ease-out ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100svh-72px)] overflow-y-auto bg-navy px-4 pb-10 pt-4 sm:px-6 xl:hidden"
      >
        <nav aria-label="Menu">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 text-xl font-semibold tracking-tight text-white"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`tab-piece h-1 w-6 ${isActive(item.href) ? "bg-turq" : "bg-white/15"}`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/contato/"
            onClick={() => setOpen(false)}
            className="btn inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 font-semibold text-navy"
          >
            Fale com a ABA
          </Link>
          <a
            href={site.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white"
          >
            <Icon name="instagram" className="size-5" />
            {site.social.instagram.handle}
          </a>
        </div>
      </div>
    </header>
  );
}
