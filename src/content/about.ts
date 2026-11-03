import type { StaticImageData } from "next/image";
import boat from "./wall/boat.jpg";
import laptop from "./wall/laptop.jpg";
import outfit from "./wall/outfit.jpg";
import selfie from "./wall/selfie.jpg";
import shirt from "./wall/shirt.jpg";
import team from "./wall/team.jpg";

// The About section. The first paragraph is built from Akorede's own account
// of why he does this work. The rest comes from the CV. Edit any line that is
// not how you would say it.
export type WallPhoto = {
  image: StaticImageData;
  alt: string;
};

export const about = {
  title: "About",
  paragraphs: [
    "I’ve loved fixing things since I was young. As I got older and technology grew, I saw that you could fix things without lifting anything heavy, and that tech was a good way to earn a living. So I studied Computer Science at IHERIS University in Togo and majored in frontend engineering.",
    "Alongside my degree I designed marketing graphics for a Web3 community and gave clients onsite technical support. Today I’m a frontend and mobile developer in Lagos, building web and mobile apps in React, React Native and TypeScript. I maintain a production e-commerce site and built the E5 dashboard and its tablet app, both described below.",
    "Outside code, I captained my university football team and was the student representative for my Computer Science cohort.",
  ],

  // The photo wall. Every picture is shown whole, never cropped. Each one
  // keeps its own shape and the wall fits them together in rows, so the first
  // two (the first row) come out biggest and the other four smaller. The site
  // turns each picture into a green monochrome one.
  //
  // To swap a picture, put the new file in src/content/wall, change its
  // import above, and update the alt text so it describes what is in it. The
  // order below is the order on the page.
  photos: [
    { image: laptop, alt: "A hand with a wristwatch held over a laptop that shows lines of code." },
    { image: team, alt: "Six men in football kits sitting together on a floodlit artificial pitch at night, one holding a replica trophy." },
    { image: shirt, alt: "A man in a checked shirt sitting in front of a wooden door, looking at the camera." },
    { image: boat, alt: "A man in a white T-shirt and green trousers sitting on the front of a boat at sunset, drinking from a glass, with a city skyline behind him." },
    { image: outfit, alt: "A man standing on a road in a long blue and white striped traditional robe and black shoes." },
    { image: selfie, alt: "A close-up selfie of a man in a pink shirt and black tie." },
  ] satisfies WallPhoto[],
};
