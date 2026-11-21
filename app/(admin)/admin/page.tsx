import Link from "next/link"
import { FolderGit2, Pin, Rocket, RefreshCw, FileText } from "lucide-react"
import { DataService } from "@/lib/data-service"
import { GitHubSyncButton } from "@/components/admin/GitHubSyncButton"

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const stats = await DataService.getStats();

    const cards = [
        {
            label: "Published Projects",
            value: stats.published,
            href: "/admin/github",
            icon: Rocket,
            iconClass: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
        },
        {
            label: "Pinned Repos",
            value: stats.pinned,
            href: "/admin/github",
            icon: Pin,
            iconClass: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
        },
        {
            label: "Synced Repos",
            value: stats.total,
            href: "/admin/github",
            icon: FolderGit2,
            iconClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your portfolio content.</p>
                </div>
                <GitHubSyncButton />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {cards.map((card) => (
                    <Link
                        key={card.label}
                        href={card.href}
                        className="block rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:bg-accent/50"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${card.iconClass}`}>
                                <card.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-card-foreground">{card.label}</h3>
                                <p className="text-3xl font-bold text-card-foreground">{card.value}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/admin/github"
                        className="flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                    >
                        <FolderGit2 className="h-4 w-4" />
                        Manage GitHub Projects
                    </Link>
                    <Link
                        href="/admin/resume"
                        className="flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                    >
                        <FileText className="h-4 w-4" />
                        Manage Resume
                    </Link>
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                    >
                        <RefreshCw className="h-4 w-4" />
                        View Portfolio
                    </Link>
                </div>
            </div>
        </div>
    )
}
