"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/loading-screen";

export function SplashManager({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check if splash has already been shown in this session
        const hasShownSplash = sessionStorage.getItem("splashShown");

        if (hasShownSplash) {
            setIsLoading(false);
            return;
        }
    }, []);

    const handleComplete = () => {
        setIsLoading(false);
        sessionStorage.setItem("splashShown", "true");
    };

    // Prevent hydration mismatch by not rendering anything until mounted
    if (!mounted) {
        return <div className="invisible">{children}</div>;
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loading-screen" onComplete={handleComplete} />}
            </AnimatePresence>
            <div style={{ opacity: isLoading ? 0 : 1, transition: isLoading ? "none" : "opacity 0.5s ease-out 0.6s" }}>
                {children}
            </div>
        </>
    );
}