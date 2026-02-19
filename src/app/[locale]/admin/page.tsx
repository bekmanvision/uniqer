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
import { Link } from '@/i18n/navigation'
import { getTranslations, getLocale } from 'next-intl/server'

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
  const t = await getTranslations('admin')
  const ts = await getTranslations('statuses')
  const locale = await getLocale()

  const statCards = [
    {
      title: t('totalTours'),
      value: stats.totalTours,
      icon: Map,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/admin/tours',
    },
    {
      title: t('activeTours'),
      value: stats.activeTours,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/admin/tours',
    },
    {
      title: t('totalUnis'),
      value: stats.totalUniversities,
      icon: Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/admin/universities',
    },
    {
      title: t('totalApplications'),
      value: stats.totalApplications,
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      href: '/admin/applications',
    },
    {
      title: t('newApplications'),
      value: stats.newApplications,
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      href: '/admin/applications?status=NEW',
    },
    {
      title: t('revenue'),
      value: formatPrice(stats.totalRevenue, locale),
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      href: '/admin/applications',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{t('statsOverview')}</p>

      {/* Stats Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
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
          <CardTitle>{t('recentApplications')}</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentApplications.length > 0 ? (
            <div className="space-y-4">
              {stats.recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-lg border dark:border-gray-700 p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{app.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {app.tour?.title || 'Контакт'} • {app.phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        app.status === 'NEW'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                          : app.status === 'CONFIRMED'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {ts(app.status)}
                    </span>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(app.createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'kk' ? 'kk-KZ' : 'ru-RU')}
                    </p>
                  </div>
                </div>
              ))}
              <Link
                href="/admin/applications"
                className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                {t('viewAllApplications')}
              </Link>
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">{t('noApplicationsYet')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
