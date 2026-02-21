"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BlurFade } from "@/components/motion/animated-group"

interface Research {
    title: string
    description: string
    image: string
    tags: string[]
    date: string
    slug: string
    category: "ai-ml" | "nlp" | "computer-vision" | "all"
}

type FilterCategory = "all" | "ai-ml" | "nlp" | "computer-vision"

function ResearchCard({ research }: { research: Research }) {
    return (
        <div className="group/item block w-full">
            <div className="flex flex-col gap-3 w-full p-1 bg-white dark:bg-white/5 border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out hover:border-black/20 dark:hover:border-white/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
                {/* Research Image */}
                <div className="relative overflow-hidden rounded-md w-full aspect-4/3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <img
                        src={research.image}
                        alt={research.title}
                        className="rounded-md w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="w-full px-2 pb-3">
                    {/* Title + Category */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-[15px] leading-7 text-black/80 dark:text-white/80 font-medium line-clamp-1">
                            {research.title}
                        </h3>
                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-400 shrink-0 capitalize">
                            {research.category}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
                        {research.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {research.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 text-[10px] font-medium bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-400 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {research.date}
                        </div>
                        <Link href={`/research/${research.slug}`} className="text-xs text-neutral-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
                            Read More
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

import PageLayout from "@/components/PageLayout"

export default function ResearchPage() {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
    const [researches, setResearches] = useState<Research[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/papers")
            .then(res => res.json())
            .then(data => {
                const mappedResearch = data.map((r: any) => ({
                    title: r.title,
                    description: r.description,
                    image: r.image || '/placeholder.png',
                    tags: r.tags || [],
                    date: new Date(r.publishedDate || r.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    slug: r.slug,
                    category: r.category || 'all'
                }));
                setResearches(mappedResearch)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    // Count research by category
    const aiMlCount = researches.filter(r => r.category === "ai-ml").length
    const nlpCount = researches.filter(r => r.category === "nlp").length
    const cvCount = researches.filter(r => r.category === "computer-vision").length

    // Filter research
    const filteredResearch = activeFilter === "all"
        ? researches
        : researches.filter(r => r.category === activeFilter)

    if (loading) {
        return (
            <PageLayout>
                <div className="text-center py-12">Loading research papers...</div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            {/* Page Header */}
            <BlurFade delay={0}>
                <div className="text-center pt-8 pb-6">
                    <h1 className="font-(family-name:--font-instrument-serif) italic text-3xl sm:text-4xl tracking-[0.01em] font-medium text-black dark:text-white mb-2">Research</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
                        Explorations in AI, machine learning, and cutting-edge technology.
                    </p>
                </div>
            </BlurFade>

            {/* Filter Section */}
            <BlurFade delay={0.1}>
                <div className="mb-6">
                    <span className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3 uppercase tracking-wider">Filter by Category</span>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${activeFilter === "all" ? "bg-black dark:bg-white text-white dark:text-black" : "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20"}`}
                            onClick={() => setActiveFilter("all")}
                        >
                            All ({researches.length})
                        </button>
                        <button
                            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${activeFilter === "ai-ml" ? "bg-black dark:bg-white text-white dark:text-black" : "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20"}`}
                            onClick={() => setActiveFilter("ai-ml")}
                        >
                            AI/ML ({aiMlCount})
                        </button>
                        <button
                            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${activeFilter === "nlp" ? "bg-black dark:bg-white text-white dark:text-black" : "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20"}`}
                            onClick={() => setActiveFilter("nlp")}
                        >
                            NLP ({nlpCount})
                        </button>
                        <button
                            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${activeFilter === "computer-vision" ? "bg-black dark:bg-white text-white dark:text-black" : "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20"}`}
                            onClick={() => setActiveFilter("computer-vision")}
                        >
                            Computer Vision ({cvCount})
                        </button>
                    </div>
                </div>
            </BlurFade>

            {/* All Research Header */}
            <BlurFade delay={0.15}>
                <div className="flex items-baseline gap-2 mb-4">
                    <h2 className="text-lg font-semibold text-black dark:text-white">
                        {activeFilter === "all" ? "All Research" : `${activeFilter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Research`}
                    </h2>
                    <span className="text-sm text-neutral-400 dark:text-neutral-500">({filteredResearch.length} papers)</span>
                </div>
            </BlurFade>

            {/* Research Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredResearch.map((research, index) => (
                    <BlurFade key={research.slug} delay={0.1 + index * 0.05}>
                        <ResearchCard research={research} />
                    </BlurFade>
                ))}
            </div>
        </PageLayout>
    )
}
