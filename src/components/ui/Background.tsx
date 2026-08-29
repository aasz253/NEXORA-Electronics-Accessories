"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

/** Fixed multi-layered ambient background used across the site. */
export default function Background() {
  // Deterministic pseudo-random (seeded by index) keeps SSR/render stable
  const particles = useMemo(() => {
    const seed = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      left: seed(i) * 100,
      top: seed(i + 40) * 100,
      size: 1.5 + seed(i + 80) * 3,
      duration: 6 + seed(i + 120) * 10,
      delay: seed(i + 160) * 6,
    }));
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base dye */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#0a140c_0%,#050906_55%,#030503_100%)]" />

      {/* Grid */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent_75%)]" />

      {/* Glow orbs */}
      <motion.div
        className="absolute -left-40 top-[-10%] h-[38rem] w-[38rem] rounded-full bg-electric-500/12 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[20%] h-[34rem] w-[34rem] rounded-full bg-violet-500/10 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute bottom-[-20%] left-[30%] h-[32rem] w-[32rem] rounded-full bg-cyan-500/8 blur-3xl" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-300/30"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1], y: [0, -30, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Top light beam */}
      <div className="absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(56,167,255,0.10),transparent_60%)]" />
    </div>
  );
}
