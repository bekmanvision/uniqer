import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, Users, GraduationCap, Target, MessageCircle, Clock } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import { formatPrice, formatDateRange, getStatusLabel } from '@/lib/utils'
import type { Tour } from '@/types'

interface TourCardProps {
  tour: Tour
}

export function TourCard({ tour }: TourCardProps) {
  const statusVariant =
    tour.status === 'OPEN' ? 'success' : tour.status === 'CLOSED' ? 'danger' : 'default'

  const seatsLeftPercent = (tour.seatsLeft / tour.seats) * 100
  const isLowSeats = seatsLeftPercent <= 30

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        {tour.images[0] ? (
          <Image
            src={tour.images[0]}
            alt={tour.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <GraduationCap className="h-12 w-12 text-gray-300" />
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge variant={statusVariant}>{getStatusLabel(tour.status)}</Badge>
        </div>
        {/* Триггер "Осталось X мест" */}
        {tour.status === 'OPEN' && isLowSeats && (
          <div className="absolute right-3 top-3">
            <Badge variant="warning" className="animate-pulse">
              Осталось {tour.seatsLeft} мест!
            </Badge>
          </div>
        )}
        {tour.featured && !isLowSeats && (
          <div className="absolute right-3 top-3">
            <Badge variant="info">Популярный</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
          {tour.title}
        </h3>

        {/* Ценность тура */}
        <div className="mt-2 rounded-lg bg-blue-50 px-3 py-2">
          <p className="text-sm font-medium text-blue-700">
            4–5 университетов + профориентация + план поступления
          </p>
        </div>

        {/* Иконки преимуществ */}
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
            <GraduationCap className="h-3 w-3" />
            <span>4-5 вузов</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
            <Target className="h-3 w-3" />
            <span>Профориентация</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
            <MessageCircle className="h-3 w-3" />
            <span>Встречи</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            {tour.city}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            {formatDateRange(tour.startDate, tour.endDate)}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            {tour.grade} класс
          </div>
          <div className={`flex items-center gap-2 text-sm ${isLowSeats ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>
            <Users className="h-4 w-4" />
            {isLowSeats ? `Осталось ${tour.seatsLeft} мест!` : `${tour.seatsLeft} мест из ${tour.seats}`}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">{formatPrice(tour.price)}</span>
          </div>
          <div className="flex gap-2">
            <Link href={`/tours/${tour.slug}`}>
              <Button size="sm" variant="outline" disabled={tour.status !== 'OPEN'}>
                Подробнее
              </Button>
            </Link>
            <Link href={`/tours/${tour.slug}#apply`}>
              <Button size="sm" disabled={tour.status !== 'OPEN'}>
                {tour.status === 'OPEN' ? 'Записаться' : 'Закрыт'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
