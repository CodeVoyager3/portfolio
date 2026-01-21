import { PaperForm } from '@/components/admin/PaperForm';

export default function NewPaperPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Add Research Paper</h1>
            <PaperForm />
        </div>
    );
}
