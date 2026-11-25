// All the words for the Work section live here, apart from the layout.
// The E5 text is VerdeDev's own wording. Keep it in step with anything
// the client has approved before the site goes live.

import type { StaticImageData } from "next/image";
import ledgerCalendar from "./ledger/calendar.png";
import ledgerCustomer from "./ledger/customer.png";
import ledgerAdmin from "./ledger/admin.png";
import ledgerHome from "./ledger/home.png";
import irantiIcons from "./iranti/icons.png";
import irinAjoHome from "./irin-ajo/home.png";
import irinAjoShare from "./irin-ajo/share.png";
import irinAjoWalk from "./irin-ajo/walk.png";
import e5MobileDashboard from "./e5-mobile/dashboard.png";
import e5MobileMap from "./e5-mobile/live-map.jpg";
import e5MobileAlarm from "./e5-mobile/sos-alarm.png";
import sabiCamera from "./sabi/camera.png";
import sabiCantConfirm from "./sabi/cant-confirm.png";
import sabiRegistered from "./sabi/registered.png";

export type Part = { label: string; text: string; reflective?: boolean };
export type IncidentData = { title: string; parts: Part[] };

export type Problem = { problem: string; fix: string };

export const e5 = {
  title: "E5 Smart Helmet",
  role: "Frontend and mobile developer (contract)",
  date: { iso: "2026-09", text: "September 2026 to present" },
  intro: [
    "The E5 dashboard is a React and TypeScript web app, hosted on Vercel, that lets a control room monitor and manage smart helmets in the field. It holds no data of its own: everything comes from a backend (not built by me) on Railway, live video and calls go through a separate media server over WebRTC, and photos and videos are stored on Cloudflare R2 behind temporary links. Supervisors can see every helmet’s status, location, battery, signal and gas readings; watch live video and call wearers; answer SOS alarms; replay routes; send voice messages; draw fences; and manage helmet settings, connectivity and admin accounts, each limited by their role.",
    "I also built the companion app for tablets, in Expo, React Native and TypeScript. It is on Google Play, an iPad version is being tested, and it has its own write-up after the route.",
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

// The E5 tablet app. The Android app is on Google Play. The iPad version is built
// and being tested through TestFlight; it is not on the App Store, so don't say it
// is until it is. The backend is Cypher's, not mine. The screenshots come from the
// app running in a browser at tablet size on made-up data, never real helmets or
// people. As with the dashboard, keep this in step with anything E5 has approved
// before the site goes live. When the Android build with the two-step sign-in fix
// is released, change the last part of the featured story from "next release" to
// the release it went out in.
export const e5Mobile = {
  title: "E5 Smart Helmet for tablets",
  role: "Mobile developer (contract), for Android tablets and iPad",
  date: { iso: "2026-10", text: "October 2026 to present" },
  stack:
    "Expo SDK 58, React Native 0.88, TypeScript, NativeWind, Expo Router, TanStack Query, Zustand, WebRTC, Google Maps, Apple Maps, Firebase Cloud Messaging, EAS Build",
  intro: [
    "This is the control-room app for E5’s smart helmets, made for tablets. It does what the dashboard does, at a desk or in a site office: it shows every helmet’s status, battery, wearer and last position on a live map with fences; plays live video; calls a wearer or a whole group; sends voice messages; replays a route; and manages administrators and what each of them may do. Two-step sign-in is built in, and the backend, which I did not build, decides what each person is allowed to see.",
    "An alarm must not be missed. A critical one, such as an SOS, a fall, a gas reading or a worker near live electrics, opens a large red pop-up with a siren that stays until someone acts on it, and several alarms queue one behind another. A warning gets a smaller banner. On Android, the app can also raise alerts on a locked tablet through push notifications. It is made for tablets, and an Android phone is shown a message instead.",
    "The map is Google Maps on Android, Apple Maps on iPad and OpenStreetMap as a fallback, and video calls use WebRTC through a media server. The Android app is live on Google Play. An iPad version is being tested through TestFlight, and I am preparing it to be shared by direct link rather than in the public store, because it is for E5’s staff only. More than 400 automated checks cover the app, and it also runs on made-up data, so I can test and show it without real helmets.",
  ],
  link: {
    href: "https://play.google.com/store/apps/details?id=com.e5energy.smarthelmet",
    label: "E5 Smart Helmet on Google Play",
  },
  screens: [
    {
      image: e5MobileDashboard,
      caption: "Dashboard",
      alt: "The dashboard on a tablet: counts of 8 helmets, 3 online, 5 offline and 3 alarms in the last 24 hours, a list of helmets that need attention, and a menu of icons down the left.",
    },
    {
      image: e5MobileMap,
      caption: "Live map with fences",
      alt: "The live map on a tablet: helmets as coloured dots on a street map of Lagos, two fences drawn as a circle and a square, filter buttons for All, Online, Degraded and Offline, and a note that two helmets have no position yet.",
    },
    {
      image: e5MobileAlarm,
      caption: "An SOS alarm",
      alt: "An SOS alarm over the app: a large red box reading SOS pressed, with the wearer’s name and helmet, a line saying the wearer pressed the SOS button and is asking for a call, and the buttons View on map, Join call and Close.",
    },
  ] satisfies Screen[],
  featured: {
    title: "Two-step sign-in worked on the website and failed on the app",
    parts: [
      {
        label: "What happened",
        text: "On the first test on an iPhone, the two-step screen refused every code with “challenge_expired”. The website accepted the same account and the same codes.",
      },
      {
        label: "Cause",
        text: "When two-step sign-in is on, the backend’s login reply contains a value called challenge, and the code step has to send it back with the code. The app looked for fields called mfaToken and challengeToken, names I had guessed before there was a written contract, so it never sent the challenge and the server said none had arrived.",
      },
      {
        label: "My first guesses",
        text: "I lost time on two wrong ideas: that the challenge had timed out, and then that the server needed cookies. A test against the live server with a made-up user answered the same way whatever I sent, so it could not tell a missing field from anything else, and it misled me. Asking the backend developer for his written contract settled it.",
      },
      {
        label: "Fix",
        text: "The app now keeps the challenge from the login reply and sends it back with the code, exactly as the backend’s document says. Each error the backend can return has its own plain message, and only an expired challenge restarts the sign-in, which it does silently.",
      },
      {
        label: "Making sure it stays fixed",
        text: "The old tests had been written to match my guess, so they passed while the feature was broken. I rewrote them from the backend’s own document, and I tested the whole flow in a browser against a pretend server that follows its rules: wrong codes, a code used twice, an expired challenge and too many attempts.",
      },
      {
        label: "Where it stands",
        text: "The same mistake was in the Android build already on Google Play, so the corrected build is the next release.",
        reflective: true,
      },
    ],
  } satisfies IncidentData,
  problemsTitle: "Other problems and how they were fixed",
  problems: [
    {
      problem: "The Verify button was invisible on an iPhone",
      fix: "The first iPhone build drew no background behind the button, which left white text on a white card. Changing its shadow did not help. Replacing the pressable with a plain touchable did, and the button keeps a border so it stays visible even if a fill ever fails to draw. I never pinned down exactly why.",
    },
    {
      problem: "A number keypad has no Go key",
      fix: "The code box now sends the code by itself on the sixth digit, which also suits autofill and paste, and a plain line says “Checking the code...” so the screen never looks frozen.",
    },
    {
      problem: "A build with no server address kept running",
      fix: "A tester found that a build with a missing or malformed server address carried on. A build now refuses to start without a valid address and says so. Nothing is sent, and no saved sign-in is attached to anything.",
    },
    {
      problem: "A locked iPad cannot ring",
      fix: "iPadOS pauses an app that is not on screen. The first iPad version says so plainly and asks the control desk to keep the iPad awake with the app open. Alerts through Apple’s push service need a backend change, so I wrote it up for the backend developer, and the app keeps it behind a switch that is off.",
    },
    {
      problem: "Google Play warned that the app might crash on some devices",
      fix: "The notice was about 16 KB memory pages. I read the native libraries’ headers: they were aligned correctly, and Play’s own page for the build said it supports 16 KB. The warning came from React Native being built with an older Android toolkit than Google now prefers. I left it alone, because overriding a version React Native pins risks a worse fault, and I noted what to do when React Native updates.",
    },
    {
      problem: "The store page said no data was collected",
      fix: "The Data safety section on Google Play said “No data collected”, but the app sends names, phone numbers, recorded audio and device codes to the backend. I listed exactly what it sends from the code and wrote the answers for E5 and the backend developer to confirm, and the label was corrected.",
    },
    {
      problem: "Video calls need more than Expo Go",
      fix: "Calls use a native WebRTC module that Expo Go does not include, so those screens only work in a real build. Everything else can be tried quickly in Expo Go.",
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

// Irin Ajo has run as an Android test build against a staging server, but it is
// not on Google Play yet. Don't claim a release or users until it is. Richard
// built the backend; keep saying so. The screenshots come from the app running
// in a browser at phone size; swap in phone screenshots after the field test.
export const irinAjo = {
  title: "Irin Ajo",
  role: "Walking app for Nigerian cities, for Android (in testing)",
  date: { iso: "2026-11", text: "November 2026" },
  stack: "React Native, Expo SDK 58, TypeScript, NativeWind, Zustand, SQLite, Mapbox, Kotlin (Android foreground service), EAS Build",
  intro: [
    "Irin Ajo, from ìrìn àjò, the Yoruba for a journey, is a walking app for Nigerian cities. It counts steps and distance, draws the route on a map, keeps a daily streak and speaks an update every 1,000 steps, in English or Nigerian Pidgin. It is built for the phones most people here carry: 2 GB Android handsets, patchy data and very hot afternoons.",
    "A walk keeps counting with the screen locked, through an Android foreground service written in Kotlin, and everything is saved on the phone first and synced when there is a connection. Walk Safe lets up to three trusted contacts follow a walk live from a link sent by WhatsApp or SMS. Water reminders come sooner as the temperature rises, using live weather, and Explore shows walks nearby with a safety rating for the hour. A finished walk can be shared as a branded card, over the walker’s own photo or as a clear sticker, with the first and last 200 m left out so the route doesn’t point to their door.",
    "The map uses Mapbox with a style I made for it, which shows the landmarks people in Lagos give directions by. Richard built the backend from a brief I wrote, and the app runs against his staging server. Irin Ajo runs as an Android test build and isn’t on Google Play yet: the food tips are with a registered dietitian for review, and the walk voice is waiting for two voice actors.",
  ],
  link: {
    href: "https://github.com/Verde-blck/irin-ajo",
    label: "github.com/Verde-blck/irin-ajo",
  },
  screens: [
    {
      image: irinAjoHome,
      caption: "Home at 1 pm",
      alt: "The home screen: a Start Walk button, a note that it’s the hottest part of the day and a walk after 4:00 pm will feel easier, a ring showing 4.8 of 8 km walked today, and a six-day streak.",
    },
    {
      image: irinAjoWalk,
      caption: "A walk in progress",
      alt: "A walk 12 seconds in: 0.1 km and 164 steps, a card for the walker’s music, a water reminder due in 25 minutes, and Pause and Hold to End buttons over the map.",
    },
    {
      image: irinAjoShare,
      caption: "Sharing a walk",
      alt: "The share sheet: backgrounds Sand, Photo and Clear, Story or Square, and a preview card for a 4.8 km morning walk in Yaba, with a note that the first and last 200 m are left out.",
    },
  ] satisfies Screen[],
  featured: {
    title: "A crash that only happened on the phone",
    parts: [
      {
        label: "What happened",
        text: "After I added Walk Safe, the Android app crashed as it opened, with “Repo used before init()”. Every test in the browser had passed.",
      },
      {
        label: "Cause",
        text: "As the app starts, Walk Safe read its saved contacts before the database had opened. On a phone, reading an unopened SQLite database throws. In the browser the same storage is localStorage, which needs no opening, so the early read quietly worked.",
      },
      {
        label: "Fix",
        text: "Walk Safe now waits until the store has opened, like the rest of the start-up code, and it won’t save anything before it has loaded, so an early call can’t overwrite the saved contacts with an empty list.",
      },
      {
        label: "Making sure it stays fixed",
        text: "The browser storage now refuses to be used before it’s opened, with the same error as the phone. I ran the old code against it and the browser failed exactly as the phone had, and every screen since has been tested against the stricter version.",
      },
    ],
  } satisfies IncidentData,
  problemsTitle: "Other problems and how they were fixed",
  problems: [
    {
      problem: "Some phones close apps in the background",
      fix: "Tecno, Infinix, itel, Xiaomi, Oppo, Realme and Samsung phones can stop a walk counting to save battery. Walks run in a foreground service, and onboarding shows people on those brands how to let Irin Ajo keep running.",
    },
    {
      problem: "Expo Go stopped opening the app after an Expo update",
      fix: "Expo Go only runs the newest SDK. I moved the app from SDK 57 to 58, which needed changes for React Native’s stricter types and a new tab bar API, and set up standalone test builds so a walk no longer needs a computer nearby.",
    },
    {
      problem: "A guessed temperature could pass for a real one",
      fix: "A weather reading counts for three hours. After that, a time-of-day table for southern or northern Nigeria takes over, and the app says “the afternoon heat” instead of a number.",
    },
    {
      problem: "A phone with a slow clock ignored fresh weather",
      fix: "It treated new readings as coming from the future. A reading’s time is now the server’s, but never later than the phone’s own clock.",
    },
    {
      problem: "Shared routes could show where someone lives",
      fix: "Shared images leave out the first and last 200 m by default and say so. The demo above shows the difference.",
    },
    {
      problem: "Brighter colours could quietly make text unreadable",
      fix: "A test checks every colour pairing in the design rules, 4.5:1 for text and 3:1 for icons, so a palette change can’t ship a screen that’s hard to read.",
    },
    {
      problem: "The icon script would have brought back an old logo",
      fix: "It still drew an earlier version of the mark. I rewrote it around the current design and compared its output with the existing icons pixel by pixel before using it.",
    },
    {
      problem: "Every trusted contact sees every shared walk",
      fix: "The server can’t yet share a walk with only some contacts. The app says so plainly, and I’ve asked for sessions that name who can follow. Still open.",
    },
  ] satisfies Problem[],
};

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

// iRANTI has been built and run on real phones, including sharing between two,
// but it is not on Google Play yet. Don't claim a release or users until it is.
export const iranti = {
  title: "iRANTI",
  role: "To-do app whose reminders wake the phone, for Android and iOS (in testing)",
  date: { iso: "2026-11", text: "November 2026" },
  stack: "React Native, TypeScript, NativeWind, Kotlin, Swift, MMKV, Firebase (Authentication, Firestore), react-native-iap (Google Play Billing), Android Keystore",
  intro: [
    "iRANTI, from ìrántí, the Yoruba word for a reminder, is a to-do app built so a reminder gets through when it matters. On Android, each reminder is an exact alarm that still fires while the phone is dozing. When it goes off, the app briefly wakes the phone and opens a full-screen alarm over the lock screen, where the task can be completed, snoozed or dismissed. Reminders can repeat daily, on weekdays, weekly or monthly, and the alarm code schedules the next one itself, so repeats keep going even if the app is never opened.",
    "Tasks can be grouped into lists, broken into checklists and searched. Everything stays on the phone in encrypted storage unless its owner chooses to share it: signing in with Google lets people share a whole list or a single task through an invite code, and changes sync live between phones. Backups go to a file the user picks, such as Google Drive. Screen-waking alarms are free for 22 days, then need a one-off Premium purchase through Google Play; the trial’s start date is signed with a key held in the phone’s secure hardware.",
    "The icon is a dùndún, the Yoruba talking drum, which carries messages; its hourglass shape also reads as time. iRANTI has been tested on real Android phones, including sharing between two, and is being prepared for a closed test on Google Play. The iPhone version hasn’t been built yet, because that needs a Mac.",
  ],
  link: {
    href: "https://github.com/Verde-blck/iRANTI",
    label: "github.com/Verde-blck/iRANTI",
  },
  policies: [
    { href: "/iranti/privacy", label: "Privacy policy" },
    { href: "/iranti/delete-account", label: "Delete your account" },
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
      fix: "Android deletes the app’s hardware key when it is uninstalled, so a fresh install starts a new trial. Closing this would mean checking the trial against an account on a server, which the app doesn’t do yet. Still open.",
    },
    {
      problem: "Anyone who learned a shared list’s ID could have read it",
      fix: "Firestore security rules let only members read a shared list or task, and joining needs an invite code that belongs to that exact list. Before shipping, I tested the rules in Firebase’s emulator against 31 actions that should be allowed or blocked.",
    },
    {
      problem: "Clearing the wrong build folders broke the Android build",
      fix: "Deleting the libraries’ build folders also removed code that React Native generates for them, so the app’s C++ setup could not find it. Running the code generation step on its own before building fixed it.",
    },
  ] satisfies Problem[],
};

// What an app entry needs. The featured story and the list of smaller fixes
// are optional, so an entry can be on the page before they are written.
export type AppEntry = {
  title: string;
  role: string;
  date: { iso: string; text: string };
  stack: string;
  intro: string[];
  link: { href: string; label: string };
  screens: Screen[];
  featured?: IncidentData;
  problemsTitle?: string;
  problems?: Problem[];
};

// Sabi Scan is in development and is not released. Don't claim a release or
// users until it is. This is written from the CV and the three screenshots
// from my phone, so it has no featured story or list of smaller fixes yet. When
// they are written, add featured, problemsTitle and problems below and the page
// will show them. The date is when the screenshots were taken (20 November
// 2026): change it if the work started earlier. NAFDAC's product list stays
// private until NAFDAC agrees.
export const sabi: AppEntry = {
  title: "Sabi Scan",
  role: "App that checks a pack’s NAFDAC number, for Android (in development)",
  date: { iso: "2026-11", text: "November 2026" },
  stack: "Flutter, Dart, Google ML Kit, SQLite, Python, FastAPI",
  intro: [
    "Sabi Scan is an Android app that reads the NAFDAC number printed on a pack, using the phone’s camera, and checks it against NAFDAC’s list of registered products. If the number is in the list, the app shows what the genuine pack should say, such as the product name, the pack sizes and the company, so the person can compare it with the pack in their hand. If it is not, the app says what number it read, asks the person to check it and take another photo, and offers a way to report the product to NAFDAC.",
    "It is careful about what it claims. A number that is not in the list is described as one the app can’t confirm, not as fake, because some genuine products, especially older food, are missing from the list. The check happens on the phone, against 24,678 NAFDAC registrations, so it works without internet, and the app says which day’s list it used. A small FastAPI server provides nightly updates to the list.",
    "The number reader uses Google ML Kit and was tuned on real NAFDAC data. In my tests with simulated worn print it finds the right number in about 99.5% of cases, and 200 automated tests cover the project. Sabi Scan is still in development. The code is on GitHub without NAFDAC’s product list, which stays private until NAFDAC agrees.",
  ],
  link: {
    href: "https://github.com/Verde-blck/sabi-scan",
    label: "github.com/Verde-blck/sabi-scan",
  },
  screens: [
    {
      image: sabiCamera,
      caption: "Scanning a pack",
      alt: "The camera screen: a food pack held in a hand with a white box drawn around its printed NAFDAC number, a note at the top reading Fit the NAFDAC number inside the box, and a torch button and a round search button at the bottom.",
    },
    {
      image: sabiRegistered,
      caption: "A number in the list",
      alt: "A green screen headed In NAFDAC’s list, saying the number is real. A card tells the person to check that the pack in their hand says the same product name, pack type, pack sizes, company and that it was made in Nigeria, and to not buy it if anything is different. Below it are the NAFDAC number and a note that the check was made without internet using the list from 31 October 2026, with a Scan another button.",
    },
    {
      image: sabiCantConfirm,
      caption: "A number the app can’t confirm",
      alt: "An orange screen headed Can’t confirm this one, saying the number isn’t in NAFDAC’s list on the phone. A card asks the person to check that the pack says the number the app read, and a note says some genuine products, especially older food, are missing from the list, so this does not prove it is fake. Buttons read Report to NAFDAC and Scan another.",
    },
  ] satisfies Screen[],
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
