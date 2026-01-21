import { auth, currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { NextResponse } from 'next/server';

const ALLOWED_EMAIL = 'amriteshkumarrai14@gmail.com';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    try {
        const project = await Project.findById(id);
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
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

        const project = await Project.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
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
        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
