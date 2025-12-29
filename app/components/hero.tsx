"use client"

import { Avatar } from "@heroui/react"
import TechStackIcon from "tech-stack-icons"
import * as Tooltip from "@radix-ui/react-tooltip"
import RotatingText from "./RotatingText"
import { BlurFade } from "./motion/animated-group"

export function HeroSection() {
    return (
        <Tooltip.Provider delayDuration={100}>
            <section className="hero-section w-full">
                {/* Top Row: Avatar + Heading */}
                <div className="hero-top-row">
                    {/* Large Avatar */}
                    <BlurFade delay={0.1} inView={false}>
                        <div className="hero-avatar-container">
                            <Avatar
                                src="https://github.com/CodeVoyager3.png"
                                className="hero-avatar"
                            />
                        </div>
                    </BlurFade>

                    {/* Heading + Badge Column */}
                    <div className="hero-text-column">
                        {/* Main Heading */}
                        <BlurFade delay={0.2} inView={false}>
                            <h1 className="hero-heading">
                                Hi, I'm Amritesh <br className="mobile-break" />
                                <RotatingText
                                    texts={[
                                        "A Full Stack web developer.",
                                        "An Open Source Contributor.",
                                        "An AI/ML Enthusiast."
                                    ]}
                                    mainClassName="hero-heading-highlight rotating-text-container"
                                    staggerFrom="first"
                                    initial={{ x: "-100%", opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: "100%", opacity: 0 }}
                                    staggerDuration={0.02}
                                    splitLevelClassName="rotating-text-char"
                                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                    rotationInterval={3000}
                                />
                            </h1>
                        </BlurFade>

                        {/* Open to Work Badge */}
                        <BlurFade delay={0.3} inView={false}>
                            <div className="open-to-work-badge">
                                <span className="status-dot"></span>
                                <span className="status-text">Open to Work</span>
                            </div>
                        </BlurFade>
                    </div>
                </div>

                {/* Tech Stack Description */}
                <BlurFade delay={0.4} inView={false}>
                    <div className="hero-description">
                        <p className="hero-text-flow">
                            I build interactive web apps using{" "}
                            <span className="tech-badge typescript">
                                <TechStackIcon name="typescript" className="tech-stack-icon" /> Typescript
                            </span>
                            <span className="comma">,</span>{" "}
                            <span className="tech-badge react">
                                <TechStackIcon name="react" className="tech-stack-icon" /> React
                            </span>
                            <span className="comma">,</span>{" "}
                            <span className="tech-badge nextjs">
                                <TechStackIcon name="nextjs2" className="tech-stack-icon" /> Next.js
                            </span>
                            <span className="comma">,</span>{" "}
                            <span className="tech-badge bun">
                                <TechStackIcon name="npm" className="tech-stack-icon" /> NPM
                            </span>
                            {" "}and{" "}
                            <span className="tech-badge postgresql">
                                <TechStackIcon name="postgresql" className="tech-stack-icon" /> PostgreSQL
                            </span>
                            . With a focus on <span>UI</span> design. Enthusiastic about{" "}
                            <span>Three.js</span>, driven by a keen eye for design.
                        </p>
                    </div>
                </BlurFade>

                {/* CTA Buttons */}
                <BlurFade delay={0.5} inView={false}>
                    <div className="hero-buttons">
                        <a href="/resume" className="hero-btn hero-btn-primary">
                            <span className="btn-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17H8M16 13H8M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            Resume / CV
                        </a>
                        <a href="/contact" className="hero-btn hero-btn-secondary">
                            <span className="btn-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5004 12H5.00043M4.91577 12.2915L2.58085 19.2662C2.39742 19.8142 2.3057 20.0881 2.37152 20.2569C2.42868 20.4034 2.55144 20.5145 2.70292 20.5567C2.87736 20.6054 3.14083 20.4869 3.66776 20.2497L20.3792 12.7296C20.8936 12.4981 21.1507 12.3824 21.2302 12.2216C21.2993 12.082 21.2993 11.9181 21.2302 11.7784C21.1507 11.6177 20.8936 11.5019 20.3792 11.2705L3.66193 3.74776C3.13659 3.51135 2.87392 3.39315 2.69966 3.44164C2.54832 3.48375 2.42556 3.59454 2.36821 3.74078C2.30216 3.90917 2.3929 4.18255 2.57437 4.72931L4.91642 11.7856C4.94759 11.8795 4.96317 11.9264 4.96933 11.9744C4.97479 12.0171 4.97473 12.0602 4.96916 12.1028C4.96289 12.1508 4.94718 12.1977 4.91577 12.2915Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            Get in touch
                        </a>
                    </div>
                </BlurFade>

                {/* Social Links */}
                <BlurFade delay={0.6} inView={false}>
                    <div className="hero-socials">
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <a href="https://x.com" className="social-icon" aria-label="Twitter">
                                    𝕏
                                </a>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content className="radix-tooltip-content" sideOffset={8}>
                                    X
                                    <Tooltip.Arrow className="radix-tooltip-arrow" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>

                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <a href="https://linkedin.com" className="social-icon" aria-label="LinkedIn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content className="radix-tooltip-content" sideOffset={8}>
                                    LinkedIn
                                    <Tooltip.Arrow className="radix-tooltip-arrow" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>

                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <a href="https://github.com/CodeVoyager3" className="social-icon" aria-label="GitHub">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content className="radix-tooltip-content" sideOffset={8}>
                                    GitHub
                                    <Tooltip.Arrow className="radix-tooltip-arrow" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>

                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <a href="https://youtube.com" className="social-icon" aria-label="YouTube">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                </a>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content className="radix-tooltip-content" sideOffset={8}>
                                    YouTube
                                    <Tooltip.Arrow className="radix-tooltip-arrow" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>

                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <a href="https://instagram.com" className="social-icon" aria-label="Instagram">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content className="radix-tooltip-content" sideOffset={8}>
                                    Instagram
                                    <Tooltip.Arrow className="radix-tooltip-arrow" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </div>
                </BlurFade>
            </section>
        </Tooltip.Provider>
    )
}
