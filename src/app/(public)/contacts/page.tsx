import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui'
import { ApplicationForm } from '@/components/public'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с командой UniQer',
}

const contacts = [
  {
    icon: Phone,
    title: 'Телефон',
    value: '+7 (700) 123-45-67',
    href: 'tel:+77001234567',
    description: 'Звоните с 9:00 до 18:00',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@uniqer.kz',
    href: 'mailto:info@uniqer.kz',
    description: 'Ответим в течение дня',
  },
  {
    icon: MapPin,
    title: 'Адрес',
    value: 'г. Алматы, Казахстан',
    href: null,
    description: 'Встречи по предварительной записи',
  },
  {
    icon: Clock,
    title: 'Режим работы',
    value: 'Пн-Пт: 9:00 - 18:00',
    href: null,
    description: 'Сб-Вс: выходной',
  },
]

const socials = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/77001234567',
    color: 'bg-green-500',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/uniqer',
    color: 'bg-pink-500',
  },
  {
    name: 'Telegram',
    href: 'https://t.me/uniqer',
    color: 'bg-blue-500',
  },
]

export default function ContactsPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">Контакты</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Свяжитесь с нами любым удобным способом. Мы всегда рады ответить на ваши вопросы
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((contact) => (
            <Card key={contact.title}>
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <contact.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{contact.title}</h3>
                {contact.href ? (
                  <a
                    href={contact.href}
                    className="mt-1 block text-blue-600 hover:text-blue-700"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="mt-1 text-gray-900">{contact.value}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">{contact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Мы в социальных сетях</h2>
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
            <h2 className="text-2xl font-bold text-gray-900">Напишите нам</h2>
            <p className="mt-4 text-gray-600">
              Остались вопросы? Заполните форму, и мы свяжемся с вами в ближайшее время.
            </p>

            <div className="mt-8">
              <h3 className="font-semibold text-gray-900">Часто задаваемые вопросы</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Как записаться на тур?</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Выберите подходящий тур в каталоге и заполните форму заявки. Мы свяжемся с
                    вами для подтверждения.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Что входит в стоимость?</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Транспорт, проживание, питание, экскурсии и все программные мероприятия.
                    Детали указаны на странице каждого тура.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Есть ли скидки для групп?</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Да, мы предлагаем специальные условия для школьных групп. Свяжитесь с нами
                    для получения индивидуального предложения.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Форма обратной связи</h3>
              <ApplicationForm type="CONTACT" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
