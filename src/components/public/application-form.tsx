'use client'

import { useState } from 'react'
import { Button, Input, Select, Textarea } from '@/components/ui'

interface ApplicationFormProps {
  tourId?: string
  tourTitle?: string
  type?: 'TOUR' | 'B2B' | 'CONTACT'
  compact?: boolean
  onSuccess?: () => void
}

const roleOptions = [
  { value: '', label: 'Выберите' },
  { value: 'PARENT', label: 'Родитель' },
  { value: 'STUDENT', label: 'Ученик' },
  { value: 'SCHOOL', label: 'Представитель школы' },
  { value: 'CAREER_COUNSELOR', label: 'Профориентатор' },
  { value: 'OTHER', label: 'Другое' },
]

// Астана, Алматы, Шымкент первыми, остальные в алфавитном порядке
const kazakhstanCities = [
  { value: '', label: 'Выберите город' },
  { value: 'astana', label: 'Астана' },
  { value: 'almaty', label: 'Алматы' },
  { value: 'shymkent', label: 'Шымкент' },
  // Остальные города по алфавиту
  { value: 'aktau', label: 'Актау' },
  { value: 'aktobe', label: 'Актобе' },
  { value: 'atyrau', label: 'Атырау' },
  { value: 'balkhash', label: 'Балхаш' },
  { value: 'zhanaozen', label: 'Жанаозен' },
  { value: 'zhezkazgan', label: 'Жезказган' },
  { value: 'karaganda', label: 'Караганда' },
  { value: 'kentau', label: 'Кентау' },
  { value: 'kokshetau', label: 'Кокшетау' },
  { value: 'kostanay', label: 'Костанай' },
  { value: 'kyzylorda', label: 'Кызылорда' },
  { value: 'pavlodar', label: 'Павлодар' },
  { value: 'petropavlovsk', label: 'Петропавловск' },
  { value: 'rudny', label: 'Рудный' },
  { value: 'satpayev', label: 'Сатпаев' },
  { value: 'semey', label: 'Семей' },
  { value: 'taldykorgan', label: 'Талдыкорган' },
  { value: 'taraz', label: 'Тараз' },
  { value: 'temirtau', label: 'Темиртау' },
  { value: 'turkestan', label: 'Туркестан' },
  { value: 'uralsk', label: 'Уральск' },
  { value: 'ust-kamenogorsk', label: 'Усть-Каменогорск' },
  { value: 'ekibastuz', label: 'Экибастуз' },
  { value: 'other', label: 'Другой город' },
]

const gradeOptions = [
  { value: '', label: 'Выберите класс' },
  { value: '8', label: '8 класс' },
  { value: '9', label: '9 класс' },
  { value: '10', label: '10 класс' },
  { value: '11', label: '11 класс' },
  { value: '12', label: '12 класс' },
]

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '')

  let formatted = '+7'

  if (digits.length > 1) {
    const phoneDigits = digits.startsWith('7') ? digits.slice(1) : digits.startsWith('8') ? digits.slice(1) : digits

    if (phoneDigits.length > 0) {
      formatted += ' (' + phoneDigits.slice(0, 3)
    }
    if (phoneDigits.length >= 3) {
      formatted += ') ' + phoneDigits.slice(3, 6)
    }
    if (phoneDigits.length >= 6) {
      formatted += '-' + phoneDigits.slice(6, 8)
    }
    if (phoneDigits.length >= 8) {
      formatted += '-' + phoneDigits.slice(8, 10)
    }
  }

  return formatted
}

export function ApplicationForm({ tourId, tourTitle, type = 'TOUR', compact = false, onSuccess }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    phone: '+7',
    city: '',
    otherCity: '',
    grade: '',
    role: '',
    otherRole: '',
    message: '',
  })

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    if (formatted.length <= 18) {
      setFormData({ ...formData, phone: formatted })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Определяем город для отправки
      const cityValue = formData.city === 'other' ? formData.otherCity : formData.city

      const submitData = {
        name: formData.name,
        phone: formData.phone,
        city: cityValue,
        grade: formData.grade,
        role: formData.role,
        otherRole: formData.role === 'OTHER' ? formData.otherRole : undefined,
        message: formData.message,
        tourId,
        type,
      }

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit')
      }

      setSuccess(true)
      setFormData({ name: '', phone: '+7', city: '', otherCity: '', grade: '', role: '', otherRole: '', message: '' })
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-5 w-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-green-800">Заявка отправлена!</h3>
        <p className="mt-1 text-sm text-green-700">
          Мы свяжемся с вами в течение 24 часов и отправим программу тура.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => setSuccess(false)}
        >
          Отправить ещё
        </Button>
      </div>
    )
  }

  const showMessage = formData.role === 'SCHOOL'
  const showOtherRoleInput = formData.role === 'OTHER'
  const showOtherCityInput = formData.city === 'other'

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-3' : 'space-y-4'}>
      {tourTitle && (
        <div className="rounded-lg bg-blue-50 p-3">
          <p className="text-sm text-blue-800">
            Заявка на тур: <strong>{tourTitle}</strong>
          </p>
        </div>
      )}

      <Input
        label="Имя"
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Ваше имя"
        required
      />

      <Input
        label="Телефон"
        id="phone"
        type="tel"
        value={formData.phone}
        onChange={handlePhoneChange}
        placeholder="+7 (___) ___-__-__"
        required
      />

      <Select
        label="Город"
        id="city"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value, otherCity: '' })}
        options={kazakhstanCities}
        required
      />

      {showOtherCityInput && (
        <Input
          label="Укажите Ваш город"
          id="otherCity"
          value={formData.otherCity}
          onChange={(e) => setFormData({ ...formData, otherCity: e.target.value })}
          placeholder="Название города"
          required
        />
      )}

      <Select
        label="Класс"
        id="grade"
        value={formData.grade}
        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
        options={gradeOptions}
        required
      />

      <Select
        label="Кто Вы?"
        id="role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value, otherRole: '' })}
        options={roleOptions}
        required
      />

      {showOtherRoleInput && (
        <Input
          label="Укажите кто Вы"
          id="otherRole"
          value={formData.otherRole}
          onChange={(e) => setFormData({ ...formData, otherRole: e.target.value })}
          placeholder="Напишите..."
        />
      )}

      {showMessage && (
        <Textarea
          label="Сообщение"
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Укажите школу, класс и количество учеников..."
          rows={3}
        />
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <Button type="submit" className="w-full" loading={loading}>
        {type === 'TOUR' ? 'Записаться на тур' : 'Отправить заявку'}
      </Button>

      <p className="text-center text-xs text-gray-500">
        Мы свяжемся с вами в течение 24 часов и отправим программу тура
      </p>
    </form>
  )
}
