// Optimized animation variants for framer-motion
export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
}

export const fadeInScale = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
}

export const slideInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 }
}

export const slideInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 }
}

export const scaleOnHover = {
    hover: { scale: 1.02, transition: { duration: 0.15 } },
    tap: { scale: 0.98 }
}

// Optimized transition configurations
export const easeOutTransition = {
    duration: 0.4,
    ease: "easeOut"
}

export const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 25
}

// Optimized stagger animations
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05
        }
    }
}

export const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
}
