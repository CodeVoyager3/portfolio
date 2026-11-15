"use client"

import { useState } from "react"
import { ArrowUpRight, ChevronDown, ChevronUp, Layers, ShieldCheck, Factory, QrCode, Cpu, CheckCircle2, TrendingUp, Sparkles, Database } from "lucide-react"
import { BlurFade } from "@/components/motion/animated-group"
import { AnimatedBadge } from "@/components/motion/animated-badge"
import { TiltCard } from "@/components/motion/tilt-card"
import { SectionHeading } from "@/components/ui/section-heading"
import { motion, AnimatePresence } from "framer-motion"

interface CaseStudyModule {
    title: string
    tag: string
    icon: typeof Factory
    points: string[]
}

const caseStudyModules: CaseStudyModule[] = [
    {
        title: "Dynamic 3-Tier Bill of Materials (BOM) & Item Studio",
        tag: "Core Engine",
        icon: Layers,
        points: [
            "Hierarchical Blueprint Engine: Visual blueprint designer configuring dynamic spec attributes (leatherette grade, stitch colors, piping, diamond quilting).",
            "Automated Consumption Formulas: Programmed logic to auto-calculate raw fabric roll yardage based on vehicle seat count (2-seater coupe to 7-seater SUV), auto-deducting raw materials from the ledger upon work order release.",
            "Matrix Variant Generation: Engineered dynamic specHash generators preserving variant names, SKUs, and BOM overrides per row, resolving 300,000+ combinatorial SKUs without static record bloat.",
        ],
    },
    {
        title: "Shop Floor Execution & Touchscreen Kiosks (/worker & /supervisor)",
        tag: "Floor MES",
        icon: Factory,
        points: [
            "Worker Touch Kiosk: High-contrast, large-button UI tailored for industrial tablets with 4-digit PIN authentication (eliminating passwords for factory operators).",
            "FIFO Material Allocation: Implemented batch-level inventory reservations (planFifoIssue) ensuring oldest leather rolls are cut first to prevent fabric lot aging and waste.",
            "Anti-Waste Production Locks: Enforced strict reservation limits blocking operators from consuming excess materials without supervisor override.",
            "Zero-Paper Traveler Barcodes: Real-time SSE live event bus broadcasting order progress across 5 stages (CAD → CNC Cutting → Stitching → Digital QC → Logistics Packing).",
        ],
    },
    {
        title: "Digital Quality Control & Product Passport (/inspector & /verify/[id])",
        tag: "QC & Trust",
        icon: QrCode,
        points: [
            "Digital Checkpoint Verification: Replaced paper clipboards with inspection checklists mandating stitch pitch, seam tension, and photo/video evidence upload.",
            "Closed-Loop Rework Engine: Automated rework tickets with root-cause categorization, instantly routing defective pieces back to the responsible workstation.",
            "Public Product Passport: Built a high-trust, Apple-Wallet-styled public verification page accessible via encrypted QR code on packaging, displaying authenticity seals, vehicle fitment specs, operator signatures, and inspection photos.",
        ],
    },
    {
        title: "Operations, Delivery Logistics & Multi-Carrier Engine",
        tag: "Logistics",
        icon: TrendingUp,
        points: [
            "B2C Delivery Rules: Standard ground rates, optional Express Air priority delivery toggle (24–48h), dynamic cart motivational progress bar ('Add ₹X more for Free Delivery'), and COD handling surcharges.",
            "B2B Dedicated Fleet Modes: Configured CarXen Dedicated Transport (₹0 Upfront, Flat Commercial Freight with waiver thresholds, or To-Pay on Delivery).",
            "Bulky & Heavy Cargo Surcharges: Automated category selector applying oversized freight handling fees automatically to heavy automotive accessories.",
        ],
    },
    {
        title: "Headless E-Commerce & B2B Wholesale Portal",
        tag: "Commerce & Security",
        icon: ShieldCheck,
        points: [
            "Server-Authoritative Pricing & Statutory Tax: Built a secure checkout pricing calculation engine with statutory 18% GST breakup (9% CGST + 9% SGST / 18% IGST) and B2B wholesale COD rules.",
            "B2B Wholesale Portal: Wholesale dealer workflows with minimum order quantities (MOQ), tiered commercial discounts, reloadable orders dossiers, and collision-free order IDs.",
            "Security & Auth Hardening: Cryptographically signed HMAC tokens (jose) in httpOnly cookies, verified password confirmations, and server-side ownership checks completely eliminating IDOR vulnerabilities.",
            "Customer Garage & Fitment Selector: Authoritative vehicle taxonomy (Make → Model → Gen → Variant → Seating Layout) synchronized with factory inventory, preventing custom fabrication mis-fits.",
        ],
    },
]

const techBadges = [
    "Next.js 16 (App Router)",
    "React 19",
    "TypeScript",
    "PostgreSQL",
    "Prisma ORM",
    "Supabase (PgBouncer)",
    "Offline-First PWA / IndexedDB",
    "SSE Live Bus",
    "Tailwind CSS",
    "Framer Motion",
    "Jose (HMAC/JWT)",
    "Razorpay",
]

