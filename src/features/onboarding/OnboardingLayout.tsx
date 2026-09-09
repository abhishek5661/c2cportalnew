import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Bookmark, Check, Clock, ShieldCheck } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button } from '../../components/ui/Button'
import { Logo } from '../../components/layout/Logo'
import { onboardingSteps } from './OnboardingContext'

export function OnboardingLayout({
  step,
  minutesLeft,
  title,
  description,
  children,
  rail,
  canContinue,
  continueLabel = 'Continue',
  onContinue,
  footnote,
}: {
  step: number
  minutesLeft: number
  title: ReactNode
  description: ReactNode
  children: ReactNode
  rail: ReactNode
  canContinue: boolean
  continueLabel?: string
  onContinue: () => void
  footnote?: ReactNode
}) {
  const navigate = useNavigate()
  const previous = onboardingSteps.find((s) => s.index === step - 1)

  return (
    <div className="min-h-full bg-surface-subtle">
      <header className="sticky top-0 z-20 border-b border-line bg-surface">
        <div className="mx-auto flex max-w-content flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:gap-6 lg:px-6">
          <Link to="/dashboard" className="shrink-0">
            <Logo />
          </Link>

          <div className="flex-1">
            <p className="text-center text-xs font-medium text-ink-muted lg:text-sm">
              Step {step} of 6 · Create your learning profile
            </p>
            <ol className="mt-2 flex items-center justify-center gap-1.5">
              {onboardingSteps.map((s) => {
                const done = s.index < step
                const current = s.index === step
                return (
                  <li key={s.index} className="flex items-center gap-1.5">
                    <span
                      aria-current={current ? 'step' : undefined}
                      aria-label={`${s.label}${done ? ' completed' : ''}`}
                      className={cn(
                        'inline-flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold',
                        done && 'border-brand-600 text-brand-600',
                        current && 'border-brand-600 bg-brand-600 text-white',
                        !done && !current && 'border-line text-ink-muted',
                      )}
                    >
                      {done ? <Check size={13} strokeWidth={3} /> : s.index}
                    </span>
                    {s.index < 6 ? (
                      <span
                        className={cn(
                          'hidden h-px w-6 sm:block',
                          done ? 'bg-brand-600' : 'bg-line',
                        )}
                      />
                    ) : null}
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 lg:flex-col lg:items-end">
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Already a member? Sign in
              </Link>
              <button
                type="button"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:underline"
              >
                <Bookmark size={13} />
                Save later
              </button>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-card border border-line px-2 py-1 text-xs text-ink-muted">
              <Clock size={13} />~{minutesLeft} min to complete
            </span>
          </div>
        </div>
        <div className="mx-auto grid max-w-content grid-cols-6 gap-1.5 px-4 pb-3 lg:px-6">
          {onboardingSteps.map((s) => (
            <span
              key={s.index}
              className={cn(
                'h-1 rounded-full',
                s.index <= step ? 'bg-brand-600' : 'bg-line',
              )}
            />
          ))}
        </div>
      </header>

      <div className="mx-auto grid max-w-content gap-6 px-4 py-8 lg:px-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-bold leading-tight text-ink lg:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {description}
          </p>

          <div className="mt-8 space-y-8">{children}</div>

          {footnote ? (
            <p className="mt-6 flex items-center gap-2 rounded-card bg-brand-100/50 px-4 py-3 text-sm text-ink-muted">
              <ShieldCheck size={16} className="shrink-0 text-brand-600" />
              {footnote}
            </p>
          ) : null}

          <div className="mt-8 space-y-4 border-t border-line pt-6">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                variant="subtle"
                className="rounded-xl border border-line bg-white text-ink hover:bg-slate-50 text-xs font-semibold px-5"
                leadingIcon={<ArrowLeft size={15} />}
                onClick={() => (previous ? navigate(previous.path) : navigate('/dashboard'))}
              >
                Back
              </Button>
              <Button
                disabled={!canContinue}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 shadow-sm shadow-blue-600/20 disabled:opacity-50"
                trailingIcon={<ArrowRight size={15} />}
                onClick={onContinue}
              >
                {continueLabel}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted text-center pt-2">
              <ShieldCheck size={14} className="text-slate-400 shrink-0" />
              <span>
                You won&apos;t have to figure out what to do next. —{' '}
                <strong className="text-ink font-semibold">c2cedge</strong> will continuously recommend your next best action.
              </span>
            </div>
          </div>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-32 xl:self-start">{rail}</aside>
      </div>
    </div>
  )
}
