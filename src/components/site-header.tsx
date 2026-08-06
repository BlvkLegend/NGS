"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonaToggle } from "@/components/persona-toggle";
import { NavSearch } from "@/components/nav-search";
import { asset } from "@/lib/asset";

const NAV = [
  { href: "/leaders", label: "Leaders" },
  { href: "/rankings", label: "Rankings" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
      <motion.span
        animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className="block h-[1.5px] w-5 rounded-full bg-ink"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.18 }}
        className="block h-[1.5px] w-5 rounded-full bg-ink"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className="block h-[1.5px] w-5 rounded-full bg-ink"
      />
    </div>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 flex justify-center px-3 pt-3">
      <div className="w-full max-w-[860px]">
        <header className="rounded-2xl border border-line-strong bg-paper-raised/90 shadow-card backdrop-blur-md">
          <div className="flex h-[52px] items-center justify-between gap-3 px-4">
            <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
              <Image src={asset("/ngsc-logo.png")} alt="NGSC" width={26} height={26} className="h-[26px] w-[26px]" />
              <span className="hidden text-[15px] font-semibold tracking-tight text-ink sm:inline">NGSC</span>
            </Link>

            <nav className="relative hidden items-center gap-1 md:flex">
              {NAV.map((item) => {
                const active = item.href !== "/#how-it-works" && pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
                      active ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-forest-tint"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5">
              <NavSearch />
              <PersonaToggle compact />
              <Link
                href="/start"
                className="hidden rounded-lg bg-forest-500 px-3 py-1.5 text-[12px] font-semibold text-paper transition-colors hover:bg-forest-700 sm:block"
              >
                Rate a leader
              </Link>
              <button
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink md:hidden"
              >
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="overflow-hidden border-t border-line md:hidden"
              >
                <div className="px-3 pb-3 pt-2">
                  {NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-[14px] font-medium text-ink hover:bg-forest-tint/60"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/start"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 block rounded-lg bg-forest-500 px-3 py-2.5 text-center text-[14px] font-semibold text-paper"
                  >
                    Rate a leader
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
      </div>
    </div>
  );
}
