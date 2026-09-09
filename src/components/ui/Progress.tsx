import { cn } from '../../lib/cn'

export type Accent = 'brand' | 'purple' | 'green' | 'orange' | 'cyan' | 'red'

export const accentBar: Record<Accent, string> = {
  brand: 'bg-brand-600',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  cyan: 'bg-cyan-500',
  red: 'bg-red-500',
}

export const accentStroke: Record<Accent, string> = {
  brand: '#1747ff',
  purple: '#7655f5',
  green: '#20a86b',
  orange: '#f28a24',
  cyan: '#159bb3',
  red: '#e5484d',
}

export function ProgressBar({
  value,
  accent = 'brand',
  label,
  className,
}: {
  value: number
  accent?: Accent
  label?: string
  className?: string
}) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('w-full', className)}>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
        className="h-1.5 w-full overflow-hidden rounded-full bg-line"
      >
        <div
          className={cn('h-full rounded-full transition-all', accentBar[accent])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}

export function ProgressRing({
  value,
  size = 96,
  strokeWidth,
  accent = 'brand',
  caption,
  hideLabel = false,
  children,
}: {
  value: number
  size?: number
  strokeWidth?: number
  accent?: Accent
  caption?: string
  hideLabel?: boolean
  children?: React.ReactNode
}) {
  const clamped = Math.min(100, Math.max(0, value))
  const stroke = strokeWidth ?? (size >= 80 ? 8 : 6)
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${caption ?? 'Progress'}: ${clamped}%`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e6ecf9"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={accentStroke[accent]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      ) : !hideLabel ? (
        <span className="absolute font-display text-lg font-bold text-ink">
          {clamped}%
        </span>
      ) : null}
    </div>
  )
}
