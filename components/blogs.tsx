"use client"

import { useEffect, useState } from 'react'
import { BlurFade } from "@/components/motion/animated-group"

interface Blog {
    _id: string
    title: string
    slug: string
    excerpt?: string
    tags?: string[]
    image?: string
    category?: string
    published: boolean
    publishedDate: string
}

export function BlogsSection() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs')
                if (!res.ok) throw new Error('Failed to fetch blogs')
                const data = await res.json()
                // Only show published blogs
                const published = data.filter((b: Blog) => b.published)
                setBlogs(published)
            } catch (err) {
                console.error('Error fetching blogs:', err)
                setError('Failed to load blog posts')
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    if (loading) {
        return (
            <section className="w-full mb-16">
                <BlurFade delay={0}>
                    <div className="mb-4">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Featured</p>
                        <h2 className="text-xl font-bold text-black dark:text-white">Blogs</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden animate-pulse">
                                <div className="h-40 bg-neutral-200 dark:bg-neutral-700" />
                                <div className="p-4 space-y-3">
                                    <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded" />
                                    <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded" />
                                    <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </BlurFade>
            </section>
        )
    }

    if (error || blogs.length === 0) {
        return (
            <section className="w-full mb-16">
                <BlurFade delay={0}>
                    <div className="mb-4">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Featured</p>
                        <h2 className="text-xl font-bold text-black dark:text-white">Blogs</h2>
                    </div>
                    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 text-center">
                        <p className="text-neutral-500 dark:text-neutral-400">
                            {error || 'No blog posts yet. Stay tuned!'}
                        </p>
                    </div>
                </BlurFade>
            </section>
        )
    }

    return (
        <section className="w-full mb-16">
            <BlurFade delay={0}>
                <div className="mb-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Featured</p>
                    <h2 className="text-xl font-bold text-black dark:text-white">Blogs</h2>
                </div>
            </BlurFade>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blogs.map((blog, index) => (
                    <BlurFade key={blog._id} delay={0.05 * index}>
                        <a
                            href={`/blog/${blog.slug}`}
                            className="group/item block w-full"
                        >
                            <div className="flex flex-col gap-3 w-full p-1 bg-white dark:bg-white/5 border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out hover:border-black/20 dark:hover:border-white/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
                                {/* Blog Image */}
                                {blog.image && (
                                    <div className="relative overflow-hidden rounded-md w-full aspect-4/3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="rounded-md w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="w-full px-2 pb-3">
                                    {/* Title + Category */}
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <h3 className="text-[15px] leading-7 text-black/80 dark:text-white/80 font-medium line-clamp-1">
                                            {blog.title}
                                        </h3>
                                        {blog.category && (
                                            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-400 shrink-0">
                                                {blog.category}
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    {blog.excerpt && (
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
                                            {blog.excerpt}
                                        </p>
                                    )}

                                    {/* Tags */}
                                    {blog.tags && blog.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {blog.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 text-[10px] font-medium bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-400 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
                                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            {formatDate(blog.publishedDate)}
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
                        </a>
                    </BlurFade>
                ))}
            </div>
        </section>
    )
}
