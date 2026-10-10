"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

import { guesstimates, featuredGuesstimateSlugs } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const featured = featuredGuesstimateSlugs
  .map((slug) => guesstimates.find((g) => g.slug === slug))
  .filter((g): g is NonNullable<typeof g> => Boolean(g));

export function ProofOfThinking() {
  const [openSlug, setOpenSlug] = React.useState<string | null>(null);

  return (
    <section id="thinking" className="py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionHeading kicker="Show your work" title="Proof of Thinking" />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-xl text-base leading-[1.75] text-body">
            A few guesstimates worked in the open — including where the first pass was wrong.
          </p>
        </Reveal>

        <div className="mt-12 space-y-4">
          {featured.map((item, i) => {
            const isOpen = openSlug === item.slug;
            return (
              <Reveal key={item.slug} delay={0.05 * i} className="rounded-3xl border border-edge bg-surface px-6 shadow-soft backdrop-blur-md transition-shadow duration-500 hover:shadow-lift sm:px-8">
                <button
                  type="button"
                  onClick={() => setOpenSlug(isOpen ? null : item.slug)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex flex-col gap-2">
                    <Badge variant="ocean" className="w-fit">
                      {item.tag}
                    </Badge>
                    <span className="font-display text-lg leading-snug text-heading sm:text-xl">
                      {item.question}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-ocean transition-transform duration-500",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 pb-7 text-[15px] leading-[1.75] text-body">
                        <ul className="list-disc space-y-2 pl-5 marker:text-tide">
                          {item.approach.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ul>
                        {item.reality && (
                          <p className="rounded-2xl border-l-2 border-coral bg-gold/15 px-4 py-3 text-heading">{item.reality}</p>
                        )}
                        <p className="font-medium text-heading">{item.result}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-8">
          <Link
            href="/guesstimates"
            className="text-xs font-medium uppercase tracking-[0.2em] text-ocean-deep underline decoration-transparent decoration-2 underline-offset-8 transition-colors duration-300 hover:decoration-coral"
          >
            All 10 guesstimates &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
