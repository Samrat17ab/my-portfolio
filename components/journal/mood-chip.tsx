import type { CSSProperties } from "react";

import { moodColor, moodLabel } from "@/lib/journal/moods";
import { cn } from "@/lib/utils";

export function MoodChip({ mood, className }: { mood: string; className?: string }) {
  return (
    <span className={cn("journal-mood", className)} style={{ "--mood": moodColor(mood) } as CSSProperties}>
      {moodLabel(mood)}
    </span>
  );
}
