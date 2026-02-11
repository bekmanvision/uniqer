export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { formatPrice, formatDateRange, getStatusLabel, getStatusColor } from '@/lib/utils'
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
  params: Promise<{ slug: string }>
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

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params
  const tour = await getTour(slug)

  if (!tour) {
    return { title: 'Тур не найден' }
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

  const program = tour.program as { day: number; title: string; activities: string[] }[]
  const statusVariant =
    tour.status === 'OPEN' ? 'success' : tour.status === 'CLOSED' ? 'danger' : 'default'

  return (
    <div className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Back Link */}
        <Link
          href="/tours"
          className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Все туры
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={statusVariant}>{getStatusLabel(tour.status)}</Badge>
                {tour.featured && <Badge variant="info">Популярный</Badge>}
              </div>
              <h1 className="mt-4 text-3xl font-bold text-gray-900 lg:text-4xl">{tour.title}</h1>

              <div className="mt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  {tour.city}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  {formatDateRange(tour.startDate, tour.endDate)}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-5 w-5 text-gray-400" />
                  {tour.seatsLeft} мест из {tour.seats}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap className="h-5 w-5 text-gray-400" />
                  {tour.grade} класс
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
                      className={`relative aspect-video overflow-hidden rounded-xl bg-gray-100 ${
                        i === 0 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <Image src={image} alt={`${tour.title} - фото ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Что получит участник */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Что получит участник</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border-2 border-blue-100 bg-blue-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900">Рекомендации по вузам</h3>
                  <p className="mt-1 text-sm text-gray-600">Персональный список подходящих университетов</p>
                </div>
                <div className="rounded-xl border-2 border-green-100 bg-green-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900">Подбор специальностей</h3>
                  <p className="mt-1 text-sm text-gray-600">Профориентация и выбор направления</p>
                </div>
                <div className="rounded-xl border-2 border-purple-100 bg-purple-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900">План поступления</h3>
                  <p className="mt-1 text-sm text-gray-600">Чёткая траектория подготовки к ЕНТ</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">О туре</h2>
              <div className="mt-4 whitespace-pre-line text-gray-600">{tour.description}</div>
            </div>

            {/* Program */}
            {program && program.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">Программа тура</h2>
                <div className="mt-4 space-y-4">
                  {program.map((day) => (
                    <Card key={day.day}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900">
                          День {day.day}: {day.title}
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {day.activities.map((activity, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600">
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

            {/* Результат после тура */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Результат после тура</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {/* Для ученика */}
                <Card className="border-2 border-blue-200">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-blue-600">
                      <BookOpen className="h-5 w-5" />
                      <h3 className="font-semibold">Для ученика</h3>
                    </div>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>Понимает, в какой вуз хочет поступить</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>Знает, какие предметы ЕНТ нужно сдавать</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>Выбрал специальность осознанно</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>Мотивирован готовиться к поступлению</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                {/* Для родителя */}
                <Card className="border-2 border-purple-200">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-purple-600">
                      <Heart className="h-5 w-5" />
                      <h3 className="font-semibold">Для родителя</h3>
                    </div>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>Спокойствие — ребёнок определился с выбором</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>Понимание стоимости обучения и грантов</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>Чёткий план действий до ЕНТ</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>Документы: договор, чек, сертификат</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Universities */}
            {tour.universities.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">Университеты</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {tour.universities.map(({ university }) => (
                    <Link key={university.id} href={`/universities/${university.slug}`}>
                      <Card className="h-full transition-shadow hover:shadow-md">
                        <CardContent className="flex items-center gap-4 p-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                            {university.logo ? (
                              <Image
                                src={university.logo}
                                alt={university.name}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            ) : (
                              <Building2 className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{university.name}</h3>
                            <p className="text-sm text-gray-500">{university.city}</p>
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
                <h2 className="text-xl font-semibold text-gray-900">Что входит в стоимость</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {tour.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
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
                    <span className="text-3xl font-bold text-blue-600">{formatPrice(tour.price)}</span>
                    <span className="text-gray-500"> / чел.</span>
                  </div>

                  <div className="mb-6 space-y-3 border-y border-gray-100 py-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Город</span>
                      <span className="font-medium text-gray-900">{tour.city}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Даты</span>
                      <span className="font-medium text-gray-900">
                        {formatDateRange(tour.startDate, tour.endDate)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Свободных мест</span>
                      <span className="font-medium text-gray-900">{tour.seatsLeft}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Класс</span>
                      <span className="font-medium text-gray-900">{tour.grade}</span>
                    </div>
                  </div>

                  {tour.status === 'OPEN' && tour.seatsLeft > 0 ? (
                    <ApplicationForm tourId={tour.id} tourTitle={tour.title} type="TOUR" />
                  ) : (
                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                      <p className="text-gray-600">
                        {tour.seatsLeft === 0
                          ? 'Все места заняты'
                          : 'Набор на этот тур закрыт'}
                      </p>
                      <Link href="/tours" className="mt-4 block">
                        <Button variant="outline" className="w-full">
                          Посмотреть другие туры
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
