import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { formatDate, getRoleLabel, getStatusLabel } from '@/lib/utils'
import { ApplicationStatus, ApplicantRole, ApplicationType } from '@prisma/client'

// GET /api/export/applications - Export applications to CSV
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as ApplicationStatus | null
    const role = searchParams.get('role') as ApplicantRole | null
    const type = searchParams.get('type') as ApplicationType | null
    const tourId = searchParams.get('tourId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: Record<string, unknown> = {}

    if (status) where.status = status
    if (role) where.role = role
    if (type) where.type = type
    if (tourId) where.tourId = tourId
    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) (where.createdAt as Record<string, Date>).gte = new Date(startDate)
      if (endDate) (where.createdAt as Record<string, Date>).lte = new Date(endDate)
    }

    const applications = await prisma.application.findMany({
      where,
      include: {
        tour: {
          select: {
            title: true,
            city: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Generate CSV
    const headers = [
      'ID',
      'Имя',
      'Телефон',
      'Email',
      'Роль',
      'Тур',
      'Город',
      'Тип заявки',
      'Статус',
      'Сообщение',
      'Источник',
      'Дата создания',
    ]

    const rows = applications.map((app) => [
      app.id,
      app.name,
      app.phone,
      app.email || '',
      getRoleLabel(app.role),
      app.tour?.title || '',
      app.tour?.city || '',
      app.type,
      getStatusLabel(app.status),
      (app.message || '').replace(/"/g, '""'),
      app.source || '',
      formatDate(app.createdAt),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${cell}"`).join(',')
      ),
    ].join('\n')

    // Add BOM for Excel UTF-8 support
    const bom = '\uFEFF'
    const csvWithBom = bom + csvContent

    return new NextResponse(csvWithBom, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="applications-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Error exporting applications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to export applications' },
      { status: 500 }
    )
  }
}
