/** Mood colours for journal entries. Any other mood still works and uses the default colour. */
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

const DEFAULT_COLOR = "#7fb8c4";

export function moodColor(mood: string): string {
  return MOOD_COLORS[mood.trim().toLowerCase()] ?? DEFAULT_COLOR;
}

export function moodLabel(mood: string): string {
  const m = mood.trim();
  return m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
}
