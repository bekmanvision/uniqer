'use client'

import { useState, useEffect, useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import { Plus, Edit, Trash2, Eye, Search, SlidersHorizontal, X } from 'lucide-react'
import type { University } from '@/types'

export default function AdminUniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [grantsFilter, setGrantsFilter] = useState('')
  const t = useTranslations('admin')
  const tu = useTranslations('universityTypes')
  const tc = useTranslations('common')

  useEffect(() => {
    fetchUniversities()
  }, [])

  const fetchUniversities = async () => {
    try {
      const res = await fetch('/api/universities')
      const data = await res.json()
      if (data.success) {
        setUniversities(data.data)
      }
    } catch (error) {
      console.error('Error fetching universities:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteUniversity = async (id: string) => {
    if (!confirm(t('deleteUniConfirm'))) return

    try {
      const res = await fetch(`/api/universities/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setUniversities(universities.filter((u) => u.id !== id))
      }
    } catch (error) {
      console.error('Error deleting university:', error)
    }
  }

  // Unique cities for filter
  const cities = useMemo(() => {
    const set = new Set(universities.map((u) => u.city))
    return [...set].sort()
  }, [universities])

  // Filtered list
  const filtered = useMemo(() => {
    return universities.filter((u) => {
      if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false
      if (cityFilter && u.city !== cityFilter) return false
      if (typeFilter && u.type !== typeFilter) return false
      if (grantsFilter === 'true' && !u.grants) return false
      return true
    })
  }, [universities, search, cityFilter, typeFilter, grantsFilter])

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('universities')}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">{t('manageUnis')}</p>
        </div>
        <Link href="/admin/universities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t('addUniversity')}
          </Button>
        </Link>
      </div>

      {/* Search & Filters — single horizontal toolbar */}
      <div
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', gap: '10px', marginTop: '24px' }}
      >
        <div style={{ position: 'relative', flex: '1 1 0%', minWidth: 0 }}>
          <Search
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchUniversities')}
            style={{
              width: '100%',
              height: '38px',
              paddingLeft: '38px',
              paddingRight: '12px',
              fontSize: '14px',
              borderRadius: '10px',
              border: '1px solid var(--filter-border, #e5e7eb)',
              backgroundColor: 'var(--filter-bg, #ffffff)',
              color: 'var(--filter-text, #374151)',
              outline: 'none',
            }}
            className="dark:[--filter-border:#374151] dark:[--filter-bg:#111827] dark:[--filter-text:#e5e7eb] focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          style={{
            height: '38px',
            padding: '0 32px 0 12px',
            fontSize: '14px',
            borderRadius: '10px',
            border: '1px solid var(--filter-border, #e5e7eb)',
            backgroundColor: 'var(--filter-bg, #ffffff)',
            color: 'var(--filter-text, #374151)',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
            backgroundSize: '14px',
            backgroundPosition: 'right 10px center',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer',
            flexShrink: 0,
            outline: 'none',
          }}
          className="dark:[--filter-border:#374151] dark:[--filter-bg:#111827] dark:[--filter-text:#e5e7eb] focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
        >
          <option value="">{t('allCities')}</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{
            height: '38px',
            padding: '0 32px 0 12px',
            fontSize: '14px',
            borderRadius: '10px',
            border: '1px solid var(--filter-border, #e5e7eb)',
            backgroundColor: 'var(--filter-bg, #ffffff)',
            color: 'var(--filter-text, #374151)',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
            backgroundSize: '14px',
            backgroundPosition: 'right 10px center',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer',
            flexShrink: 0,
            outline: 'none',
          }}
          className="dark:[--filter-border:#374151] dark:[--filter-bg:#111827] dark:[--filter-text:#e5e7eb] focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
        >
          <option value="">{t('allUniTypes')}</option>
          <option value="STATE">{tu('STATE')}</option>
          <option value="PRIVATE">{tu('PRIVATE')}</option>
          <option value="AUTONOMOUS">{tu('AUTONOMOUS')}</option>
          <option value="BRANCH">{tu('BRANCH')}</option>
        </select>
        <select
          value={grantsFilter}
          onChange={(e) => setGrantsFilter(e.target.value)}
          style={{
            height: '38px',
            padding: '0 32px 0 12px',
            fontSize: '14px',
            borderRadius: '10px',
            border: '1px solid var(--filter-border, #e5e7eb)',
            backgroundColor: 'var(--filter-bg, #ffffff)',
            color: 'var(--filter-text, #374151)',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
            backgroundSize: '14px',
            backgroundPosition: 'right 10px center',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer',
            flexShrink: 0,
            outline: 'none',
          }}
          className="dark:[--filter-border:#374151] dark:[--filter-bg:#111827] dark:[--filter-text:#e5e7eb] focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
        >
          <option value="">{t('allGrants')}</option>
          <option value="true">{t('withGrants')}</option>
        </select>
        {(search || cityFilter || typeFilter || grantsFilter) && (
          <button
            onClick={() => { setSearch(''); setCityFilter(''); setTypeFilter(''); setGrantsFilter('') }}
            style={{
              height: '38px',
              width: '38px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              border: '1px solid var(--filter-border, #e5e7eb)',
              backgroundColor: 'var(--filter-bg, #ffffff)',
              color: '#9ca3af',
              cursor: 'pointer',
            }}
            className="dark:[--filter-border:#374151] dark:[--filter-bg:#111827] hover:text-red-500"
            title="Сбросить фильтры"
          >
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        )}
      </div>

      {/* Result count */}
      {(search || cityFilter || typeFilter || grantsFilter) && (
        <p style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280' }}>
          {t('found', { count: filtered.length })}
        </p>
      )}

      {/* Universities List */}
      {filtered.length > 0 ? (
        <div className="mt-4 space-y-4">
          {filtered.map((university) => (
            <Card key={university.id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{university.name}</h3>
                      <Badge variant={university.type === 'STATE' ? 'info' : 'default'}>
                        {tu(university.type)}
                      </Badge>
                      {university.grants && <Badge variant="success">{tc('grants')}</Badge>}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{university.city}</span>
                      {university.majors.length > 0 && (
                        <span>{university.majors.slice(0, 3).join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/universities/${university.slug}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/universities/${university.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteUniversity(university.id)}
                      className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : universities.length > 0 ? (
        <Card className="mt-4">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">{t('found', { count: 0 })}</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-6">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">{t('noUnisYet')}</p>
            <Link href="/admin/universities/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                {t('addFirstUni')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
