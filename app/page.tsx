import dynamic from "next/dynamic";

import { Nav } from "@/components/nav";
import { SunriseReveal } from "@/components/hero/sunrise-reveal";
import { Flagship } from "@/components/sections/flagship";
import { Experience } from "@/components/sections/experience";
import { Leadership } from "@/components/sections/leadership";
import { ProofOfThinking } from "@/components/sections/proof-of-thinking";
import { Certifications } from "@/components/sections/certifications";
import { BlogTeaser } from "@/components/sections/blog-teaser";
import { Contact } from "@/components/sections/contact";
import { WaveDivider } from "@/components/wave-divider";

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
        <WaveDivider />
        <ProjectDeckSection />
        <WaveDivider />
        <Experience />
        <WaveDivider />
        <Leadership />
        <WaveDivider />
        <ProofOfThinking />
        <WaveDivider />
        <Certifications />
        <BlogTeaser />
        <WaveDivider />
        <Contact />
      </main>
    </>
  );
}
