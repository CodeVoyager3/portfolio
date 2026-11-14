"use client"

import { useEffect, useRef, useState } from 'react'
import { BlurFade } from "@/components/motion/animated-group"
import { SectionHeading } from "@/components/ui/section-heading"
import { NumberTicker } from "@/components/motion/number-ticker"
import { PipRocketSticker } from "@/components/sticker-decor"
import { createQuietSnake } from "@/lib/quiet-snake"

interface ContributionDay {
    date: string
    count: number
    level: number
}

export function GitHubActivitySection({ username = 'CodeVoyager3' }: { username?: string }) {
    const [days, setDays] = useState<ContributionDay[]>([])
    const [totalContributions, setTotalContributions] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const boardRef = useRef<HTMLDivElement>(null)

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

                const cutoffDate = new Date()
                cutoffDate.setFullYear(cutoffDate.getFullYear() - 1)

                const allContributions: ContributionDay[] = []

                if (dataLast.contributions) {
                    dataLast.contributions.forEach((day: ContributionDay) => {
                        if (new Date(day.date) >= cutoffDate) {
                            allContributions.push(day)
                        }
                    })
                }

                if (dataCurrent.contributions) {
                    dataCurrent.contributions.forEach((day: ContributionDay) => {
                        if (new Date(day.date) <= now) {
                            allContributions.push(day)
                        }
                    })
                }

                const total = allContributions.reduce((sum, day) => sum + day.count, 0)
                setDays(allContributions)
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

    useEffect(() => {
        if (!boardRef.current || days.length === 0) return
        const engine = createQuietSnake(boardRef.current)
        return () => engine.destroy()
    }, [days])

    const firstDay = days.length > 0 ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0
    const columns = Math.ceil((firstDay + days.length) / 7)

    const monthLabels: { label: string; col: number }[] = []
    days.forEach((day, i) => {
        if (day.date.slice(8) === '01') {
            monthLabels.push({
                label: new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }),
                col: Math.floor((i + firstDay) / 7),
            })
        }
    })

    if (loading) {
        return (
            <section className="w-full mb-16">
                <BlurFade delay={0}>
                    <SectionHeading eyebrow="04" title="GitHub Activity" />
                    <div className="h-4 w-40 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-4" />
                    <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-[10px] p-4 sm:p-6">
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
                    <SectionHeading eyebrow="04" title="GitHub Activity" />
                    <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-[10px] p-6">
                        <p className="text-neutral-500 dark:text-neutral-400 text-center">{error}</p>
                    </div>
                </BlurFade>
            </section>
        )
    }

    return (
        <section className="w-full mb-16">
            <BlurFade delay={0}>
                <div className="relative">
                    <PipRocketSticker
                        size={64}
                        peel
                        className="absolute -top-6 -right-3 sm:-right-6 rotate-12 z-20 hidden sm:block"
                        aria-label="Rocket sticker"
                    />
                    <SectionHeading eyebrow="04" title="GitHub Activity" />
                </div>

                <div
                    ref={boardRef}
                    className="rounded-[10px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-4 sm:p-6 transition-colors duration-300 hover:border-black/25 dark:hover:border-white/25"
                >
                    <div
                        className="snake-board"
                        tabIndex={0}
                        role="group"
                        aria-label="GitHub contributions and snake game"
                        data-snake-board
                    >
                        <svg
                            viewBox={`-2 0 ${columns * 11 + 4} 110`}
                            data-columns={columns}
                            className="snake-grid"
                            role="img"
                            aria-label={`Actual GitHub contributions over the past year. ${totalContributions} total. The snake is a decorative animation you can also play.`}
                        >
                            <g>
                                {monthLabels.map((month, index) => (
                                    <text key={index} x={month.col * 11} y={10} className="snake-month">
                                        {month.label}
                                    </text>
                                ))}
                                {days.map((entry, i) => {
                                    const col = Math.floor((i + firstDay) / 7)
                                    const row = (i + firstDay) % 7
                                    return (
                                        <rect
                                            key={entry.date}
                                            data-contribution
                                            data-col={col}
                                            data-row={row}
                                            data-count={entry.count}
                                            data-level={entry.level}
                                            x={col * 11}
                                            y={row * 11 + 20}
                                            width={8}
                                            height={8}
                                            rx={2}
                                            fill={`var(--snake-${entry.level})`}
                                        >
                                            <title>{`${entry.count} ${entry.count === 1 ? 'contribution' : 'contributions'} on ${entry.date}`}</title>
                                        </rect>
                                    )
                                })}
                            </g>
                            <g aria-hidden="true" data-snake-body opacity="0">
                                {Array.from({ length: 40 }, (_, i) => (
                                    <line key={i} data-snake-segment opacity="0" />
                                ))}
                                <g data-snake-head>
                                    <path data-snake-tongue d="M4.5 0h3.6M8.1 0l1.7-1.5M8.1 0l1.7 1.5" />
                                    <ellipse rx="5" ry="4.3" />
                                    <circle data-snake-eye cx="1.6" cy="-2" r="1.05" />
                                    <circle data-snake-eye cx="1.6" cy="2" r="1.05" />
                                </g>
                            </g>
                            <circle data-snake-food r="3" opacity="0" />
                        </svg>

                        {/* Legend */}
                        <div className="flex items-center justify-end mt-3 gap-2 text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                            <span>Less</span>
                            {[0, 1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] rounded-[2px]"
                                    style={{ background: `var(--snake-${level})` }}
                                />
                            ))}
                            <span>More</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between gap-3 flex-wrap text-xs text-neutral-500 dark:text-neutral-400 mt-4">
                        <span>
                            Total:{" "}
                            <NumberTicker value={totalContributions} className="font-semibold text-black dark:text-white" />{" "}
                            contributions in the last year
                        </span>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                data-snake-pause
                                className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors py-1 disabled:opacity-50"
                            >
                                Pause snake
                            </button>
                            <button
                                type="button"
                                data-snake-play
                                className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors py-1"
                            >
                                Play a round
                            </button>
                        </div>
                    </div>

                    {/* In-game controls */}
                    <div className="flex items-center justify-between gap-4 flex-wrap mt-2" data-snake-controls hidden>
                        <span data-snake-status role="status" className="text-xs text-neutral-500 dark:text-neutral-400">
                            Use arrow keys or the controls.
                        </span>
                        <div className="flex gap-1.5">
                            {[['up', '↑'], ['left', '←'], ['down', '↓'], ['right', '→']].map(([dir, label]) => (
                                <button
                                    key={dir}
                                    type="button"
                                    data-snake-direction={dir}
                                    aria-label={`Move snake ${dir}`}
                                    className="w-8 h-8 rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] text-sm text-black dark:text-white hover:border-black/25 dark:hover:border-white/25 transition-colors"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </BlurFade>
        </section>
    )
}
