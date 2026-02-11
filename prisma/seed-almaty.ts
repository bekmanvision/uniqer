import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Almaty universities...')

  // 1. SDU
  await prisma.university.upsert({
    where: { slug: 'sdu' },
    update: {},
    create: {
      name: 'Университет Сулеймана Демиреля (SDU)',
      slug: 'sdu',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Частный университет с обучением на английском языке, основанный в 1996 году. Современный кампус в Каскелене. Широкий спектр программ от IT и инженерии до права и бизнеса. Международные аккредитации и сильные партнёрства.',
      address: 'г. Каскелен, ул. Абылай хана, 1/1',
      phone: '+7 (727) 307-95-65',
      email: 'info@sdu.edu.kz',
      hasMilitary: false,
      hasDormitory: true,
      tuitionMin: 1200000,
      tuitionMax: 2500000,
      grants: true,
      paid: true,
      founded: 1996,
      website: 'https://sdu.edu.kz',
      features: ['Обучение на английском языке', 'Современный кампус в Каскелене', 'Международные аккредитации', 'Общежитие на территории кампуса'],
      categories: ['it', 'business', 'engineering', 'humanities', 'law', 'sciences'],
      majors: ['Computer Science', 'Information Systems', 'Software Engineering', 'Data Science', 'Математика', 'Физика', 'Бизнес-администрирование', 'Финансы', 'Экономика', 'Менеджмент', 'Маркетинг', 'Международные отношения', 'Юриспруденция', 'Переводческое дело', 'Психология', 'Архитектура', 'Строительство', 'Нефтегазовое дело'],
      targetAudience: 'Выпускники с хорошим английским, ищущие международное образование в области IT, бизнеса или инженерии',
    },
  })
  console.log('1/21 SDU')

  // 2. KBTU
  await prisma.university.upsert({
    where: { slug: 'kbtu' },
    update: {},
    create: {
      name: 'Казахстанско-Британский технический университет (KBTU)',
      slug: 'kbtu',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Ведущий технический университет Казахстана с британскими образовательными стандартами, основанный в 2001 году. Обучение на английском языке. Сильные программы в IT, нефтегазовом деле и бизнесе.',
      address: 'ул. Толе би, 59, Алматы, 050000',
      phone: '+7 (727) 357-42-51',
      email: 'info@kbtu.edu.kz',
      hasMilitary: true,
      hasDormitory: true,
      tuitionMin: 1800000,
      tuitionMax: 3500000,
      grants: true,
      paid: true,
      founded: 2001,
      website: 'https://kbtu.edu.kz',
      features: ['Обучение на английском языке', 'Военная кафедра', 'Британские образовательные стандарты', 'Сильные исследовательские институты', 'Партнёрства с UK вузами'],
      categories: ['it', 'business', 'engineering', 'sciences'],
      majors: ['Computer Science', 'Information Systems', 'Software Engineering', 'Кибербезопасность', 'Математика', 'Data Science', 'Нефтегазовая инженерия', 'Химическая инженерия', 'Геология', 'Геофизика', 'Бизнес-администрирование', 'Финансы', 'Экономика', 'Энергетика', 'Телекоммуникации'],
      targetAudience: 'Выпускники, стремящиеся к карьере в IT, нефтегазовой отрасли или бизнесе с международным дипломом',
    },
  })
  console.log('2/21 KBTU')

  // 3. KazGASA (МОК)
  await prisma.university.upsert({
    where: { slug: 'kazgasa' },
    update: {},
    create: {
      name: 'КазГАСА (Международная образовательная корпорация)',
      slug: 'kazgasa',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Казахская головная архитектурно-строительная академия — ведущий вуз Казахстана в области архитектуры, строительства и дизайна. Входит в состав Международной образовательной корпорации (МОК). Основана в 1980 году.',
      address: 'ул. Рыскулбекова, 28, Алматы, 050043',
      phone: '+7 (727) 309-61-00',
      email: 'info@kazgasa.edu.kz',
      hasMilitary: false,
      hasDormitory: true,
      tuitionMin: 800000,
      tuitionMax: 1800000,
      grants: true,
      paid: true,
      founded: 1980,
      website: 'https://kazgasa.edu.kz',
      features: ['Лидер в архитектуре и строительстве', 'Часть МОК', 'Практикоориентированное обучение', 'Партнёрства в строительной отрасли'],
      categories: ['engineering'],
      majors: ['Архитектура', 'Градостроительство', 'Строительство', 'Дизайн (интерьер, графика, промышленный)', 'Транспортное строительство', 'Инженерные системы и сети', 'Землеустройство', 'Кадастр', 'Геодезия', 'Пожарная безопасность', 'Ландшафтная архитектура'],
      targetAudience: 'Выпускники, мечтающие о карьере архитектора, дизайнера или строителя',
    },
  })
  console.log('3/21 КазГАСА')

  // 4. KAU
  await prisma.university.upsert({
    where: { slug: 'kau' },
    update: {},
    create: {
      name: 'Казахско-Американский университет (KAU)',
      slug: 'kau',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Частный университет, основанный в 1997 году на базе казахстанских и американских образовательных моделей. Компактный вуз с программами в IT, бизнесе, праве и гуманитарных науках.',
      address: 'ул. Торекулова, 29, Алматы, 050040',
      phone: '+7 (727) 311-10-13',
      email: 'info@kau.kz',
      hasMilitary: false,
      hasDormitory: false,
      tuitionMin: 800000,
      tuitionMax: 1500000,
      grants: true,
      paid: true,
      founded: 1997,
      website: 'https://kau.kz',
      features: ['Казахстанско-американская модель образования', 'Доступная стоимость', 'Двуязычное обучение (русский/английский)'],
      categories: ['it', 'business', 'humanities', 'law'],
      majors: ['Информационные системы', 'Computer Science', 'Бизнес-администрирование', 'Менеджмент', 'Финансы', 'Маркетинг', 'Экономика', 'Переводческое дело', 'Юриспруденция', 'Туризм', 'Международные отношения', 'Психология', 'Педагогика'],
      targetAudience: 'Выпускники, ищущие доступное частное образование с элементами американской системы',
    },
  })
  console.log('4/21 KAU')

  // 5. Narxoz (update existing)
  await prisma.university.upsert({
    where: { slug: 'narxoz' },
    update: {
      description: 'Один из старейших экономических университетов Центральной Азии, основанный в 1963 году. Специализируется на бизнесе, экономике, праве и IT. Международные аккредитации ACBSP и FIBAA.',
      address: 'ул. Жандосова, 55, Алматы',
      phone: '+7 (727) 346-64-64',
      email: 'info@narxoz.edu.kz',
      hasMilitary: false,
      hasDormitory: true,
      tuitionMin: 1200000,
      tuitionMax: 2500000,
      tuitionNote: 'Стоимость варьируется по программам и языку обучения',
      founded: 1963,
      website: 'https://narxoz.edu.kz',
      features: ['Один из старейших экономических вузов ЦА', 'Аккредитации ACBSP и FIBAA', 'Современный кампус', 'Бизнес-инкубатор'],
      categories: ['business', 'law', 'it', 'humanities'],
      majors: ['Финансы', 'Учёт и аудит', 'Экономика', 'Менеджмент', 'Маркетинг', 'Бизнес-администрирование', 'Международные отношения', 'Юриспруденция', 'Информационные системы', 'Туризм', 'Государственное управление', 'Data Science', 'Digital Marketing'],
      targetAudience: 'Выпускники, заинтересованные в бизнесе, экономике, праве и IT',
    },
    create: {
      name: 'Университет Нархоз',
      slug: 'narxoz',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Один из старейших экономических университетов Центральной Азии, основанный в 1963 году. Специализируется на бизнесе, экономике, праве и IT. Международные аккредитации ACBSP и FIBAA.',
      address: 'ул. Жандосова, 55, Алматы',
      phone: '+7 (727) 346-64-64',
      email: 'info@narxoz.edu.kz',
      hasMilitary: false,
      hasDormitory: true,
      tuitionMin: 1200000,
      tuitionMax: 2500000,
      tuitionNote: 'Стоимость варьируется по программам и языку обучения',
      grants: true,
      paid: true,
      founded: 1963,
      website: 'https://narxoz.edu.kz',
      features: ['Один из старейших экономических вузов ЦА', 'Аккредитации ACBSP и FIBAA', 'Современный кампус', 'Бизнес-инкубатор'],
      categories: ['business', 'law', 'it', 'humanities'],
      majors: ['Финансы', 'Учёт и аудит', 'Экономика', 'Менеджмент', 'Маркетинг', 'Бизнес-администрирование', 'Международные отношения', 'Юриспруденция', 'Информационные системы', 'Туризм', 'Государственное управление', 'Data Science', 'Digital Marketing'],
      targetAudience: 'Выпускники, заинтересованные в бизнесе, экономике, праве и IT',
    },
  })
  console.log('5/21 Narxoz')

  // 6. AlmaU
  await prisma.university.upsert({
    where: { slug: 'almau' },
    update: {},
    create: {
      name: 'Алматы Менеджмент Университет (AlmaU)',
      slug: 'almau',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Первая бизнес-школа Центральной Азии, основанная в 1988 году. Сильная репутация в области менеджмента, финансов и бизнес-образования. Кандидат на аккредитацию AACSB.',
      address: 'ул. Розыбакиева, 227, Алматы',
      phone: '+7 (727) 302-23-00',
      email: 'info@almau.edu.kz',
      hasMilitary: false,
      hasDormitory: false,
      tuitionMin: 1500000,
      tuitionMax: 3500000,
      grants: true,
      paid: true,
      founded: 1988,
      website: 'https://almau.edu.kz',
      features: ['Первая бизнес-школа ЦА', 'Кандидат AACSB', 'Аккредитация ACBSP и AMBA', 'Сильные связи с работодателями'],
      categories: ['business', 'law', 'it'],
      majors: ['Менеджмент', 'Финансы', 'Маркетинг', 'Учёт и аудит', 'Экономика', 'Юриспруденция', 'Государственное управление', 'Информационные системы', 'Business Analytics', 'MBA'],
      targetAudience: 'Выпускники, нацеленные на карьеру в бизнесе, финансах и менеджменте',
    },
  })
  console.log('6/21 AlmaU')

  // 7. IITU (МУИТ)
  await prisma.university.upsert({
    where: { slug: 'iitu' },
    update: {},
    create: {
      name: 'Международный университет информационных технологий (МУИТ)',
      slug: 'iitu',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Ведущий IT-университет Центральной Азии, основанный в 2009 году. Специализируется на подготовке международно признанных IT-специалистов. Четыре факультета: компьютерные технологии, IT, инженерия и бизнес.',
      address: 'ул. Манаса, 34/1, Алматы',
      phone: '+7 (727) 320-00-00',
      email: 'reception@iitu.edu.kz',
      hasMilitary: true,
      hasDormitory: true,
      tuitionMin: 1400000,
      tuitionMax: 2800000,
      grants: true,
      paid: true,
      founded: 2009,
      website: 'https://iitu.edu.kz',
      features: ['Ведущий IT-вуз ЦА', 'Военная кафедра', 'Партнёрство с Coursera', 'Современный кампус', 'Факультет кибербезопасности'],
      categories: ['it', 'engineering', 'business'],
      majors: ['Computer Science', 'Software Engineering', 'Кибербезопасность', 'Data Science', 'Искусственный интеллект', 'Информационные системы', 'IT Management', 'Digital Journalism'],
      targetAudience: 'Выпускники, увлечённые IT, программированием и кибербезопасностью',
    },
  })
  console.log('7/21 IITU (МУИТ)')

  // 8. Satpayev University
  await prisma.university.upsert({
    where: { slug: 'satpayev' },
    update: {},
    create: {
      name: 'Satbayev University (Политех)',
      slug: 'satpayev',
      city: 'Алматы',
      type: 'AUTONOMOUS',
      description: 'Старейший и один из самых престижных технических университетов Казахстана, основанный в 1934 году. Национальный исследовательский университет. 9 институтов, включая Институт военного дела. 90% трудоустройство выпускников.',
      address: 'ул. Сатпаева, 22а, Алматы, 050013',
      phone: '+7 (727) 292-73-01',
      email: 'priem@satbayev.university',
      hasMilitary: true,
      hasDormitory: true,
      tuitionMin: 800000,
      tuitionMax: 2200000,
      grants: true,
      paid: true,
      founded: 1934,
      website: 'https://satbayev.university',
      features: ['Национальный исследовательский университет', 'Институт военного дела', '90+ лет истории', '90% трудоустройство', 'Программы двойного диплома'],
      categories: ['engineering', 'it', 'sciences'],
      majors: ['Геология', 'Геофизика', 'Нефтегазовое дело', 'Горное дело', 'Металлургия', 'IT и автоматика', 'Энергетика', 'Машиностроение', 'Архитектура', 'Строительство', 'Транспортная инженерия', 'Логистика', 'Управление проектами', 'Химическая технология'],
      targetAudience: 'Выпускники, стремящиеся к инженерной или технической карьере в горнодобывающей, нефтегазовой или IT отрасли',
    },
  })
  console.log('8/21 Satpayev University')

  // 9. UIB
  await prisma.university.upsert({
    where: { slug: 'uib' },
    update: {},
    create: {
      name: 'Университет международного бизнеса (UIB)',
      slug: 'uib',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Частный университет, основанный в 1991 году, названный в честь Кенжегали Сагадиева. Сильный фокус на бизнесе и экономическом образовании. Кандидат на аккредитацию AACSB.',
      address: 'ул. Абая, 8а, Алматы',
      phone: '+7 (727) 259-80-58',
      email: 'info@uib.edu.kz',
      hasMilitary: false,
      hasDormitory: false,
      tuitionMin: 1200000,
      tuitionMax: 2500000,
      grants: true,
      paid: true,
      founded: 1991,
      website: 'https://uib.edu.kz',
      features: ['Кандидат AACSB', 'Многоязычное обучение', 'Сильные связи с бизнес-сообществом'],
      categories: ['business', 'law', 'it', 'humanities'],
      majors: ['Финансы', 'Учёт и аудит', 'Менеджмент', 'Маркетинг', 'Экономика', 'Международные отношения', 'Юриспруденция', 'Информационные системы', 'Туризм', 'Государственное управление', 'Педагогика и психология'],
      targetAudience: 'Выпускники, заинтересованные в бизнес-образовании и экономике',
    },
  })
  console.log('9/21 UIB')

  // 10. DMUK
  await prisma.university.upsert({
    where: { slug: 'dmuk' },
    update: {},
    create: {
      name: 'De Montfort University Kazakhstan (DMUK)',
      slug: 'dmuk',
      city: 'Алматы',
      type: 'BRANCH',
      description: 'Филиал британского De Montfort University (Лестер) в Алматы. Обучение на английском языке. Выпускники получают британский диплом. Программы в области бизнеса, IT и кибербезопасности.',
      address: 'ул. Кабдолова, 1, Алматы',
      phone: '+7 (727) 355-05-51',
      email: 'admissions@dmuk.edu.kz',
      hasMilitary: false,
      hasDormitory: false,
      tuitionMin: 2500000,
      tuitionMax: 4500000,
      tuitionNote: 'Стоимость привязана к курсу фунта стерлингов',
      grants: false,
      paid: true,
      founded: 2021,
      website: 'https://dmuk.edu.kz',
      features: ['Диплом DMU (Великобритания)', 'Обучение на английском', 'Британская программа', 'Возможность перевода в UK'],
      categories: ['it', 'business', 'humanities'],
      majors: ['Business Management', 'Computer Science', 'Cyber Security', 'International Relations', 'Media and Communication', 'Finance and Investment', 'Software Engineering'],
      targetAudience: 'Выпускники с хорошим английским, желающие получить британский диплом в Алматы',
    },
  })
  console.log('10/21 DMUK')

  // 11. ALT
  await prisma.university.upsert({
    where: { slug: 'alt' },
    update: {},
    create: {
      name: 'ALT University им. М. Тынышпаева',
      slug: 'alt',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Один из старейших транспортных и логистических вузов Центральной Азии, основанный в 1931 году. Институт военного дела. Сильные программы в транспорте, энергетике и IT.',
      address: 'ул. Шевченко, 97, Алматы',
      phone: '+7 (727) 292-09-74',
      email: 'info@alt.edu.kz',
      hasMilitary: true,
      hasDormitory: true,
      tuitionMin: 600000,
      tuitionMax: 1500000,
      grants: true,
      paid: true,
      founded: 1931,
      website: 'https://alt.edu.kz',
      features: ['Один из старейших вузов ЦА (с 1931)', 'Институт военного дела', 'Партнёрство с Coursera', 'Научные журналы'],
      categories: ['engineering', 'it', 'business'],
      majors: ['Транспортная техника и технологии', 'Логистика', 'Строительство', 'Организация перевозок', 'Автоматизация и управление', 'Телекоммуникации', 'IT', 'Электроэнергетика', 'Менеджмент', 'Экономика', 'Учёт и аудит'],
      targetAudience: 'Выпускники, заинтересованные в транспорте, логистике, энергетике и инженерии',
    },
  })
  console.log('11/21 ALT')

  // 12. KIMEP (update existing)
  await prisma.university.upsert({
    where: { slug: 'kimep' },
    update: {
      description: 'Один из первых университетов западного типа в Центральной Азии, основанный указом Президента в 1992 году. Обучение полностью на английском языке. Бизнес-школа аккредитована AACSB.',
      address: 'пр. Абая, 2, Алматы',
      phone: '+7 (727) 270-42-00',
      email: 'admission@kimep.kz',
      hasMilitary: false,
      hasDormitory: true,
      tuitionMin: 2800000,
      tuitionMax: 5000000,
      tuitionNote: 'Один из самых дорогих вузов Казахстана; стипендии покрывают до 100%',
      founded: 1992,
      website: 'https://kimep.kz',
      features: ['Аккредитация AACSB (бизнес-школа)', 'Обучение на английском языке', 'Основан указом Президента', 'Международный преподавательский состав'],
      categories: ['business', 'law', 'humanities'],
      majors: ['Финансы', 'Учёт и аудит', 'Менеджмент', 'Маркетинг', 'MBA', 'Международные отношения', 'Политология', 'Государственное управление', 'Журналистика', 'Психология', 'Прикладная лингвистика', 'Юриспруденция'],
      targetAudience: 'Амбициозные выпускники с высоким уровнем английского, стремящиеся к карьере в бизнесе, праве или международных отношениях',
    },
    create: {
      name: 'KIMEP University',
      slug: 'kimep',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Один из первых университетов западного типа в Центральной Азии, основанный указом Президента в 1992 году. Обучение полностью на английском языке. Бизнес-школа аккредитована AACSB.',
      address: 'пр. Абая, 2, Алматы',
      phone: '+7 (727) 270-42-00',
      email: 'admission@kimep.kz',
      hasMilitary: false,
      hasDormitory: true,
      tuitionMin: 2800000,
      tuitionMax: 5000000,
      tuitionNote: 'Один из самых дорогих вузов Казахстана; стипендии покрывают до 100%',
      grants: true,
      paid: true,
      founded: 1992,
      website: 'https://kimep.kz',
      features: ['Аккредитация AACSB (бизнес-школа)', 'Обучение на английском языке', 'Основан указом Президента', 'Международный преподавательский состав'],
      categories: ['business', 'law', 'humanities'],
      majors: ['Финансы', 'Учёт и аудит', 'Менеджмент', 'Маркетинг', 'MBA', 'Международные отношения', 'Политология', 'Государственное управление', 'Журналистика', 'Психология', 'Прикладная лингвистика', 'Юриспруденция'],
      targetAudience: 'Амбициозные выпускники с высоким уровнем английского, стремящиеся к карьере в бизнесе, праве или международных отношениях',
    },
  })
  console.log('12/21 KIMEP')

  // 13. QyzPU (ЖенПУ)
  await prisma.university.upsert({
    where: { slug: 'qyzpu' },
    update: {},
    create: {
      name: 'Казахский национальный женский педагогический университет (QyzPU)',
      slug: 'qyzpu',
      city: 'Алматы',
      type: 'AUTONOMOUS',
      description: 'Единственный женский педагогический университет в Казахстане и Центральной Азии, основанный в 1944 году. Готовит педагогов, психологов и специалистов в области естественных наук.',
      address: 'ул. Гоголя, 114, корпус 1, Алматы',
      phone: '+7 (727) 237-00-77',
      email: 'info@qyzpu.edu.kz',
      hasMilitary: false,
      hasDormitory: true,
      tuitionMin: 450000,
      tuitionMax: 800000,
      grants: true,
      paid: true,
      founded: 1944,
      website: 'https://qyzpu.edu.kz',
      features: ['Единственный женский педвуз в ЦА', 'Государственные гранты', 'Доступная стоимость обучения', 'Эко-кампус'],
      categories: ['humanities', 'sciences', 'it'],
      majors: ['Педагогика и психология', 'Специальная педагогика', 'Дошкольное образование', 'Начальное образование', 'Казахский язык и литература', 'Русский язык и литература', 'Иностранные языки', 'Математика', 'Физика', 'Информатика', 'Химия', 'Биология', 'География', 'История', 'Музыка', 'Хореография'],
      targetAudience: 'Девушки-выпускницы, стремящиеся к педагогической карьере',
    },
  })
  console.log('13/21 QyzPU')

  // 14. Abay University (КазНПУ)
  await prisma.university.upsert({
    where: { slug: 'kaznpu' },
    update: {},
    create: {
      name: 'Казахский национальный педагогический университет имени Абая',
      slug: 'kaznpu',
      city: 'Алматы',
      type: 'AUTONOMOUS',
      description: 'Первый вуз Казахстана, основанный в 1928 году. Крупнейший педагогический университет Центральной Азии. Факультет физической культуры и начальной военной подготовки.',
      address: 'пр. Достык, 13, Алматы, 050010',
      phone: '+7 (727) 390-60-05',
      email: 'rector@abaiuniversity.edu.kz',
      hasMilitary: true,
      hasDormitory: true,
      tuitionMin: 450000,
      tuitionMax: 1000000,
      grants: true,
      paid: true,
      founded: 1928,
      website: 'https://kaznpu.kz',
      features: ['Первый вуз Казахстана (1928)', 'Назван в честь Абая Кунанбаева', 'Крупнейший педвуз ЦА', 'Факультет начальной военной подготовки'],
      categories: ['humanities', 'sciences', 'law', 'it'],
      majors: ['Педагогика и психология', 'Филология', 'Математика', 'Физика', 'Информатика', 'Естествознание', 'География', 'История', 'Право', 'Искусство', 'Физическая культура', 'Начальная военная подготовка', 'Музыкальное образование', 'Хореография'],
      targetAudience: 'Выпускники, стремящиеся к педагогической или научной карьере',
    },
  })
  console.log('14/21 Abay University')

  // 15. AUES (Energo University)
  await prisma.university.upsert({
    where: { slug: 'aues' },
    update: {},
    create: {
      name: 'Алматинский университет энергетики и связи (АУЭС)',
      slug: 'aues',
      city: 'Алматы',
      type: 'AUTONOMOUS',
      description: 'Ведущий технический университет в области энергетики, телекоммуникаций и IT, основанный в 1975 году. Назван в честь Гумарбека Даукеева. Институты энергетики, IT и космической инженерии.',
      address: 'ул. Байтурсынулы, 126/1, Алматы',
      phone: '+7 (727) 323-11-75',
      email: 'aues@aues.kz',
      hasMilitary: true,
      hasDormitory: true,
      tuitionMin: 600000,
      tuitionMax: 1200000,
      grants: true,
      paid: true,
      founded: 1975,
      website: 'https://aues.edu.kz',
      features: ['Лидер в энергетике и телеком', 'Военная кафедра', 'Центр Schneider Electric', 'Партнёрства с зарубежными вузами'],
      categories: ['engineering', 'it', 'sciences'],
      majors: ['Электроэнергетика', 'Теплоэнергетика', 'Возобновляемая энергетика', 'Телекоммуникации', 'Информационные системы', 'Computer Science', 'Кибербезопасность', 'Автоматизация', 'Робототехника', 'Космические технологии'],
      targetAudience: 'Выпускники, заинтересованные в энергетике, телекоммуникациях и IT',
    },
  })
  console.log('15/21 AUES')

  // 16. DKU
  await prisma.university.upsert({
    where: { slug: 'dku' },
    update: {},
    create: {
      name: 'Казахстанско-Немецкий Университет (DKU)',
      slug: 'dku',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Международный частный университет, основанный в 1999 году при сотрудничестве Казахстана и Германии. 10 вузов-партнёров в Германии. Программы двойного диплома. Входит в ТОП-5 по рейтингу «Атамекен».',
      address: 'ул. Пушкина, 111, Алматы, 050010',
      phone: '+7 (727) 355-05-51',
      email: 'info@dku.kz',
      hasMilitary: false,
      hasDormitory: true,
      tuitionMin: 1500000,
      tuitionMax: 2500000,
      tuitionNote: '40% студентов получают стипендии DAAD или гранты',
      grants: true,
      paid: true,
      founded: 1999,
      website: 'https://dku.kz',
      features: ['Программы двойного диплома с Германией', '10 вузов-партнёров в Германии', 'Аккредитация ACQUIN', 'Стипендии DAAD', 'ТОП-5 по «Атамекен»'],
      categories: ['business', 'engineering', 'it', 'humanities'],
      majors: ['Транспортная логистика', 'Информационная инженерия в экономике', 'Энергетика и экологическая инженерия', 'Международные отношения', 'Управление предприятием', 'Финансы'],
      targetAudience: 'Выпускники, заинтересованные в немецком образовании и двойном дипломе',
    },
  })
  console.log('16/21 DKU')

  // 17. Caspian University
  await prisma.university.upsert({
    where: { slug: 'caspian' },
    update: {},
    create: {
      name: 'Каспийский университет (Caspian University)',
      slug: 'caspian',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Частный университет, основанный в 1992 году. Одна из сильнейших юридических школ среди частных вузов. Школы права, бизнеса, гуманитарных наук и цифровых технологий.',
      address: 'ул. Сейфуллина, 521, Алматы',
      phone: '+7 (727) 250-69-35',
      email: 'info@cu.edu.kz',
      hasMilitary: false,
      hasDormitory: true,
      tuitionMin: 800000,
      tuitionMax: 1800000,
      grants: true,
      paid: true,
      founded: 1992,
      website: 'https://cu.edu.kz',
      features: ['Сильная юридическая школа', 'НИИ Частного и Публичного права', 'Эндаумент фонд', 'Международные аккредитации'],
      categories: ['law', 'business', 'it', 'humanities'],
      majors: ['Юриспруденция', 'Международное право', 'Таможенное дело', 'Финансы', 'Учёт и аудит', 'Экономика', 'Менеджмент', 'Маркетинг', 'Международные отношения', 'Политология', 'Переводческое дело', 'Психология', 'Информационные системы', 'Педагогика'],
      targetAudience: 'Выпускники, заинтересованные в юриспруденции и бизнесе',
    },
  })
  console.log('17/21 Caspian University')

  // 18. Turan University
  await prisma.university.upsert({
    where: { slug: 'turan' },
    update: {},
    create: {
      name: 'Университет «Туран»',
      slug: 'turan',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Один из первых частных университетов Казахстана, основанный в 1992 году. Аккредитация FIBAA. Широкий спектр программ: от бизнеса и IT до кинематографии и дизайна.',
      address: 'ул. Сатпаева, 16а, Алматы',
      phone: '+7 (727) 260-40-48',
      email: 'info@turan-edu.kz',
      hasMilitary: false,
      hasDormitory: true,
      tuitionMin: 800000,
      tuitionMax: 2000000,
      grants: true,
      paid: true,
      founded: 1992,
      website: 'https://turan-edu.kz',
      features: ['Один из первых частных вузов КЗ', 'Аккредитация FIBAA', 'Факультет кино и телевидения', 'Программы двойного диплома с Европой'],
      categories: ['business', 'it', 'law', 'humanities'],
      majors: ['Экономика', 'Финансы', 'Учёт и аудит', 'Менеджмент', 'Маркетинг', 'Логистика', 'Государственное управление', 'Юриспруденция', 'Международные отношения', 'Переводческое дело', 'Туризм', 'Психология', 'Информационные системы', 'IT', 'Кино и телевидение', 'Дизайн'],
      targetAudience: 'Выпускники, заинтересованные в бизнесе, IT, медиа и творческих профессиях',
    },
  })
  console.log('18/21 Turan University')

  // 19. Abylaikhan University (КазУМОиМЯ)
  await prisma.university.upsert({
    where: { slug: 'ablaikhan' },
    update: {},
    create: {
      name: 'КазУМОиМЯ им. Абылай хана',
      slug: 'ablaikhan',
      city: 'Алматы',
      type: 'STATE',
      description: 'Ведущий лингвистический и дипломатический университет Центральной Азии, основанный в 1941 году. Преподают 14+ иностранных языков. Готовит дипломатов, переводчиков и специалистов по международным отношениям.',
      address: 'ул. Муратбаева, 200, Алматы',
      phone: '+7 (727) 292-03-12',
      email: 'info@ablaikhan.kz',
      hasMilitary: true,
      hasDormitory: true,
      tuitionMin: 600000,
      tuitionMax: 1200000,
      grants: true,
      paid: true,
      founded: 1941,
      website: 'https://ablaikhan.kz',
      features: ['14+ иностранных языков', 'Подготовка дипломатов', 'Институт Конфуция', 'Сильная переводческая школа'],
      categories: ['humanities', 'law', 'business'],
      majors: ['Международные отношения', 'Переводческое дело (англ., кит., фр., нем., араб., кор., яп., тур., исп.)', 'Иностранный язык: два иностранных языка', 'Филология', 'Востоковедение', 'Регионоведение', 'Политология', 'Туризм', 'Менеджмент', 'Журналистика'],
      targetAudience: 'Выпускники, мечтающие о дипломатической карьере, работе переводчика или международника',
    },
  })
  console.log('19/21 Abylaikhan University')

  // 20. КазНМУ (Асфендияров)
  await prisma.university.upsert({
    where: { slug: 'kaznmu' },
    update: {},
    create: {
      name: 'КазНМУ им. С.Д. Асфендиярова',
      slug: 'kaznmu',
      city: 'Алматы',
      type: 'AUTONOMOUS',
      description: 'Старейший и самый престижный медицинский университет Казахстана, основанный в 1930 году. Крупнейший медвуз Центральной Азии. Готовит большинство врачей страны. Студенты из 20+ стран.',
      address: 'ул. Толе би, 94, Алматы',
      phone: '+7 (727) 292-79-37',
      email: 'info@kaznmu.kz',
      hasMilitary: true,
      hasDormitory: true,
      tuitionMin: 1300000,
      tuitionMax: 3500000,
      tuitionNote: 'Общая медицина дороже; сестринское дело дешевле; много госгрантов',
      grants: true,
      paid: true,
      founded: 1930,
      website: 'https://kaznmu.edu.kz',
      features: ['Старейший медвуз КЗ (1930)', 'Крупнейший медвуз ЦА', 'Коллаборационный центр ВОЗ', 'Факультет военной медицины', '10 000+ студентов'],
      categories: ['medical'],
      majors: ['Общая медицина', 'Стоматология', 'Фармация', 'Общественное здравоохранение', 'Сестринское дело', 'Медико-профилактическое дело', 'Военная медицина'],
      targetAudience: 'Выпускники, мечтающие стать врачом, стоматологом или фармацевтом',
    },
  })
  console.log('20/21 КазНМУ')

  // 21. КРМУ
  await prisma.university.upsert({
    where: { slug: 'krmu' },
    update: {},
    create: {
      name: 'Казахстанско-Российский медицинский университет (КРМУ)',
      slug: 'krmu',
      city: 'Алматы',
      type: 'PRIVATE',
      description: 'Совместный казахстанско-российский медицинский университет, основанный в 2014 году. Дипломы признаются в Казахстане и России. Современные симуляционные центры. Партнёрство с Сеченовским университетом.',
      address: 'ул. Торетай, 71, Алматы',
      phone: '+7 (727) 313-00-13',
      email: 'info@medkrmu.kz',
      hasMilitary: false,
      hasDormitory: true,
      tuitionMin: 1500000,
      tuitionMax: 2800000,
      grants: true,
      paid: true,
      founded: 2014,
      website: 'https://medkrmu.kz',
      features: ['Дипломы КЗ и РФ', 'Партнёрство с Сеченовским университетом', 'Симуляционные центры', 'Обучение на русском языке'],
      categories: ['medical'],
      majors: ['Общая медицина', 'Стоматология', 'Фармация', 'Общественное здравоохранение', 'Сестринское дело'],
      targetAudience: 'Выпускники, желающие получить медицинское образование с российским дипломом',
    },
  })
  console.log('21/21 КРМУ')

  console.log('\nВсе 21 университет Алматы успешно добавлены/обновлены!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
