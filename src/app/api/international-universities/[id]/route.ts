import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

type RouteParams = { params: Promise<{ id: string }> }

// GET /api/international-universities/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const university = await prisma.internationalUniversity.findUnique({
      where: { id },
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

// PUT /api/international-universities/[id]
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()

    const university = await prisma.internationalUniversity.update({
      where: { id },
      data: body,
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

// DELETE /api/international-universities/[id]
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    await prisma.internationalUniversity.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting university:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete university' },
      { status: 500 }
    )
  }
}