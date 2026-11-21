// All the words for the Work section live here, apart from the layout.
// The E5 text is VerdeDev's own wording. Keep it in step with anything
// the client has approved before the site goes live.

import type { StaticImageData } from "next/image";
import ledgerCalendar from "./ledger/calendar.png";
import ledgerCustomer from "./ledger/customer.png";
import ledgerAdmin from "./ledger/admin.png";
import ledgerHome from "./ledger/home.png";
import irantiIcons from "./iranti/icons.png";
import sabiCamera from "./sabi/camera.png";
import sabiRegistered from "./sabi/registered.png";
import sabiCantConfirm from "./sabi/cant-confirm.png";

export type Part = { label: string; text: string; reflective?: boolean };
export type IncidentData = { title: string; parts: Part[] };

export type Problem = { problem: string; fix: string };

export const e5 = {
  title: "E5 Smart Helmet",
  role: "Frontend and mobile developer (contract)",
  date: { iso: "2026-09", text: "September 2026 to present" },
  intro: [
    "The E5 dashboard is a React and TypeScript web app, hosted on Vercel, that lets a control room monitor and manage smart helmets in the field. It holds no data of its own: everything comes from a backend (not built by me) on Railway, live video and calls go through a separate media server over WebRTC, and photos and videos are stored on Cloudflare R2 behind temporary links. Supervisors can see every helmet’s status, location, battery, signal and gas readings; watch live video and call wearers; answer SOS alarms; replay routes; send voice messages; draw fences; and manage helmet settings, connectivity and admin accounts, each limited by their role.",
    "I also built the companion Android app for handheld tablets, in Expo, React Native and TypeScript. It brings monitoring, the live map, track playback, alarms, fences, media records and admin permissions to handheld tablets.",
  ],
  // The problem the opening of this page is built around.
  featured: {
    title: "A 13 km route that showed as 197,313 km",
    parts: [
      {
        label: "What happened",
        text: "On the track playback page, one route came out at 197,313 km instead of 13 km.",
      },
      {
        label: "Cause",
        text: "A few GPS fixes sat nowhere near the real route, because the helmet had logged readings before it was shipped. Each stray fix added a huge jump to the total.",
      },
      {
        label: "Fix",
        text: "Any fix that implies a speed above 40 m/s (144 km/h) from the one before it is dropped. The route now measures 13 km.",
      },
      {
        label: "What I fixed",
        text: "The same check now runs on the server as data arrives, so every client gets clean tracks, and the raw fixes are kept for audit.",
      },
    ],
  } satisfies IncidentData,
  problemsTitle: "Other problems and how they were fixed",
  problems: [
    {
      problem: "Helmet pins slightly off the real location",
      fix: "Indoors, helmets fall back to mobile-network positioning. The map now draws a circle for the likely area, and Track Playback counts distance from GPS fixes only.",
    },
    {
      problem: "Every account could see everything",
      fix: "The backend now sends each user’s permissions and refuses anything outside the role. The dashboard used to sign people out on any refusal; it now explains what’s missing instead.",
    },
    {
      problem: "Alarms could take up to 10 seconds to appear",
      fix: "Alarms now arrive instantly over a live stream, read with fetch because the browser’s built-in method can’t send the sign-in token. Critical alarms ring until someone responds.",
    },
    {
      problem: "A ringing alarm could lose its Silence button",
      fix: "The ringing strip now keeps its own copy of each alarm, so sound never plays without a way to stop it.",
    },
    {
      problem: "Photo and video links stopped working",
      fix: "Links expire after an hour, so the dashboard refetches them before then.",
    },
    {
      problem: "Live wall paused when the admin switched tabs",
      fix: "It can now open in its own window for a second screen, and that window never pauses.",
    },
    {
      problem:
        "Helmet voice clips wouldn’t play, and helmets couldn’t play browser recordings",
      fix: "Helmet clips (AMR) are decoded in the browser, and outgoing messages are converted to MP3.",
    },
    {
      problem: "Hang up out of reach on short screens",
      fix: "The call layer now scrolls.",
    },
    {
      problem: "Forced two-factor setup would have signed people out",
      fix: "That refusal now leads to the setup screen instead.",
    },
    {
      problem: "Old gas readings looked current",
      fix: "Readings from offline helmets are greyed out, with their age shown.",
    },
    {
      problem: "SOS calls with audio missing in one direction",
      fix: "Traced to the media server refusing the admin’s audio push. The dashboard now shows the server’s reason, so Cypher can fix it. Still open.",
    },
  ] satisfies Problem[],
};

