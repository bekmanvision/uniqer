import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/partners - Get all partners
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')

    const partners = await prisma.partner.findMany({
      orderBy: { order: 'asc' },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ success: true, data: partners })
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch partners' },
      { status: 500 }
    )
  }
}

// POST /api/partners - Create a new partner
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, logo, website, order } = body

    const partner = await prisma.partner.create({
      data: {
        name,
        logo,
        website,
        order: order || 0,
      },
    })

    return NextResponse.json({ success: true, data: partner }, { status: 201 })
  } catch (error) {
    console.error('Error creating partner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create partner' },
      { status: 500 }
    )
  }
}
