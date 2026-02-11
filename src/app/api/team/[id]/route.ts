import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

type RouteParams = { params: Promise<{ id: string }> }

// DELETE /api/team/[id] - Delete a team member
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    // Prevent deleting yourself
    if (id === session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Нельзя удалить самого себя' },
        { status: 400 }
      )
    }

    await prisma.admin.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Сотрудник удалён' })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
}

// PUT /api/team/[id] - Update a team member
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const { name, role } = await request.json()

    const updated = await prisma.admin.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(role && { role }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}
