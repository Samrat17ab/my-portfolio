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
          <p className="mt-4 max-w-xl text-sm text-white/55">
            A few guesstimates worked in the open — including where the first pass was wrong.
          </p>
        </Reveal>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {featured.map((item, i) => {
            const isOpen = openSlug === item.slug;
            return (
              <Reveal key={item.slug} delay={0.05 * i}>
                <button
                  type="button"
                  onClick={() => setOpenSlug(isOpen ? null : item.slug)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex flex-col gap-2">
                    <Badge variant="glacier" className="w-fit">
                      {item.tag}
                    </Badge>
                    <span className="text-base font-medium text-white/85 sm:text-lg">
                      {item.question}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-glacier transition-transform duration-300",
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
                      <div className="space-y-3 pb-6 text-sm leading-relaxed text-white/55">
                        <ul className="list-disc space-y-2 pl-5">
                          {item.approach.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ul>
                        {item.reality && <p className="text-marigold/80">{item.reality}</p>}
                        <p className="font-medium text-white/80">{item.result}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-6">
          <Link
            href="/guesstimates"
            className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-glacier"
          >
            All 10 guesstimates &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
