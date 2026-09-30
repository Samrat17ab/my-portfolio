"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

import { Magnetic } from "@/components/magnetic";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#leadership", label: "Leadership" },
  { href: "#thinking", label: "Thinking" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300 sm:px-10",
        scrolled ? "border-b border-line bg-base/80 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <Link href="#top" className="font-display text-sm uppercase tracking-[0.2em] text-white">
        Samrat Lamsal
      </Link>
      <nav className="hidden items-center gap-8 sm:flex">
        {LINKS.map((link) => (
          <Magnetic key={link.href} strength={0.4}>
            <a
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-glacier"
            >
              {link.label}
            </a>
          </Magnetic>
        ))}
      </nav>
      <Magnetic strength={0.3}>
        <a
          href="#contact"
          className="rounded-full border border-marigold/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-marigold transition-colors hover:bg-marigold/10"
        >
          Resume
        </a>
      </Magnetic>
    </motion.header>
  );
}
