import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

export function formatDateRange(start: Date | string, end: Date | string): string {
  const startDate = new Date(start)
  const endDate = new Date(end)

  const startDay = startDate.getDate()
  const endDay = endDate.getDate()
  const month = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(endDate)
  const year = endDate.getFullYear()

  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDay}-${endDay} ${month} ${year}`
  }

  const startMonth = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(startDate)
  return `${startDay} ${startMonth} - ${endDay} ${month} ${year}`
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    OPEN: 'Набор открыт',
    CLOSED: 'Набор закрыт',
    CANCELLED: 'Отменён',
    NEW: 'Новая',
    CONTACTED: 'Связались',
    CONFIRMED: 'Подтверждена',
    COMPLETED: 'Завершена',
  }
  return labels[status] || status
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    OPEN: 'bg-green-100 text-green-800',
    CLOSED: 'bg-red-100 text-red-800',
    CANCELLED: 'bg-gray-100 text-gray-800',
    NEW: 'bg-blue-100 text-blue-800',
    CONTACTED: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    STUDENT: 'Ученик',
    PARENT: 'Родитель',
    SCHOOL: 'Школа',
    OTHER: 'Другое',
  }
  return labels[role] || role
}

export function getUniversityTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    STATE: 'Государственный',
    PRIVATE: 'Частный',
    AUTONOMOUS: 'Автономный',
    BRANCH: 'Филиал',
  }
  return labels[type] || type
}
