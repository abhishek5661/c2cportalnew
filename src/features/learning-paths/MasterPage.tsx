import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BarChart3,
  Bookmark,
  Brain,
  Briefcase,
  ChevronDown,
  Code2,
  Globe,
  Layers,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  Terminal,
} from 'lucide-react'
import { PageLayout } from '../../components/layout/AppShell'
import { Card } from '../../components/ui/Card'
import { ProgressBar, ProgressRing } from '../../components/ui/Progress'
import { Tabs } from '../../components/ui/Tabs'
import {
  learningPaths,
  popularTopics,
  skillsOverview,
  user,
} from '../../data/mock'

const categories = [
  'All Paths',
  'DSA',
  'Aptitude',
  'Programming',
  'CS Fundamentals',
  'Domains',
  'Soft Skills',
]

const pathIconMap: Record<string, typeof Code2> = {
  dsa: Code2,
  aptitude: BarChart3,
  programming: Terminal,
  'cs-fundamentals': Shield,
  verbal: Award,
  web: Globe,
  ml: Brain,
  interview: Briefcase,
}

const pathToneMap: Record<string, string> = {
  dsa: 'bg-purple-50 text-purple-600 border-purple-100',
  aptitude: 'bg-orange-50 text-orange-600 border-orange-100',
  programming: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'cs-fundamentals': 'bg-blue-50 text-blue-600 border-blue-100',
  verbal: 'bg-violet-50 text-violet-600 border-violet-100',
  web: 'bg-amber-50 text-amber-600 border-amber-100',
  ml: 'bg-rose-50 text-rose-600 border-rose-100',
  interview: 'bg-teal-50 text-teal-600 border-teal-100',
}

const topicToneMap: Record<string, string> = {
  DSA: 'bg-purple-100 text-purple-700',
  Aptitude: 'bg-orange-100 text-orange-700',
  Programming: 'bg-emerald-100 text-emerald-700',
  DBMS: 'bg-blue-100 text-blue-700',
}

