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
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <SectionHeading kicker="Coursework" title="Certifications" />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 text-sm text-body">Click a certificate to view it.</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={0.05 * i}>
              <button
                type="button"
                onClick={() => setOpenCert(cert)}
                className="block w-full text-left"
              >
                <Card className="h-full hover:-translate-y-1 hover:border-coral/60 hover:shadow-lift">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-heading/25 p-4 backdrop-blur-md sm:p-8"
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
            className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-edge bg-page shadow-lift"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-surface p-2 text-heading shadow-soft backdrop-blur transition-colors duration-300 hover:bg-coral/30"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cert.image} alt={`${cert.name} certificate`} className="w-full" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-edge px-5 py-4">
              <div>
                <p className="text-sm font-medium text-heading">{cert.name}</p>
                <p className="text-xs text-body">
                  {cert.issuer} &middot; {cert.date}
                </p>
              </div>
              <a
                href={cert.driveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-heading transition-all duration-[400ms] ease-out hover:border-coral hover:bg-coral/20"
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
