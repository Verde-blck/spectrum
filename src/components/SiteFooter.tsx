import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t-2 border-rule bg-raised">
      <div className="flex flex-col gap-10 px-gutter py-14">
        <div>
          <p className="font-display text-base font-bold">Write to me</p>
          <p className="mt-2">
            <a
              href={`mailto:${site.email}`}
              className="link font-display text-[clamp(1.1rem,5.3vw,4.5rem)] font-extrabold leading-none tracking-tight [overflow-wrap:anywhere]"
            >
              {site.email}
            </a>
          </p>
        </div>
        <ul className="flex gap-6 font-display text-lg font-bold">
          <li>
            <a href={site.github} className="link" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.linkedin} className="link" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <p className="border-t-2 border-rule px-gutter py-4 text-base text-muted">
        {site.legalName}, {site.base}
      </p>
    </footer>
  );
}
