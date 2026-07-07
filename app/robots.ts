import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Required for static export — this route has no request-dependent data.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
