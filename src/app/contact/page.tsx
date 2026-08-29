"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import MotionWrapper from "@/components/ui/MotionWrapper";
import Button from "@/components/ui/Button";
import { whatsappLink, siteConfig } from "@/lib/site";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const composed = () =>
    `Hello Nexora, my name is ${name || "..."}.\n${message}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappLink(composed()), "_blank");
  };

  const contactCards = [
    { icon: MessageCircle, label: "WhatsApp", value: siteConfig.whatsappDisplay },
    { icon: Phone, label: "Call", value: siteConfig.phoneDisplay },
    { icon: Mail, label: "Email", value: siteConfig.email },
    { icon: MapPin, label: "Location", value: siteConfig.location },
    { icon: Clock, label: "Hours", value: siteConfig.hours },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s talk tech."
        subtitle="Questions, orders or custom requests — reach Nexora however works best for you."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {/* Contact info */}
        <MotionWrapper from="right">
          <div className="space-y-3">
            {contactCards.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-4 rounded-2xl border border-white/8 bg-gradient-to-b from-white/4 to-transparent p-4"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <c.icon className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-fog">
                    {c.label}
                  </p>
                  <p className="text-sm font-medium text-white">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-sm text-mist">
              The fastest way to reach us is WhatsApp — we usually reply within
              the hour during opening times.
            </p>
          </div>
        </MotionWrapper>

        {/* Message form -> WhatsApp */}
        <MotionWrapper from="left">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-ink-800/60 to-ink-900/60 p-6 sm:p-8"
          >
            <h2 className="font-display text-xl font-bold text-white">
              Send a message
            </h2>
            <p className="mt-1 text-sm text-mist">
              Your message opens in WhatsApp — no account needed.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-mist">
                  Your name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Brian"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-fog focus:border-cyan-400/50 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="msg" className="mb-1.5 block text-sm text-mist">
                  Your message
                </label>
                <textarea
                  id="msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Is the 20000mAh power bank in stock?"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-fog focus:border-cyan-400/50 focus:outline-none"
                />
              </div>
              <Button variant="whatsapp" type="submit" fullWidth size="lg">
                <Send className="h-4 w-4" /> Send via WhatsApp
              </Button>
            </div>
          </form>
        </MotionWrapper>
      </div>
    </div>
  );
}