// Short entries. Every line is taken from the CV; nothing is added.
export const stops = [
  {
    id: "mojoy",
    date: { iso: "2025", text: "2025 to present" },
    title: "Mojoy Tech Hub",
    role: "Frontend developer (remote)",
    text: "I maintain a production e-commerce website built on Next.js and Sanity CMS. I build reusable components, dynamic product pages, promotional banners and CMS-driven content, which keeps the interface consistent.",
    link: { href: "https://mojoyicl.com", label: "mojoyicl.com" },
  },
  {
    id: "beceko",
    date: { iso: "2024", text: "2024" },
    title: "BECEKO Fabrics & Styles",
    role: "Frontend developer",
    text: "I built reusable product architecture and responsive layouts.",
  },
  {
    id: "techdriod",
    date: { iso: "2023", text: "2023" },
    title: "Techdriod Systems, Ikeja",
    role: "Junior graphics designer and tech support",
    text: "I designed campaign flyers and gave clients onsite technical support.",
  },
  {
    id: "metafrens",
    date: { iso: "2022", text: "2022 to 2023" },
    title: "Metafrens Web3 Community",
    role: "Graphic designer (remote)",
    text: "I created more than 100 graphics for marketing campaigns and community engagement.",
  },
] as const;

export type Screen = { image: StaticImageData; alt: string; caption: string };

// Ìwé Ọjà, the one project with a full write-up. It began as Beceko Ledger
// for my mum's business. The screenshots use made-up customers, businesses
// and amounts, never real records.
export const ledger = {
  title: "Ìwé Ọjà",
  role: "Ledger app for small businesses, which began as Beceko Ledger for BECEKO Fabrics & Styles",
  date: { iso: "2026-11", text: "November 2026" },
  stack: "Node.js, Express 5, SQLite, Gemini API, Web Speech API, PDFKit, S3 API (Backblaze B2), JavaScript, Railway",
  intro: [
    "Ìwé Ọjà began as Beceko Ledger, a web app I built for my mum’s fabrics and tailoring business. Customers often pay part now and the rest later, so she needs to know who owes what and to show when each payment came in. She records sales and payments on her phone, by typing or by speaking, and the app keeps a running balance for every customer, a calendar of money received each day, statements she can share as PDFs on WhatsApp, and a one-tap reminder for anyone who owes.",
    "I then turned it into a product other businesses can subscribe to. One codebase runs a separate copy for each business, with its own name, colours and home-screen icon. Each copy has a subscription that sends a reminder, allows a week’s grace and then locks, while still letting the business download its records. An admin dashboard shows every business and renews or suspends them instantly, and each copy backs itself up to Backblaze B2 every day.",
    "Each copy is one Node.js and Express service on Railway, with its ledger in SQLite on a persistent volume. The interface is plain JavaScript with no build step, made for a phone. Notes go to the Gemini API, which turns them into drafts the owner checks before anything is saved.",
  ],
  link: {
    href: "https://github.com/Verde-blck/iwe-oja-ledger",
    label: "github.com/Verde-blck/iwe-oja-ledger",
  },
  screens: [
    {
      image: ledgerHome,
      caption: "Home",
      alt: "The home screen: a box for typing or speaking a sale or payment, ₦55,500 owed by four customers, and the money received today, this week and this month.",
    },
    {
      image: ledgerCustomer,
      caption: "A customer’s history",
      alt: "Mama Chidi’s page: she owes ₦7,000. Her history is set out like a ledger book, with dates in a red margin, a cancelled sale crossed out and a running balance on every line.",
    },
    {
      image: ledgerCalendar,
      caption: "Calendar, dark mode",
      alt: "The November calendar in dark mode, with the money received under each day and the month’s totals below.",
    },
  ] satisfies Screen[],
  dashboard: {
    image: ledgerAdmin,
    caption: "The admin dashboard, running locally with made-up businesses",
    alt: "The admin dashboard: a card for each business showing whether it is locked, in its grace week or ending soon, with its paid-until date, last backup, last entry and buttons to renew or suspend it.",
  } satisfies Screen,
  featured: {
    title: "The first version let the AI keep the books",
    parts: [
      {
        label: "What happened",
        text: "My first backend sent each note to Gemini and asked for the customer’s whole record back: the new entry, every past entry and the new balance.",
      },
      {
        label: "Risk",
        text: "A language model can slip on arithmetic, and nothing checked its sums. Because it sent back the full history, it could also drop or change old entries without anyone noticing.",
      },
      {
        label: "Fix",
        text: "Gemini now only turns a note into a draft: who, sale or payment, what and how much. She checks the draft and saves it herself, so nothing reaches the ledger without her say-so.",
      },
      {
        label: "What I fixed",
        text: "The server now checks every entry and works out every balance in whole kobo, and database triggers stop a saved entry from being edited or deleted. A mistake is cancelled with a reversing entry, so the history stays complete.",
      },
    ],
  } satisfies IncidentData,
  problemsTitle: "Other problems and how they were fixed",
  problems: [
    {
      problem: "Hosting on Vercel would have lost every record",
      fix: "Serverless functions can’t keep a SQLite file between requests. The app runs on Railway instead, with the database on a persistent volume.",
    },
    {
      problem: "npm install failed on Windows",
      fix: "The SQLite driver needed Python and C++ build tools. I switched to the SQLite built into Node, so there is nothing to compile.",
    },
    {
      problem: "Quick entry broke after a Google SDK update",
      fix: "The new SDK called a different Gemini API version, where the model name didn’t exist. The app now pins the version, and a check script tests the key and finds a model that works.",
    },
    {
      problem: "Spoken notes came out doubled on Android",
      fix: "Chrome on Android repeats earlier phrases in each result. A merge step drops the repeats, and it is tested against simulated Android output.",
    },
    {
      problem: "Entries were stamped an hour early",
      fix: "The first version recorded times in UTC. Entries now use Lagos time, so the daily totals and the calendar match her day.",
    },
    {
      problem: "Test customers had to go, without giving her a delete button",
      fix: "A one-off reset runs only from a server setting, saves a backup first, and each setting value works once.",
    },
    {
      problem: "Railway only offers backups on its Pro plan",
      fix: "Every night each copy sends a compressed snapshot of its ledger to Backblaze B2 over the S3 API, into its own folder, with a key that can reach only that folder. Setting RESTORE_BACKUP puts any copy back, once, keeping the old ledger beside it.",
    },
    {
      problem: "Backups never ran at 2am because the app was asleep",
      fix: "With Railway’s Serverless setting the app sleeps when nobody is using it, so the nightly timer never fired. It now backs up a minute after waking whenever the last copy is over 20 hours old.",
    },
    {
      problem: "A typo in a backup setting stopped the backups",
      fix: "The storage address was entered without https:// and failed with “Invalid URL”. Settings are now tidied and checked at start-up, and a bad one switches backups off with a clear message instead of touching the ledger.",
    },
    {
      problem: "Renewing a business meant a redeploy",
      fix: "Paid-until dates moved from environment variables into each copy’s database. The dashboard changes them through a token for each business, derived from one secret with HMAC, so a renewal applies at once and a leaked token reaches only one business.",
    },
  ] satisfies Problem[],
};

