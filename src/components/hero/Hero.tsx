import { site } from "@/lib/site";
import { HeroScroll } from "./HeroScroll";
import { HeroStatic } from "./HeroStatic";

/*
  Both visual versions are hidden from assistive technology. Screen reader
  users get the heading and the summary below, which say the same thing the
  animation shows, with no moving parts to wade through.
*/
export function Hero() {
  return (
    <section aria-labelledby="intro">
      <h1 id="intro" className="sr-only">
        {site.name}, {site.role.toLowerCase()} in Lagos
      </h1>
      <p className="sr-only">
        The backend reported a route as 197,313 km. The real distance was 13 km.
        Corrupt GPS fixes made up the gap, and I wrote the filter that closed
        it.
      </p>

      <HeroScroll />
      <HeroStatic />

      {/* Without JavaScript the scroll story cannot run, so show the end state. */}
      <noscript>
        <style>{`.hero-scroll{display:none}.hero-static{display:block}`}</style>
      </noscript>
    </section>
  );
}
