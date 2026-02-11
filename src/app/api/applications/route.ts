import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail, applicationConfirmationEmail, newApplicationNotification } from '@/lib/email'
import { getRoleLabel } from '@/lib/utils'
import { ApplicationStatus, ApplicantRole, ApplicationType } from '@prisma/client'

// GET /api/applications - Get all applications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as ApplicationStatus | null
    const role = searchParams.get('role') as ApplicantRole | null
    const type = searchParams.get('type') as ApplicationType | null
    const tourId = searchParams.get('tourId')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    const where: Record<string, unknown> = {}

    if (status) where.status = status
    if (role) where.role = role
    if (type) where.type = type
    if (tourId) where.tourId = tourId

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        include: {
          tour: {
            select: {
              id: true,
              title: true,
              city: true,
              startDate: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.application.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: applications,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

// POST /api/applications - Create a new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, city, grade, role, otherRole, tourId, type, message, source } = body

    // Validate required fields
    if (!name || !phone || !role) {
      return NextResponse.json(
        { success: false, error: 'Name, phone and role are required' },
        { status: 400 }
      )
    }

    // Get tour info if tourId provided
    let tour = null
    if (tourId) {
      tour = await prisma.tour.findUnique({
        where: { id: tourId },
      })

      if (!tour) {
        return NextResponse.json(
          { success: false, error: 'Tour not found' },
          { status: 404 }
        )
      }

      // Check if tour is open
      if (tour.status !== 'OPEN') {
        return NextResponse.json(
          { success: false, error: 'Tour registration is closed' },
          { status: 400 }
        )
      }

      // Check if seats available
      if (tour.seatsLeft <= 0) {
        return NextResponse.json(
          { success: false, error: 'No seats available' },
          { status: 400 }
        )
      }
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        name,
        phone,
        email,
        city,
        grade,
        role,
        otherRole: role === 'OTHER' ? otherRole : null,
        tourId,
        type: type || (tourId ? 'TOUR' : 'CONTACT'),
        message,
        source,
        status: 'NEW',
      },
      include: {
        tour: true,
      },
    })

    // Update seats left if tour application
    if (tourId && tour) {
      await prisma.tour.update({
        where: { id: tourId },
        data: { seatsLeft: { decrement: 1 } },
      })
    }

    // Send confirmation email to applicant
    if (email && tour) {
      await sendEmail({
        to: email,
        subject: `Заявка на тур "${tour.title}" получена - UniQer`,
        html: applicationConfirmationEmail(name, tour.title),
      })
    }

    // Send notification to admin
    const adminEmail = process.env.SMTP_USER
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `Новая заявка: ${name} - ${tour?.title || 'Контакт'}`,
        html: newApplicationNotification(
          name,
          phone,
          getRoleLabel(role),
          tour?.title || 'Форма контакта'
        ),
      })
    }

    return NextResponse.json(
      { success: true, data: application, message: 'Application submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
