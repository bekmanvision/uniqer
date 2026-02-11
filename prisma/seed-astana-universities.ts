import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const astanaUniversities = [
  {
    name: 'Назарбаев Университет',
    slug: 'nu',
    city: 'Астана',
    type: 'STATE' as const,
    description: 'Международный англоязычный исследовательский университет мирового класса. Обучение ведётся полностью на английском языке по программам, разработанным совместно с ведущими мировыми университетами. Все студенты обучаются за счёт государственных и спонсорских грантов с бесплатным проживанием.',
    majors: [
      'Computer Science',
      'Robotics and Mechatronics',
      'Chemical Engineering',
      'Civil Engineering',
      'Petroleum Engineering',
      'Mining Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Biological Sciences',
      'Chemistry',
      'Physics',
      'Mathematics',
      'Economics',
      'Political Science',
      'World Languages and Literature',
      'Medicine',
      'Nursing'
    ],
    grants: true,
    paid: false,
    website: 'https://nu.edu.kz',
    address: 'проспект Кабанбай Батыра, 53, Астана',
    phone: '+7 7172 706 984',
    email: 'admissions@nu.edu.kz',
    hasMilitary: false,
    hasDormitory: true,
    tuitionMin: 7000000,
    tuitionMax: 9000000,
    tuitionNote: 'Все студенты обучаются бесплатно по грантам',
    founded: 2010,
    ranking: 'QS World: 501-600, THE Young Universities: 106',
    features: [
      'Обучение на английском языке',
      'Бесплатное обучение и проживание',
      '7 школ (факультетов)',
      'Партнёрство с MIT, Cambridge, Duke',
      'Лучший университет Центральной Азии'
    ]
  },
  {
    name: 'Медицинский университет Астана',
    slug: 'amu',
    city: 'Астана',
    type: 'STATE' as const,
    description: 'Один из крупнейших и динамично развивающихся медицинских вузов Казахстана. Входит в тройку лучших медицинских вузов страны. Сотрудничает с ведущими университетами США, Сингапура, Японии, Европы и России.',
    majors: [
      'Общая медицина',
      'Педиатрия',
      'Стоматология',
      'Общественное здоровье',
      'Медико-профилактическое дело',
      'Сестринское дело',
      'Фармация',
      'Кинезиотерапия',
      'Эрготерапия'
    ],
    grants: true,
    paid: true,
    website: 'https://amu.edu.kz',
    address: 'ул. Бейбітшілік, 49а, Астана',
    phone: '+7 700 153 9447',
    email: 'admission@amu.edu.kz',
    hasMilitary: true,
    hasDormitory: true,
    tuitionMin: 770000,
    tuitionMax: 1900000,
    tuitionNote: 'Стоматология — 1 900 000 ₸, Общая медицина — 1 250 000 ₸',
    founded: 1964,
    ranking: 'Топ-3 медицинских вузов Казахстана',
    features: [
      'Более 60 лет опыта',
      'Международные партнёрства',
      'Клинические базы в ведущих больницах',
      'Программы резидентуры и PhD'
    ]
  },
  {
    name: 'Евразийский национальный университет им. Л.Н. Гумилёва',
    slug: 'enu',
    city: 'Астана',
    type: 'STATE' as const,
    description: 'Ведущий национальный исследовательский университет Казахстана. Предлагает более 160 образовательных программ в 13 факультетах. Имеет партнёрские соглашения с более чем 100 зарубежными вузами.',
    majors: [
      'Информационные технологии',
      'Юриспруденция',
      'Экономика',
      'Международные отношения',
      'Журналистика',
      'Педагогика',
      'Психология',
      'Филология',
      'История',
      'Математика',
      'Физика',
      'Химия',
      'Биология',
      'География',
      'Архитектура',
      'Строительство',
      'Транспорт'
    ],
    grants: true,
    paid: true,
    website: 'https://enu.kz',
    address: 'ул. Қажымұқан, 13, Астана',
    phone: '+7 7172 709 500',
    email: 'info@enu.kz',
    hasMilitary: true,
    hasDormitory: true,
    tuitionMin: 1140000,
    tuitionMax: 1600000,
    tuitionNote: 'Юридический факультет — 1 600 000 ₸, IT — 1 330 000 ₸',
    founded: 1996,
    ranking: 'QS World: 321, Топ-5 вузов Казахстана',
    features: [
      '13 факультетов',
      '160+ образовательных программ',
      '20 000+ студентов',
      '376 международных договоров',
      '12 культурно-образовательных центров за рубежом'
    ]
  },
  {
    name: 'Esil University',
    slug: 'esil',
    city: 'Астана',
    type: 'PRIVATE' as const,
    description: 'Современный ведущий университет столицы с более чем 20-летней историей. Специализируется на экономике, финансах и международной торговле. Входит в ТОП-5 лучших гуманитарно-экономических университетов Казахстана.',
    majors: [
      'Экономика',
      'Финансы',
      'Менеджмент',
      'Маркетинг',
      'Бухгалтерский учёт',
      'Государственное управление',
      'Международная торговля',
      'Туризм',
      'Информационные технологии',
      'Юриспруденция',
      'Переводческое дело'
    ],
    grants: true,
    paid: true,
    website: 'https://esil.edu.kz',
    address: 'ул. А. Жубанова, 7, Астана',
    phone: '+7 7172 725 777',
    email: 'media.esil.univer@gmail.com',
    hasMilitary: false,
    hasDormitory: true,
    tuitionMin: 635000,
    tuitionMax: 790000,
    tuitionNote: 'Экономика — 790 000 ₸ (1 курс)',
    founded: 1999,
    ranking: 'IQAA: Топ-10, IAAR: Топ-15',
    features: [
      'Двойной диплом с College de Paris',
      'Член Ассоциации азиатских университетов',
      '22 программы бакалавриата',
      '23 программы магистратуры'
    ]
  },
  {
    name: 'Maqsut Narikbayev University (MNU)',
    slug: 'mnu',
    city: 'Астана',
    type: 'PRIVATE' as const,
    description: 'Первый вуз в СНГ и Центральной Азии с британской аккредитацией QAA. Ведущий юридический и гуманитарный университет с сильными программами в области права, экономики и журналистики.',
    majors: [
      'Международное право',
      'Право и правоохранительная деятельность',
      'Экономика',
      'Финансы',
      'Журналистика',
      'Лингвистика',
      'Психология',
      'Туризм',
      'Гостеприимство',
      'Искусственный интеллект'
    ],
    grants: true,
    paid: true,
    website: 'https://mnu.kz',
    address: 'ул. Коргалжынское шоссе, 8, Астана',
    phone: '+7 7172 709 709',
    email: 'info@mnu.kz',
    hasMilitary: false,
    hasDormitory: true,
    tuitionMin: 2250000,
    tuitionMax: 2700000,
    tuitionNote: 'Кредитная система: 37 500 ₸ за кредит (60 кредитов/год)',
    founded: 1994,
    ranking: 'QAA Global Quality Award, Топ-20 Казахстана',
    features: [
      'Британская аккредитация QAA',
      '5 школ (факультетов)',
      'AI-лаборатории',
      'Программа по искусственному интеллекту',
      '12 программ в Топ-рейтинге Атамекен'
    ]
  },
  {
    name: 'Международный университет Астана (AIU)',
    slug: 'aiu',
    city: 'Астана',
    type: 'PRIVATE' as const,
    description: 'Многопрофильный образовательный комплекс из 7 высших школ и 12 научно-исследовательских институтов. Входит в 20 лучших университетов Евразии. Предлагает программы двойного диплома с университетами Китая.',
    majors: [
      'Педагогика и психология',
      'Дошкольное образование',
      'Начальное образование',
      'Английский и китайский языки',
      'Международная торговля',
      'Экономика',
      'Информационные технологии',
      'Юриспруденция',
      'Международные отношения'
    ],
    grants: true,
    paid: true,
    website: 'https://aiu.edu.kz',
    address: 'проспект Кабанбай батыра, 8, Астана',
    phone: '+7 777 001 3910',
    email: 'info@aiu.edu.kz',
    hasMilitary: false,
    hasDormitory: true,
    tuitionMin: 530000,
    tuitionMax: 1300000,
    tuitionNote: 'Педагогика — от 530 000 ₸, Международная торговля — 1 190 000 ₸',
    founded: 2018,
    ranking: '8-е место в Национальном рейтинге (2022)',
    features: [
      '7 высших школ',
      '12 НИИ и центров',
      'Двойной диплом 3+1 с вузами Китая',
      'Общежитие на 140 мест',
      'Студенческие клубы и TEDx'
    ]
  },
  {
    name: 'Astana IT University',
    slug: 'aitu',
    city: 'Астана',
    type: 'STATE' as const,
    description: 'Государственный IT-университет, специализирующийся на подготовке специалистов в сфере информационных технологий. Все программы преподаются на английском языке. Сокращённый срок обучения — 3 года.',
    majors: [
      'Computer Science',
      'Software Engineering',
      'IT Management',
      'Applied Data Analytics',
      'Cybersecurity',
      'Digital Engineering',
      'Media Technologies',
      'Smart Technologies'
    ],
    grants: true,
    paid: true,
    website: 'https://astanait.edu.kz',
    address: 'проспект Мәңгілік Ел, 55/11, блок C1, EXPO, Астана',
    phone: '+7 7172 645 710',
    email: 'info@astanait.edu.kz',
    hasMilitary: false,
    hasDormitory: true,
    tuitionMin: 1750000,
    tuitionMax: 2500000,
    tuitionNote: '2 500 000 ₸/год, скидки до 30% для отличников',
    founded: 2019,
    ranking: 'Ведущий IT-вуз Казахстана',
    features: [
      'Обучение на английском языке',
      '3 года обучения (вместо 4)',
      'Партнёрство с Huawei, Cisco, Apple, Oracle',
      'Лаборатории и исследовательские центры',
      'Поддержка стартапов и хакатоны'
    ]
  },
  {
    name: 'Филиал МГУ имени М.В. Ломоносова',
    slug: 'msu-kz',
    city: 'Астана',
    type: 'STATE' as const,
    description: 'Казахстанский филиал ведущего российского университета. Студенты проходят часть обучения в Москве. Ежегодно 150 абитуриентов поступают на бюджет. Диплом МГУ признаётся во всём мире.',
    majors: [
      'Математика',
      'Прикладная математика и информатика',
      'Филология',
      'Экология и природопользование',
      'Экономика'
    ],
    grants: true,
    paid: true,
    website: 'https://www.msu.kz',
    address: 'ул. Қажымұқан, 11 (7 этаж ЕНУ), Астана',
    phone: '+7 7172 354 387',
    email: 'msukz@mail.ru',
    hasMilitary: false,
    hasDormitory: true,
    tuitionMin: 0,
    tuitionMax: 0,
    tuitionNote: '150 бюджетных мест ежегодно, включая обучение в Москве',
    founded: 2001,
    ranking: 'МГУ: QS World #87',
    features: [
      'Диплом МГУ',
      '1-1.5 года обучения в Москве',
      '150 бюджетных мест',
      'Бесплатное проживание и проезд',
      'Результаты ЕНТ не требуются'
    ]
  },
  {
    name: 'Cardiff University Kazakhstan',
    slug: 'cardiff-kz',
    city: 'Астана',
    type: 'PRIVATE' as const,
    description: 'Первый университет престижной британской Russell Group в Казахстане. Откроется в сентябре 2025 года. Специализация на STEM и бизнес-направлениях с британским дипломом.',
    majors: [
      'Computer Science',
      'Civil Engineering',
      'Geology and Natural Resources',
      'Accounting',
      'Marketing',
      'Human Resource Management',
      'Management',
      'Economics',
      'Digital Technologies'
    ],
    grants: true,
    paid: true,
    website: 'https://cardiff.edu.kz',
    address: 'Астана (кампус откроется в 2025)',
    phone: '',
    email: '',
    hasMilitary: false,
    hasDormitory: false,
    tuitionMin: 0,
    tuitionMax: 0,
    tuitionNote: '500 государственных стипендий на первые 3 года',
    founded: 2025,
    ranking: 'Cardiff University: QS World #186',
    features: [
      'Член Russell Group',
      'Британский диплом',
      '500 государственных стипендий',
      'Программы STEM и бизнеса',
      'Foundation Year + 3 года бакалавриата'
    ]
  },
  {
    name: 'Coventry University Kazakhstan',
    slug: 'coventry-kz',
    city: 'Астана',
    type: 'PRIVATE' as const,
    description: 'Первый филиал британского университета в Астане. Открыт в сентябре 2024 года. Предлагает качественное британское образование с британским дипломом по программам бизнеса, IT и международных отношений.',
    majors: [
      'Business',
      'Computer Science',
      'International Relations',
      'Economics and Finance',
      'MBA Global Business'
    ],
    grants: true,
    paid: true,
    website: 'https://coventry.edu.kz',
    address: 'Коргалжынское шоссе, 13А, Астана',
    phone: '+7 700 317 3333',
    email: 'info@coventry.edu.kz',
    hasMilitary: false,
    hasDormitory: false,
    tuitionMin: 7275000,
    tuitionMax: 14550000,
    tuitionNote: 'Бакалавриат: $15,000/год, MBA: $30,000 (полный курс)',
    founded: 2024,
    ranking: 'Coventry University: UK Top 50',
    features: [
      'Британский диплом',
      'Первый британский вуз в Астане',
      'Гранты с полным покрытием',
      'Подготовительный год (Foundation)',
      'Скидка 15% при ранней подаче'
    ]
  }
]

async function main() {
  console.log('Добавляем университеты Астаны...')

  for (const uni of astanaUniversities) {
    const result = await prisma.university.upsert({
      where: { slug: uni.slug },
      update: {
        ...uni,
        type: uni.type
      },
      create: {
        ...uni,
        type: uni.type
      }
    })
    console.log(`✓ ${result.name}`)
  }

  // Удаляем старые тестовые университеты, которые больше не нужны
  const oldSlugs = ['kaznu', 'kimep', 'narxoz']
  for (const slug of oldSlugs) {
    try {
      await prisma.university.delete({ where: { slug } })
      console.log(`✗ Удалён: ${slug}`)
    } catch {
      // Университет уже удалён или не существует
    }
  }

  console.log('\nГотово! Добавлено 10 университетов Астаны.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
