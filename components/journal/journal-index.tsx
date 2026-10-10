"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

import type { JournalEntryMeta } from "@/lib/journal/entries";
import { formatDate, monthLabel } from "@/lib/journal/format";
import { moodColor, moodLabel } from "@/lib/journal/moods";
import { cn } from "@/lib/utils";
import { MoodChip } from "./mood-chip";
import { RandomEntryButton } from "./random-entry-button";

const ALL = "all";

function EntryMeta({ entry, short = true }: { entry: JournalEntryMeta; short?: boolean }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/45">
      <time dateTime={entry.date}>{formatDate(entry.date, short ? "short" : "long")}</time>
      <span aria-hidden>·</span>
      <span>{entry.readingMinutes} min read</span>
      {entry.draft && (
        <span className="rounded-full border border-marigold/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-marigold">
          Draft
        </span>
      )}
    </p>
  );
}

export function JournalIndex({ entries }: { entries: JournalEntryMeta[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [mood, setMood] = React.useState<string>(ALL);

  const moods = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of entries) counts.set(e.mood.toLowerCase(), (counts.get(e.mood.toLowerCase()) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([m]) => m);
  }, [entries]);

  const showFeatured = mood === ALL && entries.length > 0;
  const featured = showFeatured ? entries[0] : undefined;
  const list = mood === ALL ? entries.slice(1) : entries.filter((e) => e.mood.toLowerCase() === mood);

  const groups = React.useMemo(() => {
    const out: { label: string; items: JournalEntryMeta[] }[] = [];
    for (const e of list) {
      const label = monthLabel(e.date);
      const last = out[out.length - 1];
      if (last?.label === label) last.items.push(e);
      else out.push({ label, items: [e] });
    }
    return out;
  }, [list]);

  const fade = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by mood">
          {[ALL, ...moods].map((m) => {
            const active = m === mood;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                aria-pressed={active}
                style={{ "--mood": m === ALL ? "#ffffff" : moodColor(m) } as React.CSSProperties}
                className={cn(
                  "journal-filter inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
                  active ? "border-white/40 bg-white/10 text-white" : "border-white/10 text-white/60 hover:text-white",
                )}
              >
                {m !== ALL && <span className="journal-filter__dot" aria-hidden />}
                {m === ALL ? "Everything" : moodLabel(m)}
              </button>
            );
          })}
        </div>
        <RandomEntryButton slugs={entries.map((e) => e.slug)} className="self-start sm:self-auto" />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={mood} {...fade} transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}>
          {featured && (
            <Link
              href={`/journal/${featured.slug}`}
              className="journal-featured group mt-12 block"
              style={{ "--mood": moodColor(featured.mood) } as React.CSSProperties}
            >
              <span className="journal-featured__glow" aria-hidden />
              <span className="relative block">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-glacier">Latest entry</span>
                <span className="mt-5 flex items-center gap-3">
                  <MoodChip mood={featured.mood} />
                </span>
                <span className="journal-serif mt-4 block text-balance text-3xl leading-[1.15] text-white sm:text-5xl">
                  {featured.title}
                </span>
                <span className="journal-serif mt-5 block max-w-2xl text-lg leading-relaxed text-white/65">
                  {featured.excerpt}
                </span>
                <span className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <EntryMeta entry={featured} short={false} />
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-glacier">
                    Read the entry
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </span>
              </span>
            </Link>
          )}

          {groups.length > 0 ? (
            <div className="mt-16 space-y-14">
              {groups.map((group) => (
                <section key={group.label} aria-label={group.label}>
                  <h2 className="font-display text-sm uppercase tracking-[0.25em] text-white/40">{group.label}</h2>
                  <ol className="journal-trail mt-6">
                    {group.items.map((entry) => (
                      <li
                        key={entry.slug}
                        className="journal-trail__item"
                        style={{ "--mood": moodColor(entry.mood) } as React.CSSProperties}
                      >
                        <span className="journal-trail__dot" aria-hidden />
                        <Link href={`/journal/${entry.slug}`} className="group block rounded-2xl px-5 py-5 transition-colors hover:bg-white/[0.03] sm:px-6">
                          <span className="flex flex-wrap items-center gap-3">
                            <MoodChip mood={entry.mood} />
                            <EntryMeta entry={entry} />
                          </span>
                          <span className="journal-serif mt-3 block text-balance text-2xl leading-snug text-white transition-colors group-hover:text-glacier sm:text-[1.7rem]">
                            {entry.title}
                          </span>
                          <span className="journal-serif mt-2 block text-base leading-relaxed text-white/55 sm:text-[1.05rem]">
                            {entry.excerpt}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          ) : (
            !featured && <p className="mt-16 text-white/50">Nothing in this mood yet.</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
