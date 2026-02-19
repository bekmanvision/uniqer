export const dynamic = 'force-dynamic'

import prisma from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Card, CardContent } from '@/components/ui'
import {
  Compass,
  Users,
  GraduationCap,
  ClipboardCheck,
  UserCheck,
} from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'programs' })
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
}

async function getPrograms() {
  return prisma.program.findMany({
    orderBy: { order: 'asc' },
  })
}

const programTypeIcons = {
  ORIENTATION: Compass,
  SEMINAR: Users,
  MEETING: GraduationCap,
  TESTING: ClipboardCheck,
  INDIVIDUAL: UserCheck,
}

export default async function ProgramsPage() {
  const programs = await getPrograms()
  const t = await getTranslations('programs')
  const th = await getTranslations('home')

  const programTypeLabels: Record<string, string> = {
    ORIENTATION: t('proforientation'),
    SEMINAR: t('seminar'),
    MEETING: t('uniMeeting'),
    TESTING: t('testing'),
    INDIVIDUAL: t('consultation'),
  }

  const defaultPrograms = [
    {
      type: 'ORIENTATION' as const,
      title: t('proforientation'),
      description: t('defaultProf'),
      content: '',
    },
    {
      type: 'SEMINAR' as const,
      title: t('seminar'),
      description: t('defaultSeminar'),
      content: '',
    },
    {
      type: 'MEETING' as const,
      title: t('uniMeeting'),
      description: t('defaultMeeting'),
      content: '',
    },
    {
      type: 'TESTING' as const,
      title: t('testing'),
      description: t('defaultTesting'),
      content: '',
    },
    {
      type: 'INDIVIDUAL' as const,
      title: t('consultation'),
      description: t('defaultConsultation'),
      content: '',
    },
  ]

  const displayPrograms = programs.length > 0 ? programs : defaultPrograms

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">{t('heading')}</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPrograms.map((program, index) => {
            const Icon = programTypeIcons[program.type] || Compass
            return (
              <Card key={program.title + index}>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{program.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{program.description}</p>
                  {program.content && (
                    <div className="mt-4 whitespace-pre-line text-sm text-gray-600 dark:text-gray-400">
                      {program.content}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 p-8 text-center lg:p-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t('ctaTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            {t('ctaDesc')}
          </p>
          <Link
            href="/tours"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            {th('chooseTour')}
          </Link>
        </div>
      </div>
    </div>
  )
}
