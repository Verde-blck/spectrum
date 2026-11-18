"use client";

import { useId, useState } from "react";

type Mode = "decimals" | "kobo";

// One sale and two payments that should leave nothing owing. The sums below
// run exactly as written, so the difference on screen is real, not staged.
const PRICE = 300.3;
const PAYMENTS = [100.1, 200.2] as const;

const toKobo = (naira: number) => Math.round(naira * 100);
const DECIMAL_BALANCE = PRICE - (PAYMENTS[0] + PAYMENTS[1]);
const KOBO_BALANCE = toKobo(PRICE) - (toKobo(PAYMENTS[0]) + toKobo(PAYMENTS[1]));

const naira = (value: number) =>
  `₦${value.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const VIEWS = {
  decimals: {
    label: "Decimals",
    held: `${DECIMAL_BALANCE.toFixed(18)} naira`,
    owing: DECIMAL_BALANCE !== 0,
    note: "In binary, ₦100.10 and ₦200.20 can’t be stored exactly, so together they come to a hair under ₦300.30. The screen rounds what is left to ₦0.00, but the check for ‘paid in full’ still finds money owing, so she would be told to chase a customer who has paid.",
  },
  kobo: {
    label: "Whole kobo",
    held: `${KOBO_BALANCE} kobo`,
    owing: KOBO_BALANCE !== 0,
    note: "In kobo every amount is a whole number, and whole numbers add up exactly. Nothing is left, so the customer is marked as paid.",
  },
} satisfies Record<Mode, { label: string; held: string; owing: boolean; note: string }>;

export function KoboDemo() {
  const id = useId();
  const [mode, setMode] = useState<Mode>("decimals");
  const view = VIEWS[mode];

  return (
    <figure aria-labelledby={`${id}-title`} className="border-2 border-rule bg-raised">
      <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:p-6">
        <div>
          <p id={`${id}-title`} className="font-display text-xl font-bold">
            Why the money is kept in kobo
          </p>
          <p className="mt-2 max-w-[52ch]">
            A {naira(PRICE)} sale, paid in two parts. Switch between keeping naira
            as decimals and keeping whole kobo. The sums run in your browser.
          </p>
        </div>
        <fieldset>
          <legend className="sr-only">Store amounts as</legend>
          <div className="inline-flex border-2 border-ink font-display text-lg font-bold">
            {(Object.keys(VIEWS) as Mode[]).map((m) => (
              <label key={m} className="relative cursor-pointer">
                <input
                  type="radio"
                  name={`${id}-mode`}
                  value={m}
                  checked={mode === m}
                  onChange={() => setMode(m)}
                  className="peer sr-only"
                />
                <span className="block px-5 py-2.5 peer-checked:bg-ink peer-checked:text-ground peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-verde">
                  {VIEWS[m].label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="border-t-2 border-rule bg-ground p-5 md:p-6">
        <dl className="grid gap-y-1 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-x-8 md:gap-y-3">
          <dt className="font-display font-bold">Price</dt>
          <dd className="pb-3 md:pb-0">{naira(PRICE)}</dd>
          <dt className="font-display font-bold">Paid</dt>
          <dd className="pb-3 md:pb-0">
            {PAYMENTS.map(naira).join(" + ")}
          </dd>
          <dt className="font-display font-bold">Balance the computer holds</dt>
          <dd className="pb-3 font-display tabular-nums [overflow-wrap:anywhere] md:pb-0">
            {view.held}
          </dd>
          <dt className="font-display font-bold">What she would see</dt>
          <dd
            aria-live="polite"
            className={`font-display text-xl font-bold ${view.owing ? "text-fault" : "text-verde"}`}
          >
            {view.owing ? `Owes ${naira(DECIMAL_BALANCE)}` : "Paid up"}
          </dd>
        </dl>
        <p className="mt-5 max-w-[60ch]">{view.note}</p>
      </div>
    </figure>
  );
}
