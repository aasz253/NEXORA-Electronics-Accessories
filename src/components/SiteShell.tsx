"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { prefersReducedMotion } from "@/lib/utils";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    let seen = false;
    try {
      seen = sessionStorage.getItem("nexora-launched") === "1";
    } catch {
      /* storage unavailable — fall back to showing the loader */
    }
    const t = setTimeout(
      () => {
        setReady(true);
        try {
          sessionStorage.setItem("nexora-launched", "1");
        } catch {
          /* noop */
        }
      },
      seen ? 0 : reduced ? 100 : 650
    );
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Loader ready={ready} />
      {children}
    </>
  );
}
