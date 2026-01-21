import Link from 'next/link';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { format } from 'date-fns';
import { Plus, Edit, Trash } from 'lucide-react';
import { DeleteButton } from '@/components/admin/DeleteButton';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

async function getBlogs() {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ publishedDate: -1 });
    // Serialize Mongoose documents to plain objects to avoid serialization warnings
    return blogs.map(doc => ({
        _id: doc._id.toString(),
        title: doc.title,
        slug: doc.slug,
        published: doc.published,
        createdAt: doc.createdAt,
        publishedDate: doc.publishedDate,
    }));
}

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">Blogs</h1>
                <Link
                    href="/admin/blogs/new"
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    New Post
                </Link>
            </div>

            <div className="rounded-md border border-border bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-muted-foreground">
                        <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">Title</th>
                                <th className="px-6 py-3 font-medium hidden md:table-cell">Status</th>
                                <th className="px-6 py-3 font-medium hidden md:table-cell">Date</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center">No blogs found.</td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-card-foreground">
                                            {blog.title}
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${blog.published
                                                ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/10 dark:text-green-400 dark:ring-green-400/20'
                                                : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900/10 dark:text-yellow-500 dark:ring-yellow-400/20'
                                                }`}>
                                                {blog.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            {format(new Date(blog.publishedDate || blog.createdAt), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/blogs/${blog._id}`}
                                                    className="rounded p-1 hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <DeleteButton id={blog._id} collection="blogs" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
