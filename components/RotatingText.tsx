"use client"

import { useEffect, useState, useCallback } from "react"
import { AnimatePresence, motion, Transition, Variant } from "framer-motion"

interface RotatingTextProps {
    texts: string[]
    mainClassName?: string
    staggerFrom?: "first" | "last" | "center"
    initial?: Variant
    animate?: Variant
    exit?: Variant
    staggerDuration?: number
    splitLevelClassName?: string
    transition?: Transition
    rotationInterval?: number
}

export default function RotatingText({
    texts,
    mainClassName = "",
    staggerFrom = "last",
    initial = { y: "100%" },
    animate = { y: 0 },
    exit = { y: "-120%" },
    staggerDuration = 0.025,
    splitLevelClassName = "",
    transition = { type: "spring", damping: 30, stiffness: 400 },
    rotationInterval = 2000,
}: RotatingTextProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, [texts.length])

    useEffect(() => {
        const interval = setInterval(next, rotationInterval)
        return () => clearInterval(interval)
    }, [next, rotationInterval])

    const getStaggerDelay = (index: number, total: number) => {
        switch (staggerFrom) {
            case "first":
                return index * staggerDuration
            case "last":
                return (total - 1 - index) * staggerDuration
            case "center":
                const center = Math.floor(total / 2)
                return Math.abs(index - center) * staggerDuration
            default:
                return 0
        }
    }

    const currentText = texts[currentIndex]
    const characters = currentText.split("")

    return (
        <span className={mainClassName}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    className="inline-flex"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {characters.map((char, index) => (
                        <motion.span
                            key={`${currentIndex}-${index}`}
                            className={splitLevelClassName}
                            variants={{
                                initial,
                                animate,
                                exit,
                            }}
                            transition={{
                                ...transition,
                                delay: getStaggerDelay(index, characters.length),
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}
