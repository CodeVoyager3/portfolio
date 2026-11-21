'use client';

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, ExternalLink, Loader2 } from "lucide-react"

interface ResumeMeta {
    fileName: string;
    size: number;
    updatedAt: string | null;
}

export function ResumeUploadForm({ initialMeta }: { initialMeta: ResumeMeta | null }) {
    const [meta, setMeta] = useState<ResumeMeta | null>(initialMeta)
    const [uploading, setUploading] = useState(false)
    const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)
    const [dragOver, setDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleFile = async (file: File) => {
        if (!file) return
        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
            setResult({ ok: false, message: 'Only PDF files are allowed.' })
            return
        }
        setUploading(true)
        setResult(null)
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch('/api/admin/resume', { method: 'POST', body: formData })
            const data = await res.json()
            if (res.ok) {
                setMeta(data.resume)
                setResult({ ok: true, message: `Uploaded ${file.name}` })
                router.refresh()
            } else {
                setResult({ ok: false, message: data.error || 'Upload failed' })
            }
        } catch {
            setResult({ ok: false, message: 'Upload failed. Check server logs.' })
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Current resume */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-card-foreground mb-1">Current Resume</h2>
                {meta ? (
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span className="font-medium text-card-foreground">{meta.fileName}</span>
                            <span>· {(meta.size / 1024).toFixed(0)} KB</span>
                            {meta.updatedAt && (
                                <span>· updated {new Date(meta.updatedAt).toLocaleString()}</span>
                            )}
                        </div>
                        <a
                            href={`/api/resume?t=${Date.now()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View PDF
                        </a>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">No resume uploaded yet. The site's &quot;Resume / CV&quot; button will 404 until you upload one.</p>
                )}
            </div>

            {/* Upload */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">Upload New Resume</h2>
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                        e.preventDefault()
                        setDragOver(false)
                        const file = e.dataTransfer.files?.[0]
                        if (file) handleFile(file)
                    }}
                    onClick={() => inputRef.current?.click()}
                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors ${dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/40'}`}
                >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <p className="text-sm font-medium text-card-foreground">
                        {uploading ? 'Uploading…' : 'Click or drop your PDF here'}
                    </p>
                    <p className="text-xs text-muted-foreground">PDF only · max 10 MB · replaces the current resume</p>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="application/pdf,.pdf"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFile(file)
                            e.target.value = ''
                        }}
                    />
                </div>
                {uploading && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading…
                    </div>
                )}
                {result && (
                    <p className={`mt-4 text-sm ${result.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
                        {result.message}
                    </p>
                )}
            </div>
        </div>
    )
}
