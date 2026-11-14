import { NextResponse } from 'next/server';
import { isAdminUser } from '@/lib/admin-auth';
import { syncGithubRepos } from '@/lib/github';

export const dynamic = 'force-dynamic';

export async function POST() {
    if (!(await isAdminUser())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await syncGithubRepos();
        return NextResponse.json(result);
    } catch (error) {
        console.error('GitHub sync failed:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to sync GitHub repos' },
            { status: 500 }
        );
    }
}
