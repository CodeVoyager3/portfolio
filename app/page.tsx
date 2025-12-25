import Image from "next/image";
import { NavigationMenuDemo } from "./components/navbar";
import { HeroSection } from "./components/hero";


export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8" style={{ backgroundColor: 'var(--background)' }}>
      <NavigationMenuDemo />
      <HeroSection />
    </div>
  );
}
