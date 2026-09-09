import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { Difficulty } from '../../types'

type Tone = 'neutral' | 'brand' | 'green' | 'orange' | 'red' | 'purple' | 'cyan'

const tones: Record<Tone, string> = {
  neutral: 'bg-surface-subtle text-ink-muted border-line',
  brand: 'bg-brand-100 text-brand-600 border-brand-100',
  green: 'bg-green-100 text-green-500 border-green-100',
  orange: 'bg-orange-100 text-orange-500 border-orange-100',
  red: 'bg-red-100 text-red-500 border-red-100',
  purple: 'bg-purple-100 text-purple-500 border-purple-100',
  cyan: 'bg-cyan-100 text-cyan-500 border-cyan-100',
}

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

const difficultyTone: Record<Difficulty, Tone> = {
  Easy: 'green',
  Medium: 'orange',
  Hard: 'red',
}

export function DifficultyBadge({ value }: { value: Difficulty }) {
  return <Badge tone={difficultyTone[value]}>{value}</Badge>
}
