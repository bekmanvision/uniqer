import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Card, CardContent } from '@/components/ui'
import {
  Target,
  Heart,
  Lightbulb,
  Users,
  GraduationCap,
  MapPin,
} from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
}

export default async function AboutPage() {
  const t = await getTranslations('about')
  const th = await getTranslations('home')

  const values = [
    {
      icon: Target,
      title: t('value1Title'),
      description: t('value1Desc'),
    },
    {
      icon: Heart,
      title: t('value2Title'),
      description: t('value2Desc'),
    },
    {
      icon: Lightbulb,
      title: t('value3Title'),
      description: t('value3Desc'),
    },
  ]

  const stats = [
    { value: '500+', label: t('statsParticipants') },
    { value: '15+', label: t('statsPartners') },
    { value: '5', label: t('statsCities') },
    { value: '98%', label: t('statsSatisfied') },
  ]

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">{t('heading')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {t('intro')}
          </p>
        </div>

        {/* Mission */}
        <div className="mt-16 rounded-2xl bg-blue-600 p-8 text-white lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold lg:text-3xl">{t('missionTitle')}</h2>
            <p className="mt-4 text-lg text-blue-100">
              {t('missionText')}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100 lg:text-3xl">
            {t('valuesTitle')}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <value.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{value.title}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 rounded-2xl bg-gray-50 dark:bg-gray-900 p-8 lg:p-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* What we do */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100 lg:text-3xl">
            {t('whatWeDoTitle')}
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">{t('whatWeDo1Title')}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('whatWeDo1Desc')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">{t('whatWeDo2Title')}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('whatWeDo2Desc')}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">{t('whatWeDo3Title')}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {t('whatWeDo3Desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
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
