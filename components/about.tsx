"use client"

import { useState, useRef, useCallback } from "react"
import TechStackIcon from "tech-stack-icons"
import * as Tooltip from "@radix-ui/react-tooltip"
import ProfileCard from "./ProfileCard"
import { BlurFade } from "@/components/motion/animated-group"

const skills = [
    { name: "js", label: "JavaScript" },
    { name: "typescript", label: "TypeScript" },
    { name: "python", label: "Python" },
    { name: "react", label: "React" },
    { name: "nextjs2", label: "Next.js" },
    { name: "nodejs", label: "Node.js" },
    { name: "expressjs", label: "Express.js" },
    { name: "mongodb", label: "MongoDB" },
    { name: "postgresql", label: "PostgreSQL" },
    { name: "tailwindcss", label: "Tailwind CSS" },
    { name: "git", label: "Git" },
    { name: "github", label: "GitHub" },
    { name: "docker", label: "Docker" },
    { name: "postman", label: "Postman" },
    { name: "vercel", label: "Vercel" },
    { name: "colab", label: "Google Colab" },
]

// Skill tooltip with 3 second minimum display duration
function SkillTooltip({ skill }: { skill: { name: string; label: string } }) {
    const [open, setOpen] = useState(false)
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const openTimeRef = useRef<number>(0)

    const handleOpenChange = useCallback((isOpen: boolean) => {
        if (isOpen) {
            // Clear any pending close timeout
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current)
                closeTimeoutRef.current = null
            }
            openTimeRef.current = Date.now()
            setOpen(true)
        } else {
            // Calculate how long the tooltip has been open
            const elapsedTime = Date.now() - openTimeRef.current
            const remainingTime = Math.max(0, 2000 - elapsedTime)

            // Close after minimum 3 seconds
            closeTimeoutRef.current = setTimeout(() => {
                setOpen(false)
                closeTimeoutRef.current = null
            }, remainingTime)
        }
    }, [])

    return (
        <Tooltip.Root open={open} onOpenChange={handleOpenChange} delayDuration={0}>
            <Tooltip.Trigger asChild>
                <button type="button" className="about-skill-icon-wrapper">
                    <TechStackIcon name={skill.name} className="about-skill-icon" />
                </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
                <Tooltip.Content
                    className="radix-tooltip-content"
                    sideOffset={8}
                    onPointerDownOutside={(e) => e.preventDefault()}
                >
                    {skill.label}
                    <Tooltip.Arrow className="radix-tooltip-arrow" />
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    )
}

export function AboutSection() {
    const handleContactClick = () => {
        window.location.href = "/contact"
    }

    return (
        <Tooltip.Provider delayDuration={100}>
            <section className="about-section">
                {/* Section Header */}
                <BlurFade delay={0}>
                    <div className="about-header">
                        <span className="about-label">About</span>
                        <h2 className="about-title">Me</h2>
                    </div>
                </BlurFade>

                {/* About Content with Profile Card */}
                <BlurFade delay={0.1}>
                    <div className="about-content-wrapper">
                        {/* Profile Card */}
                        <div className="about-profile-card">
                            <ProfileCard
                                avatarUrl="https://github.com/CodeVoyager3.png"
                                name="Amritesh Kumar Rai"
                                title="Full Stack Developer"
                                handle="CodeVoyager3"
                                status="Open to Work"
                                contactText="Contact"
                                onContactClick={handleContactClick}
                                behindGlowColor="rgba(99, 102, 241, 0.4)"
                            />
                        </div>

                        {/* Text Content */}
                        <div className="about-text-content">
                            <p className="about-description">
                                I’m a full-stack web developer and open-source contributor passionate about turning ideas into impactful products. I specialize in building MVPs with a strong emphasis on usability, scalability, and real-world adoption.
                            </p>

                            {/* Skills */}
                            <div className="about-skills">
                                <span className="about-skills-label">Skills</span>
                                <div className="about-skills-icons">
                                    {skills.map((skill) => (
                                        <SkillTooltip key={skill.name} skill={skill} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </BlurFade>
            </section>
        </Tooltip.Provider>
    )
}
