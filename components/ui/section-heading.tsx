"use client"

import { TextReveal } from "@/components/motion/text-reveal"
import { cn } from "@/lib/utils"

export function SectionHeading({
    eyebrow,
    title,
    className,
}: {
    eyebrow: string
    title: string
    className?: string
}) {
    return (
        <div className={cn("mb-6", className)}>
            <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[#f6821f]">{eyebrow}</span>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-black dark:text-white">
                    <TextReveal
                        as="span"
                        text={title}
                        split="word"
                        whileInView
                        once
                        blur={6}
                        yOffset="28%"
                        stagger={0.04}
                        spring={{ stiffness: 170, damping: 30, mass: 1 }}
                    />
                </h2>
                <span aria-hidden="true" className="flex-1 self-center border-t border-black/10 dark:border-white/10" />
            </div>
        </div>
    )
}
