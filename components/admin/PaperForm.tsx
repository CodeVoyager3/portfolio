'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

interface PaperFormProps {
    initialData?: {
        _id?: string;
        title: string;
        description: string;
        pdfUrl: string;
        slug?: string;
        image?: string;
        tags?: string[];
        category?: string;
        publishedDate?: string;
        featured?: boolean;
    };
    isEditing?: boolean;
}

export function PaperForm({ initialData, isEditing = false }: PaperFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            category: initialData?.category || 'ai-ml',
            tags: initialData?.tags?.join(', ') || '',
            publishedDate: initialData?.publishedDate ? new Date(initialData.publishedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        } as any,
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        setError('');

        try {
            const url = isEditing ? `/api/papers/${initialData!._id}` : '/api/papers';
            const method = isEditing ? 'PUT' : 'POST';

            if (typeof data.tags === 'string') {
                data.tags = data.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
            }

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Something went wrong');
            }

            router.push('/admin/research');
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

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                    Paper Title
                </label>
                <input
                    {...register('title', { required: 'Title is required' })}
                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                    placeholder="Research Paper Title"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message as string}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                    Description
                </label>
                <textarea
                    {...register('description', { required: 'Description is required' })}
                    className="flex min-h-[100px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                    placeholder="Abstract or summary of the paper..."
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message as string}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                    PDF URL
                </label>
                <input
                    {...register('pdfUrl', { required: 'PDF URL is required' })}
                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                    placeholder="https://example.com/paper.pdf"
                />
                {errors.pdfUrl && <p className="text-red-500 text-sm">{errors.pdfUrl.message as string}</p>}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        Slug (ID)
                    </label>
                    <input
                        {...register('slug')}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                        placeholder="paper-slug-id"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        Cover Image URL
                    </label>
                    <input
                        {...register('image')}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                        placeholder="https://example.com/cover.png"
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
                    Tags (comma separated)
                </label>
                <input
                    {...register('tags')}
                    onChange={(e) => {
                        // Simple string handling, normally we'd parse this into array in onSubmit
                        // but for React Hook Form default values and dirty state, keeping it as array in state might be tricky
                        // if the input is text.
                        // Actually, my form onSubmit handles string->array conversion for OTHER forms, let's verify PaperForm.
                        // PaperForm onSubmit does NOT handle tags string->array conversion yet. I need to add that.
                        // I will just rely on the user passing array via some other means or update onSubmit in next step.
                        // For now, let's assume register('tags') binds to array which won't work with text input directly.
                        // Converting to string-based input for now.
                        return e;
                    }}
                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                    placeholder="AI, ML, Data Science"
                />
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
                    Mark as Featured Paper?
                </label>
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
                    {isEditing ? 'Update Paper' : 'Add Paper'}
                </button>
            </div>
        </form>
    );
}
