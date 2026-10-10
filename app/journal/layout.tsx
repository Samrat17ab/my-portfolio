import { journalSerif } from "@/lib/journal/font";
import "./journal.css";

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return <div className={journalSerif.variable}>{children}</div>;
}
