import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// The home page plus the iRANTI policy pages that Google Play links to.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/iranti/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/iranti/delete-account`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
