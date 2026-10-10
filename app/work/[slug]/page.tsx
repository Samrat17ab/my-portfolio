import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { projects } from "@/lib/content";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Magnetic } from "@/components/magnetic";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Samrat Lamsal`,
    description: project.tagline,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const badgeVariant = project.accent === "sunrise" ? "sunrise" : "ocean";

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pb-32 pt-40">
        <Reveal>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-body transition-colors hover:text-ocean-deep"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to work
          </Link>
        </Reveal>

        <Reveal delay={0.06} className="mt-8">
          <Badge variant={badgeVariant}>{project.kicker}</Badge>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display mt-6 text-5xl font-light leading-[1.05] text-heading sm:text-6xl">
            {project.title}
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 max-w-xl text-lg text-body">{project.tagline}</p>
        </Reveal>

        {project.status === "in-progress" ? (
          <Reveal
            delay={0.2}
            className="mt-14 rounded-2xl border border-dashed border-edge bg-surface backdrop-blur-md p-8"
          >
            <p className="text-sm text-body">
              The full write-up for this case study is still in progress. In the meantime, the
              original deck and an interactive companion site are both live:
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {project.links.map((link) => (
                <Magnetic key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-edge px-5 py-2.5 text-sm text-heading transition-colors hover:border-coral hover:text-ocean-deep"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 space-y-6">
            {project.summary.map((line, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-base leading-relaxed text-body">{line}</p>
              </Reveal>
            ))}
            {project.links.length > 0 && (
              <Reveal delay={0.2} className="flex flex-wrap gap-4 pt-4">
                {project.links.map((link, linkIndex) => (
                  <Magnetic key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={
                        linkIndex === 0
                          ? "inline-flex items-center gap-2 rounded-full bg-ocean-deep px-5 py-2.5 text-sm font-medium text-page shadow-soft transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-coral hover:text-heading"
                          : "inline-flex items-center gap-2 rounded-full border border-edge px-5 py-2.5 text-sm text-heading transition-colors hover:border-coral hover:text-ocean-deep"
                      }
                    >
                      {link.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Magnetic>
                ))}
              </Reveal>
            )}
          </div>
        )}
      </main>
    </>
  );
}
