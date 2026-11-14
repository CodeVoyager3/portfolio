"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/motion/animated-group"
import { AnimatedBadge } from "@/components/motion/animated-badge"
import { TiltCard } from "@/components/motion/tilt-card"
import { SectionHeading } from "@/components/ui/section-heading"

export function ExperienceSection() {
    const [logoFailed, setLogoFailed] = useState(false)

    return (
        <section className="w-full mb-16">
            {/* Section Header */}
            <BlurFade delay={0}>
                <SectionHeading eyebrow="01" title="Experience" />
            </BlurFade>

            {/* Experience Row */}
            <BlurFade delay={0.1}>
                <TiltCard
                    max={6}
                    glare={false}
                    className="rounded-[10px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 hover:border-black/25 dark:hover:border-white/25"
                >
                    <div className="group/item flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 rounded-[10px]">
                        {/* Company Logo */}
                        <div className="w-14 h-14 shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/10 shadow-sm transition-transform duration-300 group-hover/item:scale-105">
                            {logoFailed ? (
                                <span className="text-lg font-bold tracking-wide text-orange-600 dark:text-orange-400">V</span>
                            ) : (
                                <img
                                    src="/logos/vedahub.png"
                                    alt="Vedahub logo"
                                    className="w-10 h-10 object-contain"
                                    onError={() => setLogoFailed(true)}
                                />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-[15px] font-semibold text-black/80 dark:text-white/90 leading-snug">
                                    Full Stack Web Developer
                                </h3>
                                <AnimatedBadge status="success" size="sm" showIcon={false}>
                                    Present
                                </AnimatedBadge>
                            </div>
                            <a
                                href="https://vedahub.co.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 w-fit text-sm text-neutral-500 dark:text-neutral-400 hover:text-black/80 dark:hover:text-white/90 transition-colors"
                            >
                                Vedahub
                                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                            </a>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                                Shipped ecommerce websites and ERP systems for clients.
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                <AnimatedBadge status="neutral" size="sm" showIcon={false} className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-neutral-500 dark:text-neutral-400">
                                    E-commerce Websites
                                </AnimatedBadge>
                                <AnimatedBadge status="neutral" size="sm" showIcon={false} className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-neutral-500 dark:text-neutral-400">
                                    ERP Systems
                                </AnimatedBadge>
                            </div>
                        </div>

                        {/* Period Badge */}
                        <AnimatedBadge status="neutral" size="sm" showIcon={false} className="shrink-0 tabular-nums bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-neutral-500 dark:text-neutral-400">
                            2026 – Present
                        </AnimatedBadge>
                    </div>
                </TiltCard>
            </BlurFade>
        </section>
    )
}
