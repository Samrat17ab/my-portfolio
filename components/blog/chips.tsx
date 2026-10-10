import type { CSSProperties } from "react";

import { CATEGORIES, moodColor, type Category } from "@/lib/blog/taxonomy";
import { cn } from "@/lib/utils";

export function CategoryChip({ category, className }: { category: Category; className?: string }) {
  const { label, color } = CATEGORIES[category];
  return (
    <span className={cn("blog-chip blog-chip--category", className)} style={{ "--chip": color } as CSSProperties}>
      {label}
    </span>
  );
}

export function MoodChip({ mood, className }: { mood: string; className?: string }) {
  return (
    <span className={cn("blog-chip blog-chip--mood", className)} style={{ "--chip": moodColor(mood) } as CSSProperties}>
      Feeling {mood.trim().toLowerCase()}
    </span>
  );
}

export function categoryStyle(category: Category): CSSProperties {
  return { "--accent": CATEGORIES[category].color } as CSSProperties;
}
