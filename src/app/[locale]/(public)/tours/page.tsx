export const dynamic = 'force-dynamic'

import prisma from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import { TourCard } from '@/components/public'
import { TourFilters } from './tour-filters'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'tours' })
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
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
  const t = await getTranslations('tours')

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">{t('pageTitle')}</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t('subtitle')}
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
          <div className="mt-8 rounded-lg bg-gray-50 dark:bg-gray-800/50 py-16 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('noToursFound')}
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {t('tryOtherFilters')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
