import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Исправления на основе данных с edu.joo.kz
const fixes = [
  {
    slug: 'nu',
    data: {
      type: 'AUTONOMOUS' as const, // Автономный, не государственный
      hasMilitary: false,
      hasDormitory: true,
    }
  },
  {
    slug: 'aitu',
    data: {
      type: 'PRIVATE' as const, // Акционированный = частный
      hasMilitary: true, // Есть по данным joo.kz
      hasDormitory: true,
      tuitionMin: 2500000,
      tuitionMax: 2500000,
      tuitionNote: '2 500 000 ₸/год, скидки до 30% для отличников',
    }
  },
  {
    slug: 'amu',
    data: {
      type: 'PRIVATE' as const, // Акционированный
      hasMilitary: true,
      hasDormitory: true,
      tuitionMin: 770000,
      tuitionMax: 1900000,
      tuitionNote: 'Средняя цена: 1 335 000 ₸. Стоматология — 1 900 000 ₸',
    }
  },
  {
    slug: 'mnu',
    data: {
      type: 'PRIVATE' as const, // Акционированный
      hasMilitary: true, // Есть по данным joo.kz
      hasDormitory: true,
      tuitionMin: 2200000,
      tuitionMax: 2700000,
      tuitionNote: 'Средняя цена: 2 200 000 ₸',
    }
  },
  {
    slug: 'esil',
    data: {
      type: 'PRIVATE' as const,
      hasMilitary: false, // Нет по данным joo.kz
      hasDormitory: true,
    }
  },
  {
    slug: 'aiu',
    data: {
      type: 'PRIVATE' as const,
      hasMilitary: true, // Есть по данным joo.kz
      hasDormitory: true,
      tuitionMin: 530000,
      tuitionMax: 1300000,
      tuitionNote: 'Средняя цена: 695 000 ₸. Педагогика — от 530 000 ₸',
    }
  },
  {
    slug: 'enu',
    data: {
      type: 'STATE' as const, // Государственный
      hasMilitary: true,
      hasDormitory: true,
    }
  },
  {
    slug: 'msu-kz',
    data: {
      type: 'BRANCH' as const, // Филиал МГУ
      hasMilitary: false,
      hasDormitory: true,
    }
  },
  {
    slug: 'cardiff-kz',
    data: {
      type: 'BRANCH' as const, // Филиал Cardiff
      hasMilitary: false,
      hasDormitory: false,
    }
  },
  {
    slug: 'coventry-kz',
    data: {
      type: 'BRANCH' as const, // Филиал Coventry
      hasMilitary: false,
      hasDormitory: false,
    }
  },
]

async function main() {
  console.log('Исправляем данные университетов...\n')

  for (const fix of fixes) {
    try {
      const result = await prisma.university.update({
        where: { slug: fix.slug },
        data: fix.data,
      })
      console.log(`✓ ${result.name}`)
      console.log(`  Тип: ${fix.data.type}`)
      if (fix.data.hasMilitary !== undefined) {
        console.log(`  Военная кафедра: ${fix.data.hasMilitary ? 'Да' : 'Нет'}`)
      }
      console.log('')
    } catch (error) {
      console.log(`✗ ${fix.slug}: не найден`)
    }
  }

  console.log('Готово!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
