import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { readDataFile, writeDataFile } from '@/lib/data-utils'

interface Blog {
  title: string
  description: string
  image: string
  tags: string[]
  date: string
  slug: string
  category: "frontend" | "backend" | "devops" | "all"
  content?: string
}

async function checkAuth() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin-auth')
  return authCookie?.value === 'authenticated'
}

export async function GET() {
  const blogs = await readDataFile<Blog>('blogs.json')
  return NextResponse.json(blogs)
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const blog: Blog = await request.json()
    
    // Generate slug if not provided
    if (!blog.slug) {
      blog.slug = blog.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Set date if not provided
    if (!blog.date) {
      blog.date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const blogs = await readDataFile<Blog>('blogs.json')
    blogs.push(blog)
    await writeDataFile('blogs.json', blogs)

    return NextResponse.json({ success: true, blog })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const blog: Blog = await request.json()
    const blogs = await readDataFile<Blog>('blogs.json')
    
    const index = blogs.findIndex(b => b.slug === blog.slug)
    if (index === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    blogs[index] = blog
    await writeDataFile('blogs.json', blogs)

    return NextResponse.json({ success: true, blog })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug } = await request.json()
    const blogs = await readDataFile<Blog>('blogs.json')
    
    const filtered = blogs.filter(b => b.slug !== slug)
    await writeDataFile('blogs.json', filtered)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}

