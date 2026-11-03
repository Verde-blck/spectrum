// All the words for the Work section live here, apart from the layout.
// The E5 text is VerdeDev's own wording. Keep it in step with anything
// the client has approved before the site goes live.

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
        label: "What I’d change",
        text: "Run the same check on the server as data arrives, so every client gets clean tracks, and keep the raw fixes for audit.",
        reflective: true,
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
