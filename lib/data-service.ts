import dbConnect from "@/lib/db";
import GitHubProjectModel from "@/models/GitHubProject";
import { GitHubProject, GitHubProjectDocument } from "@/types";

function toGitHubProject(doc: GitHubProjectDocument): GitHubProject {
    return {
        repoId: doc.repoId,
        name: doc.name,
        fullName: doc.fullName,
        description: doc.description || '',
        url: doc.url,
        homepage: doc.homepage || '',
        language: doc.language || '',
        topics: doc.topics || [],
        stars: doc.stars ?? 0,
        forks: doc.forks ?? 0,
        isFork: doc.isFork ?? false,
        pinned: doc.pinned ?? false,
        published: doc.published ?? false,
        pushedAt: doc.pushedAt ? new Date(doc.pushedAt).toISOString() : '',
    };
}

export const DataService = {
    async getFeaturedProjects(limit = 4): Promise<GitHubProject[]> {
        try {
            await dbConnect();
            const pinned = await GitHubProjectModel.find({ pinned: true, published: true })
                .sort({ stars: -1 })
                .lean<GitHubProjectDocument[]>();
            const others = await GitHubProjectModel.find({ pinned: false, published: true })
                .sort({ stars: -1 })
                .lean<GitHubProjectDocument[]>();
            return [...pinned, ...others].slice(0, limit).map(toGitHubProject);
        } catch (error) {
            console.error("Failed to fetch featured projects:", error);
            return [];
        }
    },

    async getPublishedProjects(): Promise<GitHubProject[]> {
        try {
            await dbConnect();
            const rows = await GitHubProjectModel.find({ published: true })
                .sort({ pinned: -1, stars: -1 })
                .lean<GitHubProjectDocument[]>();
            return rows.map(toGitHubProject);
        } catch (error) {
            console.error("Failed to fetch published projects:", error);
            return [];
        }
    },

    async getAllProjects(): Promise<GitHubProject[]> {
        try {
            await dbConnect();
            const rows = await GitHubProjectModel.find({})
                .sort({ pinned: -1, stars: -1 })
                .lean<GitHubProjectDocument[]>();
            return rows.map(toGitHubProject);
        } catch (error) {
            console.error("Failed to fetch all projects:", error);
            return [];
        }
    },

    async getStats(): Promise<{ published: number; pinned: number; total: number }> {
        try {
            await dbConnect();
            const [published, pinned, total] = await Promise.all([
                GitHubProjectModel.countDocuments({ published: true }),
                GitHubProjectModel.countDocuments({ pinned: true }),
                GitHubProjectModel.countDocuments({}),
            ]);
            return { published, pinned, total };
        } catch (error) {
            console.error("Failed to fetch project stats:", error);
            return { published: 0, pinned: 0, total: 0 };
        }
    },
};
