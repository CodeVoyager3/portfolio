"use client";

import { HeroUIProvider } from "@heroui/react";
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <HeroUIProvider>
                    {children}
                </HeroUIProvider>
            </ThemeProvider>
        </ClerkProvider>
    );
}
