import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { guesstimates } from "@/lib/content";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Guesstimates — Samrat Lamsal",
  description:
    "10 worked guesstimates — full reasoning, assumptions, and where the first pass was wrong.",
};

export default function GuesstimatesPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pb-32 pt-40">
        <Reveal>
          <Link
            href="/#thinking"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-glacier"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="font-display mt-6 text-4xl uppercase tracking-wide text-white sm:text-5xl">
            Guesstimates
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55">
            {guesstimates.length} market-sizing and demand estimates, worked in the open — full
            assumptions, the math, and a real-world check where one exists. Estimation is a core
            part of product judgment: knowing how to break an unknown number into reasonable
            parts, and being honest about where the parts were wrong.
          </p>
        </Reveal>

        <div className="mt-14 space-y-6">
          {guesstimates.map((item, i) => (
            <Reveal key={item.slug} delay={0.03 * i}>
              <Card>
                <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
                  <div>
                    <Badge variant="glacier">{item.tag}</Badge>
                    <h2 className="mt-3 text-lg font-medium leading-snug text-white/95 sm:text-xl">
                      {item.question}
                    </h2>
                  </div>
                  <span className="font-display shrink-0 text-2xl text-white/15 sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
                    Approach
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/60">
                    {item.approach.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ul>

                  {item.reality && (
                    <div className="mt-4 rounded-xl border border-dashed border-marigold/30 bg-marigold/5 px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-marigold/70">
                        Reality check
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-marigold/90">
                        {item.reality}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 border-t border-line pt-4">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
                      Answer
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-white/85 sm:text-base">
                      {item.result}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </main>
    </>
  );
}
