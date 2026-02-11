import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'UniQer - Кампус-туры по университетам Казахстана',
    template: '%s | UniQer',
  },
  description:
    'Кампус-туры для школьников 9-11 классов по лучшим университетам Казахстана. Профориентация, знакомство с вузами, выбор будущей профессии.',
  keywords: [
    'кампус-туры',
    'университеты Казахстана',
    'профориентация',
    'выбор университета',
    'школьники',
    'экскурсии в вузы',
  ],
  authors: [{ name: 'UniQer' }],
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
    siteName: 'UniQer',
    title: 'UniQer - Кампус-туры по университетам Казахстана',
    description:
      'Кампус-туры для школьников 9-11 классов по лучшим университетам Казахстана.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
