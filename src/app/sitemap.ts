import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// One page for now. Add case studies here if they get their own routes.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }];
}
