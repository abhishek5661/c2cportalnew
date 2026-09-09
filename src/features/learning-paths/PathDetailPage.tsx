import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Bookmark,
  Bot,
  Check,
  ChevronDown,
  Clock,
  Code2,
  Download,
  FileText,
  Flame,
  Lightbulb,
  Lock,
  MoreVertical,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trophy,
  Video,
  X,
} from 'lucide-react'
import { PageLayout } from '../../components/layout/AppShell'
import { Card, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ProgressBar, ProgressRing } from '../../components/ui/Progress'
import { Tabs } from '../../components/ui/Tabs'
import { DifficultyBadge, Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'
import { learningPaths } from '../../data/mock'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'practice', label: 'Practice' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'leaderboard', label: 'Leaderboard' },
]

interface CurriculumModuleItem {
  id: string
  number: number
  title: string
  topicCount: number
  completion: number
  locked: boolean
  badgeColor: {
    bg: string
    text: string
    border: string
  }
  barColor: string
  actionLabel: string
  topics: { id: string; title: string; done: boolean }[]
}

const curriculumModulesData: CurriculumModuleItem[] = [
  {
    id: 'arrays-strings',
    number: 1,
    title: 'Arrays & Strings',
    topicCount: 5,
    completion: 100,
    locked: false,
    badgeColor: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
    },
    barColor: 'bg-emerald-500',
    actionLabel: 'Review',
    topics: [
      { id: 'intro', title: 'Introduction', done: true },
      { id: 'arrays', title: 'Arrays', done: true },
      { id: '2d-arrays', title: '2D Arrays', done: true },
      { id: 'strings', title: 'Strings', done: true },
      { id: 'problems', title: 'Problems', done: true },
    ],
  },
  {
    id: 'linked-list',
    number: 2,
    title: 'Linked List',
    topicCount: 5,
    completion: 60,
    locked: false,
    badgeColor: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      border: 'border-purple-200',
    },
    barColor: 'bg-purple-500',
    actionLabel: 'Continue',
    topics: [
      { id: 'singly', title: 'Singly Linked List', done: true },
      { id: 'doubly', title: 'Doubly Linked List', done: true },
      { id: 'circular', title: 'Circular Linked List', done: true },
      { id: 'reversal', title: 'Reversal Patterns', done: false },
      { id: 'problems', title: 'Problems', done: false },
    ],
  },
  {
    id: 'stacks-queues',
    number: 3,
    title: 'Stacks & Queues',
    topicCount: 4,
    completion: 25,
    locked: false,
    badgeColor: {
      bg: 'bg-orange-100',
      text: 'text-orange-700',
      border: 'border-orange-200',
    },
    barColor: 'bg-orange-500',
    actionLabel: 'Continue',
    topics: [
      { id: 'stack', title: 'Stack Basics', done: true },
      { id: 'queue', title: 'Queue Basics', done: false },
      { id: 'deque', title: 'Deque', done: false },
      { id: 'problems', title: 'Problems', done: false },
    ],
  },
  {
    id: 'trees',
    number: 4,
    title: 'Trees',
    topicCount: 6,
    completion: 0,
    locked: true,
    badgeColor: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
    barColor: 'bg-slate-200',
    actionLabel: 'Unlock',
    topics: [],
  },
  {
    id: 'graphs',
    number: 5,
    title: 'Graphs',
    topicCount: 7,
    completion: 0,
    locked: true,
    badgeColor: {
      bg: 'bg-rose-100',
      text: 'text-rose-700',
      border: 'border-rose-200',
    },
    barColor: 'bg-slate-200',
    actionLabel: 'Unlock',
    topics: [],
  },
  {
    id: 'dynamic-programming',
    number: 6,
    title: 'Dynamic Programming',
    topicCount: 8,
    completion: 0,
    locked: true,
    badgeColor: {
      bg: 'bg-cyan-100',
      text: 'text-cyan-700',
      border: 'border-cyan-200',
    },
    barColor: 'bg-slate-200',
    actionLabel: 'Unlock',
    topics: [],
  },
]

interface PracticeProblem {
  id: string
  number: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topic: 'Arrays' | 'Strings'
  successRate: number
  solvedBy: string
  solved: boolean
  link: string
}

