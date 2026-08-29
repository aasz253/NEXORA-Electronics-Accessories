export type CategorySlug =
  | "audio"
  | "power"
  | "storage"
  | "laptop-accessories"
  | "mobile-accessories"
  | "connectivity"
  | "lighting"
  | "computer-accessories"
  | "smart-gadgets"
  | "content-creation";

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  icon: string;
  /** gradient / accent used for the card artwork */
  accent: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  type: string;
  price: string | null; // null => price on request
  priceOnRequest: boolean;
  description: string;
  image: string;
  gallery?: string[];
  specifications: string[];
  availability: "In stock" | "Low stock" | "On order" | "Preview";
  featured?: boolean;
  isNew?: boolean;
  tag?: string;
}

export const currency = "Price on request";

/** Product images live in /public/products. Supply the real photo path,
 *  or an elegant CSS/SVG illustration path. */
// A tiny helper so replacing images is a one-edge change:
export const P = (file: string) => `/products/${file}`;
export const ILLU = (name: string) => `/illustrations/${name}`;
