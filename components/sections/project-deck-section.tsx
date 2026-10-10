import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ProjectDeck } from "@/components/project-deck/project-deck";

export function ProjectDeckSection() {
  return (
    <section id="work" className="overflow-x-clip py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <SectionHeading kicker="Selected work" title="Drag a project" align="center" />
        </Reveal>
        <Reveal delay={0.08} className="mt-4 text-center">
          <p className="mx-auto max-w-md text-sm text-body">
            Scattered like photos on a desk — pick one up, or click straight through.
          </p>
        </Reveal>
      </div>

      <div className="mt-16">
        <ProjectDeck />
      </div>
    </section>
  );
}
