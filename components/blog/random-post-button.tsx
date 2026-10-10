"use client";

import { useRouter } from "next/navigation";
import { Shuffle } from "lucide-react";

import { cn } from "@/lib/utils";

/** Opens a random post, never the one you're already on. */
export function RandomPostButton({
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
      onClick={() => router.push(`/blog/${pool[Math.floor(Math.random() * pool.length)]}`)}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border border-coral/60 bg-surface px-5 text-sm font-medium text-heading shadow-soft transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-coral/25",
        className,
      )}
    >
      <Shuffle className="h-4 w-4" aria-hidden />
      Surprise me
    </button>
  );
}
