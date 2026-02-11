export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { TourCard } from '@/components/public'
import { TourFilters } from './tour-filters'

export const metadata: Metadata = {
  title: 'Кампус-туры',
  description: 'Выберите подходящий кампус-тур по университетам Казахстана',
}

interface ToursPageProps {
  searchParams: Promise<{ city?: string; grade?: string; status?: string }>
}

async function getTours(filters: { city?: string; grade?: string; status?: string }) {
  const where: Record<string, unknown> = {}

  if (filters.city) where.city = filters.city
  if (filters.grade) where.grade = { contains: filters.grade }
  if (filters.status) where.status = filters.status

  return prisma.tour.findMany({
    where,
    include: {
      universities: {
        include: { university: true },
      },
    },
    orderBy: { startDate: 'asc' },
  })
}

async function getCities() {
  const tours = await prisma.tour.findMany({
    select: { city: true },
    distinct: ['city'],
  })
  return tours.map((t) => t.city)
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const params = await searchParams
  const [tours, cities] = await Promise.all([getTours(params), getCities()])

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">Кампус-туры</h1>
          <p className="mt-4 text-lg text-gray-600">
            Выберите тур и отправьтесь в путешествие по лучшим университетам Казахстана
          </p>
        </div>

        {/* Filters */}
        <TourFilters cities={cities} currentFilters={params} />

        {/* Tours Grid */}
        {tours.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg bg-gray-50 py-16 text-center">
            <p className="text-lg text-gray-600">
              Туры по выбранным критериям не найдены
            </p>
            <p className="mt-2 text-gray-500">
              Попробуйте изменить фильтры или посмотрите все доступные туры
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
