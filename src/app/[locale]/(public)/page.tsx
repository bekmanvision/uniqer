'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button, Card, CardContent } from '@/components/ui'
import { ApplicationForm, TourCard } from '@/components/public'
import type { Tour } from '@/types'
import {
  GraduationCap,
  CheckCircle,
  Star,
  ArrowRight,
  Target,
  Compass,
  MessageCircle,
  TrendingUp,
  BookOpen,
  X,
} from 'lucide-react'

export default function HomePage() {
  const t = useTranslations('home')
  const tc = useTranslations('common')

  const [tours, setTours] = useState<Tour[]>([])
  const [showTourModal, setShowTourModal] = useState(false)
  const [selectedTour, setSelectedTour] = useState<{ id: string; title: string } | null>(null)

  useEffect(() => {
    fetch('/api/tours?limit=6')
      .then((res) => res.json())
      .then((data) => { if (data.success) setTours(data.data) })
      .catch(() => {})
  }, [])

  const openTourModal = (tourId: string, tourTitle: string) => {
    setSelectedTour({ id: tourId, title: tourTitle })
    setShowTourModal(true)
  }

  const closeTourModal = () => {
    setShowTourModal(false)
    setSelectedTour(null)
  }

  const howItWorks = [
    {
      step: 1,
      title: t('steps.step1Title'),
      description: t('steps.step1Desc'),
      icon: Compass,
    },
    {
      step: 2,
      title: t('steps.step2Title'),
      description: t('steps.step2Desc'),
      icon: CheckCircle,
    },
    {
      step: 3,
      title: t('steps.step3Title'),
      description: t('steps.step3Desc'),
      icon: MessageCircle,
    },
    {
      step: 4,
      title: t('steps.step4Title'),
      description: t('steps.step4Desc'),
      icon: Target,
    },
  ]

  const features = [
    {
      title: t('features.campusIntroTitle'),
      description: t('features.campusIntroDesc'),
      icon: GraduationCap,
    },
    {
      title: t('features.directionTitle'),
      description: t('features.directionDesc'),
      icon: Target,
    },
    {
      title: t('features.entTitle'),
      description: t('features.entDesc'),
      icon: BookOpen,
    },
    {
      title: t('features.decisionTitle'),
      description: t('features.decisionDesc'),
      icon: TrendingUp,
    },
  ]

  const heroTriggers = [
    {
      icon: GraduationCap,
      title: t('triggers.topUnis'),
      subtitle: t('triggers.topUnisSub'),
    },
    {
      icon: Compass,
      title: t('triggers.proforientation'),
      subtitle: t('triggers.proforientationSub'),
    },
    {
      icon: Target,
      title: t('triggers.immersion'),
      subtitle: t('triggers.immersionSub'),
    },
    {
      icon: MessageCircle,
      title: t('triggers.liveChat'),
      subtitle: t('triggers.liveChatSub'),
    },
    {
      icon: CheckCircle,
      title: t('triggers.enrollmentPlan'),
      subtitle: t('triggers.enrollmentPlanSub'),
    },
    {
      icon: Star,
      title: t('triggers.consciousChoice'),
      subtitle: t('triggers.consciousChoiceSub'),
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-12 text-white lg:py-16">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
            <div>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
                {t('heroTitle')}
              </h1>
              <p className="mt-6 text-lg text-blue-100 lg:text-xl">
                {t('heroDescription')}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/tours">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    {t('chooseTour')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              {/* Triggers */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {heroTriggers.map((trigger, index) => (
                  <div key={index} className="flex flex-col items-center text-center rounded-xl bg-white/10 px-4 py-4">
                    <trigger.icon className="h-10 w-10 mb-3 text-white" />
                    <div className="text-base font-bold leading-tight">{trigger.title}</div>
                    <div className="text-sm text-blue-200 leading-tight mt-1">{trigger.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl bg-white/10 backdrop-blur" />
                <Card className="relative">
                  <CardContent className="p-5">
                    <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">
                      {t('leaveRequest')}
                    </h3>
                    <ApplicationForm type="CONTACT" compact />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Benefits */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">
              {t('benefitsTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              {t('benefitsSubtitle')}
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      {tours.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">
                {t('upcomingTours')}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                {t('upcomingToursSubtitle')}
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/tours">
                <Button variant="outline" size="lg">
                  {t('viewAllTours')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* How it Works - Roadmap */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-950">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 mb-4">
              <Compass className="h-4 w-4" />
              {t('simpleProcess')}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">
              {t('howItWorksTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              {t('howItWorksSubtitle')}
            </p>
          </div>

          {/* Desktop Roadmap */}
          <div className="hidden lg:block mt-16">
            <div className="grid grid-cols-4 gap-6">
              {howItWorks.map((item) => (
                <div key={item.step} className="group">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-blue-100 dark:border-blue-900 p-8 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="flex items-center justify-center mb-6">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-900/50 dark:group-hover:to-blue-800/50 transition-colors">
                        <item.icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="text-center mb-2">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white text-sm font-bold">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center mb-3">{item.title}</h3>
                    <p className="text-base text-gray-600 dark:text-gray-400 text-center leading-relaxed flex-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Roadmap */}
          <div className="lg:hidden mt-12">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 rounded-full" />

              <div className="space-y-6">
                {howItWorks.map((item) => (
                  <div key={item.step} className="relative flex items-start gap-5 pl-2">
                    <div className="relative flex-shrink-0 z-10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-lg shadow-lg">
                        {item.step}
                      </div>
                    </div>

                    <div className="flex-1 pb-2">
                      <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-blue-100 dark:border-blue-900 p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30">
                            <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
                        </div>
                        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20" />

        <div className="relative mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {t('ctaTitle')}
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            {t('ctaDescription')}
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-6 h-auto shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => {
                const openTour = tours.find((tour) => tour.status === 'OPEN')
                openTourModal(openTour?.id || '', openTour?.title || '')
              }}
            >
              {tc('signUpForTour')}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
          <p className="mt-6 text-blue-200 text-sm">
            {t('ctaSeatsLeft')}
          </p>
        </div>
      </section>

      {/* Mobile Form */}
      <section className="py-16 lg:hidden">
        <div className="mx-auto max-w-md px-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('leaveRequest')}
              </h3>
              <ApplicationForm type="CONTACT" compact />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tour Registration Modal */}
      {showTourModal && selectedTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('tourRegistration')}</h2>
              <button
                onClick={closeTourModal}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <ApplicationForm
                tourId={selectedTour.id || undefined}
                tourTitle={selectedTour.title}
                type="TOUR"
                onSuccess={closeTourModal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
