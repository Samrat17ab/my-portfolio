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
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-glacier">{kicker}</span>
      <h2 className="font-display mt-3 text-4xl uppercase tracking-wide text-white sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
