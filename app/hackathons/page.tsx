import PageLayout from "@/components/PageLayout"
import { BlurFade } from "@/components/motion/animated-group"
import { HackathonCard } from "@/components/hackathons"
import { hackathonWins } from "@/lib/hackathons"

export default function HackathonsPage() {
    return (
        <PageLayout>
            {/* Page Header */}
            <BlurFade delay={0}>
                <div className="text-center pt-8 pb-6">
                    <h1 className="font-(family-name:--font-instrument-serif) italic text-3xl sm:text-4xl tracking-[0.01em] font-medium text-black dark:text-white mb-2">Hackathon Wins</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
                        Every hackathon I&apos;ve competed in — straight from LinkedIn.
                    </p>
                </div>
            </BlurFade>

            {/* All Wins */}
            <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
                {hackathonWins.map((win, index) => (
                    <BlurFade key={win.id} delay={0.05 * index}>
                        <HackathonCard win={win} />
                    </BlurFade>
                ))}
            </div>
        </PageLayout>
    )
}
