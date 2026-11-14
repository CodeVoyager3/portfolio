"use client"

import { useRouter } from "next/navigation"
import { Trophy, Linkedin, ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/motion/animated-group"
import { AnimatedBadge } from "@/components/motion/animated-badge"
import { ExpandingArrowButton } from "@/components/motion/expanding-arrow-button"
import { SectionHeading } from "@/components/ui/section-heading"
import { hackathonWins, type HackathonWin } from "@/lib/hackathons"

function formatDate(iso?: string) {
    if (!iso) return null
    return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

export function HackathonCard({ win }: { win: HackathonWin }) {
    const date = formatDate(win.date)

    return (
        <div className="w-full overflow-hidden rounded-[10px] border border-black/10 bg-white transition-colors duration-300 hover:border-black/25 dark:border-white/10 dark:bg-[#0a0a0a] dark:hover:border-white/25">
            <div className="flex items-center gap-2.5 px-4 pt-3.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0A66C2] text-white">
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-[13px] font-semibold text-black/80 dark:text-white/90">
                        Amritesh Kumar Rai
                    </p>
                    <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">
                        LinkedIn post
                    </p>
                </div>
                {date && (
                    <span className="shrink-0 font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
                        {date}
                    </span>
                )}
            </div>

            <div className="px-4 pt-2.5">
                <p className="line-clamp-3 text-sm leading-relaxed text-black/75 dark:text-white/80">
                    {win.headline}
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 px-4 pb-3.5 pt-3">
                <Trophy className="h-4 w-4 shrink-0 text-[#f6821f]" aria-hidden="true" />
                <div className="min-w-0 flex-1 leading-tight">
                    <h3 className="truncate text-sm font-semibold text-black/80 dark:text-white/90">
                        {win.hackathon}
                    </h3>
                    {win.organizer && (
                        <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">
                            {win.organizer}
                        </p>
                    )}
                </div>
                {win.repost ? (
                    <AnimatedBadge status="neutral" size="sm" showIcon={false}>
                        Repost
                    </AnimatedBadge>
                ) : win.prize ? (
                    <AnimatedBadge status="success" size="sm" showIcon={false}>
                        {win.prize}
                    </AnimatedBadge>
                ) : null}
                <a
                    href={win.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-0.5 text-[12px] font-medium text-neutral-500 transition-colors hover:text-[#f6821f] dark:text-neutral-400"
                >
                    View post
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
            </div>
        </div>
    )
}

export function HackathonsSection() {
    const router = useRouter()
    const featured = hackathonWins.slice(0, 2)

    return (
        <section className="w-full mb-16">
            <BlurFade delay={0}>
                <SectionHeading eyebrow="04" title="Hackathon Wins" />
            </BlurFade>

            <BlurFade delay={0.1}>
                <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
                    {featured.map((win) => (
                        <HackathonCard key={win.id} win={win} />
                    ))}
                </div>
            </BlurFade>

            <BlurFade delay={0.2}>
                <div className="mt-6 flex justify-center">
                    <ExpandingArrowButton
                        className="mx-auto h-11 min-w-0 rounded-full bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:bg-black/10 dark:hover:bg-white/15 focus-visible:ring-orange-400"
                        accentClassName="bg-[#f6821f] text-white"
                        labelClassName="text-sm font-medium"
                        onClick={() => router.push("/hackathons")}
                    >
                        See all hackathon wins
                    </ExpandingArrowButton>
                </div>
            </BlurFade>
        </section>
    )
}
