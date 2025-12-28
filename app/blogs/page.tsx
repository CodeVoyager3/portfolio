"use client"

import { useState } from "react"
import Link from "next/link"
import { NavigationMenuDemo } from "../components/navbar"
import { BlurFade } from "../components/motion/animated-group"

interface Blog {
    title: string
    description: string
    image: string
    tags: string[]
    date: string
    slug: string
    category: "frontend" | "backend" | "devops" | "all"
}

const blogs: Blog[] = [
    {
        title: "What is taste and how can you develop it?",
        description: "Understanding what is taste, resources and how to practice",
        image: "/blogs/taste.png",
        tags: ["Frontend", "Design"],
        date: "December 7, 2025",
        slug: "what-is-taste",
        category: "frontend"
    },
    {
        title: "Go in bits",
        description: "Archive of all the links from my socials for go tuts.",
        image: "/blogs/go-bits.png",
        tags: ["Go", "Development", "Backend"],
        date: "October 2, 2025",
        slug: "go-in-bits",
        category: "backend"
    },
    {
        title: "Building Scalable APIs with Node.js",
        description: "Best practices for building production-ready REST APIs",
        image: "/blogs/nodejs-api.png",
        tags: ["Node.js", "Backend", "API"],
        date: "September 15, 2025",
        slug: "scalable-apis-nodejs",
        category: "backend"
    },
    {
        title: "Modern CSS Techniques in 2025",
        description: "Exploring container queries, cascade layers, and more",
        image: "/blogs/modern-css.png",
        tags: ["CSS", "Frontend", "Design"],
        date: "August 22, 2025",
        slug: "modern-css-2025",
        category: "frontend"
    }
]

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

    // Count blogs by category
    const frontendCount = blogs.filter(b => b.category === "frontend").length
    const backendCount = blogs.filter(b => b.category === "backend").length

    // Filter blogs
    const filteredBlogs = activeFilter === "all"
        ? blogs
        : blogs.filter(b => b.category === activeFilter)

    return (
        <div className="max-w-2xl mx-auto px-4 pt-24 pb-8" style={{ backgroundColor: 'var(--background)' }}>
            <NavigationMenuDemo />

            {/* Page Header */}
            <BlurFade delay={0} inView={false}>
                <div className="blogs-page-header">
                    <h1 className="blogs-page-title">Blogs</h1>
                    <p className="blogs-page-subtitle">
                        Thoughts, tutorials, and insights on web development.
                    </p>
                </div>
            </BlurFade>

            {/* Filter Section */}
            <BlurFade delay={0.1} inView={false}>
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
            <BlurFade delay={0.15} inView={false}>
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
                    <BlurFade key={blog.slug} delay={0.2 + index * 0.1} inView={false}>
                        <BlogCard blog={blog} />
                    </BlurFade>
                ))}
            </div>
        </div>
    )
}
