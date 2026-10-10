import { leadership } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatCounter } from "@/components/stat-counter";

export function Leadership() {
  return (
    <section id="leadership" className="py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <SectionHeading kicker={leadership.role} title={leadership.headline} />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-xl text-base leading-[1.75] text-body">{leadership.summary}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {leadership.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.05 * i}>
              <div className="relative overflow-hidden rounded-3xl border border-edge bg-surface px-7 py-8 shadow-soft backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift">
                <span className="absolute inset-x-7 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-gold to-coral opacity-70" aria-hidden />
                <StatCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="font-display block text-4xl font-light text-ocean"
                />
                <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-body">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
