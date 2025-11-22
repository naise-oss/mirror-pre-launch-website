import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

function validateSessionToken(token: string): boolean {
  if (!token) return false
  // Validate token format (SHA-256 hash is 64 characters)
  return token.length === 64 && /^[a-f0-9]+$/.test(token)
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session || !session.value) {
      return NextResponse.json({ authenticated: false })
    }

    // Validate session token format
    const isValid = validateSessionToken(session.value)
    
    return NextResponse.json({ authenticated: isValid })
  } catch (error) {
    return NextResponse.json({ authenticated: false })
  }
}

