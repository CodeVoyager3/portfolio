import { PaperForm } from '@/components/admin/PaperForm';
import dbConnect from '@/lib/db';
import Paper from '@/models/Paper';
import { notFound } from 'next/navigation';

export default async function EditPaperPage({ params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        notFound();
    }

    const paper = await Paper.findById(id);

    if (!paper) {
        notFound();
    }

    const serializedPaper = {
        _id: paper._id.toString(),
        title: paper.title,
        description: paper.description,
        pdfUrl: paper.pdfUrl,
        slug: paper.slug || '',
        image: paper.image || '',
        tags: paper.tags || [],
        category: paper.category || 'ai-ml',
        publishedDate: paper.publishedDate ? new Date(paper.publishedDate).toISOString() : new Date().toISOString(),
        featured: paper.featured || false,
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Edit Research Paper</h1>
            <PaperForm initialData={serializedPaper} isEditing />
        </div>
    );
}
