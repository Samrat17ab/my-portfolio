import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

/** Server-only: reads content/journal/*.md at build time. */

export interface JournalEntryMeta {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  mood: string;
  tags: string[];
  excerpt: string;
  readingMinutes: number;
  draft: boolean;
}

export interface JournalEntry extends JournalEntryMeta {
  html: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "journal");
// Drafts show while running `npm run dev` and never in a production build.
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

type Frontmatter = Record<string, string | string[] | boolean>;

function parseValue(raw: string): string | string[] | boolean {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((v) => v.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  return value.replace(/^["']|["']$/g, "");
}

function parseFrontmatter(raw: string, file: string): { data: Frontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`Journal entry ${file} needs a frontmatter block between --- lines.`);
  const data: Frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const i = line.indexOf(":");
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = parseValue(line.slice(i + 1));
  }
  return { data, body: raw.slice(match[0].length) };
}

function plainText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function firstParagraph(body: string): string {
  const block = body
    .split(/\r?\n\s*\r?\n/)
    .map((b) => b.trim())
    .find((b) => b && !/^(#|>|!\[|---|-\s|\*\s|\d+\.\s)/.test(b));
  return block ? plainText(block) : "";
}

function truncate(text: string, max = 170): string {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max)).replace(/[,;:.]$/, "")}…`;
}

function renderMarkdown(body: string): string {
  const html = marked.parse(body, { gfm: true, async: false }) as string;
  return html
    .replace(/<a href="(https?:\/\/)/g, '<a target="_blank" rel="noopener noreferrer" href="$1')
    .replace(/<img /g, '<img loading="lazy" decoding="async" ');
}

function readEntry(file: string): JournalEntry {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, body } = parseFrontmatter(raw, file);
  const slug = file.replace(/\.md$/, "");

  const title = typeof data.title === "string" ? data.title : "";
  const date = typeof data.date === "string" ? data.date : "";
  if (!title) throw new Error(`Journal entry ${file} is missing a title.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Journal entry ${file} needs a date like 2026-10-10.`);

  const words = plainText(body).split(" ").filter(Boolean).length;
  const excerpt = typeof data.excerpt === "string" && data.excerpt ? data.excerpt : truncate(firstParagraph(body));

  return {
    slug,
    title,
    date,
    mood: typeof data.mood === "string" && data.mood ? data.mood : "calm",
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    draft: data.draft === true,
    html: renderMarkdown(body),
  };
}

function loadAll(): JournalEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(readEntry)
    .filter((e) => SHOW_DRAFTS || !e.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

function toMeta(entry: JournalEntry): JournalEntryMeta {
  const meta: JournalEntryMeta & { html?: string } = { ...entry };
  delete meta.html;
  return meta;
}

export function getEntries(): JournalEntryMeta[] {
  return loadAll().map(toMeta);
}

export function getEntry(slug: string): JournalEntry | undefined {
  return loadAll().find((e) => e.slug === slug);
}

/** The entries written just after and just before this one. */
export function getNeighbors(slug: string): { newer?: JournalEntryMeta; older?: JournalEntryMeta } {
  const all = getEntries();
  const i = all.findIndex((e) => e.slug === slug);
  if (i === -1) return {};
  return { newer: all[i - 1], older: all[i + 1] };
}

/** Same mood first, then shared tags, excluding the entry and its direct neighbours. */
export function getRelated(entry: JournalEntryMeta, count = 2): JournalEntryMeta[] {
  const { newer, older } = getNeighbors(entry.slug);
  const skip = new Set([entry.slug, newer?.slug, older?.slug]);
  const score = (e: JournalEntryMeta) =>
    (e.mood.toLowerCase() === entry.mood.toLowerCase() ? 2 : 0) + e.tags.filter((t) => entry.tags.includes(t)).length;
  return getEntries()
    .filter((e) => !skip.has(e.slug) && score(e) > 0)
    .sort((a, b) => score(b) - score(a))
    .slice(0, count);
}
