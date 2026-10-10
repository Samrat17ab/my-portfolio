"use client";

import * as React from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";

import { mulberry32 } from "@/lib/motion-math";
import { projects } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { DraggableCard } from "./draggable-card";

// Keep in sync with the card widths (w-56 / sm:w-72) and the boundary box below.
const COMPACT_BREAKPOINT = 640;
const CARD_WIDTH = { compact: 224, wide: 288 };
const BOUNDARY_MAX_WIDTH = 1152;
const BOUNDARY_GUTTER = 64;
const MAX_SCATTER_X = 210;
const MAX_SCATTER_Y = 70;

function subscribeResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function useViewportWidth() {
  return React.useSyncExternalStore(
    subscribeResize,
    () => window.innerWidth,
    () => 1280,
  );
}

function useScatterLayout(count: number, viewportWidth: number) {
  // Seeded so the arrangement is identical on every visit; only the spread
  // scales with the viewport so no card starts outside the drag boundary.
  const seeds = React.useMemo(() => {
    const rng = mulberry32(5150);
    return Array.from({ length: count }, () => ({
      x: rng() - 0.5,
      y: rng() - 0.5,
      rotate: rng() - 0.5,
    }));
  }, [count]);

  const compact = viewportWidth < COMPACT_BREAKPOINT;
  const cardWidth = compact ? CARD_WIDTH.compact : CARD_WIDTH.wide;
  const boundaryWidth = Math.min(viewportWidth, BOUNDARY_MAX_WIDTH) - BOUNDARY_GUTTER;
  const spreadX = Math.max(0, Math.min(MAX_SCATTER_X, (boundaryWidth - cardWidth) / 2 - 8));

  return {
    compact,
    layout: seeds.map((s) => ({
      x: s.x * 2 * spreadX,
      y: s.y * 2 * MAX_SCATTER_Y,
      rotate: s.rotate * (compact ? 14 : 22),
    })),
  };
}

export function ProjectDeck() {
  const prefersReducedMotion = useReducedMotion();
  const viewportWidth = useViewportWidth();
  const { compact, layout } = useScatterLayout(projects.length, viewportWidth);
  const boundaryRef = React.useRef<HTMLDivElement>(null);
  const [order, setOrder] = React.useState<number[]>(() => projects.map((_, i) => i));

  function bringToFront(index: number) {
    setOrder((prev) => [...prev.filter((i) => i !== index), index]);
  }

  if (prefersReducedMotion) {
    return (
      <div className="grid gap-4 px-6 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="rounded-3xl border border-edge bg-card p-7 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:border-coral/60 hover:shadow-lift"
          >
            <Badge variant={project.accent === "sunrise" ? "sunrise" : "ocean"}>
              {project.kicker}
            </Badge>
            <h3 className="font-display mt-4 text-2xl text-heading">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{project.tagline}</p>
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
      <div
        ref={boundaryRef}
        aria-hidden
        className="pointer-events-none absolute -inset-y-6 left-1/2 w-[min(calc(100vw-4rem),72rem)] -translate-x-1/2"
      />
      {projects.map((project, i) => (
        <DraggableCard
          key={project.slug}
          project={project}
          initial={layout[i]}
          zIndex={order.indexOf(i) + 1}
          onActivate={() => bringToFront(i)}
          constraintsRef={boundaryRef}
          compact={compact}
        />
      ))}
    </div>
  );
}
