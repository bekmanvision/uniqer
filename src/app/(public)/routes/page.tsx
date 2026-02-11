export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui'
import { formatDateRange } from '@/lib/utils'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Маршруты туров',
  description: 'Маршруты и логистика кампус-туров UniQer',
}

async function getToursWithRoutes() {
  return prisma.tour.findMany({
    where: { status: 'OPEN' },
    include: {
      routes: {
        orderBy: { day: 'asc' },
      },
      universities: {
        include: { university: true },
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { startDate: 'asc' },
  })
}

export default async function RoutesPage() {
  const tours = await getToursWithRoutes()

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">Маршруты туров</h1>
          <p className="mt-4 text-lg text-gray-600">
            Детальные маршруты и точки посещения наших кампус-туров
          </p>
        </div>

        {/* Tours with routes */}
        {tours.length > 0 ? (
          <div className="space-y-8">
            {tours.map((tour) => (
              <Card key={tour.id}>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{tour.title}</h2>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {tour.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDateRange(tour.startDate, tour.endDate)}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                    >
                      Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>

                  {/* Universities list */}
                  {tour.universities.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-500">Точки посещения:</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tour.universities.map(({ university }, index) => (
                          <div
                            key={university.id}
                            className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2"
                          >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                              {index + 1}
                            </span>
                            <span className="text-sm text-gray-700">{university.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Routes */}
                  {tour.routes.length > 0 && (
                    <div className="mt-6 border-t pt-6">
                      <h3 className="text-sm font-medium text-gray-500">Расписание по дням:</h3>
                      <div className="mt-4 space-y-4">
                        {tour.routes.map((route) => {
                          const points = route.points as { time: string; location: string; activity: string }[]
                          return (
                            <div key={route.id}>
                              <h4 className="font-medium text-gray-900">
                                День {route.day}: {route.title}
                              </h4>
                              {points && points.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {points.map((point, i) => (
                                    <div key={i} className="flex gap-4 text-sm">
                                      <span className="w-16 flex-shrink-0 font-medium text-gray-500">
                                        {point.time}
                                      </span>
                                      <span className="text-gray-600">
                                        {point.location} — {point.activity}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 py-16 text-center">
            <p className="text-lg text-gray-600">Маршруты туров пока не добавлены</p>
          </div>
        )}
      </div>
    </div>
  )
}
