"use client"

import TechStackIcon from "tech-stack-icons"
import { BlurFade } from "@/components/motion/animated-group"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { ArrowUpRight } from "lucide-react"

const darkInvertIcons = ['expressjs', 'github', 'vercel', 'nginx']

const skills = [
    { name: "js", label: "JavaScript" },
    { name: "typescript", label: "TypeScript" },
    { name: "python", label: "Python" },
    { name: "react", label: "React" },
    { name: "nextjs2", label: "Next.js" },
    { name: "nodejs", label: "Node.js" },
    { name: "expressjs", label: "Express.js" },
    { name: "graphql", label: "GraphQL" },
    { name: "prisma", label: "Prisma" },
    { name: "mongodb", label: "MongoDB" },
    { name: "postgresql", label: "PostgreSQL" },
    { name: "tailwindcss", label: "Tailwind CSS" },
    { name: "langchain", label: "LangChain" },
    { name: "django", label: "Django" },
    { name: "git", label: "Git" },
    { name: "github", label: "GitHub" },
    { name: "docker", label: "Docker" },
    { name: "postman", label: "Postman" },
    { name: "vercel", label: "Vercel" },
    { name: "colab", label: "Google Colab" },
]

export function AboutSection() {
    return (
        <section className="w-full mb-16">
            {/* Section Header */}
            <BlurFade delay={0}>
                <div className="mb-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">About</p>
                    <h2 className="text-xl font-bold text-black dark:text-white">Me</h2>
                </div>
            </BlurFade>

            {/* Content: Image + Text side by side */}
            <BlurFade delay={0.1}>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                    {/* Profile Image */}
                    <div className="shrink-0">
                        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src="https://github.com/CodeVoyager3.png"
                                alt="Amritesh Kumar Rai"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1">
                        {/* Name */}
                        <h3 className="text-2xl sm:text-3xl font-(family-name:--font-instrument-serif) text-black dark:text-white mb-4 text-center sm:text-left">
                            Amritesh Kumar Rai
                        </h3>

                        {/* Bio */}
                        <p className="text-neutral-600 mb-10 dark:text-neutral-400 text-sm sm:text-base leading-relaxed text-center sm:text-left">
                            I&apos;m a full-stack web developer and open-source contributor passionate about building products that make an impact. I enjoy turning rough ideas into clean, scalable applications with a strong focus on usability and real-world value.
                        </p>
                    </div>
                </div>
            </BlurFade>

            {/* Technologies - full width */}
            <BlurFade delay={0.2}>
                <div className="mt-8">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Skills</p>
                    <h2 className="text-xl font-bold text-black dark:text-white mb-6">Technologies & Tools, I work with...</h2>
                    <div className="grid grid-cols-8 sm:grid-cols-10 gap-3 justify-items-center">
                        {skills.map((skill) => (
                            <Tooltip key={skill.name}>
                                <TooltipTrigger asChild>
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
                                        <TechStackIcon name={skill.name} className={`w-6 h-6 sm:w-7 sm:h-7 ${darkInvertIcons.includes(skill.name) ? 'dark:invert' : ''}`} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>{skill.label}</TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </BlurFade>

            {/* Education */}
            <BlurFade delay={0.3}>
                <div className="mt-12">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Education</p>
                    <h2 className="text-xl font-bold text-black dark:text-white mb-6">Where I studied</h2>

                    <div className="group/item block w-full">
                        <div className="flex flex-col gap-3 w-full p-1 bg-white dark:bg-white/5 border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out hover:border-black/20 dark:hover:border-white/10 hover:scale-[1.01] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/10">
                            <a
                                href="https://mait.ac.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start sm:items-center gap-4 p-3 sm:px-4 sm:py-5 rounded-md transition-colors hover:bg-black/2 dark:hover:bg-white/2"
                            >
                                {/* Logo */}
                                <div className="w-14 h-14 shrink-0 rounded-full bg-white flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/10 shadow-sm transition-transform duration-300 group-hover/item:scale-105">
                                    <img
                                        src="https://it.mait.ac.in/images/logo_small_trans.png"
                                        alt="MAIT Logo"
                                        className="w-10 h-10 object-contain"
                                    />
                                </div>

                                {/* Info Section */}
                                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-[15px] font-semibold text-black/80 dark:text-white/90 leading-snug">
                                                Maharaja Agrasen Institute of Technology
                                            </h3>
                                            <ArrowUpRight className="w-4 h-4 text-neutral-400 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 hidden sm:block" />
                                        </div>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            B.Tech in Computer Science and Engineering
                                        </p>
                                        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                                            GGSIPU, New Delhi
                                        </p>
                                    </div>

                                    {/* Year Badge */}
                                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 shrink-0 tabular-nums bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full border border-black/5 dark:border-white/5 w-fit">
                                        2024 – 2028
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </BlurFade>
        </section>
    )
}
