"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { NavigationMenuDemo } from "@/components/navbar"
import { BlurFade } from "@/components/motion/animated-group"

interface Blog {
    title: string
    description: string
    image: string
    tags: string[]
    date: string
    slug: string
    category: "frontend" | "backend" | "devops" | "all"
}

type FilterCategory = "all" | "frontend" | "backend" | "devops"

function BlogCard({ blog }: { blog: Blog }) {
    return (
        <div className="blog-card">
            {/* Blog Image */}
            <div className="blog-image-container">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="blog-image"
                />
            </div>

            {/* Blog Content */}
            <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-description">{blog.description}</p>

                {/* Tags */}
                <div className="blog-tags">
                    {blog.tags.map((tag, index) => (
                        <span key={index} className="blog-tag">{tag}</span>
                    ))}
                </div>

                {/* Footer */}
                <div className="blog-footer">
                    <div className="blog-date">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {blog.date}
                    </div>
                    <Link href={`/blogs/${blog.slug}`} className="blog-read-more">
                        Read More <span className="arrow">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function BlogsPage() {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/blogs")
            .then(res => res.json())
            .then(data => {
                // Map DB fields to UI fields
                const mappedBlogs = data.map((b: any) => ({
                    title: b.title,
                    description: b.excerpt || '',
                    image: b.image || '/placeholder.png', // Fallback
                    tags: b.tags || [],
                    date: new Date(b.publishedDate || b.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    slug: b.slug,
                    category: b.category || 'all'
                }))
                setBlogs(mappedBlogs)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    // Count blogs by category
    const frontendCount = blogs.filter(b => b.category === "frontend").length
    const backendCount = blogs.filter(b => b.category === "backend").length

    // Filter blogs
    const filteredBlogs = activeFilter === "all"
        ? blogs
        : blogs.filter(b => b.category === activeFilter)

    if (loading) {
        return (
            <div className="max-w-2xl mx-auto px-4 pt-24 pb-8" style={{ backgroundColor: 'var(--background)' }}>
                <NavigationMenuDemo />
                <div className="text-center py-12">Loading blogs...</div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-4 pt-24 pb-8" style={{ backgroundColor: 'var(--background)' }}>
            <NavigationMenuDemo />

            {/* Page Header */}
            <BlurFade delay={0}>
                <div className="blogs-page-header">
                    <h1 className="blogs-page-title">Blogs</h1>
                    <p className="blogs-page-subtitle">
                        Thoughts, tutorials, and insights on web development.
                    </p>
                </div>
            </BlurFade>

            {/* Filter Section */}
            <BlurFade delay={0.1}>
                <div className="blogs-filter-section">
                    <span className="blogs-filter-label">Filter by Category</span>
                    <div className="blogs-filter-tabs">
                        <button
                            className={`blogs-filter-tab ${activeFilter === "all" ? "active" : ""}`}
                            onClick={() => setActiveFilter("all")}
                        >
                            All ({blogs.length})
                        </button>
                        <button
                            className={`blogs-filter-tab ${activeFilter === "frontend" ? "active" : ""}`}
                            onClick={() => setActiveFilter("frontend")}
                        >
                            Frontend ({frontendCount})
                        </button>
                        <button
                            className={`blogs-filter-tab ${activeFilter === "backend" ? "active" : ""}`}
                            onClick={() => setActiveFilter("backend")}
                        >
                            Backend ({backendCount})
                        </button>
                    </div>
                </div>
            </BlurFade>

            {/* All Blogs Header */}
            <BlurFade delay={0.15}>
                <div className="blogs-list-header">
                    <h2 className="blogs-list-title">
                        {activeFilter === "all" ? "All Blogs" : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Blogs`}
                    </h2>
                    <span className="blogs-count">({filteredBlogs.length} posts)</span>
                </div>
            </BlurFade>

            {/* Blogs Grid */}
            <div className="blogs-page-grid">
                {filteredBlogs.map((blog, index) => (
                    <BlurFade key={blog.slug} delay={0.1 + index * 0.05}>
                        <BlogCard blog={blog} />
                    </BlurFade>
                ))}
            </div>
        </div>
    )
}
