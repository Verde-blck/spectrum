import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete your iRANTI account",
  description: "How to delete your iRANTI account and what happens to your information.",
};

const h2 = "mt-12 font-display text-2xl font-bold";
const list = "mt-4 list-decimal space-y-2 pl-6";

export default function IrantiDeleteAccount() {
  const subject = encodeURIComponent("Delete my iRANTI account");
  return (
    <section className="px-gutter py-16 md:py-24">
      <p className="font-display text-base font-bold text-muted">iRANTI, by {site.name}</p>
      <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight">
        Delete your iRANTI account
      </h1>

      <h2 className={h2}>In the app</h2>
      <ol className={`longread ${list}`}>
        <li>Open iRANTI and tap <strong>Account</strong> at the top right.</li>
        <li>Tap <strong>Delete account</strong>, then confirm.</li>
        <li>Google asks you to confirm it is you. Once you do, the account is deleted straight away.</li>
      </ol>

      <h2 className={h2}>Without the app</h2>
      <div className="longread mt-4">
        <p>
          Email <a className="link" href={`mailto:${site.email}?subject=${subject}`}>{site.email}</a>{" "}
          from the Google account you signed in with, with the subject “Delete my iRANTI account”.
          Your account will be deleted within 30 days, and you will get a reply when it is done.
        </p>
      </div>

      <h2 className={h2}>What is deleted</h2>
      <ul className="longread mt-4 list-disc space-y-2 pl-6">
        <li>Your sign-in and profile: your name, email address and account ID.</li>
        <li>Your membership of every shared list and task.</li>
        <li>Anything that was shared only with you.</li>
      </ul>

      <h2 className={h2}>What is kept</h2>
      <ul className="longread mt-4 list-disc space-y-2 pl-6">
        <li>
          Tasks you added to a shared list stay with the other people in it, because they are part
          of their list. Nothing in them identifies you once your account is deleted.
        </li>
        <li>
          Tasks and lists stored only on your phone are not affected. Delete them in the app, or
          uninstall iRANTI to remove them.
        </li>
      </ul>

      <p className="mt-12 font-display text-lg font-bold">
        <Link href="/iranti/privacy" className="link">
          Read the iRANTI privacy policy
        </Link>
      </p>
    </section>
  );
}
