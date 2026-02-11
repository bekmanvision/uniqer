export const dynamic = 'force-dynamic'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import prisma from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import {
  Map,
  Building2,
  FileText,
  Users,
  TrendingUp,
  Calendar,
} from 'lucide-react'
import Link from 'next/link'

async function getStats() {
  const [
    totalTours,
    activeTours,
    totalApplications,
    newApplications,
    totalUniversities,
    recentApplications,
    confirmedApplications,
  ] = await Promise.all([
    prisma.tour.count(),
    prisma.tour.count({ where: { status: 'OPEN' } }),
    prisma.application.count(),
    prisma.application.count({ where: { status: 'NEW' } }),
    prisma.university.count(),
    prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { tour: true },
    }),
    prisma.application.findMany({
      where: { status: 'CONFIRMED' },
      include: { tour: { select: { price: true } } },
    }),
  ])

  const totalRevenue = confirmedApplications.reduce((sum, app) => {
    return sum + (app.tour?.price || 0)
  }, 0)

  return {
    totalTours,
    activeTours,
    totalApplications,
    newApplications,
    totalUniversities,
    totalRevenue,
    recentApplications,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    {
      title: 'Всего туров',
      value: stats.totalTours,
      icon: Map,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/admin/tours',
    },
    {
      title: 'Активных туров',
      value: stats.activeTours,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/admin/tours',
    },
    {
      title: 'Университетов',
      value: stats.totalUniversities,
      icon: Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/admin/universities',
    },
    {
      title: 'Всего заявок',
      value: stats.totalApplications,
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      href: '/admin/applications',
    },
    {
      title: 'Новых заявок',
      value: stats.newApplications,
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      href: '/admin/applications?status=NEW',
    },
    {
      title: 'Выручка',
      value: formatPrice(stats.totalRevenue),
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      href: '/admin/applications',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-gray-600">Обзор статистики платформы UniQer</p>

      {/* Stats Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`rounded-lg ${stat.bgColor} p-3`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Applications */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Последние заявки</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentApplications.length > 0 ? (
            <div className="space-y-4">
              {stats.recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">{app.name}</p>
                    <p className="text-sm text-gray-500">
                      {app.tour?.title || 'Контакт'} • {app.phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        app.status === 'NEW'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'CONFIRMED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {app.status === 'NEW'
                        ? 'Новая'
                        : app.status === 'CONFIRMED'
                        ? 'Подтверждена'
                        : app.status}
                    </span>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
              ))}
              <Link
                href="/admin/applications"
                className="block text-center text-sm text-blue-600 hover:text-blue-700"
              >
                Смотреть все заявки →
              </Link>
            </div>
          ) : (
            <p className="text-center text-gray-500">Заявок пока нет</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
