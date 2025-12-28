"use client"

import { motion, Variants } from "framer-motion"
import React from "react"

interface AnimatedGroupProps {
    children: React.ReactNode
    className?: string
    variants?: {
        container?: Variants
        item?: Variants
    }
    delay?: number
}

const defaultContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}

const defaultItemVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: "blur(12px)",
        y: 20,
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 1.5,
        },
    },
}

export function AnimatedGroup({
    children,
    className,
    variants,
    delay = 0,
}: AnimatedGroupProps) {
    const containerVariants = variants?.container || defaultContainerVariants
    const itemVariants = variants?.item || defaultItemVariants

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: containerVariants.hidden,
                visible: {
                    ...(containerVariants.visible as object),
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {React.Children.map(children, (child) => (
                <motion.div variants={itemVariants}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    )
}

interface BlurFadeProps {
    children: React.ReactNode
    className?: string
    delay?: number
    inView?: boolean
}

export function BlurFade({ children, className, delay = 0, inView = true }: BlurFadeProps) {
    if (inView) {
        return (
            <motion.div
                initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.8,
                    delay,
                }}
                className={className}
            >
                {children}
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
                type: "spring",
                bounce: 0.3,
                duration: 0.8,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function FadeIn({ children, className, delay = 0 }: BlurFadeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: "easeOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
