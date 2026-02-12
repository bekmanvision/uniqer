import { Globe, MapPin, Home, Languages, Banknote, Trophy } from 'lucide-react'
import { Badge } from '@/components/ui'
import type { InternationalUniversity } from '@prisma/client'

interface InternationalUniversityCardProps {
  university: InternationalUniversity
}

export function InternationalUniversityCard({ university }: InternationalUniversityCardProps) {
  const hasPrice = university.tuitionMin && university.tuitionMin > 0

  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-lg hover:border-blue-100">
      {/* Header with icon and badges */}
      <div className="p-5 pb-0">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
            <Globe className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <Badge variant="info" className="text-xs">
                {university.country}
              </Badge>
              {university.worldRanking && (
                <Badge variant="warning" className="text-xs">
                  {university.worldRanking}
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {university.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
          <MapPin className="h-4 w-4" />
          {university.city}
        </div>

        {/* Quick info */}
        <div className="flex flex-wrap gap-2 mb-4">
          {university.hasDormitory && (
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs text-purple-700">
              <Home className="h-3 w-3" />
              Общежитие
            </span>
          )}
          {university.language && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs text-blue-700">
              <Languages className="h-3 w-3" />
              {university.language}
            </span>
          )}
        </div>

        {/* Top Majors */}
        {university.topMajors.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {university.topMajors.slice(0, 3).map((major) => (
              <span
                key={major}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
              >
                {major}
              </span>
            ))}
            {university.topMajors.length > 3 && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-500">
                +{university.topMajors.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            {hasPrice ? (
              <div className="flex items-center gap-1.5 text-sm">
                <Banknote className="h-4 w-4 text-gray-400" />
                <span className="font-semibold text-gray-900">
                  ${university.tuitionMin!.toLocaleString('en-US')}
                </span>
                {university.tuitionMax && university.tuitionMax !== university.tuitionMin && (
                  <>
                    <span className="text-gray-500">—</span>
                    <span className="font-semibold text-gray-900">
                      ${university.tuitionMax.toLocaleString('en-US')}
                    </span>
                  </>
                )}
                <span className="text-gray-500">/ год</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Уточняйте стоимость</span>
            )}
            {university.founded && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <Trophy className="h-3 w-3" />
                с {university.founded} г.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
