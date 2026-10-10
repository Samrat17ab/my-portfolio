import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ParallaxLayer } from "@/components/parallax-layer";
import { Magnetic } from "@/components/magnetic";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

const mymoodly = projects.find((p) => p.slug === "mymoodly")!;

export function Flagship() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      <ParallaxLayer
        speed={0.4}
        className="pointer-events-none absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-gold/30 blur-[120px]"
      >
        <div />
      </ParallaxLayer>
      <ParallaxLayer
        speed={-0.25}
        className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-shallow/60 blur-[110px]"
      >
        <div />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-4xl rounded-[2rem] border border-edge bg-surface px-6 py-14 shadow-soft backdrop-blur-md sm:px-14 sm:py-20">
        <Reveal>
          <Badge variant="sunrise">{mymoodly.kicker}</Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-6 text-5xl font-light leading-[1.02] text-heading sm:text-7xl">
            My<span className="italic text-ocean">Moodly</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="font-display mt-6 max-w-xl text-xl leading-relaxed text-heading">{mymoodly.tagline}</p>
        </Reveal>

        <div className="mt-8 max-w-2xl space-y-4">
          {mymoodly.summary.map((line, i) => (
            <Reveal key={i} delay={0.18 + i * 0.06}>
              <p className="text-base leading-[1.75] text-body">{line}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.32} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a href={mymoodly.links[0].href} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "primary" })}>
              {mymoodly.links[0].label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
          <Magnetic>
            <Link href={`/work/${mymoodly.slug}`} className={buttonVariants({ variant: "secondary" })}>
              Read the case study
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
