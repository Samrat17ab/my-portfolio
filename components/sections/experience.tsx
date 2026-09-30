import { khaltiExperience } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ParallaxLayer } from "@/components/parallax-layer";
import { SectionHeading } from "@/components/section-heading";
import { StatCounter } from "@/components/stat-counter";

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-28 sm:py-36">
      <ParallaxLayer speed={0.3} className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full">
        <div className="mx-auto h-full max-w-5xl bg-gradient-to-b from-glacier/5 via-transparent to-transparent" />
      </ParallaxLayer>

      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <SectionHeading kicker={khaltiExperience.period} title={khaltiExperience.org} />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/40">
            {khaltiExperience.role}
          </p>
        </Reveal>

        <div className="mt-14 space-y-10">
          {khaltiExperience.bullets.map((bullet, i) => (
            <Reveal key={i} delay={0.05 * i} className="grid gap-4 border-t border-line pt-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10">
              <p className="text-base leading-relaxed text-white/70">{bullet.text}</p>
              {bullet.stats && (
                <div className="flex shrink-0 flex-col gap-1 sm:items-end">
                  {bullet.stats.map((stat) => (
                    <div key={stat.label} className="sm:text-right">
                      <StatCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        className="font-display text-3xl text-glacier sm:text-4xl"
                      />
                      <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
