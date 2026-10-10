import { Newsreader } from "next/font/google";

/** Reading serif for the blog, shared by the blog pages and the homepage teaser. */
export const blogSerif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});
