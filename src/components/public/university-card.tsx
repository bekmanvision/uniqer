import { Link } from '@/i18n/navigation'
import { MapPin, Building2, Award, Home, Shield, Banknote } from 'lucide-react'
import { Badge } from '@/components/ui'
import { formatPrice } from '@/lib/utils'
import { useTranslations, useLocale } from 'next-intl'
import type { University } from '@/types'

interface UniversityCardProps {
  university: University & {
    hasMilitary?: boolean
    hasDormitory?: boolean
    tuitionMin?: number | null
    tuitionMax?: number | null
  }
}

export function UniversityCard({ university }: UniversityCardProps) {
  const t = useTranslations('common')
  const tu = useTranslations('universityTypes')
  const locale = useLocale()

  const hasPrice = university.tuitionMin && university.tuitionMin > 0

  return (
    <Link href={`/universities/${university.slug}`}>
      <div className="group h-full overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-lg hover:border-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-800">
        {/* Header with icon and badges */}
        <div className="p-5 pb-0">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                <Badge
                  variant={
                    university.type === 'STATE' ? 'info' :
                    university.type === 'AUTONOMOUS' ? 'warning' :
                    university.type === 'BRANCH' ? 'info' : 'default'
                  }
                  className="text-xs"
                >
                  {tu(university.type)}
                </Badge>
                {university.grants && (
                  <Badge variant="success" className="text-xs">
                    {t('grants')}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-gray-100">
                {university.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <MapPin className="h-4 w-4" />
            {university.city}
          </div>

          {/* Quick info */}
          <div className="flex flex-wrap gap-2 mb-4">
            {university.hasDormitory && (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                <Home className="h-3 w-3" />
                {t('dormitory')}
              </span>
            )}
            {university.hasMilitary && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-300">
                <Shield className="h-3 w-3" />
                {t('militaryDept')}
              </span>
            )}
          </div>

          {/* Majors */}
          {university.majors.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {university.majors.slice(0, 3).map((major) => (
                <span
                  key={major}
                  className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  {major}
                </span>
              ))}
              {university.majors.length > 3 && (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-500">
                  +{university.majors.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Price with grant info */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {hasPrice ? (
                <div className="flex items-center gap-1.5 text-sm">
                  <Banknote className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">{t('from')}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatPrice(university.tuitionMin!, locale)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{t('perYear')}</span>
                </div>
              ) : (
                <span className="text-sm text-gray-500">{t('askPrice')}</span>
              )}
              {university.grants ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  <Award className="h-3 w-3" />
                  {t('hasGrants')}
                </span>
              ) : (
                <span className="text-xs text-gray-400">{t('noGrants')}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
