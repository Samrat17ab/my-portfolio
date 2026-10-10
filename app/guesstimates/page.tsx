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
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-body transition-colors hover:text-ocean-deep"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="font-display mt-6 text-4xl font-light leading-[1.1] text-heading sm:text-6xl">
            Guesstimates
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-body">
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
                    <Badge variant="ocean">{item.tag}</Badge>
                    <h2 className="font-display mt-3 text-xl leading-snug text-heading sm:text-2xl">
                      {item.question}
                    </h2>
                  </div>
                  <span className="font-display shrink-0 text-3xl font-light italic text-tide sm:text-4xl" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-body">
                    Approach
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-body">
                    {item.approach.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ul>

                  {item.reality && (
                    <div className="mt-5 rounded-2xl border-l-2 border-coral bg-gold/15 px-5 py-4">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-heading">
                        Reality check
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-heading">
                        {item.reality}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 border-t border-edge pt-4">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-body">
                      Answer
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-heading sm:text-base">
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
