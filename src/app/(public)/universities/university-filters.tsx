'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui'
import { Monitor, Stethoscope, BookOpen, Briefcase, Cog, Scale } from 'lucide-react'

interface UniversityFiltersProps {
  cities: string[]
  currentFilters: { city?: string; type?: string; category?: string }
}

const categories = [
  { value: 'it', label: 'IT', icon: Monitor, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'medical', label: 'Медицина', icon: Stethoscope, color: 'bg-red-100 text-red-700 border-red-200' },
  { value: 'humanities', label: 'Гуманитарные', icon: BookOpen, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { value: 'business', label: 'Бизнес', icon: Briefcase, color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'engineering', label: 'Инженерия', icon: Cog, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { value: 'law', label: 'Право', icon: Scale, color: 'bg-gray-100 text-gray-700 border-gray-200' },
]

export function UniversityFilters({ cities, currentFilters }: UniversityFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/universities?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/universities')
  }

  const hasFilters = currentFilters.city || currentFilters.type || currentFilters.category

  return (
    <div className="space-y-4">
      {/* Category filters */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-700">Подходит для:</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = currentFilters.category === cat.value
            const Icon = cat.icon
            return (
              <button
                key={cat.value}
                onClick={() => updateFilter('category', isActive ? '' : cat.value)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                  isActive
                    ? cat.color + ' border-current'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* City and type filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Город:</span>
          <div className="flex gap-1">
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

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Тип:</span>
          <div className="flex gap-1">
            <button
              onClick={() => updateFilter('type', '')}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                !currentFilters.type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => updateFilter('type', 'STATE')}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                currentFilters.type === 'STATE' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Государственные
            </button>
            <button
              onClick={() => updateFilter('type', 'PRIVATE')}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                currentFilters.type === 'PRIVATE' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Частные
            </button>
          </div>
        </div>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Сбросить все
          </Button>
        )}
      </div>
    </div>
  )
}
