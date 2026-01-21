import Link from 'next/link';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { format } from 'date-fns';
import { Plus, Edit, Trash, Github, ExternalLink } from 'lucide-react';
import { DeleteButton } from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

async function getProjects() {
    await dbConnect();
    const projects = await Project.find({}).sort({ publishedDate: -1 });
    return projects.map(doc => ({
        _id: doc._id.toString(),
        title: doc.title,
        description: doc.description,
        techStack: doc.techStack,
        githubLink: doc.githubLink,
        demoLink: doc.demoLink,
        createdAt: doc.createdAt,
        publishedDate: doc.publishedDate,
    }));
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    New Project
                </Link>
            </div>

            <div className="rounded-md border border-border bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-muted-foreground">
                        <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">Title</th>
                                <th className="px-6 py-3 font-medium hidden md:table-cell">Tech Stack</th>
                                <th className="px-6 py-3 font-medium hidden md:table-cell">Links</th>
                                <th className="px-6 py-3 font-medium hidden md:table-cell">Date</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center">No projects found.</td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project._id} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-card-foreground">
                                            {project.title}
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {project.techStack.slice(0, 3).map((tech: string, i: number) => (
                                                    <span key={i} className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 3 && (
                                                    <span className="text-xs text-muted-foreground">+{project.techStack.length - 3}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="flex gap-2">
                                                {project.githubLink && (
                                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                                        <Github className="h-4 w-4" />
                                                    </a>
                                                )}
                                                {project.demoLink && (
                                                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            {format(new Date(project.publishedDate || project.createdAt), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/projects/${project._id}`}
                                                    className="rounded p-1 hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <DeleteButton id={project._id} collection="projects" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
