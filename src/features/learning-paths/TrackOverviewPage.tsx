import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Cpu, Lightbulb, Sparkles, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageLayout } from '../../components/layout/AppShell'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export interface TrackPageConfig {
  title: string
  eyebrow: string
  summary: string
  objective: string
  accent: string
  icon: 'spark' | 'cpu' | 'brain' | 'target'
  modules: Array<{
    title: string
    description: string
    items: string[]
  }>
}

const iconMap = {
  spark: Sparkles,
  cpu: Cpu,
  brain: Lightbulb,
  target: Target,
}

export function TrackOverviewPage({ config }: { config: TrackPageConfig }) {
  const Icon = iconMap[config.icon] || Sparkles

  return (
    <PageLayout
      main={
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/master" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700">
              <ArrowLeft size={16} /> Back to Master
            </Link>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${config.accent}`}>
                  <Icon size={28} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">{config.eyebrow}</p>
                  <h1 className="mt-1 font-display text-3xl font-bold text-ink">{config.title}</h1>
                </div>
              </div>

              <Button variant="primary" className="w-fit">
                Start learning
              </Button>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-6 text-ink-muted">{config.summary}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-2xl border border-line p-5">
              <div className="mb-4 flex items-center gap-2">
                <Target className="text-brand-600" size={18} />
                <h2 className="font-display text-lg font-bold text-ink">Learning objective</h2>
              </div>
              <p className="text-sm leading-6 text-ink-muted">{config.objective}</p>
            </Card>

            <Card className="rounded-2xl border border-line p-5">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="text-brand-600" size={18} />
                <h2 className="font-display text-lg font-bold text-ink">Skill focus</h2>
              </div>
              <ul className="space-y-2 text-sm text-ink-muted">
                {config.modules.slice(0, 3).map((module) => (
                  <li key={module.title} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>{module.title}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-ink">Track roadmap</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {config.modules.map((module, index) => (
                <Card key={module.title} className="rounded-2xl border border-line p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-600">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-medium text-ink-muted">Module</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-ink">{module.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{module.description}</p>

                  <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                    {module.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="secondary">
              Practice now
            </Button>
            <Link to="/master" className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:bg-surface-subtle">
              Explore all paths
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      }
      rail={
        <div className="space-y-6">
          <Card className="rounded-2xl border border-line p-4">
            <h3 className="font-display text-base font-bold text-ink">Recommended next step</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Start with the foundational concept block and solve 3 short tasks to unlock the next milestone.
            </p>
            <div className="mt-4 rounded-xl bg-brand-50 p-3 text-sm font-medium text-brand-700">
              3 tasks left to unlock the next level
            </div>
          </Card>

          <Card className="rounded-2xl border border-line p-4">
            <h3 className="font-display text-base font-bold text-ink">What you will build</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>• Structured concept maps</li>
              <li>• Timed practice sets</li>
              <li>• Real-world mini projects</li>
            </ul>
          </Card>
        </div>
      }
    />
  )
}
