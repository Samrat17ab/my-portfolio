import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ kicker, title, className, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <span className="text-xs font-medium uppercase tracking-[0.28em] text-ocean-deep">{kicker}</span>
      <h2 className="font-display mt-4 text-balance text-4xl font-light leading-[1.1] text-heading sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
