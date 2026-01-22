
import Link from "next/link"
import { BlurFade } from "@/components/motion/animated-group"
import dbConnect from "@/lib/db"
import PaperModel from "@/models/Paper"

interface Research {
    title: string
    description: string
    image: string
    tags: string[]
    date: string
    slug: string
}

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

export async function ResearchSection() {
    await dbConnect()
    const rawResearch = await PaperModel.find({ featured: true })
        .sort({ publishedDate: -1 })
        .limit(2)
        .lean()

    const researches: Research[] = rawResearch.map((r: any) => ({
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
    }))

    return (
        <section className="research-section">
            {/* Section Header */}
            <BlurFade delay={0}>
                <div className="research-header">
                    <span className="research-label">Featured</span>
                    <h2 className="research-title-main">Research</h2>
                </div>
            </BlurFade>

            {/* Research Grid */}
            {researches.length > 0 && (
                <div className="research-grid">
                    {researches.map((research, index) => (
                        <BlurFade key={research.slug} delay={0.1 + index * 0.1}>
                            <ResearchCard research={research} />
                        </BlurFade>
                    ))}
                </div>
            )}

            {/* View All Button */}
            <BlurFade delay={0.2}>
                <div className="research-cta">
                    <Link href="/research" className="show-all-btn">
                        View all research
                    </Link>
                </div>
            </BlurFade>
        </section>
    )
}

