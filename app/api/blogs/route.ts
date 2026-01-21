import { auth, currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ALLOWED_EMAIL = 'amriteshkumarrai14@gmail.com';

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ publishedDate: -1 });
    return NextResponse.json(blogs, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, {
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

    // Basic validation
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const blog = await Blog.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

