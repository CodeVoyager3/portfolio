import dbConnect from '@/lib/db';
import ResumeModel from '@/models/Resume';

export interface ResumeMeta {
    fileName: string;
    size: number;
    updatedAt: string | null;
}

export async function getResumeMeta(): Promise<ResumeMeta | null> {
    await dbConnect();
    const doc = await ResumeModel.findOne({ key: 'current' }).select('fileName size updatedAt').lean();
    if (!doc) return null;
    return {
        fileName: doc.fileName,
        size: doc.size,
        updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : null,
    };
}
