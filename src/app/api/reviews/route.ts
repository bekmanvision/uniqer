import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/reviews - Get all reviews
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    const where: Record<string, unknown> = {}
    if (featured === 'true') where.featured = true

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ success: true, data: reviews })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, role, content, rating, avatar, featured } = body

    const review = await prisma.review.create({
      data: {
        name,
        role,
        content,
        rating: rating || 5,
        avatar,
        featured: featured || false,
      },
    })

    return NextResponse.json({ success: true, data: review }, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
