import { blogSerif } from "@/lib/blog/font";
import "./blog.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className={blogSerif.variable}>{children}</div>;
}
