'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui'

interface TourFiltersProps {
  cities: string[]
  currentFilters: { city?: string; grade?: string; status?: string }
}

export function TourFilters({ cities, currentFilters }: TourFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('tours')
  const tc = useTranslations('common')
  const tg = useTranslations('grades')
  const ts = useTranslations('statuses')

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/tours?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/tours')
  }

  const hasFilters = currentFilters.city || currentFilters.grade || currentFilters.status

  const btnBase = 'rounded-lg px-3 py-1.5 text-sm'
  const btnActive = 'bg-blue-600 text-white'
  const btnInactive = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* City filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{t('city')}:</span>
        <div className="flex gap-1">
          <button
            onClick={() => updateFilter('city', '')}
            className={`${btnBase} ${!currentFilters.city ? btnActive : btnInactive}`}
          >
            {tc('all')}
          </button>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => updateFilter('city', city)}
              className={`${btnBase} ${currentFilters.city === city ? btnActive : btnInactive}`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Grade filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{t('grade')}:</span>
        <div className="flex gap-1">
          <button
            onClick={() => updateFilter('grade', '')}
            className={`${btnBase} ${!currentFilters.grade ? btnActive : btnInactive}`}
          >
            {tc('all')}
          </button>
          {['9', '10', '11'].map((grade) => (
            <button
              key={grade}
              onClick={() => updateFilter('grade', grade)}
              className={`${btnBase} ${currentFilters.grade === grade ? btnActive : btnInactive}`}
            >
              {tg(grade)}
            </button>
          ))}
        </div>
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{t('status')}:</span>
        <div className="flex gap-1">
          <button
            onClick={() => updateFilter('status', '')}
            className={`${btnBase} ${!currentFilters.status ? btnActive : btnInactive}`}
          >
            {tc('all')}
          </button>
          <button
            onClick={() => updateFilter('status', 'OPEN')}
            className={`${btnBase} ${currentFilters.status === 'OPEN' ? btnActive : btnInactive}`}
          >
            {ts('OPEN')}
          </button>
          <button
            onClick={() => updateFilter('status', 'CLOSED')}
            className={`${btnBase} ${currentFilters.status === 'CLOSED' ? btnActive : btnInactive}`}
          >
            {ts('CLOSED')}
          </button>
        </div>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          {tc('reset')}
        </Button>
      )}
    </div>
  )
}
