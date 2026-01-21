"use client"

import { useState, useEffect } from "react"
import TechStackIcon from "tech-stack-icons"
import { NavigationMenuDemo } from "../components/navbar"
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

    return (
        <div className={`project-status-badge ${config.badgeClass}`}>
            <span className={`project-status-dot ${config.dotClass}`}></span>
            <span className="project-status-text">{config.text}</span>
        </div>
    )
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="project-card">
            {/* Project Image */}
            <div className="project-image-container">
                <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                />
            </div>

            {/* Project Content */}
            <div className="project-content">
                {/* Header with title and icons */}
                <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-icons">
                        {project.liveUrl && (
                            <a href={project.liveUrl} className="project-icon-link" aria-label="Live site">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} className="project-icon-link" aria-label="GitHub">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="project-description">{project.description}</p>

                {/* Technologies */}
                <div className="project-technologies">
                    <span className="project-tech-label">Technologies</span>
                    <div className="project-tech-icons">
                        {project.technologies.map((tech, index) => (
                            <TechStackIcon key={index} name={tech} className="project-tech-icon" />
                        ))}
                    </div>
                </div>

                {/* Footer with status and details link */}
                <div className="project-footer">
                    <div className="flex flex-col gap-2">
                        <StatusBadge status={project.status} />
                        <span className="text-xs text-muted-foreground">{project.date}</span>
                    </div>
                    <a href="#" className="project-details-link">
                        View Details <span className="arrow">→</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

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
            <div className="max-w-2xl mx-auto px-4 pt-24 pb-8" style={{ backgroundColor: 'var(--background)' }}>
                <NavigationMenuDemo />
                <div className="text-center py-12">Loading projects...</div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-4 pt-24 pb-8" style={{ backgroundColor: 'var(--background)' }}>
            <NavigationMenuDemo />

            {/* Page Header */}
            <BlurFade delay={0}>
                <div className="projects-page-header">
                    <h1 className="projects-page-title">Projects</h1>
                    <p className="projects-page-subtitle">
                        My projects and work across different technologies and domains.
                    </p>
                </div>
            </BlurFade>

            {/* Filter Section */}
            <BlurFade delay={0.1}>
                <div className="projects-filter-section">
                    <span className="projects-filter-label">Filter by Status</span>
                    <div className="projects-filter-tabs">
                        <button
                            className={`projects-filter-tab ${activeFilter === "all" ? "active" : ""}`}
                            onClick={() => setActiveFilter("all")}
                        >
                            All ({projects.length})
                        </button>
                        <button
                            className={`projects-filter-tab ${activeFilter === "operational" ? "active" : ""}`}
                            onClick={() => setActiveFilter("operational")}
                        >
                            Working ({workingCount})
                        </button>
                        <button
                            className={`projects-filter-tab ${activeFilter === "building" ? "active" : ""}`}
                            onClick={() => setActiveFilter("building")}
                        >
                            Building ({buildingCount})
                        </button>
                    </div>
                </div>
            </BlurFade>

            {/* All Projects Header */}
            <BlurFade delay={0.15}>
                <div className="projects-list-header">
                    <h2 className="projects-list-title">
                        {activeFilter === "all" ? "All Projects" : activeFilter === "operational" ? "Working Projects" : "Building Projects"}
                    </h2>
                    <span className="projects-count">({filteredProjects.length} projects)</span>
                </div>
            </BlurFade>

            {/* Projects Grid */}
            <div className="projects-page-grid">
                {filteredProjects.map((project, index) => (
                    <BlurFade key={index} delay={0.1 + index * 0.05}>
                        <ProjectCard project={project} />
                    </BlurFade>
                ))}
            </div>
        </div>
    )
}

