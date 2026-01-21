'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

interface ProjectFormProps {
    initialData?: {
        _id?: string;
        title: string;
        description: string;
        techStack: string[];
        githubLink?: string;
        demoLink?: string;
        videoUrl?: string;
        thumbnail?: string;
        status?: string;
        featured?: boolean;
        publishedDate?: string;
    };
    isEditing?: boolean;
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            ...initialData,
            status: initialData?.status || 'building',
            techStack: initialData?.techStack?.join(', ') || '',
            publishedDate: initialData?.publishedDate ? new Date(initialData.publishedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        } as any, // casting for techStack string vs array handling
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        setError('');

        try {
            // Convert techStack string back to array
            if (typeof data.techStack === 'string') {
                data.techStack = data.techStack.split(',').map((t: string) => t.trim()).filter(Boolean);
            }

            const url = isEditing ? `/api/projects/${initialData!._id}` : '/api/projects';
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

            router.push('/admin/projects');
            router.refresh(); // Refresh server components
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
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        Title
                    </label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                        placeholder="Project Title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message as string}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        Tech Stack (comma separated)
                    </label>
                    <input
                        {...register('techStack', { required: 'Tech stack is required' })}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                        placeholder="React, Next.js, MongoDB"
                    />
                    {errors.techStack && <p className="text-red-500 text-sm">{errors.techStack.message as string}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                    Description
                </label>
                <textarea
                    {...register('description', { required: 'Description is required' })}
                    className="flex min-h-[120px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                    placeholder="Project description details..."
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message as string}</p>}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        GitHub Link
                    </label>
                    <input
                        {...register('githubLink')}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                        placeholder="https://github.com/..."
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        Demo Link
                    </label>
                    <input
                        {...register('demoLink')}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                        placeholder="https://my-project.com"
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        Video URL
                    </label>
                    <input
                        {...register('videoUrl')}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                        placeholder="https://youtube.com/..."
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        Thumbnail URL
                    </label>
                    <input
                        {...register('thumbnail')}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                        placeholder="https://cloudinary.com/..."
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

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50">
                        Status
                    </label>
                    <select
                        {...register('status')}
                        className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400"
                    >
                        <option value="building">Building</option>
                        <option value="operational">Operational</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>

                <div className="flex items-end pb-2">
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
                            Mark as Featured Project?
                        </label>
                    </div>
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
                    {isEditing ? 'Update Project' : 'Create Project'}
                </button>
            </div>
        </form>
    );
}
