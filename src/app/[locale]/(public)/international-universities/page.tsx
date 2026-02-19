export const dynamic = 'force-dynamic'

import prisma from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import { InternationalUniversityCard } from '@/components/public'
import { InternationalUniversityFilters } from './filters'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'internationalUniversities' })
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
}

interface PageProps {
  searchParams: Promise<{ country?: string; city?: string; language?: string; dormitory?: string }>
}

async function getUniversities(filters: { country?: string; city?: string; language?: string; dormitory?: string }) {
  const where: Record<string, unknown> = {}

  if (filters.country) where.country = filters.country
  if (filters.city) where.city = filters.city
  if (filters.language) where.language = filters.language
  if (filters.dormitory === 'true') where.hasDormitory = true

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

async function getLanguages() {
  const universities = await prisma.internationalUniversity.findMany({
    select: { language: true },
    distinct: ['language'],
    orderBy: { language: 'asc' },
  })
  return universities.map((u) => u.language).filter(Boolean) as string[]
}

export default async function InternationalUniversitiesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const [universities, countries, cities, languages] = await Promise.all([
    getUniversities(params),
    getCountries(),
    getCities(params.country),
    getLanguages(),
  ])
  const t = await getTranslations('internationalUniversities')

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
        <InternationalUniversityFilters
          countries={countries}
          cities={cities}
          languages={languages}
          currentFilters={params}
          totalCount={universities.length}
        />

        {/* Universities Grid */}
        {universities.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {universities.map((university) => (
              <InternationalUniversityCard key={university.id} university={university} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg bg-gray-50 dark:bg-gray-800/50 py-16 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('noUniversitiesFound')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
