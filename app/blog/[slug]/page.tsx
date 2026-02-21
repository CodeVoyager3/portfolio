import dbConnect from '@/lib/db'
import Blog from '@/models/Blog'
import { notFound } from 'next/navigation'
import PageLayout from '@/components/PageLayout'

export const dynamic = 'force-dynamic'

async function getBlog(slug: string) {
    await dbConnect()
    const blog = await Blog.findOne({ slug, published: true }).lean()
    if (!blog) return null
    return JSON.parse(JSON.stringify(blog))
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const blog = await getBlog(slug)

    if (!blog) {
        notFound()
    }

    return (
        <PageLayout>
            <div className="mx-auto max-w-3xl pt-10 pb-16">
                {/* Header */}
                <article>
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            {blog.category && (
                                <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                                    {blog.category}
                                </span>
                            )}
                            <span className="text-xs text-neutral-400 dark:text-neutral-500">
                                {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                                    month: 'long', day: 'numeric', year: 'numeric'
                                })}
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight mb-4">
                            {blog.title}
                        </h1>

                        {blog.excerpt && (
                            <p className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
                                {blog.excerpt}
                            </p>
                        )}
                    </div>

                    {/* Cover image */}
                    {blog.image && (
                        <div className="rounded-xl overflow-hidden mb-8">
                            <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover" />
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                            {blog.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </article>
            </div>
        </PageLayout>
    )
}
