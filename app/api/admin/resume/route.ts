import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ResumeModel from '@/models/Resume';
import { getResumeMeta } from '@/lib/resume';
import { isAdminUser } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

const MAX_SIZE_MB = 10;

export async function GET() {
    if (!(await isAdminUser())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const meta = await getResumeMeta();
        return NextResponse.json({ resume: meta });
    } catch (error) {
        console.error('Failed to fetch resume meta:', error);
        return NextResponse.json({ error: 'Failed to fetch resume info' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!(await isAdminUser())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!(file instanceof File)) {
            return NextResponse.json({ error: 'A PDF file is required' }, { status: 400 });
        }

        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
        if (!isPdf) {
            return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
        }

        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            return NextResponse.json({ error: `File is too large (max ${MAX_SIZE_MB} MB)` }, { status: 400 });
        }

        const bytes = new Uint8Array(await file.arrayBuffer());

        await dbConnect();
        const doc = await ResumeModel.findOneAndUpdate(
            { key: 'current' },
            {
                fileName: file.name,
                contentType: 'application/pdf',
                size: file.size,
                data: Buffer.from(bytes),
            },
            { upsert: true, new: true },
        );

        return NextResponse.json({
            resume: {
                fileName: doc.fileName,
                size: doc.size,
                updatedAt: doc.updatedAt.toISOString(),
            },
        });
    } catch (error) {
        console.error('Failed to upload resume:', error);
        return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 });
    }
}
