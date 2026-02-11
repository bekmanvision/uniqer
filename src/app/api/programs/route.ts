import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'
import { ProgramType } from '@prisma/client'

// GET /api/programs - Get all programs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as ProgramType | null

    const where: Record<string, unknown> = {}
    if (type) where.type = type

    const programs = await prisma.program.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ success: true, data: programs })
  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch programs' },
      { status: 500 }
    )
  }
}

// POST /api/programs - Create a new program
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, type, description, content, image, order } = body

    const slug = slugify(title)

    const existingProgram = await prisma.program.findUnique({
      where: { slug },
    })

    const finalSlug = existingProgram
      ? `${slug}-${Date.now()}`
      : slug

    const program = await prisma.program.create({
      data: {
        title,
        slug: finalSlug,
        type,
        description,
        content,
        image,
        order: order || 0,
      },
    })

    return NextResponse.json({ success: true, data: program }, { status: 201 })
  } catch (error) {
    console.error('Error creating program:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create program' },
      { status: 500 }
    )
  }
}
