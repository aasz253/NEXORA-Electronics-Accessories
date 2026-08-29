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
          subtitle="Earbuds, headphones and Bluetooth speakers with the sound that makes everything better — for work, play and everything between."
          heroImage="/products/headphones.jpeg"
          backdrop="rgba(56,199,255,0.10)"
          reverse
        />
      </div>

      {/* Workspace collection */}
      <CollectionSection
        slug="laptop-accessories"
        eyebrow="Workspace"
        heading="Upgrade Your Workspace."
        subtitle="Laptop stands, bags, wireless mice and keyboards that make every work session sharper and more comfortable."
        heroImage="/products/oraimo-charger.jpeg"
        backdrop="rgba(138,123,255,0.10)"
      />

      {/* Mobile accessories */}
      <CollectionSection
        slug="mobile-accessories"
        eyebrow="Everyday"
        heading="Built for Your Everyday."
        subtitle="Phone stands, holders, chargers and cables that keep up with real, everyday life."
        heroImage="/products/phones-1.jpeg"
        backdrop="rgba(15,139,255,0.10)"
        reverse
      />

      {/* Creator collection */}
      <CollectionSection
        slug="content-creation"
        eyebrow="Create"
        heading="Create Without Limits."
        subtitle="Ring lights, webcams and studio-ready audio for creators who take their content seriously."
        backdrop="rgba(226,102,255,0.10)"
      />

      <WhyNexora />

      <TrustSection />

      <FinalCTA />
    </>
  );
}
