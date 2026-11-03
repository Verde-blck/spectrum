import Link from "next/link";

export default function NotFound() {
  return (
    <section className="graticule px-gutter py-16 md:py-24">
      <h1 className="numeral text-[clamp(6rem,30vw,22rem)] text-fault">404</h1>
      <p className="longread mt-8">
        There is no page at this address. The link may be wrong, or the page may
        have moved.
      </p>
      <p className="mt-6 font-display text-lg font-bold">
        <Link href="/" className="link">
          Back to the start
        </Link>
      </p>
    </section>
  );
}
