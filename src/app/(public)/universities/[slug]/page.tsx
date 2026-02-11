export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { getUniversityTypeLabel, formatDateRange, formatPrice } from '@/lib/utils'
import { Badge, Card, CardContent } from '@/components/ui'
import {
  MapPin,
  ExternalLink,
  Building2,
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  Globe,
  GraduationCap,
  Home,
  Shield,
  Banknote,
  Star,
  CheckCircle2,
  Users,
  Target,
  Lightbulb,
} from 'lucide-react'

interface UniversityPageProps {
  params: Promise<{ slug: string }>
}

async function getUniversity(slug: string) {
  return prisma.university.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
    include: {
      tours: {
        include: {
          tour: true,
        },
        where: {
          tour: { status: 'OPEN' },
        },
      },
    },
  })
}

export async function generateMetadata({ params }: UniversityPageProps): Promise<Metadata> {
  const { slug } = await params
  const university = await getUniversity(slug)

  if (!university) {
    return { title: 'Университет не найден' }
  }

  return {
    title: `${university.name} — UniQer`,
    description: university.description.slice(0, 160),
  }
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { slug } = await params
  const university = await getUniversity(slug)

  if (!university) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
          {/* Back Link */}
          <Link
            href="/universities"
            className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Все университеты
          </Link>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 lg:h-20 lg:w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100">
                <Building2 className="h-8 w-8 lg:h-10 lg:w-10 text-blue-600" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant={
                    university.type === 'STATE' ? 'info' :
                    university.type === 'AUTONOMOUS' ? 'warning' :
                    university.type === 'BRANCH' ? 'info' : 'default'
                  }>
                    {getUniversityTypeLabel(university.type)}
                  </Badge>
                  {university.grants && <Badge variant="success">Гранты</Badge>}
                  {university.hasMilitary && (
                    <Badge variant="default">
                      <Shield className="h-3 w-3 mr-1" />
                      Военная кафедра
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {university.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {university.city}
                  </span>
                  {university.founded && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      Основан в {university.founded}
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
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <Globe className="h-4 w-4" />
                Официальный сайт
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Об университете</h2>
                <p className="text-gray-600 leading-relaxed">{university.description}</p>

                {/* Features */}
                {university.features && university.features.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Особенности</h3>
                    <div className="grid gap-2">
                      {university.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Кому подходит */}
            {(university as { targetAudience?: string }).targetAudience && (
              <Card className="border-2 border-green-100">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-green-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Кому подходит этот вуз</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {(university as { targetAudience?: string }).targetAudience}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Tuition */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Banknote className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Стоимость обучения</h2>
                </div>

                {university.tuitionMin && university.tuitionMin > 0 ? (
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-sm text-gray-500">от</span>
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(university.tuitionMin)}
                    </span>
                    <span className="text-gray-500">/ год</span>
                    {university.tuitionMax && university.tuitionMax !== university.tuitionMin && (
                      <span className="text-sm text-gray-500">
                        до {formatPrice(university.tuitionMax)}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mb-3">
                    <p className="text-gray-600">
                      {university.grants
                        ? 'Обучение возможно на грантовой основе. Стоимость платного обучения уточняйте на сайте вуза.'
                        : 'Стоимость обучения уточняйте на официальном сайте университета.'}
                    </p>
                  </div>
                )}

                {/* Grant info */}
                {university.grants && (
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 mt-3">
                    <Lightbulb className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-700">
                      <strong>Есть государственные гранты.</strong> Можно поступить бесплатно по результатам ЕНТ.
                    </p>
                  </div>
                )}

                {university.tuitionNote && (
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mt-3">
                    {university.tuitionNote}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Majors */}
            {university.majors.length > 0 && (
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Специальности</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {university.majors.map((major) => (
                      <span
                        key={major}
                        className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {major}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tours */}
            {university.tours.length > 0 && (
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Участвует в турах</h2>
                  </div>
                  <div className="space-y-3">
                    {university.tours.map(({ tour }) => (
                      <Link
                        key={tour.id}
                        href={`/tours/${tour.slug}`}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {tour.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            {formatDateRange(tour.startDate, tour.endDate)}
                          </div>
                        </div>
                        <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180 group-hover:text-blue-600 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Информация</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Тип</p>
                      <p className="text-sm font-medium text-gray-900">
                        {getUniversityTypeLabel(university.type)}
                      </p>
                    </div>
                  </div>

                  {university.ranking && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50">
                        <Star className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Рейтинг</p>
                        <p className="text-sm font-medium text-gray-900">{university.ranking}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                      <GraduationCap className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Гранты</p>
                      <p className="text-sm font-medium text-gray-900">
                        {university.grants ? 'Доступны' : 'Нет информации'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                      <Home className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Общежитие</p>
                      <p className="text-sm font-medium text-gray-900">
                        {university.hasDormitory ? 'Есть' : 'Нет информации'}
                      </p>
                    </div>
                  </div>

                  {university.hasMilitary && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                        <Shield className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Военная кафедра</p>
                        <p className="text-sm font-medium text-gray-900">Есть</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contacts */}
            {(university.address || university.phone || university.email) && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Контакты</h3>
                  <div className="space-y-4">
                    {university.address && (
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 flex-shrink-0">
                          <MapPin className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Адрес</p>
                          <p className="text-sm text-gray-900">{university.address}</p>
                        </div>
                      </div>
                    )}

                    {university.phone && (
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 flex-shrink-0">
                          <Phone className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Телефон</p>
                          <a
                            href={`tel:${university.phone}`}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {university.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {university.email && (
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 flex-shrink-0">
                          <Mail className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <a
                            href={`mailto:${university.email}`}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {university.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {university.website && (
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 flex-shrink-0">
                          <Globe className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Сайт</p>
                          <a
                            href={university.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                          >
                            {university.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-white mb-2">Хотите посетить кампус?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Запишитесь на кампус-тур и узнайте больше об университете
                </p>
                <Link
                  href="/tours"
                  className="inline-flex items-center justify-center w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Смотреть туры
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
