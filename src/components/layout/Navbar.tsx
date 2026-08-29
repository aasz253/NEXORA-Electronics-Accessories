"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navLinks } from "@/lib/site";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const { openSearch } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 24));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <motion.nav
          animate={{
            paddingTop: scrolled ? "0.625rem" : "1.25rem",
            paddingBottom: scrolled ? "0.625rem" : "1.25rem",
            backgroundColor: scrolled
              ? "rgba(8,10,16,0.6)"
              : "rgba(8,10,16,0.15)",
            boxShadow: scrolled
              ? "0 10px 40px -20px rgba(0,0,0,0.8)"
              : "0 0 0 0 transparent",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full border px-4 sm:px-5",
            scrolled
              ? "border-white/10 backdrop-blur-xl bg-ink-900/50"
              : "border-white/10 backdrop-blur-md bg-white/5"
          )}
        >
          <Logo />

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-white"
                      : "text-mist hover:text-white"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/8"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={openSearch}
              aria-label="Search products"
              className="grid h-10 w-10 place-items-center rounded-full text-mist transition hover:bg-white/8 hover:text-white"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <button
              onClick={openCart}
              aria-label={`Open cart, ${count} items`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-mist transition hover:bg-white/8 hover:text-white"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-r from-electric-500 to-cyan-500 px-1 text-[11px] font-bold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full text-mist transition hover:bg-white/8 hover:text-white md:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink-950/90 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col justify-center px-8"
            >
              {navLinks.map((l, i) => {
                const active =
                  l.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(l.href);
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.06,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      className={cn(
                        "group flex items-center justify-between border-b border-white/8 py-5",
                        active ? "text-white" : "text-mist"
                      )}
                    >
                      <span className="font-display text-3xl font-bold transition group-hover:text-white">
                        {l.label}
                      </span>
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full transition",
                          active ? "bg-cyan-300" : "bg-white/15 group-hover:bg-white/40"
                        )}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
