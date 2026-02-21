import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import PageLayout from '@/components/PageLayout';

export const revalidate = 3600;

async function getBlog(slug: string) {
    await dbConnect();
    const blog = await Blog.findOne({ slug, published: true });
    return blog;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    return (
        <PageLayout>
            <div className="mx-auto max-w-3xl pt-10 pb-16">
                <article>
                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                            <time dateTime={(blog.publishedDate ? new Date(blog.publishedDate) : new Date(blog.createdAt)).toISOString()}>
                                {format(new Date(blog.publishedDate || blog.createdAt), 'MMMM d, yyyy')}
                            </time>
                            <span>•</span>
                            <span className="text-xs font-medium uppercase tracking-wider px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full">{blog.category || 'General'}</span>
                        </div>
                        <h1 className="font-(family-name:--font-instrument-serif) italic text-3xl sm:text-4xl tracking-[0.01em] font-medium text-black dark:text-white mb-4">
                            {blog.title}
                        </h1>
                        {blog.image && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-8">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                    </header>

                    {/* Content */}
                    <div
                        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </article>

                <div className="mt-12 flex justify-center">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black/80 dark:text-white/80 text-sm font-medium rounded-full transition-colors"
                    >
                        ← Back to all blogs
                    </Link>
                </div>
            </div>
        </PageLayout>
    );
}
