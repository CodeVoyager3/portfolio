
import TechStackIcon from "tech-stack-icons"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { BlurFade } from "@/components/motion/animated-group"
import { DataService } from "@/lib/data-service"
import { Project } from "@/types"

function StatusBadge({ status }: { status: Project["status"] }) {
    const config = {
        operational: {
            text: "Operational",
            dotClass: "bg-emerald-500",
            bgClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
        },
        building: {
            text: "Building",
            dotClass: "bg-amber-500",
            bgClass: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
        },
        maintenance: {
            text: "Maintenance",
            dotClass: "bg-orange-500",
            bgClass: "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400"
        }
    }[status] || {
        text: "Building",
        dotClass: "bg-amber-500",
        bgClass: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
    }

    return (
        <div className={`inline-flex items-center gap-1.5 w-fit px-2 py-0.5 text-[10px] font-medium rounded-full border ${config.bgClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${config.dotClass}`} />
            {config.text}
        </div>
    )
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="group/item block w-full">
            <div className="flex flex-col gap-3 w-full p-1 bg-white dark:bg-white/5 border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out hover:border-black/20 dark:hover:border-white/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-md w-full aspect-4/3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="rounded-md w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="w-full px-2 pb-3">
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
                            {project.technologies.slice(0, 6).map((tech, index) => (
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
                    <div className="flex items-center gap-2 pt-3 border-t border-black/5 dark:border-white/5">
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

export async function ProjectsSection() {
    const projects = await DataService.getFeaturedProjects();

    return (
        <section className="w-full mb-16">
            {/* Section Header */}
            <BlurFade delay={0}>
                <div className="mb-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Featured</p>
                    <h2 className="text-xl font-bold text-black dark:text-white">Projects</h2>
                </div>
            </BlurFade>

            {/* Projects Grid */}
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group">
                    {projects.map((project, index) => (
                        <BlurFade key={project.title} delay={0.1 + index * 0.1}>
                            <ProjectCard project={project} />
                        </BlurFade>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
                    <p>Coming soon...</p>
                </div>
            )}

            {/* View All */}
            <BlurFade delay={0.1}>
                <div className="mt-6 text-center">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                        View all projects
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </BlurFade>
        </section>
    )
}

export { ProjectCard, StatusBadge }
