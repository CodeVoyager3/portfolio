import { ProjectForm } from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">New Project</h1>
            <ProjectForm />
        </div>
    );
}
