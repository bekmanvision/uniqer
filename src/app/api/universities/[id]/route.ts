import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'

// GET /api/universities/[id] - Get single university
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const university = await prisma.university.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        tours: {
          include: {
            tour: true,
          },
        },
      },
    })

    if (!university) {
      return NextResponse.json(
        { success: false, error: 'University not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: university })
  } catch (error) {
    console.error('Error fetching university:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch university' },
      { status: 500 }
    )
  }
}

// PUT /api/universities/[id] - Update university
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      name,
      city,
      type,
      description,
      majors,
      grants,
      paid,
      logo,
      images,
      website,
    } = body

    // Update slug if name changed
    let slug
    if (name) {
      slug = slugify(name)
      const existingUniversity = await prisma.university.findFirst({
        where: { slug, NOT: { id } },
      })
      if (existingUniversity) {
        slug = `${slug}-${Date.now()}`
      }
    }

    const university = await prisma.university.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(city && { city }),
        ...(type && { type }),
        ...(description && { description }),
        ...(majors && { majors }),
        ...(grants !== undefined && { grants }),
        ...(paid !== undefined && { paid }),
        ...(logo !== undefined && { logo }),
        ...(images && { images }),
        ...(website !== undefined && { website }),
      },
    })

    return NextResponse.json({ success: true, data: university })
  } catch (error) {
    console.error('Error updating university:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update university' },
      { status: 500 }
    )
  }
}

// DELETE /api/universities/[id] - Delete university
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.university.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'University deleted' })
  } catch (error) {
    console.error('Error deleting university:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete university' },
      { status: 500 }
    )
  }
}
