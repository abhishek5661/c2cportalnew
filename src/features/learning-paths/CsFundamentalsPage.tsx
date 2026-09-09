import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  Layers3,
  Network,
  ShieldCheck,
  Target,
  TimerReset,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageLayout } from '../../components/layout/AppShell'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

const pillars = [
  {
    title: 'Data Structures',
    description: 'Arrays, trees, graphs, heaps, and hash maps to solve speed and memory trade-offs.',
    items: ['Arrays', 'Hash maps', 'Trees', 'Graphs'],
    icon: Layers3,
  },
  {
    title: 'Algorithms',
    description: 'Patterns for searching, sorting, optimization, and recursive problem solving.',
    items: ['Search', 'Sort', 'Greedy', 'Dynamic programming'],
    icon: Target,
  },
  {
    title: 'DBMS',
    description: 'Understand storage, indexing, constraints, joins, and transaction integrity.',
    items: ['SQL', 'Indexes', 'Normalization', 'Transactions'],
    icon: Database,
  },
  {
    title: 'Operating Systems',
    description: 'Learn processes, memory, scheduling, and concurrency fundamentals.',
    items: ['Processes', 'Scheduling', 'Threads', 'Memory'],
    icon: Cpu,
  },
  {
    title: 'Networking',
    description: 'Build intuition around TCP/IP, latency, routing, and communication layers.',
    items: ['TCP/IP', 'HTTP', 'Sockets', 'DNS'],
    icon: Network,
  },
  {
    title: 'System Design',
    description: 'Translate core concepts into scalable, reliable software systems.',
    items: ['Trade-offs', 'Latency', 'Throughput', 'Reliability'],
    icon: BrainCircuit,
  },
]

const stats = [
  { label: 'Skill pillars', value: '6', icon: ShieldCheck },
  { label: 'Practice sets', value: '24', icon: TimerReset },
  { label: 'Problem depth', value: 'Beginner → Advanced', icon: BookOpen },
]

const progression = [
  'Start with core data structure and algorithm basics',
  'Build DBMS and OS intuition through mini-projects',
  'Solve timed interview-style problems with feedback loops',
  'Use system design thinking for scalable engineering decisions',
]

export function CsFundamentalsPage() {
  return (
    <PageLayout
      main={
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/master" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700">
              <ArrowLeft size={16} /> Back to Master
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 shadow-sm">
                  <Cpu size={30} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">Core concepts</p>
                  <h1 className="mt-1 font-display text-3xl font-bold text-ink">CS Fundamentals</h1>
                </div>
              </div>

              <Button variant="primary" className="w-fit">
                Start learning
              </Button>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-6 text-ink-muted">
              Strengthen the foundations every software engineer depends on: data structures, algorithms, databases, operating systems, networking, and system design.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-blue-100 bg-white/80 p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-ink-muted">{label}</p>
                      <p className="text-lg font-bold text-ink">{value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <Card className="rounded-2xl border border-line p-5">
              <div className="mb-4 flex items-center gap-2">
                <Target className="text-brand-600" size={18} />
                <h2 className="font-display text-lg font-bold text-ink">Learning objective</h2>
              </div>
              <p className="text-sm leading-6 text-ink-muted">
                Master the core concepts behind software systems so you can reason clearly, debug effectively, and build reliable, scalable solutions across engineering roles.
              </p>
            </Card>

            <Card className="rounded-2xl border border-line p-5">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="text-brand-600" size={18} />
                <h2 className="font-display text-lg font-bold text-ink">Track focus</h2>
              </div>
              <ul className="space-y-2 text-sm text-ink-muted">
                {['Problem solving', 'System thinking', 'Interview readiness'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-ink">Core roadmap</h2>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">Foundation track</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pillars.map(({ title, description, items, icon: Icon }) => (
                <Card key={title} className="rounded-2xl border border-line p-4 transition-all hover:border-blue-200 hover:shadow-md">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Module</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">{description}</p>

                  <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                    {items.map((item) => (
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
            <Button variant="secondary">Practice now</Button>
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
              Begin with data structures and algorithms before moving into operating systems and database fundamentals.
            </p>
            <div className="mt-4 rounded-xl bg-blue-50 p-3 text-sm font-medium text-blue-700">
              3 modules left to unlock the next milestone
            </div>
          </Card>

          <Card className="rounded-2xl border border-line p-4">
            <h3 className="font-display text-base font-bold text-ink">Progression</h3>
            <ul className="mt-3 space-y-3 text-sm text-ink-muted">
              {progression.map((step) => (
                <li key={step} className="flex items-start gap-2">
                  <ChevronRight size={15} className="mt-0.5 shrink-0 text-blue-600" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      }
    />
  )
}
