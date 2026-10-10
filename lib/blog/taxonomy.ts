/** What a post is about. The key is what goes in a post's `category:` field. */
export const CATEGORIES = {
  product: { label: "Product", color: "#7fb8c4", blurb: "Things I'm building and how I think about them" },
  findings: { label: "Findings", color: "#b4a7e6", blurb: "Research, data and things I've figured out" },
  wins: { label: "Wins", color: "#e8a33d", blurb: "Milestones worth sharing" },
  personal: { label: "Personal", color: "#d9a5b8", blurb: "How it's going, and how it feels" },
} as const;

export type Category = keyof typeof CATEGORIES;

export function isCategory(value: string): value is Category {
  return value in CATEGORIES;
}

/** Optional extra on a post, mostly for personal ones. Any word works; these have their own colour. */
const MOOD_COLORS: Record<string, string> = {
  calm: "#7fb8c4",
  hopeful: "#e8a33d",
  grateful: "#9cc59a",
  curious: "#b4a7e6",
  tender: "#d9a5b8",
  restless: "#df8a63",
  heavy: "#8f9db6",
  tired: "#8a97a3",
};

export function moodColor(mood: string): string {
  return MOOD_COLORS[mood.trim().toLowerCase()] ?? "#7fb8c4";
}

export function capitalize(word: string): string {
  const w = word.trim();
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}
