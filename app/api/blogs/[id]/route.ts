import { auth, currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

const ALLOWED_EMAIL = 'amriteshkumarrai14@gmail.com';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
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

        const blog = await Blog.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
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
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
