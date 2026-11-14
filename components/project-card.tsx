'use client'

import { CardContainer, CardBody } from "@/components/ui/3d-card"
import { GitHubProject } from "@/types"

const languageColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Go: "#00ADD8",
    Java: "#b07219",
    Rust: "#dea584",
    "C++": "#f34b7d",
    C: "#555555",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    MDX: "#fcb32c",
    Jupyter: "#DA5B0B",
}

function GithubIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    )
}

function ForkIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="6" r="3" />
            <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
            <path d="M12 12v3" />
        </svg>
    )
}

export function GitHubProjectCard({ project }: { project: GitHubProject }) {
    return (
        <CardContainer containerClassName="p-0 w-full" className="w-full">
            <CardBody className="w-full h-full">
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col h-full gap-3 p-4 sm:p-5 bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-xl transition-all duration-300 hover:border-black/25 dark:hover:border-white/25 hover:shadow-lg hover:shadow-orange-500/10 dark:hover:shadow-black/40"
                >
                    <div className="flex items-center justify-between gap-2 min-w-0">
                        <span className="text-[14px] sm:text-[15px] font-medium text-black dark:text-white truncate">
                            {project.name}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                            {project.pinned && (
                                <span className="text-[10px] uppercase tracking-wider font-medium text-orange-600 dark:text-orange-400 border border-orange-500/30 bg-orange-500/10 rounded-full px-2 py-0.5">
                                    Pinned
                                </span>
                            )}
                            <GithubIcon className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                        </div>
                    </div>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2 grow">
                        {project.description || "No description provided."}
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-neutral-400 dark:text-neutral-500">
                        {project.language && (
                            <span className="flex items-center gap-1.5">
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: languageColors[project.language] ?? "#9ca3af" }}
                                />
                                {project.language}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                            <ForkIcon className="w-3.5 h-3.5" />
                            {project.forks}
                        </span>
                    </div>

                    {project.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {project.topics.slice(0, 4).map((topic) => (
                                <span
                                    key={topic}
                                    className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-neutral-500 dark:text-neutral-400"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    )}
                </a>
            </CardBody>
        </CardContainer>
    )
}
