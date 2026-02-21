"use client"

import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6"
import { BlurFade } from "@/components/motion/animated-group"
import { ContactModal } from "./ContactModal"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { BlurVignette, BlurVignetteArticle } from "@/components/uilayouts/blur-vignette"

export function HeroSection() {
    const [isContactOpen, setIsContactOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    const bannerImage = mounted && resolvedTheme === 'dark' ? '/night-scene.png' : '/Anime Scenery Wallpaper.jpg'

    return (
        <section className="w-full mt-0 mb-16">
            {/* Banner Cover with Blur Vignette */}
            <BlurFade delay={0.05} inView={false}>
                <div className="relative w-full h-[200px] sm:h-[270px] mb-6 rounded-2xl overflow-hidden">
                    <BlurVignette
                        radius="16px"
                        inset="10px"
                        transitionLength="60px"
                        blur="8px"
                        classname="w-full aspect-auto! h-full"
                    >
                        <img
                            src={bannerImage}
                            alt="Hero Banner"
                            className="w-full h-full object-cover"
                        />
                        <BlurVignetteArticle />
                    </BlurVignette>
                    {/* Dark overlay for text contrast */}
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    {/* Quote on top of everything */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
                        <p
                            className="text-white text-lg sm:text-2xl md:text-3xl italic font-[family-name:var(--font-instrument-serif)] text-center font-medium"
                            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.5)" }}
                        >
                            &ldquo;I&apos;m just a Techie, who loves to build, break and fix things&rdquo;
                        </p>
                    </div>
                </div>
            </BlurFade>

            {/* Profile Image - overlapping banner */}
            <BlurFade delay={0.1} inView={false}>
                <div className="flex items-center justify-between mb-4">
                    <div
                        className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 rounded-full overflow-hidden bg-cover bg-center shrink-0 ring-4 ring-white dark:ring-white shadow-lg -mt-14"
                        role="img"
                        aria-label="Amritesh Kumar Rai"
                        style={{ backgroundImage: `url("https://github.com/CodeVoyager3.png")` }}
                    />
                </div>
            </BlurFade>

            {/* Name (left) + Social Links (right) - same row */}
            <BlurFade delay={0.15} inView={false}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full mb-1">
                    <div>
                        <h1 className="font-(family-name:--font-instrument-serif) italic text-2xl sm:text-4xl tracking-[0.01em] font-medium mb-0 text-black dark:text-white">
                            Amritesh Kumar Rai
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="opacity-40 text-xs sm:text-sm">
                                19 • Web Dev • AI/ML • OSC Contributor
                            </p>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 rounded-full">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Open to Work</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 mt-3 sm:mt-0">
                        <SocialPill href="https://github.com/CodeVoyager3" label="GitHub">
                            <FaGithub className="text-[16px] text-black/75 dark:text-white/80" />
                        </SocialPill>
                        <SocialPill href="https://www.linkedin.com/in/amritesh-kumar-rai" label="LinkedIn">
                            <FaLinkedin className="text-[16px] text-black/75 dark:text-white/80" />
                        </SocialPill>
                        <SocialPill href="https://x.com" label="X (Twitter)">
                            <FaXTwitter className="text-[16px] text-black/75 dark:text-white/80" />
                        </SocialPill>
                        <SocialPill href="https://www.youtube.com/@amriteshkumarrai9405" label="YouTube">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-black/75 dark:text-white/80">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                        </SocialPill>
                    </div>
                </div>
            </BlurFade>

            {/* Bio - full width */}
            <BlurFade delay={0.25} inView={false}>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 mt-10">
                    I love building interactive web experiences with TypeScript, React, Next.js, and PostgreSQL. I focus heavily on creating clean, intuitive interfaces while also making sure the backend is solid and scalable. Lately, I've been exploring Generative AI and how it can be integrated into modern applications.
                </p>
            </BlurFade>



            {/* CTA Buttons */}
            <BlurFade delay={0.35} inView={false}>
                <div className="flex mt-10 items-center gap-3">
                    <a
                        href="/resume"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17H8M16 13H8M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z" />
                        </svg>
                        Resume / CV
                    </a>
                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black/80 dark:text-white/80 text-sm font-medium rounded-full transition-colors cursor-pointer"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.5004 12H5.00043M4.91577 12.2915L2.58085 19.2662C2.39742 19.8142 2.3057 20.0881 2.37152 20.2569C2.42868 20.4034 2.55144 20.5145 2.70292 20.5567C2.87736 20.6054 3.14083 20.4869 3.66776 20.2497L20.3792 12.7296C20.8936 12.4981 21.1507 12.3824 21.2302 12.2216C21.2993 12.082 21.2993 11.9181 21.2302 11.7784C21.1507 11.6177 20.8936 11.5019 20.3792 11.2705L3.66193 3.74776C3.13659 3.51135 2.87392 3.39315 2.69966 3.44164C2.54832 3.48375 2.42556 3.59454 2.36821 3.74078C2.30216 3.90917 2.3929 4.18255 2.57437 4.72931L4.91642 11.7856C4.94759 11.8795 4.96317 11.9264 4.96933 11.9744C4.97479 12.0171 4.97473 12.0602 4.96916 12.1028C4.96289 12.1508 4.94718 12.1977 4.91577 12.2915Z" />
                        </svg>
                        Get in touch
                    </button>
                </div>
            </BlurFade>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </section>
    )
}

function SocialPill({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="w-8 h-8 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors duration-200 rounded-full flex items-center justify-center">
                    <a
                        className="flex items-center justify-center w-full h-full"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {children}
                    </a>
                </div>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    )
}
