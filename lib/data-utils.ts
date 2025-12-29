import { promises as fs } from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

export async function readDataFile<T>(filename: string): Promise<T[]> {
  await ensureDataDir()
  const filePath = path.join(dataDir, filename)
  
  try {
    const fileContents = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(fileContents)
  } catch {
    // File doesn't exist, return empty array
    return []
  }
}

export async function writeDataFile<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir()
  const filePath = path.join(dataDir, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

