import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" className={`${anton.variable} ${inter.variable} dark`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: RELOAD_TO_TOP }} />
      </head>
      <body className="min-h-screen bg-ink text-white antialiased selection:bg-marigold selection:text-ink">
        {children}
      </body>
    </html>
  );
}
