'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button, Input, Select, Textarea } from '@/components/ui'

interface ApplicationFormProps {
  tourId?: string
  tourTitle?: string
  type?: 'TOUR' | 'B2B' | 'CONTACT'
  compact?: boolean
  onSuccess?: () => void
}

const cityKeys = [
  '', 'astana', 'almaty', 'shymkent',
  'aktau', 'aktobe', 'atyrau', 'balkhash',
  'zhanaozen', 'zhezkazgan', 'karaganda', 'kentau',
  'kokshetau', 'kostanay', 'kyzylorda', 'pavlodar',
  'petropavlovsk', 'rudny', 'satpayev', 'semey',
  'taldykorgan', 'taraz', 'temirtau', 'turkestan',
  'uralsk', 'ustKamenogorsk', 'ekibastuz', 'other',
] as const

const cityValues: Record<string, string> = {
  '': '',
  'astana': 'astana',
  'almaty': 'almaty',
  'shymkent': 'shymkent',
  'aktau': 'aktau',
  'aktobe': 'aktobe',
  'atyrau': 'atyrau',
  'balkhash': 'balkhash',
  'zhanaozen': 'zhanaozen',
  'zhezkazgan': 'zhezkazgan',
  'karaganda': 'karaganda',
  'kentau': 'kentau',
  'kokshetau': 'kokshetau',
  'kostanay': 'kostanay',
  'kyzylorda': 'kyzylorda',
  'pavlodar': 'pavlodar',
  'petropavlovsk': 'petropavlovsk',
  'rudny': 'rudny',
  'satpayev': 'satpayev',
  'semey': 'semey',
  'taldykorgan': 'taldykorgan',
  'taraz': 'taraz',
  'temirtau': 'temirtau',
  'turkestan': 'turkestan',
  'uralsk': 'uralsk',
  'ustKamenogorsk': 'ust-kamenogorsk',
  'ekibastuz': 'ekibastuz',
  'other': 'other',
}

const roleKeys = ['', 'PARENT', 'STUDENT', 'SCHOOL', 'CAREER_COUNSELOR', 'OTHER'] as const

const gradeKeys = ['', '8', '9', '10', '11', '12'] as const

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
  const t = useTranslations('form')
  const tr = useTranslations('roles')
  const tcities = useTranslations('cities')
  const tg = useTranslations('grades')

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

  const roleOptions = roleKeys.map((key) => ({
    value: key,
    label: key === '' ? t('selectRole') : tr(key),
  }))

  const cityOptions = cityKeys.map((key) => ({
    value: cityValues[key],
    label: key === '' ? t('selectCity') : key === 'other' ? t('otherCity') : tcities(key),
  }))

  const gradeOptions = gradeKeys.map((key) => ({
    value: key,
    label: key === '' ? t('selectGrade') : tg(key),
  }))

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
      setError(err instanceof Error ? err.message : t('errorOccurred'))
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/30">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/50">
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
        <h3 className="text-base font-semibold text-green-800 dark:text-green-300">{t('requestSent')}</h3>
        <p className="mt-1 text-sm text-green-700 dark:text-green-400">
          {t('requestSentMessage')}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={() => setSuccess(false)}
        >
          {t('sendAnother')}
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
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            {t('applicationForTour')} <strong>{tourTitle}</strong>
          </p>
        </div>
      )}

      <Input
        label={t('name')}
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder={t('namePlaceholder')}
        required
      />

      <Input
        label={t('phone')}
        id="phone"
        type="tel"
        value={formData.phone}
        onChange={handlePhoneChange}
        placeholder={t('phonePlaceholder')}
        required
      />

      <Select
        label={t('city')}
        id="city"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value, otherCity: '' })}
        options={cityOptions}
        required
      />

      {showOtherCityInput && (
        <Input
          label={t('specifyCity')}
          id="otherCity"
          value={formData.otherCity}
          onChange={(e) => setFormData({ ...formData, otherCity: e.target.value })}
          placeholder={t('cityNamePlaceholder')}
          required
        />
      )}

      <Select
        label={t('grade')}
        id="grade"
        value={formData.grade}
        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
        options={gradeOptions}
        required
      />

      <Select
        label={t('role')}
        id="role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value, otherRole: '' })}
        options={roleOptions}
        required
      />

      {showOtherRoleInput && (
        <Input
          label={t('specifyRole')}
          id="otherRole"
          value={formData.otherRole}
          onChange={(e) => setFormData({ ...formData, otherRole: e.target.value })}
          placeholder={t('writePlaceholder')}
        />
      )}

      {showMessage && (
        <Textarea
          label={t('message')}
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={t('messagePlaceholder')}
          rows={3}
        />
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      <Button type="submit" className="w-full" loading={loading}>
        {type === 'TOUR' ? t('signUpForTour') : t('sendRequest')}
      </Button>

      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        {t('contactNote')}
      </p>
    </form>
  )
}
