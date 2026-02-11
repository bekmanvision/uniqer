export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui'
import {
  Compass,
  Users,
  GraduationCap,
  ClipboardCheck,
  UserCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Программы',
  description: 'Профориентация, семинары и программы развития UniQer',
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

const programTypeLabels = {
  ORIENTATION: 'Профориентация',
  SEMINAR: 'Семинар',
  MEETING: 'Встреча с вузом',
  TESTING: 'Тестирование',
  INDIVIDUAL: 'Индивидуальная консультация',
}

const defaultPrograms = [
  {
    type: 'ORIENTATION' as const,
    title: 'Профориентация',
    description:
      'Комплексная программа по выявлению склонностей и интересов для осознанного выбора профессии',
    content: `Наша программа профориентации включает:

• Профессиональное тестирование
• Анализ личностных качеств и способностей
• Рекомендации по выбору направления обучения
• Консультации с карьерными консультантами

Программа помогает школьникам понять свои сильные стороны и сделать осознанный выбор будущей профессии.`,
  },
  {
    type: 'SEMINAR' as const,
    title: 'Семинары с экспертами',
    description: 'Встречи с представителями приёмных комиссий и успешными выпускниками',
    content: `На семинарах вы узнаете:

• Особенности поступления в разные вузы
• Требования к абитуриентам
• Советы по подготовке к ЕНТ
• Реальные истории успеха студентов

Эксперты отвечают на все вопросы и делятся практическими рекомендациями.`,
  },
  {
    type: 'MEETING' as const,
    title: 'Встречи со студентами',
    description: 'Неформальное общение с нынешними студентами университетов',
    content: `Во время встреч вы сможете:

• Узнать о реальной студенческой жизни
• Задать вопросы про учебу и общежития
• Получить советы от тех, кто уже прошёл этот путь
• Понять атмосферу разных вузов

Студенты честно рассказывают о плюсах и минусах своих университетов.`,
  },
  {
    type: 'TESTING' as const,
    title: 'Тестирование способностей',
    description: 'Профессиональные тесты для определения склонностей и талантов',
    content: `Мы проводим тестирования:

• Тест на профессиональные склонности
• Тест на тип мышления
• Тест на командные роли
• Анализ soft skills

По результатам вы получите детальный отчёт с рекомендациями.`,
  },
  {
    type: 'INDIVIDUAL' as const,
    title: 'Индивидуальные консультации',
    description: 'Персональная работа с карьерным консультантом',
    content: `Индивидуальная консультация включает:

• Глубокий анализ вашей ситуации
• Персональные рекомендации по выбору вуза
• План подготовки к поступлению
• Ответы на все ваши вопросы

Консультации проводят опытные карьерные консультанты с опытом работы в сфере образования.`,
  },
]

export default async function ProgramsPage() {
  const programs = await getPrograms()
  const displayPrograms = programs.length > 0 ? programs : defaultPrograms

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">Программы</h1>
          <p className="mt-4 text-lg text-gray-600">
            Комплекс программ для профориентации и подготовки к осознанному выбору профессии
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPrograms.map((program, index) => {
            const Icon = programTypeIcons[program.type] || Compass
            return (
              <Card key={program.title + index}>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{program.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{program.description}</p>
                  <div className="mt-4 whitespace-pre-line text-sm text-gray-600">
                    {program.content}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-blue-50 p-8 text-center lg:p-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Хотите записаться на программу?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Все программы включены в стоимость кампус-туров. Запишитесь на ближайший тур, чтобы
            получить полный комплекс профориентационных услуг.
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
