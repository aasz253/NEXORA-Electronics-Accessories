"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { prefersReducedMotion } from "@/lib/utils";

export default function WhatsAppButton() {
  const reduced = prefersReducedMotion();
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nexora on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={reduced ? undefined : { scale: 1.08, y: -2 }}
      whileTap={reduced ? undefined : { scale: 0.94 }}
      className="group fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#032413] shadow-[0_10px_40px_-10px_rgba(37,211,102,0.7)] sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:3s]" />
      <MessageCircle className="h-7 w-7 transition-transform group-hover:rotate-12" />
    </motion.a>
  );
}
