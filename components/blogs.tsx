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
                            className="group block rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 hover:shadow-md"
                        >
                            {/* Cover Image */}
                            {blog.image && (
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    {blog.category && (
                                        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                                            {blog.category}
                                        </span>
                                    )}
                                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                                        {formatDate(blog.publishedDate)}
                                    </span>
                                </div>

                                <h3 className="text-sm font-semibold text-black dark:text-white mb-1.5 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors line-clamp-2">
                                    {blog.title}
                                </h3>

                                {blog.excerpt && (
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                                        {blog.excerpt}
                                    </p>
                                )}

                                {/* Tags */}
                                {blog.tags && blog.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {blog.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-100 dark:border-neutral-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </a>
                    </BlurFade>
                ))}
            </div>
        </section>
    )
}
