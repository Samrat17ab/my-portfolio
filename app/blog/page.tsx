import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { BlogIndex } from "@/components/blog/blog-index";
import { Ridge } from "@/components/blog/ridge";
import { BLOG_ENABLED } from "@/lib/blog/config";
import { getPosts } from "@/lib/blog/posts";

export const metadata: Metadata = BLOG_ENABLED
  ? {
      title: "Blog — Samrat Lamsal",
      description:
        "Notes on building products, things I've found out along the way, wins worth sharing, and sometimes how it feels.",
    }
  : { robots: { index: false } };

export default function BlogPage() {
  if (!BLOG_ENABLED) notFound();
  const posts = getPosts();

  return (
    <>
      <Nav />
      <main className="pb-32">
        <header className="relative overflow-hidden pb-36 pt-40 sm:pb-44 sm:pt-48">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-glacier/[0.06] blur-[120px]"
            aria-hidden
          />
          <Ridge />
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-glacier">Blog</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="font-display mt-5 text-balance text-5xl uppercase leading-[0.95] tracking-wide text-white sm:text-7xl">
                Building, learning, and the in-between
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="blog-serif mt-6 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl">
                Notes on the products I&apos;m building, things I&apos;ve figured out along the way, wins worth sharing,
                and sometimes just how it feels.
              </p>
            </Reveal>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6">
          {posts.length > 0 ? (
            <BlogIndex posts={posts} />
          ) : (
            <p className="blog-serif text-xl text-white/55">The first post is on its way.</p>
          )}
        </div>
      </main>
    </>
  );
}
