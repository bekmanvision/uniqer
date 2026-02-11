import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'
import { TourStatus } from '@prisma/client'

// GET /api/tours - Get all tours with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const grade = searchParams.get('grade')
    const status = searchParams.get('status') as TourStatus | null
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    const where: Record<string, unknown> = {}

    if (city) where.city = city
    if (grade) where.grade = { contains: grade }
    if (status) where.status = status
    if (featured === 'true') where.featured = true

    const tours = await prisma.tour.findMany({
      where,
      include: {
        universities: {
          include: {
            university: true,
          },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { startDate: 'asc' },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ success: true, data: tours })
  } catch (error) {
    console.error('Error fetching tours:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tours' },
      { status: 500 }
    )
  }
}

// POST /api/tours - Create a new tour
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      city,
      startDate,
      endDate,
      price,
      seats,
      grade,
      status,
      description,
      program,
      includes,
      images,
      featured,
      universityIds,
    } = body

    const slug = slugify(title)

    // Check if slug exists
    const existingTour = await prisma.tour.findUnique({
      where: { slug },
    })

    const finalSlug = existingTour
      ? `${slug}-${Date.now()}`
      : slug

    const tour = await prisma.tour.create({
      data: {
        title,
        slug: finalSlug,
        city,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        price,
        seats,
        seatsLeft: seats,
        grade,
        status: status || 'OPEN',
        description,
        program: program || [],
        includes: includes || [],
        images: images || [],
        featured: featured || false,
        universities: universityIds?.length
          ? {
              create: universityIds.map((id: string, index: number) => ({
                universityId: id,
                order: index,
              })),
            }
          : undefined,
      },
      include: {
        universities: {
          include: {
            university: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: tour }, { status: 201 })
  } catch (error) {
    console.error('Error creating tour:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create tour' },
      { status: 500 }
    )
  }
}
