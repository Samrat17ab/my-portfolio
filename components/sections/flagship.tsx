import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ParallaxLayer } from "@/components/parallax-layer";
import { Magnetic } from "@/components/magnetic";
import { Badge } from "@/components/ui/badge";

const mymoodly = projects.find((p) => p.slug === "mymoodly")!;

export function Flagship() {
  return (
    <section className="relative overflow-hidden border-y border-line py-28 sm:py-36">
      <ParallaxLayer speed={0.4} className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-marigold/10 blur-[120px]" >
        <div />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.25} className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-glacier/10 blur-[110px]">
        <div />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal>
          <Badge variant="marigold">{mymoodly.kicker}</Badge>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] tracking-wide text-white sm:text-7xl">
            My<span className="text-marigold">Moodly</span>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-xl text-lg text-white/70">{mymoodly.tagline}</p>
        </Reveal>

        <div className="mt-10 space-y-4">
          {mymoodly.summary.map((line, i) => (
            <Reveal key={i} delay={0.18 + i * 0.06}>
              <p className="max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">{line}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.32} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={mymoodly.links[0].href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-marigold px-6 py-3 text-sm font-medium text-base transition-transform hover:scale-[1.02]"
            >
              {mymoodly.links[0].label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
          <Magnetic>
            <Link
              href={`/work/${mymoodly.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-glacier/50 hover:text-glacier"
            >
              Read the case study
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
