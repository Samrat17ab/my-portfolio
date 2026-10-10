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
      className="group flex flex-1 flex-col gap-3 rounded-2xl border border-edge p-6 transition-colors hover:border-coral/60 hover:shadow-lift"
    >
      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-body">
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
      <span className="blog-serif text-balance text-xl leading-snug text-heading transition-colors group-hover:text-ocean-deep">
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
            className="inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.2em] text-body transition-colors hover:text-ocean-deep"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Blog
          </Link>

          <header className="mt-8 border-b border-edge pb-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-body">
              <CategoryChip category={post.category} />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
              {post.draft && (
                <span className="rounded-full border border-coral/70 bg-coral/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-heading">
                  Draft
                </span>
              )}
            </div>
            <h1 className="blog-serif mt-6 text-balance text-4xl leading-[1.1] text-heading sm:text-6xl">{post.title}</h1>
            {(post.mood || post.tags.length > 0) && (
              <p className="mt-6 flex flex-wrap items-center gap-2">
                {post.mood && <MoodChip mood={post.mood} className="mr-2" />}
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full bg-shallow/50 px-3 py-1 text-xs text-body">
                    {t}
                  </span>
                ))}
              </p>
            )}
          </header>

          <div className="blog-prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

          <footer className="mt-16 flex items-center gap-5 rounded-2xl border border-edge bg-surface shadow-soft backdrop-blur-md p-6">
            <span
              className="font-display flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-shallow/70 text-lg text-ocean-deep"
              aria-hidden
            >
              SL
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-heading">Written by Samrat Lamsal</span>
              <span className="mt-1 block text-sm leading-relaxed text-body">
                Product manager, building{" "}
                <a href="https://mymoodly.space" target="_blank" rel="noreferrer" className="text-heading underline decoration-ocean/30 underline-offset-4 hover:decoration-coral">
                  MyMoodly
                </a>
                .{" "}
                <Link href="/" className="text-heading underline decoration-ocean/30 underline-offset-4 hover:decoration-coral">
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
              <h2 id="blog-related" className="text-xs uppercase tracking-[0.25em] text-body">
                More in {category.label}
              </h2>
              <ul className="mt-5 divide-y divide-edge border-y border-edge">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="group flex items-center justify-between gap-6 py-5">
                      <span>
                        <CategoryChip category={r.category} />
                        <span className="blog-serif mt-2 block text-xl text-heading transition-colors group-hover:text-ocean-deep">
                          {r.title}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-body transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-edge px-5 text-sm text-heading transition-colors hover:border-coral hover:text-ocean-deep"
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
