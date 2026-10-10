import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samrat Lamsal — Product",
  description:
    "Samrat Lamsal — Product Management Intern at Khalti by IME. Building MyMoodly, a live anonymous mood-matching platform, and shipping product at fintech scale.",
};

// Runs before first paint: a reload of the home page always starts on the hero,
// instead of restoring the old scroll position or jumping to a #section in the URL.
// The browser decides whether to restore scroll from the history entry as it was when
// the page unloaded, so "manual" is set on pagehide; it is set back to "auto" after
// load so the back button still restores position after client-side navigation.
const RELOAD_TO_TOP = `(function(){try{
addEventListener("pagehide",function(){if(location.pathname==="/")history.scrollRestoration="manual";});
var n=performance.getEntriesByType("navigation")[0];
if(!n||n.type!=="reload"||location.pathname!=="/")return;
if(location.hash)history.replaceState(null,"",location.pathname+location.search);
scrollTo(0,0);
addEventListener("load",function(){scrollTo(0,0);setTimeout(function(){history.scrollRestoration="auto";},0);});
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: RELOAD_TO_TOP }} />
      </head>
      <body className="min-h-screen text-body antialiased">
        {children}
      </body>
    </html>
  );
}
