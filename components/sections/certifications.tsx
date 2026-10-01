"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ExternalLink, X } from "lucide-react";

import { certifications, type Certification } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function Certifications() {
  const [openCert, setOpenCert] = React.useState<Certification | null>(null);

  React.useEffect(() => {
    if (!openCert) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenCert(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openCert]);

  return (
    <section className="border-y border-line py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <SectionHeading kicker="Coursework" title="Certifications" />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 text-sm text-white/50">Click a certificate to view it.</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={0.05 * i}>
              <button
                type="button"
                onClick={() => setOpenCert(cert)}
                className="block w-full text-left"
              >
                <Card className="h-full transition-colors hover:border-glacier/40">
                  <CardHeader>
                    <CardTitle className="text-lg normal-case tracking-normal">
                      {cert.name}
                    </CardTitle>
                    <CardDescription>
                      {cert.issuer} &middot; {cert.date}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <CertLightbox cert={openCert} onClose={() => setOpenCert(null)} />
    </section>
  );
}

function CertLightbox({ cert, onClose }: { cert: Certification | null; onClose: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.25 };

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={cert.name}
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

            <div className="overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cert.image} alt={`${cert.name} certificate`} className="w-full" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-white/90">{cert.name}</p>
                <p className="text-xs text-white/50">
                  {cert.issuer} &middot; {cert.date}
                </p>
              </div>
              <a
                href={cert.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white/80 transition-colors hover:border-glacier/50 hover:text-glacier"
              >
                Open in Drive
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
