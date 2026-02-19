import { getTranslations } from 'next-intl/server'
import { Card, CardContent } from '@/components/ui'
import { ApplicationForm } from '@/components/public'
import {
  Building,
  Users,
  Award,
  FileText,
  CheckCircle,
  Phone,
} from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'forSchools' })
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
}

export default async function ForSchoolsPage() {
  const t = await getTranslations('forSchools')

  const benefits = [
    {
      icon: Building,
      title: t('benefit1Title'),
      description: t('benefit1Desc'),
    },
    {
      icon: Users,
      title: t('benefit2Title'),
      description: t('benefit2Desc'),
    },
    {
      icon: Award,
      title: t('benefit3Title'),
      description: t('benefit3Desc'),
    },
    {
      icon: FileText,
      title: t('benefit4Title'),
      description: t('benefit4Desc'),
    },
  ]

  const formats = [
    {
      title: t('format1Title'),
      description: t('format1Desc'),
      features: [t('format1Feature1'), t('format1Feature2'), t('format1Feature3')],
    },
    {
      title: t('format2Title'),
      description: t('format2Desc'),
      features: [
        t('format2Feature1'),
        t('format2Feature2'),
        t('format2Feature3'),
        t('format2Feature4'),
      ],
    },
    {
      title: t('format3Title'),
      description: t('format3Desc'),
      features: [
        t('format3Feature1'),
        t('format3Feature2'),
        t('format3Feature3'),
        t('format3Feature4'),
      ],
    },
  ]

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">{t('heading')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Benefits */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <benefit.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">{benefit.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Formats */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100 lg:text-3xl">
            {t('formatsTitle')}
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {formats.map((format) => (
              <Card key={format.title}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{format.title}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{format.description}</p>
                  <ul className="mt-4 space-y-2">
                    {format.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('contactTitle')}</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {t('contactDesc')}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('phoneForSchools')}</p>
                  <a href="https://wa.me/77762121242" className="font-medium text-gray-900 dark:text-gray-100">
                    +7 776 212 1242
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300">{t('benefitsBoxTitle')}</h3>
              <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-300">
                <li>• {t('benefitsBox1')}</li>
                <li>• {t('benefitsBox2')}</li>
                <li>• {t('benefitsBox3')}</li>
                <li>• {t('benefitsBox4')}</li>
              </ul>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{t('formCardTitle')}</h3>
              <ApplicationForm type="B2B" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
