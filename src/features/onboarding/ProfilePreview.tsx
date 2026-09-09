import type { ReactNode } from 'react'
import {
  Brain,
  Calendar,
  ChevronRight,
  Clock,
  Code2,
  Cpu,
  Layers,
  Pencil,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { ProgressRing } from '../../components/ui/Progress'
import { useOnboarding } from './OnboardingContext'
import { cn } from '../../lib/cn'

export function ProfilePreview({
  mode = 'step4',
  heading,
  caption,
  message,
}: {
  mode?: 'step3' | 'step4'
  heading?: string
  caption?: string
  message?: ReactNode
}) {
  const { profile, completion } = useOnboarding()

  const yearLabels: Record<number, string> = {
    1: 'First Year',
    2: 'Second Year',
    3: 'Third Year',
    4: 'Fourth Year',
  }

  const isStep3 = mode === 'step3'

  const title = heading || (isStep3 ? 'Your Learning Profile (So far)' : 'Your profile preview')
  const subtitle = caption || (isStep3 ? 'This helps us craft your personalized journey.' : 'This is how your journey is shaping up.')

  const rows = [
    {
      id: 'year',
      icon: <Calendar size={15} className="text-emerald-600" />,
      tone: 'bg-emerald-50 border-emerald-100',
      label: 'Year of Study',
      value: profile.year ? yearLabels[profile.year] : 'First Year',
    },
    {
      id: 'interests',
      icon: <Target size={15} className="text-cyan-600" />,
      tone: 'bg-cyan-50 border-cyan-100',
      label: 'Interests',
      value: profile.interests[0] ?? 'Software Engineering',
    },
    {
      id: 'level',
      icon: <Code2 size={15} className="text-purple-600" />,
      tone: 'bg-purple-50 border-purple-100',
      label: 'Programming Level',
      value: profile.level ?? 'Intermediate',
    },
    {
      id: 'languages',
      icon: <Layers size={15} className="text-amber-600" />,
      tone: 'bg-amber-50 border-amber-100',
      label: 'Languages',
      value: profile.languages.length > 0 ? profile.languages.join(', ') : 'Python',
    },
    {
      id: 'daily-time',
      icon: <Clock size={15} className="text-blue-600" />,
      tone: 'bg-blue-50 border-blue-100',
      label: 'Daily Time',
      value: profile.dailyTime ?? '1–2 hours',
    },
    ...(profile.connectedAccounts.length > 0
      ? [
          {
            id: 'connected-accounts',
            icon: <ShieldCheck size={15} className="text-emerald-600" />,
            tone: 'bg-emerald-50 border-emerald-100',
            label: 'Connected Accounts',
            value: (() => {
              try {
                const raw = localStorage.getItem('c2cedge.connectedProfilesMap')
                const map = raw ? JSON.parse(raw) : {}
                return profile.connectedAccounts
                  .map((id) => (map[id]?.username ? `${id} (@${map[id].username})` : id))
                  .join(', ')
              } catch {
                return profile.connectedAccounts.join(', ')
              }
            })(),
          },
        ]
      : []),
  ]

  return (
    <div className="space-y-4">
      <Card className="rounded-3xl border border-line bg-surface p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-blue-600" />
          <h2 className="font-display text-sm font-bold text-ink">{title}</h2>
        </div>
        <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>

        {/* Profile Completion Donut */}
        <div className="mt-4 flex items-center gap-4 rounded-2xl bg-surface-subtle p-3.5 border border-slate-100">
          <div className="relative flex items-center justify-center">
            <ProgressRing
              value={isStep3 ? 50 : completion > 0 ? completion : 28}
              size={68}
              strokeWidth={6}
              caption="Completion"
            />
            <span className="absolute font-display text-xs font-bold text-ink">
              {isStep3 ? '50%' : completion > 0 ? `${completion}%` : '28%'}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-xs font-bold text-ink">
              Profile Completion
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink-muted">
              {isStep3
                ? "You're doing great!"
                : 'Great start! Just a few more steps to unlock your roadmap.'}
            </p>
          </div>
        </div>

        {/* Profile Attributes List */}
        <div className="mt-4 space-y-2">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-2.5 hover:border-blue-200 transition-colors"
            >
              <span
                className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border', row.tone)}
              >
                {row.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-ink-muted font-medium leading-none">
                  {row.label}
                </p>
                <p className="font-display text-xs font-bold text-ink mt-1 truncate">
                  {row.value}
                </p>
              </div>

              {isStep3 ? (
                <button
                  type="button"
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                  title={`Edit ${row.label}`}
                >
                  <Pencil size={13} />
                </button>
              ) : (
                <ChevronRight size={14} className="text-slate-400 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Conditional Footer depending on Step */}
        {isStep3 ? (
          <>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Sparkles size={14} />
              </div>
              <p className="text-[11px] font-medium text-blue-900 leading-relaxed">
                Don&apos;t worry, you can always update these later from your settings.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-ink-muted">
              <p className="text-xs italic leading-relaxed">
                &ldquo;The journey of a thousand lines of code begins with a single step.&rdquo;
              </p>
              <span className="block text-[11px] font-semibold text-ink mt-1">— c2cedge</span>
            </div>
          </>
        ) : (
          <>
            {/* What's next baseline assessment info */}
            <div className="mt-5 border-t border-slate-100 pt-4 space-y-2.5">
              <div>
                <h4 className="font-display text-xs font-bold text-ink">
                  What&apos;s next?
                </h4>
                <p className="mt-0.5 text-[11px] text-ink-muted leading-relaxed">
                  We&apos;ll run a quick baseline assessment to understand your current skills across key areas:
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'DSA', icon: Code2 },
                  { label: 'Aptitude', icon: Target },
                  { label: 'CS Fundamentals', icon: Cpu },
                  { label: 'Programming', icon: Layers },
                  { label: 'Reasoning', icon: Brain },
                  { label: 'Verbal', icon: Sparkles },
                ].map((area) => (
                  <span
                    key={area.label}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-surface-subtle px-2 py-0.5 text-[10px] font-semibold text-slate-700"
                  >
                    <area.icon size={10} className="text-slate-500" />
                    {area.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Rocket Notification Card */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                <Rocket size={15} />
              </span>
              <p className="text-xs font-medium text-blue-900 leading-snug">
                After that, you&apos;ll get your personalized learning roadmap.
              </p>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
