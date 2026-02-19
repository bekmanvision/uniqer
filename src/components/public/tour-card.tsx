import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { MapPin, Calendar, Users, GraduationCap, Target, MessageCircle, Clock } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import { formatPrice, formatDateRange } from '@/lib/utils'
import { useTranslations, useLocale } from 'next-intl'
import type { Tour } from '@/types'

interface TourCardProps {
  tour: Tour
}

function formatGradeRange(grade: string): string {
  // Extract all individual grade numbers from strings like "10,10-11,11,12,8,9"
  const numbers = new Set<number>()
  for (const part of grade.split(',')) {
    const trimmed = part.trim()
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map(Number)
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) numbers.add(i)
      }
    } else {
      const n = Number(trimmed)
      if (!isNaN(n)) numbers.add(n)
    }
  }
  if (numbers.size === 0) return grade
  const sorted = [...numbers].sort((a, b) => a - b)
  if (sorted.length === 1) return String(sorted[0])
  return `${sorted[0]}-${sorted[sorted.length - 1]}`
}

export function TourCard({ tour }: TourCardProps) {
  const t = useTranslations('tours')
  const tc = useTranslations('common')
  const ts = useTranslations('statuses')
  const locale = useLocale()

  const isOpen = tour.status === 'OPEN'
  const statusVariant =
    isOpen ? 'success' : tour.status === 'CLOSED' ? 'danger' : 'default'

  const seatsLeftPercent = (tour.seatsLeft / tour.seats) * 100
  const isLowSeats = seatsLeftPercent <= 30

  return (
    <div className={`group flex flex-col overflow-hidden rounded-xl border transition-all ${
      isOpen
        ? 'border-gray-200 bg-white shadow-sm hover:shadow-xl dark:border-gray-700 dark:bg-gray-900'
        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50'
    }`}>
      {/* Image */}
      <div className={`relative aspect-[16/10] overflow-hidden ${
        isOpen
          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700'
          : 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800'
      }`}>
        {tour.images[0] ? (
          <Image
            src={tour.images[0]}
            alt={tour.title}
            fill
            className={`object-cover ${isOpen ? 'transition-transform group-hover:scale-105' : 'grayscale opacity-60'}`}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <GraduationCap className="h-16 w-16 text-white/30" />
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge variant={statusVariant}>{ts(tour.status)}</Badge>
        </div>
        {isOpen && isLowSeats && (
          <div className="absolute right-3 top-3">
            <Badge variant="warning" className="animate-pulse">
              {tc('seatsLeft', { count: tour.seatsLeft })}
            </Badge>
          </div>
        )}
        {tour.featured && !isLowSeats && isOpen && (
          <div className="absolute right-3 top-3">
            <Badge variant="info">{tc('popular')}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col p-5 ${!isOpen ? 'opacity-60' : ''}`}>
        <h3 className={`text-lg font-semibold ${isOpen ? 'text-gray-900 group-hover:text-blue-600 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
          {tour.title}
        </h3>

        {/* Tour value proposition */}
        <div className="mt-2 rounded-lg bg-blue-50 px-3 py-2 dark:bg-blue-900/30">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
            {t('valueProposition')}
          </p>
        </div>

        {/* Benefit icons */}
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <GraduationCap className="h-3 w-3" />
            <span>{t('uniCount')}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <Target className="h-3 w-3" />
            <span>{t('proforientation')}</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <MessageCircle className="h-3 w-3" />
            <span>{t('meetings')}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
            {tour.city}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
            {formatDateRange(tour.startDate, tour.endDate, locale)}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
            {tc('grade', { grade: formatGradeRange(tour.grade) })}
          </div>
          <div className={`flex items-center gap-2 text-sm ${isOpen && isLowSeats ? 'text-orange-600 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
            <Users className="h-4 w-4 shrink-0" />
            {isOpen && isLowSeats
              ? tc('seatsLeft', { count: tour.seatsLeft })
              : tc('seatsOf', { left: tour.seatsLeft, total: tour.seats })}
          </div>
        </div>

        {/* Footer — pushed to bottom */}
        <div className="mt-auto flex items-center justify-between border-t dark:border-gray-700 pt-4 mt-4">
          <div className="shrink-0">
            <span className={`text-2xl font-bold ${isOpen ? 'text-blue-600' : 'text-gray-400 dark:text-gray-500 line-through'}`}>
              {formatPrice(tour.price, locale)}
            </span>
          </div>
          {isOpen ? (
            <div className="flex shrink-0 gap-2">
              <Link href={`/tours/${tour.slug}`}>
                <Button size="sm" variant="outline">
                  {tc('learnMore')}
                </Button>
              </Link>
              <Link href={`/tours/${tour.slug}#apply`}>
                <Button size="sm">
                  {t('signUp')}
                </Button>
              </Link>
            </div>
          ) : (
            <Badge variant="danger">{ts(tour.status)}</Badge>
          )}
        </div>
      </div>
    </div>
  )
}
