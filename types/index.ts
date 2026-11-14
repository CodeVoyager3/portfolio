export interface GithubRepo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    homepage: string | null;
    language: string | null;
    topics: string[];
    stargazers_count: number;
    forks_count: number;
    fork: boolean;
    pushed_at: string;
}

export interface GitHubProjectDocument {
    _id: string;
    repoId: number;
    name: string;
    fullName: string;
    description: string;
    url: string;
    homepage: string;
    language: string;
    topics: string[];
    stars: number;
    forks: number;
    isFork: boolean;
    pinned: boolean;
    published: boolean;
    pushedAt: Date | string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface GitHubProject {
    repoId: number;
    name: string;
    fullName: string;
    description: string;
    url: string;
    homepage: string;
    language: string;
    topics: string[];
    stars: number;
    forks: number;
    isFork: boolean;
    pinned: boolean;
    published: boolean;
    pushedAt: string;
}
