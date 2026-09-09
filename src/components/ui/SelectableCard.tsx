import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../lib/cn'

export function SelectableCard({
  selected,
  onSelect,
  icon,
  title,
  description,
  meta,
  className,
  disabled,
}: {
  selected: boolean
  onSelect: () => void
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  meta?: ReactNode
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        'relative flex h-full w-full flex-col items-start gap-2 rounded-card border bg-surface p-4 text-left transition-colors',
        selected
          ? 'border-brand-600 bg-brand-100/40'
          : 'border-line hover:border-brand-500/60 hover:bg-surface-subtle',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      {selected ? (
        <span className="absolute right-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
          <Check size={12} strokeWidth={3} />
        </span>
      ) : null}
      {icon}
      <span
        className={cn(
          'font-display text-sm font-semibold',
          selected ? 'text-brand-600' : 'text-ink',
        )}
      >
        {title}
      </span>
      {description ? (
        <span className="text-xs leading-relaxed text-ink-muted">
          {description}
        </span>
      ) : null}
      {meta}
    </button>
  )
}

export function IconTile({
  children,
  tone = 'brand',
  className,
}: {
  children: ReactNode
  tone?: 'brand' | 'purple' | 'green' | 'orange' | 'cyan' | 'red'
  className?: string
}) {
  const tones = {
    brand: 'bg-brand-100 text-brand-600',
    purple: 'bg-purple-100 text-purple-500',
    green: 'bg-green-100 text-green-500',
    orange: 'bg-orange-100 text-orange-500',
    cyan: 'bg-cyan-100 text-cyan-500',
    red: 'bg-red-100 text-red-500',
  }
  return (
    <span
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-card',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
