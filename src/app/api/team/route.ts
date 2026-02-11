import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/team - Get all team members (admins and managers)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const members = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: members })
  } catch (error) {
    console.error('Error fetching team:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team' },
      { status: 500 }
    )
  }
}

// POST /api/team - Add a new team member
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { email, name, role, password } = await request.json()

    if (!email || !name || !role) {
      return NextResponse.json(
        { success: false, error: 'Email, имя и роль обязательны' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existing = await prisma.admin.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      )
    }

    // Password is required for both roles (managers can login with password or Google)
    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Пароль обязателен' },
        { status: 400 }
      )
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const member = await prisma.admin.create({
      data: {
        email,
        name,
        role,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json(
      { success: true, data: member, message: 'Сотрудник добавлен' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}