const practiceProblemsData: PracticeProblem[] = [
  {
    id: 'largest-element',
    number: 1,
    title: 'Largest Element in an Array',
    difficulty: 'Easy',
    topic: 'Arrays',
    successRate: 92,
    solvedBy: '12.4K',
    solved: true,
    link: '/practice/largest-element',
  },
  {
    id: 'check-sorted',
    number: 2,
    title: 'Check if Array is Sorted',
    difficulty: 'Easy',
    topic: 'Arrays',
    successRate: 88,
    solvedBy: '9.8K',
    solved: true,
    link: '/practice/check-sorted',
  },
  {
    id: 'remove-duplicates-from-sorted-array',
    number: 3,
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Medium',
    topic: 'Arrays',
    successRate: 68,
    solvedBy: '7.1K',
    solved: false,
    link: '/practice/remove-duplicates-from-sorted-array',
  },
  {
    id: 'two-sum',
    number: 4,
    title: 'Two Sum',
    difficulty: 'Medium',
    topic: 'Arrays',
    successRate: 71,
    solvedBy: '15.3K',
    solved: false,
    link: '/practice/two-sum',
  },
  {
    id: 'longest-common-prefix',
    number: 5,
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    topic: 'Strings',
    successRate: 85,
    solvedBy: '11.2K',
    solved: false,
    link: '/practice/longest-common-prefix',
  },
  {
    id: 'valid-anagram',
    number: 6,
    title: 'Valid Anagram',
    difficulty: 'Easy',
    topic: 'Strings',
    successRate: 90,
    solvedBy: '10.6K',
    solved: true,
    link: '/practice/valid-anagram',
  },
  {
    id: 'group-anagrams',
    number: 7,
    title: 'Group Anagrams',
    difficulty: 'Medium',
    topic: 'Strings',
    successRate: 63,
    solvedBy: '8.7K',
    solved: false,
    link: '/practice/group-anagrams',
  },
  {
    id: 'longest-substring-without-repeating-characters',
    number: 8,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Hard',
    topic: 'Strings',
    successRate: 45,
    solvedBy: '6.3K',
    solved: false,
    link: '/practice/longest-substring-without-repeating-characters',
  },
]

