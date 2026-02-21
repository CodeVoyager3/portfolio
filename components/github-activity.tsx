"use client"

import { useEffect, useState } from 'react'
import { BlurFade } from "@/components/motion/animated-group"

interface ContributionDay {
    date: string
    count: number
    level: number
}

interface ContributionWeek {
    contributionDays: ContributionDay[]
}

export function GitHubActivitySection({ username = 'CodeVoyager3' }: { username?: string }) {
    const [contributions, setContributions] = useState<ContributionWeek[]>([])
    const [totalContributions, setTotalContributions] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                setLoading(true)
                const now = new Date()
                const currentYear = now.getFullYear()
                const lastYear = currentYear - 1

                const [responseLast, responseCurrent] = await Promise.all([
                    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${lastYear}`),
                    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${currentYear}`)
                ])

                if (!responseLast.ok || !responseCurrent.ok) {
                    throw new Error('Failed to fetch contributions')
                }

                const dataLast = await responseLast.json()
                const dataCurrent = await responseCurrent.json()

                // Combine: last 12 months of data
                const cutoffDate = new Date()
                cutoffDate.setFullYear(cutoffDate.getFullYear() - 1)

                const allContributions: { date: string; count: number; level: number }[] = []

                if (dataLast.contributions) {
                    dataLast.contributions.forEach((day: { date: string; count: number; level: number }) => {
                        if (new Date(day.date) >= cutoffDate) {
                            allContributions.push(day)
                        }
                    })
                }

                if (dataCurrent.contributions) {
                    dataCurrent.contributions.forEach((day: { date: string; count: number; level: number }) => {
                        if (new Date(day.date) <= now) {
                            allContributions.push(day)
                        }
                    })
                }

                const weeks: ContributionWeek[] = []
                let currentWeek: ContributionDay[] = []
                let total = 0
                let isFirstDay = true

                allContributions.forEach((day) => {
                    const date = new Date(day.date)
                    const dayOfWeek = date.getDay()

                    if (isFirstDay && dayOfWeek !== 0) {
                        for (let i = 0; i < dayOfWeek; i++) {
                            currentWeek.push({ date: '', count: 0, level: 0 })
                        }
                        isFirstDay = false
                    }
                    isFirstDay = false

                    if (dayOfWeek === 0 && currentWeek.length > 0) {
                        weeks.push({ contributionDays: currentWeek })
                        currentWeek = []
                    }

                    currentWeek.push({ date: day.date, count: day.count, level: day.level })
                    total += day.count
                })

                if (currentWeek.length > 0) {
                    weeks.push({ contributionDays: currentWeek })
                }

                setContributions(weeks)
                setTotalContributions(total)
                setError(null)
            } catch (err) {
                setError('Failed to load GitHub activity')
                console.error('Error fetching GitHub contributions:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchContributions()
    }, [username])

    const getContributionColor = (level: number) => {
        const colors = {
            light: ['bg-neutral-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-600'],
            dark: ['dark:bg-neutral-800', 'dark:bg-green-900', 'dark:bg-green-700', 'dark:bg-green-500', 'dark:bg-green-400']
        }
        return `${colors.light[level]} ${colors.dark[level]}`
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const getMonthLabels = () => {
        if (contributions.length === 0) return []
        const labels: { month: string; position: number }[] = []
        let currentMonth = -1
        let lastLabelPosition = -10

        contributions.forEach((week, weekIndex) => {
            const validDay = week.contributionDays.find(day => day.date !== '')
            if (validDay) {
                const date = new Date(validDay.date)
                const month = date.getMonth()
                if (currentMonth === -1) {
                    currentMonth = month
                    labels.push({ month: months[month], position: weekIndex })
                    lastLabelPosition = weekIndex
                } else if (month !== currentMonth && weekIndex - lastLabelPosition >= 4) {
                    currentMonth = month
                    labels.push({ month: months[month], position: weekIndex })
                    lastLabelPosition = weekIndex
                } else if (month !== currentMonth) {
                    currentMonth = month
                }
            }
        })
        return labels
    }

    const monthLabels = getMonthLabels()
    const totalWeeks = contributions.length

    if (loading) {
        return (
            <section className="w-full mb-16">
                <BlurFade delay={0}>
                    <div className="mb-4">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Featured</p>
                        <h2 className="text-xl font-bold text-black dark:text-white mb-1">GitHub Activity</h2>
                        <div className="h-4 w-40 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
                    </div>
                    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6">
                        <div className="grid grid-cols-[repeat(53,1fr)] gap-[2px]">
                            {Array.from({ length: 53 }).map((_, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-[2px]">
                                    {Array.from({ length: 7 }).map((_, dayIndex) => (
                                        <div key={dayIndex} className="aspect-square w-full rounded-[2px] bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </BlurFade>
            </section>
        )
    }

    if (error) {
        return (
            <section className="w-full mb-16">
                <BlurFade delay={0}>
                    <div className="mb-4">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Featured</p>
                        <h2 className="text-xl font-bold text-black dark:text-white mb-1">GitHub Activity</h2>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
                        <p className="text-neutral-500 dark:text-neutral-400 text-center">{error}</p>
                    </div>
                </BlurFade>
            </section>
        )
    }

    return (
        <section className="w-full mb-16">
            <BlurFade delay={0}>
                <div className="mb-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Featured</p>
                    <h2 className="text-xl font-bold text-black dark:text-white mb-1">GitHub Activity</h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Total: <span className="font-semibold text-black dark:text-white">{totalContributions.toLocaleString()}</span> contributions
                    </p>
                </div>

                <div
                    className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 shadow-sm"
                    role="img"
                    aria-label={`GitHub contribution graph showing ${totalContributions} contributions in the last year`}
                >
                    {/* Month labels */}
                    <div className="relative mb-2">
                        <div
                            className="grid text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400"
                            style={{ gridTemplateColumns: `repeat(${totalWeeks || 53}, 1fr)` }}
                        >
                            {monthLabels.map((label, index) => (
                                <div key={index} className="text-left" style={{ gridColumn: label.position + 1 }}>
                                    {label.month}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contribution grid */}
                    <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${totalWeeks || 53}, 1fr)` }}>
                        {contributions.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-[2px]">
                                {week.contributionDays.map((day, dayIndex) => (
                                    <div
                                        key={dayIndex}
                                        className={`aspect-square w-full rounded-[2px] transition-colors ${getContributionColor(day.level)}`}
                                        title={day.date ? `${day.count} contributions on ${new Date(day.date).toLocaleDateString('en-US', {
                                            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                                        })}` : ''}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-end mt-4 gap-2 text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                        <span>Less</span>
                        <div className="flex gap-[2px]">
                            {[0, 1, 2, 3, 4].map((level) => (
                                <div key={level} className={`w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-[2px] ${getContributionColor(level)}`} />
                            ))}
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </BlurFade>
        </section>
    )
}
