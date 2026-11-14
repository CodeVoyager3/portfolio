import Link from 'next/link';
import dbConnect from '@/lib/db';
import GitHubProjectModel from '@/models/GitHubProject';
import { GitHubSyncButton } from '@/components/admin/GitHubSyncButton';
import { PublishToggle } from '@/components/admin/PublishToggle';
import { Star, GitFork, ExternalLink, Pin, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getProjects() {
    await dbConnect();
    const docs = await GitHubProjectModel.find({}).sort({ pinned: -1, stars: -1 }).lean();
    return docs.map((doc: any) => ({
        repoId: doc.repoId,
        name: doc.name,
        fullName: doc.fullName,
        description: doc.description || '',
        url: doc.url,
        language: doc.language || '',
        topics: doc.topics || [],
        stars: doc.stars || 0,
        forks: doc.forks || 0,
        pinned: doc.pinned || false,
        published: doc.published || false,
        pushedAt: doc.pushedAt ? new Date(doc.pushedAt) : null,
    }));
}

export default async function GitHubProjectsPage() {
    const projects = await getProjects();
    const hasToken = !!process.env.GITHUB_TOKEN;
    const lastSynced = projects.length > 0
        ? projects.reduce((latest: Date | null, p) => {
            const d = p.pushedAt;
            return !latest || (d && d > latest) ? d : latest;
        }, null)
        : null;

    const pinnedProjects = projects.filter((p) => p.pinned);
    const otherProjects = projects.filter((p) => !p.pinned);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">GitHub Projects</h1>
                    <p className="text-muted-foreground">
                        Sync your public repos and choose which ones to publish on your portfolio.
                    </p>
                </div>
                <GitHubSyncButton />
            </div>

            {!hasToken && (
                <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium">GITHUB_TOKEN not set</p>
                        <p className="mt-1">
                            Pinned repos on your GitHub profile can only be detected via the GraphQL API.
                            Add <code className="rounded bg-black/10 dark:bg-white/10 px-1.5 py-0.5 text-xs">GITHUB_TOKEN</code> to
                            your <code className="rounded bg-black/10 dark:bg-white/10 px-1.5 py-0.5 text-xs">.env.local</code> (a
                            classic token with <span className="font-medium">repo</span> scope works) and sync again to auto-feature
                            your pinned repos.
                        </p>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-6 rounded-xl border border-border bg-card p-4 text-sm">
                <div>
                    <p className="text-2xl font-bold text-card-foreground">{projects.length}</p>
                    <p className="text-muted-foreground">Synced repos</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-card-foreground">{projects.filter((p) => p.published).length}</p>
                    <p className="text-muted-foreground">Published</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-card-foreground">{pinnedProjects.length}</p>
                    <p className="text-muted-foreground">Pinned</p>
                </div>
                {lastSynced && (
                    <div className="ml-auto text-xs text-muted-foreground">
                        Last activity: {lastSynced.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                )}
            </div>

            {pinnedProjects.length > 0 && (
                <div>
                    <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-card-foreground">
                        <Pin className="h-4 w-4 text-orange-500" />
                        Pinned on GitHub
                        <span className="text-xs font-normal text-muted-foreground">(auto-featured on your portfolio)</span>
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {pinnedProjects.map((p) => (
                            <RepoRow key={p.repoId} repo={p} />
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h2 className="mb-3 text-lg font-semibold text-card-foreground">
                    All repos
                    <span className="ml-2 text-xs font-normal text-muted-foreground">({otherProjects.length})</span>
                </h2>
                {otherProjects.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                        {otherProjects.map((p) => (
                            <RepoRow key={p.repoId} repo={p} />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        No repos synced yet. Click &quot;Sync from GitHub&quot; to pull your public repositories.
                    </p>
                )}
            </div>

            <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
                <p>
                    <Link href="/admin" className="font-medium text-primary hover:underline">← Back to dashboard</Link>
                </p>
            </div>
        </div>
    );
}

function RepoRow({ repo }: { repo: any }) {
    return (
        <div className={`flex flex-col gap-2.5 rounded-xl border p-4 ${repo.pinned ? 'border-orange-500/30 bg-orange-500/5' : 'border-border bg-card'}`}>
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="truncate font-semibold text-card-foreground">{repo.name}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                        {repo.description || 'No description'}
                    </p>
                </div>
                <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Open ${repo.name} on GitHub`}
                >
                    <ExternalLink className="h-4 w-4" />
                </a>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {repo.language && (
                        <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-neutral-400" />
                            {repo.language}
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        {repo.forks}
                    </span>
                </div>
                <PublishToggle repoId={repo.repoId} published={repo.published} pinned={repo.pinned} />
            </div>
        </div>
    );
}
