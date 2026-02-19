import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      success: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      danger: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
