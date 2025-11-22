import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json')

export interface Subscriber {
  email: string
  timestamp: string
  source?: string
}

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// Read subscribers from file
export async function getSubscribers(): Promise<Subscriber[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // File doesn't exist yet, return empty array
    return []
  }
}

// Add a new subscriber
export async function addSubscriber(email: string, source?: string): Promise<Subscriber> {
  await ensureDataDir()
  
  const subscribers = await getSubscribers()
  
  // Check if email already exists
  const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase())
  if (existing) {
    throw new Error('Email already exists')
  }
  
  const newSubscriber: Subscriber = {
    email: email.toLowerCase().trim(),
    timestamp: new Date().toISOString(),
    source: source || 'unknown'
  }
  
  subscribers.push(newSubscriber)
  
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
  
  return newSubscriber
}

