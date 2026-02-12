'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
                : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-100'
            }`}
          >
            Все страны
          </button>
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => updateFilter('country', country)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                currentFilters.country === country
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-100'
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
                ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-200'
                : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Фильтры
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Count */}
          <span className="hidden text-sm text-gray-400 sm:block">
            {totalCount} {totalCount === 1 ? 'вуз' : totalCount < 5 ? 'вуза' : 'вузов'}
          </span>
        </div>
      </div>

      {/* Expandable filter panel */}
      {filtersOpen && (
        <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* City */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
              <select
                value={currentFilters.city || ''}
                onChange={(e) => updateFilter('city', e.target.value)}
                className="rounded-lg border-0 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 ring-1 ring-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Все города</option>
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
                className="rounded-lg border-0 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 ring-1 ring-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Язык обучения</option>
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
              <span className="text-sm text-gray-700">С общежитием</span>
            </label>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
              >
                <X className="h-3.5 w-3.5" />
                Сбросить всё
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile count */}
      <span className="block text-sm text-gray-400 sm:hidden">
        {totalCount} {totalCount === 1 ? 'вуз' : totalCount < 5 ? 'вуза' : 'вузов'}
      </span>
    </div>
  )
}
