import { auth, currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ publishedDate: -1 });
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

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    // Use ADMIN_EMAIL from env or fallback
    const adminEmail = process.env.ADMIN_EMAIL || 'amriteshkumarrai14@gmail.com';

    if (!user || !adminEmail || user.emailAddresses[0]?.emailAddress !== adminEmail) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();

    if (!body.title || !body.description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}


