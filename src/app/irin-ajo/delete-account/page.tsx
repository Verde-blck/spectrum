import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

// The deletion page Google Play links to. Keep it in step with the app's Privacy screen and
// with the privacy policy.

export const metadata: Metadata = {
  title: "Delete your Irin Ajo account",
  description: "How to delete your Irin Ajo account and what happens to your information.",
};

const EMAIL = "akoredebankole.irin.ajo@gmail.com";
const h2 = "mt-12 font-display text-2xl font-bold";
const list = "mt-4 list-decimal space-y-2 pl-6";

export default function IrinAjoDeleteAccount() {
  const subject = encodeURIComponent("Delete my Irin Ajo account");
  return (
    <section className="px-gutter py-16 md:py-24">
      <p className="font-display text-base font-bold text-muted">Irin Ajo, by {site.name}</p>
      <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight">
        Delete your Irin Ajo account
      </h1>

      <h2 className={h2}>In the app</h2>
      <ol className={`longread ${list}`}>
        <li>Open Irin Ajo and tap <strong>Profile</strong>, then <strong>Privacy</strong>.</li>
        <li>Tap <strong>Delete Account</strong>, type <strong>delete</strong> to confirm, and tap it again.</li>
        <li>Your account is deleted straight away and you are signed out.</li>
      </ol>
      <div className="longread mt-4">
        <p>
          If you want a copy first, tap <strong>Download My Data</strong> on the same screen before you
          delete.
        </p>
      </div>

      <h2 className={h2}>Without the app</h2>
      <div className="longread mt-4">
        <p>
          Email <a className="link" href={`mailto:${EMAIL}?subject=${subject}`}>{EMAIL}</a> with the
          subject “Delete my Irin Ajo account” and the phone number you signed in with. To make sure
          the request is yours, I will message that number by SMS or WhatsApp and ask you to confirm.
          Your account will be deleted within 30 days of your confirmation, and you will get a reply
          when it is done.
        </p>
      </div>

      <h2 className={h2}>What is deleted</h2>
      <ul className="longread mt-4 list-disc space-y-2 pl-6">
        <li>Your account: your phone number, name, profile, photos, goals and settings.</li>
        <li>The walks, keepsakes and route feedback saved to your account.</li>
        <li>Your Walk Safe contacts. Their links stop working.</li>
      </ul>

      <h2 className={h2}>What is kept</h2>
      <ul className="longread mt-4 list-disc space-y-2 pl-6">
        <li>
          Walks stored on your phone are not affected, so you can keep walking without an account.
          Uninstall Irin Ajo to remove them.
        </li>
        <li>Copies in the server’s backups expire within 30 days.</li>
        <li>
          If you turned on <strong>Help rate how safe routes feel</strong>, walks you shared without
          your name or number may stay part of the safety ratings, because nothing in them identifies
          you.
        </li>
      </ul>

      <p className="mt-12 font-display text-lg font-bold">
        <Link href="/irin-ajo/privacy" className="link">
          Read the Irin Ajo privacy policy
        </Link>
      </p>
    </section>
  );
}
