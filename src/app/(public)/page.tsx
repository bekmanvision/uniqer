'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Card, CardContent } from '@/components/ui'
import { ApplicationForm } from '@/components/public'
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
  MapPin,
  Users,
  Calendar,
  X,
} from 'lucide-react'

const howItWorks = [
  {
    step: 1,
    title: 'Подбираем маршрут',
    description: 'Составляем программу под класс и интересы ребёнка — IT, медицина, бизнес или другое',
    icon: Compass,
  },
  {
    step: 2,
    title: 'Подтверждаем участие',
    description: 'Связываемся с вами, отвечаем на вопросы и бронируем место в группе',
    icon: CheckCircle,
  },
  {
    step: 3,
    title: 'Знакомство с вузами',
    description: 'Общение со студентами, приёмными комиссиями и экскурсии по кампусам',
    icon: MessageCircle,
  },
  {
    step: 4,
    title: 'План поступления',
    description: 'Получаете персональные рекомендации по вузам и чёткий план подготовки к ЕНТ',
    icon: Target,
  },
]

const features = [
  {
    title: 'Знакомство с вузами',
    description: 'Посетите университеты и почувствуете, где комфортно учиться и развиваться.',
    icon: GraduationCap,
  },
  {
    title: 'Выбор направления',
    description: 'На основе увиденного поймете, какие специальности подходят именно Вам.',
    icon: Target,
  },
  {
    title: 'Понимание требований ЕНТ',
    description: 'Разберетесь, какие предметы сдавать и на какие баллы ориентироваться под выбранный Вами путь.',
    icon: BookOpen,
  },
  {
    title: 'Уверенное решение',
    description: 'Примете осознанное решение по вузу и профессии без стресса и сомнений.',
    icon: TrendingUp,
  },
]

const heroTriggers = [
  {
    icon: GraduationCap,
    title: 'Топовые вузы',
    subtitle: 'Астаны и Алматы',
  },
  {
    icon: Compass,
    title: 'Профориентация',
    subtitle: 'Групповая и индивидуальная',
  },
  {
    icon: Target,
    title: 'Погружение',
    subtitle: 'в студенческую жизнь',
  },
  {
    icon: MessageCircle,
    title: 'Живое общение',
    subtitle: 'со студентами и приёмкой',
  },
  {
    icon: CheckCircle,
    title: 'План поступления',
    subtitle: 'Чёткая траектория',
  },
  {
    icon: Star,
    title: 'Осознанный выбор',
    subtitle: 'вуза и профессии',
  },
]

export default function HomePage() {
  const [showTourModal, setShowTourModal] = useState(false)
  const [selectedTour, setSelectedTour] = useState<{ id: string; title: string } | null>(null)

  const openTourModal = (tourId: string, tourTitle: string) => {
    setSelectedTour({ id: tourId, title: tourTitle })
    setShowTourModal(true)
  }

  const closeTourModal = () => {
    setShowTourModal(false)
    setSelectedTour(null)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-12 text-white lg:py-16">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
            <div>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
                Кампус-туры по лучшим университетам Казахстана
              </h1>
              <p className="mt-6 text-lg text-blue-100 lg:text-xl">
                Помогаем школьникам 8-12 классов сделать осознанный выбор будущей профессии.
                Экскурсии, профориентация, встречи со студентами и экспертами.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/tours">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Выбрать тур
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              {/* Триггеры ценности */}
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
                    <h3 className="mb-3 text-base font-semibold text-gray-900">
                      Оставить заявку
                    </h3>
                    <ApplicationForm type="CONTACT" compact />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Результаты для ребёнка */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Что Вы получите от тура
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Практические результаты для школьников и родителей
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Ближайшие туры
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Выберите тур и отправьтесь в путешествие по университетам
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Тур в Астану */}
            <Card className="overflow-hidden border-2 border-blue-200 bg-white">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  <MapPin className="mr-1 h-4 w-4" />
                  Астана
                </div>
                <h3 className="text-xl font-bold text-gray-900">Кампус-тур в Астане</h3>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>21-23 апреля 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                    <span>10 лучших вузов Астаны</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>50 учеников • 8-12 классы</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span>Семинар по выбору профессии и вуза</span>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg text-gray-400 line-through">250 000 ₸</span>
                    <span className="text-2xl font-bold text-blue-600">150 000 ₸</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-orange-600">
                    Осталось 19 мест по специальной цене
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => openTourModal('', 'Кампус-тур в Астане • 21-23 апреля 2026')}
                  >
                    Записаться
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Тур в Алматы */}
            <Card className="overflow-hidden border-2 border-blue-200 bg-white">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  <MapPin className="mr-1 h-4 w-4" />
                  Алматы
                </div>
                <h3 className="text-xl font-bold text-gray-900">Кампус-тур в Алматы</h3>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Даты уточняются</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                    <span>Лучшие вузы Алматы</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>8-12 классы</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => openTourModal('', 'Кампус-тур в Алматы')}
                  >
                    Забронировать место
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works - Roadmap */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 mb-4">
              <Compass className="h-4 w-4" />
              Простой процесс
            </div>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Как проходит тур
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              4 шага от заявки до осознанного выбора профессии
            </p>
          </div>

          {/* Desktop Roadmap */}
          <div className="hidden lg:block mt-16">
            <div className="grid grid-cols-4 gap-6">
              {howItWorks.map((item) => (
                <div key={item.step} className="group">
                  <div className="bg-white rounded-2xl border-2 border-blue-100 p-8 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    {/* Иконка */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                        <item.icon className="h-10 w-10 text-blue-600" />
                      </div>
                    </div>
                    {/* Номер шага */}
                    <div className="text-center mb-2">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white text-sm font-bold">
                        {item.step}
                      </span>
                    </div>
                    {/* Заголовок */}
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{item.title}</h3>
                    {/* Описание */}
                    <p className="text-base text-gray-600 text-center leading-relaxed flex-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Roadmap */}
          <div className="lg:hidden mt-12">
            <div className="relative">
              {/* Вертикальная линия */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 rounded-full" />

              <div className="space-y-6">
                {howItWorks.map((item) => (
                  <div key={item.step} className="relative flex items-start gap-5 pl-2">
                    {/* Номер шага */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-lg shadow-lg">
                        {item.step}
                      </div>
                    </div>

                    {/* Контент */}
                    <div className="flex-1 pb-2">
                      <div className="bg-white rounded-xl border-2 border-blue-100 p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                            <item.icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
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
        {/* Декоративные элементы */}
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20" />

        <div className="relative mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Готовы определиться с выбором ВУЗа мечты?
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Запишитесь на ближайший кампус-тур и сделайте первый шаг к осознанному выбору будущей профессии
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-6 h-auto shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => openTourModal('', 'Кампус-тур в Астане • 21-23 апреля 2026')}
            >
              Записаться на тур
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
          <p className="mt-6 text-blue-200 text-sm">
            Осталось всего 19 мест по специальной цене
          </p>
        </div>
      </section>

      {/* Mobile Form */}
      <section className="py-16 lg:hidden">
        <div className="mx-auto max-w-md px-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Оставить заявку
              </h3>
              <ApplicationForm type="CONTACT" compact />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tour Registration Modal */}
      {showTourModal && selectedTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-xl bg-white shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Запись на тур</h2>
              <button
                onClick={closeTourModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
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
