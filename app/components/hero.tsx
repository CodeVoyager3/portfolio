"use client"

import { Avatar } from "@heroui/react"
import TechStackIcon from "tech-stack-icons"

export function HeroSection() {
    return (
        <section className="hero-section w-full">
            {/* Top Row: Avatar + Heading */}
            <div className="hero-top-row">
                {/* Large Avatar */}
                <div className="hero-avatar-container">
                    <Avatar
                        src="https://github.com/CodeVoyager3.png"
                        className="hero-avatar"
                    />
                </div>

                {/* Heading + Badge Column */}
                <div className="hero-text-column">
                    {/* Main Heading */}
                    <h1 className="hero-heading text-4xl">
                        Hi, I'm Amritesh — <span className="hero-heading-highlight">A Full Stack web developer.</span>
                    </h1>

                    {/* Open to Work Badge */}
                    <div className="open-to-work-badge">
                        <span className="status-dot"></span>
                        <span className="status-text">Open to Work</span>
                    </div>
                </div>
            </div>

            {/* Tech Stack Description */}
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
                    . With a focus on <span className="highlight-text">UI</span> design. Enthusiastic about{" "}
                    <span className="highlight-text">Three.js</span>, driven by a keen eye for design.
                </p>
            </div>

            {/* CTA Buttons */}
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

            {/* Social Links */}
            <div className="hero-socials">
                <a href="https://twitter.com" className="social-icon" aria-label="Twitter">𝕏</a>
                <a href="https://linkedin.com" className="social-icon" aria-label="LinkedIn">in</a>
                <a href="https://github.com/CodeVoyager3" className="social-icon" aria-label="GitHub">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                </a>
                <a href="mailto:amriteshkumarrai14@gmail.com" className="social-icon" aria-label="Email">✉</a>
            </div>
        </section>
    )
}
