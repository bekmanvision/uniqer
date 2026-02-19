'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const localeLabels: Record<string, string> = {
  ru: 'RU',
  kk: 'KZ',
  en: 'EN',
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-0.5">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleChange(loc)}
          className={cn(
            'rounded px-1.5 py-1 text-xs font-medium transition-colors',
            locale === loc
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
          )}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  )
}
