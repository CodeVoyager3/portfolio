import { MetadataRoute } from 'next'
import dbConnect from '@/lib/db'
import BlogModel from '@/models/Blog'
import PaperModel from '@/models/Paper'
// import ProjectModel from '@/models/Project' // You can add projects if they have detail pages

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://amritesh.dev' // Replace with your actual domain

    // Get dynamic slugs
    await dbConnect()
    const blogs = await BlogModel.find({ published: true }).select('slug updatedAt').lean()
    const papers = await PaperModel.find({}).select('slug publishedDate').lean() // assuming public

    const blogEntries: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: new Date(blog.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    const paperEntries: MetadataRoute.Sitemap = papers.map((paper: any) => ({
        url: `${baseUrl}/research/${paper.slug}`,
        lastModified: new Date(paper.publishedDate),
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/research`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    return [...staticRoutes, ...blogEntries, ...paperEntries]
}
