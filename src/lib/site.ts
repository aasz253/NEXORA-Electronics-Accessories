export const siteConfig = {
  name: "NEXORA",
  fullName: "NEXORA Electronics & Accessories",
  tagline: "Electronics. Accessories. Next Level.",
  description:
    "Discover premium electronics and everyday tech accessories designed to keep you connected, productive and powered up.",

  /* ============================================================
     WHATSAPP — Edit the number below. International format
     without "+" or spaces. Example: 254757678341
     ============================================================ */
  whatsappNumber: "254757678341",
  whatsappDisplay: "0757 678 341",
  ctaMessage:
    "Hello Nexora Electronics, I would like to inquire about your products.",

  /* ============================================================
     BUSINESS PLACEHOLDERS — Replace with real details when
     available. These are intentionally left as placeholders.
     ============================================================ */
  location: "Your business location here",
  phoneDisplay: "0757 678 341",
  email: "hello@nexora.example",
  hours: "Mon – Sat · 8:00 AM – 7:00 PM",
  social: {
    instagram: "#", // replace with your Instagram link
    facebook: "#", // replace with your Facebook link
    tiktok: "#", // replace with your TikTok link
    twitter: "#", // replace with your X/Twitter link
  },
};

export const whatsappLink = (message: string = siteConfig.ctaMessage) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
