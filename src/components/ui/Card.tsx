import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Card({
  className,
  children,
  onClick,
}: {
  className?: string
  children: ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
}) {
  return <section onClick={onClick} className={cn('card p-5', className)}>{children}</section>
}

export function CardHeader({
  title,
  action,
  description,
}: {
  title: ReactNode
  action?: ReactNode
  description?: ReactNode
}) {
  return (
    <header className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="section-title">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm text-ink-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </header>
  )
}
