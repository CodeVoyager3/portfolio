import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { readDataFile, writeDataFile } from '@/lib/data-utils'

const ALLOWED_EMAIL = 'amriteshkumarrai14@gmail.com';

interface Research {
  title: string
  description: string
  image: string
  tags: string[]
  date: string
  slug: string
  category: "ai-ml" | "nlp" | "computer-vision" | "all"
  content?: string
}

async function checkAuth() {
  const { userId } = await auth();
  if (!userId) {
    return false;
  }
  const user = await currentUser();
  return user && user.emailAddresses[0]?.emailAddress === ALLOWED_EMAIL;
}

export async function GET() {
  const researches = await readDataFile<Research>('research.json')
  return NextResponse.json(researches)
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const research: Research = await request.json()
    
    if (!research.slug) {
      research.slug = research.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    if (!research.date) {
      research.date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const researches = await readDataFile<Research>('research.json')
    researches.push(research)
    await writeDataFile('research.json', researches)

    return NextResponse.json({ success: true, research })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create research paper' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const research: Research = await request.json()
    const researches = await readDataFile<Research>('research.json')
    
    const index = researches.findIndex(r => r.slug === research.slug)
    if (index === -1) {
      return NextResponse.json({ error: 'Research not found' }, { status: 404 })
    }

    researches[index] = research
    await writeDataFile('research.json', researches)

    return NextResponse.json({ success: true, research })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update research paper' },
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
    const researches = await readDataFile<Research>('research.json')
    
    const filtered = researches.filter(r => r.slug !== slug)
    await writeDataFile('research.json', filtered)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete research paper' },
      { status: 500 }
    )
  }
}


