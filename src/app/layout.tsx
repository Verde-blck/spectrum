import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { CursorTrail } from "@/components/CursorTrail";
import { Providers } from "@/components/Providers";
import { RouteCurtain } from "@/components/RouteCurtain";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

// Archivo carries the width axis, so one file gives us both the
// condensed black numerals and the regular-width interface text.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Newsreader is built for long reading. The optical size axis is left out:
// the text sits in a narrow size range, and the axis adds about a third to the
// file. The italic is a separate file that is not preloaded, because it is only
// used in a few short passages.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});
const newsreaderItalic = Newsreader({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-newsreader-italic",
  display: "swap",
  preload: false,
});

const title = `${site.name}, ${site.role.toLowerCase()}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ecf5e4" },
    { media: "(prefers-color-scheme: dark)", color: "#002f1e" },
  ],
};

// Runs before first paint so a saved theme never flashes the wrong one.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${archivo.variable} ${newsreader.variable} ${newsreaderItalic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-signal focus:px-4 focus:py-3 focus:font-display focus:font-bold focus:text-on-signal"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
          <RouteCurtain />
        </Providers>
        <CursorTrail />
      </body>
    </html>
  );
}
