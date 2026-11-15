"use client"

import { useState } from "react"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { BlurFade } from "@/components/motion/animated-group"
import { AnimatedBadge } from "@/components/motion/animated-badge"
import { TiltCard } from "@/components/motion/tilt-card"
import { SectionHeading } from "@/components/ui/section-heading"

const impactStats = [
    { value: "300,000+", label: "Combinatorial SKUs", sub: "Dynamic 3-Tier BOM Engine" },
    { value: "5-Stage", label: "Shop Floor Pipeline", sub: "CAD → CNC → Stitch → QC → Pack" },
    { value: "~45%", label: "Query Latency Reduction", sub: "Mumbai Colocation & Pooling" },
    { value: "Zero", label: "Data Loss on Floor", sub: "Offline-First PWA & IndexedDB" },
]

const techBadges = [
    "Next.js 16 (App Router)",
    "React 19",
    "TypeScript",
    "PostgreSQL",
    "Prisma ORM",
    "Supabase",
    "Offline-First PWA",
    "Razorpay",
]

export function ExperienceSection() {
    const [logoFailed, setLogoFailed] = useState(false)

    return (
        <section className="w-full mb-16">
            {/* Section Header */}
            <BlurFade delay={0}>
                <SectionHeading eyebrow="01" title="Experience" />
            </BlurFade>

            {/* Experience Card */}
            <BlurFade delay={0.1}>
                <TiltCard
                    max={3}
                    glare={false}
                    className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] transition-all duration-300 hover:border-black/25 dark:hover:border-white/25 overflow-hidden"
                >
                    <div className="p-5 sm:p-7 flex flex-col gap-5">
                        {/* Header: Company Logo, Role, Company, Period */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="flex items-start gap-3.5 sm:gap-4">
                                {/* Company Logo */}
                                <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/10 shadow-sm transition-transform duration-300 group-hover:scale-105">
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

                                {/* Title & Company */}
                                <div className="flex flex-col gap-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-base sm:text-lg font-semibold text-black/90 dark:text-white leading-snug">
                                            Full-Stack Software Engineer & Systems Architect
                                        </h3>
                                        <AnimatedBadge status="success" size="sm" showIcon={false}>
                                            Present
                                        </AnimatedBadge>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                                        <a
                                            href="https://vedahub.co.in/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 font-medium text-black/80 dark:text-white/90 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                                        >
                                            Vedahub
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </a>
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

                        {/* Spotlight + Executive Summary */}
                        <div className="flex flex-col gap-2.5 pt-1 border-t border-black/5 dark:border-white/5">
                            <span className="inline-flex w-fit items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                                <Sparkles className="w-3 h-3" />
                                Flagship: CarXen VEDA & Omnichannel Commerce
                            </span>

                            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                Architected <strong className="text-black/80 dark:text-white font-medium">VEDA</strong>, an end-to-end Factory Operating System & Manufacturing ERP for custom automotive interior fabrication, alongside <strong className="text-black/80 dark:text-white font-medium">CarXen E-Commerce</strong>, a headless D2C & B2B wholesale platform. Replaced fragmented spreadsheets with automated production pipelines, double-entry inventory ledgers, and tamper-proof QR product passports.
                            </p>
                        </div>

                        {/* Impact Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {impactStats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex flex-col justify-between"
                                >
                                    <span className="text-lg sm:text-xl font-bold font-mono tracking-tight text-orange-600 dark:text-orange-400">
                                        {stat.value}
                                    </span>
                                    <div className="mt-1">
                                        <p className="text-xs font-semibold text-black/80 dark:text-white/90 leading-tight">
                                            {stat.label}
                                        </p>
                                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 truncate">
                                            {stat.sub}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tech Stack Badges */}
                        <div className="pt-3 border-t border-black/5 dark:border-white/5">
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
                    </div>
                </TiltCard>
            </BlurFade>
        </section>
    )
}
