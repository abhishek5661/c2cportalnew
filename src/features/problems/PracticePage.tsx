import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Code2,
  Flame,
  HelpCircle,
  Layers,
  MessageSquare,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from 'lucide-react'
import { PageLayout } from '../../components/layout/AppShell'
import { Card } from '../../components/ui/Card'
import { cn } from '../../lib/cn'

interface ProblemItem {
  id: string
  number: number
  title: string
  tags: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  acceptance: string
  solvedBy: string
  solved: boolean
}

const initialProblems: ProblemItem[] = [
  {
    id: 'two-sum',
    number: 1,
    title: 'Two Sum',
    tags: ['Array', 'Hash Table'],
    difficulty: 'Easy',
    acceptance: '53.89%',
    solvedBy: '123.4K',
    solved: true,
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    number: 2,
    title: 'Best Time to Buy and Sell Stock',
    tags: ['Array', 'DP'],
    difficulty: 'Easy',
    acceptance: '62.45%',
    solvedBy: '98.7K',
    solved: true,
  },
  {
    id: 'maximum-subarray',
    number: 3,
    title: 'Maximum Subarray',
    tags: ['Array', 'DP', 'Divide & Conquer'],
    difficulty: 'Medium',
    acceptance: '57.15%',
    solvedBy: '87.2K',
    solved: true,
  },
  {
    id: 'merge-overlapping-intervals',
    number: 4,
    title: 'Merge Overlapping Intervals',
    tags: ['Array', 'Intervals', 'Sorting'],
    difficulty: 'Medium',
    acceptance: '64.82%',
    solvedBy: '76.1K',
    solved: false,
  },
  {
    id: 'product-of-array-except-self',
    number: 5,
    title: 'Product of Array Except Self',
    tags: ['Array', 'Prefix Sum'],
    difficulty: 'Medium',
    acceptance: '58.01%',
    solvedBy: '72.6K',
    solved: false,
  },
  {
    id: 'trapping-rain-water',
    number: 6,
    title: 'Trapping Rain Water',
    tags: ['Array', 'Stack', 'Two Pointers'],
    difficulty: 'Hard',
    acceptance: '45.73%',
    solvedBy: '61.3K',
    solved: false,
  },
  {
    id: 'median-of-two-sorted-arrays',
    number: 7,
    title: 'Median of Two Sorted Arrays',
    tags: ['Array', 'Binary Search', 'Divide & Conquer'],
    difficulty: 'Hard',
    acceptance: '47.65%',
    solvedBy: '55.8K',
    solved: false,
  },
  {
    id: 'container-with-most-water',
    number: 8,
    title: 'Container With Most Water',
    tags: ['Array', 'Two Pointers'],
    difficulty: 'Medium',
    acceptance: '54.32%',
    solvedBy: '68.4K',
    solved: false,
  },
  {
    id: '3sum',
    number: 9,
    title: '3Sum',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    difficulty: 'Medium',
    acceptance: '34.12%',
    solvedBy: '89.5K',
    solved: false,
  },
  {
    id: 'rotate-image',
    number: 10,
    title: 'Rotate Image',
    tags: ['Array', 'Math'],
    difficulty: 'Easy',
    acceptance: '71.20%',
    solvedBy: '51.2K',
    solved: false,
  },
]

const topicOptions = [
  'Arrays',
  'Strings',
  'Linked List',
  'Stacks & Queues',
  'Trees',
  'Dynamic Programming',
  'Graphs',
  'All Topics',
]

const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard']
const statusOptions = ['All', 'Solved', 'Unsolved']
const tagOptions = [
  'All Tags',
  'Array',
  'Hash Table',
  'DP',
  'Divide & Conquer',
  'Intervals',
  'Sorting',
  'Prefix Sum',
  'Stack',
  'Two Pointers',
  'Binary Search',
  'Math',
]

const navTabs = [
  'Overview',
  'Learn',
  'Practice',
  'Contests',
  'Problems',
  'Company Tags',
  'Analytics',
  'Bookmarks',
]

