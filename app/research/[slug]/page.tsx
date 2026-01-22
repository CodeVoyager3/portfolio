import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import dbConnect from '@/lib/db';
import Paper from '@/models/Paper';
import { NavigationMenuDemo } from "@/components/navbar";

// Helper to validate/format PDF URL for embedding if needed
// For now assuming direct link works in iframe or object
export const revalidate = 3600;

async function getPaper(slug: string) {
    await dbConnect();
    const paper = await Paper.findOne({ slug });
    return paper;
}

export default async function ResearchPaperPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const paper = await getPaper(slug);

    if (!paper) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <div className="max-w-4xl mx-auto px-4 pt-24 pb-8">
                <NavigationMenuDemo />

                <article className="mx-auto mt-8">
                    {/* Header */}
                    <header className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-8">
                        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                            <time dateTime={paper.publishedDate.toISOString()}>
                                {format(new Date(paper.publishedDate), 'MMMM d, yyyy')}
                            </time>
                            <span>•</span>
                            <span className="capitalize">{paper.category || 'Research'}</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl mb-4">
                            {paper.title}
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6">
                            {paper.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {paper.tags && paper.tags.map((tag: string) => (
                                <span key={tag} className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        {paper.image && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-8 max-h-[400px]">
                                <img
                                    src={paper.image}
                                    alt={paper.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                    </header>

                    {/* PDF Viewer */}
                    <div className="w-full aspect-[4/5] md:aspect-[16/9] bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                        <iframe
                            src={paper.pdfUrl}
                            className="w-full h-full"
                            title={paper.title}
                        >
                            <p>Your browser does not support PDFs. <a href={paper.pdfUrl}>Download the PDF</a>.</p>
                        </iframe>
                    </div>

                </article>

                <div className="mt-12 flex justify-center">
                    <Link href="/research" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                        ← Back to all research
                    </Link>
                </div>
            </div>
        </div>
    );
}