export function PathDetailPage() {
  const { pathId } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('overview')
  const [openModule, setOpenModule] = useState<string | null>('arrays-strings')

  // Practice tab filter state
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All')
  const [topicFilter, setTopicFilter] = useState('All Topics')
  const [sortBy, setSortBy] = useState('Recommended')

  // Interactive bookmarks state
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>([])

  // Modal / Toast states
  const [showAiModal, setShowAiModal] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [showTipsModal, setShowTipsModal] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [dailyGoalHours, setDailyGoalHours] = useState(3)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const toggleBookmark = (id: string) => {
    setBookmarkedResources((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
    showToast('Bookmarks updated')
  }

  const path = learningPaths.find((entry) => entry.id === pathId) ?? learningPaths[0]

  // Filtered practice problems list
  const filteredProblems = useMemo(() => {
    let list = practiceProblemsData.filter((prob) => {
      const matchDifficulty =
        difficultyFilter === 'All' || prob.difficulty === difficultyFilter
      const matchTopic =
        topicFilter === 'All Topics' || prob.topic === topicFilter
      return matchDifficulty && matchTopic
    })

    if (sortBy === 'Success rate') {
      list = [...list].sort((a, b) => b.successRate - a.successRate)
    } else if (sortBy === 'Most solved') {
      list = [...list].sort((a, b) => parseFloat(b.solvedBy) - parseFloat(a.solvedBy))
    }

    return list
  }, [difficultyFilter, topicFilter, sortBy])

  // Custom back button handler
  const handleBack = () => {
    if (tab === 'practice') {
      setTab('overview')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/master')
    }
  }

  return (
    <>
      <PageLayout
      main={
        <>
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white shadow-pop transition-all animate-bounce">
              {toastMessage}
            </div>
          )}

          {/* 1. Header Area */}
          <div className="space-y-3">
            <div>
              {tab === 'practice' ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  <ArrowLeft size={16} /> Back to DSA
                </button>
              ) : (
                <Link
                  to="/master"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  <ArrowLeft size={16} /> Back to Master
                </Link>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3.5">
                {tab === 'practice' ? (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 border border-emerald-200 font-display text-xl font-bold text-emerald-700 shadow-xs">
                    1
                  </span>
                ) : (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 border border-purple-200 text-purple-600 shadow-xs">
                    <Code2 size={24} className="stroke-[2.2]" />
                  </span>
                )}
                <div>
                  <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
                    {tab === 'practice' ? 'Arrays & Strings' : 'DSA - Data Structures & Algorithms'}
                  </h1>
                  <p className="mt-0.5 text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {tab === 'practice'
                      ? 'Strengthen your basics with hands-on practice.'
                      : 'Master problem solving and DSA concepts to build a strong coding foundation.'}
                  </p>
                </div>
              </div>

              {tab === 'practice' && (
                <button
                  type="button"
                  onClick={() => setShowAiModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-600/30 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-brand-600 shadow-xs hover:bg-brand-100/60 hover:border-brand-600 transition-colors self-start sm:self-auto"
                >
                  <Sparkles size={16} className="text-brand-600" />
                  Ask AI Tutor
                </button>
              )}
            </div>
          </div>

          {/* 2. Navigation Tabs */}
          <Tabs items={tabs} value={tab} onChange={setTab} />

          {/* 3. Tab Contents */}
          {tab === 'practice' ? (
            /* ========================================================== */
            /* ===================== PRACTICE TAB ======================= */
            /* ========================================================== */
            <div className="space-y-5">
              {/* Motivation Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 rounded-xl border border-blue-100 bg-blue-50/60 p-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 border border-blue-200">
                    <Target size={20} className="stroke-[2.2]" />
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-ink leading-relaxed">
                    Practice makes perfect! Solve problems to strengthen your concepts and improve your problem solving skills.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTipsModal(true)}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-surface-subtle transition-colors shadow-2xs self-start sm:self-auto"
                >
                  <Lightbulb size={14} className="text-amber-500 fill-amber-400" />
                  View Tips
                </button>
              </div>

              {/* Filters Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Difficulty Filter Pills */}
                <div className="flex items-center gap-1.5">
                  {(['All', 'Easy', 'Medium', 'Hard'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setDifficultyFilter(filter)}
                      className={cn(
                        'rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors',
                        difficultyFilter === filter
                          ? 'border-brand-600 bg-brand-100 text-brand-600'
                          : 'border-line bg-surface text-ink-muted hover:text-ink hover:bg-surface-subtle',
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Topic Dropdown */}
                <div className="ml-auto flex items-center gap-2">
                  <select
                    value={topicFilter}
                    onChange={(e) => setTopicFilter(e.target.value)}
                    aria-label="Topic filter"
                    className="h-9 rounded-xl border border-line bg-surface px-2.5 text-xs font-medium text-ink shadow-2xs focus:border-brand-600 focus:outline-none"
                  >
                    <option>All Topics</option>
                    <option>Arrays</option>
                    <option>Strings</option>
                  </select>

                  {/* Sort By Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort options"
                    className="h-9 rounded-xl border border-line bg-surface px-2.5 text-xs font-medium text-ink shadow-2xs focus:border-brand-600 focus:outline-none"
                  >
                    <option>Recommended</option>
                    <option>Success rate</option>
                    <option>Most solved</option>
                  </select>

                  {/* Filter Icon Button */}
                  <button
                    type="button"
                    aria-label="Additional filters"
                    onClick={() => showToast('Filters refreshed')}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface text-ink-muted hover:text-ink hover:bg-surface-subtle shadow-2xs transition-colors"
                  >
                    <SlidersHorizontal size={15} />
                  </button>
                </div>
              </div>

              {/* Practice Problems List (8 problems from mockup) */}
              <div className="rounded-xl border border-line bg-surface shadow-xs overflow-hidden">
                <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-surface">
                  <h2 className="font-display text-sm font-bold text-ink">Practice Problems</h2>
                  <span className="text-xs text-ink-muted font-medium">
                    {filteredProblems.length} Problems
                  </span>
                </div>

                <ul className="divide-y divide-line">
                  {filteredProblems.map((problem) => (
                    <li
                      key={problem.id}
                      className="flex flex-wrap items-center gap-3 px-4 py-3.5 hover:bg-surface-subtle/80 transition-colors"
                    >
                      <span className="w-5 shrink-0 font-display text-xs font-semibold text-ink-muted">
                        {problem.number}
                      </span>

                      <div className="min-w-0 flex-1">
                        <Link
                          to={problem.link}
                          className="block truncate text-sm font-semibold text-ink hover:text-brand-600 transition-colors"
                        >
                          {problem.title}
                        </Link>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <DifficultyBadge value={problem.difficulty} />
                          <Badge tone="neutral">{problem.topic}</Badge>
                        </div>
                      </div>

                      <div className="hidden sm:block w-24 text-left">
                        <p className="text-[11px] text-ink-muted">Success Rate</p>
                        <p className="font-display text-xs font-bold text-ink">
                          {problem.successRate}%
                        </p>
                      </div>

                      <div className="hidden sm:block w-20 text-left">
                        <p className="text-[11px] text-ink-muted">Solved by</p>
                        <p className="font-display text-xs font-bold text-ink">
                          {problem.solvedBy}
                        </p>
                      </div>

                      {problem.solved ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <Check size={15} strokeWidth={3} className="text-emerald-500" />
                          Solved
                        </span>
                      ) : (
                        <Link
                          to={problem.link}
                          className="inline-flex h-8 items-center justify-center rounded-lg border border-brand-600 bg-white px-3.5 text-xs font-semibold text-brand-600 hover:bg-brand-50 transition-colors shadow-2xs"
                        >
                          Solve
                        </Link>
                      )}

                      <button
                        type="button"
                        aria-label={`Options for ${problem.title}`}
                        onClick={() => showToast(`Options for ${problem.title}`)}
                        className="rounded-lg p-1 text-ink-muted hover:text-ink hover:bg-surface transition-colors"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-line bg-surface p-5 shadow-xs">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 border border-purple-200 shadow-2xs">
                    <Code2 size={20} className="stroke-[2.2]" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-ink">
                      Ready for a challenge?
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Test your skills with timed contests and climb the leaderboard.
                    </p>
                  </div>
                </div>

                <Link
                  to="/compete"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors self-start sm:self-auto"
                >
                  Explore Contests <ArrowRight size={14} />
                </Link>
              </div>

              {/* Bottom Pagination / Stepper */}
              <div className="flex items-center justify-between pt-2 border-t border-line">
                <button
                  type="button"
                  onClick={() => {
                    setTab('overview')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-xs sm:text-sm font-semibold text-ink hover:bg-surface-subtle transition-colors shadow-2xs"
                >
                  <ArrowLeft size={16} /> Previous: Overview
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTab('challenges')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-xs sm:text-sm font-semibold text-ink hover:bg-surface-subtle transition-colors shadow-2xs"
                >
                  Next: Challenges <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : tab === 'challenges' || tab === 'leaderboard' ? (
            <Card className="p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 mb-3">
                <Trophy size={24} />
              </div>
              <h3 className="font-display text-base font-bold text-ink">
                {tab === 'challenges' ? 'Challenges Coming Soon' : 'Leaderboard Coming Soon'}
              </h3>
              <p className="mt-1 text-xs text-ink-muted max-w-sm mx-auto">
                {tab === 'challenges'
                  ? 'Compete in live timed DSA contests, track your rank, and win badges.'
                  : 'See global standings, campus toppers, and peer rankings for this learning path.'}
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setTab('practice')}
                  className="rounded-xl border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-subtle transition-colors"
                >
                  Go to Practice
                </button>
              </div>
            </Card>
          ) : (
            /* ========================================================== */
            /* ===================== OVERVIEW TAB ======================= */
            /* ========================================================== */
            <div className="space-y-6">
              {/* Top Card: Your Progress */}
              <Card className="flex flex-col gap-5 sm:flex-row sm:items-center rounded-xl border border-line bg-surface p-5 shadow-xs">
                <ProgressRing
                  value={60}
                  size={88}
                  strokeWidth={7}
                  accent="brand"
                  caption="Path progress"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-base font-bold text-ink">
                    Your Progress
                  </h2>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    <span className="font-semibold text-ink">24 / 40 Topics Completed</span> · Keep going! You&apos;re on track to master this path.
                  </p>
                  <div className="mt-3">
                    <ProgressBar
                      value={60}
                      accent="brand"
                      label="Topics completed"
                    />
                  </div>
                </div>

                <dl className="grid gap-3 text-xs sm:w-48 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-subtle text-ink-muted">
                      <Clock size={16} />
                    </span>
                    <div>
                      <dt className="text-[11px] text-ink-muted">Estimated time</dt>
                      <dd className="font-display text-xs font-bold text-ink">28h 30m left</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-subtle text-ink-muted">
                      <Target size={16} />
                    </span>
                    <div>
                      <dt className="text-[11px] text-ink-muted">Path level</dt>
                      <dd className="font-display text-xs font-bold text-ink">Intermediate</dd>
                    </div>
                  </div>
                </dl>
              </Card>

              {/* Curriculum Section */}
              <section className="space-y-4">
                <CardHeader
                  title="Curriculum"
                  description="Step-by-step modules to build your DSA expertise."
                  action={
                    <Button
                      variant="subtle"
                      size="sm"
                      onClick={() => showToast('Roadmap download started (PDF)')}
                      leadingIcon={<Download size={14} />}
                      className="rounded-xl"
                    >
                      Download Roadmap
                    </Button>
                  }
                />

                <ul className="space-y-3">
                  {curriculumModulesData.map((module) => {
                    const isOpen = openModule === module.id
                    return (
                      <li
                        key={module.id}
                        className="overflow-hidden rounded-xl border border-line bg-surface shadow-xs transition-colors"
                      >
                        <div className="flex flex-wrap items-center gap-3.5 p-4">
                          {/* Module Number Badge */}
                          <span
                            className={cn(
                              'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold border',
                              module.locked
                                ? 'bg-surface-subtle border-line text-ink-muted'
                                : `${module.badgeColor.bg} ${module.badgeColor.text} ${module.badgeColor.border}`,
                            )}
                          >
                            {module.locked ? <Lock size={14} /> : module.number}
                          </span>

                          {/* Module Info */}
                          <div className="min-w-0 flex-1">
                            <h3 className="font-display text-sm font-bold text-ink">
                              {module.title}
                            </h3>
                            <p className="text-xs text-ink-muted">
                              {module.topicCount} Topics
                            </p>
                          </div>

                          {/* Progress Indicator */}
                          <div className="hidden w-40 sm:block">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={cn('h-full rounded-full transition-all', module.barColor)}
                                style={{ width: `${module.completion}%` }}
                              />
                            </div>
                            <p className="mt-1 text-xs text-ink-muted font-medium">
                              {module.locked ? 'Locked' : `${module.completion}% Completed`}
                            </p>
                          </div>

                          {/* Action Button */}
                          {module.locked ? (
                            <Button
                              variant="subtle"
                              size="sm"
                              disabled
                              leadingIcon={<Lock size={13} />}
                              className="rounded-lg text-xs"
                            >
                              Unlock
                            </Button>
                          ) : (
                            <Button
                              variant={module.actionLabel === 'Review' ? 'secondary' : 'primary'}
                              size="sm"
                              onClick={() => {
                                if (module.id === 'arrays-strings') {
                                  navigate('/master/dsa/arrays')
                                } else {
                                  setTab('practice')
                                  window.scrollTo({ top: 0, behavior: 'smooth' })
                                }
                              }}
                              className="rounded-lg text-xs font-semibold"
                            >
                              {module.actionLabel}
                            </Button>
                          )}

                          {/* Accordion Toggle */}
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-label={`Toggle ${module.title} topics`}
                            disabled={module.locked}
                            onClick={() => setOpenModule(isOpen ? null : module.id)}
                            className="rounded-lg p-1 text-ink-muted hover:bg-surface-subtle disabled:opacity-30 transition-colors"
                          >
                            <ChevronDown
                              size={18}
                              className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
                            />
                          </button>
                        </div>

                        {/* Expanded Topics Container */}
                        {isOpen && module.topics.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 border-t border-line bg-surface-subtle/80 px-4 py-3.5">
                            {module.topics.map((topic) => (
                              <Link
                                key={topic.id}
                                to={topic.id === 'arrays' ? '/master/dsa/arrays' : '#'}
                                className={cn(
                                  'inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink shadow-2xs transition-colors',
                                  topic.id === 'arrays' && 'hover:border-brand-300 hover:text-brand-600',
                                )}
                              >
                                {topic.done ? (
                                  <Check size={13} className="text-emerald-500" strokeWidth={3} />
                                ) : (
                                  <span className="h-2.5 w-2.5 rounded-full border border-line" />
                                )}
                                {topic.title}
                              </Link>
                            ))}

                            {/* View Notes Pill (Module 1 specific requirement) */}
                            {module.id === 'arrays-strings' && (
                              <button
                                type="button"
                                onClick={() => setShowNotesModal(true)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50/80 px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-100 transition-colors shadow-2xs cursor-pointer"
                              >
                                <FileText size={13} className="text-brand-600" />
                                View Notes
                              </button>
                            )}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>

                {/* Bottom Mountain Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-sky-50/70 p-6 sm:p-7 shadow-xs mt-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between relative z-10">
                    <div className="flex items-start gap-3.5 max-w-lg">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                        <Target size={22} className="stroke-[2.2]" />
                      </span>
                      <div>
                        <h4 className="font-display text-sm sm:text-base font-bold text-ink">
                          Master DSA step by step
                        </h4>
                        <p className="mt-0.5 text-xs sm:text-sm text-ink-muted leading-relaxed">
                          Complete previous modules to unlock the next ones. Stay consistent and become a DSA expert!
                        </p>
                      </div>
                    </div>

                    {/* Mountain Illustration with Flag */}
                    <div className="relative shrink-0 flex items-center justify-center self-center sm:self-auto">
                      <svg
                        width="120"
                        height="70"
                        viewBox="0 0 120 70"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-xs"
                      >
                        {/* Background mountain peak */}
                        <polygon points="20,70 55,24 90,70" fill="#c7d2fe" />
                        <polygon points="55,24 64,36 55,42 46,36" fill="#e0e7ff" />
                        {/* Foreground mountain peak */}
                        <polygon points="45,70 80,16 115,70" fill="#3b82f6" />
                        {/* Snow cap */}
                        <polygon points="80,16 90,30 80,36 70,30" fill="#ffffff" />
                        {/* Flagpole & Orange Flag */}
                        <line x1="80" y1="16" x2="80" y2="4" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                        <polygon points="80,4 96,9 80,14" fill="#f97316" />
                      </svg>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </>
      }
      rail={
        tab === 'practice' ? (
          /* ========================================================== */
          /* ================ PRACTICE RIGHT RAIL (Image 5) =========== */
          /* ========================================================== */
          <>
            {/* Your Progress */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">Your Progress</h3>
                <button
                  type="button"
                  onClick={() => showToast('Path progress: 60%')}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  View Details
                </button>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <ProgressRing
                  value={60}
                  size={76}
                  strokeWidth={6}
                  accent="brand"
                  caption="Practice progress"
                />
                <div className="text-xs">
                  <p className="font-display text-base font-bold text-ink">
                    24 / 40
                  </p>
                  <p className="text-[11px] text-ink-muted">Problems Solved</p>
                  <p className="mt-1 text-[11px] font-semibold text-emerald-600">
                    Avg. Success Rate 72%
                  </p>
                </div>
              </div>
            </Card>

            {/* Today's Goal */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">Today&apos;s Goal</h3>
                <button
                  type="button"
                  onClick={() => setShowGoalModal(true)}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  Edit Goal
                </button>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <ProgressRing
                  value={67}
                  size={76}
                  strokeWidth={6}
                  accent="orange"
                  caption="Today's goal"
                />
                <div className="text-xs">
                  <p className="font-display text-base font-bold text-ink">2 / 3</p>
                  <p className="text-[11px] text-ink-muted">Solve 3 problems, Stay consistent!</p>
                </div>
              </div>

              <Button
                onClick={() => {
                  const firstUnsolved = practiceProblemsData.find((p) => !p.solved)
                  if (firstUnsolved) {
                    navigate(firstUnsolved.link)
                  }
                }}
                className="mt-4 w-full rounded-xl text-xs font-semibold"
              >
                Continue Practice
              </Button>
            </Card>

            {/* Stats Overview */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">Stats Overview</h3>
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-2.5">
                {[
                  { label: 'Total Solved', value: '24', icon: Target, tone: 'text-brand-600' },
                  { label: 'Attempted', value: '32', icon: Clock, tone: 'text-purple-600' },
                  { label: 'Best Streak', value: '7 days', icon: Flame, tone: 'text-orange-500' },
                  { label: 'Total Time', value: '4h 25m', icon: Clock, tone: 'text-emerald-600' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-surface-subtle p-3 border border-slate-100">
                    <stat.icon size={16} className={stat.tone} />
                    <dd className="mt-1.5 font-display text-sm font-bold text-ink">
                      {stat.value}
                    </dd>
                    <dt className="text-[11px] text-ink-muted">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </Card>

            {/* Recent Achievements */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">Recent Achievements</h3>
                <button
                  type="button"
                  onClick={() => showToast('All achievements unlocked: 12')}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  View all
                </button>
              </div>

              <ul className="mt-3 space-y-3">
                {[
                  {
                    id: 'consistent',
                    title: 'Consistent Learner',
                    caption: 'Solve problems 7 days in a row',
                    icon: Award,
                    tileColor: 'bg-purple-100 text-purple-600',
                  },
                  {
                    id: 'solver',
                    title: 'Problem Solver',
                    caption: 'Solve 20 problems',
                    icon: Trophy,
                    tileColor: 'bg-orange-100 text-orange-600',
                  },
                ].map((ach) => (
                  <li key={ach.id} className="flex items-center gap-3">
                    <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', ach.tileColor)}>
                      <ach.icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-ink">
                        {ach.title}
                      </p>
                      <p className="truncate text-[11px] text-ink-muted">
                        {ach.caption}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Stuck on a problem? AI Tutor Card */}
            <Card className="relative overflow-hidden rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50/60 to-purple-50/40 p-4 shadow-xs">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-500/20">
                  <Bot size={20} />
                </span>
                <div>
                  <h4 className="font-display text-xs font-bold text-ink">
                    Stuck on a problem?
                  </h4>
                  <p className="mt-0.5 text-[11px] text-ink-muted leading-relaxed">
                    Get hints, explanations and solutions from AI Tutor.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAiModal(true)}
                className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors"
              >
                <Sparkles size={14} /> Ask AI Tutor
              </button>
            </Card>
          </>
        ) : (
          /* ========================================================== */
          /* ================ OVERVIEW RIGHT RAIL (Image 3) =========== */
          /* ========================================================== */
          <>
            {/* Path Overview */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">Path Overview</h3>
                <button
                  type="button"
                  onClick={() => showToast('DSA Path Details')}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  View Details
                </button>
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-2.5">
                {[
                  { label: 'Total Topics', value: '40', icon: BookOpen, tone: 'text-brand-600' },
                  { label: 'Total Problems', value: '300+', icon: Code2, tone: 'text-purple-600' },
                  { label: 'Difficulty Level', value: 'Intermediate', icon: BarChart3, tone: 'text-orange-500' },
                  { label: 'Completion Certificate', value: 'Yes', icon: ShieldCheck, tone: 'text-emerald-600' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-surface-subtle p-3 border border-slate-100">
                    <item.icon size={16} className={item.tone} />
                    <dd className="mt-1.5 font-display text-sm font-bold text-ink">
                      {item.value}
                    </dd>
                    <dt className="text-[11px] text-ink-muted">{item.label}</dt>
                  </div>
                ))}
              </dl>
            </Card>

            {/* Daily Goal */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">Daily Goal</h3>
                <button
                  type="button"
                  onClick={() => setShowGoalModal(true)}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  Edit Goal
                </button>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <ProgressRing
                  value={Math.round((2 / dailyGoalHours) * 100)}
                  size={76}
                  strokeWidth={6}
                  accent="orange"
                  caption="Daily goal"
                />
                <div className="text-xs">
                  <p className="font-display text-base font-bold text-ink">
                    2 / {dailyGoalHours} hrs
                  </p>
                  <p className="text-[11px] text-ink-muted">Today&apos;s Focus: Arrays &amp; Strings</p>
                </div>
              </div>

              <Button
                onClick={() => {
                  setTab('practice')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="mt-4 w-full rounded-xl text-xs font-semibold"
              >
                Start Learning
              </Button>
            </Card>

            {/* Current Streak */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">Current Streak</h3>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Flame size={20} className="text-orange-500 fill-orange-500" />
                <span className="font-display text-lg font-bold text-ink">12 days</span>
                <span className="rounded-md bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-600">
                  You&apos;re on fire!
                </span>
              </div>

              {/* Mon-Sun calendar dots with dates 19, 20, 21, 22, 23, 24, 25 */}
              <ul className="mt-4 flex justify-between">
                {[
                  { day: 'M', date: 19, status: 'checked' },
                  { day: 'T', date: 20, status: 'checked' },
                  { day: 'W', date: 21, status: 'checked' },
                  { day: 'T', date: 22, status: 'checked' },
                  { day: 'F', date: 23, status: 'checked' },
                  { day: 'S', date: 24, status: 'active' },
                  { day: 'S', date: 25, status: 'upcoming' },
                ].map((item) => (
                  <li key={`${item.day}-${item.date}`} className="text-center">
                    <span className="block text-[11px] font-medium text-ink-muted">{item.day}</span>
                    <span
                      className={cn(
                        'mt-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-transform hover:scale-105',
                        item.status === 'checked'
                          ? 'bg-brand-600 text-white'
                          : item.status === 'active'
                            ? 'bg-orange-500 text-white shadow-xs shadow-orange-400/40 ring-2 ring-orange-200'
                            : 'bg-surface-subtle border border-line text-ink-muted',
                      )}
                    >
                      {item.status === 'checked' ? (
                        <Check size={13} strokeWidth={3} />
                      ) : item.status === 'active' ? (
                        <Flame size={13} className="fill-white" />
                      ) : (
                        item.date
                      )}
                    </span>
                    <span className="block text-[9px] text-ink-muted mt-0.5">{item.date}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Upcoming Live Sessions */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Upcoming Live Sessions
                </h3>
                <button
                  type="button"
                  onClick={() => showToast('View all live sessions')}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  View all
                </button>
              </div>

              <ul className="mt-3 space-y-3">
                {[
                  {
                    id: 'binary-trees',
                    title: 'Binary Trees | Live Session',
                    meta: 'Rahul Sharma · 24 May, 7:00 PM',
                  },
                  {
                    id: 'dp-strings',
                    title: 'DP on Strings | Live Session',
                    meta: 'Priya Verma · 26 May, 6:00 PM',
                  },
                ].map((session) => (
                  <li key={session.id} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 border border-purple-200 shadow-2xs">
                      <Video size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-ink">
                        {session.title}
                      </p>
                      <p className="truncate text-[11px] text-ink-muted">{session.meta}</p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => showToast(`Registered for ${session.title}`)}
                      className="rounded-lg text-xs px-2.5 h-7"
                    >
                      Join
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Recommended Resources */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Recommended Resources
                </h3>
                <button
                  type="button"
                  onClick={() => showToast('View all resources')}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  View all
                </button>
              </div>

              <ul className="mt-3 space-y-3">
                {[
                  {
                    id: 'res-1',
                    title: 'DSA Roadmap for Beginners',
                    meta: 'Article · 10 min read',
                    icon: BookOpen,
                  },
                  {
                    id: 'res-2',
                    title: 'Top 50 DSA Problems',
                    meta: 'PDF · 2.4 MB',
                    icon: FileText,
                  },
                ].map((resource) => {
                  const isBookmarked = bookmarkedResources.includes(resource.id)
                  return (
                    <li
                      key={resource.id}
                      className="flex items-center justify-between rounded-xl bg-surface-subtle p-2.5 border border-slate-100"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface border border-line text-brand-600">
                          <resource.icon size={15} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-ink">
                            {resource.title}
                          </p>
                          <p className="text-[11px] text-ink-muted">{resource.meta}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label={`Bookmark ${resource.title}`}
                        onClick={() => toggleBookmark(resource.id)}
                        className="rounded-lg p-1.5 text-ink-muted hover:text-brand-600 transition-colors ml-2"
                      >
                        <Bookmark
                          size={16}
                          className={isBookmarked ? 'fill-brand-600 text-brand-600' : ''}
                        />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </Card>
          </>
        )
      }
    />

    {/* AI Tutor Modal */}
    {showAiModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-xs">
        <div className="w-full max-w-lg rounded-2xl border border-line bg-surface p-6 shadow-pop animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start justify-between pb-4 border-b border-line">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-500/20">
                <Bot size={20} />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">AI Tutor Assistant</h3>
                <p className="text-xs text-ink-muted">Get hints, explanations, and code guidance</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAiModal(false)}
              className="rounded-lg p-1.5 text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded-xl bg-surface-subtle border border-slate-100 p-3.5">
              <p className="text-xs font-semibold text-ink">Suggested Questions:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  'Explain two-pointer pattern',
                  'How does hash map optimize Two Sum?',
                  'When to use sliding window?',
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      showToast(`AI Tutor: "${q}" answered!`)
                      setShowAiModal(false)
                    }}
                    className="rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink hover:border-brand-600 hover:text-brand-600 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="ai-question" className="block text-xs font-semibold text-ink">
                Your Question
              </label>
              <textarea
                id="ai-question"
                rows={3}
                placeholder="Ask about a problem, algorithm or data structure..."
                className="mt-1.5 w-full rounded-xl border border-line bg-surface p-3 text-xs text-ink placeholder:text-ink-muted focus:border-brand-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button variant="subtle" size="sm" onClick={() => setShowAiModal(false)} className="rounded-xl">
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                leadingIcon={<Sparkles size={14} />}
                onClick={() => {
                  showToast('AI Tutor is analyzing your query...')
                  setShowAiModal(false)
                }}
                className="rounded-xl"
              >
                Ask Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Notes Modal */}
    {showNotesModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-xs">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-line bg-surface p-6 shadow-pop animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start justify-between pb-4 border-b border-line">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
                <FileText size={20} />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">Arrays &amp; Strings — Revision Notes</h3>
                <p className="text-xs text-ink-muted">Core concepts, memory patterns &amp; complexities</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowNotesModal(false)}
              className="rounded-lg p-1.5 text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-4 text-xs text-ink">
            <div className="rounded-xl bg-surface-subtle p-4 border border-slate-100">
              <h4 className="font-display font-bold text-ink text-sm">1. Array Fundamentals &amp; Memory</h4>
              <p className="mt-1 text-ink-muted leading-relaxed">
                Arrays allocate a contiguous block of memory. Access by index is <span className="font-mono font-semibold text-brand-600">O(1)</span> due to pointer arithmetic: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-line">addr = base + i * size</code>. Inserting or deleting elements at arbitrary positions requires shifting elements, resulting in <span className="font-mono font-semibold text-amber-600">O(N)</span>.
              </p>
            </div>

            <div className="rounded-xl bg-surface-subtle p-4 border border-slate-100">
              <h4 className="font-display font-bold text-ink text-sm">2. Two-Pointer Technique</h4>
              <p className="mt-1 text-ink-muted leading-relaxed">
                Ideal for sorted arrays. Initialize one pointer at the start and one at the end. Move inward based on comparison:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-ink-muted pl-1">
                <li><strong className="text-ink">Pair Sum:</strong> If sum &lt; target, advance left; if sum &gt; target, decrement right.</li>
                <li><strong className="text-ink">In-Place Compaction:</strong> Slow pointer keeps track of valid elements, fast pointer scans ahead.</li>
              </ul>
            </div>

            <div className="rounded-xl bg-surface-subtle p-4 border border-slate-100">
              <h4 className="font-display font-bold text-ink text-sm">3. Sliding Window Pattern</h4>
              <p className="mt-1 text-ink-muted leading-relaxed">
                Used for contiguous subarray problems (maximum sum subarray of size k, longest substring with distinct characters). Expands the right boundary and contracts the left boundary to maintain window validity in <span className="font-mono font-semibold text-brand-600">O(N)</span> time.
              </p>
            </div>

            <div className="rounded-xl bg-surface-subtle p-4 border border-slate-100">
              <h4 className="font-display font-bold text-ink text-sm">4. String Immutability</h4>
              <p className="mt-1 text-ink-muted leading-relaxed">
                In languages like Java and Python, strings are immutable. Frequent concatenation creates new string objects in <span className="font-mono font-semibold text-amber-600">O(N^2)</span>. Always use a character list or StringBuilder to achieve <span className="font-mono font-semibold text-brand-600">O(N)</span> performance.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-line">
            <span className="text-[11px] text-ink-muted">Page 1 of 1 · DSA Module 1 Notes</span>
            <div className="flex gap-2">
              <Button
                variant="subtle"
                size="sm"
                onClick={() => {
                  showToast('Notes downloaded as PDF')
                  setShowNotesModal(false)
                }}
                leadingIcon={<Download size={13} />}
                className="rounded-xl text-xs"
              >
                Download PDF
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowNotesModal(false)}
                className="rounded-xl text-xs"
              >
                Got It
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Tips Modal */}
    {showTipsModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-xs">
        <div className="w-full max-w-lg rounded-2xl border border-line bg-surface p-6 shadow-pop animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start justify-between pb-4 border-b border-line">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 border border-amber-200">
                <Lightbulb size={20} className="fill-amber-400" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">DSA Practice Tips</h3>
                <p className="text-xs text-ink-muted">Strategies to solve coding problems faster</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowTipsModal(false)}
              className="rounded-lg p-1.5 text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {[
              {
                title: '1. Read Input Constraints First',
                desc: 'If N <= 10^5, aim for O(N) or O(N log N). Avoid O(N^2) nested loops.',
              },
              {
                title: '2. Check Edge Cases Early',
                desc: 'Consider empty array, 1-element input, all negative numbers, and duplicates.',
              },
              {
                title: '3. Use Hash Map for O(1) Lookups',
                desc: 'Trading O(N) space for O(N) time with a hash map solves Two Sum and frequency problems.',
              },
              {
                title: '4. Dry-Run Before Coding',
                desc: 'Trace variables step by step with sample input on paper before typing.',
              },
            ].map((tip) => (
              <div key={tip.title} className="rounded-xl bg-surface-subtle p-3.5 border border-slate-100">
                <p className="font-display text-xs font-bold text-ink">{tip.title}</p>
                <p className="mt-0.5 text-[11px] text-ink-muted leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setShowTipsModal(false)} className="rounded-xl text-xs">
              Close
            </Button>
          </div>
        </div>
      </div>
    )}

    {/* Goal Edit Modal */}
    {showGoalModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-xs">
        <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-6 shadow-pop animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start justify-between pb-4 border-b border-line">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 border border-orange-200">
                <Target size={20} />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">Edit Daily Goal</h3>
                <p className="text-xs text-ink-muted">Set your study target</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowGoalModal(false)}
              className="rounded-lg p-1.5 text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <label className="block text-xs font-semibold text-ink">Target Hours per Day</label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => setDailyGoalHours(hours)}
                  className={cn(
                    'rounded-xl border py-2 text-xs font-bold transition-colors',
                    dailyGoalHours === hours
                      ? 'border-brand-600 bg-brand-100 text-brand-600'
                      : 'border-line bg-surface text-ink-muted hover:text-ink',
                  )}
                >
                  {hours}h
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-2 pt-2 border-t border-line">
            <Button variant="subtle" size="sm" onClick={() => setShowGoalModal(false)} className="rounded-xl text-xs">
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                showToast(`Daily goal updated to ${dailyGoalHours} hours`)
                setShowGoalModal(false)
              }}
              className="rounded-xl text-xs"
            >
              Save Target
            </Button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

