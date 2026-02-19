import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { ThemeProvider } from '@/components/theme-provider'
import { routing } from '@/i18n/routing'
import '../globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  const ogLocale = locale === 'kk' ? 'kk_KZ' : locale === 'en' ? 'en_US' : 'ru_KZ'

  return {
    title: {
      default: t('defaultTitle'),
      template: '%s | UniQer',
    },
    description: t('defaultDescription'),
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
      locale: ogLocale,
      siteName: 'UniQer',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'ru' | 'kk' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
