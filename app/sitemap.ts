import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { serviceAreas } from "@/content/service-areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/service-areas`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...serviceAreas.map((area) => ({
      url: `${siteConfig.url}/service-areas/${area.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteConfig.url}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
