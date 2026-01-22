import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { NavigationMenuDemo } from "@/components/navbar";

// Force dynamic since we might use ISR (revalidate) properly, 
// but for simplicity dynamic or revalidate=0.
// Actually, for blogs, revalidate = 3600 is good.
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
        <div className="max-w-2xl mx-auto px-4 pt-24 pb-8" style={{ backgroundColor: 'var(--background)' }}>
            <NavigationMenuDemo />

            <article className="prose prose-zinc dark:prose-invert mx-auto mt-8">
                {/* Header */}
                <header className="mb-8 not-prose">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <time dateTime={(blog.publishedDate ? new Date(blog.publishedDate) : new Date(blog.createdAt)).toISOString()}>
                            {format(new Date(blog.publishedDate || blog.createdAt), 'MMMM d, yyyy')}
                        </time>
                        <span>•</span>
                        <span className="capitalize">{blog.category || 'General'}</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                        {blog.title}
                    </h1>
                    {blog.image && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border mb-8">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}
                </header>

                {/* Content */}
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </article>

            <div className="mt-12 flex justify-center">
                <Link href="/blogs" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    ← Back to all blogs
                </Link>
            </div>
        </div>
    );
}
