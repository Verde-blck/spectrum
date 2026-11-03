// One place for identity details. Change them here and nowhere else.
export const site = {
  name: "Akorede Bankole",
  legalName: "Bankole Akorede Olakunle",
  role: "Frontend and mobile developer",
  base: "Lagos, Nigeria",
  email: "koredebankole2000@gmail.com",
  github: "https://github.com/Verde-blck",
  linkedin: "https://www.linkedin.com/in/akorede-bankole",
  description:
    "Frontend and mobile developer in Lagos. React, React Native, TypeScript and Next.js.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
