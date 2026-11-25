import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "iRANTI privacy policy",
  description: "What the iRANTI app stores, where it is kept and how to delete it.",
};

const h2 = "mt-12 font-display text-2xl font-bold";
const list = "mt-4 list-disc space-y-2 pl-6";

export default function IrantiPrivacy() {
  return (
    <section className="px-gutter py-16 md:py-24">
      <p className="font-display text-base font-bold text-muted">Effective 22 November 2026</p>
      <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight">
        iRANTI privacy policy
      </h1>

      <div className="longread mt-8">
        <p>
          iRANTI is a to-do and reminder app made by {site.name}. This page explains what the app
          stores, where it is kept, who can see it and how to delete it. If anything here is unclear,
          email <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>

      <h2 className={h2}>The short version</h2>
      <ul className={`longread ${list}`}>
        <li>Your tasks and lists stay on your phone unless you choose to share them.</li>
        <li>An account is only needed to share. If you sign in, I receive your name, email address and an account ID from Google.</li>
        <li>There are no adverts, no analytics and no tracking, and your data is never sold.</li>
        <li>You can delete your account in the app at any time.</li>
      </ul>

      <h2 className={h2}>Stored only on your phone</h2>
      <div className="longread mt-4">
        <p>
          Your tasks, lists, checklists, reminder times and repeats are stored on your phone in
          encrypted storage. They are not sent to me. The app also keeps a record of when it was
          first opened, signed with a key held in your phone’s secure hardware, to run the free
          trial. This record never leaves your phone.
        </p>
        <p>
          If you save a backup, the app writes a file to the place you choose, such as your
          downloads or Google Drive. That file is under your control, not mine.
        </p>
      </div>

      <h2 className={h2}>If you sign in to share</h2>
      <div className="longread mt-4">
        <p>Signing in is optional. When you sign in with Google, these details are stored:</p>
      </div>
      <ul className={`longread ${list}`}>
        <li>your name and email address as they appear on your Google account, and an account ID;</li>
        <li>
          the lists and tasks you choose to share, including their titles, notes, checklists,
          reminder times and repeats, and which account last changed each task;
        </li>
        <li>the names of the people in each shared list or task, and its invite code.</li>
      </ul>
      <div className="longread mt-4">
        <p>
          Shared items can be seen and changed only by the people in them. Someone joins only by
          entering an invite code that you send them. Your name is shown to the other people in
          anything you share or join.
        </p>
        <p>
          This information is kept in Google Firebase. Shared lists and tasks are stored in
          Google’s London data centre. Sign-in is handled by Firebase Authentication, which Google
          may process outside the UK under its own data protection terms. Everything is sent over
          an encrypted connection. Google’s privacy policy is at{" "}
          <a className="link" href="https://policies.google.com/privacy">policies.google.com/privacy</a>.
        </p>
      </div>

      <h2 className={h2}>Purchases</h2>
      <div className="longread mt-4">
        <p>
          Premium is bought through Google Play. Google handles the payment, and I never see your
          card or payment details. The app keeps a record on your phone that Premium has been
          bought.
        </p>
      </div>

      <h2 className={h2}>What the app does not do</h2>
      <ul className={`longread ${list}`}>
        <li>It shows no adverts and contains no advertising or analytics tools.</li>
        <li>It does not read your contacts, location, photos or other apps.</li>
        <li>It does not sell or rent your information to anyone.</li>
      </ul>

      <h2 className={h2}>How long information is kept</h2>
      <div className="longread mt-4">
        <p>
          Information on your phone stays until you delete it or uninstall the app. Your account
          details stay until you delete your account. A shared list or task stays until its owner
          deletes it or everyone leaves it.
        </p>
      </div>

      <h2 className={h2}>Deleting your account</h2>
      <div className="longread mt-4">
        <p>
          In the app, open <strong>Account</strong> and choose <strong>Delete account</strong>. This
          deletes your sign-in and profile and removes you from everything you share. Anything
          shared only with you is deleted too. Tasks you added to a list that other people are
          still in stay with them. You can also ask by email; see{" "}
          <Link className="link" href="/iranti/delete-account">how to delete your iRANTI account</Link>.
        </p>
      </div>

      <h2 className={h2}>Your rights</h2>
      <div className="longread mt-4">
        <p>
          Under UK data protection law you can ask for a copy of your information, ask me to
          correct or delete it, and object to how it is used. Email{" "}
          <a className="link" href={`mailto:${site.email}`}>{site.email}</a> and I will reply within
          one month. If you are unhappy with my answer, you can complain to the Information
          Commissioner’s Office at <a className="link" href="https://ico.org.uk">ico.org.uk</a>.
        </p>
      </div>

      <h2 className={h2}>Children</h2>
      <div className="longread mt-4">
        <p>iRANTI is not meant for children under 13, and I do not knowingly collect their information.</p>
      </div>

      <h2 className={h2}>Changes</h2>
      <div className="longread mt-4">
        <p>
          If this policy changes, the new version will be published on this page with a new
          effective date. Significant changes will also be mentioned in the app’s update notes.
        </p>
      </div>
    </section>
  );
}
