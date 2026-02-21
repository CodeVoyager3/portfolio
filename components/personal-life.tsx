"use client"

import { BlurFade } from "@/components/motion/animated-group"
import TiltedCardContent from "@/components/TiltedCardContent"

export function PersonalLifeSection() {
    return (
        <section className="w-full mb-16">
            <BlurFade delay={0}>
                <div className="mb-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Beyond Code</p>
                    <h2 className="text-xl font-bold text-black dark:text-white">Personal Life</h2>
                </div>
            </BlurFade>

            <BlurFade delay={0.1}>
                <TiltedCardContent className="w-full">
                    <div className="relative w-full p-6 sm:p-8 bg-white dark:bg-white/[0.05] border border-black/10 dark:border-white/5 rounded-[10px] overflow-hidden">
                        {/* Decorative Quotes */}
                        <span className="absolute top-3 left-4 text-5xl font-serif text-black/5 dark:text-white/5 select-none leading-none">&ldquo;</span>
                        <span className="absolute bottom-3 right-4 text-5xl font-serif text-black/5 dark:text-white/5 select-none leading-none">&rdquo;</span>

                        {/* Quote Content */}
                        <div className="relative z-10">
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
                                Beyond the screen, I&apos;m a die-hard <span className="font-medium text-black dark:text-white">Real Madrid</span> fan.
                                I carry the <span className="font-medium text-black dark:text-white">Remontada</span> (comeback) spirit into my code—no matter
                                how broken a feature seems or how close the deadline is, I believe in finding a way to
                                <span className="font-medium text-black dark:text-white"> win in the final minutes</span>.
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">⚽</span>
                                <span className="text-sm text-neutral-500 dark:text-neutral-400 italic">~ Amritesh</span>
                            </div>
                            <span className="px-3 py-1 text-xs font-medium bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-400 rounded-full">
                                ¡Hala Madrid!
                            </span>
                        </div>

                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-amber-500/5 pointer-events-none" />
                    </div>
                </TiltedCardContent>
            </BlurFade>
        </section>
    )
}
