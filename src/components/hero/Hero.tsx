"use client";

import { useRef, Suspense } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ShoppingBag } from "lucide-react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import { useIsDesktop } from "@/hooks/useMediaQuery";

const Hero3D = dynamic(() => import("@/components/hero/Hero3D"), {
  ssr: false,
  loading: () => null,
});

function MobileShowcase() {
  return (
    <div className="pointer-events-none relative mx-auto mt-4 flex h-[46vh] w-full max-w-sm items-end justify-center">
      <div className="relative h-full w-full">
        <motion.div
          initial={{ y: 40, scale: 0.9 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="floating absolute left-0 top-4 h-36 w-28 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        >
          <Image src="/products/power-bank.jpeg" alt="Power bank" fill sizes="112px" className="object-cover" priority />
        </motion.div>
        <motion.div
          initial={{ y: 40, scale: 0.9 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="floating-slow absolute right-0 top-0 h-36 w-28 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        >
          <Image src="/products/pro-earpods.jpeg" alt="Earpods" fill sizes="112px" className="object-cover" priority />
        </motion.div>
        <motion.div
          initial={{ y: 40, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="floating-reverse absolute bottom-0 left-1/2 h-48 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        >
          <Image src="/products/headphones.jpeg" alt="Headphones" fill sizes="288px" className="object-cover" priority />
        </motion.div>
      </div>
    </div>
  );
}

export default function Hero() {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* 3D scene (desktop) */}
      {isDesktop && (
        <motion.div
          style={{ y: sceneY, opacity: sceneOpacity }}
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden
        >
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        </motion.div>
      )}

      {/* ambient backdrop glow for hero only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_100%,rgba(255,196,0,0.12),transparent_65%)]" />
      </div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-28 text-center sm:px-8"
      >
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Proudly Nairobi · Genuine tech
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[9rem]"
        >
          NEXORA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-5 font-display text-xl font-semibold text-gradient-cyan sm:text-2xl md:text-3xl"
        >
          Electronics &amp; Accessories
          <br />
          <span className="text-gradient-cyan">Genuine tech. Honest prices.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg"
        >
          Headphones, speakers, chargers and desk gear — every piece checked
          before it sells, so you get tech that actually keeps working.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="/shop" size="lg">
            <ShoppingBag className="h-5 w-5" /> Explore Products
          </Button>
          <Button href="/contact" variant="whatsapp" size="lg">
            Shop on WhatsApp
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-fog"
        >
          <span>✓ Genuine products</span>
          <span>✓ Delivery to all 47 counties</span>
          <span>✓ Order via WhatsApp</span>
        </motion.div>
      </motion.div>

      {/* Mobile showcase (below content, above fold) */}
      {!isDesktop && (
        <div className="relative z-10">
          <MobileShowcase />
        </div>
      )}

      {/* bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-5 rounded-full border border-white/20 p-1"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-cyan-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
