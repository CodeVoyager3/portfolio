import { BlurFade } from "@/components/motion/animated-group"
import { DataService } from "@/lib/data-service"
import { SectionHeading } from "@/components/ui/section-heading"
import { GitHubProjectCard } from "@/components/project-card"
import { FlameSticker } from "@/components/sticker-decor"
import { ViewAllProjects } from "@/components/view-all-projects"

export async function ProjectsSection() {
    const projects = await DataService.getFeaturedProjects();

    return (
        <section className="w-full mb-16">
            {/* Section Header */}
            <BlurFade delay={0}>
                <div className="relative">
                    <FlameSticker
                        size={64}
                        peel
                        className="absolute -top-6 -right-3 sm:-right-6 rotate-12 z-20 hidden sm:block"
                        aria-label="Flame sticker"
                    />
                    <SectionHeading
                        eyebrow="02"
                        title="Featured Projects"
                    />
                </div>
            </BlurFade>

            {/* Projects Grid */}
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group">
                    {projects.map((project, index) => (
                        <BlurFade key={project.repoId} delay={0.1 + index * 0.1}>
                            <GitHubProjectCard project={project} />
                        </BlurFade>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
                    <p>No published projects yet. Sync your GitHub repos from the admin dashboard.</p>
                </div>
            )}

            {/* View All */}
            <BlurFade delay={0.1}>
                <div className="mt-8 flex justify-center">
                    <ViewAllProjects />
                </div>
            </BlurFade>
        </section>
    )
}
