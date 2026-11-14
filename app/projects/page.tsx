import PageLayout from "@/components/PageLayout"
import { ProjectsGrid } from "@/components/projects-grid"
import { BlurFade } from "@/components/motion/animated-group"
import { DataService } from "@/lib/data-service"

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
    const projects = await DataService.getPublishedProjects()

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

            <ProjectsGrid projects={projects} />
        </PageLayout>
    )
}
