import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { readDataFile, writeDataFile } from '@/lib/data-utils'

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  status: "operational" | "building" | "maintenance"
  liveUrl?: string
  githubUrl?: string
}

async function checkAuth() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin-auth')
  return authCookie?.value === 'authenticated'
}

export async function GET() {
  const projects = await readDataFile<Project>('projects.json')
  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const project: Project = await request.json()
    const projects = await readDataFile<Project>('projects.json')
    projects.push(project)
    await writeDataFile('projects.json', projects)

    return NextResponse.json({ success: true, project })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const project: Project = await request.json()
    const projects = await readDataFile<Project>('projects.json')
    
    const index = projects.findIndex(p => p.title === project.title)
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    projects[index] = project
    await writeDataFile('projects.json', projects)

    return NextResponse.json({ success: true, project })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title } = await request.json()
    const projects = await readDataFile<Project>('projects.json')
    
    const filtered = projects.filter(p => p.title !== title)
    await writeDataFile('projects.json', filtered)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}

