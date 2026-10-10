import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CategoryChip } from "@/components/blog/chips";
import { BLOG_ENABLED } from "@/lib/blog/config";
import { blogSerif } from "@/lib/blog/font";
import { formatDate } from "@/lib/blog/format";
import { getPosts } from "@/lib/blog/posts";

/** The three latest posts. Renders nothing while the blog is off or empty. */
export function BlogTeaser() {
  if (!BLOG_ENABLED) return null;
  const latest = getPosts().slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section id="blog" className={`${blogSerif.variable} py-28 sm:py-36`}>
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionHeading kicker="Writing" title="From the blog" />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-xl text-sm text-white/55">
            Products, findings, wins, and the occasional honest feeling.
          </p>
        </Reveal>

        <ul className="mt-10 divide-y divide-line border-y border-line">
          {latest.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={0.05 * i}>
                <Link href={`/blog/${post.slug}`} className="group flex items-center justify-between gap-6 py-6">
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                      <CategoryChip category={post.category} />
                      <time dateTime={post.date}>{formatDate(post.date, "short")}</time>
                    </span>
                    <span
                      className="mt-2 block text-balance text-xl leading-snug text-white transition-colors group-hover:text-glacier sm:text-2xl"
                      style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                    >
                      {post.title}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.15} className="mt-6">
          <Link
            href="/blog"
            className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-glacier"
          >
            Read the blog &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
