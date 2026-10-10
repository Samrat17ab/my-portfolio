"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

import type { PostMeta } from "@/lib/blog/posts";
import { formatDate } from "@/lib/blog/format";
import { CATEGORIES, type Category } from "@/lib/blog/taxonomy";
import { cn } from "@/lib/utils";
import { CategoryChip, categoryStyle } from "./chips";
import { RandomPostButton } from "./random-post-button";

type Filter = "all" | Category;

/** `inRow`: the date block already shows the date on wider screens, so only show it here on mobile. */
function Meta({ post, long = false, inRow = false }: { post: PostMeta; long?: boolean; inRow?: boolean }) {
  const dateClass = inRow ? "sm:hidden" : undefined;
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/45">
      <time dateTime={post.date} className={dateClass}>
        {formatDate(post.date, long ? "long" : "short")}
      </time>
      <span aria-hidden className={dateClass}>
        ·
      </span>
      <span>{post.readingMinutes} min read</span>
      {post.draft && (
        <span className="rounded-full border border-marigold/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-marigold">
          Draft
        </span>
      )}
    </span>
  );
}

function DateBlock({ iso }: { iso: string }) {
  const d = new Date(`${iso}T00:00:00Z`);
  const month = d.toLocaleDateString("en-US", { timeZone: "UTC", month: "short" });
  return (
    <span className="hidden flex-col items-start pt-1 sm:flex" aria-hidden>
      <span className="font-display text-3xl leading-none text-white/80">{String(d.getUTCDate()).padStart(2, "0")}</span>
      <span className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/40">
        {month} {d.getUTCFullYear()}
      </span>
    </span>
  );
}

export function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = React.useState<Filter>("all");

  const counts = React.useMemo(() => {
    const c = new Map<Category, number>();
    for (const p of posts) c.set(p.category, (c.get(p.category) ?? 0) + 1);
    return c;
  }, [posts]);
  const tabs: Filter[] = ["all", ...(Object.keys(CATEGORIES) as Category[]).filter((c) => counts.has(c))];

  const featured = filter === "all" ? posts[0] : undefined;
  const list = filter === "all" ? posts.slice(1) : posts.filter((p) => p.category === filter);

  const fade = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-1 flex flex-wrap gap-1" role="group" aria-label="Filter posts by category">
          {tabs.map((tab) => {
            const active = tab === filter;
            const label = tab === "all" ? "All" : CATEGORIES[tab].label;
            const count = tab === "all" ? posts.length : counts.get(tab);
            return (
              <button
                key={tab}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(tab)}
                style={tab === "all" ? undefined : categoryStyle(tab)}
                className={cn(
                  "blog-tab inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm transition-colors",
                  active ? "bg-white/10 text-white" : "text-white/55 hover:text-white",
                )}
              >
                {tab !== "all" && <span className="blog-tab__dot" aria-hidden />}
                {label}
                <span className="text-xs text-white/35">{count}</span>
              </button>
            );
          })}
        </div>
        <RandomPostButton slugs={posts.map((p) => p.slug)} className="self-start sm:self-auto" />
      </div>

      {filter !== "all" && (
        <p className="mt-6 text-sm text-white/45">{CATEGORIES[filter].blurb}.</p>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={filter} {...fade} transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}>
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="blog-featured group mt-10 block" style={categoryStyle(featured.category)}>
              <span className="blog-featured__glow" aria-hidden />
              <span className="relative block">
                <span className="flex flex-wrap items-center gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">Latest</span>
                  <CategoryChip category={featured.category} />
                </span>
                <span className="blog-serif mt-5 block text-balance text-3xl leading-[1.12] text-white sm:text-5xl">
                  {featured.title}
                </span>
                <span className="blog-serif mt-5 block max-w-2xl text-lg leading-relaxed text-white/65">{featured.excerpt}</span>
                <span className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <Meta post={featured} long />
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-glacier">
                    Read post
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </span>
              </span>
            </Link>
          )}

          {list.length > 0 ? (
            <ul className="mt-6 divide-y divide-white/10">
              {list.map((post) => (
                <li key={post.slug} style={categoryStyle(post.category)}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-row group grid gap-x-8 py-8 sm:grid-cols-[6.5rem_1fr]"
                  >
                    <DateBlock iso={post.date} />
                    <span className="block min-w-0">
                      <span className="flex flex-wrap items-center gap-3">
                        <CategoryChip category={post.category} />
                        <Meta post={post} inRow />
                      </span>
                      <span className="blog-serif mt-3 block text-balance text-2xl leading-snug text-white transition-colors group-hover:text-glacier sm:text-[1.75rem]">
                        {post.title}
                      </span>
                      <span className="blog-serif mt-2 block text-base leading-relaxed text-white/55 sm:text-[1.05rem]">
                        {post.excerpt}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm text-white/40 transition-colors group-hover:text-glacier">
                        Read
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            !featured && <p className="mt-12 text-white/50">Nothing here yet.</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
