import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

// Irin Ajo's privacy policy, which Google Play links to. Every line must match what the app
// and server really do. Before publishing, confirm these with Richard (asked on 26 November):
//   - hosting provider and region ("Railway" is where staging runs today);
//   - shared Walk Safe points are deleted 24 hours after a walk ends;
//   - deleted accounts leave the backups within 30 days;
//   - which weather service and which SMS and WhatsApp providers are used;
//   - weather and nearby-walk requests aren't stored with the account.
// Update the effective date whenever the policy changes.

export const metadata: Metadata = {
  title: "Irin Ajo privacy policy",
  description: "What the Irin Ajo walking app stores, who can see it and how to delete it.",
};

const EMAIL = "akoredebankole.irin.ajo@gmail.com";
const h2 = "mt-12 font-display text-2xl font-bold";
const list = "mt-4 list-disc space-y-2 pl-6";

export default function IrinAjoPrivacy() {
  return (
    <section className="px-gutter py-16 md:py-24">
      <p className="font-display text-base font-bold text-muted">Effective 26 November 2026</p>
      <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight">
        Irin Ajo privacy policy
      </h1>

      <div className="longread mt-8">
        <p>
          Irin Ajo is a walking app for Nigerian cities, made by {site.name} in Lagos. It counts your
          steps and distance, draws your route and can share a walk with people you trust. This page
          explains what the app stores, where it is kept, who can see it and how to delete it. If
          anything here is unclear, email <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </div>

      <h2 className={h2}>The short version</h2>
      <ul className={`longread ${list}`}>
        <li>Your walks are saved on your phone first. An account is optional: it backs your walks up and lets Walk Safe work.</li>
        <li>Location is used only while you are walking, to draw your route and measure distance. A notification shows whenever it is on.</li>
        <li>Walk Safe shares your live position only with people you choose, only during a walk, and the shared points are deleted 24 hours after the walk ends.</li>
        <li>There are no adverts, no analytics and no tracking for advertising, and your data is never sold.</li>
        <li>You can download your data or delete your account in the app at any time.</li>
      </ul>

      <h2 className={h2}>Stored on your phone</h2>
      <div className="longread mt-4">
        <p>
          Your walks (the route, distance, steps and times), your goals and settings, the walks and
          tips you save, your keepsakes and the last weather reading are kept on your phone. They
          stay there until you delete them or uninstall the app, whether or not you have an account.
        </p>
        <p>
          During setup you can say whether you are a woman or a man, or prefer not to say. That
          choice only picks the voice that reads out your walk updates. It is not sent anywhere.
        </p>
        <p>
          Share images you make after a walk are created on your phone. If you put one of your own
          photos behind a walk, the photo stays on your phone until you choose where to share the
          image. By default, shared images leave out the first and last 200 metres of your route,
          so they don&apos;t show where you live; you can change this in Privacy.
        </p>
      </div>

      <h2 className={h2}>What the app asks for, and why</h2>
      <ul className={`longread ${list}`}>
        <li><strong>Location, while using the app:</strong> to draw your route and measure distance during a walk. Walks keep counting with the screen off, and a notification shows while they do. Irin Ajo does not ask for your location at any other time.</li>
        <li><strong>Physical activity:</strong> to count your steps with the phone’s motion sensor. Step counts are saved with your walks.</li>
        <li><strong>Notifications:</strong> for reminders you set and for the walk in progress.</li>
        <li><strong>Photos and camera:</strong> only when you choose a profile or cover photo, or a photo for a share image. The app uses the system photo picker, so it only sees the photo you pick.</li>
      </ul>
      <div className="longread mt-4">
        <p>
          Irin Ajo does not read your contacts. You type in the people you add to Walk Safe.
        </p>
      </div>

      <h2 className={h2}>If you create an account</h2>
      <div className="longread mt-4">
        <p>You sign in with your phone number. When you do, these details are stored on Irin Ajo’s server:</p>
      </div>
      <ul className={`longread ${list}`}>
        <li>your phone number, and the details on your profile: your name, and if you add them, a short about line, your city and photos;</li>
        <li>your goals and settings, including your weight and weight goal if you choose to add them, which are used to estimate calories;</li>
        <li>your walks, with their routes, distances, steps and times, your keepsakes, and whether a route felt safe when you say so;</li>
        <li>for Walk Safe, the name and phone number of each person you add.</li>
      </ul>
      <div className="longread mt-4">
        <p>
          Sign-in codes are sent to your number by SMS or WhatsApp through a messaging provider, which
          receives your phone number for that purpose only. Everything travels over an encrypted
          connection. The server runs with Railway, a hosting company, and is looked after by the
          developer who built it with me.
        </p>
      </div>

      <h2 className={h2}>Walk Safe</h2>
      <div className="longread mt-4">
        <p>
          Each person you add gets a link that you send them yourself, by WhatsApp or SMS. While you
          share a walk, your phone sends your position to the server every 30 seconds, and anyone
          with the link sees your name, your live position on a map, the distance so far and when it
          last updated. When the walk ends, sharing stops. The shared positions are deleted 24 hours
          after the walk ends. You can stop sharing at any time, reset a link so the old one no
          longer works, or remove a person.
        </p>
        <p>
          Before you add someone, please make sure they are happy for their name and number to be
          stored for this.
        </p>
      </div>

      <h2 className={h2}>Weather and walks nearby</h2>
      <div className="longread mt-4">
        <p>
          To show the temperature and time your water reminders, and to find walks near you, the app
          sends your position rounded to about 100 metres to Irin Ajo’s server, which asks a weather
          service for the reading. The rounded position is not saved with your account.
        </p>
      </div>

      <h2 className={h2}>Helping rate routes (optional)</h2>
      <div className="longread mt-4">
        <p>
          In Privacy, you can turn on <strong>Help rate how safe routes feel</strong>. It is off until
          you turn it on. When it is on, your walks are used without your name or phone number to
          work out how busy and well used routes are at each hour. You can turn it off at any time.
        </p>
      </div>

      <h2 className={h2}>Services that help run Irin Ajo</h2>
      <ul className={`longread ${list}`}>
        <li>
          <strong>Mapbox</strong> provides the maps. Your phone downloads map images for the area on
          screen, so Mapbox sees that area and your IP address. Mapbox’s own usage reporting is
          switched off in the app.{" "}
          <a className="link" href="https://www.mapbox.com/legal/privacy">Mapbox’s privacy policy</a>.
        </li>
        <li>
          <strong>Sentry</strong> receives a report when the app crashes or hits an error: the phone
          model, Android or iOS version, app version and the error itself. Reports carry no name,
          phone number, location or IP address, and are stored in Sentry’s EU region, in Germany.{" "}
          <a className="link" href="https://sentry.io/privacy/">Sentry’s privacy policy</a>.
        </li>
        <li>
          <strong>Expo</strong> delivers app updates. When the app checks for an update, Expo sees
          the app version and the type of phone.{" "}
          <a className="link" href="https://expo.dev/privacy">Expo’s privacy policy</a>.
        </li>
        <li>
          <strong>Railway</strong> hosts the server, and a <strong>messaging provider</strong> sends
          sign-in codes, as described above.
        </li>
      </ul>

      <h2 className={h2}>What the app does not do</h2>
      <ul className={`longread ${list}`}>
        <li>It shows no adverts and contains no advertising or analytics tools.</li>
        <li>It does not use your location when you are not walking.</li>
        <li>It does not read your contacts, or any photo you haven’t picked.</li>
        <li>It does not sell or rent your information to anyone.</li>
      </ul>

      <h2 className={h2}>How long information is kept</h2>
      <div className="longread mt-4">
        <p>
          Information on your phone stays until you delete it or uninstall the app. Your account
          details and walks stay until you delete your account. Walk Safe positions are deleted 24
          hours after each shared walk. When an account is deleted, its copies in the server’s
          backups expire within 30 days. Crash reports are deleted automatically by Sentry.
        </p>
      </div>

      <h2 className={h2}>Your data, and deleting your account</h2>
      <div className="longread mt-4">
        <p>
          In the app, open <strong>Profile</strong>, then <strong>Privacy</strong>. Choose{" "}
          <strong>Download My Data</strong> for a copy of everything your account holds, or{" "}
          <strong>Delete Account</strong> to remove it. You can also ask by email; see{" "}
          <Link className="link" href="/irin-ajo/delete-account">how to delete your Irin Ajo account</Link>.
        </p>
      </div>

      <h2 className={h2}>Your rights</h2>
      <div className="longread mt-4">
        <p>
          Under the Nigeria Data Protection Act 2023 you can ask for a copy of your information, ask
          me to correct or delete it, object to how it is used, withdraw your consent, and ask for
          your data in a form you can take elsewhere. Email{" "}
          <a className="link" href={`mailto:${EMAIL}`}>{EMAIL}</a> and I will reply within 30 days.
          If you are unhappy with my answer, you can complain to the Nigeria Data Protection
          Commission at <a className="link" href="https://ndpc.gov.ng">ndpc.gov.ng</a>.
        </p>
      </div>

      <h2 className={h2}>Children</h2>
      <div className="longread mt-4">
        <p>Irin Ajo is not meant for children under 13, and I do not knowingly collect their information.</p>
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
