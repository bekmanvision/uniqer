'use client'

import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/language-switcher'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Map,
  Building2,
  Globe,
  FileText,
  Users,
  UserCog,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react'
import { useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { useTheme } from 'next-themes'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const t = useTranslations('admin')
  const tc = useTranslations('common')
  const locale = useLocale()

  const navigation = [
    { name: t('dashboard'), href: '/admin', icon: LayoutDashboard },
    { name: t('tours'), href: '/admin/tours', icon: Map },
    { name: t('universities'), href: '/admin/universities', icon: Building2 },
    { name: t('internationalUniversities'), href: '/admin/international-universities', icon: Globe },
    { name: t('applications'), href: '/admin/applications', icon: FileText },
    { name: t('students'), href: '/admin/students', icon: Users },
    { name: t('team'), href: '/admin/team', icon: UserCog },
  ]

  // Show login page without layout
  if (pathname?.endsWith('/admin/login')) {
    return <>{children}</>
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (status === 'unauthenticated') {
    if (typeof window !== 'undefined') {
      window.location.href = `/${locale}/admin/login`
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-900 shadow-lg transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b dark:border-gray-700 px-4">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-lg font-bold text-white">U</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">UniQer Admin</span>
            </Link>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === `/${locale}${item.href}` ||
                (item.href !== '/admin' && pathname?.startsWith(`/${locale}${item.href}`))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User */}
          <div className="border-t dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                  {session?.user?.name}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {session?.user?.email}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <LanguageSwitcher />
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
                  className="rounded-lg p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300"
                  title={tc('switchTheme')}
                >
                  {theme === 'dark' ? <Moon className="h-5 w-5" /> : theme === 'system' ? <Monitor className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => signOut({ callbackUrl: `/${locale}/admin/login` })}
                  className="rounded-lg p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300"
                  title={t('signOut')}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b dark:border-gray-700 bg-white dark:bg-gray-900 px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-semibold text-gray-900 dark:text-gray-100">UniQer Admin</span>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  )
}
