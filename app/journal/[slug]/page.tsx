import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Nav } from "@/components/nav";
import { MoodChip } from "@/components/journal/mood-chip";
import { RandomEntryButton } from "@/components/journal/random-entry-button";
import { ReadingProgress } from "@/components/journal/reading-progress";
import { JOURNAL_ENABLED } from "@/lib/journal/config";
import { getEntries, getEntry, getNeighbors, getRelated, type JournalEntryMeta } from "@/lib/journal/entries";
import { formatDate } from "@/lib/journal/format";
import { moodColor, moodLabel } from "@/lib/journal/moods";

interface Props {
  params: Promise<{ slug: string }>;
}

// Static export needs at least one generated page, so a placeholder stands in
// (and shows "not found") when the journal is off or has no entries yet.
const PLACEHOLDER = "_";

export function generateStaticParams() {
  const entries = JOURNAL_ENABLED ? getEntries() : [];
  return entries.length ? entries.map((e) => ({ slug: e.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = JOURNAL_ENABLED ? getEntry((await params).slug) : undefined;
  if (!entry) return { robots: { index: false } };
  return {
    title: `${entry.title} — Samrat Lamsal`,
    description: entry.excerpt,
    openGraph: { title: entry.title, description: entry.excerpt, type: "article", publishedTime: entry.date },
  };
}

function NeighborLink({ entry, direction }: { entry: JournalEntryMeta; direction: "newer" | "older" }) {
  return (
    <Link
      href={`/journal/${entry.slug}`}
      className="group flex flex-1 flex-col gap-3 rounded-2xl border border-white/10 p-6 transition-colors hover:border-white/25"
      style={{ "--mood": moodColor(entry.mood) } as CSSProperties}
    >
      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
        {direction === "newer" ? (
          <>
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden /> Newer
          </>
        ) : (
          <>
            Older <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
          </>
        )}
      </span>
      <span className="journal-serif text-balance text-xl leading-snug text-white transition-colors group-hover:text-glacier">
        {entry.title}
      </span>
      <MoodChip mood={entry.mood} />
    </Link>
  );
}

export default async function JournalEntryPage({ params }: Props) {
  if (!JOURNAL_ENABLED) notFound();
  const entry = getEntry((await params).slug);
  if (!entry) notFound();

  const { newer, older } = getNeighbors(entry.slug);
  const related = getRelated(entry);
  const allSlugs = getEntries().map((e) => e.slug);

  return (
    <>
      <Nav />
      <ReadingProgress targetId="journal-entry" />
      <main className="px-6 pb-32 pt-36 sm:pt-44">
        <article id="journal-entry" className="mx-auto max-w-[42rem]">
          <Link
            href="/journal"
            className="inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-glacier"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Journal
          </Link>

          <header className="mt-8 border-b border-white/10 pb-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/45">
              <MoodChip mood={entry.mood} />
              <time dateTime={entry.date}>{formatDate(entry.date)}</time>
              <span aria-hidden>·</span>
              <span>{entry.readingMinutes} min read</span>
              {entry.draft && (
                <span className="rounded-full border border-marigold/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-marigold">
                  Draft
                </span>
              )}
            </div>
            <h1 className="journal-serif mt-6 text-balance text-4xl leading-[1.1] text-white sm:text-6xl">
              {entry.title}
            </h1>
            {entry.tags.length > 0 && (
              <p className="mt-6 flex flex-wrap gap-2">
                {entry.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/55">
                    {t}
                  </span>
                ))}
              </p>
            )}
          </header>

          <div className="journal-prose mt-10" dangerouslySetInnerHTML={{ __html: entry.html }} />

          <footer className="mt-16 text-center">
            <p className="journal-serif text-2xl italic text-white/70">— Samrat</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/35">
              Written {formatDate(entry.date)}, feeling {moodLabel(entry.mood).toLowerCase()}
            </p>
          </footer>
        </article>

        <div className="mx-auto mt-20 max-w-3xl">
          {(newer || older) && (
            <nav className="flex flex-col gap-4 sm:flex-row" aria-label="More entries">
              {newer && <NeighborLink entry={newer} direction="newer" />}
              {older && <NeighborLink entry={older} direction="older" />}
            </nav>
          )}

          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="journal-related">
              <h2 id="journal-related" className="text-xs uppercase tracking-[0.25em] text-white/40">
                More in a similar mood
              </h2>
              <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/journal/${r.slug}`}
                      className="group flex items-center justify-between gap-6 py-5"
                    >
                      <span>
                        <MoodChip mood={r.mood} />
                        <span className="journal-serif mt-2 block text-xl text-white transition-colors group-hover:text-glacier">
                          {r.title}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/journal"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-white/80 transition-colors hover:border-glacier/50 hover:text-glacier"
            >
              All entries
            </Link>
            <RandomEntryButton slugs={allSlugs} current={entry.slug} />
          </div>
        </div>
      </main>
    </>
  );
}
