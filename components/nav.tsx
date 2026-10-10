"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { Menu, X } from "lucide-react";

import { Magnetic } from "@/components/magnetic";
import { ResumeButton } from "@/components/resume-viewer";
import { BLOG_ENABLED } from "@/lib/blog/config";
import { cn } from "@/lib/utils";

// `id` links scroll to a homepage section; `href` links go to their own page.
type NavItem = { label: string } & ({ id: string; href?: undefined } | { href: string; id?: undefined });

const LINKS: NavItem[] = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "leadership", label: "Leadership" },
  { id: "thinking", label: "Thinking" },
  ...(BLOG_ENABLED ? [{ href: "/blog", label: "Blog" }] : []),
  { id: "contact", label: "Contact" },
];
const SECTION_IDS = LINKS.flatMap((link) => (link.id ? [link.id] : []));

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  const scrollToId = React.useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
      return true;
    },
    [prefersReducedMotion],
  );

  // Arriving on "/#section" from another page: the target may be lazy-loaded,
  // so retry briefly until it exists instead of relying on the browser's one-shot jump.
  React.useEffect(() => {
    if (!isHome) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (scrollToId(id) || attempts > 20) window.clearInterval(timer);
    }, 100);
    return () => window.clearInterval(timer);
  }, [isHome, scrollToId]);

  React.useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const observeAll = () => {
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    };
    observeAll();
    const retry = window.setTimeout(observeAll, 1500);
    return () => {
      window.clearTimeout(retry);
      observer.disconnect();
    };
  }, [isHome]);

  function isActive(link: NavItem) {
    return link.href ? pathname.startsWith(link.href) : activeId === link.id;
  }

  function handleLinkClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (!isHome || !document.getElementById(id)) {
      setMenuOpen(false);
      return;
    }
    event.preventDefault();
    if (menuOpen) {
      // The mobile menu's collapse animation cancels an in-flight smooth scroll,
      // so start scrolling only once it has closed.
      setMenuOpen(false);
      window.setTimeout(() => scrollToId(id), prefersReducedMotion ? 0 : 280);
    } else {
      scrollToId(id);
    }
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: isHome ? 1.4 : 0, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || menuOpen ? "border-line bg-ink/90 backdrop-blur-md" : "border-transparent",
      )}
    >
      <div className="flex items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="/#top"
          onClick={(event) => handleLinkClick(event, "top")}
          className="font-display text-sm uppercase tracking-[0.2em] text-white"
        >
          Samrat Lamsal
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active = isActive(link);
            const className = cn(
              "relative py-1 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:text-glacier",
              active ? "text-glacier" : "text-white/60",
            );
            const underline = active && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-x-0 -bottom-1 h-px bg-glacier"
                transition={prefersReducedMotion ? { duration: 0 } : undefined}
              />
            );
            return (
              <Magnetic key={link.label} strength={0.4}>
                {link.href !== undefined ? (
                  <Link href={link.href} aria-current={active ? "page" : undefined} className={className}>
                    {link.label}
                    {underline}
                  </Link>
                ) : (
                  <a
                    href={`/#${link.id}`}
                    onClick={(event) => handleLinkClick(event, link.id)}
                    aria-current={active ? "true" : undefined}
                    className={className}
                  >
                    {link.label}
                    {underline}
                  </a>
                )}
              </Magnetic>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic strength={0.3}>
            <ResumeButton className="rounded-full border border-marigold/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-marigold transition-colors hover:bg-marigold/10">
              Resume
            </ResumeButton>
          </Magnetic>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="rounded-full p-2 text-white/80 transition-colors hover:text-white md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="flex flex-col px-6 py-3">
              {LINKS.map((link) => {
                const className = cn(
                  "block py-3 text-sm font-medium uppercase tracking-[0.16em] transition-colors hover:text-glacier",
                  isActive(link) ? "text-glacier" : "text-white/70",
                );
                return (
                  <li key={link.label}>
                    {link.href !== undefined ? (
                      <Link href={link.href} onClick={() => setMenuOpen(false)} className={className}>
                        {link.label}
                      </Link>
                    ) : (
                      <a href={`/#${link.id}`} onClick={(event) => handleLinkClick(event, link.id)} className={className}>
                        {link.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