export function MasterPage() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('All Paths')
  const [bookmarkedPaths, setBookmarkedPaths] = useState<string[]>([])
  const [studentInterests] = useState<string[]>(() => {
    try {
      const onboarding = JSON.parse(localStorage.getItem('c2cedge.onboarding') || '{}')
      return Array.isArray(onboarding.interests) ? onboarding.interests : []
    } catch {
      return []
    }
  })

  const toggleBookmark = (id: string) => {
    setBookmarkedPaths((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    )
  }

  const visiblePaths = useMemo(() => {
    const interestCategories = new Set(
      studentInterests.flatMap((interest) => {
        if (interest === 'Software Engineering') return ['Programming', 'Domains']
        if (interest === 'Data & AI') return ['Domains', 'Programming']
        if (interest === 'Product & Design') return ['Domains', 'Soft Skills']
        if (interest === 'Career Preparation') return ['DSA', 'Soft Skills']
        return []
      }),
    )
    const categoryPaths = category === 'All Paths'
      ? learningPaths
      : learningPaths.filter((path) => path.category === category)

    if (category !== 'All Paths' || interestCategories.size === 0) return categoryPaths
    const prioritized = categoryPaths.filter((path) => interestCategories.has(path.category))
    const remaining = categoryPaths.filter((path) => !interestCategories.has(path.category))
    return [...prioritized, ...remaining]
  }, [category, studentInterests])

  return (
    <PageLayout
      main={
        <>
          {/* Header Title */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
              <Shield size={22} className="stroke-[2.2]" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
                Master
              </h1>
              <p className="text-sm text-ink-muted">
                {studentInterests.length > 0
                  ? `Personalized paths for ${studentInterests.join(', ')}.`
                  : 'Build strong foundations and master in-demand skills.'}
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <Tabs
            items={categories.map((id) => ({ id, label: id }))}
            value={category}
            onChange={setCategory}
          />

          {/* Explore Learning Paths */}
          <section className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-ink">
                  Explore Learning Paths
                </h2>
                <p className="text-xs text-ink-muted">
                  Choose a path and start mastering skills step by step.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:bg-surface-subtle transition-colors self-start sm:self-auto shadow-sm"
              >
                <SlidersHorizontal size={14} className="text-ink-muted" />
                Learning Preferences
              </button>
            </div>

            {/* Grid of 8 Path Cards */}
            <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
              {visiblePaths.map((path) => {
                const Icon = pathIconMap[path.id] || Layers
                const toneCls =
                  pathToneMap[path.id] || 'bg-blue-50 text-blue-600 border-blue-100'
                const isBookmarked = bookmarkedPaths.includes(path.id)

                return (
                  <Card
                    key={path.id}
                    className="group flex flex-col justify-between rounded-xl border border-line bg-surface p-4 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span
                          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-xs ${toneCls}`}
                        >
                          <Icon size={19} />
                        </span>
                        <button
                          type="button"
                          aria-label={`Bookmark ${path.title}`}
                          onClick={() => toggleBookmark(path.id)}
                          className="rounded-lg p-1 text-slate-400 hover:bg-surface-subtle hover:text-blue-600 transition-colors"
                        >
                          <Bookmark
                            size={16}
                            className={
                              isBookmarked ? 'fill-blue-600 text-blue-600' : ''
                            }
                          />
                        </button>
                      </div>

                      <div className="mt-3">
                        <h3 className="font-display text-sm font-bold text-ink group-hover:text-blue-600 transition-colors">
                          {path.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-ink-muted line-clamp-2">
                          {path.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="font-medium text-ink-muted">
                          {path.completion}% Completed
                        </span>
                      </div>
                      <ProgressBar
                        value={path.completion}
                        accent={path.accent}
                        label={`${path.title} progress`}
                      />
                      <Link
                        to={
                          path.id === 'aptitude'
                            ? '/master/aptitude/number-systems'
                            : `/master/${path.id}`
                        }
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Continue <ArrowRight size={13} />
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </div>

            <div className="flex justify-center pt-1">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-subtle transition-colors shadow-xs"
              >
                View all learning paths <ArrowRight size={13} />
              </button>
            </div>
          </section>

          {/* Popular Topics Row */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-ink">
                Popular Topics
              </h2>
              <button
                type="button"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-6">
              {popularTopics.map((topic) => {
                const badgeStyle = topicToneMap[topic.domain] || 'bg-slate-100 text-slate-700'
                return (
                  <Link
                    key={topic.id}
                    to={
                      topic.id === 'number-systems'
                        ? '/master/aptitude/number-systems'
                        : '/master/dsa'
                    }
                    className="flex flex-col rounded-xl border border-line bg-surface p-3 hover:border-blue-300 hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                        <Code2 size={13} />
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${badgeStyle}`}
                      >
                        {topic.domain}
                      </span>
                    </div>
                    <span className="font-display text-xs font-semibold text-ink truncate">
                      {topic.title}
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Bottom Motivational Banner */}
          <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-blue-100/60 p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between relative z-10">
              <div className="max-w-md">
                <h3 className="font-display text-lg font-bold text-ink">
                  Master today, lead tomorrow.
                </h3>
                <p className="mt-1 text-xs text-ink-muted">
                  Consistent learning compounds into unstoppable growth.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/journey')}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/30 hover:bg-blue-700 transition-all"
                >
                  Explore Roadmap <ArrowRight size={14} />
                </button>
              </div>

              {/* 3D Target Graphic Mockup */}
              <div className="relative flex items-center justify-center self-center sm:self-auto">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-xl shadow-blue-500/20">
                  <Target size={44} className="stroke-[2.2] animate-pulse" />
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-600 shadow-md">
                    <Sparkles size={14} />
                  </span>
                </div>
              </div>
            </div>
          </section>
        </>
      }
      rail={
        <>
          {/* Your Progress */}
          <Card className="rounded-xl border border-line p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display text-sm font-bold text-ink">
                Your Progress
              </h3>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink"
              >
                This Week <ChevronDown size={14} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative flex items-center justify-center">
                <ProgressRing
                  value={Math.round((user.hoursSpent / user.hoursGoal) * 100)}
                  size={84}
                  strokeWidth={7}
                  caption="Time"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-sm font-bold text-ink">
                    14
                  </span>
                  <span className="text-[10px] text-ink-muted">/ 20 hrs</span>
                </div>
              </div>

              <div className="flex-1 space-y-2 text-xs">
                <div>
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-ink-muted">Time Spent</span>
                    <span className="font-bold text-ink">14 hrs</span>
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-600">
                    ↑ 20% vs last week
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-ink-muted">
                    <span>Weekly Goal</span>
                    <span className="font-medium text-ink">20 hrs</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: '70%' }}
                    />
                  </div>
                  <span className="text-[10px] text-ink-muted float-right mt-0.5">
                    70%
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Skills Overview */}
          <Card className="rounded-xl border border-line p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display text-sm font-bold text-ink">
                Skills Overview
              </h3>
              <button
                type="button"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                View all
              </button>
            </div>

            <ul className="mt-3 space-y-3">
              {skillsOverview.map((skill) => (
                <li key={skill.id}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-ink">{skill.label}</span>
                    <span className="font-bold text-ink-muted">{skill.value}%</span>
                  </div>
                  <ProgressBar
                    value={skill.value}
                    accent={skill.accent}
                    label={skill.label}
                  />
                </li>
              ))}
            </ul>
          </Card>

          {/* Continue Learning */}
          <Card className="rounded-xl border border-line p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display text-sm font-bold text-ink">
                Continue Learning
              </h3>
              <button
                type="button"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                View all
              </button>
            </div>

            <ul className="mt-3 space-y-3.5">
              {[
                {
                  id: 'arrays',
                  title: 'Arrays in DSA',
                  meta: 'DSA · Easy',
                  completion: 60,
                  accent: 'brand' as const,
                  link: '/practice/largest-element-in-an-array',
                },
                {
                  id: 'time-work',
                  title: 'Time & Work',
                  meta: 'Aptitude · Easy',
                  completion: 40,
                  accent: 'orange' as const,
                  link: '/master/aptitude/number-systems',
                },
                {
                  id: 'python-basics',
                  title: 'Python Basics',
                  meta: 'Programming · Easy',
                  completion: 75,
                  accent: 'green' as const,
                  link: '/master/programming',
                },
              ].map((item) => (
                <li key={item.id} className="group">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        to={item.link}
                        className="font-display text-xs font-bold text-ink group-hover:text-blue-600 transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-[11px] text-ink-muted">{item.meta}</p>
                    </div>
                    <span className="text-xs font-semibold text-ink-muted">
                      {item.completion}%
                    </span>
                  </div>
                  <ProgressBar
                    value={item.completion}
                    accent={item.accent}
                    label={item.title}
                    className="mt-1.5"
                  />
                </li>
              ))}
            </ul>
          </Card>

          {/* Recommended for You */}
          <Card className="rounded-xl border border-line p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display text-sm font-bold text-ink">
                Recommended for You
              </h3>
              <button
                type="button"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="mt-3 rounded-xl border border-slate-100 bg-surface-subtle p-3">
              <div className="relative h-24 overflow-hidden rounded-lg bg-gradient-to-tr from-navy-950 via-blue-900 to-indigo-900 p-3 text-white flex items-center justify-center">
                <div className="text-center">
                  <span className="inline-block rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold">
                    Masterclass
                  </span>
                  <p className="font-display text-xs font-bold mt-1 text-white">
                    Dynamic Programming
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Bookmark masterclass"
                  className="absolute top-2 right-2 rounded p-1 text-white/70 hover:text-white"
                >
                  <Bookmark size={14} />
                </button>
              </div>

              <div className="mt-2.5">
                <h4 className="font-display text-xs font-bold text-ink">
                  Dynamic Programming Masterclass
                </h4>
                <p className="text-[11px] text-ink-muted">DSA · Intermediate</p>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 font-semibold text-amber-500">
                    <Star size={13} className="fill-amber-400" />
                    4.8{' '}
                    <span className="font-normal text-ink-muted">(1.2K)</span>
                  </span>
                  <span className="text-[11px] text-ink-muted">6h 30m</span>
                </div>
              </div>

              {/* Carousel Indicator Dots */}
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-4 rounded-full bg-blue-600" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              </div>
            </div>
          </Card>
        </>
      }
    />
  )
}
