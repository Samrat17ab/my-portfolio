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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} dark`}>
      <body className="min-h-screen bg-base text-white antialiased selection:bg-marigold selection:text-base">
        {children}
      </body>
    </html>
  );
}
