# Portfolio

Personal portfolio for Akorede Bankole. Built with Next.js (App Router), Tailwind CSS and Motion.

## Run it

```
npm install
npm run dev      # opens at http://localhost:3000
npm run lint
npm run build    # the check that counts before every deploy
```

Run these from the folder that contains `package.json` and `src`.

## Where to change things

| To change | Edit |
| --- | --- |
| Name, role, email, links, site address | `src/lib/site.ts` |
| All the words in the Work section (E5 write-up, other roles, projects) | `src/content/work.ts` |
| Colours and type | `src/app/globals.css` |
| The scroll story at the top (speed, timing) | `src/components/hero/timeline.ts` |
| The playback demo data | `src/content/sampleTrack.ts` (made-up data, keep it separate from real E5 data) |
| The six-picture photo wall in About (pictures and alt text) | `src/content/about.ts`, with the picture files in `src/content/wall` |
| The share image | `src/app/opengraph-image.png` and `twitter-image.png` (1200 by 630) |

Open `/tokens` while developing to see every colour and the long-read type. It is hidden from search engines. Delete `src/app/tokens` if you do not want it online.

## Before you publish

- The E5 write-up needs the client's approval. It is in `src/content/work.ts`.
- Check the wording of the speed filter against your code. The demo compares each fix with the last fix it kept.
- The last row of the E5 table names a colleague and says "Still open". Decide whether to keep both.
- Your CV says voice messages are encoded to WAV. The site says MP3. Make them match.
- Delete the starter files in `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). Nothing uses them.

## Deploy on Vercel

1. **Put the project on GitHub.** From the folder that contains `package.json`:
   ```
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-NAME/YOUR-REPO.git
   git push -u origin main
   ```
   Create the empty repository on github.com first. Private is fine.
2. **Import it.** On vercel.com choose Add New, then Project, then pick the repository. Vercel detects Next.js by itself. If the repository root is a folder above the one with `package.json`, set Root Directory to the inner folder.
3. **Set the site address.** Under Environment Variables add `NEXT_PUBLIC_SITE_URL` with your final address, for example `https://your-name.vercel.app`, with no slash at the end. Do this before the first deploy.
4. **Deploy.** It takes about a minute.
5. **Custom domain later.** Add it under Settings, then Domains. Then change `NEXT_PUBLIC_SITE_URL` to the new address and redeploy. Until you do, share previews and the sitemap still point at the old address.

## After it is live

- Open the site on a phone and scroll the whole way down.
- Paste the address into the LinkedIn Post Inspector, or opengraph.xyz, to check the share card. Social sites remember old previews, so changes can take a while to show.
- Run PageSpeed Insights on the mobile tab.
- Open `/robots.txt` and `/sitemap.xml` and check they show your address.

## Notes

- The cursor trail runs only with a mouse or pen. Touch screens and visitors who ask for reduced motion never see it.
- The scroll story, the playback demo and the page transition all have still or instant versions for reduced motion.
- The playback demo uses made-up data and says so on the page.
