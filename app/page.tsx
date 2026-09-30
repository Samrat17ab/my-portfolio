import dynamic from "next/dynamic";

import { Nav } from "@/components/nav";
import { SunriseReveal } from "@/components/hero/sunrise-reveal";
import { Flagship } from "@/components/sections/flagship";
import { Experience } from "@/components/sections/experience";
import { Leadership } from "@/components/sections/leadership";
import { ProofOfThinking } from "@/components/sections/proof-of-thinking";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

const ProjectDeckSection = dynamic(
  () => import("@/components/sections/project-deck-section").then((m) => m.ProjectDeckSection),
  {
    loading: () => <div className="h-[480px]" />,
  },
);

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <SunriseReveal />
        <Flagship />
        <ProjectDeckSection />
        <Experience />
        <Leadership />
        <ProofOfThinking />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
