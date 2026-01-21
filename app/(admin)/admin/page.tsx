'use client';

import { useEffect, useState } from "react"
import Link from "next/link"
import { BlurFade } from "@/components/motion/animated-group"
import { FileText, FlaskConical, Rocket } from "lucide-react"

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        blogs: 0,
        research: 0,
        projects: 0,
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [blogsRes, papersRes, projectsRes] = await Promise.all([
                    fetch("/api/blogs"),
                    fetch("/api/papers"),
                    fetch("/api/projects"),
                ]);

                // Check if responses are JSON before parsing
                const blogs = blogsRes.ok && blogsRes.headers.get('content-type')?.includes('application/json')
                    ? await blogsRes.json()
                    : [];
                const research = papersRes.ok && papersRes.headers.get('content-type')?.includes('application/json')
                    ? await papersRes.json()
                    : [];
                const projects = projectsRes.ok && projectsRes.headers.get('content-type')?.includes('application/json')
                    ? await projectsRes.json()
                    : [];

                setStats({
                    blogs: Array.isArray(blogs) ? blogs.length : 0,
                    research: Array.isArray(research) ? research.length : 0,
                    projects: Array.isArray(projects) ? projects.length : 0,
                });
            } catch (err) {
                console.error("Failed to load stats", err);
                // Set default values on error
                setStats({ blogs: 0, research: 0, projects: 0 });
            }
        };

        fetchStats();
    }, [])

    return (
        <div className="space-y-6">
            <BlurFade delay={0}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground">Overview of your portfolio content.</p>
                    </div>
                </div>
            </BlurFade>

            <div className="grid gap-6 md:grid-cols-3">
                <BlurFade delay={0.1}>
                    <Link href="/admin/blogs" className="block rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:bg-accent/50">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-card-foreground">Total Blogs</h3>
                                <p className="text-3xl font-bold text-card-foreground">{stats.blogs}</p>
                            </div>
                        </div>
                    </Link>
                </BlurFade>

                <BlurFade delay={0.15}>
                    <Link href="/admin/research" className="block rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:bg-accent/50">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                <FlaskConical className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-card-foreground">Research Papers</h3>
                                <p className="text-3xl font-bold text-card-foreground">{stats.research}</p>
                            </div>
                        </div>
                    </Link>
                </BlurFade>

                <BlurFade delay={0.2}>
                    <Link href="/admin/projects" className="block rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:bg-accent/50">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <Rocket className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-card-foreground">Projects</h3>
                                <p className="text-3xl font-bold text-card-foreground">{stats.projects}</p>
                            </div>
                        </div>
                    </Link>
                </BlurFade>
            </div>

            <BlurFade delay={0.25}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link href="/admin/blogs/new" className="flex items-center justify-center rounded-md bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
                            + New Blog Post
                        </Link>
                        <Link href="/admin/research/new" className="flex items-center justify-center rounded-md bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
                            + New Research Paper
                        </Link>
                        <Link href="/admin/projects/new" className="flex items-center justify-center rounded-md bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
                            + New Project
                        </Link>
                    </div>
                </div>
            </BlurFade>
        </div>
    )
}
