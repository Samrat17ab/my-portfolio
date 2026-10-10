/** What a post is about. The key is what goes in a post's `category:` field.
 * Colours tint chips, dots and accent lines only; chip text stays navy for contrast. */
export const CATEGORIES = {
  product: { label: "Product", color: "#2f7fa8", blurb: "Things I'm building and how I think about them" },
  findings: { label: "Findings", color: "#7c8fd0", blurb: "Research, data and things I've figured out" },
  wins: { label: "Wins", color: "#e5a650", blurb: "Milestones worth sharing" },
  personal: { label: "Personal", color: "#ec8c7b", blurb: "How it's going, and how it feels" },
} as const;

export type Category = keyof typeof CATEGORIES;

export function isCategory(value: string): value is Category {
  return value in CATEGORIES;
}

/** Optional extra on a post, mostly for personal ones. Any word works; these have their own colour. */
const MOOD_COLORS: Record<string, string> = {
  calm: "#6db6d6",
  hopeful: "#f6c177",
  grateful: "#8cc0a0",
  curious: "#9fa8da",
  tender: "#f2a7a0",
  restless: "#ff9e80",
  heavy: "#8da3b8",
  tired: "#a3b1bc",
};

export function moodColor(mood: string): string {
  return MOOD_COLORS[mood.trim().toLowerCase()] ?? "#6db6d6";
}

export function capitalize(word: string): string {
  const w = word.trim();
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}
