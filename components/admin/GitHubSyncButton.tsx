'use client';

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RefreshCw } from "lucide-react"

export function GitHubSyncButton() {
    const [syncing, setSyncing] = useState(false)
    const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)
    const router = useRouter()

    const handleSync = async () => {
        setSyncing(true)
        setResult(null)
        try {
            const res = await fetch('/api/admin/github-sync', { method: 'POST' })
            const data = await res.json()
            if (res.ok) {
                const parts = [`Synced ${data.synced} repos`]
                if (data.hasToken) parts.push(`${data.pinned} pinned`)
                setResult({ ok: true, message: parts.join(' · ') })
                router.refresh()
            } else {
                setResult({ ok: false, message: data.error || 'Sync failed' })
            }
        } catch {
            setResult({ ok: false, message: 'Sync failed. Check server logs.' })
        } finally {
            setSyncing(false)
        }
    }

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={handleSync}
                disabled={syncing}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
            >
                <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing...' : 'Sync from GitHub'}
            </button>
            {result && (
                <span className={`text-sm ${result.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                    {result.message}
                </span>
            )}
        </div>
    )
}
