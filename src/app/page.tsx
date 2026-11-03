import type { Metadata } from "next";
import { About } from "@/components/About";
import { Hero } from "@/components/hero/Hero";
import { Work } from "@/components/work/Work";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Tells search engines who this page is about. Public facts only.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.legalName,
  jobTitle: site.role,
  url: site.url,
  sameAs: [site.github, site.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <Work />
    </>
  );
}
