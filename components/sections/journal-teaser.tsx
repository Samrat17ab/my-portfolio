import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { MoodChip } from "@/components/journal/mood-chip";
import { JOURNAL_ENABLED } from "@/lib/journal/config";
import { getEntries } from "@/lib/journal/entries";
import { journalSerif } from "@/lib/journal/font";
import { formatDate } from "@/lib/journal/format";
import { moodColor } from "@/lib/journal/moods";

/** A glimpse of the latest journal entries. Renders nothing while the journal is off or empty. */
export function JournalTeaser() {
  if (!JOURNAL_ENABLED) return null;
  const latest = getEntries().slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section id="journal" className={`${journalSerif.variable} py-28 sm:py-36`}>
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionHeading kicker="Off the clock" title="From the journal" />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-xl text-sm text-white/55">Less polished than everything above. Things I feel, written down.</p>
        </Reveal>

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {latest.map((entry, i) => (
            <li key={entry.slug} style={{ "--mood": moodColor(entry.mood) } as CSSProperties}>
              <Reveal delay={0.05 * i}>
                <Link href={`/journal/${entry.slug}`} className="group flex items-center justify-between gap-6 py-6">
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                      <MoodChip mood={entry.mood} />
                      <time dateTime={entry.date}>{formatDate(entry.date, "short")}</time>
                    </span>
                    <span
                      className="mt-2 block text-balance text-xl leading-snug text-white transition-colors group-hover:text-glacier sm:text-2xl"
                      style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                    >
                      {entry.title}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.15} className="mt-6">
          <Link
            href="/journal"
            className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-glacier"
          >
            Read the journal &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
