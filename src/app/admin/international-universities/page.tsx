'use client'

import { useState, useEffect } from 'react'
import { Button, Card, CardContent, Input, Select } from '@/components/ui'
import { Plus, Edit, Trash2, Globe } from 'lucide-react'

interface InternationalUniversity {
  id: string
  name: string
  country: string
  city: string
  worldRanking: string | null
  logo: string | null
  topMajors: string[]
  hasDormitory: boolean
  tuitionMin: number | null
  tuitionMax: number | null
  website: string | null
  createdAt: string
}

export default function InternationalUniversitiesPage() {
  const [universities, setUniversities] = useState<InternationalUniversity[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedUniversity, setSelectedUniversity] = useState<InternationalUniversity | null>(null)
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    fetchUniversities()
  }, [countryFilter])

  const fetchUniversities = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (countryFilter) params.set('country', countryFilter)

      const res = await fetch(`/api/international-universities?${params}`)
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
    if (!confirm('Удалить университет?')) return

    try {
      const res = await fetch(`/api/international-universities/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setUniversities(universities.filter(u => u.id !== id))
      }
    } catch (error) {
      console.error('Error deleting university:', error)
    }
  }

  const openEditModal = (university: InternationalUniversity) => {
    setSelectedUniversity(university)
    setShowModal(true)
  }

  const openCreateModal = () => {
    setSelectedUniversity(null)
    setShowModal(true)
  }

  // Unique countries for filter
  const countries = Array.from(new Set(universities.map(u => u.country)))

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Зарубежные университеты</h1>
          <p className="text-sm text-gray-600">Всего: {universities.length} вузов</p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            options={[
              { value: '', label: 'Все страны' },
              ...countries.map(c => ({ value: c, label: c }))
            ]}
            className="w-40"
          />
          <Button onClick={openCreateModal}>
            <Plus className="mr-2 h-4 w-4" />
            Добавить вуз
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {universities.map((university) => (
            <Card key={university.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{university.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {university.city}, {university.country}
                    </p>
                  </div>
                  {university.logo && (
                    <img
                      src={university.logo}
                      alt={university.name}
                      className="h-12 w-12 object-contain"
                    />
                  )}
                </div>

                {university.worldRanking && (
                  <div className="mb-2">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      Рейтинг: {university.worldRanking}
                    </span>
                  </div>
                )}

                {university.topMajors.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-500 mb-1">Топ специальности:</p>
                    <div className="flex flex-wrap gap-1">
                      {university.topMajors.slice(0, 3).map((major, idx) => (
                        <span key={idx} className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                          {major}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {university.tuitionMin && university.tuitionMax && (
                  <p className="text-sm text-gray-600 mb-2">
                    ${university.tuitionMin.toLocaleString()} - ${university.tuitionMax.toLocaleString()} / год
                  </p>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    {university.website && (
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(university)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteUniversity(university.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <UniversityModal
          university={selectedUniversity}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false)
            fetchUniversities()
          }}
        />
      )}
    </div>
  )
}

function UniversityModal({
  university,
  onClose,
  onSuccess,
}: {
  university: InternationalUniversity | null
  onClose: () => void
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: university?.name || '',
    country: university?.country || '',
    city: university?.city || '',
    worldRanking: university?.worldRanking || '',
    logo: university?.logo || '',
    topMajors: university?.topMajors.join(', ') || '',
    allMajors: '',
    hasDormitory: university?.hasDormitory || false,
    tuitionMin: university?.tuitionMin || '',
    tuitionMax: university?.tuitionMax || '',
    tuitionNote: '',
    description: '',
    website: university?.website || '',
    founded: '',
    studentCount: '',
    internationalStudents: '',
    language: '',
    features: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = {
        ...formData,
        topMajors: formData.topMajors.split(',').map(m => m.trim()).filter(Boolean),
        allMajors: formData.allMajors.split(',').map(m => m.trim()).filter(Boolean),
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        tuitionMin: formData.tuitionMin ? parseInt(String(formData.tuitionMin)) : null,
        tuitionMax: formData.tuitionMax ? parseInt(String(formData.tuitionMax)) : null,
        founded: formData.founded ? parseInt(String(formData.founded)) : null,
        studentCount: formData.studentCount ? parseInt(String(formData.studentCount)) : null,
        internationalStudents: formData.internationalStudents ? parseInt(String(formData.internationalStudents)) : null,
      }

      const url = university
        ? `/api/international-universities/${university.id}`
        : '/api/international-universities'

      const res = await fetch(url, {
        method: university ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (res.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error saving university:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {university ? 'Редактировать вуз' : 'Новый вуз'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Название *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Страна *"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              required
            />
            <Input
              label="Город *"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <Input
              label="Мировой рейтинг"
              value={formData.worldRanking}
              onChange={(e) => setFormData({ ...formData, worldRanking: e.target.value })}
              placeholder="QS #150, Times #200"
            />
            <Input
              label="URL логотипа"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            />
            <Input
              label="Официальный сайт"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://university.edu"
            />
          </div>

          <Input
            label="Топовые специальности (через запятую)"
            value={formData.topMajors}
            onChange={(e) => setFormData({ ...formData, topMajors: e.target.value })}
            placeholder="Computer Science, Business, Medicine"
          />

          <Input
            label="Все специальности (через запятую)"
            value={formData.allMajors}
            onChange={(e) => setFormData({ ...formData, allMajors: e.target.value })}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <Input
              label="Мин. стоимость ($)"
              type="number"
              value={formData.tuitionMin}
              onChange={(e) => setFormData({ ...formData, tuitionMin: e.target.value })}
            />
            <Input
              label="Макс. стоимость ($)"
              type="number"
              value={formData.tuitionMax}
              onChange={(e) => setFormData({ ...formData, tuitionMax: e.target.value })}
            />
            <Input
              label="Год основания"
              type="number"
              value={formData.founded}
              onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hasDormitory"
              checked={formData.hasDormitory}
              onChange={(e) => setFormData({ ...formData, hasDormitory: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="hasDormitory" className="text-sm text-gray-700">
              Есть общежитие
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="ghost" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" loading={loading}>
              {university ? 'Сохранить' : 'Добавить'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
