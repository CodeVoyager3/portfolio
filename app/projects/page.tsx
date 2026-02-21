"use client"

import { useState, useEffect } from "react"
import TechStackIcon from "tech-stack-icons"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
type Project = {
    title: string
    description: string
    technologies: string[]
    image: string
    status: "operational" | "building" | "maintenance"
    liveUrl?: string
    githubUrl?: string
    date: string
}
import { BlurFade } from "@/components/motion/animated-group"

type FilterStatus = "all" | "operational" | "building"

function StatusBadge({ status }: { status: Project["status"] }) {
    const statusConfig = {
        operational: {
            text: "All Systems Operational",
            dotClass: "status-dot-green",
            badgeClass: "status-badge-green"
        },
        building: {
            text: "Building",
            dotClass: "status-dot-yellow",
            badgeClass: "status-badge-yellow"
        },
        maintenance: {
            text: "Maintenance",
            dotClass: "status-dot-orange",
            badgeClass: "status-badge-orange"
        }
    }

    const config = statusConfig[status]

    const colorMap = {
        operational: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        building: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        maintenance: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
    }
    const dotColor = {
        operational: 'bg-emerald-500',
        building: 'bg-amber-500',
        maintenance: 'bg-orange-500'
    }

    return (
        <span className={`inline-flex items-center gap-1.5 w-fit px-2.5 py-1 text-[10px] font-medium rounded-full ${colorMap[status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor[status]}`}></span>
            {config.text}
        </span>
    )
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="group/item block w-full h-full">
            <div className="flex flex-col gap-3 w-full h-full p-1 bg-white dark:bg-white/5 border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out hover:border-black/20 dark:hover:border-white/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-md w-full aspect-4/3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="rounded-md w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="w-full px-2 pb-3 flex flex-col grow">
                    {/* Title + Status */}
                    <div className="flex flex-col gap-1.5 mb-2">
                        <span className="text-[15px] leading-6 text-black/80 dark:text-white/80 font-medium line-clamp-2">
                            {project.title}
                        </span>
                        <StatusBadge status={project.status} />
                    </div>

                    {/* Description */}
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech Stack + Date */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                            {project.technologies.map((tech, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <div className="cursor-pointer">
                                            <TechStackIcon name={tech} className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>{tech}</TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {project.date}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2 pt-3 mt-auto border-t border-black/5 dark:border-white/5">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white bg-black/3 dark:bg-white/3 hover:bg-black/6 dark:hover:bg-white/6 rounded-md transition-colors"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                                Live
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white bg-black/3 dark:bg-white/3 hover:bg-black/6 dark:hover:bg-white/6 rounded-md transition-colors"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                Source
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

import PageLayout from "@/components/PageLayout"

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState<FilterStatus>("all")
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/projects")
            .then(res => res.json())
            .then(data => {
                const mappedProjects = data.map((p: any) => ({
                    title: p.title,
                    description: p.description,
                    technologies: p.techStack || [],
                    image: p.thumbnail || '/placeholder.png',
                    status: p.status || 'building',
                    liveUrl: p.demoLink || '',
                    githubUrl: p.githubLink || '',
                    date: new Date(p.publishedDate || p.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                }));
                setProjects(mappedProjects)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    // Count projects by status
    const workingCount = projects.filter(p => p.status === "operational").length
    const buildingCount = projects.filter(p => p.status === "building").length

    // Filter projects based on active filter
    const filteredProjects = activeFilter === "all"
        ? projects
        : projects.filter(p => p.status === activeFilter)

    if (loading) {
        return (
            <PageLayout>
                <div className="text-center py-12">Loading projects...</div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            {/* Page Header */}
            <BlurFade delay={0}>
                <div className="text-center pt-8 pb-6">
                    <h1 className="font-(family-name:--font-instrument-serif) italic text-3xl sm:text-4xl tracking-[0.01em] font-medium text-black dark:text-white mb-2">Projects</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
                        My projects and work across different technologies and domains.
                    </p>
                </div>
            </BlurFade>

            {/* Filter Section */}
            <BlurFade delay={0.1}>
                <div className="mb-6">
                    <span className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wider">Filter by Status</span>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${activeFilter === "all" ? "bg-black dark:bg-white text-white dark:text-black" : "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20"}`}
                            onClick={() => setActiveFilter("all")}
                        >
                            All ({projects.length})
                        </button>
                        <button
                            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${activeFilter === "operational" ? "bg-black dark:bg-white text-white dark:text-black" : "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20"}`}
                            onClick={() => setActiveFilter("operational")}
                        >
                            Working ({workingCount})
                        </button>
                        <button
                            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${activeFilter === "building" ? "bg-black dark:bg-white text-white dark:text-black" : "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20"}`}
                            onClick={() => setActiveFilter("building")}
                        >
                            Building ({buildingCount})
                        </button>
                    </div>
                </div>
            </BlurFade>

            {/* All Projects Header */}
            <BlurFade delay={0.15}>
                <div className="flex items-baseline gap-2 mb-4">
                    <h2 className="text-lg font-semibold text-black dark:text-white">
                        {activeFilter === "all" ? "All Projects" : activeFilter === "operational" ? "Working Projects" : "Building Projects"}
                    </h2>
                    <span className="text-sm text-neutral-400 dark:text-neutral-500">({filteredProjects.length} projects)</span>
                </div>
            </BlurFade>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProjects.map((project, index) => (
                    <BlurFade key={index} delay={0.1 + index * 0.05}>
                        <ProjectCard project={project} />
                    </BlurFade>
                ))}
            </div>
        </PageLayout>
    )
}

