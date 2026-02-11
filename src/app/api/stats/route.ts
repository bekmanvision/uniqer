import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/stats - Get dashboard statistics
export async function GET() {
  try {
    const [
      totalTours,
      activeTours,
      totalApplications,
      newApplications,
      totalUniversities,
      seatsData,
      confirmedApplications,
    ] = await Promise.all([
      prisma.tour.count(),
      prisma.tour.count({ where: { status: 'OPEN' } }),
      prisma.application.count(),
      prisma.application.count({ where: { status: 'NEW' } }),
      prisma.university.count(),
      prisma.tour.aggregate({
        _sum: { seats: true },
      }),
      prisma.application.findMany({
        where: { status: 'CONFIRMED' },
        include: { tour: { select: { price: true } } },
      }),
    ])

    // Calculate total revenue from confirmed applications
    const totalRevenue = confirmedApplications.reduce((sum, app) => {
      return sum + (app.tour?.price || 0)
    }, 0)

    const stats = {
      totalTours,
      activeTours,
      totalApplications,
      newApplications,
      totalUniversities,
      totalSeats: seatsData._sum.seats || 0,
      totalRevenue,
    }

    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
