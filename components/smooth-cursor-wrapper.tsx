"use client"

import { usePathname } from "next/navigation"
import { SmoothCursor } from "@/components/ui/smooth-cursor"

export function SmoothCursorWrapper() {
    const pathname = usePathname()

    // Don't render the custom cursor on admin pages
    if (pathname?.startsWith("/admin")) {
        return null
    }

    return <SmoothCursor />
}
