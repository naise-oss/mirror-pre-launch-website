import { promises as fs } from 'fs'
import path from 'path'
import { kv } from '@vercel/kv'

export interface Subscriber {
  email: string
  timestamp: string
  source?: string
}

const SUBSCRIBERS_KEY = 'subscribers'

// Check if we're using Vercel KV (production)
function useKV(): boolean {
  return !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN
}

// Read subscribers - uses KV in production, file system locally
export async function getSubscribers(): Promise<Subscriber[]> {
  if (useKV()) {
    try {
      const data = await kv.get<Subscriber[]>(SUBSCRIBERS_KEY)
      return data || []
    } catch (error) {
      console.error('Error reading from KV:', error)
      return []
    }
  } else {
    // Local development - use file system
    const DATA_DIR = path.join(process.cwd(), 'data')
    const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json')
    
    try {
      await fs.mkdir(DATA_DIR, { recursive: true })
      const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  }
}

// Add a new subscriber
export async function addSubscriber(email: string, source?: string): Promise<Subscriber> {
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
  
  if (useKV()) {
    // Save to Vercel KV
    try {
      await kv.set(SUBSCRIBERS_KEY, subscribers)
    } catch (error) {
      console.error('Error saving to KV:', error)
      throw new Error('Failed to save subscriber')
    }
  } else {
    // Local development - save to file
    const DATA_DIR = path.join(process.cwd(), 'data')
    const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json')
    
    try {
      await fs.mkdir(DATA_DIR, { recursive: true })
      await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
    } catch (error) {
      console.error('Error saving to file:', error)
      throw new Error('Failed to save subscriber')
    }
  }
  
  return newSubscriber
}

