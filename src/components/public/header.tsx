'use client'

import { Link } from '@/i18n/navigation'
import { useState } from 'react'
import { Menu, X, Sun, Moon, Monitor, Settings } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui'
import { LanguageSwitcher } from '@/components/language-switcher'

const navigationKeys = [
  { key: 'tours', href: '/tours' },
  { key: 'universities', href: '/universities' },
  { key: 'internationalUniversities', href: '/international-universities' },
  { key: 'schools', href: '/schools' },
  { key: 'about', href: '/about' },
  { key: 'contacts', href: '/contacts' },
] as const

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()
  const t = useTranslations('nav')
  const tc = useTranslations('common')
  const isAdmin = !!session?.user

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-xl font-bold text-white">U</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">UniQer</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navigationKeys.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        {/* CTA + Theme Toggle + Language Switcher */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400"
              title="Admin"
            >
              <Settings className="h-5 w-5" />
            </Link>
          )}
          <LanguageSwitcher />
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label={tc('switchTheme')}
          >
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : theme === 'system' ? <Monitor className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <Link href="/tours">
            <Button>{tc('signUpForTour')}</Button>
          </Link>
        </div>

        {/* Mobile: language switcher + admin + theme toggle + menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400"
            >
              <Settings className="h-5 w-5" />
            </Link>
          )}
          <LanguageSwitcher />
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label={tc('switchTheme')}
          >
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : theme === 'system' ? <Monitor className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-4">
            {navigationKeys.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/tours" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">{tc('signUpForTour')}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
