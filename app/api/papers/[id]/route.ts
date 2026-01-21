import { auth, currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Paper from '@/models/Paper';
import { NextResponse } from 'next/server';

const ALLOWED_EMAIL = 'amriteshkumarrai14@gmail.com';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    try {
        const paper = await Paper.findById(id);
        if (!paper) {
            return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
        }
        return NextResponse.json(paper);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch paper' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
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

        const paper = await Paper.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!paper) {
            return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
        }

        return NextResponse.json(paper);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update paper' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
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
        const paper = await Paper.findByIdAndDelete(id);

        if (!paper) {
            return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Paper deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete paper' }, { status: 500 });
    }
}
