import { NextRequest, NextResponse } from 'next/server'
import { addSubscriber } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const subscriber = await addSubscriber(email, source)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed',
        subscriber 
      },
      { status: 201 }
    )
  } catch (error: any) {
    if (error.message === 'Email already exists') {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      )
    }

    console.error('Error adding subscriber:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      hasRedis: !!process.env.UPSTASH_REDIS_REST_URL,
      nodeEnv: process.env.NODE_ENV
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to subscribe. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

