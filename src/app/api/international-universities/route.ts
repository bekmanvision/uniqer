import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/international-universities
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get('country')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    const where: Record<string, unknown> = {}
    if (country) where.country = country

    const [universities, total] = await Promise.all([
      prisma.internationalUniversity.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.internationalUniversity.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: universities,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    console.error('Error fetching international universities:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch universities' },
      { status: 500 }
    )
  }
}

// POST /api/international-universities
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const university = await prisma.internationalUniversity.create({
      data: body,
    })

    return NextResponse.json(
      { success: true, data: university },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating international university:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create university' },
      { status: 500 }
    )
  }
}
