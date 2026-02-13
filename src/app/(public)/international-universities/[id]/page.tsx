export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Badge, Card, CardContent } from '@/components/ui'
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
  params: Promise<{ id: string }>
}

async function getUniversity(id: string) {
  return prisma.internationalUniversity.findFirst({
    where: { OR: [{ id }] },
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const university = await getUniversity(id)

  if (!university) {
    return { title: 'Университет не найден' }
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

  const hasPrice = university.tuitionMin && university.tuitionMin > 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
          {/* Back Link */}
          <Link
            href="/international-universities"
            className="mb-6 inline-flex items-center text-sm text-gray-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Все зарубежные вузы
          </Link>

          {/* Header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100 lg:h-20 lg:w-20">
                <Globe className="h-8 w-8 text-blue-600 lg:h-10 lg:w-10" />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="info">{university.country}</Badge>
                  {university.worldRanking && (
                    <Badge variant="warning">{university.worldRanking}</Badge>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                  {university.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {university.city}, {university.country}
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
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
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
          <div className="space-y-8 lg:col-span-2">
            {/* About */}
            {university.description && (
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">Об университете</h2>
                  <p className="leading-relaxed text-gray-600">{university.description}</p>

                  {university.features.length > 0 && (
                    <div className="mt-6 border-t pt-6">
                      <h3 className="mb-3 text-sm font-medium text-gray-900">Особенности</h3>
                      <div className="grid gap-2">
                        {university.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
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
                  <h2 className="text-lg font-semibold text-gray-900">Стоимость обучения</h2>
                </div>

                {hasPrice ? (
                  <div className="mb-3 flex items-baseline gap-2">
                    <span className="text-sm text-gray-500">от</span>
                    <span className="text-3xl font-bold text-gray-900">
                      ${university.tuitionMin!.toLocaleString('en-US')}
                    </span>
                    <span className="text-gray-500">/ год</span>
                    {university.tuitionMax && university.tuitionMax !== university.tuitionMin && (
                      <span className="text-sm text-gray-500">
                        до ${university.tuitionMax.toLocaleString('en-US')}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Стоимость обучения уточняйте на официальном сайте университета.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Specialties */}
            {(university.topMajors.length > 0 || university.allMajors.length > 0) && (
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <div className="mb-4 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Специальности бакалавриата</h2>
                    <span className="text-sm text-gray-400">
                      ({university.allMajors.length || university.topMajors.length})
                    </span>
                  </div>

                  {university.topMajors.length > 0 && university.allMajors.length > 0 && (
                    <div className="mb-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Топовые направления</p>
                      <div className="flex flex-wrap gap-2">
                        {university.topMajors.map((major) => (
                          <span
                            key={major}
                            className="rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-800"
                          >
                            {major}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {university.allMajors.length > 0 ? (
                    <div>
                      {university.topMajors.length > 0 && (
                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Все специальности</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {university.allMajors.map((major) => (
                          <span
                            key={major}
                            className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                          >
                            {major}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {university.topMajors.map((major) => (
                        <span
                          key={major}
                          className="rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-800"
                        >
                          {major}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-gray-900">Информация</h3>
                <div className="space-y-4">
                  {university.worldRanking && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50">
                        <Star className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Рейтинг</p>
                        <p className="text-sm font-medium text-gray-900">{university.worldRanking}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Расположение</p>
                      <p className="text-sm font-medium text-gray-900">{university.city}, {university.country}</p>
                    </div>
                  </div>

                  {university.language && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                        <Languages className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Язык обучения</p>
                        <p className="text-sm font-medium text-gray-900">{university.language}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
                      <Home className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Общежитие</p>
                      <p className="text-sm font-medium text-gray-900">
                        {university.hasDormitory ? 'Есть' : 'Нет'}
                      </p>
                    </div>
                  </div>

                  {university.studentCount && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Студентов</p>
                        <p className="text-sm font-medium text-gray-900">
                          {university.studentCount.toLocaleString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  )}

                  {university.internationalStudents && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50">
                        <GraduationCap className="h-4 w-4 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Иностранных студентов</p>
                        <p className="text-sm font-medium text-gray-900">
                          {university.internationalStudents.toLocaleString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  )}

                  {university.founded && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                        <Calendar className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Год основания</p>
                        <p className="text-sm font-medium text-gray-900">{university.founded}</p>
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
                  <h3 className="mb-4 font-semibold text-gray-900">Сайт</h3>
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
                <h3 className="mb-2 font-semibold text-white">Хотите учиться за рубежом?</h3>
                <p className="mb-4 text-sm text-blue-100">
                  Запишитесь на кампус-тур и узнайте больше о поступлении
                </p>
                <Link
                  href="/tours"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
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
