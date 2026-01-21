import { ProjectForm } from '@/components/admin/ProjectForm';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        notFound();
    }

    const project = await Project.findById(id);

    if (!project) {
        notFound();
    }

    const serializedProject = {
        _id: project._id.toString(),
        title: project.title,
        description: project.description,
        techStack: project.techStack || [],
        githubLink: project.githubLink || '',
        demoLink: project.demoLink || '',
        videoUrl: project.videoUrl || '',
        thumbnail: project.thumbnail || '',
        status: project.status || 'building',
        featured: project.featured || false,
        publishedDate: project.publishedDate ? new Date(project.publishedDate).toISOString() : new Date().toISOString(),
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Edit Project</h1>
            <ProjectForm initialData={serializedProject} isEditing />
        </div>
    );
}
