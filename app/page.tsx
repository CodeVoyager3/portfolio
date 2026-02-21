import { NavigationMenuDemo } from "@/components/navbar";
import { HeroSection } from "@/components/hero";
import { ProjectsSection } from "@/components/projects";
import { AboutSection } from "@/components/about";
import { GitHubActivitySection } from "@/components/github-activity";
import { BlogsSection } from "@/components/blogs";
import { ResearchSection } from "@/components/research";
import { PersonalLifeSection } from "@/components/personal-life";
import SectionBorder from "@/components/SectionBorder";
import PageLayout from "@/components/PageLayout";
import { SplashManager } from "@/components/splash-manager"; // <-- Import the new wrapper

export default function Home() {
  return (
    <SplashManager>
      <PageLayout>
        <HeroSection />
        <SectionBorder />
        <ProjectsSection />
        <SectionBorder />
        <AboutSection />
        <SectionBorder />
        <GitHubActivitySection />
        <SectionBorder />
        <BlogsSection />
        <SectionBorder />
        <ResearchSection />
        <SectionBorder />
        <PersonalLifeSection />
      </PageLayout>
    </SplashManager>
  );
}