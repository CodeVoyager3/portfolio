'use client'

import { NavigationMenuDemo } from "@/components/navbar";
import DiagonalPattern from "@/components/DiagonalPattern";
import { Footer } from "@/components/footer";

interface PageLayoutProps {
    children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className="min-h-screen transition-colors duration-300 relative flex flex-col" style={{ fontFamily: 'var(--font-hk-grotesk)' }}>
            <div className="relative mx-auto max-w-4xl grow flex flex-col w-full">
                {/* Diagonal Patterns - side slanted lines */}
                <DiagonalPattern side="left" />
                <DiagonalPattern side="right" />

                {/* Content wrapper to stay inside diagonal lines */}
                <div className="mx-auto sm:w-[calc(100%-120px)] w-full grow flex flex-col">
                    {/* Main Content */}
                    <div className="px-5 sm:px-6 pt-20 pb-8 grow">
                        <NavigationMenuDemo />
                        {children}
                    </div>

                    <Footer />
                </div>
            </div>
        </div>
    );
}
