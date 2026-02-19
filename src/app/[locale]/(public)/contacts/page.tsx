import { getTranslations } from 'next-intl/server'
import { Card, CardContent } from '@/components/ui'
import { ApplicationForm } from '@/components/public'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contacts' })
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  }
}

export default async function ContactsPage() {
  const t = await getTranslations('contacts')

  const contacts = [
    {
      icon: Phone,
      title: t('whatsapp'),
      value: '+7 776 212 1242',
      href: 'https://wa.me/77762121242',
      description: t('whatsappDesc'),
    },
    {
      icon: Mail,
      title: t('emailTitle'),
      value: 'info@uniqer.kz',
      href: 'mailto:info@uniqer.kz',
      description: t('emailDesc'),
    },
    {
      icon: MapPin,
      title: t('addressTitle'),
      value: t('addressValue'),
      href: null,
      description: t('addressDesc'),
    },
    {
      icon: Clock,
      title: t('workingHoursTitle'),
      value: t('workingHoursValue'),
      href: null,
      description: t('workingHoursWeekend'),
    },
  ]

  const socials = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/77762121242',
      color: 'bg-green-500',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/uniqer.kz',
      color: 'bg-pink-500',
    },
  ]

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 lg:text-4xl">{t('heading')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((contact) => (
            <Card key={contact.title}>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <contact.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-gray-100">{contact.title}</h3>
                {contact.href ? (
                  <a
                    href={contact.href}
                    className="mt-1 block text-blue-600 hover:text-blue-700"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-gray-100">{contact.value}</p>
                )}
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{contact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('socialTitle')}</h2>
          <div className="mt-6 flex justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-lg ${social.color} px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90`}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('writeUs')}</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {t('writeUsDesc')}
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('faqTitle')}</h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('faq1Question')}</h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {t('faq1Answer')}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('faq2Question')}</h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {t('faq2Answer')}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{t('faq3Question')}</h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {t('faq3Answer')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{t('feedbackForm')}</h3>
              <ApplicationForm type="CONTACT" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
