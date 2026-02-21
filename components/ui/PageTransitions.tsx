'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export const FadeInUp = ({
    children,
    delay = 0,
    duration = 0.4,
    className = '',
    once = true
}: {
    children: ReactNode
    delay?: number
    duration?: number
    className?: string
    once?: boolean
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                duration,
                delay,
                ease: "easeOut"
            }}
            viewport={{ once, amount: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const FadeInScale = ({
    children,
    delay = 0,
    duration = 0.3,
    className = '',
    once = true
}: {
    children: ReactNode
    delay?: number
    duration?: number
    className?: string
    once?: boolean
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
                duration,
                delay,
                ease: "easeOut"
            }}
            viewport={{ once, amount: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const SlideInFromLeft = ({
    children,
    delay = 0,
    className = '',
    once = true
}: {
    children: ReactNode
    delay?: number
    className?: string
    once?: boolean
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.4,
                delay,
                ease: "easeOut"
            }}
            viewport={{ once, amount: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const StaggerContainer = ({
    children,
    staggerDelay = 0.03,
    className = ''
}: {
    children: ReactNode
    staggerDelay?: number
    className?: string
}) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const StaggerItem = ({
    children,
    className = ''
}: {
    children: ReactNode
    className?: string
}) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.25,
                        ease: "easeOut"
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
