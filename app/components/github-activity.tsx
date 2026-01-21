"use client"

import { useEffect, useState } from "react"
import { BlurFade } from "@/components/motion/animated-group"

interface GitHubStats {
    publicRepos: number
    followers: number
    totalContributions: number
}

export function GitHubActivitySection() {
    const username = "CodeVoyager3"
    const [stats, setStats] = useState<GitHubStats | null>(null)
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        // Check if dark mode
        setIsDark(document.documentElement.classList.contains('dark'))

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'))
        })
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

        // Fetch GitHub stats
        fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(data => {
                setStats({
                    publicRepos: data.public_repos || 0,
                    followers: data.followers || 0,
                    totalContributions: 0 // This would need GitHub GraphQL API
                })
            })
            .catch(console.error)

        return () => observer.disconnect()
    }, [])

    // Theme for the activity graph
    const graphTheme = isDark ? "github-dark" : "github-light"

    return (
        <section className="github-section">
            {/* Section Header */}
            <BlurFade delay={0}>
                <div className="github-header">
                    <span className="github-label">Featured</span>
                    <h2 className="github-title">GitHub Activity</h2>
                </div>
            </BlurFade>

            {/* Stats Row */}
            {stats && (
                <BlurFade delay={0.1}>
                    <div className="github-stats-row">
                        <div className="github-stat">
                            <span className="github-stat-value">{stats.publicRepos}</span>
                            <span className="github-stat-label">Repositories</span>
                        </div>
                        <div className="github-stat">
                            <span className="github-stat-value">{stats.followers}</span>
                            <span className="github-stat-label">Followers</span>
                        </div>
                        <a
                            href={`https://github.com/${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-profile-link"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View Profile
                        </a>
                    </div>
                </BlurFade>
            )}

            {/* Contribution Graph */}
            <BlurFade delay={0.15}>
                <div className="github-graph-container">
                    <img
                        src={`https://ghchart.rshah.org/${isDark ? '6366f1' : '4f46e5'}/${username}`}
                        alt={`${username}'s GitHub Contribution Graph`}
                        className="github-contribution-graph"
                    />
                </div>
            </BlurFade>

            {/* Activity Graph using github-readme-activity-graph */}
            <BlurFade delay={0.2}>
                <div className="github-activity-graph-container">
                    <img
                        src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${graphTheme}&hide_border=true&bg_color=transparent&color=${isDark ? 'e5e7eb' : '0f172a'}&line=${isDark ? '6366f1' : '4f46e5'}&point=${isDark ? 'a5b4fc' : '3730a3'}`}
                        alt={`${username}'s GitHub Activity Graph`}
                        className="github-activity-graph"
                    />
                </div>
            </BlurFade>
        </section>
    )
}
