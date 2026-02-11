'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Select, Textarea, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'
import type { University } from '@/types'

export default function NewTourPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])

  const [formData, setFormData] = useState({
    title: '',
    city: '',
    startDate: '',
    endDate: '',
    price: '',
    seats: '',
    grade: '9-11',
    status: 'OPEN',
    description: '',
    includes: [''],
    images: [''],
    featured: false,
    universityIds: [] as string[],
    program: [{ day: 1, title: '', activities: [''] }],
  })

  useEffect(() => {
    fetch('/api/universities')
      .then(res => res.json())
      .then(data => {
        if (data.success) setUniversities(data.data)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price),
          seats: parseInt(formData.seats),
          includes: formData.includes.filter(Boolean),
          images: formData.images.filter(Boolean),
          program: formData.program.map(p => ({
            ...p,
            activities: p.activities.filter(Boolean)
          })),
        }),
      })

      if (res.ok) {
        router.push('/admin/tours')
      }
    } catch (error) {
      console.error('Error creating tour:', error)
    } finally {
      setLoading(false)
    }
  }

  const addInclude = () => setFormData({ ...formData, includes: [...formData.includes, ''] })
  const removeInclude = (index: number) => setFormData({
    ...formData,
    includes: formData.includes.filter((_, i) => i !== index)
  })
  const updateInclude = (index: number, value: string) => {
    const newIncludes = [...formData.includes]
    newIncludes[index] = value
    setFormData({ ...formData, includes: newIncludes })
  }

  const addImage = () => setFormData({ ...formData, images: [...formData.images, ''] })
  const removeImage = (index: number) => setFormData({
    ...formData,
    images: formData.images.filter((_, i) => i !== index)
  })
  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({ ...formData, images: newImages })
  }

  const addDay = () => setFormData({
    ...formData,
    program: [...formData.program, { day: formData.program.length + 1, title: '', activities: [''] }]
  })
  const removeDay = (index: number) => setFormData({
    ...formData,
    program: formData.program.filter((_, i) => i !== index).map((p, i) => ({ ...p, day: i + 1 }))
  })
  const updateDay = (index: number, field: string, value: string) => {
    const newProgram = [...formData.program]
    newProgram[index] = { ...newProgram[index], [field]: value }
    setFormData({ ...formData, program: newProgram })
  }
  const addActivity = (dayIndex: number) => {
    const newProgram = [...formData.program]
    newProgram[dayIndex].activities.push('')
    setFormData({ ...formData, program: newProgram })
  }
  const updateActivity = (dayIndex: number, actIndex: number, value: string) => {
    const newProgram = [...formData.program]
    newProgram[dayIndex].activities[actIndex] = value
    setFormData({ ...formData, program: newProgram })
  }
  const removeActivity = (dayIndex: number, actIndex: number) => {
    const newProgram = [...formData.program]
    newProgram[dayIndex].activities = newProgram[dayIndex].activities.filter((_, i) => i !== actIndex)
    setFormData({ ...formData, program: newProgram })
  }

  return (
    <div>
      <Link href="/admin/tours" className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-blue-600">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Назад к турам
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">Новый тур</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <Card>
          <CardHeader><CardTitle>Основная информация</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Название тура *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Кампус-тур по Алматы"
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Город *"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Алматы"
                required
              />
              <Select
                label="Для классов *"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                options={[
                  { value: '9-11', label: '9-11 класс' },
                  { value: '10-11', label: '10-11 класс' },
                  { value: '11', label: '11 класс' },
                ]}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Дата начала *"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
              <Input
                label="Дата окончания *"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Input
                label="Цена (KZT) *"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="150000"
                required
              />
              <Input
                label="Кол-во мест *"
                type="number"
                value={formData.seats}
                onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                placeholder="30"
                required
              />
              <Select
                label="Статус"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                options={[
                  { value: 'OPEN', label: 'Набор открыт' },
                  { value: 'CLOSED', label: 'Набор закрыт' },
                  { value: 'CANCELLED', label: 'Отменён' },
                ]}
              />
            </div>
            <Textarea
              label="Описание *"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Описание тура..."
              required
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Популярный тур (показывать на главной)</span>
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Университеты</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {universities.map((uni) => (
                <label key={uni.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.universityIds.includes(uni.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, universityIds: [...formData.universityIds, uni.id] })
                      } else {
                        setFormData({ ...formData, universityIds: formData.universityIds.filter(id => id !== uni.id) })
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{uni.name} ({uni.city})</span>
                </label>
              ))}
              {universities.length === 0 && (
                <p className="text-sm text-gray-500">Сначала добавьте университеты</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Программа по дням</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addDay}>
                <Plus className="mr-1 h-4 w-4" /> День
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.program.map((day, dayIndex) => (
              <div key={dayIndex} className="rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-medium">День {day.day}</h4>
                  {formData.program.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeDay(dayIndex)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Input
                  placeholder="Название дня (например: Знакомство с вузами)"
                  value={day.title}
                  onChange={(e) => updateDay(dayIndex, 'title', e.target.value)}
                  className="mb-3"
                />
                <div className="space-y-2">
                  {day.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex gap-2">
                      <Input
                        placeholder="Активность"
                        value={activity}
                        onChange={(e) => updateActivity(dayIndex, actIndex, e.target.value)}
                      />
                      {day.activities.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeActivity(dayIndex, actIndex)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="ghost" size="sm" onClick={() => addActivity(dayIndex)}>
                    <Plus className="mr-1 h-4 w-4" /> Активность
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Что входит в стоимость</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addInclude}>
                <Plus className="mr-1 h-4 w-4" /> Добавить
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {formData.includes.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Проживание в отеле 3*"
                  value={item}
                  onChange={(e) => updateInclude(index, e.target.value)}
                />
                {formData.includes.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeInclude(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Изображения</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addImage}>
                <Plus className="mr-1 h-4 w-4" /> Добавить
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {formData.images.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="URL изображения"
                  value={url}
                  onChange={(e) => updateImage(index, e.target.value)}
                />
                {formData.images.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeImage(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/tours">
            <Button type="button" variant="outline">Отмена</Button>
          </Link>
          <Button type="submit" loading={loading}>Создать тур</Button>
        </div>
      </form>
    </div>
  )
}
