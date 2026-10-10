import { cn } from "@/lib/utils";

// Four wave periods across a 200%-wide strip: sliding it by half (two periods)
// lines up exactly, so the drift loops without a seam.
const WAVE = "M0 24 Q 180 6 360 24 T 720 24 T 1080 24 T 1440 24 T 1800 24 T 2160 24 T 2520 24 T 2880 24";

/** A gentle double wave between sections, in place of a hard rule. Drifts slowly; still under reduced motion. */
export function WaveDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none relative h-12 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] sm:h-14",
        className,
      )}
      aria-hidden
    >
      <svg className="wave-drift absolute inset-y-0 left-0 h-full w-[200%]" viewBox="0 0 2880 48" preserveAspectRatio="none">
        <path d={WAVE} fill="none" stroke="var(--color-tide)" strokeOpacity="0.5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg className="wave-drift-slow absolute inset-y-0 left-0 h-full w-[200%] translate-y-2" viewBox="0 0 2880 48" preserveAspectRatio="none">
        <path d={WAVE} fill="none" stroke="var(--color-shallow)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
