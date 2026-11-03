import { site } from "@/lib/site";

// Shown when the visitor asks for reduced motion, or has no JavaScript.
// Both end states of the story, laid out at rest.
export function HeroStatic() {
  return (
    <div className="hero-static" aria-hidden="true">
      <div className="graticule border-b-2 border-rule">
        <div className="px-gutter pb-6 pt-8 md:pt-12">
          <p className="max-w-[22ch] font-display text-xl font-bold leading-tight md:text-2xl">
            {site.name}, {site.role.toLowerCase()} in Lagos
          </p>

          <div className="fit mt-8 md:mt-14">
            <p
              className="numeral pb-[0.14em] text-fault"
              style={{ "--fit": 36 } as React.CSSProperties}
            >
              <span className="relative inline-block after:absolute after:inset-x-[-1%] after:top-[48%] after:h-[0.055em] after:-rotate-[0.8deg] after:bg-ink after:content-['']">
                197,313
              </span>
            </p>
          </div>
        </div>

        <div className="on-signal border-t-2 border-rule bg-signal text-on-signal">
          <div className="grid gap-6 px-gutter py-8 md:grid-cols-[auto_1fr] md:items-end md:gap-12 md:py-10">
            <p className="numeral text-[clamp(5rem,22vw,17rem)]">13 km</p>
            <p className="longread pb-1">
              The backend reported this route as 197,313 km. The real distance
              was 13 km. Corrupt GPS fixes made up the gap, and I wrote the
              filter that closed it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
