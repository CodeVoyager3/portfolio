import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import GitHubProjectModel from '@/models/GitHubProject';
import { isAdminUser } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function PATCH(req: Request) {
    if (!(await isAdminUser())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { repoId, published } = body;

        if (typeof repoId !== 'number' || typeof published !== 'boolean') {
            return NextResponse.json({ error: 'repoId and published are required' }, { status: 400 });
        }

        await dbConnect();
        const project = await GitHubProjectModel.findOne({ repoId });
        if (!project) {
            return NextResponse.json({ error: 'Repo not found. Run a sync first.' }, { status: 404 });
        }

        if (project.pinned && !published) {
            return NextResponse.json({ error: 'Pinned repos are auto-published by GitHub sync' }, { status: 400 });
        }

        project.published = published;
        await project.save();

        return NextResponse.json({ repoId, published });
    } catch (error) {
        console.error('Failed to update publish state:', error);
        return NextResponse.json({ error: 'Failed to update publish state' }, { status: 500 });
    }
}
