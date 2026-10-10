import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { JournalIndex } from "@/components/journal/journal-index";
import { Ridge } from "@/components/journal/ridge";
import { JOURNAL_ENABLED } from "@/lib/journal/config";
import { getEntries } from "@/lib/journal/entries";
import { monthLabel } from "@/lib/journal/format";

export const metadata: Metadata = JOURNAL_ENABLED
  ? {
      title: "Journal — Samrat Lamsal",
      description: "Unpolished notes on what I'm feeling and thinking about: work, people, and everything in between.",
    }
  : { robots: { index: false } };

export default function JournalPage() {
  if (!JOURNAL_ENABLED) notFound();
  const entries = getEntries();
  const oldest = entries[entries.length - 1];

  return (
    <>
      <Nav />
      <main className="pb-32">
        <header className="relative overflow-hidden pb-36 pt-40 sm:pb-48 sm:pt-48">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-marigold/[0.07] blur-[120px]"
            aria-hidden
          />
          <Ridge />
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-glacier">Journal</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="journal-serif mt-5 text-balance text-5xl italic leading-[1.05] text-white sm:text-7xl">
                Things I feel, written down.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="journal-serif mt-6 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl">
                Unpolished notes on what&apos;s on my mind: work, people, and everything in between. Wander around.
              </p>
            </Reveal>
            {entries.length > 0 && (
              <Reveal delay={0.18}>
                <p className="mt-8 text-xs uppercase tracking-[0.2em] text-white/35">
                  {entries.length} {entries.length === 1 ? "entry" : "entries"}
                  {oldest && <> &middot; since {monthLabel(oldest.date)}</>}
                </p>
              </Reveal>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6">
          {entries.length > 0 ? (
            <JournalIndex entries={entries} />
          ) : (
            <p className="journal-serif text-xl text-white/55">The first entry is on its way.</p>
          )}
        </div>
      </main>
    </>
  );
}
