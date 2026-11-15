"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Boxes, Factory, QrCode, ShoppingCart, ChevronRight } from "lucide-react"
import { BlurFade } from "@/components/motion/animated-group"
import { AnimatedBadge } from "@/components/motion/animated-badge"
import { Magnetic } from "@/components/motion/magnetic"
import { NumberTicker } from "@/components/motion/number-ticker"
import { TiltCard } from "@/components/motion/tilt-card"
import { SectionHeading } from "@/components/ui/section-heading"
import { PipThinkingSticker } from "@/components/sticker-decor"

const stats = [
    { value: 300000, suffix: "+", format: (v: number) => v.toLocaleString("en-US"), label: "SKU variants resolved" },
    { value: 5, label: "Factory stages digitised" },
    { value: 45, prefix: "~", suffix: "%", label: "Faster queries" },
]

const highlights = [
    {
        icon: Boxes,
        title: "Dynamic BOM Engine",
        body: "3-tier recipe system that computes material usage on the fly, replacing static SKU records.",
    },
    {
        icon: Factory,
        title: "Shop-Floor MES",
        body: "PIN-based kiosks, FIFO stock ledger and an offline-first PWA across the full production flow.",
    },
    {
        icon: QrCode,
        title: "Digital QC Passport",
        body: "Photo-gated inspections that issue a QR-verified product passport for every finished piece.",
    },
    {
        icon: ShoppingCart,
        title: "Headless Commerce",
        body: "D2C and B2B storefront with GST-compliant pricing, fitment matching and hardened auth.",
    },
]

const pipeline = ["CAD", "Cutting", "Stitching", "QC", "Packing"]

const tech = ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "Tailwind", "Razorpay", "PWA"]

/* ------------------- Aceternity "Hover Border Gradient" (lite) ------------------- */
function GradientPill({ children }: { children: React.ReactNode }) {
    return (
        <span className="relative inline-flex overflow-hidden rounded-full p-px">
            <motion.span
                aria-hidden
                className="absolute -inset-[200%] opacity-70"
                style={{ background: "conic-gradient(from 0deg, transparent 0 70%, #ea580c 90%, transparent 100%)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
            <span className="relative inline-flex items-center gap-1 rounded-full bg-white dark:bg-[#0a0a0a] px-3 py-1 text-xs font-medium text-black/80 dark:text-white/90 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                {children}
            </span>
        </span>
    )
}

/* ---------------------- beUI "Marquee" (lite, pauses on hover) ------------------- */
function TechMarquee() {
    const items = [...tech, ...tech]
    return (
        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max gap-2 animate-[exp-marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]">
                {items.map((t, i) => (
                    <span
                        key={i}
                        className="rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 whitespace-nowrap"
                    >
                        {t}
                    </span>
                ))}
            </div>
            <style>{`@keyframes exp-marquee { to { transform: translateX(-50%); } }`}</style>
        </div>
    )
}

export function ExperienceSection() {
    const [logoFailed, setLogoFailed] = useState(false)
    const [hovered, setHovered] = useState<number | null>(null)

    return (
        <section className="w-full mb-16">
            <BlurFade delay={0}>
                <div className="relative">
                    <PipThinkingSticker
                        size={48}
                        peel
                        className="absolute -top-5 right-0 sm:-top-6 sm:-right-6 rotate-12 z-20 sm:scale-125 origin-bottom-left"
                        aria-label="Thinking sticker"
                    />
                    <SectionHeading eyebrow="01" title="Experience" />
                </div>
            </BlurFade>

            <BlurFade delay={0.1}>
                <TiltCard
                    max={2}
                    glare={false}
                    className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] transition-all duration-300 hover:border-black/25 dark:hover:border-white/25 overflow-hidden"
                >
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-20 -right-20 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl"
                    />

                    <div className="relative p-5 sm:p-6 flex flex-col gap-5">
                        {/* Header */}
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

                                <div className="flex flex-col gap-1.5 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-base sm:text-lg font-semibold text-black/90 dark:text-white leading-snug">
                                            Full-Stack Software Engineer & Systems Architect
                                        </h3>
                                        <AnimatedBadge status="success" size="sm" showIcon={false}>
                                            Present
                                        </AnimatedBadge>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap text-sm text-neutral-500 dark:text-neutral-400">
                                        <Magnetic strength={0.25}>
                                            <a href="https://vedahub.co.in/" target="_blank" rel="noopener noreferrer">
                                                <GradientPill>
                                                    Vedahub
                                                    <ArrowUpRight className="w-3 h-3" />
                                                </GradientPill>
                                            </a>
                                        </Magnetic>
                                        <span className="text-xs sm:text-sm">Automotive Manufacturing & E-Commerce</span>
                                    </div>
                                </div>
                            </div>

                            <AnimatedBadge
                                status="neutral"
                                size="sm"
                                showIcon={false}
                                className="self-start shrink-0 tabular-nums bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-neutral-600 dark:text-neutral-300 font-medium"
                            >
                                2026 – Present
                            </AnimatedBadge>
                        </div>

                        {/* Summary */}
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                            Designed and built{" "}
                            <strong className="text-black/80 dark:text-white font-medium">VEDA</strong>, a Factory OS & ERP for custom automotive
                            interiors, and <strong className="text-black/80 dark:text-white font-medium">CarXen</strong>, its headless D2C & B2B
                            commerce platform.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 divide-x divide-black/5 dark:divide-white/10 rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                            {stats.map((s) => (
                                <div key={s.label} className="flex flex-col items-center justify-center px-2 py-3 text-center">
                                    <NumberTicker
                                        value={s.value}
                                        prefix={s.prefix}
                                        suffix={s.suffix}
                                        format={s.format}
                                        duration={0.8}
                                        className="text-lg sm:text-xl font-bold font-mono tracking-tight text-orange-600 dark:text-orange-400"
                                    />
                                    <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Highlights — Aceternity "Hover Effect" (sliding highlight) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 -m-1" onMouseLeave={() => setHovered(null)}>
                            {highlights.map((h, i) => {
                                const Icon = h.icon
                                return (
                                    <div key={h.title} className="relative p-1" onMouseEnter={() => setHovered(i)}>
                                        <AnimatePresence>
                                            {hovered === i && (
                                                <motion.span
                                                    layoutId="exp-hover-bg"
                                                    className="absolute inset-0 rounded-xl bg-orange-500/[0.07] dark:bg-orange-500/10 ring-1 ring-orange-500/20"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                                                    exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
                                                />
                                            )}
                                        </AnimatePresence>
                                        <div className="relative flex gap-3 rounded-xl p-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-semibold text-black/90 dark:text-white">{h.title}</h4>
                                                <p className="mt-0.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">{h.body}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Pipeline */}
                        <div className="flex flex-wrap items-center gap-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                            {pipeline.map((p, i) => (
                                <motion.span
                                    key={p}
                                    initial={{ opacity: 0, x: -6 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="inline-flex items-center gap-1"
                                >
                                    <span className="rounded-md bg-black/5 dark:bg-white/5 px-2 py-0.5 text-black/70 dark:text-white/80">{p}</span>
                                    {i < pipeline.length - 1 && <ChevronRight className="h-3 w-3 text-orange-500/70" />}
                                </motion.span>
                            ))}
                        </div>

                        {/* Tech marquee */}
                        <TechMarquee />
                    </div>
                </TiltCard>
            </BlurFade>
        </section>
    )
}