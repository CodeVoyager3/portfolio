'use client'

interface SectionBorderProps {
    className?: string
}

export default function SectionBorder({ className = '' }: SectionBorderProps) {
    return (
        <div className={`my-10 h-px w-full bg-gradient-to-r from-transparent via-black/15 to-transparent dark:via-white/15 ${className}`} />
    )
}
