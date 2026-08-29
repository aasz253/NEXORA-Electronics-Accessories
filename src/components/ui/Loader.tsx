"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Loader({ ready }: { ready: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 18 + 4));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (ready) setProgress(100);
  }, [ready]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ink-950"
          aria-hidden
        >
          <div className="relative mb-6 h-24 w-24">
            {/* orbiting product glow */}
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-400/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 grid place-items-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
            </motion.div>
            <motion.div
              className="absolute inset-0 grid place-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-display text-3xl font-extrabold tracking-tight text-white">
                N
              </span>
            </motion.div>
          </div>

          <p className="font-display text-lg font-bold tracking-[0.3em] text-white">
            NEXORA
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-fog">
            Electronics · Accessories · Next Level
          </p>

          <div className="mt-8 h-1 w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-electric-500 to-cyan-400"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
