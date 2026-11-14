"use client"

import { useRouter } from "next/navigation"
import { ExpandingArrowButton } from "@/components/motion/expanding-arrow-button"

export function ViewAllProjects() {
    const router = useRouter()
    return (
        <ExpandingArrowButton
            className="mx-auto h-11 min-w-0 rounded-full bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/15 focus-visible:ring-orange-400"
            accentClassName="bg-[#f6821f] text-white"
            labelClassName="text-sm font-medium"
            onClick={() => router.push("/projects")}
        >
            View all projects
        </ExpandingArrowButton>
    )
}
