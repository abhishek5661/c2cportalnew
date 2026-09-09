import c2cedgeLogo from '../../assets/c2cedge-logo.png'
import { cn } from '../../lib/cn'

export function Logo({
  compact = false,
  tone = 'light',
  className,
}: {
  compact?: boolean
  tone?: 'light' | 'dark'
  className?: string
}) {
  if (compact) {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-xl overflow-hidden shrink-0',
          tone === 'dark' ? 'bg-white p-1 shadow-xs' : '',
          className,
        )}
        title="c2cedge"
      >
        <div className="w-8 h-8 overflow-hidden flex items-center justify-start">
          <img
            src={c2cedgeLogo}
            alt="c2cedge"
            className="h-7 max-w-none object-left object-contain"
            style={{ objectPosition: '0% 50%' }}
          />
        </div>
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center shrink-0',
        tone === 'dark' ? 'bg-white rounded-xl px-2.5 py-1.5 shadow-xs' : '',
        className,
      )}
    >
      <img
        src={c2cedgeLogo}
        alt="c2cedge"
        className="h-8 sm:h-9 w-auto object-contain max-w-[175px]"
      />
    </span>
  )
}
