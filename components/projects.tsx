
import TechStackIcon from "tech-stack-icons"
import Link from "next/link"
import { BlurFade } from "@/components/motion/animated-group"
import { DataService } from "@/lib/data-service"
import { Project } from "@/types"

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

    const config = statusConfig[status] || statusConfig.building;

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

                <div className="flex items-center gap-2 mb-2 text-xs text-zinc-500 font-medium">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {project.date}
                </div>

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
                    <StatusBadge status={project.status} />
                    <a href="#" className="project-details-link">
                        View Details <span className="arrow">→</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export async function ProjectsSection() {
    const projects = await DataService.getFeaturedProjects();

    return (
        <section className="projects-section">
            {/* Section Header */}
            <BlurFade delay={0}>
                <div className="projects-header">
                    <span className="projects-label">Featured</span>
                    <h2 className="projects-title">Projects</h2>
                </div>
            </BlurFade>

            {/* Projects Grid - Show all projects */}
            {projects.length > 0 ? (
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <BlurFade key={project.title} delay={0.1 + index * 0.1}>
                            <ProjectCard project={project} />
                        </BlurFade>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <p>No featured projects found.</p>
                </div>
            )}

            {/* Show All Button - Links to Projects Page */}
            <BlurFade delay={0.1}>
                <div className="projects-cta">
                    <Link href="/projects" className="show-all-btn">
                        View all projects →
                    </Link>
                </div>
            </BlurFade>
        </section>
    )
}

// Export for use in projects page
export { ProjectCard, StatusBadge }


