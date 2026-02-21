
import Link from "next/link"
import { BlurFade } from "@/components/motion/animated-group"
import { DataService } from "@/lib/data-service"
import { Research } from "@/types"

function ResearchCard({ research }: { research: Research }) {
    return (
        <Link href={`/research/${research.slug}`} className="group/item block w-full">
            <div className="flex flex-col gap-3 w-full p-1 bg-white dark:bg-white/[0.05] border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out hover:border-black/20 dark:hover:border-white/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
                {/* Research Image */}
                <div className="relative overflow-hidden rounded-md w-full aspect-[16/9] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <img
                        src={research.image}
                        alt={research.title}
                        className="rounded-md w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="w-full px-2 pb-3">
                    {/* Title */}
                    <h3 className="text-[15px] leading-6 text-black/80 dark:text-white/80 font-medium mb-2 line-clamp-2">
                        {research.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
                        {research.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {research.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 text-[10px] font-medium bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-400 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {research.date}
                        </div>
                        <span className="text-xs text-neutral-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
                            Read More
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export async function ResearchSection() {
    const researches = await DataService.getFeaturedResearch();

    return (
        <section className="w-full mb-16">
            {/* Section Header */}
            <BlurFade delay={0}>
                <div className="mb-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Featured</p>
                    <h2 className="text-xl font-bold text-black dark:text-white">Research</h2>
                </div>
            </BlurFade>

            {/* Research Grid */}
            {researches.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group">
                    {researches.map((research, index) => (
                        <BlurFade key={research.slug} delay={0.1 + index * 0.1}>
                            <ResearchCard research={research} />
                        </BlurFade>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
                    <p>No featured research found.</p>
                </div>
            )}

            {/* View All */}
            <BlurFade delay={0.2}>
                <div className="mt-6 text-center">
                    <Link
                        href="/research"
                        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                        View all research
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </BlurFade>
        </section>
    )
}