// iRANTI is still being built, so nothing here claims a release, users or
// device testing that hasn't happened yet. Update it after the Play test.
export const iranti = {
  title: "iRANTI",
  role: "To-do app whose reminders wake the phone, for Android and iOS",
  date: { iso: "2026-11", text: "November 2026" },
  stack: "React Native, TypeScript, NativeWind, Kotlin, Swift, MMKV, react-native-iap (Google Play Billing), Android Keystore",
  intro: [
    "iRANTI, from ìrántí, the Yoruba word for a reminder, is a to-do app built so a reminder gets through when it matters. On Android, each reminder is an exact alarm that still fires while the phone is dozing. When it goes off, the app briefly wakes the phone and opens a full-screen alarm over the lock screen, where the task can be completed, snoozed or dismissed. On iPhone, reminders are scheduled notifications with their own alarm sound, set up for Apple’s critical alerts, which sound even in silent mode once Apple approves them.",
    "Everything stays on the phone. Tasks are kept in encrypted storage, and there is no account or server. Screen-waking alarms are free for 22 days, then need a one-off Premium purchase through Google Play. The trial’s start date is signed with a key held in the phone’s secure hardware, and the Android alarm code checks the trial itself at the moment an alarm fires, so it works even when the app is closed.",
    "The icon is a dùndún, the Yoruba talking drum, which carries messages; its hourglass shape also reads as time. iRANTI is being prepared for a closed test on Google Play. The iPhone version hasn’t been built yet, because that needs a Mac.",
  ],
  icons: {
    image: irantiIcons,
    caption: "The dùndún icon on Android and iPhone, with the alarm notification icon",
    alt: "The iRANTI icon, a green talking drum with two sound waves on black, shown in Android’s round and rounded-square shapes, as a themed Android icon in muted green, as an iPhone icon, and as a small white notification icon.",
  } satisfies Screen,
  featured: {
    title: "The first build would have been turned away by Google Play",
    parts: [
      {
        label: "What happened",
        text: "Before uploading, I checked Google Play’s current rules and found the app failed two of them. Since 31 August 2026, new apps must target Android 16 and use version 8 or newer of Google’s billing library. iRANTI targeted Android 15, and its purchases library used version 7.",
      },
      {
        label: "Cause",
        text: "The app is built on React Native 0.79, which targets Android 15 out of the box, and the purchases library version that suited it was still on the older billing library.",
      },
      {
        label: "Fix",
        text: "I moved the app to target Android 16 and upgraded to react-native-iap 17, which uses billing version 9.1. That library needed newer Kotlin and Android Gradle Plugin versions than React Native 0.79 includes, so I checked what each new dependency required and raised both: Kotlin to 2.2.20 and the plugin to 8.9.3.",
      },
      {
        label: "Knock-on effect",
        text: "Android 16 also changes how the back gesture works, which would have let someone swipe the full-screen alarm away without dealing with the task. I opted the app out of the new behaviour, so the alarm still has to be completed, snoozed or dismissed.",
      },
    ],
  } satisfies IncidentData,
  problemsTitle: "Other problems and how they were fixed",
  problems: [
    {
      problem: "Expo Go couldn’t run it",
      fix: "Expo Go only includes Expo’s own native code, and iRANTI’s alarms, wake lock and licence checks are custom Kotlin and Swift. So I build it with Gradle and install the APK on the phone directly.",
    },
    {
      problem: "A library update needed a newer build plugin than React Native 0.79 has",
      fix: "react-native-safe-area-context 5.11 asked for Android Gradle Plugin 9. I checked each native library’s build file and pinned versions that work together, such as 5.5.2.",
    },
    {
      problem: "Winding the phone’s clock back could have restarted the trial",
      fix: "The app records the last time it was opened. If the clock is more than five minutes behind that, screen-waking alarms stay locked until the clock is put right.",
    },
    {
      problem: "A reminder set during the trial could still wake the phone after it ended",
      fix: "The trial’s end date is passed to the native alarm code with a hardware-backed signature, so each alarm checks it as it fires, even with the app closed.",
    },
    {
      problem: "Clean builds failed after the purchases upgrade",
      fix: "Gradle’s clean step reused C++ settings that still pointed at the old library’s native code. Deleting the build folders by hand does the same job without that step.",
    },
    {
      problem: "Reinstalling the app on Android restarts the trial",
      fix: "Android deletes the app’s hardware key when it is uninstalled, so a fresh install starts a new trial. Only a server check can close this gap, and the app has no server yet. Still open.",
    },
  ] satisfies Problem[],
};

