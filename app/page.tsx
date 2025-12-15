import Image from "next/image";
import { NavigationMenuDemo } from "./components/navbar";


export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8" style={{ backgroundColor: 'var(--background)' }}>
      <div className="w-full">
        <NavigationMenuDemo />
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        
      </div>
    </div>
  );
}
