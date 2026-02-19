export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import prisma from '@/lib/prisma'
import { getTranslations, getLocale } from 'next-intl/server'
import { Badge, Card, CardContent } from '@/components/ui'
import { SpecialtiesSection } from '@/components/public'
import {
  MapPin,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Globe,
  GraduationCap,
  Home,
  Banknote,
  Star,
  CheckCircle2,
  Users,
  Languages,
} from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string; locale: string }>
}

async function getUniversity(id: string) {
  return prisma.internationalUniversity.findFirst({
    where: { OR: [{ id }] },
  })
}

export async function generateMetadata({ params }: PageProps) {
  const { id, locale } = await params
  const university = await getUniversity(id)
  const t = await getTranslations({ locale, namespace: 'internationalUniversities' })

  if (!university) {
    return { title: t('pageTitle') }
  }

  return {
    title: `${university.name} — UniQer`,
    description: university.description?.slice(0, 160) || `${university.name} — ${university.country}`,
  }
}

export default async function InternationalUniversityPage({ params }: PageProps) {
  const { id } = await params
  const university = await getUniversity(id)

  if (!university) {
    notFound()
  }

  const t = await getTranslations('internationalUniversities')
  const tc = await getTranslations('common')
  const locale = await getLocale()

  const hasPrice = university.tuitionMin && university.tuitionMin > 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="border-b dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
          {/* Back Link */}
          <Link
            href="/international-universities"
            className="mb-6 inline-flex items-center text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            {t('allInternational')}
          </Link>

          {/* Header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-blue-100 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 lg:h-20 lg:w-20">
                <Globe className="h-8 w-8 text-blue-600 lg:h-10 lg:w-10" />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="info">{university.country}</Badge>
                  {university.worldRanking && (
                    <Badge variant="warning">{university.worldRanking}</Badge>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 lg:text-3xl">
                  {university.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {university.city}, {university.country}
                  </span>
                  {university.founded && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {t('founded', { year: university.founded })}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {university.website && (
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <Globe className="h-4 w-4" />
                {tc('officialWebsite')}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* About */}
            {university.description && (
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{t('aboutUniversity')}</h2>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">{university.description}</p>

                  {university.features.length > 0 && (
                    <div className="mt-6 border-t dark:border-gray-700 pt-6">
                      <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">{t('features')}</h3>
                      <div className="grid gap-2">
                        {university.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tuition */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('tuitionCost')}</h2>
                </div>

                {hasPrice ? (
                  <div className="mb-3 flex items-baseline gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{tc('from')}</span>
                    <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      ${university.tuitionMin!.toLocaleString('en-US')}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">{tc('perYear')}</span>
                    {university.tuitionMax && university.tuitionMax !== university.tuitionMin && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {tc('to')} ${university.tuitionMax.toLocaleString('en-US')}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    {tc('askPrice')}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Specialties */}
            <SpecialtiesSection
              majors={university.allMajors}
              topMajors={university.topMajors}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">{t('information')}</h3>
                <div className="space-y-4">
                  {university.worldRanking && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-900/30">
                        <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('ranking')}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{university.worldRanking}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                      <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t('location')}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{university.city}, {university.country}</p>
                    </div>
                  </div>

                  {university.language && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                        <Languages className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('teachingLanguage')}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{university.language}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
                      <Home className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{tc('dormitory')}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {university.hasDormitory ? tc('yes') : tc('no')}
                      </p>
                    </div>
                  </div>

                  {university.studentCount && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
                        <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('students')}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {university.studentCount.toLocaleString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  )}

                  {university.internationalStudents && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/30">
                        <GraduationCap className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('internationalStudents')}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {university.internationalStudents.toLocaleString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  )}

                  {university.founded && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-900/30">
                        <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('foundedYear')}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{university.founded}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Website */}
            {university.website && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">{t('website')}</h3>
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    {university.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card className="border-0 bg-gradient-to-br from-blue-600 to-blue-700">
              <CardContent className="p-6 text-center">
                <h3 className="mb-2 font-semibold text-white">{t('wantToStudyAbroad')}</h3>
                <p className="mb-4 text-sm text-blue-100">
                  {t('wantToStudyAbroadDesc')}
                </p>
                <Link
                  href="/tours"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                >
                  {t('viewTours')}
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
