import { promises as fs } from 'fs'
import path from 'path'
import { Redis } from '@upstash/redis'

export interface Subscriber {
  email: string
  timestamp: string
  source?: string
}

const SUBSCRIBERS_KEY = 'subscribers'

// Initialize Upstash Redis client (only in production)
let redis: Redis | null = null

function getRedis(): Redis | null {
  // Try multiple possible environment variable names that Vercel/Upstash might use
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.REDIS_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  
  if (redisUrl && redisToken) {
    if (!redis) {
      redis = new Redis({
        url: redisUrl,
        token: redisToken,
      })
    }
    return redis
  }
  return null
}

// Check if we're using Upstash Redis (production)
function useRedis(): boolean {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.REDIS_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  return !!(redisUrl && redisToken)
}

// Read subscribers - uses Redis in production, file system locally
export async function getSubscribers(): Promise<Subscriber[]> {
  if (useRedis()) {
    try {
      const client = getRedis()
      if (!client) return []
      
      const data = await client.get<Subscriber[]>(SUBSCRIBERS_KEY)
      return data || []
    } catch (error) {
      console.error('Error reading from Redis:', error)
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
  
  if (useRedis()) {
    // Save to Upstash Redis
    try {
      const client = getRedis()
      if (!client) {
      console.error('Redis client not available. Env vars:', {
        hasUpstashUrl: !!process.env.UPSTASH_REDIS_REST_URL,
        hasUpstashToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
        hasKvUrl: !!process.env.KV_REST_API_URL,
        hasKvToken: !!process.env.KV_REST_API_TOKEN,
        hasRedisUrl: !!process.env.REDIS_URL
      })
        throw new Error('Redis client not available')
      }
      await client.set(SUBSCRIBERS_KEY, subscribers)
      console.log('Successfully saved to Redis')
    } catch (error: any) {
      console.error('Error saving to Redis:', error)
      console.error('Redis error details:', {
        message: error.message,
        name: error.name,
        hasUpstashUrl: !!process.env.UPSTASH_REDIS_REST_URL,
        hasUpstashToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
        hasKvUrl: !!process.env.KV_REST_API_URL,
        hasKvToken: !!process.env.KV_REST_API_TOKEN,
        hasRedisUrl: !!process.env.REDIS_URL
      })
      throw new Error(`Failed to save subscriber: ${error.message}`)
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

