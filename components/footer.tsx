"use client"

import { usePathname } from "next/navigation"
import { FaGithub, FaLinkedin } from "react-icons/fa6"
import { VisitorCount } from "@/components/visitor-count"

export function Footer() {
    const pathname = usePathname()

    if (pathname?.startsWith("/admin")) {
        return null
    }

    return (
        <footer className="w-full px-5 sm:px-6 pb-12 sm:pb-16 mt-auto">
            <div className="border-t border-black/10 dark:border-white/10 pt-6 sm:pt-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    {/* Credits */}
                    <div className="text-sm dark:text-white/50 text-black/50 text-center sm:text-left">
                        <p>Design & Developed by <span className="font-medium text-black/70 dark:text-white/70">Amritesh</span></p>
                        <p>© {new Date().getFullYear()}. All rights reserved.</p>
                        <VisitorCount />
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center sm:justify-end gap-3">
                        <a
                            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200 rounded-full"
                            href="https://github.com/CodeVoyager3"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub className="text-[18px] text-black/75 dark:text-white/80 shrink-0" />
                            <span className="hidden sm:inline text-sm font-medium text-black/75 dark:text-white/80">GitHub</span>
                        </a>
                        <a
                            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200 rounded-full"
                            href="https://www.linkedin.com/in/amritesh-kumar-rai"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaLinkedin className="text-[18px] text-black/75 dark:text-white/80 shrink-0" />
                            <span className="hidden sm:inline text-sm font-medium text-black/75 dark:text-white/80">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
