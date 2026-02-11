import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Исправляю данные университетов по результатам проверки...\n')

  // 1. AMU — телефон
  await prisma.university.update({
    where: { slug: 'amu' },
    data: {
      phone: '+7 (7172) 53-94-47',
    },
  })
  console.log('✓ AMU: исправлен телефон → +7 (7172) 53-94-47')

  // 2. Esil University — адрес и телефон
  await prisma.university.update({
    where: { slug: 'esil' },
    data: {
      address: 'ул. А. Жубанова, 7, Астана',
      phone: '+7 708 227 01 01',
    },
  })
  console.log('✓ Esil: адрес → ул. А. Жубанова, 7 | телефон → +7 708 227 01 01')

  // 3. MNU — hasMilitary = true, телефон, website
  await prisma.university.update({
    where: { slug: 'mnu' },
    data: {
      hasMilitary: true,
      phone: '+7 (7172) 70-30-30',
      website: 'https://kazguu.kz',
    },
  })
  console.log('✓ MNU: военная кафедра = ДА | телефон → +7 (7172) 70-30-30 | сайт → kazguu.kz')

  // 4. AIU — телефон
  await prisma.university.update({
    where: { slug: 'aiu' },
    data: {
      phone: '+7 (7172) 24-36-68',
    },
  })
  console.log('✓ AIU: телефон → +7 (7172) 24-36-68')

  // 5. МГУ — адрес, общежитие, email, телефон, специальности
  await prisma.university.update({
    where: { slug: 'msu-astana' },
    data: {
      address: 'ул. Кажымукана, 11, 7 этаж корпуса ЕНУ, Астана, 010010',
      hasDormitory: true,
      email: 'msukz@mail.ru',
      phone: '+7 (7172) 35-34-05',
      majors: [
        'Математика', 'Прикладная математика и информатика',
        'Филология', 'Экология и природопользование', 'Экономика',
      ],
    },
  })
  console.log('✓ МГУ: адрес → Кажымукана 11 | общежитие = ДА | email → msukz@mail.ru | телефон → +7 (7172) 35-34-05')

  // 6. Cardiff — название, сайт (это Cardiff University, НЕ Cardiff Metropolitan!)
  await prisma.university.update({
    where: { slug: 'cardiffmet-astana' },
    data: {
      name: 'Cardiff University (филиал при НУ)',
      website: 'https://cardiff.nu.edu.kz',
      description: 'Филиал британского Cardiff University, работающий на базе Назарбаев Университета в Астане. Обучение на английском языке. Выпускники получают диплом Cardiff University, признанный во всём мире.',
    },
  })
  console.log('✓ Cardiff: название исправлено | сайт → cardiff.nu.edu.kz')

  // 7. Coventry — адрес, телефон, email, стоимость, год основания, сайт
  await prisma.university.update({
    where: { slug: 'coventry-astana' },
    data: {
      address: 'Коргалжынское шоссе, 13А, Астана',
      phone: '+7 (700) 317-33-33',
      email: 'info@coventry.edu.kz',
      tuitionMin: 7500000,
      tuitionMax: 7500000,
      tuitionNote: '$15 000/год (стоимость в тенге зависит от курса доллара)',
      founded: 2024,
      website: 'https://coventry.edu.kz',
      majors: [
        'Advertising & Digital Marketing',
        'Business Administration',
        'International Business Management',
        'Computer Science',
        'Computer Science with Artificial Intelligence',
      ],
    },
  })
  console.log('✓ Coventry: адрес → Коргалжынское шоссе 13А | телефон → +7 (700) 317-33-33 | стоимость → $15000/год | год основания → 2024 | сайт → coventry.edu.kz')

  console.log('\n✅ Все исправления применены!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
