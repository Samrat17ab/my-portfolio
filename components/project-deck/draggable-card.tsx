"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring } from "motion/react";

import type { Project } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DraggableCardProps {
  project: Project;
  initial: { x: number; y: number; rotate: number };
  zIndex: number;
  onActivate: () => void;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  compact: boolean;
}

export function DraggableCard({
  project,
  initial,
  zIndex,
  onActivate,
  constraintsRef,
  compact,
}: DraggableCardProps) {
  const router = useRouter();
  const pointerDown = React.useRef<{ x: number; y: number } | null>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 16);
    rotateX.set(py * -16);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    pointerDown.current = { x: event.clientX, y: event.clientY };
    onActivate();
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!pointerDown.current) return;
    const dx = event.clientX - pointerDown.current.x;
    const dy = event.clientY - pointerDown.current.y;
    pointerDown.current = null;
    if (Math.hypot(dx, dy) < 6) {
      router.push(`/work/${project.slug}`);
    }
  }

  return (
    <motion.div
      // Touch screens drag on x only, so vertical swipes over the deck still scroll the page.
      drag={compact ? "x" : true}
      dragConstraints={constraintsRef}
      dragElastic={0.35}
      dragMomentum
      dragTransition={{ bounceStiffness: 320, bounceDamping: 16 }}
      whileDrag={{ scale: 1.06 }}
      initial={false}
      style={{
        zIndex,
        x: initial.x,
        y: initial.y,
        rotate: initial.rotate,
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={cn(
        "absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 cursor-grab select-none active:cursor-grabbing sm:w-72",
        compact ? "touch-pan-y" : "touch-none",
      )}
    >
      <div className="rounded-3xl border border-edge bg-card p-7 shadow-lift">
        <Badge variant={project.accent === "sunrise" ? "sunrise" : "ocean"}>
          {project.kicker}
        </Badge>
        <h3 className="font-display mt-4 text-2xl text-heading">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-body">{project.tagline}</p>
        <span className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-ocean-deep">
          Drag, or click to open &rarr;
        </span>
      </div>
    </motion.div>
  );
}
