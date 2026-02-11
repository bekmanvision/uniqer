import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'
import { UniversityType } from '@prisma/client'

// GET /api/universities - Get all universities
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const type = searchParams.get('type') as UniversityType | null
    const limit = searchParams.get('limit')

    const where: Record<string, unknown> = {}

    if (city) where.city = city
    if (type) where.type = type

    const universities = await prisma.university.findMany({
      where,
      include: {
        tours: {
          include: {
            tour: true,
          },
        },
      },
      orderBy: { name: 'asc' },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ success: true, data: universities })
  } catch (error) {
    console.error('Error fetching universities:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch universities' },
      { status: 500 }
    )
  }
}

// POST /api/universities - Create a new university
export async function POST(request: NextRequest) {
  try {
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

    const slug = slugify(name)

    // Check if slug exists
    const existingUniversity = await prisma.university.findUnique({
      where: { slug },
    })

    const finalSlug = existingUniversity
      ? `${slug}-${Date.now()}`
      : slug

    const university = await prisma.university.create({
      data: {
        name,
        slug: finalSlug,
        city,
        type,
        description,
        majors: majors || [],
        grants: grants || false,
        paid: paid !== false,
        logo,
        images: images || [],
        website,
      },
    })

    return NextResponse.json({ success: true, data: university }, { status: 201 })
  } catch (error) {
    console.error('Error creating university:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create university' },
      { status: 500 }
    )
  }
}
