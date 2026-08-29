import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Your Cart | Nexora Electronics & Accessories",
  description:
    "Review your Nexora selection and check out easily over WhatsApp.",
};

export default function CartPage() {
  return <CartPageClient />;
}
