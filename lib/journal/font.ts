import { Newsreader } from "next/font/google";

/** Reading serif for the journal, shared by the journal pages and the homepage teaser. */
export const journalSerif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});
