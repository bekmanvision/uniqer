'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import { getUniversityTypeLabel } from '@/lib/utils'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import type { University } from '@/types'

export default function AdminUniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(true)

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
    if (!confirm('Вы уверены, что хотите удалить этот университет?')) return

    try {
      const res = await fetch(`/api/universities/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setUniversities(universities.filter((u) => u.id !== id))
      }
    } catch (error) {
      console.error('Error deleting university:', error)
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
          <h1 className="text-2xl font-bold text-gray-900">Университеты</h1>
          <p className="mt-1 text-gray-600">Управление каталогом университетов</p>
        </div>
        <Link href="/admin/universities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить университет
          </Button>
        </Link>
      </div>

      {universities.length > 0 ? (
        <div className="mt-6 space-y-4">
          {universities.map((university) => (
            <Card key={university.id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{university.name}</h3>
                      <Badge variant={university.type === 'STATE' ? 'info' : 'default'}>
                        {getUniversityTypeLabel(university.type)}
                      </Badge>
                      {university.grants && <Badge variant="success">Гранты</Badge>}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
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
            <p className="text-gray-500">Университеты пока не добавлены</p>
            <Link href="/admin/universities/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Добавить первый университет
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
