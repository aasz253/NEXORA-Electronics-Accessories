"use client";

import Link from "next/link";
import { MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navLinks, siteConfig, whatsappLink } from "@/lib/site";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/8 bg-ink-950/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-mist">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 hidden text-xs leading-relaxed text-fog md:block">
              {siteConfig.description}
            </p>
          </div>

          {/* Shop links */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Shop
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {categories.slice(0, 7).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="text-sm text-mist transition hover:text-cyan-300"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Navigate
            </h3>
            <ul className="mt-3 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-mist transition hover:text-cyan-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-[#25D366] transition hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Get in touch
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-mist">
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span className="min-w-0">{siteConfig.whatsappDisplay}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span className="min-w-0">{siteConfig.phoneDisplay}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span className="min-w-0 break-words">{siteConfig.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span className="min-w-0">{siteConfig.location}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <span className="min-w-0">{siteConfig.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-5 sm:flex-row">
          <p className="text-center text-xs text-fog sm:text-left">
            © {new Date().getFullYear()} {siteConfig.fullName}. All rights
            reserved.
          </p>
          <p className="text-xs text-fog">Proudly Kenyan.</p>
        </div>
      </div>
    </footer>
  );
}
