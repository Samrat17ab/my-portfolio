import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Nav } from "@/components/nav";
import { CategoryChip, MoodChip, categoryStyle } from "@/components/blog/chips";
import { RandomPostButton } from "@/components/blog/random-post-button";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { BLOG_ENABLED } from "@/lib/blog/config";
import { formatDate } from "@/lib/blog/format";
import { getNeighbors, getPost, getPosts, getRelated, type PostMeta } from "@/lib/blog/posts";
import { CATEGORIES } from "@/lib/blog/taxonomy";

interface Props {
  params: Promise<{ slug: string }>;
}

// Static export needs at least one generated page, so a placeholder stands in
// (and shows "not found") when the blog is off or has no posts yet.
const PLACEHOLDER = "_";

export function generateStaticParams() {
  const posts = BLOG_ENABLED ? getPosts() : [];
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_ENABLED ? getPost((await params).slug) : undefined;
  if (!post) return { robots: { index: false } };
  return {
    title: `${post.title} — Samrat Lamsal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      section: CATEGORIES[post.category].label,
    },
  };
}

function NeighborLink({ post, direction }: { post: PostMeta; direction: "newer" | "older" }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-1 flex-col gap-3 rounded-2xl border border-white/10 p-6 transition-colors hover:border-white/25"
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
      <span className="blog-serif text-balance text-xl leading-snug text-white transition-colors group-hover:text-glacier">
        {post.title}
      </span>
      <CategoryChip category={post.category} className="self-start" />
    </Link>
  );
}

export default async function BlogPostPage({ params }: Props) {
  if (!BLOG_ENABLED) notFound();
  const post = getPost((await params).slug);
  if (!post) notFound();

  const { newer, older } = getNeighbors(post.slug);
  const related = getRelated(post);
  const allSlugs = getPosts().map((p) => p.slug);
  const category = CATEGORIES[post.category];

  return (
    <>
      <Nav />
      <ReadingProgress targetId="blog-post" />
      <main className="px-6 pb-32 pt-36 sm:pt-44" style={categoryStyle(post.category)}>
        <article id="blog-post" className="mx-auto max-w-[42rem]">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-glacier"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Blog
          </Link>

          <header className="mt-8 border-b border-white/10 pb-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-white/45">
              <CategoryChip category={post.category} />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
              {post.draft && (
                <span className="rounded-full border border-marigold/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-marigold">
                  Draft
                </span>
              )}
            </div>
            <h1 className="blog-serif mt-6 text-balance text-4xl leading-[1.1] text-white sm:text-6xl">{post.title}</h1>
            {(post.mood || post.tags.length > 0) && (
              <p className="mt-6 flex flex-wrap items-center gap-2">
                {post.mood && <MoodChip mood={post.mood} className="mr-2" />}
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/55">
                    {t}
                  </span>
                ))}
              </p>
            )}
          </header>

          <div className="blog-prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

          <footer className="mt-16 flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <span
              className="font-display flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-glacier/15 text-lg text-glacier"
              aria-hidden
            >
              SL
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-white">Written by Samrat Lamsal</span>
              <span className="mt-1 block text-sm leading-relaxed text-white/55">
                Product manager, building{" "}
                <a href="https://mymoodly.space" target="_blank" rel="noreferrer" className="text-white/80 underline decoration-white/25 underline-offset-4 hover:decoration-glacier">
                  MyMoodly
                </a>
                .{" "}
                <Link href="/" className="text-white/80 underline decoration-white/25 underline-offset-4 hover:decoration-glacier">
                  More about me
                </Link>
              </span>
            </span>
          </footer>
        </article>

        <div className="mx-auto mt-20 max-w-3xl">
          {(newer || older) && (
            <nav className="flex flex-col gap-4 sm:flex-row" aria-label="More posts">
              {newer && <NeighborLink post={newer} direction="newer" />}
              {older && <NeighborLink post={older} direction="older" />}
            </nav>
          )}

          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="blog-related">
              <h2 id="blog-related" className="text-xs uppercase tracking-[0.25em] text-white/40">
                More in {category.label}
              </h2>
              <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="group flex items-center justify-between gap-6 py-5">
                      <span>
                        <CategoryChip category={r.category} />
                        <span className="blog-serif mt-2 block text-xl text-white transition-colors group-hover:text-glacier">
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
              href="/blog"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-white/80 transition-colors hover:border-glacier/50 hover:text-glacier"
            >
              All posts
            </Link>
            <RandomPostButton slugs={allSlugs} current={post.slug} />
          </div>
        </div>
      </main>
    </>
  );
}
