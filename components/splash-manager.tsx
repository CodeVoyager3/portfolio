"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MorphingText } from "@/components/ui/morphing-text";

const texts = [
    "Welcome",
    "to my",
    "Portfolio",
    "Initializing",
    "Ready",
];

export function SplashManager({ children }: { children: React.ReactNode }) {
    const [showSplash, setShowSplash] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check if splash has already been shown in this session
        const hasShownSplash = sessionStorage.getItem("splashShown");

        if (hasShownSplash) {
            setShowSplash(false);
            return;
        }

        // Show splash for 3 seconds
        const timer = setTimeout(() => {
            setShowSplash(false);
            sessionStorage.setItem("splashShown", "true");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Prevent hydration mismatch by not rendering anything until mounted
    if (!mounted) {
        return <div className="invisible">{children}</div>;
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {showSplash ? (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
                    >
                        <MorphingText texts={texts} />
                    </motion.div>
                ) : null}
            </AnimatePresence>
            <motion.div
                initial={showSplash ? { opacity: 0 } : { opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: showSplash ? 0.2 : 0 }}
            >
                {(!showSplash || mounted) && children}
            </motion.div>
        </>
    );
}