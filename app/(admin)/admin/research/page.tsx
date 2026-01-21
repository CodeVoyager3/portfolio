import Link from 'next/link';
import dbConnect from '@/lib/db';
import Paper from '@/models/Paper';
import { format } from 'date-fns';
import { Plus, Edit, Trash, FileText } from 'lucide-react';
import { DeleteButton } from '@/components/admin/DeleteButton';

export const dynamic = 'force-dynamic';

async function getPapers() {
    await dbConnect();
    const papers = await Paper.find({}).sort({ publishedDate: -1 });
    return papers.map(doc => ({
        _id: doc._id.toString(),
        title: doc.title,
        description: doc.description,
        pdfUrl: doc.pdfUrl,
        publishedDate: doc.publishedDate,
    }));
}

export default async function ResearchPage() {
    const papers = await getPapers();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">Research Papers</h1>
                <Link
                    href="/admin/research/new"
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    Add Paper
                </Link>
            </div>

            <div className="rounded-md border border-border bg-card shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-muted-foreground">
                        <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">Title</th>
                                <th className="px-6 py-3 font-medium hidden md:table-cell">PDF</th>
                                <th className="px-6 py-3 font-medium hidden md:table-cell">Date</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {papers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center">No papers found.</td>
                                </tr>
                            ) : (
                                papers.map((paper) => (
                                    <tr key={paper._id} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-card-foreground">
                                            {paper.title}
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline hover:text-primary/80">
                                                <FileText className="h-4 w-4" />
                                                View PDF
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            {format(new Date(paper.publishedDate), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/research/${paper._id}`}
                                                    className="rounded p-1 hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <DeleteButton id={paper._id} collection="papers" />
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
