import dbConnect from './db';
import GitHubProjectModel from '@/models/GitHubProject';
import { GithubRepo } from '@/types';

const GITHUB_API = 'https://api.github.com';

export function getGithubUsername(): string {
    return process.env.GITHUB_USERNAME || 'CodeVoyager3';
}

function githubHeaders(extra: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'portfolio-sync',
        ...extra,
    };
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    return headers;
}

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
    const username = getGithubUsername();
    const res = await fetch(
        `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100&type=owner`,
        { headers: githubHeaders(), cache: 'no-store' }
    );
    if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }
    const repos: GithubRepo[] = await res.json();
    return repos.filter((repo) => !repo.fork);
}

export async function fetchPinnedRepos(): Promise<{ name: string }[] | null> {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return null;
    const username = getGithubUsername().replace(/"/g, '\\"');
    const query = `query { user(login: "${username}") { pinnedItems(first: 6, types: REPOSITORY) { nodes { ... on Repository { name } } } } }`;
    const res = await fetch(`${GITHUB_API}/graphql`, {
        method: 'POST',
        headers: githubHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ query }),
        cache: 'no-store',
    });
    if (!res.ok) {
        console.error(`GitHub GraphQL pinned fetch failed: ${res.status}`);
        return null;
    }
    const json = await res.json();
    return json?.data?.user?.pinnedItems?.nodes ?? null;
}

export async function syncGithubRepos(): Promise<{ synced: number; pinned: number; hasToken: boolean }> {
    await dbConnect();
    const [repos, pinned] = await Promise.all([fetchGithubRepos(), fetchPinnedRepos()]);
    const pinnedNames = new Set((pinned ?? []).map((p) => p.name));

    const ops = repos.map((repo) => ({
        updateOne: {
            filter: { repoId: repo.id },
            update: {
                $set: {
                    name: repo.name,
                    fullName: repo.full_name,
                    description: repo.description ?? '',
                    url: repo.html_url,
                    homepage: repo.homepage ?? '',
                    language: repo.language ?? '',
                    topics: repo.topics ?? [],
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    isFork: repo.fork,
                    pinned: pinnedNames.has(repo.name),
                    pushedAt: repo.pushed_at ? new Date(repo.pushed_at) : new Date(),
                    ...(pinnedNames.has(repo.name) ? { published: true } : {}),
                },
            },
            upsert: true,
        },
    }));

    await GitHubProjectModel.bulkWrite(ops);

    // Unpublish repos that no longer exist on GitHub (deleted or made private)
    if (repos.length > 0) {
        await GitHubProjectModel.updateMany(
            { repoId: { $nin: repos.map((r) => r.id) } },
            { $set: { published: false } }
        );
    }

    return { synced: repos.length, pinned: pinnedNames.size, hasToken: pinned !== null };
}
