"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion"
import { BlurFade } from "@/components/motion/animated-group"

// ─── Framer Motion Variants ────────────────────────────────────────────────
const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const lineVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const arrowVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 1.6, ease: "easeInOut", delay: 1.2 },
    },
}

// ─── Particle burst helper ─────────────────────────────────────────────────
function Particles({ trigger }: { trigger: number }) {
    const [particles, setParticles] = useState<{ id: number; tx: number; ty: number; color: string }[]>([])

    useEffect(() => {
        if (trigger === 0) return
        const burst = Array.from({ length: 16 }, (_, i) => {
            const angle = (i / 16) * Math.PI * 2
            const dist = 40 + Math.random() * 60
            return {
                id: Date.now() + i,
                tx: Math.cos(angle) * dist,
                ty: Math.sin(angle) * dist,
                color: Math.random() > 0.5 ? "#e8c56a" : "rgba(200,220,255,0.9)",
            }
        })
        setParticles(burst)
        const t = setTimeout(() => setParticles([]), 900)
        return () => clearTimeout(t)
    }, [trigger])

    return (
        <div className="pointer-events-none absolute bottom-6 right-8 z-20">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute h-[3px] w-[3px] rounded-full"
                    style={{ background: p.color }}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    animate={{ opacity: 0, x: p.tx, y: p.ty, scale: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            ))}
        </div>
    )
}

