export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import prisma from '@/lib/prisma'
import { getTranslations, getLocale } from 'next-intl/server'
import { formatPrice, formatDateRange, getStatusColor } from '@/lib/utils'
import { Button, Badge, Card, CardContent } from '@/components/ui'
import { ApplicationForm } from '@/components/public'
import {
  MapPin,
  Calendar,
  Users,
  GraduationCap,
  CheckCircle,
  Building2,
  ArrowLeft,
  Target,
  BookOpen,
  TrendingUp,
  Award,
  Heart,
  Lightbulb,
} from 'lucide-react'

interface TourPageProps {
  params: Promise<{ slug: string; locale: string }>
}

async function getTour(slug: string) {
  return prisma.tour.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
    include: {
      universities: {
        include: { university: true },
        orderBy: { order: 'asc' },
      },
      routes: {
        orderBy: { day: 'asc' },
      },
    },
  })
}

export async function generateMetadata({ params }: TourPageProps) {
  const { slug, locale } = await params
  const tour = await getTour(slug)
  const t = await getTranslations({ locale, namespace: 'tours' })

  if (!tour) {
    return { title: t('tourNotFound') }
  }

  return {
    title: tour.title,
    description: tour.description.slice(0, 160),
  }
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params
  const tour = await getTour(slug)

  if (!tour) {
    notFound()
  }

  const t = await getTranslations('tours')
  const tc = await getTranslations('common')
  const ts = await getTranslations('statuses')
  const locale = await getLocale()

  const program = tour.program as { day: number; title: string; activities: string[] }[]
  const statusVariant =
    tour.status === 'OPEN' ? 'success' : tour.status === 'CLOSED' ? 'danger' : 'default'

  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Back Link */}
        <Link
          href="/tours"
          className="mb-6 inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          {t('allTours')}
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={statusVariant}>{ts(tour.status as 'OPEN' | 'CLOSED' | 'CANCELLED')}</Badge>
                {tour.featured && <Badge variant="info">{tc('popular')}</Badge>}
              </div>
              <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">{tour.title}</h1>

              <div className="mt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  {tour.city}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  {formatDateRange(tour.startDate, tour.endDate, locale)}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  {tc('seatsOf', { left: tour.seatsLeft, total: tour.seats })}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <GraduationCap className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  {tc('grade', { grade: tour.grade })}
                </div>
              </div>
            </div>

            {/* Images */}
            {tour.images.length > 0 && (
              <div className="mt-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {tour.images.slice(0, 4).map((image, i) => (
                    <div
                      key={i}
                      className={`relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 ${
                        i === 0 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <Image src={image} alt={`${tour.title} - ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What participant gets */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('whatParticipantGets')}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border-2 border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">{t('uniRecommendations')}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('uniRecommendationsDesc')}</p>
                </div>
                <div className="rounded-xl border-2 border-green-100 dark:border-green-800 bg-green-50 dark:bg-green-900/30 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">{t('majorSelection')}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('majorSelectionDesc')}</p>
                </div>
                <div className="rounded-xl border-2 border-purple-100 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/30 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">{t('enrollmentPlan')}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('enrollmentPlanDesc')}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('tourProgram')}</h2>
              <div className="mt-4 whitespace-pre-line text-gray-600 dark:text-gray-400">{tour.description}</div>
            </div>

            {/* Program */}
            {program && program.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('tourProgram')}</h2>
                <div className="mt-4 space-y-4">
                  {program.map((day) => (
                    <Card key={day.day}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {tc('day', { day: day.day })}: {day.title}
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {day.activities.map((activity, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Result after tour */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('resultAfterTour')}</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {/* For student */}
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-blue-600">
                      <BookOpen className="h-5 w-5" />
                      <h3 className="font-semibold">{t('forStudent')}</h3>
                    </div>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{t('studentBenefit1')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{t('studentBenefit2')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{t('studentBenefit3')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{t('studentBenefit4')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                {/* For parent */}
                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-purple-600">
                      <Heart className="h-5 w-5" />
                      <h3 className="font-semibold">{t('forParent')}</h3>
                    </div>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{t('parentBenefit1')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{t('parentBenefit2')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{t('parentBenefit3')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{t('parentBenefit4')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Universities */}
            {tour.universities.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('universities')}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {tour.universities.map(({ university }) => (
                    <Link key={university.id} href={`/universities/${university.slug}`}>
                      <Card className="h-full transition-shadow hover:shadow-md">
                        <CardContent className="flex items-center gap-4 p-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                            {university.logo ? (
                              <Image
                                src={university.logo}
                                alt={university.name}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            ) : (
                              <Building2 className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">{university.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{university.city}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Includes */}
            {tour.includes.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('whatIncluded')}</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {tour.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6 text-center">
                    <span className="text-3xl font-bold text-blue-600">{formatPrice(tour.price, locale)}</span>
                    <span className="text-gray-500 dark:text-gray-400"> {tc('perPerson')}</span>
                  </div>

                  <div className="mb-6 space-y-3 border-y border-gray-100 dark:border-gray-700 py-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{t('city')}</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{tour.city}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{t('dates')}</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatDateRange(tour.startDate, tour.endDate, locale)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{t('freeSeats')}</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{tour.seatsLeft}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{tc('grade', { grade: '' }).trim()}</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{tour.grade}</span>
                    </div>
                  </div>

                  {tour.status === 'OPEN' && tour.seatsLeft > 0 ? (
                    <ApplicationForm tourId={tour.id} tourTitle={tour.title} type="TOUR" />
                  ) : (
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4 text-center">
                      <p className="text-gray-600 dark:text-gray-400">
                        {tour.seatsLeft === 0
                          ? t('allSeatsTaken')
                          : t('enrollmentClosed')}
                      </p>
                      <Link href="/tours" className="mt-4 block">
                        <Button variant="outline" className="w-full">
                          {t('viewOtherTours')}
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
