"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/motion/animated-group"
import { AnimatedBadge } from "@/components/motion/animated-badge"
import { Magnetic } from "@/components/motion/magnetic"
import { NumberTicker } from "@/components/motion/number-ticker"
import { TextScramble } from "@/components/motion/text-scramble"
import { TiltCard } from "@/components/motion/tilt-card"
import { SectionHeading } from "@/components/ui/section-heading"

const ROLE = "Full-Stack Software Engineer & Systems Architect"

const stats = [
    { value: 300000, suffix: "+", format: (v: number) => v.toLocaleString("en-US"), label: "Combinatorial SKUs" },
    { value: 5, label: "Shop Floor Stages" },
    { value: 45, prefix: "~", suffix: "%", label: "Lower Query Latency" },
]

const techBadges = ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma ORM", "Supabase"]

export function ExperienceSection() {
    const [logoFailed, setLogoFailed] = useState(false)
    const [scrambleText, setScrambleText] = useState(ROLE)

    return (
        <section className="w-full mb-16">
            {/* Section Header */}
            <BlurFade delay={0}>
                <SectionHeading eyebrow="01" title="Experience" />
            </BlurFade>

            {/* Experience Card */}
            <BlurFade delay={0.1}>
                <TiltCard
                    max={4}
                    glare={false}
                    className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] transition-all duration-300 hover:border-black/25 dark:hover:border-white/25 overflow-hidden"
                >
                    <div className="p-5 sm:p-6 flex flex-col gap-4">
                        {/* Header: Logo, Role, Company, Period */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3.5 sm:gap-4">
                                <Magnetic strength={0.25}>
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/10 shadow-sm">
                                        {logoFailed ? (
                                            <span className="text-base sm:text-lg font-bold tracking-wide text-orange-600 dark:text-orange-400">V</span>
                                        ) : (
                                            <img
                                                src="/logos/vedahub.png"
                                                alt="Vedahub logo"
                                                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                                                onError={() => setLogoFailed(true)}
                                            />
                                        )}
                                    </div>
                                </Magnetic>

                                <div className="flex flex-col gap-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3
                                            onMouseEnter={() => setScrambleText(ROLE + "\u200B")}
                                            onMouseLeave={() => setScrambleText(ROLE)}
                                            className="text-base sm:text-lg font-semibold text-black/90 dark:text-white leading-snug"
                                        >
                                            <TextScramble text={scrambleText} />
                                        </h3>
                                        <AnimatedBadge status="success" size="sm" showIcon={false}>
                                            Present
                                        </AnimatedBadge>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                                        <Magnetic strength={0.25}>
                                            <a
                                                href="https://vedahub.co.in/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 font-medium text-black/80 dark:text-white/90 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                                            >
                                                Vedahub
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            </a>
                                        </Magnetic>
                                        <span>•</span>
                                        <span className="text-xs sm:text-sm">Automotive Manufacturing & E-Commerce</span>
                                    </div>
                                </div>
                            </div>

                            {/* Period Badge */}
                            <AnimatedBadge status="neutral" size="sm" showIcon={false} className="self-start sm:self-auto shrink-0 tabular-nums bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-neutral-600 dark:text-neutral-300 font-medium">
                                2026 – Present
                            </AnimatedBadge>
                        </div>

                        {/* One-line summary */}
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 border-t border-black/5 dark:border-white/5 pt-4">
                            Building <strong className="text-black/80 dark:text-white font-medium">VEDA</strong> — a Factory OS & ERP for custom automotive interiors — and <strong className="text-black/80 dark:text-white font-medium">CarXen</strong>, a headless D2C & B2B commerce platform.
                        </p>

                        {/* Impact stats strip */}
                        <div className="grid grid-cols-3 divide-x divide-black/5 dark:divide-white/10 overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col items-center justify-center px-2 py-3 text-center">
                                    <NumberTicker
                                        value={stat.value}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                        format={stat.format}
                                        duration={0.8}
                                        className="text-lg sm:text-xl font-bold font-mono tracking-tight text-orange-600 dark:text-orange-400"
                                    />
                                    <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5">
                            {techBadges.map((tech) => (
                                <AnimatedBadge
                                    key={tech}
                                    status="neutral"
                                    size="sm"
                                    showIcon={false}
                                    className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-300 font-medium text-[11px]"
                                >
                                    {tech}
                                </AnimatedBadge>
                            ))}
                        </div>
                    </div>
                </TiltCard>
            </BlurFade>
        </section>
    )
}
