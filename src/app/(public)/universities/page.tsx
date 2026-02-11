export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { UniversityCard } from '@/components/public'
import { UniversityFilters } from './university-filters'

export const metadata: Metadata = {
  title: 'Университеты',
  description: 'Каталог университетов Казахстана, участвующих в кампус-турах UniQer',
}

interface UniversitiesPageProps {
  searchParams: Promise<{ city?: string; type?: string; category?: string }>
}

async function getUniversities(filters: { city?: string; type?: string; category?: string }) {
  const where: Record<string, unknown> = {}

  if (filters.city) where.city = filters.city
  if (filters.type) where.type = filters.type
  if (filters.category) where.categories = { has: filters.category }

  return prisma.university.findMany({
    where,
    orderBy: { name: 'asc' },
  })
}

async function getCities() {
  const universities = await prisma.university.findMany({
    select: { city: true },
    distinct: ['city'],
  })
  return universities.map((u) => u.city)
}

export default async function UniversitiesPage({ searchParams }: UniversitiesPageProps) {
  const params = await searchParams
  const [universities, cities] = await Promise.all([getUniversities(params), getCities()])

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">Университеты</h1>
          <p className="mt-4 text-lg text-gray-600">
            Каталог университетов, участвующих в наших кампус-турах
          </p>
        </div>

        {/* Filters */}
        <UniversityFilters cities={cities} currentFilters={params} />

        {/* Universities Grid */}
        {universities.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {universities.map((university) => (
              <UniversityCard key={university.id} university={university} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg bg-gray-50 py-16 text-center">
            <p className="text-lg text-gray-600">
              Университеты по выбранным критериям не найдены
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
