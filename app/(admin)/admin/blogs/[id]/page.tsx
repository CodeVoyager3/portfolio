import { BlogForm } from '@/components/admin/BlogForm';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    await dbConnect();

    const { id } = await params;

    // Validate ID format (basic check)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        notFound();
    }

    const blog = await Blog.findById(id);

    if (!blog) {
        notFound();
    }

    const serializedBlog = {
        _id: blog._id.toString(),
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        excerpt: blog.excerpt || '',
        image: blog.image || '',
        category: blog.category || 'frontend',
        published: blog.published,
        featured: blog.featured,
        publishedDate: blog.publishedDate ? new Date(blog.publishedDate).toISOString() : new Date().toISOString(),
        tags: blog.tags || [],
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Edit Blog Post</h1>
            <BlogForm initialData={serializedBlog} isEditing />
        </div>
    );
}