const impactStats = [
    { value: "300,000+", label: "Combinatorial SKUs", sub: "Dynamic 3-Tier BOM Engine" },
    { value: "5-Stage", label: "Shop Floor Pipeline", sub: "CAD → CNC → Stitch → QC → Pack" },
    { value: "~45%", label: "Query Latency Reduction", sub: "Mumbai Colocation & Pooling" },
    { value: "Zero", label: "Data Loss on Floor", sub: "Offline-First PWA & IndexedDB" },
]

export function ExperienceSection() {
    const [logoFailed, setLogoFailed] = useState(false)
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)

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

                        {/* Project Spotlight Badge & Executive Summary */}
                        <div className="flex flex-col gap-2.5 pt-1 border-t border-black/5 dark:border-white/5">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                                    <Sparkles className="w-3 h-3" />
                                    Flagship System: CarXen VEDA & Omnichannel Commerce
                                </span>
                                <span className="text-xs text-neutral-400 dark:text-neutral-500 hidden sm:inline">
                                    Cloud MES, ERP & Headless Storefront
                                </span>
                            </div>

                            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                Architected and engineered <strong className="text-black/80 dark:text-white font-medium">VEDA</strong>, an end-to-end Factory Operating System & Manufacturing ERP tailored for custom automotive interior fabrication, alongside <strong className="text-black/80 dark:text-white font-medium">CarXen E-Commerce</strong>, a high-performance headless D2C & B2B wholesale platform. Replaced fragmented spreadsheets with automated production pipelines, double-entry inventory ledgers, and tamper-proof digital product passports.
                            </p>
                        </div>

                        {/* Quantifiable Highlights Metrics Grid */}
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

                        {/* Core Engineering Accomplishments List */}
                        <div className="flex flex-col gap-2.5 pt-1">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                Key Engineering Contributions
                            </h4>
                            <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                                <li className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-black/85 dark:text-white font-medium">Dynamic 3-Tier BOM Engine:</strong> Resolved 300,000+ combinatorial vehicle & upholstery configurations on the fly (Category Recipe → Attribute Addons → SKU Overrides), dynamically calculating exact fabric roll yardage, foam, and thread based on vehicle seating layout without static SKU records.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-black/85 dark:text-white font-medium">5-Stage Real-Time Shop Floor Execution:</strong> Digitized CAD → CNC Cutting → Stitching → Digital QC → Logistics Packing with 4-digit PIN tablet kiosks, FIFO batch reservations (`planFifoIssue`) preventing fabric lot aging, and real-time SSE live bus tracking.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-black/85 dark:text-white font-medium">Digital QC & Encrypted QR Product Passport:</strong> Gated final packaging with digital tolerance checklists and mandatory photo/video upload, issuing a public Apple-Wallet-styled verification portal (`/verify/[id]`) for consumers via tamper-proof QR code.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-black/85 dark:text-white font-medium">Statutory Tax & Omnichannel Logistics Engine:</strong> Implemented server-authoritative 18% GST (9% CGST + 9% SGST / 18% IGST), B2B wholesale COD rules, tiered MOQ commercial pricing, and automated multi-carrier freight logic (express air, dedicated transport fleet, bulky handling fees).
                                    </span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-black/85 dark:text-white font-medium">Offline-First PWA & Sub-Second Latency:</strong> Designed an offline-first PWA with client-side IndexedDB queue syncing to safeguard against shop floor Wi-Fi outages; colocated PostgreSQL instances in Mumbai (`ap-south-1`) with PgBouncer connection pooling to cut database query latency by ~45%.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Interactive Deep-Dive Case Study Accordion */}
                        <div className="pt-2 border-t border-black/5 dark:border-white/5">
                            <button
                                type="button"
                                onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                                className="w-full flex items-center justify-between p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] border border-black/5 dark:border-white/10 text-xs sm:text-sm font-medium text-black/80 dark:text-white/90 transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <Cpu className="w-4 h-4 text-orange-500" />
                                    {isDetailsExpanded ? "Hide Full Architectural Breakdown" : "View Deep-Dive Architectural Breakdown (5 Pillars)"}
                                </span>
                                {isDetailsExpanded ? (
                                    <ChevronUp className="w-4 h-4 text-neutral-400" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                                )}
                            </button>

                            <AnimatePresence>
                                {isDetailsExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 space-y-4">
                                            {caseStudyModules.map((mod, index) => {
                                                const IconComponent = mod.icon
                                                return (
                                                    <div
                                                        key={index}
                                                        className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-2.5"
                                                    >
                                                        <div className="flex items-center justify-between gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                                                                    <IconComponent className="w-3.5 h-3.5" />
                                                                </div>
                                                                <h5 className="text-xs sm:text-sm font-semibold text-black/90 dark:text-white">
                                                                    {mod.title}
                                                                </h5>
                                                            </div>
                                                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-neutral-500 dark:text-neutral-400 shrink-0">
                                                                {mod.tag}
                                                            </span>
                                                        </div>
                                                        <ul className="space-y-1.5 pl-9 text-xs text-neutral-600 dark:text-neutral-400 list-disc">
                                                            {mod.points.map((pt, pIdx) => (
                                                                <li key={pIdx} className="leading-relaxed">
                                                                    {pt}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Tech Stack Badges */}
                        <div className="pt-3 border-t border-black/5 dark:border-white/5">
                            <span className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                                Technologies & Infrastructure
                            </span>
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