// Sabi Scan is a working prototype on my own phone, so nothing here claims a
// release, users or testing in a market. The figures come from the project's
// own tests and NAFDAC's public lists. Update it after NAFDAC replies and the
// first market test.
export const sabi = {
  title: "Sabi Scan",
  role: "Android app that checks NAFDAC registration numbers, even with no signal",
  date: { iso: "2026-10", text: "October 2026 to present" },
  stack: "Flutter, Dart, Google ML Kit, SQLite, Python, FastAPI",
  intro: [
    "Sabi Scan, from sabi, the Pidgin word for knowing, helps shoppers in markets like Balogun and Ariaria check a product before they pay. You point the phone at the “NAFDAC Reg. No.” on the pack and press one button. The phone reads the number itself with Google’s ML Kit and checks it against 24,678 registration numbers from NAFDAC’s Greenbook and food products database, kept on the phone, so it works with no signal.",
    "A registered number comes back green, with what NAFDAC’s record says the pack should show: the product name, strength, pack size and maker, for the shopper to compare with the pack in their hand. A number that isn’t in the lists comes back as “Can’t confirm this one”, never as fake, because the public lists are incomplete. Red is kept for numbers NAFDAC itself has flagged. Warnings carry a button to NAFDAC’s reporting form, and alcoholic drinks show NAFDAC’s ban on sachets and bottles under 200 ml.",
    "The app is built in Flutter, with all the checking in a separate Dart package that is tested without a phone. A Python tool downloads both NAFDAC lists, repairs typing slips, leaves out broken entries and signs every record, so the phone can spot a damaged download. I tuned the number reader on the real lists: in tests that damage the print the way worn packs do, it finds the right number about 99.5% of the time. A FastAPI server that refreshes the lists every night is built but not yet online. Sabi Scan runs on my own phone and hasn’t been released, because NAFDAC’s permission to use its data comes first.",
  ],
  link: {
    href: "https://github.com/Verde-blck/sabi-scan",
    label: "github.com/Verde-blck/sabi-scan",
  },
  screens: [
    {
      image: sabiCamera,
      caption: "Scanning",
      alt: "The camera screen, with a juice carton held up so its NAFDAC registration number sits inside the white guide box, a torch button and a round scan button.",
    },
    {
      image: sabiRegistered,
      caption: "A registered product",
      alt: "A green result for Indomie Instant Noodles Chicken Flavor, NAFDAC number 01-0877, checked without internet. It lists what the pack should say: the product name, instant noodle, the pack sizes, Dufil Prima Foods Ltd and made in Nigeria.",
    },
    {
      image: sabiCantConfirm,
      caption: "A number not in the lists",
      alt: "An amber result for 02-4819 that says “Can’t confirm this one”, asks the shopper to check the number on the pack, explains that a missing product is not proof of a fake, and offers Report to NAFDAC and Scan another buttons.",
    },
  ] satisfies Screen[],
  featured: {
    title: "The first real scan called a genuine pack a different product",
    parts: [
      {
        label: "What happened",
        text: "I scanned a pack of Indomie at home. The number was registered to Indomie, but the app came back amber: “This number belongs to a different product”.",
      },
      {
        label: "Cause",
        text: "The registration number sits on the back of the pack, with the maker’s address and the nutrition panel. The brand name is on the front, so it wasn’t in the photo, and the app read “name not seen” as “wrong product”.",
      },
      {
        label: "Fix",
        text: "The product name no longer makes a result suspicious. The result shows what NAFDAC’s record says the pack should show and asks the shopper to compare, with a tick when the photo did show the name.",
      },
      {
        label: "Knock-on effect",
        text: "Leaving the last check to the shopper also catches the most common fake: a real number printed on a different product. The shopper sees straight away that the number belongs to something else.",
      },
    ],
  } satisfies IncidentData,
  problemsTitle: "Other problems and how they were fixed",
  problems: [
    {
      problem: "Every scan failed in the release build",
      fix: "Release builds shrink the code, and the shrinker removed parts of ML Kit that are only looked up while the app runs. The phone’s own log showed the crash inside the shrunk code, so release builds now skip shrinking.",
    },
    {
      problem: "Worn print turns letters into numbers",
      fix: "The camera reads the C in C4 as a G, a leading 0 as a D, the 1 in A11 as an l, and the L at the end of food numbers as a 1. The reader tries the look-alike versions and lets the list decide, and it is tested on all 24,678 real numbers.",
    },
    {
      problem: "NAFDAC’s food list had numbers turned into dates",
      fix: "About 700 numbers had been turned into dates such as “Aug-35” by a spreadsheet, and 962 rows were blank. The download tool repairs typing slips, such as the letter O typed for a zero, leaves out what can’t be used and lists it for review.",
    },
    {
      problem: "Some genuine products aren’t in any public list",
      fix: "Cosmetics, and food registered before 2022, aren’t published. A mentholated powder and a balm I tested weren’t there under any number or name, so the app says it can’t confirm them rather than calling them fake. Still open until NAFDAC shares fuller data.",
    },
    {
      problem: "Signal in a busy market comes and goes",
      fix: "The app checks online for at most four seconds, then answers from the list on the phone, and stops trying for a while after repeated failures. A network’s “data exhausted” page is never mistaken for an answer.",
    },
    {
      problem: "A bad night on NAFDAC’s site could empty every phone’s list",
      fix: "Phones replace their whole list with the server’s copy. The server refuses a nightly refresh that is too small or much smaller than the day before, and keeps the last good list.",
    },
    {
      problem: "Small alcohol packs were registered before NAFDAC banned them",
      fix: "59 drinks in the list were registered in sachets or bottles under 200 ml. Since the ban took effect on 1 January 2026, every alcoholic drink shows a notice about it and a button to report the seller.",
    },
  ] satisfies Problem[],
};

export const projects = [
  {
    name: "IHERIS e-Voting dashboard",
    stack: "Vue.js, Pinia, Vite",
    text: "Election admin dashboard with role-based access and audit logs.",
    link: {
      href: "https://iheris-evoting-dashboard.vercel.app",
      label: "iheris-evoting-dashboard.vercel.app",
    },
  },
  {
    name: "Oma’s Tasty Meals",
    stack: "React",
    text: "Responsive meal-ordering site with a menu, cart and WhatsApp ordering.",
    link: {
      href: "https://oma-tasty-meals-rurw.vercel.app",
      label: "oma-tasty-meals-rurw.vercel.app",
    },
  },
  {
    name: "PETROSIM V well-logging workstation",
    stack: "Python",
    text: "Desktop app that simulates well-log analysis.",
    link: {
      href: "https://github.com/Verde-blck/petrosim-v",
      label: "github.com/Verde-blck/petrosim-v",
    },
  },
] as const;
