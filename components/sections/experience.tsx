import { khaltiExperience } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ParallaxLayer } from "@/components/parallax-layer";
import { SectionHeading } from "@/components/section-heading";
import { StatCounter } from "@/components/stat-counter";

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-28 sm:py-36">
      <ParallaxLayer speed={0.3} className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full">
        <div className="mx-auto h-full max-w-5xl bg-gradient-to-b from-dawn-sky/60 via-transparent to-transparent" />
      </ParallaxLayer>

      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <SectionHeading kicker={khaltiExperience.period} title={khaltiExperience.org} />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-body">{khaltiExperience.role}</p>
        </Reveal>

        <div className="mt-14 space-y-5">
          {khaltiExperience.bullets.map((bullet, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div className="grid gap-5 rounded-3xl border border-edge bg-surface p-7 shadow-soft backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10 sm:p-9">
                <p className="text-base leading-[1.75] text-body">{bullet.text}</p>
                {bullet.stats && (
                  <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                    {bullet.stats.map((stat) => (
                      <div key={stat.label} className="sm:text-right">
                        <StatCounter
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          className="font-display text-4xl font-light text-ocean"
                        />
                        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-body">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