// ─── Main Section ──────────────────────────────────────────────────────────
export function PersonalLifeSection() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    const [isHovered, setIsHovered] = useState(false)
    const [goalTrigger, setGoalTrigger] = useState(0)
    const [showGoalFlash, setShowGoalFlash] = useState(false)

    // 3D tilt
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springConfig = { stiffness: 200, damping: 20 }
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig)
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig)

    // Trigger goal celebration when path finishes drawing
    useEffect(() => {
        if (!isInView) return
        const t = setTimeout(() => {
            setGoalTrigger((n) => n + 1)
            setShowGoalFlash(true)
            setTimeout(() => setShowGoalFlash(false), 800)
        }, 3000)
        return () => clearTimeout(t)
    }, [isInView])

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    function handleMouseLeave() {
        mouseX.set(0)
        mouseY.set(0)
        setIsHovered(false)
    }

    function handleClick() {
        setGoalTrigger((n) => n + 1)
        setShowGoalFlash(true)
        setTimeout(() => setShowGoalFlash(false), 800)
    }

    const textLines = [
        <>Outside of tech, I&apos;m a big <strong className="text-neutral-900 dark:text-white/85 font-medium">football fan</strong>. I genuinely enjoy watching football —</>,
        <>the joy of big matches, the late goals, and those intense <strong className="text-neutral-900 dark:text-white/85 font-medium">Champions League nights</strong></>,
        <>that keep me glued to the screen.</>,
        <></>,
        <>Football has taught me to <strong className="text-neutral-900 dark:text-white/85 font-medium">stay patient, keep pushing</strong>, and believe things can</>,
        <>turn around — and I carry that same mindset into everything I build.</>,
    ]

    return (
        <section className="w-full mb-16" ref={ref}>
            {/* Header */}
            <BlurFade delay={0}>
                <div className="mb-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Beyond Code</p>
                    <h2 className="text-xl font-bold text-black dark:text-white">Personal Life</h2>
                </div>
            </BlurFade>

            {/* Card */}
            <BlurFade delay={0.1}>
                <motion.div
                    className="relative w-full cursor-default"
                    style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    whileHover={{ z: 6 }}
                    transition={{ duration: 0.1 }}
                >
                    {/* Gradient border glow */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-[10px] z-0"
                        style={{
                            background: "linear-gradient(135deg, rgba(201,168,76,0.5), transparent 40%, rgba(100,140,255,0.3) 100%)",
                        }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    />

                    {/* Main card */}
                    <div className="relative w-full overflow-hidden rounded-[10px] border border-black/10 dark:border-white/5 bg-white dark:bg-white/5 p-6 sm:p-8">

                        {/* Pitch lines background */}
                        <svg
                            className="pointer-events-none absolute inset-0 h-full w-full opacity-100"
                            viewBox="0 0 700 260"
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Alternating stripes */}
                            {[0, 200, 400, 600].map((x) => (
                                <rect key={x} x={x} y="0" width="100" height="260" fill="rgba(255,255,255,0.012)" />
                            ))}
                            <line x1="350" y1="0" x2="350" y2="260" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
                            <ellipse cx="350" cy="130" rx="70" ry="55" stroke="rgba(201,168,76,0.06)" strokeWidth="1" fill="none" />
                            <circle cx="350" cy="130" r="3" fill="rgba(201,168,76,0.12)" />
                        </svg>

                        {/* Pitch lines hover overlay */}
                        <motion.svg
                            className="pointer-events-none absolute inset-0 h-full w-full"
                            viewBox="0 0 700 260"
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <line x1="350" y1="0" x2="350" y2="260" stroke="rgba(201,168,76,0.14)" strokeWidth="1" />
                            <ellipse cx="350" cy="130" rx="80" ry="60" stroke="rgba(201,168,76,0.12)" strokeWidth="1" fill="none" />
                            <line x1="0" y1="130" x2="700" y2="130" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
                        </motion.svg>

                        {/* Decorative quotes */}
                        <motion.span
                            className="absolute left-4 top-3 select-none font-serif text-5xl leading-none"
                            animate={{
                                color: isHovered ? "rgba(201,168,76,0.22)" : "rgba(255,255,255,0.05)",
                                textShadow: isHovered ? "0 0 30px rgba(201,168,76,0.3)" : "none",
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            &ldquo;
                        </motion.span>
                        <motion.span
                            className="absolute bottom-3 right-4 select-none font-serif text-5xl leading-none"
                            animate={{
                                color: isHovered ? "rgba(201,168,76,0.22)" : "rgba(255,255,255,0.05)",
                                textShadow: isHovered ? "0 0 30px rgba(201,168,76,0.3)" : "none",
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            &rdquo;
                        </motion.span>

                        {/* Text lines */}
                        <motion.div
                            className="relative z-10"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            {textLines.map((line, i) =>
                                i === 3 ? (
                                    <div key={i} className="mt-3" />
                                ) : (
                                    <motion.p
                                        key={i}
                                        className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400"
                                        variants={lineVariants}
                                    >
                                        {line}
                                    </motion.p>
                                )
                            )}
                        </motion.div>

                        {/* Pass path arrow */}
                        <svg
                            className="pointer-events-none absolute bottom-0 left-0 h-[60px] w-full overflow-visible opacity-30"
                            viewBox="0 0 700 60"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.path
                                d="M 20 40 Q 200 10 400 35 Q 550 55 680 20"
                                stroke="rgba(201,168,76,0.5)"
                                strokeWidth="1"
                                fill="none"
                                variants={arrowVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            />
                            <motion.polygon
                                points="680,20 670,14 670,26"
                                fill="rgba(201,168,76,0.5)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isInView ? 1 : 0 }}
                                transition={{ delay: 2.8, duration: 0.3 }}
                            />
                        </svg>

                        {/* Goal flash */}
                        <motion.div
                            className="pointer-events-none absolute inset-0 z-10 rounded-[10px]"
                            style={{
                                background: "radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, transparent 70%)",
                            }}
                            animate={{ opacity: showGoalFlash ? [0, 1, 0] : 0 }}
                            transition={{ duration: 0.8 }}
                        />

                        {/* Particles */}
                        <Particles trigger={goalTrigger} />
                    </div>

                    {/* Hover box shadow */}
                    <motion.div
                        className="pointer-events-none absolute inset-0 rounded-[10px]"
                        animate={{
                            boxShadow: isHovered
                                ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.07)"
                                : "0 0 0 rgba(0,0,0,0)",
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </BlurFade>
        </section>
    )
}