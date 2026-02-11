import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@uniqer.kz' },
    update: {},
    create: {
      email: 'admin@uniqer.kz',
      password: adminPassword,
      name: 'Admin',
      role: 'SUPER_ADMIN',
    },
  })
  console.log('Created admin:', admin.email)

  // Create universities
  const universities = await Promise.all([
    prisma.university.upsert({
      where: { slug: 'kaznu' },
      update: {},
      create: {
        name: 'Казахский национальный университет им. аль-Фараби',
        slug: 'kaznu',
        city: 'Алматы',
        type: 'STATE',
        description:
          'Ведущий национальный университет Казахстана, основанный в 1934 году. Предлагает широкий спектр образовательных программ в области естественных наук, гуманитарных наук, экономики и права.',
        majors: ['IT', 'Физика', 'Математика', 'Экономика', 'Право', 'Журналистика'],
        grants: true,
        paid: true,
        website: 'https://www.kaznu.kz',
      },
    }),
    prisma.university.upsert({
      where: { slug: 'kimep' },
      update: {},
      create: {
        name: 'KIMEP University',
        slug: 'kimep',
        city: 'Алматы',
        type: 'PRIVATE',
        description:
          'Ведущий частный университет в Центральной Азии с международной аккредитацией. Специализируется на бизнес-образовании, экономике и праве.',
        majors: ['Бизнес', 'Финансы', 'Право', 'Журналистика', 'Международные отношения'],
        grants: true,
        paid: true,
        website: 'https://www.kimep.kz',
      },
    }),
    prisma.university.upsert({
      where: { slug: 'narxoz' },
      update: {},
      create: {
        name: 'Университет Нархоз',
        slug: 'narxoz',
        city: 'Алматы',
        type: 'PRIVATE',
        description:
          'Один из крупнейших экономических университетов Казахстана с более чем 60-летней историей. Специализируется на подготовке специалистов в области экономики, бизнеса и IT.',
        majors: ['Экономика', 'Бизнес', 'IT', 'Маркетинг', 'Учёт и аудит'],
        grants: true,
        paid: true,
        website: 'https://narxoz.edu.kz',
      },
    }),
    prisma.university.upsert({
      where: { slug: 'enu' },
      update: {},
      create: {
        name: 'Евразийский национальный университет им. Л.Н. Гумилева',
        slug: 'enu',
        city: 'Астана',
        type: 'STATE',
        description:
          'Один из ведущих государственных университетов Казахстана, расположенный в столице. Предлагает программы по всем основным направлениям подготовки.',
        majors: ['Инженерия', 'IT', 'Медицина', 'Педагогика', 'Экономика'],
        grants: true,
        paid: true,
        website: 'https://enu.kz',
      },
    }),
    prisma.university.upsert({
      where: { slug: 'nu' },
      update: {},
      create: {
        name: 'Назарбаев Университет',
        slug: 'nu',
        city: 'Астана',
        type: 'STATE',
        description:
          'Автономный исследовательский университет мирового класса. Обучение ведётся на английском языке по программам, разработанным совместно с ведущими мировыми университетами.',
        majors: ['Инженерия', 'Бизнес', 'Медицина', 'Естественные науки', 'IT'],
        grants: true,
        paid: false,
        website: 'https://nu.edu.kz',
      },
    }),
  ])
  console.log('Created universities:', universities.length)

  // Create tours
  const tour1 = await prisma.tour.upsert({
    where: { slug: 'almaty-spring-2025' },
    update: {},
    create: {
      title: 'Кампус-тур по Алматы: весна 2025',
      slug: 'almaty-spring-2025',
      city: 'Алматы',
      startDate: new Date('2025-03-15'),
      endDate: new Date('2025-03-17'),
      price: 150000,
      seats: 30,
      seatsLeft: 25,
      grade: '9-11',
      status: 'OPEN',
      description:
        'Трёхдневный кампус-тур по лучшим университетам Алматы. Вы посетите КазНУ, KIMEP и Нархоз, познакомитесь со студентами и преподавателями, узнаете о программах обучения и условиях поступления.',
      program: [
        {
          day: 1,
          title: 'Знакомство с КазНУ',
          activities: [
            'Встреча группы на вокзале',
            'Трансфер в отель, размещение',
            'Экскурсия по кампусу КазНУ',
            'Встреча со студентами и преподавателями',
            'Ужин и свободное время',
          ],
        },
        {
          day: 2,
          title: 'KIMEP и Нархоз',
          activities: [
            'Завтрак в отеле',
            'Посещение KIMEP University',
            'Обед в студенческой столовой',
            'Экскурсия по Университету Нархоз',
            'Семинар по профориентации',
          ],
        },
        {
          day: 3,
          title: 'Завершение тура',
          activities: [
            'Завтрак в отеле',
            'Профориентационное тестирование',
            'Индивидуальные консультации',
            'Подведение итогов',
            'Трансфер на вокзал',
          ],
        },
      ],
      includes: [
        'Проживание в отеле 3* (2 ночи)',
        'Питание (завтраки и обеды)',
        'Трансферы по программе',
        'Экскурсии по кампусам',
        'Профориентационное тестирование',
        'Сопровождение куратора',
      ],
      featured: true,
    },
  })

  const tour2 = await prisma.tour.upsert({
    where: { slug: 'astana-spring-2025' },
    update: {},
    create: {
      title: 'Кампус-тур по Астане: весна 2025',
      slug: 'astana-spring-2025',
      city: 'Астана',
      startDate: new Date('2025-04-05'),
      endDate: new Date('2025-04-07'),
      price: 180000,
      seats: 25,
      seatsLeft: 20,
      grade: '10-11',
      status: 'OPEN',
      description:
        'Уникальная возможность посетить ЕНУ и Назарбаев Университет — два флагманских вуза столицы. Программа включает экскурсии, встречи с приёмной комиссией и мастер-классы.',
      program: [
        {
          day: 1,
          title: 'ЕНУ им. Гумилева',
          activities: [
            'Прибытие в Астану, трансфер в отель',
            'Обед',
            'Экскурсия по кампусу ЕНУ',
            'Встреча с деканами факультетов',
            'Ужин',
          ],
        },
        {
          day: 2,
          title: 'Назарбаев Университет',
          activities: [
            'Завтрак',
            'Посещение Назарбаев Университета',
            'Мастер-класс от преподавателей',
            'Обед в кампусе',
            'Экскурсия по общежитиям',
            'Культурная программа',
          ],
        },
        {
          day: 3,
          title: 'Итоги и отъезд',
          activities: [
            'Завтрак',
            'Профориентационное тестирование',
            'Индивидуальные консультации',
            'Трансфер в аэропорт/на вокзал',
          ],
        },
      ],
      includes: [
        'Проживание в отеле 4* (2 ночи)',
        'Трёхразовое питание',
        'Все трансферы',
        'Экскурсионная программа',
        'Профтестирование',
        'Сертификат участника',
      ],
      featured: true,
    },
  })

  console.log('Created tours:', 2)

  // Link universities to tours
  await prisma.tourUniversity.createMany({
    data: [
      { tourId: tour1.id, universityId: universities[0].id, order: 0 },
      { tourId: tour1.id, universityId: universities[1].id, order: 1 },
      { tourId: tour1.id, universityId: universities[2].id, order: 2 },
      { tourId: tour2.id, universityId: universities[3].id, order: 0 },
      { tourId: tour2.id, universityId: universities[4].id, order: 1 },
    ],
    skipDuplicates: true,
  })
  console.log('Linked universities to tours')

  // Create reviews
  await prisma.review.createMany({
    data: [
      {
        name: 'Айгерим М.',
        role: 'Ученица 11 класса',
        content:
          'Тур помог мне определиться с выбором университета! Особенно понравилось посещение KIMEP — теперь точно знаю, куда буду поступать.',
        rating: 5,
        featured: true,
      },
      {
        name: 'Марат К.',
        role: 'Родитель',
        content:
          'Отличная организация! Сын вернулся в восторге. Теперь он мотивирован учиться и готовиться к ЕНТ. Спасибо команде UniQer!',
        rating: 5,
        featured: true,
      },
      {
        name: 'Диана С.',
        role: 'Ученица 10 класса',
        content:
          'Было очень интересно пообщаться со студентами и узнать о реальной студенческой жизни. Рекомендую всем, кто ещё не определился с выбором.',
        rating: 5,
        featured: true,
      },
    ],
    skipDuplicates: true,
  })
  console.log('Created reviews')

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
