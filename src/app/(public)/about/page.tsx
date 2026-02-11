import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui'
import {
  Target,
  Heart,
  Lightbulb,
  Users,
  GraduationCap,
  MapPin,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'О проекте',
  description: 'UniQer — платформа кампус-туров по университетам Казахстана',
}

const values = [
  {
    icon: Target,
    title: 'Осознанный выбор',
    description:
      'Помогаем школьникам сделать взвешенный выбор будущей профессии на основе реального опыта',
  },
  {
    icon: Heart,
    title: 'Забота о будущем',
    description:
      'Верим, что правильный выбор университета — основа успешной карьеры и счастливой жизни',
  },
  {
    icon: Lightbulb,
    title: 'Практический подход',
    description: 'Не просто рассказываем о вузах, а показываем их изнутри глазами студентов',
  },
]

const stats = [
  { value: '500+', label: 'Участников туров' },
  { value: '15+', label: 'Партнёрских вузов' },
  { value: '5', label: 'Городов Казахстана' },
  { value: '98%', label: 'Довольных участников' },
]

const team = [
  {
    name: 'Команда UniQer',
    role: 'Организаторы',
    description:
      'Опытные специалисты в сфере образования, профориентации и организации мероприятий',
  },
]

export default function AboutPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">О проекте UniQer</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Мы помогаем школьникам Казахстана сделать осознанный выбор будущей профессии через
            погружение в студенческую жизнь
          </p>
        </div>

        {/* Mission */}
        <div className="mt-16 rounded-2xl bg-blue-600 p-8 text-white lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold lg:text-3xl">Наша миссия</h2>
            <p className="mt-4 text-lg text-blue-100">
              Сделать выбор университета осознанным и увлекательным процессом. Мы верим, что
              каждый школьник заслуживает возможности увидеть своими глазами, где он будет
              учиться, познакомиться со студентами и преподавателями, и прочувствовать атмосферу
              будущей альма-матер.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-gray-900 lg:text-3xl">
            Наши ценности
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                    <value.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{value.title}</h3>
                  <p className="mt-2 text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 rounded-2xl bg-gray-50 p-8 lg:p-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="mt-2 text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* What we do */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-gray-900 lg:text-3xl">
            Что мы делаем
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">Кампус-туры</h3>
                <p className="mt-2 text-gray-600">
                  Организуем экскурсии по лучшим университетам Казахстана с посещением учебных
                  корпусов, лабораторий и общежитий
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">Профориентация</h3>
                <p className="mt-2 text-gray-600">
                  Проводим тестирования, семинары и консультации, помогающие определиться с
                  выбором профессии
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">Путешествия</h3>
                <p className="mt-2 text-gray-600">
                  Организуем комфортные поездки по городам Казахстана с проживанием, питанием и
                  культурной программой
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Готовы отправиться в путешествие по университетам?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Присоединяйтесь к сотням школьников, которые уже сделали осознанный выбор благодаря
            нашим кампус-турам
          </p>
          <a
            href="/tours"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Выбрать тур
          </a>
        </div>
      </div>
    </div>
  )
}
