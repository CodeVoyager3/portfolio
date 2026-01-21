'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TiptapEditor } from './TiptapEditor';
import { Loader2 } from 'lucide-react';

interface BlogFormProps {
    initialData?: {
        _id?: string;
        title: string;
        slug: string;
        content: string;
        excerpt?: string;
        image?: string;
        category?: string;
        published: boolean;
        featured: boolean;
        publishedDate?: string;
        tags?: string[];
    };
    isEditing?: boolean;
}

export function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: initialData || {
            title: '',
            slug: '',
            content: '',
            excerpt: '',
            image: '',
            category: 'frontend',
            published: false,
            featured: false,
            publishedDate: new Date().toISOString().split('T')[0],
            tags: [],
        },
    });

    const content = watch('content');

    const onSubmit = async (data: any) => {
        setLoading(true);
        setError('');

        try {
            // Convert tags string back to array if managed as comma-separated string in UI
            // For now assuming simple text input or existing array management
            if (typeof data.tags === 'string') {
                data.tags = data.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
            }

            const url = isEditing ? `/api/blogs/${initialData!._id}` : '/api/blogs';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Something went wrong');
            }

            router.push('/admin/blogs');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {error && (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/10 dark:text-red-400">
                    {error}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-900 dark:text-zinc-50">
                        Title
                    </label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-indigo-600"
                        placeholder="Blog Title"
                        onChange={(e) => {
                            // Auto-generate slug from title if not editing and slug is empty
                            if (!isEditing) {
                                const slug = e.target.value
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, '-')
                                    .replace(/(^-|-$)/g, '');
                                setValue('slug', slug);
                            }
                            setValue('title', e.target.value);
                        }}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message as string}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        Slug
                    </label>
                    <input
                        {...register('slug', { required: 'Slug is required' })}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                        placeholder="blog-slug-example"
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        Cover Image URL
                    </label>
                    <input
                        {...register('image')}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                        placeholder="https://example.com/image.png"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        Published Date
                    </label>
                    <input
                        type="date"
                        {...register('publishedDate')}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                    Category
                </label>
                <select
                    {...register('category')}
                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="devops">DevOps</option>
                    <option value="all">Other</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                    Excerpt
                </label>
                <textarea
                    {...register('excerpt')}
                    className="flex min-h-[80px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                    placeholder="Short description for SEO and cards..."
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                    Content
                </label>
                <TiptapEditor
                    content={content}
                    onChange={(newContent) => setValue('content', newContent, { shouldValidate: true })}
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content.message as string}</p>}
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="published"
                        {...register('published')}
                        className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer"
                    />
                    <label
                        htmlFor="published"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-900 dark:text-zinc-50 cursor-pointer"
                    >
                        Publish immediately?
                    </label>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="featured"
                        {...register('featured')}
                        className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-600 dark:border-zinc-700 dark:bg-zinc-900 cursor-pointer"
                    />
                    <label
                        htmlFor="featured"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-900 dark:text-zinc-50 cursor-pointer"
                    >
                        Featured Post?
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-md px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
                >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isEditing ? 'Update Post' : 'Create Post'}
                </button>
            </div>
        </form>
    );
}
