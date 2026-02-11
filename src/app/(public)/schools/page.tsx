import { Metadata } from 'next'
import Link from 'next/link'
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

export const metadata: Metadata = {
  title: 'Для школ и партнёров — UniQer',
  description: 'Организуем профориентационные кампус-туры для школьников. Работаем по договору, предоставляем отчётность и сертификаты.',
}

const benefits = [
  {
    icon: Target,
    title: 'Профориентация учеников',
    description: 'Помогаем школьникам определиться с вузом и специальностью до ЕНТ',
  },
  {
    icon: FileText,
    title: 'Полная отчётность',
    description: 'Предоставляем отчёты для администрации школы и родителей',
  },
  {
    icon: Award,
    title: 'Сертификаты участникам',
    description: 'Каждый ученик получает сертификат о прохождении профориентации',
  },
  {
    icon: Shield,
    title: 'Официальная работа',
    description: 'Работаем по договору, предоставляем все необходимые документы и чеки',
  },
  {
    icon: BarChart3,
    title: 'Результаты тура',
    description: 'Отчёт с рекомендациями по каждому ученику для классного руководителя',
  },
  {
    icon: Clock,
    title: 'Гибкий график',
    description: 'Подстраиваемся под расписание школы и каникулы',
  },
]

const included = [
  'Транспорт от школы до вузов и обратно',
  'Экскурсии по кампусам 4-5 университетов',
  'Профориентационное тестирование',
  'Встречи со студентами и приёмными комиссиями',
  'Питание во время тура',
  'Сопровождение организаторами',
  'Страховка на время тура',
  'Сертификаты для учеников',
  'Отчёт для школы',
]

export default function SchoolsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 lg:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm mb-6">
                <Building2 className="h-4 w-4" />
                Для школ и партнёров
              </div>
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl xl:text-5xl">
                Организуем профориентационные туры для ваших учеников
              </h1>
              <p className="mt-6 text-lg text-blue-100 lg:text-xl">
                Помогаем школьникам 8-12 классов выбрать университет и специальность.
                Работаем по договору, предоставляем отчётность и сертификаты.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#form">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Получить коммерческое предложение
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm text-blue-200">школ-партнёров</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-blue-200">учеников</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm text-blue-200">университетов</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/10 p-6">
                    <GraduationCap className="h-8 w-8 mb-3" />
                    <h3 className="font-semibold">Профориентация</h3>
                    <p className="mt-1 text-sm text-blue-200">Тестирование и консультации</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-6">
                    <FileText className="h-8 w-8 mb-3" />
                    <h3 className="font-semibold">Документы</h3>
                    <p className="mt-1 text-sm text-blue-200">Договор, чек, отчёт</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl bg-white/10 p-6">
                    <Users className="h-8 w-8 mb-3" />
                    <h3 className="font-semibold">Группы</h3>
                    <p className="mt-1 text-sm text-blue-200">От 10 до 30 учеников</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-6">
                    <Award className="h-8 w-8 mb-3" />
                    <h3 className="font-semibold">Сертификаты</h3>
                    <p className="mt-1 text-sm text-blue-200">Каждому участнику</p>
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
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Почему школам выгодно работать с нами
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Берём на себя всю организацию — от планирования до отчётности
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-2 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                Что входит в тур для школьной группы
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Полный пакет услуг для организации профориентационной поездки
              </p>
              <div className="mt-8 grid gap-3">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card className="border-2 border-blue-200">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-sm text-gray-500 mb-2">Стоимость на группу</div>
                    <div className="text-4xl font-bold text-blue-600">Индивидуально</div>
                    <div className="text-gray-500 mt-1">Зависит от города и количества учеников</div>
                  </div>
                  <div className="space-y-3 border-t pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Группа от</span>
                      <span className="font-medium">10 учеников</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Продолжительность</span>
                      <span className="font-medium">1-3 дня</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Университетов</span>
                      <span className="font-medium">4-5 вузов</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Сопровождающие</span>
                      <span className="font-medium">Бесплатно</span>
                    </div>
                  </div>
                  <a href="#form" className="block mt-6">
                    <Button className="w-full">
                      Запросить расчёт
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
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Получить коммерческое предложение
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Оставьте заявку, и мы подготовим индивидуальное предложение для вашей школы
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
            <h2 className="text-3xl font-bold lg:text-4xl">Работаем официально</h2>
            <p className="mt-4 text-lg text-gray-400">
              Все документы для бухгалтерии и отчётности
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-semibold">Договор</h3>
              <p className="mt-1 text-sm text-gray-400">Официальный договор на оказание услуг</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-semibold">Чек / Счёт</h3>
              <p className="mt-1 text-sm text-gray-400">Фискальный чек или счёт-фактура</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-semibold">Отчёт</h3>
              <p className="mt-1 text-sm text-gray-400">Подробный отчёт о проведении тура</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-semibold">Сертификаты</h3>
              <p className="mt-1 text-sm text-gray-400">Сертификаты для портфолио учеников</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
