'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button, Card, CardContent, Select, Badge } from '@/components/ui'
import { formatDate, getStatusLabel, getStatusColor, getRoleLabel } from '@/lib/utils'
import { Download, Phone, Mail, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ApplicationWithTour } from '@/types'

export default function AdminApplicationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [applications, setApplications] = useState<ApplicationWithTour[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const status = searchParams.get('status') || ''
  const role = searchParams.get('role') || ''
  const type = searchParams.get('type') || ''
  const page = parseInt(searchParams.get('page') || '1')

  useEffect(() => {
    fetchApplications()
  }, [status, role, type, page])

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (status) params.set('status', status)
      if (role) params.set('role', role)
      if (type) params.set('type', type)
      params.set('page', String(page))
      params.set('pageSize', '20')

      const res = await fetch(`/api/applications?${params}`)
      const data = await res.json()
      if (data.success) {
        setApplications(data.data)
        setTotal(data.total)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/admin/applications?${params}`)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setApplications(apps =>
          apps.map(app =>
            app.id === id ? { ...app, status: newStatus as ApplicationWithTour['status'] } : app
          )
        )
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const exportCSV = () => {
    const params = new URLSearchParams()
    if (status) params.set('status', status)
    if (role) params.set('role', role)
    if (type) params.set('type', type)
    window.open(`/api/export/applications?${params}`, '_blank')
  }

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(newPage))
    router.push(`/admin/applications?${params}`)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Заявки</h1>
          <p className="mt-1 text-gray-600">Всего: {total} заявок</p>
        </div>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="mr-2 h-4 w-4" />
          Экспорт CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-4">
        <Select
          value={status}
          onChange={(e) => updateFilter('status', e.target.value)}
          options={[
            { value: '', label: 'Все статусы' },
            { value: 'NEW', label: 'Новые' },
            { value: 'CONTACTED', label: 'Связались' },
            { value: 'CONFIRMED', label: 'Подтверждены' },
            { value: 'CANCELLED', label: 'Отменены' },
            { value: 'COMPLETED', label: 'Завершены' },
          ]}
          className="w-40"
        />
        <Select
          value={role}
          onChange={(e) => updateFilter('role', e.target.value)}
          options={[
            { value: '', label: 'Все роли' },
            { value: 'STUDENT', label: 'Ученики' },
            { value: 'PARENT', label: 'Родители' },
            { value: 'SCHOOL', label: 'Школы' },
            { value: 'OTHER', label: 'Другое' },
          ]}
          className="w-40"
        />
        <Select
          value={type}
          onChange={(e) => updateFilter('type', e.target.value)}
          options={[
            { value: '', label: 'Все типы' },
            { value: 'TOUR', label: 'Туры' },
            { value: 'B2B', label: 'B2B' },
            { value: 'CONTACT', label: 'Контакты' },
          ]}
          className="w-40"
        />
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="mt-8 flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : applications.length > 0 ? (
        <div className="mt-6 space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{app.name}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                      <Badge variant="default">{getRoleLabel(app.role)}</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                      <a href={`tel:${app.phone}`} className="flex items-center gap-1 hover:text-blue-600">
                        <Phone className="h-4 w-4" />
                        {app.phone}
                      </a>
                      {app.email && (
                        <a href={`mailto:${app.email}`} className="flex items-center gap-1 hover:text-blue-600">
                          <Mail className="h-4 w-4" />
                          {app.email}
                        </a>
                      )}
                    </div>
                    {app.tour && (
                      <p className="mt-1 text-sm text-gray-600">
                        Тур: <span className="font-medium">{app.tour.title}</span>
                      </p>
                    )}
                    {app.message && (
                      <p className="mt-2 text-sm text-gray-600">
                        Сообщение: {app.message}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-gray-400">
                      {formatDate(app.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      options={[
                        { value: 'NEW', label: 'Новая' },
                        { value: 'CONTACTED', label: 'Связались' },
                        { value: 'CONFIRMED', label: 'Подтверждена' },
                        { value: 'CANCELLED', label: 'Отменена' },
                        { value: 'COMPLETED', label: 'Завершена' },
                      ]}
                      className="w-36"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600">
                Страница {page} из {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card className="mt-6">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">Заявок пока нет</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
