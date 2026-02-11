import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/applications/[id] - Get single application
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        tour: true,
      },
    })

    if (!application) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: application })
  } catch (error) {
    console.error('Error fetching application:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch application' },
      { status: 500 }
    )
  }
}

// PUT /api/applications/[id] - Update application status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, message } = body

    const application = await prisma.application.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(message !== undefined && { message }),
      },
      include: {
        tour: true,
      },
    })

    return NextResponse.json({ success: true, data: application })
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update application' },
      { status: 500 }
    )
  }
}

// DELETE /api/applications/[id] - Delete application
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Get application to check if we need to restore seats
    const application = await prisma.application.findUnique({
      where: { id },
    })

    if (!application) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      )
    }

    // Delete application
    await prisma.application.delete({
      where: { id },
    })

    // Restore seat if it was a tour application and not completed
    if (
      application.tourId &&
      application.status !== 'COMPLETED' &&
      application.status !== 'CANCELLED'
    ) {
      await prisma.tour.update({
        where: { id: application.tourId },
        data: { seatsLeft: { increment: 1 } },
      })
    }

    return NextResponse.json({ success: true, message: 'Application deleted' })
  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete application' },
      { status: 500 }
    )
  }
}
