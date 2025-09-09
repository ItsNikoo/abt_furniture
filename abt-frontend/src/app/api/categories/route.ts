import { NextResponse } from 'next/server'
import { apiUrl } from '@/lib/api/baseUrl'

// Force dynamic rendering - prevents execution during build
export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 1 час

export async function GET() {
  try {
    // Add timeout to prevent hanging
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    const response = await fetch(apiUrl('/categories/'), {
      signal: controller.signal,
      // Add headers to prevent caching issues
      headers: {
        'Cache-Control': 'no-cache',
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn(`Categories API returned ${response.status}: ${response.statusText}`)
      return NextResponse.json([])
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    // Log the error for debugging
    if (error instanceof Error) {
      console.error('Categories API error:', error.message)
    } else {
      console.error('Categories API unknown error:', error)
    }

    return NextResponse.json([])
  }
}