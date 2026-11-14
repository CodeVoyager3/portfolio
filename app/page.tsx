import { NavigationMenuDemo } from "@/components/navbar";
import { HeroSection } from "@/components/hero";
import { ExperienceSection } from "@/components/experience";
import { ProjectsSection } from "@/components/projects";
import { AboutSection } from "@/components/about";
import { GitHubActivitySection } from "@/components/github-activity";
import { PersonalLifeSection } from "@/components/personal-life";
import SectionBorder from "@/components/SectionBorder";
import PageLayout from "@/components/PageLayout";
import { SplashManager } from "@/components/splash-manager"; // <-- Import the new wrapper
import { Marquee } from "@/components/motion/marquee";

export const dynamic = 'force-dynamic';

const stripNotes = [
  "Open to full-stack roles and internships",
  "Projects sync live from my GitHub",
  "Built with Next.js, TypeScript, and MongoDB",
  "Currently exploring Generative AI",
];

function AnnouncementStrip() {
  return (
    <div className="mb-5 border-b border-black/5 dark:border-white/10 pb-3" aria-label="Highlights">
      <Marquee speed={34} gap="2.5rem" fade className="text-xs text-neutral-500 dark:text-neutral-400">
        {stripNotes.map((note) => (
          <span key={note} className="flex items-center gap-2.5">
            <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />
            {note}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export default async function Home() {
  return (
    <SplashManager>
      <PageLayout>
        <AnnouncementStrip />
        <HeroSection />
        <SectionBorder />
        <ExperienceSection />
        <SectionBorder />
        <ProjectsSection />
        <SectionBorder />
        <AboutSection />
        <SectionBorder />
        <GitHubActivitySection />
        <SectionBorder />
        <PersonalLifeSection />
      </PageLayout>
    </SplashManager>
  );
}