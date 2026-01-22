
import Link from "next/link"
import { BlurFade } from "@/components/motion/animated-group"
import { DataService } from "@/lib/data-service"
import { Blog } from "@/types"

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

export async function BlogsSection() {
    const blogs = await DataService.getFeaturedBlogs();

    return (
        <section className="blogs-section">
            {/* Section Header */}
            <BlurFade delay={0}>
                <div className="blogs-header">
                    <span className="blogs-label">Featured</span>
                    <h2 className="blogs-title">Blogs</h2>
                </div>
            </BlurFade>

            {/* Blogs Grid */}
            {blogs.length > 0 ? (
                <div className="blogs-grid">
                    {blogs.map((blog, index) => (
                        <BlurFade key={blog.slug} delay={0.1 + index * 0.1}>
                            <BlogCard blog={blog} />
                        </BlurFade>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <p>No featured blogs found.</p>
                </div>
            )}

            {/* Show All Button */}
            <BlurFade delay={0.2}>
                <div className="blogs-cta">
                    <Link href="/blogs" className="show-all-btn">
                        View all blogs
                    </Link>
                </div>
            </BlurFade>
        </section>
    )
}

