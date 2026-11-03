import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-[var(--header-h)] border-b-2 border-rule bg-ground">
      <div className="flex h-full items-center justify-between gap-x-3 px-gutter">
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className="whitespace-nowrap font-display text-base font-extrabold tracking-tight min-[380px]:text-lg sm:text-xl"
        >
          {site.name}
        </Link>
        <div className="flex items-center gap-x-3 sm:gap-x-8">
          <nav aria-label="Primary">
            <ul className="flex gap-3 font-display text-sm font-bold min-[380px]:text-base sm:gap-6">
              <li>
                <Link href="/#work" className="link inline-block py-2">
                  Work
                </Link>
              </li>
              <li>
                <a href="#contact" className="link inline-block py-2">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
