import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import CategoriesSection from "@/components/sections/CategoriesSection";
import TechUniverse from "@/components/sections/TechUniverse";
import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import ProductSpotlight from "@/components/sections/ProductSpotlight";
import { CollectionSection, Waveform } from "@/components/sections/CollectionSection";
import WhyNexora from "@/components/sections/WhyNexora";
import TrustSection from "@/components/sections/TrustSection";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Nexora Electronics & Accessories | Premium Electronics & Tech Accessories",
  description:
    "Shop electronics and accessories from Nexora Electronics & Accessories — earbuds, power banks, flash disks, memory cards, laptop accessories, chargers, speakers and more.",
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <CategoriesSection />

      <TechUniverse />

      <FeaturedProductsSection />

      <ProductSpotlight />

      {/* Audio collection */}
      <div className="relative">
        <Waveform />
        <CollectionSection
          slug="audio"
          eyebrow="Sound"
          heading="Turn It Up."
          subtitle="Earbuds, headphones and Bluetooth speakers built for work, play and the commute in between."
          heroImage="/products/headphones.jpeg"
          backdrop="rgba(212,243,74,0.08)"
          reverse
        />
      </div>

      {/* Workspace collection */}
      <CollectionSection
        slug="laptop-accessories"
        eyebrow="Workspace"
        heading="Upgrade Your Workspace."
        subtitle="Laptop stands, bags, wireless mice and keyboards for a desk that works as hard as you do."
        heroImage="/products/oraimo-charger.jpeg"
        backdrop="rgba(255,196,0,0.10)"
      />

      {/* Mobile accessories */}
      <CollectionSection
        slug="mobile-accessories"
        eyebrow="Everyday"
        heading="Built for Your Everyday."
        subtitle="Phone stands, holders, chargers and cables that keep up with real life."
        heroImage="/products/phones-1.jpeg"
        backdrop="rgba(212,243,74,0.10)"
        reverse
      />

      {/* Creator collection */}
      <CollectionSection
        slug="content-creation"
        eyebrow="Create"
        heading="Make It Look Pro."
        subtitle="Ring lights, webcams and audio gear for creators who take their content seriously."
        backdrop="rgba(255,176,0,0.10)"
      />

      <WhyNexora />

      <TrustSection />

      <FinalCTA />
    </>
  );
}
