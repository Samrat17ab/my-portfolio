"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Download, ExternalLink, X } from "lucide-react";

import { contact } from "@/lib/content";

const subscribeNoop = () => () => {};

interface ResumeButtonProps {
  className?: string;
  children: React.ReactNode;
}

/** Opens the resume in an on-page viewer first; download lives inside the viewer. */
export function ResumeButton({ className, children }: ResumeButtonProps) {
  const [open, setOpen] = React.useState(false);
  const mounted = React.useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {/* Portal: ancestors like the nav use backdrop-filter/transforms, which would
          otherwise trap a position:fixed overlay inside them. */}
      {mounted && createPortal(<ResumeModal open={open} onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}

function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.25 };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={transition}
            className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-raised"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-ink/80 p-2 text-white/70 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-auto bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={contact.resumePreview} alt="Samrat Lamsal resume" className="w-full" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-white/90">Samrat Lamsal — Resume</p>
                <p className="text-xs text-white/50">PDF &middot; 1 page</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={contact.resumeHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-glacier/50 hover:text-glacier"
                >
                  Open PDF
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href={contact.resumeHref}
                  download="Samrat_Lamsal_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full bg-marigold px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.02]"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
