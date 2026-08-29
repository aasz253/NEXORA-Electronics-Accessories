"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, TrendingUp } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { categoryBySlug } from "@/data/categories";

const popular = ["earbuds", "power bank", "charger", "headphones", "laptop"];

export default function SearchModal() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, closeSearch]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matched = products.filter((p) => {
      const hay = `${p.name} ${p.type} ${p.category} ${p.description}`
        .toLowerCase();
      return hay.includes(q);
    });
    return matched.slice(0, 8);
  }, [query]);

  const suggestedCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return categories.filter((c) =>
      `${c.name} ${c.short}`.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] flex items-start justify-center bg-ink-950/85 p-4 pt-[10vh] backdrop-blur-md"
          onClick={closeSearch}
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          <motion.div
            initial={{ y: -16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -16, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
              <Search className="h-5 w-5 text-cyan-300" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search earbuds, power banks, keyboards…"
                className="flex-1 bg-transparent text-base text-white placeholder:text-fog focus:outline-none"
                aria-label="Search products"
              />
              <button
                onClick={closeSearch}
                aria-label="Close search"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/8 text-white transition hover:bg-white/15"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {!query && (
                <div className="space-y-2">
                  <p className="flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-widest text-fog">
                    <TrendingUp className="h-3.5 w-3.5" /> Popular
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popular.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-mist transition hover:border-cyan-400/30 hover:text-white"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query && results.length === 0 && suggestedCategories.length === 0 && (
                <div className="py-10 text-center">
                  <p className="font-display text-lg font-bold text-white">
                    No results for “{query}”
                  </p>
                  <p className="mt-1 text-sm text-mist">
                    Try a different keyword, or reach out to us on WhatsApp.
                  </p>
                </div>
              )}

              {suggestedCategories.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {suggestedCategories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/categories/${c.slug}`}
                      onClick={closeSearch}
                      className="rounded-full bg-gradient-to-r from-electric-500/20 to-cyan-500/20 px-4 py-1.5 text-sm text-cyan-200 transition hover:from-electric-500/30 hover:to-cyan-500/30"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}

              <div className="space-y-1">
                {results.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={`/product/${p.id}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-white/5"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/5">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                          {p.name}
                        </p>
                        <p className="text-xs text-fog">
                          {categoryBySlug(p.category)?.name} · {p.type}
                        </p>
                      </div>
                      <span className="text-xs text-mist">
                        {p.price ? `KSh ${p.price}` : "On request"}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
