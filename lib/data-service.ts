import dbConnect from "@/lib/db";
import ProjectModel from "@/models/Project";
import BlogModel from "@/models/Blog";
import PaperModel from "@/models/Paper";
import { Project, Blog, Research, ProjectDocument, BlogDocument, PaperDocument } from "@/types";

export const DataService = {
    async getFeaturedProjects(): Promise<Project[]> {
        try {
            await dbConnect();
            const rawProjects = await ProjectModel.find({ featured: true })
                .sort({ publishedDate: -1 })
                .limit(4)
                .lean<ProjectDocument[]>();

            return rawProjects.map((p) => ({
                title: p.title,
                description: p.description,
                technologies: p.techStack || [],
                image: p.thumbnail || '/placeholder.png',
                status: p.status || 'building',
                liveUrl: p.demoLink || '',
                githubUrl: p.githubLink || '',
                date: formatDate(p.publishedDate || p.createdAt),
            }));
        } catch (error) {
            console.error("Failed to fetch featured projects:", error);
            return [];
        }
    },

    async getFeaturedBlogs(): Promise<Blog[]> {
        try {
            await dbConnect();
            const rawBlogs = await BlogModel.find({ featured: true })
                .sort({ publishedDate: -1 })
                .limit(2)
                .lean<BlogDocument[]>();

            return rawBlogs.map((b) => ({
                title: b.title,
                description: b.excerpt || '',
                image: b.image || '/placeholder.png',
                tags: b.tags || [],
                date: formatDate(b.publishedDate || b.createdAt),
                slug: b.slug,
                category: b.category || 'all',
            }));
        } catch (error) {
            console.error("Failed to fetch featured blogs:", error);
            return [];
        }
    },

    async getFeaturedResearch(): Promise<Research[]> {
        try {
            await dbConnect();
            const rawResearch = await PaperModel.find({ featured: true })
                .sort({ publishedDate: -1 })
                .limit(2)
                .lean<PaperDocument[]>();

            return rawResearch.map((r) => ({
                title: r.title,
                description: r.description,
                image: r.image || '/placeholder.png',
                tags: r.tags || [],
                date: formatDate(r.publishedDate || r.createdAt),
                slug: r.slug || '',
                category: r.category || 'all',
            }));
        } catch (error) {
            console.error("Failed to fetch featured research:", error);
            return [];
        }
    }
};

function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
