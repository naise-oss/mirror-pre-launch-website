import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSubscribers } from '@/lib/data'

// Check if user is authenticated
async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')
    return !!session?.value
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  // Check authentication
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const subscribers = await getSubscribers()
    
    // Sort by timestamp, newest first
    const sorted = subscribers.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return NextResponse.json({
      success: true,
      count: sorted.length,
      subscribers: sorted
    })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

