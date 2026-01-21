"use client"

import { usePathname } from "next/navigation"

export function Footer() {
    const pathname = usePathname()

    if (pathname?.startsWith("/admin")) {
        return null
    }

    return (
        <footer className="site-footer max-w-2xl mx-auto">
            <div className="footer-content">
                <p className="footer-credit">Design & Developed by Amritesh</p>
                <p className="footer-copyright">© 2025. All rights reserved.</p>
            </div>
        </footer>
    )
}
