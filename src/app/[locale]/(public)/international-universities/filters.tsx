'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Globe, SlidersHorizontal, MapPin, GraduationCap, Home, X } from 'lucide-react'

interface FiltersProps {
  countries: string[]
  cities: string[]
  languages: string[]
  currentFilters: { country?: string; city?: string; language?: string; dormitory?: string }
  totalCount: number
}

export function InternationalUniversityFilters({ countries, cities, languages, currentFilters, totalCount }: FiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('internationalUniversities')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    if (key === 'country') {
      params.delete('city')
    }
    router.push(`/international-universities?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/international-universities')
  }

  const hasFilters = currentFilters.country || currentFilters.city || currentFilters.language || currentFilters.dormitory
  const activeFilterCount = [currentFilters.city, currentFilters.language, currentFilters.dormitory].filter(Boolean).length

  return (
    <div className="space-y-3">
      {/* Top row: country pills + filter button + count */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-1.5">
          <button
            onClick={() => updateFilter('country', '')}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
              !currentFilters.country
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {t('allCountries')}
          </button>
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => updateFilter('country', country)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                currentFilters.country === country
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Filter toggle button */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
              filtersOpen || activeFilterCount > 0
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t('filters')}
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Count */}
          <span className="hidden text-sm text-gray-400 dark:text-gray-500 sm:block">
            {t('uniCount', { count: totalCount })}
          </span>
        </div>
      </div>

      {/* Expandable filter panel */}
      {filtersOpen && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* City */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
              <select
                value={currentFilters.city || ''}
                onChange={(e) => updateFilter('city', e.target.value)}
                className="rounded-lg border-0 bg-white dark:bg-gray-800 py-1.5 pl-3 pr-8 text-sm text-gray-700 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('allCities')}</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 shrink-0 text-gray-400" />
              <select
                value={currentFilters.language || ''}
                onChange={(e) => updateFilter('language', e.target.value)}
                className="rounded-lg border-0 bg-white dark:bg-gray-800 py-1.5 pl-3 pr-8 text-sm text-gray-700 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('teachingLanguage')}</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Dormitory */}
            <label className="flex cursor-pointer items-center gap-2">
              <Home className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                type="checkbox"
                checked={currentFilters.dormitory === 'true'}
                onChange={(e) => updateFilter('dormitory', e.target.checked ? 'true' : '')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{t('withDormitory')}</span>
            </label>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="h-3.5 w-3.5" />
                {t('resetAll')}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile count */}
      <span className="block text-sm text-gray-400 dark:text-gray-500 sm:hidden">
        {t('uniCount', { count: totalCount })}
      </span>
    </div>
  )
}
