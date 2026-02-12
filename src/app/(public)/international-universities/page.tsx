export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { InternationalUniversityCard } from '@/components/public'
import { InternationalUniversityFilters } from './filters'

export const metadata: Metadata = {
  title: 'Зарубежные университеты',
  description: 'Каталог зарубежных университетов — ОАЭ, Турция, Китай и другие страны',
}

interface PageProps {
  searchParams: Promise<{ country?: string; city?: string }>
}

async function getUniversities(filters: { country?: string; city?: string }) {
  const where: Record<string, unknown> = {}

  if (filters.country) where.country = filters.country
  if (filters.city) where.city = filters.city

  return prisma.internationalUniversity.findMany({
    where,
    orderBy: { name: 'asc' },
  })
}

async function getCountries() {
  const universities = await prisma.internationalUniversity.findMany({
    select: { country: true },
    distinct: ['country'],
    orderBy: { country: 'asc' },
  })
  return universities.map((u) => u.country)
}

async function getCities(country?: string) {
  const where: Record<string, unknown> = {}
  if (country) where.country = country

  const universities = await prisma.internationalUniversity.findMany({
    where,
    select: { city: true },
    distinct: ['city'],
    orderBy: { city: 'asc' },
  })
  return universities.map((u) => u.city)
}

export default async function InternationalUniversitiesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const [universities, countries, cities] = await Promise.all([
    getUniversities(params),
    getCountries(),
    getCities(params.country),
  ])

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">Зарубежные университеты</h1>
          <p className="mt-4 text-lg text-gray-600">
            Каталог зарубежных университетов для абитуриентов из Казахстана
          </p>
        </div>

        {/* Filters */}
        <InternationalUniversityFilters
          countries={countries}
          cities={cities}
          currentFilters={params}
        />

        {/* Universities Grid */}
        {universities.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {universities.map((university) => (
              <InternationalUniversityCard key={university.id} university={university} />
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
