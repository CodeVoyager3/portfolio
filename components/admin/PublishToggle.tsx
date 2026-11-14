'use client';

import { useState } from "react"
import { useRouter } from "next/navigation"

interface PublishToggleProps {
    repoId: number
    published: boolean
    pinned: boolean
}

export function PublishToggle({ repoId, published, pinned }: PublishToggleProps) {
    const [busy, setBusy] = useState(false)
    const router = useRouter()

    if (pinned) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[11px] font-medium text-orange-600 dark:text-orange-400">
                Pinned · Auto-published
            </span>
        )
    }

    const toggle = async () => {
        setBusy(true)
        try {
            const res = await fetch('/api/admin/github-publish', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ repoId, published: !published }),
            })
            if (res.ok) {
                router.refresh()
            }
        } finally {
            setBusy(false)
        }
    }

    return (
        <button
            onClick={toggle}
            disabled={busy}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors disabled:opacity-50 cursor-pointer ${
                published
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'border-border bg-secondary text-muted-foreground hover:text-foreground'
            }`}
        >
            {published ? 'Published' : 'Draft'}
        </button>
    )
}
