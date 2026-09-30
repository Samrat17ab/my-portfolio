"use client";

import * as React from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";

import { mulberry32 } from "@/lib/motion-math";
import { projects } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { DraggableCard } from "./draggable-card";

function useScatterLayout(count: number) {
  return React.useMemo(() => {
    const rng = mulberry32(5150);
    return Array.from({ length: count }, () => ({
      x: (rng() - 0.5) * 420,
      y: (rng() - 0.5) * 140,
      rotate: (rng() - 0.5) * 22,
    }));
  }, [count]);
}

export function ProjectDeck() {
  const prefersReducedMotion = useReducedMotion();
  const layout = useScatterLayout(projects.length);
  const [order, setOrder] = React.useState<number[]>(() => projects.map((_, i) => i));

  function bringToFront(index: number) {
    setOrder((prev) => [...prev.filter((i) => i !== index), index]);
  }

  if (prefersReducedMotion) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="rounded-2xl border border-white/10 bg-base-raised/90 p-6 transition-colors hover:border-glacier/40"
          >
            <Badge variant={project.accent === "marigold" ? "marigold" : "glacier"}>
              {project.kicker}
            </Badge>
            <h3 className="font-display mt-4 text-2xl uppercase tracking-wide text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-white/60">{project.tagline}</p>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative mx-auto h-[440px] w-full max-w-3xl select-none sm:h-[480px]"
      style={{ perspective: 1200 }}
    >
      {projects.map((project, i) => (
        <DraggableCard
          key={project.slug}
          project={project}
          initial={layout[i]}
          zIndex={order.indexOf(i) + 1}
          onActivate={() => bringToFront(i)}
        />
      ))}
    </div>
  );
}
