'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Select } from '@/components/ui'

interface TourFiltersProps {
  cities: string[]
  currentFilters: { city?: string; grade?: string; status?: string }
}

export function TourFilters({ cities, currentFilters }: TourFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

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

  const cityOptions = [
    { value: '', label: 'Все города' },
    ...cities.map((city) => ({ value: city, label: city })),
  ]

  const gradeOptions = [
    { value: '', label: 'Все классы' },
    { value: '9', label: '9 класс' },
    { value: '10', label: '10 класс' },
    { value: '11', label: '11 класс' },
  ]

  const statusOptions = [
    { value: '', label: 'Все статусы' },
    { value: 'OPEN', label: 'Набор открыт' },
    { value: 'CLOSED', label: 'Набор закрыт' },
  ]

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select
        options={cityOptions}
        value={currentFilters.city || ''}
        onChange={(e) => updateFilter('city', e.target.value)}
        className="w-40"
      />
      <Select
        options={gradeOptions}
        value={currentFilters.grade || ''}
        onChange={(e) => updateFilter('grade', e.target.value)}
        className="w-40"
      />
      <Select
        options={statusOptions}
        value={currentFilters.status || ''}
        onChange={(e) => updateFilter('status', e.target.value)}
        className="w-40"
      />
      {hasFilters && (
        <Button variant="ghost" onClick={clearFilters}>
          Сбросить
        </Button>
      )}
    </div>
  )
}