export function PracticePage() {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState('Practice')

  // Filter states
  const [topic, setTopic] = useState('Arrays')
  const [difficulty, setDifficulty] = useState('All')
  const [status, setStatus] = useState('All')
  const [tag, setTag] = useState('All Tags')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilterDrawer, setShowFilterDrawer] = useState(false)

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    new Set(['two-sum', 'longest-consecutive-sequence']),
  )

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Help Modal state
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [helpSubmitted, setHelpSubmitted] = useState(false)
  const [helpQuestion, setHelpQuestion] = useState('')

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2400)
  }

  const toggleBookmark = (id: string, title: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        showToast(`Removed "${title}" from bookmarks`)
      } else {
        next.add(id)
        showToast(`Saved "${title}" to bookmarks`)
      }
      return next
    })
  }

  // Filter logic
  const filteredProblems = useMemo(() => {
    return initialProblems.filter((p) => {
      // Topic match: If specific topic (e.g. Arrays), check if tags or problem topic contains it
      if (topic !== 'All Topics') {
        const matchesTopic =
          topic === 'Arrays'
            ? p.tags.includes('Array') || p.tags.includes('Arrays')
            : p.tags.some((t) => t.toLowerCase().includes(topic.toLowerCase()))
        if (!matchesTopic) return false
      }

      // Difficulty match
      if (difficulty !== 'All' && p.difficulty !== difficulty) {
        return false
      }

      // Status match
      if (status === 'Solved' && !p.solved) return false
      if (status === 'Unsolved' && p.solved) return false

      // Tag match
      if (tag !== 'All Tags') {
        if (!p.tags.includes(tag)) return false
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchTitle = p.title.toLowerCase().includes(q)
        const matchTag = p.tags.some((t) => t.toLowerCase().includes(q))
        if (!matchTitle && !matchTag) return false
      }

      return true
    })
  }, [topic, difficulty, status, tag, searchQuery])

  // Clear all filters handler
  const handleClearAllFilters = () => {
    setTopic('Arrays')
    setDifficulty('All')
    setStatus('All')
    setTag('All Tags')
    setSearchQuery('')
    showToast('Filters reset to default')
  }

  // Check which filters are active for right rail
  const appliedFilterChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = []

    if (topic) {
      chips.push({
        label: `Topic: ${topic}`,
        onRemove: () => setTopic('All Topics'),
      })
    }

    if (status !== 'All') {
      chips.push({
        label: `Status: ${status}`,
        onRemove: () => setStatus('All'),
      })
    } else {
      chips.push({
        label: 'Status: All',
        onRemove: () => setStatus('All'),
      })
    }

    if (difficulty !== 'All') {
      chips.push({
        label: `Difficulty: ${difficulty}`,
        onRemove: () => setDifficulty('All'),
      })
    }

    if (tag !== 'All Tags') {
      chips.push({
        label: `Tag: ${tag}`,
        onRemove: () => setTag('All Tags'),
      })
    }

    if (searchQuery.trim()) {
      chips.push({
        label: `Search: "${searchQuery}"`,
        onRemove: () => setSearchQuery(''),
      })
    }

    return chips
  }, [topic, status, difficulty, tag, searchQuery])

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-semibold text-white shadow-pop transition-all">
          <Check size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header: Code icon tile + Title + Subtitle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 text-white shadow-sm ring-1 ring-purple-400/20">
            <Code2 size={24} className="stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
                DSA &amp; Coding
              </h1>
              <span className="hidden sm:inline-flex items-center rounded-full bg-brand-100/70 px-2.5 py-0.5 text-[11px] font-semibold text-brand-700">
                Core Pillar
              </span>
            </div>
            <p className="mt-0.5 text-sm text-ink-muted leading-relaxed">
              Master problem solving. Build strong DSA fundamentals.
            </p>
          </div>
        </div>

        {/* Quick action: filters or search toggle on mobile */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink hover:border-brand-600/30 hover:bg-surface-subtle transition-colors shadow-2xs"
          >
            <HelpCircle size={15} className="text-brand-600" />
            <span>Need Help?</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="border-b border-line">
        <nav className="-mb-px flex space-x-1 overflow-x-auto scrollbar-none py-1" aria-label="Tabs">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab)
                  if (tab !== 'Practice') {
                    showToast(`Switched to ${tab} tab`)
                  }
                }}
                className={cn(
                  'whitespace-nowrap rounded-t-lg border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-brand-600 font-semibold text-brand-600'
                    : 'border-transparent text-ink-muted hover:border-line hover:text-ink',
                )}
              >
                {tab}
                {tab === 'Practice' && (
                  <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-bold text-brand-600">
                    Active
                  </span>
                )}
                {tab === 'Bookmarks' && bookmarkedIds.size > 0 && (
                  <span className="ml-1.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                    {bookmarkedIds.size}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Two-Column Layout */}
      <PageLayout
        main={
          <div className="space-y-6">
            {/* 4 Category Stats Cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {/* Card 1: Easy */}
              <div className="group relative flex flex-col justify-between rounded-xl border border-line bg-surface p-4 shadow-card hover:border-emerald-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100/80 text-emerald-600 border border-emerald-200/80">
                    <CheckCircle2 size={20} className="stroke-[2.2]" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Easy
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-medium text-ink-muted">Solved</p>
                  <p className="font-display text-2xl font-bold tracking-tight text-ink">
                    128
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="h-2 w-2 rounded-full bg-emerald-200" />
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700">
                    71% rate
                  </span>
                </div>
              </div>

              {/* Card 2: Medium */}
              <div className="group relative flex flex-col justify-between rounded-xl border border-line bg-surface p-4 shadow-card hover:border-amber-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100/80 text-amber-600 border border-amber-200/80">
                    <Briefcase size={20} className="stroke-[2.2]" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Medium
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-medium text-ink-muted">Solved</p>
                  <p className="font-display text-2xl font-bold tracking-tight text-ink">
                    215
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="h-2 w-2 rounded-full bg-amber-200" />
                  </div>
                  <span className="text-[11px] font-medium text-amber-700">
                    52% rate
                  </span>
                </div>
              </div>

              {/* Card 3: Hard */}
              <div className="group relative flex flex-col justify-between rounded-xl border border-line bg-surface p-4 shadow-card hover:border-rose-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100/80 text-rose-600 border border-rose-200/80">
                    <Target size={20} className="stroke-[2.2]" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    Hard
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-medium text-ink-muted">Solved</p>
                  <p className="font-display text-2xl font-bold tracking-tight text-ink">
                    69
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span className="h-2 w-2 rounded-full bg-rose-200" />
                    <span className="h-2 w-2 rounded-full bg-rose-200" />
                  </div>
                  <span className="text-[11px] font-medium text-rose-700">
                    38% rate
                  </span>
                </div>
              </div>

              {/* Card 4: All Problems */}
              <div className="group relative flex flex-col justify-between rounded-xl border border-line bg-surface p-4 shadow-card hover:border-purple-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100/80 text-purple-600 border border-purple-200/80">
                    <Flame size={20} className="stroke-[2.2]" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    All Problems
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-medium text-ink-muted">Solved</p>
                  <p className="font-display text-2xl font-bold tracking-tight text-ink">
                    412
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                  </div>
                  <span className="text-[11px] font-medium text-purple-700">
                    71.8% rate
                  </span>
                </div>
              </div>
            </div>

            {/* 3 & 5. Practice Problems Card with Header, Filters & Table */}
            <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
              {/* Practice Problems Header */}
              <div className="border-b border-line px-5 py-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-lg font-bold text-ink">
                      Practice Problems
                    </h2>
                    <p className="text-xs sm:text-sm text-ink-muted">
                      Sharpen your skills by solving handpicked problems.
                    </p>
                  </div>
                  <span className="self-start rounded-md bg-surface-subtle px-2.5 py-1 text-xs font-medium text-ink-muted border border-line sm:self-auto">
                    {filteredProblems.length} Problems visible
                  </span>
                </div>

                {/* Filter Bar */}
                <div className="mt-4 flex flex-wrap items-center gap-2.5 pt-1">
                  {/* Topic / Arrays Dropdown */}
                  <div className="relative min-w-[130px]">
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      aria-label="Topic"
                      className="h-9 w-full appearance-none rounded-lg border border-line bg-surface pl-3 pr-8 text-xs sm:text-sm font-medium text-ink transition-colors hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                    >
                      {topicOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
                    />
                  </div>

                  {/* Difficulty Dropdown */}
                  <div className="relative min-w-[110px]">
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      aria-label="Difficulty"
                      className="h-9 w-full appearance-none rounded-lg border border-line bg-surface pl-3 pr-8 text-xs sm:text-sm font-medium text-ink transition-colors hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                    >
                      <option value="All">Difficulty: All</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
                    />
                  </div>

                  {/* Status Dropdown */}
                  <div className="relative min-w-[100px]">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      aria-label="Status"
                      className="h-9 w-full appearance-none rounded-lg border border-line bg-surface pl-3 pr-8 text-xs sm:text-sm font-medium text-ink transition-colors hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                    >
                      <option value="All">Status: All</option>
                      <option value="Solved">Solved</option>
                      <option value="Unsolved">Unsolved</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
                    />
                  </div>

                  {/* Tags Dropdown */}
                  <div className="relative min-w-[110px]">
                    <select
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      aria-label="Tags"
                      className="h-9 w-full appearance-none rounded-lg border border-line bg-surface pl-3 pr-8 text-xs sm:text-sm font-medium text-ink transition-colors hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                    >
                      {tagOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
                    />
                  </div>

                  {/* Search problems... input field */}
                  <div className="relative min-w-[180px] flex-1">
                    <Search
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search problems..."
                      className="h-9 w-full rounded-lg border border-line bg-surface-subtle pl-9 pr-8 text-xs sm:text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:bg-surface focus:outline-none transition-colors"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-ink-muted hover:text-ink"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>

                  {/* Filters button with SlidersHorizontal */}
                  <button
                    type="button"
                    onClick={() => setShowFilterDrawer((prev) => !prev)}
                    className={cn(
                      'inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs sm:text-sm font-medium transition-colors',
                      showFilterDrawer || difficulty !== 'All' || tag !== 'All Tags'
                        ? 'border-brand-600 bg-brand-100/60 text-brand-600'
                        : 'border-line bg-surface text-ink hover:bg-surface-subtle',
                    )}
                    aria-label="Additional filters"
                  >
                    <SlidersHorizontal size={15} />
                    <span className="hidden sm:inline">Filters</span>
                  </button>
                </div>

                {/* Optional Expandable Filters row */}
                {showFilterDrawer && (
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-surface-subtle p-3 border border-line text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-ink">Quick presets:</span>
                      {difficultyOptions.map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setDifficulty(lvl)}
                          className={cn(
                            'rounded-md px-2.5 py-1 transition-colors font-medium',
                            difficulty === lvl
                              ? 'bg-brand-600 text-white'
                              : 'bg-surface border border-line text-ink-muted hover:text-ink',
                          )}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleClearAllFilters}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
                    >
                      <RotateCcw size={12} /> Reset all
                    </button>
                  </div>
                )}
              </div>

              {/* Problems Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-surface-subtle text-xs font-semibold text-ink-muted uppercase tracking-wider">
                      <th scope="col" className="py-3.5 pl-5 pr-4">
                        Problem
                      </th>
                      <th scope="col" className="px-4 py-3.5">
                        Difficulty
                      </th>
                      <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                        Acceptance
                      </th>
                      <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                        Solved By
                      </th>
                      <th scope="col" className="px-4 py-3.5">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-center">
                        Action
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-5 text-center">
                        Bookmark
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {filteredProblems.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center">
                          <p className="text-sm font-medium text-ink">
                            No problems found matching your filters.
                          </p>
                          <p className="mt-1 text-xs text-ink-muted">
                            Try resetting your topic, difficulty, or search query.
                          </p>
                          <button
                            type="button"
                            onClick={handleClearAllFilters}
                            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-brand-600 px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-100"
                          >
                            Reset filters
                          </button>
                        </td>
                      </tr>
                    ) : (
                      filteredProblems.map((prob) => {
                        const isBookmarked = bookmarkedIds.has(prob.id)
                        return (
                          <tr
                            key={prob.id}
                            className="group hover:bg-surface-subtle/80 transition-colors"
                          >
                            {/* Problem title & tags */}
                            <td className="py-3.5 pl-5 pr-4">
                              <div className="flex items-start gap-2.5">
                                <span className="text-xs font-semibold text-ink-muted pt-0.5 w-5 shrink-0">
                                  {prob.number}.
                                </span>
                                <div>
                                  <Link
                                    to={`/practice/${prob.id}`}
                                    className="font-display font-semibold text-ink hover:text-brand-600 transition-colors"
                                  >
                                    {prob.title}
                                  </Link>
                                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                                    {prob.tags.map((t) => (
                                      <span
                                        key={t}
                                        className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                                      >
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Difficulty */}
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              {prob.difficulty === 'Easy' && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  Easy
                                </span>
                              )}
                              {prob.difficulty === 'Medium' && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                  Medium
                                </span>
                              )}
                              {prob.difficulty === 'Hard' && (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
                                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                                  Hard
                                </span>
                              )}
                            </td>

                            {/* Acceptance */}
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="font-medium text-ink">
                                {prob.acceptance}
                              </span>
                            </td>

                            {/* Solved By */}
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className="font-medium text-ink">
                                {prob.solvedBy}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              {prob.solved ? (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                  <CheckCircle2 size={16} className="stroke-[2.2]" />
                                  <span>Solved</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                                  <Circle size={14} className="stroke-[1.8] text-slate-400" />
                                  <span>Unsolved</span>
                                </span>
                              )}
                            </td>

                            {/* Action */}
                            <td className="px-4 py-3.5 text-center whitespace-nowrap">
                              {prob.solved ? (
                                <Link
                                  to={`/practice/${prob.id}`}
                                  className="inline-flex items-center justify-center rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-2xs hover:border-brand-600 hover:bg-brand-100/40 hover:text-brand-600 transition-colors"
                                >
                                  Solve Again
                                </Link>
                              ) : (
                                <Link
                                  to={`/practice/${prob.id}`}
                                  className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-brand-700 transition-colors"
                                >
                                  Solve
                                </Link>
                              )}
                            </td>

                            {/* Bookmark */}
                            <td className="py-3.5 pl-4 pr-5 text-center whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => toggleBookmark(prob.id, prob.title)}
                                aria-label={`Bookmark ${prob.title}`}
                                className={cn(
                                  'rounded-lg p-1.5 transition-colors',
                                  isBookmarked
                                    ? 'text-amber-500 hover:bg-amber-50'
                                    : 'text-ink-muted hover:bg-surface hover:text-ink',
                                )}
                              >
                                <Bookmark
                                  size={16}
                                  className={cn(
                                    isBookmarked && 'fill-amber-400 text-amber-500',
                                  )}
                                />
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Bar */}
              <div className="flex flex-col gap-3 border-t border-line px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-ink-muted">
                {/* Left: Rows per page */}
                <div className="flex items-center gap-2">
                  <span>Rows per page:</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    aria-label="Rows per page"
                    className="h-8 rounded-md border border-line bg-surface px-2 text-xs font-medium text-ink focus:border-brand-500 focus:outline-none"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                {/* Center: Showing count */}
                <div className="text-center font-medium">
                  Showing 1 to {Math.min(filteredProblems.length, 10)} of 128
                </div>

                {/* Right: Pagination controls */}
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-ink-muted hover:bg-surface-subtle disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold',
                      currentPage === 1
                        ? 'bg-brand-600 text-white'
                        : 'border border-line bg-surface text-ink hover:bg-surface-subtle',
                    )}
                  >
                    1
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentPage(2)}
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold',
                      currentPage === 2
                        ? 'bg-brand-600 text-white'
                        : 'border border-line bg-surface text-ink hover:bg-surface-subtle',
                    )}
                  >
                    2
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentPage(3)}
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold',
                      currentPage === 3
                        ? 'bg-brand-600 text-white'
                        : 'border border-line bg-surface text-ink hover:bg-surface-subtle',
                    )}
                  >
                    3
                  </button>

                  <span className="px-1 text-ink-muted">...</span>

                  <button
                    type="button"
                    onClick={() => setCurrentPage(13)}
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold',
                      currentPage === 13
                        ? 'bg-brand-600 text-white'
                        : 'border border-line bg-surface text-ink hover:bg-surface-subtle',
                    )}
                  >
                    13
                  </button>

                  <button
                    type="button"
                    disabled={currentPage === 13}
                    onClick={() => setCurrentPage((p) => Math.min(13, p + 1))}
                    aria-label="Next page"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-ink-muted hover:bg-surface-subtle disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
        /* 6. Right Rail */
        rail={
          <div className="space-y-6">
            {/* Rail 1: Filters Applied */}
            <Card className="p-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="font-display text-sm font-bold text-ink">
                  Filters Applied
                </h3>
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {appliedFilterChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-subtle px-2.5 py-1 text-xs font-medium text-ink"
                  >
                    <span>{chip.label}</span>
                    <button
                      type="button"
                      onClick={chip.onRemove}
                      aria-label={`Remove filter ${chip.label}`}
                      className="rounded p-0.5 text-ink-muted hover:bg-surface hover:text-ink"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </Card>

            {/* Rail 2: Quick Stats */}
            <Card className="p-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="font-display text-sm font-bold text-ink">
                  Quick Stats
                </h3>
                <Link
                  to="/analytics"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                >
                  View Analytics <ArrowRight size={12} />
                </Link>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                {/* Total Problems */}
                <div className="rounded-xl border border-line bg-surface-subtle p-3">
                  <div className="flex items-center gap-1.5 text-ink-muted">
                    <Layers size={14} className="text-brand-600" />
                    <span className="text-[11px] font-medium">Total Problems</span>
                  </div>
                  <p className="mt-1.5 font-display text-lg font-bold text-ink">
                    412
                  </p>
                </div>

                {/* Solved */}
                <div className="rounded-xl border border-line bg-surface-subtle p-3">
                  <div className="flex items-center gap-1.5 text-ink-muted">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span className="text-[11px] font-medium">Solved</span>
                  </div>
                  <p className="mt-1.5 font-display text-lg font-bold text-emerald-600">
                    296
                  </p>
                </div>

                {/* Unsolved */}
                <div className="rounded-xl border border-line bg-surface-subtle p-3">
                  <div className="flex items-center gap-1.5 text-ink-muted">
                    <Circle size={14} className="text-slate-400" />
                    <span className="text-[11px] font-medium">Unsolved</span>
                  </div>
                  <p className="mt-1.5 font-display text-lg font-bold text-ink">
                    116
                  </p>
                </div>

                {/* Attempt Rate */}
                <div className="rounded-xl border border-line bg-surface-subtle p-3">
                  <div className="flex items-center gap-1.5 text-ink-muted">
                    <TrendingUp size={14} className="text-purple-600" />
                    <span className="text-[11px] font-medium">Attempt Rate</span>
                  </div>
                  <p className="mt-1.5 font-display text-lg font-bold text-purple-600">
                    71.8%
                  </p>
                </div>
              </div>
            </Card>

            {/* Rail 3: Pick Up Where You Left */}
            <Card className="p-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="font-display text-sm font-bold text-ink">
                  Pick Up Where You Left
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    toggleBookmark('longest-consecutive-sequence', 'Longest Consecutive Sequence')
                  }
                  className="rounded p-1 text-ink-muted hover:text-amber-500"
                  aria-label="Bookmark problem"
                >
                  <Bookmark
                    size={16}
                    className={cn(
                      bookmarkedIds.has('longest-consecutive-sequence') &&
                        'fill-amber-400 text-amber-500',
                    )}
                  />
                </button>
              </div>

              <div className="mt-3.5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-display text-sm font-bold text-ink">
                      Longest Consecutive Sequence
                    </h4>
                    <p className="text-xs text-ink-muted">
                      Array · Hash Table · Union Find
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Medium
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-muted">
                    <span>Progress</span>
                    <span className="font-semibold text-ink">60%</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-600 transition-all"
                      style={{ width: '60%' }}
                    />
                  </div>
                </div>

                <Link
                  to="/practice/two-sum"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-brand-700 transition-colors"
                >
                  <span>Continue Solving</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </Card>

            {/* Rail 4: Recommended for You */}
            <Card className="p-4">
              <div className="border-b border-line pb-3">
                <h3 className="font-display text-sm font-bold text-ink">
                  Recommended for You
                </h3>
              </div>

              <div className="mt-3 divide-y divide-line">
                {/* Problem 1 */}
                <div className="py-2.5 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to="/practice/container-with-most-water"
                        className="font-display text-xs sm:text-sm font-semibold text-ink hover:text-brand-600 transition-colors"
                      >
                        Container With Most Water
                      </Link>
                      <p className="text-[11px] text-ink-muted">
                        54.32% acceptance · 68.4K solved
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                      Medium
                    </span>
                  </div>
                </div>

                {/* Problem 2 */}
                <div className="py-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to="/practice/3sum"
                        className="font-display text-xs sm:text-sm font-semibold text-ink hover:text-brand-600 transition-colors"
                      >
                        3Sum
                      </Link>
                      <p className="text-[11px] text-ink-muted">
                        34.12% acceptance · 89.5K solved
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                      Medium
                    </span>
                  </div>
                </div>

                {/* Problem 3 */}
                <div className="py-2.5 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to="/practice/rotate-image"
                        className="font-display text-xs sm:text-sm font-semibold text-ink hover:text-brand-600 transition-colors"
                      >
                        Rotate Image
                      </Link>
                      <p className="text-[11px] text-ink-muted">
                        71.20% acceptance · 51.2K solved
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      Easy
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 border-t border-line pt-3">
                <Link
                  to="/practice"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                >
                  <span>View All Recommendations</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </Card>

            {/* Rail 5: Struggling with a problem? */}
            <div className="relative overflow-hidden rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50/80 to-indigo-50/60 p-4 shadow-card">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-xs">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-ink">
                    Struggling with a problem?
                  </h4>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                    Get hints or discuss with peers and mentors.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-surface border border-brand-600/30 px-3.5 py-2 text-xs font-semibold text-brand-600 shadow-2xs hover:bg-brand-600 hover:text-white transition-all"
              >
                <MessageSquare size={14} />
                <span>Ask for Help</span>
              </button>
            </div>
          </div>
        }
      />

      {/* Interactive "Ask for Help" Modal */}
      {showHelpModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-line bg-surface p-6 shadow-pop">
            <button
              type="button"
              onClick={() => {
                setShowHelpModal(false)
                setHelpSubmitted(false)
                setHelpQuestion('')
              }}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-lg p-1 text-ink-muted hover:bg-surface-subtle hover:text-ink"
            >
              <X size={18} />
            </button>

            {helpSubmitted ? (
              <div className="space-y-4 py-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    Help Request Sent!
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                    Our AI Mentor and peer study groups have been notified. You will receive real-time guidance within 2 minutes.
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-surface-subtle p-3 text-left">
                  <p className="text-xs font-semibold text-ink">AI Quick Hint:</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    "Consider utilizing a hash map to look up complements in O(1) time instead of nested linear scans."
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowHelpModal(false)
                    setHelpSubmitted(false)
                    setHelpQuestion('')
                  }}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
                >
                  Got it, thanks!
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      Ask for Help &amp; Discuss
                    </h3>
                    <p className="text-xs text-ink-muted">
                      Stuck on test cases or algorithm optimizations? Ask our verified mentors.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="problem-select" className="text-xs font-semibold text-ink">
                    Which problem are you working on?
                  </label>
                  <select
                    id="problem-select"
                    className="h-9 w-full rounded-lg border border-line bg-surface px-3 text-xs sm:text-sm text-ink focus:border-brand-500 focus:outline-none"
                    defaultValue="Longest Consecutive Sequence"
                  >
                    <option>Longest Consecutive Sequence</option>
                    <option>Two Sum</option>
                    <option>Trapping Rain Water</option>
                    <option>Merge Overlapping Intervals</option>
                    <option>Other DSA Question</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="question-text" className="text-xs font-semibold text-ink">
                    What is your specific doubt or obstacle?
                  </label>
                  <textarea
                    id="question-text"
                    rows={3}
                    value={helpQuestion}
                    onChange={(e) => setHelpQuestion(e.target.value)}
                    placeholder="e.g., I'm encountering a Time Limit Exceeded (TLE) error on larger arrays. How can I optimize O(N^2) to O(N)?"
                    className="w-full rounded-lg border border-line bg-surface-subtle p-3 text-xs sm:text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:bg-surface focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setShowHelpModal(false)}
                    className="rounded-lg border border-line bg-surface px-3.5 py-2 text-xs font-medium text-ink hover:bg-surface-subtle"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!helpQuestion.trim()) {
                        setHelpQuestion("I need hints regarding time complexity optimization.")
                      }
                      setHelpSubmitted(true)
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-brand-700 transition-colors"
                  >
                    <Sparkles size={14} />
                    <span>Submit Request</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
