/** Shared navigation link definitions used by the navbar, mobile menu, footer. */

export interface NavLink {
  label: string;
  href: string;
}

// Primary nav. Section links point at homepage anchors so they work from any page.
export const primaryNav: NavLink[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Why Pilk", href: "/#why-pilk" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about" },
];

export const footerNav: NavLink[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];
