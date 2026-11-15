"use client"

import { BlurFade } from "@/components/motion/animated-group"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { LogoMarquee, type LogoMarqueeBrand } from "@/components/arc/blocks/logo-marquee/logo-marquee"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { TiltCard } from "@/components/motion/tilt-card"
import { NoriLaptopSticker } from "@/components/sticker-decor"

const icon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

const skills: LogoMarqueeBrand[] = [
    { name: "JavaScript", icon: icon("javascript") },
    { name: "TypeScript", icon: icon("typescript") },
    { name: "Python", icon: icon("python") },
    { name: "React", icon: icon("react") },
    { name: "Next.js", icon: icon("nextdotjs") },
    { name: "Node.js", icon: icon("nodedotjs") },
    { name: "Express.js", icon: icon("express") },
    { name: "GraphQL", icon: icon("graphql") },
    { name: "Prisma", icon: icon("prisma") },
    { name: "MongoDB", icon: icon("mongodb") },
    { name: "PostgreSQL", icon: icon("postgresql") },
    { name: "Tailwind CSS", icon: icon("tailwindcss") },
    { name: "LangChain", icon: icon("langchain") },
    { name: "Django", icon: icon("django") },
    { name: "Git", icon: icon("git") },
    { name: "GitHub", icon: icon("github") },
    { name: "Docker", icon: icon("docker") },
    { name: "Postman", icon: icon("postman") },
    { name: "Vercel", icon: icon("vercel") },
    { name: "Google Colab", icon: icon("googlecolab") },
]

function EducationCard({
    href,
    logo,
    name,
    detail,
    sub,
    years,
}: {
    href: string
    logo: React.ReactNode
    name: string
    detail: string
    sub?: string
    years: string
}) {
    return (
        <div className="w-full">
            <div className="group/item flex flex-col gap-3 w-full p-1 rounded-[10px]">
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:px-4 sm:py-5 rounded-md transition-colors hover:bg-black/2 dark:hover:bg-white/2"
                >
                    {/* Logo */}
                    <div className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/10 shadow-sm transition-transform duration-300 group-hover/item:scale-105">
                        {logo}
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="text-[14px] sm:text-[15px] font-semibold text-black/80 dark:text-white/90 leading-snug">
                                    {name}
                                </h3>
                                <ArrowUpRight className="w-4 h-4 text-neutral-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 hidden sm:block shrink-0" />
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                                {detail}
                            </p>
                            {sub && (
                                <p className="text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                                    {sub}
                                </p>
                            )}
                        </div>

                        {/* Year Badge */}
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 shrink-0 tabular-nums bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full border border-black/5 dark:border-white/10 self-start sm:self-auto sm:ml-auto w-fit">
                            {years}
                        </span>
                    </div>
                </a>
            </div>
        </div>
    )
}

export function AboutSection() {
    return (
        <section className="w-full mb-16">
            {/* Section Header */}
            <BlurFade delay={0}>
                <div className="relative">
                    <NoriLaptopSticker
                        size={48}
                        peel
                        className="absolute -top-5 right-0 sm:-top-6 sm:-right-6 rotate-12 z-20 sm:scale-125 origin-bottom-left"
                        aria-label="Laptop sticker"
                    />
                    <SectionHeading eyebrow="03" title="About Me" />
                </div>
            </BlurFade>

            {/* Content: Image + Text side by side */}
            <BlurFade delay={0.1}>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">
                    {/* Profile Image */}
                    <div className="shrink-0">
                        <div className="w-32 h-32 sm:w-44 sm:h-48 rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src="https://github.com/CodeVoyager3.png"
                                alt="Amritesh Kumar Rai"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                        {/* Name */}
                        <h3 className="text-2xl sm:text-3xl font-(family-name:--font-instrument-serif) text-black dark:text-white mb-3 sm:mb-4">
                            Amritesh Kumar Rai
                        </h3>

                        {/* Bio */}
                        <p className="text-neutral-600 mb-6 sm:mb-10 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
                            I&apos;m a full-stack web developer and open-source contributor passionate about building products that make an impact. I enjoy turning rough ideas into clean, scalable applications with a strong focus on usability and real-world value.
                        </p>
                    </div>
                </div>
            </BlurFade>

            {/* Technologies - animated marquee */}
            <BlurFade delay={0.2}>
                <div className="mt-8">
                    <LogoMarquee
                        title="Technologies & tools"
                        description="The stack behind every build I create from the first idea to the final deploy."
                        brands={skills}
                        tone="mono"
                    />
                </div>
            </BlurFade>

            {/* Education - journey from school to college */}
            <BlurFade delay={0.3}>
                <div className="mt-12">
                    <SectionHeading
                        eyebrow="Education"
                        title="Where I Studied"
                    />

                    <TracingBeam>
                        <div className="relative flex flex-col gap-8 pt-2">
                            {/* Step 01 - School */}
                            <div className="relative">
                                <span
                                    aria-hidden="true"
                                    className="absolute left-[4px] top-[2px] h-3 w-3 rounded-full bg-[#2ca64b] ring-4 ring-black/[0.04] dark:ring-white/10"
                                />
                                <p className="ml-6 sm:ml-12 mb-2 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                                    01 · School
                                </p>
                                <TiltCard
                                    max={6}
                                    glare={false}
                                    className="ml-6 sm:ml-12 rounded-[10px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 hover:border-black/25 dark:hover:border-white/25"
                                >
                                    <EducationCard
                                        href="https://www.airforcebalbharatischool.in/"
                                        logo={
                                            <img
                                                src="/logos/afbbs.jpg"
                                                alt="Air Force Bal Bharati School logo"
                                                className="w-10 h-10 object-contain"
                                            />
                                        }
                                        name="Air Force Bal Bharati School"
                                        detail="Secondary & Senior Secondary Education"
                                        sub="New Delhi"
                                        years="2018 – 2024"
                                    />
                                </TiltCard>
                            </div>

                            {/* Step 02 - College */}
                            <div className="relative">
                                <span
                                    aria-hidden="true"
                                    className="absolute left-[4px] top-[2px] h-3 w-3 rounded-full bg-[#f6821f] ring-4 ring-black/[0.04] dark:ring-white/10"
                                />
                                <p className="ml-6 sm:ml-12 mb-2 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                                    02 · College
                                </p>
                                <TiltCard
                                    max={6}
                                    glare={false}
                                    className="ml-6 sm:ml-12 rounded-[10px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 hover:border-black/25 dark:hover:border-white/25"
                                >
                                    <EducationCard
                                        href="https://mait.ac.in/"
                                        logo={
                                            <img
                                                src="https://it.mait.ac.in/images/logo_small_trans.png"
                                                alt="MAIT Logo"
                                                className="w-10 h-10 object-contain"
                                            />
                                        }
                                        name="Maharaja Agrasen Institute of Technology"
                                        detail="B.Tech in Computer Science and Engineering"
                                        sub="GGSIPU, New Delhi"
                                        years="2024 – 2028"
                                    />
                                </TiltCard>
                            </div>
                        </div>
                    </TracingBeam>
                </div>
            </BlurFade>
        </section>
    )
}
