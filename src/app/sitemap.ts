import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date(siteConfig.legalEffectiveDate);

  const routes: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "monthly" },
    { path: "/privacy", priority: 0.4, freq: "yearly" },
    { path: "/terms", priority: 0.4, freq: "yearly" },
    { path: "/cookies", priority: 0.4, freq: "yearly" },
  ];

  return routes.map(({ path, priority, freq }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: freq,
    priority,
  }));
}
