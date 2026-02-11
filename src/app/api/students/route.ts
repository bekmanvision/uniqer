import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { StudentStatus } from '@prisma/client'

// GET /api/students - Get all students
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as StudentStatus | null
    const tourId = searchParams.get('tourId')
    const city = searchParams.get('city')
    const grade = searchParams.get('grade')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}

    if (status) where.status = status
    if (tourId) where.tourId = tourId
    if (city) where.city = city
    if (grade) where.grade = grade

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { parentName: { contains: search, mode: 'insensitive' } },
        { school: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.student.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: students,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

// POST /api/students - Create a new student
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      fullName,
      phone,
      city,
      school,
      grade,
      age,
      language,
      direction,
      preferredUnis,
      parentName,
      parentPhone,
      parentPhoneBackup,
      contactParent,
      allergies,
      travelExperience,
      tourId,
      notes,
    } = body

    // Validate required fields
    if (!fullName || !phone || !city || !school || !grade || !age || !language || !direction || !parentName || !parentPhone || !contactParent) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Create student
    const student = await prisma.student.create({
      data: {
        fullName,
        phone,
        city,
        school,
        grade,
        age: parseInt(age),
        language,
        direction,
        preferredUnis,
        parentName,
        parentPhone,
        contactParent,
        allergies,
        travelExperience: travelExperience === true || travelExperience === 'true',
        tourId,
        notes,
        status: 'REGISTERED',
      },
    })

    return NextResponse.json(
      { success: true, data: student, message: 'Student registered successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to register student' },
      { status: 500 }
    )
  }
}
