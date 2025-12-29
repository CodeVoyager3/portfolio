import Image from "next/image";
import { NavigationMenuDemo } from "./components/navbar";
import { HeroSection } from "./components/hero";
import { ProjectsSection } from "./components/projects";
import { AboutSection } from "./components/about";
import { GitHubActivitySection } from "./components/github-activity";
import { BlogsSection } from "./components/blogs";
import { ResearchSection } from "./components/research";
import { PersonalLifeSection } from "./components/personal-life";


export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-24 pb-8" style={{ backgroundColor: 'var(--background)' }}>
      <NavigationMenuDemo />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <GitHubActivitySection />
      <BlogsSection />
      <ResearchSection />
      <PersonalLifeSection />
    </div>
  );
}


