import { NextResponse } from 'next/server';
import { DataService } from '@/lib/data-service';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const projects = await DataService.getPublishedProjects();
        return NextResponse.json(projects, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
