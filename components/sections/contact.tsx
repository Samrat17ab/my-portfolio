import { Mail, ExternalLink, FileText } from "lucide-react";

import { contact } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { ResumeButton } from "@/components/resume-viewer";

export function Contact() {
  return (
    <section id="contact" className="py-28 sm:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-ocean-deep">
            Get in touch
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-4 text-4xl font-light leading-[1.1] text-heading sm:text-6xl">
            Let&apos;s build something
            <br />
            worth remembering.
          </h2>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-6 py-3 text-sm text-heading shadow-soft backdrop-blur transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:border-coral hover:bg-coral/15"
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
              className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-6 py-3 text-sm text-heading shadow-soft backdrop-blur transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:border-coral hover:bg-coral/15"
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
              className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-6 py-3 text-sm text-heading shadow-soft backdrop-blur transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:border-coral hover:bg-coral/15"
            >
              <ExternalLink className="h-4 w-4" />
              GitHub
            </a>
          </Magnetic>
          <Magnetic>
            <ResumeButton className="inline-flex items-center gap-2 rounded-full bg-ocean-deep px-6 py-3 text-sm font-medium text-page shadow-soft transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-coral hover:text-heading">
              <FileText className="h-4 w-4" />
              Resume
            </ResumeButton>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.26} className="mt-20 text-xs uppercase tracking-[0.2em] text-body">
          Samrat Lamsal &middot; Bhubaneswar &middot; {new Date().getFullYear()}
        </Reveal>
      </div>
    </section>
  );
}
