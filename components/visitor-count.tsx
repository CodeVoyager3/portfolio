"use client"

import { useEffect, useState } from "react"

// Abacus (abacus.jasoncameron.dev) keeps the count. Each browser is counted
// once, and only on the live domain; localhost uses a preview key.
const isLocalhost = typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname)

export function VisitorCount() {
    const [count, setCount] = useState<number | null>(null)

    useEffect(() => {
        const key = isLocalhost ? "visitors-preview" : "visitors"
        let seen = false
        try { seen = localStorage.getItem("counted-visit") === "1" } catch {}
        const action = seen ? "get" : "hit"
        let live = true
        fetch(`https://abacus.jasoncameron.dev/${action}/amritesh-portfolio/${key}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                if (!live || typeof d?.value !== "number") return
                setCount(d.value)
                if (!seen) { try { localStorage.setItem("counted-visit", "1") } catch {} }
            })
            .catch(() => {})
        return () => { live = false }
    }, [])

    if (count === null) return null

    return (
        <p className="inline-flex items-center gap-1.5 text-xs tabular-nums text-black/50 dark:text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ca64b]" aria-hidden="true" />
            {count.toLocaleString("en-US")} {count === 1 ? "visitor" : "visitors"}
        </p>
    )
}
