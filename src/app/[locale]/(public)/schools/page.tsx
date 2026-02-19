import { getTranslations } from 'next-intl/server'
import { Button, Card, CardContent } from '@/components/ui'
import { ApplicationForm } from '@/components/public'
import {
  CheckCircle,
  FileText,
  Users,
  Award,
  BarChart3,
  Shield,
  Clock,
  ArrowRight,
  Building2,
  GraduationCap,
  Target,
} from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'schools' })
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
}

export default async function SchoolsPage() {
  const t = await getTranslations('schools')

  const benefits = [
    {
      icon: Target,
      title: t('benefit1Title'),
      description: t('benefit1Desc'),
    },
    {
      icon: FileText,
      title: t('benefit2Title'),
      description: t('benefit2Desc'),
    },
    {
      icon: Award,
      title: t('benefit3Title'),
      description: t('benefit3Desc'),
    },
    {
      icon: Shield,
      title: t('benefit4Title'),
      description: t('benefit4Desc'),
    },
    {
      icon: BarChart3,
      title: t('benefit5Title'),
      description: t('benefit5Desc'),
    },
    {
      icon: Clock,
      title: t('benefit6Title'),
      description: t('benefit6Desc'),
    },
  ]

  const included = [
    t('included1'),
    t('included2'),
    t('included3'),
    t('included4'),
    t('included5'),
    t('included6'),
    t('included7'),
    t('included8'),
    t('included9'),
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 lg:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm mb-6">
                <Building2 className="h-4 w-4" />
                {t('badge')}
              </div>
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl xl:text-5xl">
                {t('heroTitle')}
              </h1>
              <p className="mt-6 text-lg text-blue-100 lg:text-xl">
                {t('heroDesc')}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#form">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    {t('getProposal')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm text-blue-200">{t('statsSchools')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-blue-200">{t('statsStudents')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm text-blue-200">{t('statsUnis')}</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/10 p-6">
                    <GraduationCap className="h-8 w-8 mb-3" />
                    <h3 className="font-semibold">{t('proforientationCard')}</h3>
                    <p className="mt-1 text-sm text-blue-200">{t('proforientationDesc')}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-6">
                    <FileText className="h-8 w-8 mb-3" />
                    <h3 className="font-semibold">{t('documentsCard')}</h3>
                    <p className="mt-1 text-sm text-blue-200">{t('documentsDesc')}</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl bg-white/10 p-6">
                    <Users className="h-8 w-8 mb-3" />
                    <h3 className="font-semibold">{t('groupsCard')}</h3>
                    <p className="mt-1 text-sm text-blue-200">{t('groupsDesc')}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-6">
                    <Award className="h-8 w-8 mb-3" />
                    <h3 className="font-semibold">{t('certificatesCard')}</h3>
                    <p className="mt-1 text-sm text-blue-200">{t('certificatesDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">
              {t('benefitsTitle')}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {t('benefitsSubtitle')}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <benefit.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">
                {t('includedTitle')}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                {t('includedSubtitle')}
              </p>
              <div className="mt-8 grid gap-3">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('pricingLabel')}</div>
                    <div className="text-4xl font-bold text-blue-600">{t('pricingValue')}</div>
                    <div className="text-gray-500 dark:text-gray-400 mt-1">{t('pricingNote')}</div>
                  </div>
                  <div className="space-y-3 border-t dark:border-gray-700 pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{t('groupFrom')}</span>
                      <span className="font-medium">{t('groupFromValue')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{t('duration')}</span>
                      <span className="font-medium">{t('durationValue')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{t('unisLabel')}</span>
                      <span className="font-medium">{t('unisValue')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{t('accompanyLabel')}</span>
                      <span className="font-medium">{t('accompanyValue')}</span>
                    </div>
                  </div>
                  <a href="#form" className="block mt-6">
                    <Button className="w-full">
                      {t('requestCalculation')}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">
              {t('formTitle')}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {t('formSubtitle')}
            </p>
          </div>
          <Card>
            <CardContent className="p-8">
              <ApplicationForm type="B2B" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-gray-900 py-16 lg:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold lg:text-4xl">{t('trustTitle')}</h2>
            <p className="mt-4 text-lg text-gray-400">
              {t('trustSubtitle')}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-semibold">{t('trustDoc1')}</h3>
              <p className="mt-1 text-sm text-gray-400">{t('trustDoc1Desc')}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-semibold">{t('trustDoc2')}</h3>
              <p className="mt-1 text-sm text-gray-400">{t('trustDoc2Desc')}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-semibold">{t('trustDoc3')}</h3>
              <p className="mt-1 text-sm text-gray-400">{t('trustDoc3Desc')}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-semibold">{t('trustDoc4')}</h3>
              <p className="mt-1 text-sm text-gray-400">{t('trustDoc4Desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
