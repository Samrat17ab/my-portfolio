"use client";

import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";

import { cn } from "@/lib/utils";

/** Opens a random entry, never the one you're already on. */
export function RandomEntryButton({
  slugs,
  current,
  className,
}: {
  slugs: string[];
  current?: string;
  className?: string;
}) {
  const router = useRouter();
  const pool = slugs.filter((s) => s !== current);
  if (pool.length === 0) return null;

  return (
    <button
      type="button"
      onClick={() => router.push(`/journal/${pool[Math.floor(Math.random() * pool.length)]}`)}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border border-marigold/40 px-5 text-sm font-medium text-marigold transition-colors hover:bg-marigold/10",
        className,
      )}
    >
      <Shuffle className="h-4 w-4" aria-hidden />
      Read something at random
    </button>
  );
}
