'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import { formatPrice, formatDateRange, getStatusLabel, getStatusColor } from '@/lib/utils'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import type { Tour } from '@/types'

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      const res = await fetch('/api/tours')
      const data = await res.json()
      if (data.success) {
        setTours(data.data)
      }
    } catch (error) {
      console.error('Error fetching tours:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteTour = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот тур?')) return

    try {
      const res = await fetch(`/api/tours/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setTours(tours.filter((t) => t.id !== id))
      }
    } catch (error) {
      console.error('Error deleting tour:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Туры</h1>
          <p className="mt-1 text-gray-600">Управление кампус-турами</p>
        </div>
        <Link href="/admin/tours/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить тур
          </Button>
        </Link>
      </div>

      {tours.length > 0 ? (
        <div className="mt-6 space-y-4">
          {tours.map((tour) => (
            <Card key={tour.id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{tour.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(tour.status)}`}>
                        {getStatusLabel(tour.status)}
                      </span>
                      {tour.featured && (
                        <Badge variant="info">Популярный</Badge>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>{tour.city}</span>
                      <span>{formatDateRange(tour.startDate, tour.endDate)}</span>
                      <span>{tour.seatsLeft}/{tour.seats} мест</span>
                      <span className="font-medium text-blue-600">{formatPrice(tour.price)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/tours/${tour.slug}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/tours/${tour.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTour(tour.id)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mt-6">
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">Туры пока не добавлены</p>
            <Link href="/admin/tours/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Добавить первый тур
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
