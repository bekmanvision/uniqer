'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button, Input, Select, Textarea, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { ArrowLeft, Plus, X } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export default function NewUniversityPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const t = useTranslations('admin.uniForm')
  const tc = useTranslations('common')

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
      <Link href="/admin/universities" className="mb-4 inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
        <ArrowLeft className="mr-1 h-4 w-4" />
        {t('backToUnis')}
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('newUni')}</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <Card>
          <CardHeader><CardTitle>{t('basicInfo')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input
              label={t('uniName')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t('uniNamePlaceholder')}
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={t('city')}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder={t('cityPlaceholder')}
                required
              />
              <Select
                label={t('type')}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                options={[
                  { value: 'STATE', label: t('stateType') },
                  { value: 'PRIVATE', label: t('privateType') },
                ]}
              />
            </div>
            <Textarea
              label={t('description')}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('descriptionPlaceholder')}
              required
            />
            <Input
              label={t('website')}
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder={t('websitePlaceholder')}
            />
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.grants}
                  onChange={(e) => setFormData({ ...formData, grants: e.target.checked })}
                  className="rounded border-gray-300 dark:border-gray-700"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{t('hasGrants')}</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.paid}
                  onChange={(e) => setFormData({ ...formData, paid: e.target.checked })}
                  className="rounded border-gray-300 dark:border-gray-700"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{t('paidEducation')}</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t('strongMajors')}</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addMajor}>
                <Plus className="mr-1 h-4 w-4" /> {t('addBtn')}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {formData.majors.map((major, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={t('majorPlaceholder')}
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
          <CardHeader><CardTitle>{t('media')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input
              label={t('logoUrl')}
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              placeholder={t('logoPlaceholder')}
            />
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('images')}</label>
                <Button type="button" variant="outline" size="sm" onClick={addImage}>
                  <Plus className="mr-1 h-4 w-4" /> {t('addBtn')}
                </Button>
              </div>
              <div className="space-y-2">
                {formData.images.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={t('imageUrlPlaceholder')}
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
            <Button type="button" variant="outline">{t('cancel')}</Button>
          </Link>
          <Button type="submit" loading={loading}>{t('create')}</Button>
        </div>
      </form>
    </div>
  )
}
