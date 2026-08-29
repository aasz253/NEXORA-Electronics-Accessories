import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import SiteShell from "@/components/SiteShell";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Background from "@/components/ui/Background";
import CustomCursor from "@/components/ui/CustomCursor";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchModal from "@/components/search/SearchModal";
import ProductModal from "@/components/product/ProductModal";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Nexora Electronics & Accessories | Premium Electronics & Tech Accessories",
    template: "%s | Nexora Electronics & Accessories",
  },
  description:
    "Shop electronics and accessories from Nexora Electronics & Accessories — earbuds, power banks, flash disks, memory cards, laptop accessories, chargers, speakers and more.",
  keywords: [
    "Nexora",
    "electronics Kenya",
    "tech accessories",
    "earbuds",
    "power banks",
    "charging cables",
    "laptop accessories",
    "Nairobi electronics",
  ],
  metadataBase: new URL("https://nexora.example"),
  openGraph: {
    title: "Nexora Electronics & Accessories",
    description: siteConfig.description,
    type: "website",
    locale: "en_KE",
    siteName: "Nexora",
  },
};

export const viewport: Viewport = {
  themeColor: "#050906",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="noise">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: siteConfig.fullName,
              description: siteConfig.description,
              slogan: siteConfig.tagline,
              email: siteConfig.email,
              telephone: siteConfig.whatsappDisplay,
            }),
          }}
        />
        <Providers>
          <SiteShell>
            <Background />
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
            <CartDrawer />
            <SearchModal />
            <ProductModal />
            <WhatsAppButton />
            <CustomCursor />
          </SiteShell>
        </Providers>
      </body>
    </html>
  );
}
