'use client'

import { useState } from "react"
import { GitHubProject } from "@/types"
import { GitHubProjectCard } from "@/components/project-card"
import { BlurFade } from "@/components/motion/animated-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs"

type Filter = "all" | "pinned"

export function ProjectsGrid({ projects }: { projects: GitHubProject[] }) {
    const [filter, setFilter] = useState<Filter>("all")

    const pinnedCount = projects.filter((p) => p.pinned).length
    const filtered = filter === "pinned" ? projects.filter((p) => p.pinned) : projects

    return (
        <>
            <BlurFade delay={0.1}>
                <div className="mb-6">
                    <span className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wider">Filter</span>
                    <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)} variant="pill">
                        <TabsList className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 w-fit">
                            <TabsTrigger value="all" className="text-xs" indicatorClassName="bg-black dark:bg-white">
                                All ({projects.length})
                            </TabsTrigger>
                            <TabsTrigger value="pinned" className="text-xs" indicatorClassName="bg-black dark:bg-white">
                                Pinned ({pinnedCount})
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </BlurFade>

            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filtered.map((project, index) => (
                        <BlurFade key={project.repoId} delay={0.1 + index * 0.05}>
                            <GitHubProjectCard project={project} />
                        </BlurFade>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                    <p>No projects to show yet.</p>
                </div>
            )}
        </>
    )
}
