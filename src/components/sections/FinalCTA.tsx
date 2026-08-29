"use client";

import Image from "next/image";
import { MessageCircle, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { whatsappLink, siteConfig } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <MotionWrapper>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800 via-[#08170d] to-ink-900 px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* decorations */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-electric-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />

          <div className="relative">
            <div className="mb-6 flex justify-center">
              <div className="floating-slow relative h-24 w-24 overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
                <Image
                  src="/products/power-bank.jpeg"
                  alt="Nexora power bank"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            </div>

            <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Ready to <span className="text-gradient-cyan">Upgrade?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-mist">
              Talk to Nexora on WhatsApp. Tell us what you&apos;re looking for and
              we&apos;ll get you sorted — fast, friendly and straight forward.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="whatsapp"
                size="lg"
                href={whatsappLink()}
              >
                <MessageCircle className="h-5 w-5" /> Chat With Us
              </Button>
              <Button variant="secondary" size="lg" href="/shop">
                <ShoppingBag className="h-5 w-5" /> Explore Products
              </Button>
            </div>

            <p className="mt-6 text-xs text-fog">
              WhatsApp · {siteConfig.whatsappDisplay}
            </p>
          </div>
        </div>
      </MotionWrapper>
    </section>
  );
}
