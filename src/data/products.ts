import type { Product } from "../lib/types";
import { P, ILLU } from "../lib/types";

/**
 * ============================================================
 *  CENTRAL PRODUCT DATA
 *  Replace `image` with your real photography file path in
 *  /public/products. Everything renders from here.
 * ============================================================
 */

const priceOnRequest = null;
const make = (
  p: Omit<Product, "priceOnRequest" | "price"> & { price?: string | null }
): Product => ({
  ...p,
  price: p.price ?? priceOnRequest,
  priceOnRequest: p.price == null,
});

export const products: Product[] = [
  // ---------------- AUDIO ----------------
  make({
    id: "audio-pure-pro-earpods",
    name: "Pure Pro Earpods",
    category: "audio",
    type: "Earbuds",
    image: P("pro-earpods.jpeg"),
    description:
      "Crisp wireless earpods with deep bass, clear calls and a comfortable all-day fit. Your everyday soundtrack, upgraded.",
    specifications: [
      "Wireless Bluetooth connectivity",
      "Crisp highs and deep bass",
      "Comfortable in-ear fit",
      "Built for calls and music",
    ],
    availability: "In stock",
    featured: true,
    isNew: true,
    tag: "Best seller",
  }),
  make({
    id: "audio-oraimo-bt-earphones",
    name: "Oraimo Bluetooth Earphones",
    category: "audio",
    type: "Earphones",
    image: P("oraimo-earphones-bt.jpeg"),
    description:
      "Oraimo wireless earphones delivering reliable pairing, punchy sound and dependable battery life for music and calls.",
    specifications: [
      "Wireless Bluetooth audio",
      "Punchy, balanced sound",
      "Reliable battery life",
      "Easy one-tap pairing",
    ],
    availability: "In stock",
    featured: true,
    tag: "Popular",
  }),
  make({
    id: "audio-oraimo-earphones",
    name: "Oraimo Earphones",
    category: "audio",
    type: "Earphones",
    image: P("oraimo-earphones.jpeg"),
    description:
      "Everyday Oraimo earphones built for clear sound and comfort — ideal for music, podcasts and hands-free calls.",
    specifications: ["Comfortable fit", "Clear audio", "Hands-free calls"],
    availability: "In stock",
  }),
  make({
    id: "audio-bluetooth-earphone",
    name: "Bluetooth Earphone",
    category: "audio",
    type: "Earphones",
    image: P("earphone-bluetooth.jpeg"),
    description:
      "A versatile Bluetooth earphone for music on the move and calls on the go.",
    specifications: ["Bluetooth wireless", "Portable design", "Built-in mic"],
    availability: "In stock",
  }),
  make({
    id: "audio-over-ear-headphones",
    name: "Over-Ear Headphones",
    category: "audio",
    type: "Headphones",
    image: P("headphones.jpeg"),
    description:
      "Immersive over-ear headphones with plush cushioning and rich, room-filling sound for deep listening sessions.",
    specifications: [
      "Over-ear comfort pads",
      "Rich, immersive sound",
      "Foldable, portable build",
    ],
    availability: "In stock",
    featured: true,
    tag: "Studio ready",
  }),
  make({
    id: "audio-wireless-earbuds-holder",
    name: "Wireless Earbuds & Holder",
    category: "audio",
    type: "Earbuds",
    image: P("wireless-earbuds-holder.jpeg"),
    description:
      "Truly wireless earbuds with a compact charging holder — toss them in your pocket and stay powered all day.",
    specifications: [
      "Truly wireless earbuds",
      "Compact charging holder",
      "Pocket-friendly design",
    ],
    availability: "In stock",
  }),
  make({
    id: "audio-bluetooth-speaker",
    name: "Bluetooth Speaker",
    category: "audio",
    type: "Speaker",
    image: ILLU("speaker.svg"),
    description:
      "Portable Bluetooth speaker with bold, room-filling sound and a rugged, take-anywhere build.",
    specifications: [
      "Bold room-filling sound",
      "Wireless Bluetooth",
      "Portable & durable",
    ],
    availability: "On order",
  }),
  make({
    id: "audio-woofer",
    name: "Woofer Speaker",
    category: "audio",
    type: "Woofer",
    image: ILLU("woofer.svg"),
    description:
      "A powerful woofer that adds deep, punchy low-end to your space, music or event.",
    specifications: ["Deep bass response", "High output", "Rugged build"],
    availability: "On order",
  }),

  // ---------------- POWER ----------------
  make({
    id: "power-power-bank",
    name: "High-Capacity Power Bank",
    category: "power",
    type: "Power bank",
    image: P("power-bank.jpeg"),
    description:
      "A high-capacity power bank that keeps your phone and devices juiced through the day — from the office to the road.",
    specifications: [
      "High capacity",
      "Fast charging output",
      "Compact, travel-ready design",
      "Recharge whenever you need",
    ],
    availability: "In stock",
    featured: true,
    isNew: true,
    tag: "Top rated",
  }),
  make({
    id: "power-oraimo-charger",
    name: "Oraimo Fast Charger",
    category: "power",
    type: "Charger",
    image: P("oraimo-charger.jpeg"),
    description:
      "Oraimo wall charger that tops up your devices quickly and safely, with multiple outputs for everyday charging.",
    specifications: [
      "Fast, safe charging",
      "Multiple output ports",
      "Compact wall plug",
    ],
    availability: "In stock",
    featured: true,
  }),
  make({
    id: "power-oraimo-usb-charger",
    name: "Oraimo USB Charger",
    category: "power",
    type: "Charger",
    image: P("oraimo-usb-charger.jpeg"),
    description:
      "Reliable USB charger for phones, earbuds and accessories — plug in and power up in minutes.",
    specifications: ["USB output", "Wide device support", "Reliable & safe"],
    availability: "In stock",
  }),

  // ---------------- STORAGE ----------------
  make({
    id: "storage-flash-disk",
    name: "USB Flash Disk",
    category: "storage",
    type: "Flash disk",
    image: ILLU("flashdisk.svg"),
    description:
      "A fast, reliable flash drive for your documents, media and backups — pocket-sized storage you can trust.",
    specifications: [
      "Fast read/write speeds",
      "Plug-and-play",
      "Compact, durable shell",
    ],
    availability: "On order",
  }),
  make({
    id: "storage-memory-card",
    name: "Memory Card",
    category: "storage",
    type: "Memory card",
    image: ILLU("memorycard.svg"),
    description:
      "High-speed memory card that expands your phone or camera storage for photos, video and apps.",
    specifications: ["High-speed class", "Expand storage", "Reliable"],
    availability: "On order",
  }),

  // ---------------- LAPTOP ACCESSORIES ----------------
  make({
    id: "laptop-laptop-stand",
    name: "Laptop Stand",
    category: "laptop-accessories",
    type: "Laptop stand",
    image: ILLU("laptopstand.svg"),
    description:
      "An ergonomic laptop stand that lifts your screen to eye level, improves posture and cools your machine.",
    specifications: [
      "Ergonomic eye-level lift",
      "Improved airflow & cooling",
      "Stable aluminum build",
    ],
    availability: "In stock",
    featured: true,
    tag: "Work essential",
  }),
  make({
    id: "laptop-laptop-bag",
    name: "Laptop Bag",
    category: "laptop-accessories",
    type: "Laptop bag",
    image: ILLU("laptopbag.svg"),
    description:
      "A padded, well-organized laptop bag that protects your gear and carries your essentials with style.",
    specifications: [
      "Padded laptop compartment",
      "Organized pockets",
      "Comfortable carry",
    ],
    availability: "On order",
  }),
  make({
    id: "laptop-wireless-mouse",
    name: "Wireless Mouse",
    category: "laptop-accessories",
    type: "Mouse",
    image: ILLU("mouse.svg"),
    description:
      "A smooth wireless mouse with quiet clicks and precise tracking for cleaner, more comfortable work.",
    specifications: [
      "Wireless connection",
      "Precise tracking",
      "Silent clicks",
      "Ergonomic design",
    ],
    availability: "In stock",
    featured: true,
  }),
  make({
    id: "laptop-keyboard",
    name: "Keyboard",
    category: "laptop-accessories",
    type: "Keyboard",
    image: ILLU("keyboard.svg"),
    description:
      "A responsive keyboard that makes typing fast, comfortable and satisfying — for work and play.",
    specifications: ["Responsive keys", "Comfortable typing", "Durable build"],
    availability: "In stock",
  }),

  // ---------------- MOBILE ACCESSORIES ----------------
  make({
    id: "mobile-phone-stand",
    name: "Phone Stand",
    category: "mobile-accessories",
    type: "Phone stand",
    image: ILLU("phonestand.svg"),
    description:
      "A sturdy phone stand for hands-free viewing, video calls and FaceTime — at the perfect angle.",
    specifications: ["Adjustable angle", "Stable grip", "Compact"],
    availability: "In stock",
  }),
  make({
    id: "mobile-phone-holder",
    name: "Phone Holder",
    category: "mobile-accessories",
    type: "Holder",
    image: ILLU("phoneholder.svg"),
    description:
      "A convenient phone holder that keeps your device secure and in view while you drive or work.",
    specifications: ["Secure grip", "Easy access", "Wide compatibility"],
    availability: "On order",
  }),
  make({
    id: "mobile-phone-covers",
    name: "Phone Covers",
    category: "mobile-accessories",
    type: "Covers",
    image: P("phone-covers.jpeg"),
    description:
      "A collection of stylish, protective phone covers that keep your device safe and looking sharp.",
    specifications: ["Shock protection", "Slim profile", "Multiple styles"],
    availability: "In stock",
    featured: true,
    tag: "New styles",
  }),
  make({
    id: "mobile-small-phones",
    name: "Compact Phones",
    category: "mobile-accessories",
    type: "Phones",
    image: P("phones-1.jpeg"),
    description:
      "Compact, everyday phones suited for reliable communication and basic daily use.",
    specifications: ["Easy to carry", "Reliable performance", "Daily driver"],
    availability: "In stock",
  }),
  make({
    id: "mobile-small-phones-2",
    name: "Everyday Phones",
    category: "mobile-accessories",
    type: "Phones",
    image: P("phones-2.jpeg"),
    description:
      "Dependable everyday phones for calls, messaging and staying connected anywhere.",
    specifications: ["User-friendly", "Long battery", "Reliable"],
    availability: "In stock",
  }),

  // ---------------- CONNECTIVITY ----------------
  make({
    id: "connectivity-usb-cable",
    name: "USB Cable",
    category: "connectivity",
    type: "USB cable",
    image: ILLU("usbcable.svg"),
    description:
      "Fast, durable USB cables for charging and data — built to bend, twist and last.",
    specifications: ["Fast charge & data", "Durable braided build", "Multiple lengths"],
    availability: "In stock",
  }),
  make({
    id: "connectivity-extension-cable",
    name: "Extension Cable",
    category: "connectivity",
    type: "Extension",
    image: ILLU("extension.svg"),
    description:
      "A handy extension cable that powers multiple devices at once from one outlet.",
    specifications: ["Multiple outlets", "Safe power rating", "Flexible reach"],
    availability: "On order",
  }),

  // ---------------- LIGHTING ----------------
  make({
    id: "lighting-ring-light",
    name: "Ring Light",
    category: "lighting",
    type: "Ring light",
    image: ILLU("ringlight.svg"),
    description:
      "A bright, adjustable ring light that flatters your video calls, streams and content.",
    specifications: ["Adjustable brightness", "Flattering soft light", "Phone/screen mount"],
    availability: "In stock",
    featured: true,
    tag: "Creator pick",
  }),
  make({
    id: "lighting-webcam",
    name: "Webcam",
    category: "lighting",
    type: "Webcam",
    image: ILLU("webcam.svg"),
    description:
      "A crisp webcam for sharp video calls, meetings and streaming — plug in and look your best.",
    specifications: ["HD video", "Plug-and-play", "Clip-on mount"],
    availability: "On order",
  }),

  // ---------------- CONTENT CREATION ----------------
  make({
    id: "creator-webcam",
    name: "Creator Webcam",
    category: "content-creation",
    type: "Webcam",
    image: ILLU("creator-webcam.svg"),
    description:
      "A creator-grade webcam delivering sharp, bright video for streaming and content.",
    specifications: ["Sharp video", "Low-light ready", "Easy setup"],
    availability: "On order",
  }),
  make({
    id: "creator-ring-light",
    name: "Creator Ring Light",
    category: "content-creation",
    type: "Ring light",
    image: ILLU("creator-ring.svg"),
    description:
      "Studio-style lighting for creators — soft, even glow that elevates every frame.",
    specifications: ["Soft even glow", "Adjustable stand", "Creator ready"],
    availability: "In stock",
  }),

  // ---------------- COMPUTER ACCESSORIES ----------------
  make({
    id: "computer-wireless-mouse",
    name: "Computer Wireless Mouse",
    category: "computer-accessories",
    type: "Mouse",
    image: ILLU("pc-mouse.svg"),
    description:
      "A dependable wireless mouse for smooth desktop work, browsing and more.",
    specifications: ["Wireless", "Comfortable grip", "Reliable tracking"],
    availability: "In stock",
  }),
  make({
    id: "smart-gadget-hub",
    name: "Smart Hub",
    category: "smart-gadgets",
    type: "Gadget",
    image: ILLU("smart-hub.svg"),
    description:
      "A clever smart hub that connects your devices together for a tidier, smarter setup.",
    specifications: ["Multi-connect", "Compact", "Plug-and-play"],
    availability: "On order",
  }),
];

export const productById = (id: string) => products.find((p) => p.id === id);
export const productsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);
export const featuredProducts = products.filter((p) => p.featured);
export const newProducts = products.filter((p) => p.isNew);
