import type { Category } from "../lib/types";

export const categories: Category[] = [
  {
    slug: "audio",
    name: "Audio",
    short: "Earbuds · Headphones · Speakers",
    description:
      "Wireless earbuds, over-ear headphones and Bluetooth speakers crafted for immersive, high-fidelity sound.",
    icon: "AudioLines",
    accent: "from-cyan-400/40 to-electric-500/30",
  },
  {
    slug: "power",
    name: "Power",
    short: "Power Banks · Chargers · Cables",
    description:
      "High-capacity power banks, fast chargers, USB cables and extension cords to keep everything powered up.",
    icon: "BatteryCharging",
    accent: "from-electric-400/40 to-violet-500/30",
  },
  {
    slug: "storage",
    name: "Storage",
    short: "Flash Disks · Memory Cards",
    description:
      "Reliable flash disks and high-speed memory cards for your files, photos and media.",
    icon: "HardDrive",
    accent: "from-blue-400/40 to-cyan-400/30",
  },
  {
    slug: "laptop-accessories",
    name: "Laptop Accessories",
    short: "Stands · Bags · Mouse · Keyboards",
    description:
      "Upgrade your workspace with premium laptop stands, bags, wireless mice and keyboards.",
    icon: "Laptop",
    accent: "from-fog/40 to-electric-500/30",
  },
  {
    slug: "mobile-accessories",
    name: "Mobile Accessories",
    short: "Stands · Covers · Chargers",
    description:
      "Phone stands, holders, covers and fast chargers built for everyday life.",
    icon: "Smartphone",
    accent: "from-violet-400/40 to-electric-400/30",
  },
  {
    slug: "connectivity",
    name: "Connectivity",
    short: "Cables · Adapters · Hubs",
    description:
      "USB-C cables, adapters and hubs that keep every device linked and fast.",
    icon: "PlugZap",
    accent: "from-emerald-400/30 to-cyan-400/30",
  },
  {
    slug: "lighting",
    name: "Lighting",
    short: "Ring Lights · Webcams",
    description:
      "Ring lights and webcams for creators, calls and crisp video day or night.",
    icon: "Lightbulb",
    accent: "from-amber-300/40 to-electric-400/30",
  },
  {
    slug: "computer-accessories",
    name: "Computer Accessories",
    short: "Mouse · Keyboards · Webcams",
    description:
      "Ergonomic mice, mechanical keyboards and webcams built for performance.",
    icon: "Monitor",
    accent: "from-cyan-300/40 to-violet-500/30",
  },
  {
    slug: "smart-gadgets",
    name: "Smart Gadgets",
    short: "Handy everyday tech",
    description:
      "Clever, compact gadgets that make everyday life smarter and easier.",
    icon: "Cpu",
    accent: "from-electric-500/40 to-violet-400/30",
  },
  {
    slug: "content-creation",
    name: "Content Creation",
    short: "Ring Lights · Webcams · Audio",
    description:
      "Everything creators need — ring lights, webcams and studio-ready audio.",
    icon: "Video",
    accent: "from-fuchsia-400/30 to-electric-500/30",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

/** The 9 categories shown on the homepage collection grid */
export const homepageCategories = categories.filter(
  (c) => c.slug !== "content-creation"
);
