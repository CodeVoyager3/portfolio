import { BlogForm } from '@/components/admin/BlogForm';

export default function NewBlogPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">New Blog Post</h1>
            <BlogForm />
        </div>
    );
}
