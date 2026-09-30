import { leadership } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatCounter } from "@/components/stat-counter";

export function Leadership() {
  return (
    <section id="leadership" className="border-y border-line py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <SectionHeading kicker={leadership.role} title={leadership.headline} />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-xl text-base text-white/65">{leadership.summary}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {leadership.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.05 * i}>
              <StatCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="font-display block text-3xl text-marigold sm:text-4xl"
              />
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/40">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
