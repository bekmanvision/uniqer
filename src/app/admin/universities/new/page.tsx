'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Select, Textarea, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'

export default function NewUniversityPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    type: 'STATE',
    description: '',
    majors: [''],
    grants: true,
    paid: true,
    logo: '',
    images: [''],
    website: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          majors: formData.majors.filter(Boolean),
          images: formData.images.filter(Boolean),
        }),
      })

      if (res.ok) {
        router.push('/admin/universities')
      }
    } catch (error) {
      console.error('Error creating university:', error)
    } finally {
      setLoading(false)
    }
  }

  const addMajor = () => setFormData({ ...formData, majors: [...formData.majors, ''] })
  const removeMajor = (index: number) => setFormData({
    ...formData,
    majors: formData.majors.filter((_, i) => i !== index)
  })
  const updateMajor = (index: number, value: string) => {
    const newMajors = [...formData.majors]
    newMajors[index] = value
    setFormData({ ...formData, majors: newMajors })
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

  return (
    <div>
      <Link href="/admin/universities" className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-blue-600">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Назад к университетам
      </Link>

      <h1 className="text-2xl font-bold text-gray-900">Новый университет</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <Card>
          <CardHeader><CardTitle>Основная информация</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Название университета *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Казахский национальный университет им. аль-Фараби"
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
                label="Тип *"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                options={[
                  { value: 'STATE', label: 'Государственный' },
                  { value: 'PRIVATE', label: 'Частный' },
                ]}
              />
            </div>
            <Textarea
              label="Описание *"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Описание университета..."
              required
            />
            <Input
              label="Сайт"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://example.edu.kz"
            />
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.grants}
                  onChange={(e) => setFormData({ ...formData, grants: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Есть гранты</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.paid}
                  onChange={(e) => setFormData({ ...formData, paid: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Платное обучение</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Сильные направления</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addMajor}>
                <Plus className="mr-1 h-4 w-4" /> Добавить
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {formData.majors.map((major, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="IT, Медицина, Экономика..."
                  value={major}
                  onChange={(e) => updateMajor(index, e.target.value)}
                />
                {formData.majors.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeMajor(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Медиа</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Логотип (URL)"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              placeholder="https://example.com/logo.png"
            />
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Изображения</label>
                <Button type="button" variant="outline" size="sm" onClick={addImage}>
                  <Plus className="mr-1 h-4 w-4" /> Добавить
                </Button>
              </div>
              <div className="space-y-2">
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
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/universities">
            <Button type="button" variant="outline">Отмена</Button>
          </Link>
          <Button type="submit" loading={loading}>Создать</Button>
        </div>
      </form>
    </div>
  )
}
