import { auth, currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Paper from '@/models/Paper';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ALLOWED_EMAIL = 'amriteshkumarrai14@gmail.com';

export async function GET() {
    try {
        await dbConnect();
        const papers = await Paper.find({}).sort({ publishedDate: -1 });
        return NextResponse.json(papers, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching papers:', error);
        return NextResponse.json({ error: 'Failed to fetch papers' }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await currentUser();
        if (!user || user.emailAddresses[0]?.emailAddress !== ALLOWED_EMAIL) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await dbConnect();
        const body = await req.json();

        if (!body.title || !body.pdfUrl) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const paper = await Paper.create(body);
        return NextResponse.json(paper, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create paper' }, { status: 500 });
    }
}
