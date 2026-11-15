"use client"

import { BlurFade } from "@/components/motion/animated-group"
import { SectionHeading } from "@/components/ui/section-heading"

const principles = [
    {
        title: "Patience",
        body: "Strong outcomes come from deliberate, sustained effort rather than quick fixes.",
    },
    {
        title: "Persistence",
        body: "Progress is rarely linear; consistency through setbacks is what counts.",
    },
    {
        title: "Composure",
        body: "Clear, decisive judgment matters most when the pressure is highest.",
    },
]

export function PersonalLifeSection() {
    return (
        <section className="w-full mb-16">
            <BlurFade delay={0}>
                <SectionHeading eyebrow="06" title="Life Beyond Tech" />
            </BlurFade>

            <BlurFade delay={0.1}>
                <div className="relative">
                    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 hover:border-black/25 dark:hover:border-white/25">
                        <div className="flex flex-col gap-5 p-5 sm:p-6">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-base sm:text-lg font-semibold text-black/90 dark:text-white">Football</h3>
                                <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                                    Outside of work, I play and follow football, with a particular interest in the UEFA Champions League. The
                                    sport&apos;s emphasis on tactics, discipline and performance under pressure strongly informs how I approach
                                    engineering problems.
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Favourite player: <span className="font-medium text-black/80 dark:text-white/90">Kylian Mbappé</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/5 dark:divide-white/10 border-t border-black/5 dark:border-white/10">
                                {principles.map((p, i) => (
                                    <div key={p.title} className={`flex flex-col gap-1 pt-4 sm:pt-4 ${i > 0 ? "sm:pl-5" : ""} ${i < principles.length - 1 ? "sm:pr-5" : ""} py-3 sm:py-0`}>
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
                                            {p.title}
                                        </span>
                                        <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">{p.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <img
                        src="/stickers/beyond-coding.png"
                        alt="Cute animal holding a gear"
                        className="absolute -top-5 right-0 sm:-top-6 sm:-right-6 rotate-12 z-20 w-12 h-12 sm:w-16 sm:h-16"
                    />
                </div>
            </BlurFade>
        </section>
    )
}