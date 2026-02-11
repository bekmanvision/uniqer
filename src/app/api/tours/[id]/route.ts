import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'

// GET /api/tours/[id] - Get single tour
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const tour = await prisma.tour.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        universities: {
          include: {
            university: true,
          },
          orderBy: { order: 'asc' },
        },
        routes: {
          orderBy: { day: 'asc' },
        },
        _count: {
          select: { applications: true },
        },
      },
    })

    if (!tour) {
      return NextResponse.json(
        { success: false, error: 'Tour not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: tour })
  } catch (error) {
    console.error('Error fetching tour:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tour' },
      { status: 500 }
    )
  }
}

// PUT /api/tours/[id] - Update tour
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      title,
      city,
      startDate,
      endDate,
      price,
      seats,
      seatsLeft,
      grade,
      status,
      description,
      program,
      includes,
      images,
      featured,
      universityIds,
    } = body

    // Update slug if title changed
    let slug
    if (title) {
      slug = slugify(title)
      const existingTour = await prisma.tour.findFirst({
        where: { slug, NOT: { id } },
      })
      if (existingTour) {
        slug = `${slug}-${Date.now()}`
      }
    }

    // Delete existing university relations if universityIds provided
    if (universityIds) {
      await prisma.tourUniversity.deleteMany({
        where: { tourId: id },
      })
    }

    const tour = await prisma.tour.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(city && { city }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(price !== undefined && { price }),
        ...(seats !== undefined && { seats }),
        ...(seatsLeft !== undefined && { seatsLeft }),
        ...(grade && { grade }),
        ...(status && { status }),
        ...(description && { description }),
        ...(program && { program }),
        ...(includes && { includes }),
        ...(images && { images }),
        ...(featured !== undefined && { featured }),
        ...(universityIds && {
          universities: {
            create: universityIds.map((uid: string, index: number) => ({
              universityId: uid,
              order: index,
            })),
          },
        }),
      },
      include: {
        universities: {
          include: {
            university: true,
          },
        },
        routes: true,
      },
    })

    return NextResponse.json({ success: true, data: tour })
  } catch (error) {
    console.error('Error updating tour:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update tour' },
      { status: 500 }
    )
  }
}

// DELETE /api/tours/[id] - Delete tour
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.tour.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Tour deleted' })
  } catch (error) {
    console.error('Error deleting tour:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete tour' },
      { status: 500 }
    )
  }
}
