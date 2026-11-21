import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ResumeModel from '@/models/Resume';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        const doc = await ResumeModel.findOne({ key: 'current' });
        if (!doc) {
            return NextResponse.json({ error: 'No resume uploaded yet' }, { status: 404 });
        }

        const body = Buffer.from(new Uint8Array(doc.data));
        return new NextResponse(body, {
            headers: {
                'Content-Type': doc.contentType || 'application/pdf',
                'Content-Length': String(doc.size),
                'Content-Disposition': `inline; filename="${doc.fileName}"`,
                'Cache-Control': 'no-cache',
            },
        });
    } catch (error) {
        console.error('Failed to serve resume:', error);
        return NextResponse.json({ error: 'Failed to serve resume' }, { status: 500 });
    }
}
