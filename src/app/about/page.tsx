import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionWrapper from "@/components/ui/MotionWrapper";
import Button from "@/components/ui/Button";
import { MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { whatsappLink, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Nexora Electronics & Accessories",
  description:
    "Learn about Nexora Electronics & Accessories — a Kenyan electronics brand built on quality products, honest prices and dependable service.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8">
      <SectionHeading
        eyebrow="Our Story"
        title="Technology, made personal."
        subtitle="Nexora Electronics & Accessories exists to put dependable, premium tech within reach of everyone in Kenya."
      />

      <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
        <MotionWrapper from="right">
          <div className="relative h-[24rem] overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src="/products/stock.jpeg"
              alt="Nexora electronics collection"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
            <p className="absolute bottom-4 left-4 text-sm text-white/90">
              Real products. Real value. Straight from our showroom.
            </p>
          </div>
        </MotionWrapper>

        <MotionWrapper from="left">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Why Nexora was built
          </h2>
          <p className="mt-4 leading-relaxed text-mist">
            Quality tech shouldn&apos;t be complicated or out of reach. We built
            Nexora to make premium electronics and everyday accessories easy to
            find, easy to trust and easy to order — right from your phone on
            WhatsApp.
          </p>
          <p className="mt-4 leading-relaxed text-mist">
            From powerful audio and reliable power to the accessories that
            upgrade your workspace, everything in our collection is chosen to
            keep you connected, productive and powered up.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-white/4 p-5 text-center">
              <ShieldCheck className="mx-auto h-7 w-7 text-cyan-300" />
              <p className="mt-3 text-sm font-semibold text-white">Genuine</p>
              <p className="mt-1 text-xs text-mist">Checked quality</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-5 text-center">
              <Sparkles className="mx-auto h-7 w-7 text-cyan-300" />
              <p className="mt-3 text-sm font-semibold text-white">Curated</p>
              <p className="mt-1 text-xs text-mist">Handpicked range</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-5 text-center">
              <MessageCircle className="mx-auto h-7 w-7 text-cyan-300" />
              <p className="mt-3 text-sm font-semibold text-white">Personal</p>
              <p className="mt-1 text-xs text-mist">Real human support</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/shop">Explore Products</Button>
            <Button variant="whatsapp" href={whatsappLink()}>
              <MessageCircle className="h-4 w-4" /> Talk to us
            </Button>
          </div>
        </MotionWrapper>
      </div>

      {/* Location / hours placeholder block */}
      <MotionWrapper className="mt-20">
        <div className="grid gap-4 rounded-[2rem] border border-white/8 bg-gradient-to-b from-ink-800/50 to-ink-900/50 p-8 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Location
            </p>
            <p className="mt-2 text-sm text-white">{siteConfig.location}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Hours
            </p>
            <p className="mt-2 text-sm text-white">{siteConfig.hours}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">
              WhatsApp
            </p>
            <p className="mt-2 text-sm text-white">{siteConfig.whatsappDisplay}</p>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
}
