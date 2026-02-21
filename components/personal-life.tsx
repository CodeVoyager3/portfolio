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
                    <div className="relative w-full p-6 sm:p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/5 rounded-[10px] overflow-hidden">
                        {/* Decorative Quotes */}
                        <span className="absolute top-3 left-4 text-5xl font-serif text-black/5 dark:text-white/5 select-none leading-none">&ldquo;</span>
                        <span className="absolute bottom-3 right-4 text-5xl font-serif text-black/5 dark:text-white/5 select-none leading-none">&rdquo;</span>

                        {/* Quote Content */}
                        <div className="relative z-10">
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
                                Outside of tech, I&apos;m a big football fan. I genuinely enjoy watching Football , the joy of big matches, the late goals, and those intense Champions League nights that keep me glued to the screen.
                                <br /><br />
                                Football has taught me to stay patient, keep pushing, and believe things can turn around , and I try to carry that same mindset into the things I build.
                            </p>
                        </div>
                    </div>
                </TiltedCardContent>
            </BlurFade>
        </section>
    )
}
