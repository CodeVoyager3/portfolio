"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { NavigationMenuDemo } from "../components/navbar"
import { BlurFade } from "../components/motion/animated-group"

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
        <div className="research-card">
            {/* Research Image */}
            <div className="research-image-container">
                <img
                    src={research.image}
                    alt={research.title}
                    className="research-image"
                />
            </div>

            {/* Research Content */}
            <div className="research-content">
                <h3 className="research-title">{research.title}</h3>
                <p className="research-description">{research.description}</p>

                {/* Tags */}
                <div className="research-tags">
                    {research.tags.map((tag, index) => (
                        <span key={index} className="research-tag">{tag}</span>
                    ))}
                </div>

                {/* Footer */}
                <div className="research-footer">
                    <div className="research-date">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {research.date}
                    </div>
                    <Link href={`/research/${research.slug}`} className="research-read-more">
                        Read More <span className="arrow">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function ResearchPage() {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
    const [researches, setResearches] = useState<Research[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/research")
            .then(res => res.json())
            .then(data => {
                setResearches(data)
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
            <div className="max-w-2xl mx-auto px-4 pt-24 pb-8" style={{ backgroundColor: 'var(--background)' }}>
                <NavigationMenuDemo />
                <div className="text-center py-12">Loading research papers...</div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-4 pt-24 pb-8" style={{ backgroundColor: 'var(--background)' }}>
            <NavigationMenuDemo />

            {/* Page Header */}
            <BlurFade delay={0}>
                <div className="research-page-header">
                    <h1 className="research-page-title">Research</h1>
                    <p className="research-page-subtitle">
                        Explorations in AI, machine learning, and cutting-edge technology.
                    </p>
                </div>
            </BlurFade>

            {/* Filter Section */}
            <BlurFade delay={0.1}>
                <div className="research-filter-section">
                    <span className="research-filter-label">Filter by Category</span>
                    <div className="research-filter-tabs">
                        <button
                            className={`research-filter-tab ${activeFilter === "all" ? "active" : ""}`}
                            onClick={() => setActiveFilter("all")}
                        >
                            All ({researches.length})
                        </button>
                        <button
                            className={`research-filter-tab ${activeFilter === "ai-ml" ? "active" : ""}`}
                            onClick={() => setActiveFilter("ai-ml")}
                        >
                            AI/ML ({aiMlCount})
                        </button>
                        <button
                            className={`research-filter-tab ${activeFilter === "nlp" ? "active" : ""}`}
                            onClick={() => setActiveFilter("nlp")}
                        >
                            NLP ({nlpCount})
                        </button>
                        <button
                            className={`research-filter-tab ${activeFilter === "computer-vision" ? "active" : ""}`}
                            onClick={() => setActiveFilter("computer-vision")}
                        >
                            Computer Vision ({cvCount})
                        </button>
                    </div>
                </div>
            </BlurFade>

            {/* All Research Header */}
            <BlurFade delay={0.15}>
                <div className="research-list-header">
                    <h2 className="research-list-title">
                        {activeFilter === "all" ? "All Research" : `${activeFilter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Research`}
                    </h2>
                    <span className="research-count">({filteredResearch.length} papers)</span>
                </div>
            </BlurFade>

            {/* Research Grid */}
            <div className="research-page-grid">
                {filteredResearch.map((research, index) => (
                    <BlurFade key={research.slug} delay={0.1 + index * 0.05}>
                        <ResearchCard research={research} />
                    </BlurFade>
                ))}
            </div>
        </div>
    )
}
