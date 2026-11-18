// All the words for the Work section live here, apart from the layout.
// The E5 text is VerdeDev's own wording. Keep it in step with anything
// the client has approved before the site goes live.

import type { StaticImageData } from "next/image";
import ledgerCalendar from "./ledger/calendar.png";
import ledgerCustomer from "./ledger/customer.png";
import ledgerAdmin from "./ledger/admin.png";
import ledgerHome from "./ledger/home.png";

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
    title: "BECEKO Fabrics & Style",
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
  role: "Ledger app for small businesses, which began as Beceko Ledger for BECEKO Fabrics & Style",
  date: { iso: "2026-11", text: "November 2026" },
  stack: "Node.js, Express 5, SQLite, Gemini API, Web Speech API, PDFKit, S3 API (Backblaze B2), JavaScript, Railway",
  intro: [
    "Ìwé Ọjà began as Beceko Ledger, a web app I built for my mum’s fabrics and tailoring business. Customers often pay part now and the rest later, so she needs to know who owes what and to show when each payment came in. She records sales and payments on her phone, by typing or by speaking, and the app keeps a running balance for every customer, a calendar of money received each day, statements she can share as PDFs on WhatsApp, and a one-tap reminder for anyone who owes.",
    "I then turned it into a product other businesses can subscribe to. One codebase runs a separate copy for each business, with its own name, colours and home-screen icon. Each copy has a subscription that sends a reminder, allows a week’s grace and then locks, while still letting the business download its records. An admin dashboard shows every business and renews or suspends them instantly, and each copy backs itself up to Backblaze B2 every day.",
    "Each copy is one Node.js and Express service on Railway, with its ledger in SQLite on a persistent volume. The interface is plain JavaScript with no build step, made for a phone. Notes go to the Gemini API, which turns them into drafts the owner checks before anything is saved.",
  ],
  link: {
    href: "https://github.com/Verde-blck/beceko-ledger",
    label: "github.com/Verde-blck/beceko-ledger",
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
