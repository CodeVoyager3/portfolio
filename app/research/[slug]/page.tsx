import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import dbConnect from '@/lib/db';
import Paper from '@/models/Paper';
import PageLayout from '@/components/PageLayout';

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
        <PageLayout>
            <div className="mx-auto max-w-3xl pt-10 pb-16">
                <article>
                    {/* Header */}
                    <header className="mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-8">
                        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                            <time dateTime={paper.publishedDate.toISOString()}>
                                {format(new Date(paper.publishedDate), 'MMMM d, yyyy')}
                            </time>
                            <span>•</span>
                            <span className="text-xs font-medium uppercase tracking-wider px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full">{paper.category || 'Research'}</span>
                        </div>
                        <h1 className="font-(family-name:--font-instrument-serif) italic text-3xl sm:text-4xl tracking-[0.01em] font-medium text-black dark:text-white mb-4">
                            {paper.title}
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed mb-6">
                            {paper.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {paper.tags && paper.tags.map((tag: string) => (
                                <span key={tag} className="inline-flex items-center rounded-full bg-black/5 dark:bg-white/10 px-2.5 py-0.5 text-xs font-medium text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        {paper.image && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-8 max-h-[400px]">
                                <img
                                    src={paper.image}
                                    alt={paper.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                    </header>

                    {/* PDF Viewer */}
                    <div className="w-full aspect-4/5 md:aspect-video bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
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
                    <Link
                        href="/research"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black/80 dark:text-white/80 text-sm font-medium rounded-full transition-colors"
                    >
                        ← Back to all research
                    </Link>
                </div>
            </div>
        </PageLayout>
    );
}

