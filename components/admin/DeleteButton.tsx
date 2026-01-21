'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash, Loader2 } from 'lucide-react';

interface DeleteButtonProps {
    id: string;
    collection: 'blogs' | 'projects' | 'papers'; // 'papers' maps to /api/papers which handles research papers
}

export function DeleteButton({ id, collection }: DeleteButtonProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/${collection}/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete');
            }

            router.refresh();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete item');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded p-1 hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete"
        >
            {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash className="h-4 w-4" />
            )}
        </button>
    );
}
