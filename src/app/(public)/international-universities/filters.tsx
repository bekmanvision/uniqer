'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui'

interface FiltersProps {
  countries: string[]
  cities: string[]
  currentFilters: { country?: string; city?: string }
}

export function InternationalUniversityFilters({ countries, cities, currentFilters }: FiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    // Reset city when country changes
    if (key === 'country') {
      params.delete('city')
    }
    router.push(`/international-universities?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/international-universities')
  }

  const hasFilters = currentFilters.country || currentFilters.city

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Страна:</span>
        <div className="flex gap-1">
          <button
            onClick={() => updateFilter('country', '')}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              !currentFilters.country ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Все
          </button>
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => updateFilter('country', country)}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                currentFilters.country === country ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Город:</span>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => updateFilter('city', '')}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              !currentFilters.city ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Все
          </button>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => updateFilter('city', city)}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                currentFilters.city === city ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Сбросить
        </Button>
      )}
    </div>
  )
}
