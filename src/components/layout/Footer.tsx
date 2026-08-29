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
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-mist">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-fog">
              {siteConfig.description}
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
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
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80">
              Navigate
            </h3>
            <ul className="mt-4 space-y-3">
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
              className="mt-4 inline-flex items-center gap-2 text-sm text-[#25D366] transition hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-mist">
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-cyan-300" />
                {siteConfig.whatsappDisplay}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan-300" />
                {siteConfig.phoneDisplay}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-300" />
                {siteConfig.email}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-300" />
                {siteConfig.location}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-300" />
                {siteConfig.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-fog">
            © {new Date().getFullYear()} {siteConfig.fullName}. All rights
            reserved.
          </p>
          <p className="text-xs text-fog">Electronics. Accessories. Next Level.</p>
        </div>
      </div>
    </footer>
  );
}
