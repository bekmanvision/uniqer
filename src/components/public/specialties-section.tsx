'use client'

import { useState, useMemo } from 'react'
import { GraduationCap, Search, ChevronDown, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui'
import { useTranslations } from 'next-intl'

interface SpecialtiesSectionProps {
  majors: string[]
  topMajors?: string[]
  label?: string
}

export function SpecialtiesSection({ majors, topMajors, label }: SpecialtiesSectionProps) {
  const t = useTranslations('universities')

  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const displayLabel = label ?? t('specialties')

  const allMajors = majors.length > 0 ? majors : (topMajors ?? [])
  const total = allMajors.length

  const filtered = useMemo(() => {
    if (!search.trim()) return allMajors
    const q = search.toLowerCase()
    return allMajors.filter(m => m.toLowerCase().includes(q))
  }, [allMajors, search])

  const preview = topMajors && topMajors.length > 0 ? topMajors.slice(0, 5) : allMajors.slice(0, 5)

  if (total === 0) return null

  return (
    <Card>
      <CardContent className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{displayLabel}</h2>
          </div>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {total}
          </span>
        </div>

        {/* Preview chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {preview.map((major) => (
            <span
              key={major}
              className={
                topMajors && topMajors.includes(major)
                  ? 'rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  : 'rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }
            >
              {major}
            </span>
          ))}
          {total > 5 && !isOpen && (
            <span className="rounded-full bg-gray-50 px-3 py-1.5 text-sm text-gray-400 dark:bg-gray-800 dark:text-gray-500">
              +{total - 5}
            </span>
          )}
        </div>

        {/* Toggle button */}
        {total > 5 && !isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
          >
            <GraduationCap className="h-4 w-4" />
            {t('allSpecialties', { count: total })}
            <ChevronDown className="h-4 w-4" />
          </button>
        )}

        {/* Expanded view */}
        {isOpen && (
          <div className="mt-2 rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('allSpecialties', { count: total })}
              </h3>
              <button
                onClick={() => { setIsOpen(false); setSearch('') }}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search */}
            {total > 10 && (
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('searchSpecialty')}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
                />
              </div>
            )}

            {/* Majors list */}
            <div className="flex flex-wrap gap-2">
              {filtered.map((major) => (
                <span
                  key={major}
                  className={
                    topMajors && topMajors.includes(major)
                      ? 'rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-800 border border-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
                      : 'rounded-full bg-white px-3 py-1.5 text-sm text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                  }
                >
                  {major}
                </span>
              ))}
              {filtered.length === 0 && (
                <p className="text-sm text-gray-400 dark:text-gray-500 py-2">{t('nothingFound')}</p>
              )}
            </div>

            {search && filtered.length !== total && (
              <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                {t('found', { found: filtered.length, total })}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
