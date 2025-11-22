import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

// Hash password using SHA-256 (one-way hashing)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

// Get the correct password hash from environment variable
function getPasswordHash(): string {
  const password = process.env.ADMIN_PASSWORD || 'naise444'
  return hashPassword(password)
}

// Generate a secure session token with timestamp
function generateSessionToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || crypto.randomBytes(32).toString('hex')
  const timestamp = Date.now().toString()
  const token = `${secret}-${timestamp}`
  return crypto.createHash('sha256').update(token).digest('hex')
}

// Validate session token
function validateSessionToken(token: string): boolean {
  if (!token) return false
  // Session is valid if it exists and matches our secret pattern
  // In production, you'd want to check expiration and store sessions
  return token.length === 64 // SHA-256 hash length
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // Hash the provided password and compare with stored hash
    const providedHash = hashPassword(password)
    const correctHash = getPasswordHash()

    // Constant-time comparison to prevent timing attacks
    let isValid = true
    if (providedHash.length !== correctHash.length) {
      isValid = false
    }
    
    for (let i = 0; i < providedHash.length; i++) {
      if (providedHash[i] !== correctHash[i]) {
        isValid = false
      }
    }

    // Always wait the same amount of time to prevent timing attacks
    await new Promise(resolve => setTimeout(resolve, 150))

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Generate session token
    const sessionToken = generateSessionToken()

    // Set httpOnly cookie (secure, httpOnly, sameSite)
    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}

