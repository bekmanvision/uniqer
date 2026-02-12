import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const universities = [
  {
    name: "Higher Colleges of Technology",
    country: "ОАЭ",
    city: "Абу-Даби",
    worldRanking: "N/A",
    topMajors: ["Engineering Technology", "Computer Information Science", "Business", "Health Sciences", "Applied Media", "Education", "Aviation"],
    allMajors: ["Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Computer Science", "Computer Engineering", "Information Security", "Data Science", "AI", "Software Development", "Networking", "Accounting", "Marketing", "HR Management", "Finance", "Supply Chain Management", "Nursing", "Pharmacy Technician", "Health Information Management", "Journalism", "Digital Media Production", "Visual Communication", "Applied Education"],
    tuitionMin: 0,
    tuitionMax: 14000,
    hasDormitory: true,
    website: "https://www.hct.ac.ae",
    founded: 1988,
    studentCount: 23000,
    language: "English",
    description: "Крупнейшее учреждение прикладного высшего образования в ОАЭ с 16 кампусами по всей стране. Специализируется на практико-ориентированном обучении в партнёрстве с индустрией. Обучение бесплатно для граждан ОАЭ.",
    features: ["Крупнейший вуз ОАЭ — 16 кампусов по всей стране", "Бесплатное обучение для граждан Эмиратов", "70+ учебных программ", "Практико-ориентированное обучение совместно с индустрией", "6 академических подразделений"],
  },
  {
    name: "American University of Ras Al Khaimah",
    country: "ОАЭ",
    city: "Рас-эль-Хайма",
    worldRanking: "QS #591 (2026)",
    topMajors: ["Civil and Infrastructure Engineering", "Computer Science", "Business Administration", "Mechanical Engineering", "Electrical Engineering", "Architecture", "Artificial Intelligence", "Biotechnology"],
    allMajors: ["Artificial Intelligence", "Computer Engineering", "Computer Science", "Chemical Engineering", "Civil and Infrastructure Engineering", "Electrical & Electronics Engineering", "Mechanical Engineering", "Architecture", "Mass Communication", "Biotechnology", "English Language", "Psychology", "Business Administration", "Accounting", "Finance", "HR Management", "Marketing", "Business Analytics", "Hospitality & Tourism Management", "MBA"],
    tuitionMin: 10000,
    tuitionMax: 16000,
    hasDormitory: true,
    website: "https://www.aurak.ac.ae",
    founded: 2009,
    studentCount: 1500,
    internationalStudents: 1200,
    language: "English",
    description: "Университет с американской моделью образования в эмирате Рас-эль-Хайма. Вошёл в топ-500 QS World Rankings в 2025 году. Кампус 1,3 млн кв. футов с 6 общежитиями и более доступной стоимостью жизни по сравнению с Дубаем.",
    features: ["ABET-аккредитация инженерных программ", "AACSB-аккредитация бизнес-программ", "45+ национальностей", "6 студенческих общежитий", "Доступная стоимость жизни в Рас-эль-Хайме"],
  },
  {
    name: "Al Ain University",
    country: "ОАЭ",
    city: "Аль-Айн",
    worldRanking: "QS #558 (2026)",
    topMajors: ["Pharmacy", "Law", "Computer Engineering", "Business Administration", "Civil Engineering", "Communication & Media", "Cyber Security", "Dentistry"],
    allMajors: ["Pharmacy", "Law", "Computer Engineering", "Networks & Communication Engineering", "Software Engineering", "Civil Engineering", "Electrical Engineering", "Cyber Security", "Interior Design", "Business Administration", "Accounting & Auditing", "Mass Communication", "Education", "English Language & Translation", "Arabic Language", "Psychology", "Dental Surgery", "Nursing"],
    tuitionMin: 7500,
    tuitionMax: 20000,
    hasDormitory: true,
    website: "https://www.aau.ac.ae",
    founded: 2004,
    studentCount: 5000,
    internationalStudents: 1500,
    language: "English/Arabic",
    description: "Частный университет с кампусами в Аль-Айне и Абу-Даби. 8 колледжей, включая медицинские (фармация, стоматология, медсестринство). 30 бакалаврских, 14 магистерских и 3 докторские программы.",
    features: ["ABET-аккредитация инженерии", "ACPE-аккредитация фармации", "8 колледжей", "Два кампуса: Аль-Айн и Абу-Даби", "55+ стран среди студентов"],
  },
  {
    name: "The British University in Dubai",
    country: "ОАЭ",
    city: "Дубай",
    worldRanking: "QS Arab Region #78 (2026)",
    topMajors: ["Artificial Intelligence", "MBA", "Project Management", "Education", "Finance", "Computer Science", "Engineering Management", "Architecture"],
    allMajors: ["Computer Science (AI)", "Computer Science (Software Engineering)", "Electro-Mechanical Engineering", "Industrial Engineering", "Architecture", "Accounting & Finance", "MBA", "MSc Finance", "MSc Project Management", "MSc Cybersecurity", "MSc AI", "MSc Structural Engineering", "MSc Engineering Management", "MEd Education", "PhD Education", "PhD Project Management", "PhD Computer Science", "PhD Business Management", "DBA"],
    tuitionMin: 15000,
    tuitionMax: 23000,
    hasDormitory: false,
    website: "https://www.buid.ac.ae",
    founded: 2003,
    studentCount: 1100,
    internationalStudents: 900,
    language: "English",
    description: "Первый в регионе Персидского залива университет с аккредитованными докторскими программами. Британская модель образования с партнёрствами с ведущими университетами Великобритании. Первая в ОАЭ программа BSc в области искусственного интеллекта.",
    features: ["Первые в регионе аккредитованные докторские программы", "Партнёрство с University of Edinburgh и др.", "Первая программа BSc по ИИ в ОАЭ", "Специализация на постдипломном образовании", "80+ национальностей"],
  },
  {
    name: "Emirates Aviation University",
    country: "ОАЭ",
    city: "Дубай",
    worldRanking: "QS 5 Stars",
    topMajors: ["Aeronautical Engineering", "Aviation Management", "Aerospace Engineering", "Logistics & Supply Chain Management", "Computer Science (AI)", "Aircraft Maintenance Engineering", "Aviation Safety", "Engineering Business Management"],
    allMajors: ["Aeronautical Engineering", "Aviation Management", "Logistics & Supply Chain Management", "Computer Science (AI)", "Computer Science (Data Science)", "Aerospace Engineering", "Aircraft Maintenance Engineering", "MBA", "MBA Aviation Management", "MBA Logistics", "MSc Engineering Business Management", "MSc Data Science & AI", "MSc Mechanical Engineering", "MSc Aerospace Engineering", "MSc Aviation Safety", "MSc Aviation Security", "PhD Aviation Management", "PhD Data Science"],
    tuitionMin: 21000,
    tuitionMax: 37000,
    hasDormitory: true,
    website: "https://www.eau.ac.ae",
    founded: 1991,
    studentCount: 1400,
    language: "English",
    description: "Ведущее авиационное учебное заведение Ближнего Востока — образовательное подразделение Emirates Group. Программы от бакалавриата до докторантуры с двойными дипломами совместно с Coventry University (Великобритания).",
    features: ["Образовательное подразделение Emirates Group", "Двойные дипломы с Coventry University (UK)", "Первый негосударственный вуз региона с QS 5 Stars", "Прямые связи с Emirates/flydubai", "Подготовка лётных диспетчеров и авиаинженеров"],
  },
  {
    name: "De Montfort University Dubai",
    country: "ОАЭ",
    city: "Дубай",
    worldRanking: "QS #801-850 (2026)",
    topMajors: ["Computer Science", "Business Management", "Cyber Security", "Architecture", "Artificial Intelligence", "Law", "Mechanical Engineering", "Psychology"],
    allMajors: ["Computer Science", "Business Management", "Cyber Security", "Architecture", "Artificial Intelligence", "Law", "Mechanical Engineering", "Electrical Engineering", "Psychology", "Accounting & Finance", "Interior Design", "Fashion Communication", "Fashion Business", "Data Analytics", "Energy & Sustainable Development", "HR Management", "Marketing Management", "MBA", "Project Management", "Engineering Management"],
    tuitionMin: 16000,
    tuitionMax: 27000,
    hasDormitory: false,
    website: "https://www.dmu.ac.ae",
    founded: 2021,
    studentCount: 1000,
    language: "English",
    description: "Первый международный кампус британского De Montfort University (Лестер), открытый в 2021 году. Британские дипломы, признанные по всему миру. Расположен в Dubai Internet City рядом с офисами Google, Microsoft и Meta.",
    features: ["Британский диплом, признанный международно", "Расположен в Dubai Internet City", "Foundation Year для абитуриентов", "130+ национальностей по всей сети DMU", "Молодой и быстрорастущий кампус (2021)"],
  },
  {
    name: "ESMOD Dubai",
    country: "ОАЭ",
    city: "Дубай",
    worldRanking: "Best Fashion School in UAE (Education UAE)",
    topMajors: ["Fashion Design & Pattern Making", "Fashion Styling", "Sustainable Fashion", "Virtual Fashion Design (Clo3D)", "Fashion Business & Marketing", "Bridal & Wedding Dress Design", "Modestwear / Abaya Design"],
    allMajors: ["Fashion Design & Pattern Making", "Fashion Styling", "Sustainable Fashion", "Upcycling", "Virtual Fashion Clo3D", "Bridal & Wedding Dress Design", "Modestwear & Abaya Design", "Digital Design for Fashion", "Fashion Marketing", "Fashion Buying", "Luxury Brand Management", "Online Fashion Design"],
    tuitionMin: 30000,
    tuitionMax: 30000,
    hasDormitory: false,
    website: "https://dubai.esmod.com",
    founded: 2006,
    studentCount: 200,
    internationalStudents: 180,
    language: "English",
    description: "Филиал старейшей в мире школы моды ESMOD (Париж, 1841). Единственная в ОАЭ школа, полностью посвящённая модной индустрии. 20+ программ от трёхлетнего бакалавриата до коротких курсов.",
    features: ["Филиал старейшей школы моды в мире (Париж, 1841)", "Единственная в ОАЭ школа полностью для fashion-индустрии", "CAA-аккредитация", "75+ национальностей", "Курсы modest-fashion и свадебного дизайна для региона"],
  },
]

async function main() {
  console.log('Seeding additional UAE universities...\n')

  for (const uni of universities) {
    const existing = await prisma.internationalUniversity.findFirst({
      where: { name: uni.name },
    })

    if (existing) {
      await prisma.internationalUniversity.update({
        where: { id: existing.id },
        data: uni,
      })
      console.log(`Updated: ${uni.name}`)
    } else {
      await prisma.internationalUniversity.create({
        data: uni,
      })
      console.log(`Created: ${uni.name}`)
    }
  }

  console.log(`\nDone! Processed ${universities.length} additional UAE universities.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
