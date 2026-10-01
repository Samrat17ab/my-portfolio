import { Mail, ExternalLink, Download } from "lucide-react";

import { contact } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";

export function Contact() {
  return (
    <section id="contact" className="py-28 sm:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-glacier">
            Get in touch
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-4 text-4xl uppercase leading-tight tracking-wide text-white sm:text-6xl">
            Let&apos;s build something
            <br />
            worth remembering.
          </h2>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 transition-colors hover:border-glacier/50 hover:text-glacier"
            >
              <Mail className="h-4 w-4" />
              {contact.email}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 transition-colors hover:border-glacier/50 hover:text-glacier"
            >
              <ExternalLink className="h-4 w-4" />
              LinkedIn
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 transition-colors hover:border-glacier/50 hover:text-glacier"
            >
              <ExternalLink className="h-4 w-4" />
              GitHub
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={contact.resumeHref}
              download
              className="inline-flex items-center gap-2 rounded-full bg-marigold px-6 py-3 text-sm font-medium text-base transition-transform hover:scale-[1.02]"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.26} className="mt-20 text-xs uppercase tracking-[0.2em] text-white/25">
          Samrat Lamsal &middot; Bhubaneswar &middot; {new Date().getFullYear()}
        </Reveal>
      </div>
    </section>
  );
}
