import { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Для школ',
  description: 'Корпоративные кампус-туры для школ и образовательных учреждений',
}

const benefits = [
  {
    icon: Building,
    title: 'Корпоративные туры',
    description:
      'Организуем эксклюзивные туры для целых классов или групп школьников с индивидуальной программой',
  },
  {
    icon: Users,
    title: 'Групповые скидки',
    description:
      'Специальные условия для школьных групп от 15 человек. Чем больше группа — тем выгоднее',
  },
  {
    icon: Award,
    title: 'Сертификаты участия',
    description:
      'Каждый участник получает сертификат о прохождении профориентационной программы',
  },
  {
    icon: FileText,
    title: 'Официальная документация',
    description:
      'Предоставляем все необходимые документы для отчётности: договоры, акты, счета',
  },
]

const formats = [
  {
    title: 'Однодневный тур',
    description: 'Посещение 2-3 университетов в одном городе за один день',
    features: ['Экскурсии по кампусам', 'Встречи со студентами', 'Семинар по поступлению'],
  },
  {
    title: 'Двухдневный тур',
    description: 'Полноценная программа с проживанием и посещением 4-5 вузов',
    features: [
      'Расширенная программа',
      'Профориентационное тестирование',
      'Проживание в комфортных условиях',
      'Питание включено',
    ],
  },
  {
    title: 'Недельный интенсив',
    description: 'Глубокое погружение в студенческую жизнь с практическими занятиями',
    features: [
      'Посещение 8-10 университетов',
      'Мастер-классы от преподавателей',
      'Индивидуальные консультации',
      'Культурная программа',
    ],
  },
]

export default function ForSchoolsPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">Для школ и партнёров</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Организуем кампус-туры для школьных групп с индивидуальным подходом и специальными
            условиями
          </p>
        </div>

        {/* Benefits */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Formats */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-gray-900 lg:text-3xl">
            Форматы сотрудничества
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {formats.map((format) => (
              <Card key={format.title}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{format.title}</h3>
                  <p className="mt-2 text-gray-600">{format.description}</p>
                  <ul className="mt-4 space-y-2">
                    {format.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
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
            <h2 className="text-2xl font-bold text-gray-900">Оставьте заявку</h2>
            <p className="mt-4 text-gray-600">
              Заполните форму, и мы свяжемся с вами для обсуждения условий сотрудничества.
              Подберём оптимальный формат тура для вашей школы.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Телефон для школ</p>
                  <a href="tel:+77001234567" className="font-medium text-gray-900">
                    +7 (700) 123-45-67
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-900">Польза для школы</h3>
              <ul className="mt-2 space-y-1 text-sm text-blue-800">
                <li>• Повышение профориентационной работы</li>
                <li>• Укрепление связи школа-вуз</li>
                <li>• Отчётность для министерства образования</li>
                <li>• Позитивный имидж школы</li>
              </ul>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Заявка на сотрудничество</h3>
              <ApplicationForm type="B2B" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
