import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { WaveDivider } from "@/components/wave-divider";
import { CategoryChip } from "@/components/blog/chips";
import { BLOG_ENABLED } from "@/lib/blog/config";
import { formatDate } from "@/lib/blog/format";
import { getPosts } from "@/lib/blog/posts";

/** The three latest posts. Renders nothing while the blog is off or empty. */
export function BlogTeaser() {
  if (!BLOG_ENABLED) return null;
  const latest = getPosts().slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <>
    <WaveDivider />
    <section id="blog" className="py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionHeading kicker="Writing" title="From the blog" />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-xl text-base leading-[1.75] text-body">
            Products, findings, wins, and the occasional honest feeling.
          </p>
        </Reveal>

        <ul className="mt-10 space-y-4">
          {latest.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={0.05 * i}>
                <Link href={`/blog/${post.slug}`} className="group flex items-center justify-between gap-6 rounded-3xl border border-edge bg-surface px-6 py-6 shadow-soft backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift sm:px-8">
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-3 text-xs text-body">
                      <CategoryChip category={post.category} />
                      <time dateTime={post.date}>{formatDate(post.date, "short")}</time>
                    </span>
                    <span
                      className="font-display mt-2 block text-balance text-xl leading-snug text-heading transition-colors duration-300 group-hover:text-ocean-deep sm:text-2xl"
                    >
                      {post.title}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ocean transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.15} className="mt-8">
          <Link
            href="/blog"
            className="text-xs font-medium uppercase tracking-[0.2em] text-ocean-deep underline decoration-transparent decoration-2 underline-offset-8 transition-colors duration-300 hover:decoration-coral"
          >
            Read the blog &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
    </>
  );
}
