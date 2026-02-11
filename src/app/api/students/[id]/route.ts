import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/students/[id] - Get single student
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const student = await prisma.student.findUnique({
      where: { id },
    })

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    console.error('Error fetching student:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch student' },
      { status: 500 }
    )
  }
}

// PUT /api/students/[id] - Update student
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const student = await prisma.student.update({
      where: { id },
      data: {
        ...body,
        age: body.age ? parseInt(body.age) : undefined,
        travelExperience: body.travelExperience === true || body.travelExperience === 'true',
      },
    })

    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    console.error('Error updating student:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update student' },
      { status: 500 }
    )
  }
}

// DELETE /api/students/[id] - Delete student
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.student.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Student deleted' })
  } catch (error) {
    console.error('Error deleting student:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}
