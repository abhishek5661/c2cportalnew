import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Crown,
  Download,
  FileText,
  Flame,
  Layers,
  Lightbulb,
  Lock,
  Medal,
  Plus,
  Shield,
  Target,
  Terminal,
  TrendingUp,
  Trophy,
  X,
} from 'lucide-react'
import { PageLayout } from '../../components/layout/AppShell'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'
import { problems, user } from '../../data/mock'

interface TaskItem {
  id: string
  title: string
  time: string
  dotColor: string
}

export function DashboardPage() {
  // Semester dropdown state
  const [selectedSemester, setSelectedSemester] = useState(() => {
    try {
      const onboarding = JSON.parse(localStorage.getItem('c2cedge.onboarding') || '{}')
      const semester = onboarding.year ? Number(onboarding.year) : 4
      return `Semester ${Math.max(1, semester)} Progress`
    } catch {
      return 'Semester 4 Progress'
    }
  })
  const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false)

  // Calendar / Today's plan state
  const today = new Date()
  const monday = new Date(today)
  const dayOffset = today.getDay() === 0 ? 6 : today.getDay() - 1
  monday.setDate(today.getDate() - dayOffset)
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)
    return {
      dayName: date.toLocaleDateString(undefined, { weekday: 'short' }),
      dayNumber: date.getDate(),
      fullDate: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      dateKey: date.toISOString().slice(0, 10),
    }
  })
  const [activeDayIndex, setActiveDayIndex] = useState(dayOffset)

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const onboarding = JSON.parse(localStorage.getItem('c2cedge.onboarding') || '{}')
      const focus = onboarding.interests?.[0] || 'DSA'
      return [
        { id: '1', title: `${focus} practice session`, time: '9:00 AM', dotColor: 'bg-brand-500' },
        { id: '2', title: `${onboarding.goals?.[0] || 'Learning'} focus block`, time: '11:30 AM', dotColor: 'bg-purple-500' },
        { id: '3', title: onboarding.learningModes?.[0] || 'Build a project', time: '3:00 PM', dotColor: 'bg-orange-500' },
      ]
    } catch {
      return [{ id: '1', title: 'Start your first learning task', time: '9:00 AM', dotColor: 'bg-brand-500' }]
    }
  })

  // Add task modal state
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskTime, setNewTaskTime] = useState('')

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      time: newTaskTime.trim() || '12:00 PM',
      dotColor: 'bg-brand-500',
    }
    setTasks((prev) => [...prev, newTask])
    setNewTaskTitle('')
    setNewTaskTime('')
    setShowAddTaskModal(false)
  }

  const handlePrevDay = () => {
    setActiveDayIndex((prev) => (prev > 0 ? prev - 1 : weekDays.length - 1))
  }

  const handleNextDay = () => {
    setActiveDayIndex((prev) => (prev < weekDays.length - 1 ? prev + 1 : 0))
  }

  // Recommended cards data
  const recommendedCards = [
    {
      id: 'practice-dsa',
      title: 'Practice DSA',
      desc: 'Solve 15-20 problems daily',
      badgeText: '20 problems',
      badgeType: 'check' as const,
      accentBg: 'bg-emerald-50/60 border-emerald-200/70 hover:border-emerald-300',
      iconBg: 'bg-emerald-100 text-emerald-600',
      icon: Code2,
      to: '/practice',
    },
    {
      id: 'aptitude-practice',
      title: 'Aptitude Practice',
      desc: 'Quant, LR & Verbal',
      badgeText: '30 questions',
      badgeType: 'arrow' as const,
      accentBg: 'bg-purple-50/60 border-purple-200/70 hover:border-purple-300',
      iconBg: 'bg-purple-100 text-purple-600',
      icon: Lightbulb,
      to: '/master/aptitude/number-systems',
    },
    {
      id: 'build-project',
      title: 'Build a Project',
      desc: 'Apply your skills',
      badgeText: '8 ideas for you',
      badgeType: 'arrow' as const,
      accentBg: 'bg-brand-50/60 border-brand-200/70 hover:border-brand-300',
      iconBg: 'bg-brand-100 text-brand-600',
      icon: Terminal,
      to: '/build',
    },
    {
      id: 'join-contest',
      title: 'Join Contest',
      desc: 'Test your skills',
      badgeText: '3 contests live',
      badgeType: 'arrow' as const,
      accentBg: 'bg-orange-50/60 border-orange-200/70 hover:border-orange-300',
      iconBg: 'bg-orange-100 text-orange-600',
      icon: Trophy,
      to: '/compete',
    },
    {
      id: 'track-progress',
      title: 'Track Progress',
      desc: 'Analyze & improve',
      badgeText: 'View analytics',
      badgeType: 'arrow' as const,
      accentBg: 'bg-teal-50/60 border-teal-200/70 hover:border-teal-300',
      iconBg: 'bg-teal-100 text-teal-600',
      icon: TrendingUp,
      to: '/analytics',
    },
  ]

  const currentProfile = (() => {
    try {
      const rawAccounts = localStorage.getItem('c2cedge.connectedProfilesMap')
      const accounts = rawAccounts ? JSON.parse(rawAccounts) : null
      const rawOnboarding = localStorage.getItem('c2cedge.onboarding')
      const onboarding = rawOnboarding ? JSON.parse(rawOnboarding) : null
      const rawSession = localStorage.getItem('c2cedge.current_session')
      const session = rawSession ? JSON.parse(rawSession) : null
      const gh = accounts?.GitHub
      const li = accounts?.LinkedIn
      const fullName = session?.user?.name || onboarding?.name || user.fullName || gh?.name || li?.name
      const firstName = fullName.trim().split(' ')[0] || user.name
      const yearLabels: Record<number, string> = {
        1: 'First year',
        2: 'Second year',
        3: 'Third year',
        4: 'Fourth year',
      }
      return {
        fullName,
        firstName,
        email: session?.user?.email || onboarding?.email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@c2cedge.local`,
        year: onboarding?.year ? yearLabels[onboarding.year] : 'Student',
        level: onboarding?.level || 'Personalized level',
        interests: Array.isArray(onboarding?.interests) ? onboarding.interests : [],
        goals: Array.isArray(onboarding?.goals) ? onboarding.goals : [],
        learningModes: Array.isArray(onboarding?.learningModes) ? onboarding.learningModes : [],
        connectedAccounts: Array.isArray(onboarding?.connectedAccounts) ? onboarding.connectedAccounts : [],
      }
    } catch {
      return {
        fullName: user.fullName,
        firstName: user.name,
        email: 'student@c2cedge.local',
        year: 'Student',
        level: 'Personalized level',
        interests: [],
        goals: [],
        learningModes: [],
        connectedAccounts: [],
      }
    }
  })()

  const studentMetrics = (() => {
    const storageKey = `c2cedge.student_metrics.${currentProfile.email}`
    const defaults = {
      problemsSolved: 0,
      weeklyProblemsSolved: 0,
      streakDays: 0,
      weeklyXp: 0,
      weeklyXpGoal: 2500,
      globalRank: 'Unranked',
    }
    try {
      const stored = localStorage.getItem(storageKey)
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults
    } catch {
      return defaults
    }
  })()

  const journeyProgress = Math.min(Math.round((studentMetrics.problemsSolved / 100) * 100), 100)
  const journeySteps = [
    { id: 'foundations', name: 'Foundations', progress: `${journeyProgress}%`, status: journeyProgress >= 100 ? 'completed' as const : 'active' as const },
    { id: 'dsa-basics', name: 'DSA Basics', progress: `${Math.min(journeyProgress, 100)}%`, status: journeyProgress >= 100 ? 'completed' as const : 'locked' as const },
    { id: 'data-structures', name: 'Data Structures', progress: `${Math.min(Math.max(journeyProgress - 20, 0), 100)}%`, status: journeyProgress >= 20 ? 'active' as const : 'locked' as const },
    { id: 'algorithms', name: 'Algorithms', progress: `${Math.min(Math.max(journeyProgress - 40, 0), 100)}%`, status: journeyProgress >= 40 ? 'active' as const : 'locked' as const },
    { id: 'advanced-dsa', name: 'Advanced DSA', progress: '0%', status: 'locked' as const },
    { id: 'system-design', name: 'System Design', progress: '0%', status: 'locked' as const },
    { id: 'placement-prep', name: 'Placement Prep', progress: '0%', status: 'locked' as const },
  ]
  const overallJourneyProgress = Math.round(
    journeySteps.reduce((total, step) => total + Number.parseInt(step.progress, 10), 0) / journeySteps.length,
  )
  const leaderboardEntries = (() => {
    const currentStudent = { name: currentProfile.fullName, xp: studentMetrics.weeklyXp, isUser: true }
    try {
      const stored = JSON.parse(localStorage.getItem('c2cedge.leaderboard') || '[]')
      const peers = Array.isArray(stored) ? stored : []
      return [...peers.filter((entry) => entry.name !== currentProfile.fullName), currentStudent]
        .map((entry) => ({
          name: String(entry.name || 'Student'),
          xp: Number(entry.xp) || 0,
          isUser: entry.name === currentProfile.fullName || entry.isUser === true,
        }))
        .sort((left, right) => right.xp - left.xp)
        .slice(0, 5)
    } catch {
      return [currentStudent]
    }
  })()
  const learningQueue = (() => {
    const progressKey = `c2cedge.practice_progress.${currentProfile.email}`
    let savedProgress: Record<string, number> = {}
    try {
      savedProgress = JSON.parse(localStorage.getItem(progressKey) || '{}') as Record<string, number>
    } catch {
      savedProgress = {}
    }

    const unfinished = problems.filter((problem) => (savedProgress[problem.id] || 0) < 100)
    const queue = unfinished.length > 0 ? unfinished : problems
    const active = queue[0]
    return {
      active,
      activeProgress: Math.min(savedProgress[active.id] || 0, 100),
      next: queue.slice(1, 4),
    }
  })()

  const personalizedRecommendedCards = recommendedCards.map((card, index) => {
    if (index === 0 && currentProfile.interests.length > 0) {
      return {
        ...card,
        title: `Practice ${currentProfile.interests[0]}`,
        desc: `Build skills toward ${currentProfile.goals[0] || 'your goals'}`,
      }
    }
    if (index === 2 && currentProfile.goals.length > 0) {
      return {
        ...card,
        desc: `A project aligned with ${currentProfile.goals[0]}`,
      }
    }
    return card
  })

  return (
    <>
      <PageLayout
        main={
          <div className="space-y-6">
            {/* 1. Header Area */}
          <div>
            <h1 className="font-display text-2xl font-bold text-ink lg:text-3xl flex items-center gap-2">
              Good morning, {currentProfile.firstName}! <span>👋</span>
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              Your {currentProfile.year.toLowerCase()} plan is ready. Keep building toward your goals.
            </p>
          </div>

          <section className="card border-brand-100 bg-brand-50/30 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-700">Your learning profile</p>
                <h2 className="mt-1 font-display text-base font-bold text-ink">{currentProfile.level}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(currentProfile.interests.length > 0 ? currentProfile.interests : ['Choose your interests']).map((interest: string) => (
                    <span key={interest} className="rounded-full border border-brand-200 bg-white px-2.5 py-1 text-xs font-semibold text-brand-700">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs lg:min-w-[250px]">
                <div>
                  <p className="text-ink-muted">Focus goal</p>
                  <p className="mt-1 font-semibold text-ink">{currentProfile.goals[0] || 'Choose a goal'}</p>
                </div>
                <div>
                  <p className="text-ink-muted">Learning style</p>
                  <p className="mt-1 font-semibold text-ink">{currentProfile.learningModes[0] || 'Personalized'}</p>
                </div>
                <div>
                  <p className="text-ink-muted">Connected accounts</p>
                  <p className="mt-1 font-semibold text-ink">{currentProfile.connectedAccounts.length || 'None yet'}</p>
                </div>
                <Link to="/settings" className="self-end font-semibold text-brand-600 hover:underline">Edit profile</Link>
              </div>
            </div>
          </section>

          {/* 2. 4 Stat Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stat 1: Problems Solved */}
            <div className="card p-4 transition-all hover:border-brand-200 hover:shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-ink-muted">Problems Solved</p>
                  <p className="mt-1 font-display text-2xl font-bold text-ink">{studentMetrics.problemsSolved.toLocaleString()}</p>
                  <p className="mt-2 text-xs font-semibold text-emerald-600">+{studentMetrics.weeklyProblemsSolved} this week</p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Target size={22} className="stroke-[2.2]" />
                </div>
              </div>
            </div>

            {/* Stat 2: Study Streak */}
            <div className="card p-4 transition-all hover:border-brand-200 hover:shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-ink-muted">Study Streak</p>
                  <p className="mt-1 font-display text-2xl font-bold text-ink">
                    {studentMetrics.streakDays} <span className="text-sm font-normal text-ink-muted">days</span>
                  </p>
                  <p className="mt-2 text-xs font-semibold text-purple-600">{studentMetrics.streakDays > 0 ? 'Keep it up! 🔥' : 'Start your first streak'}</p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <Flame size={22} className="stroke-[2.2]" />
                </div>
              </div>
            </div>

            {/* Stat 3: Weekly XP */}
            <div className="card p-4 transition-all hover:border-brand-200 hover:shadow-xs">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1 pr-2">
                  <p className="text-xs font-medium text-ink-muted">Weekly XP</p>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-display text-2xl font-bold text-ink">{studentMetrics.weeklyXp.toLocaleString()}</span>
                    <span className="text-xs font-medium text-ink-muted">/ {studentMetrics.weeklyXpGoal.toLocaleString()} XP</span>
                  </div>
                  <div className="mt-3.5 w-full">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                      <div
                        className="h-full rounded-full bg-brand-600 transition-all"
                        style={{ width: `${Math.min((studentMetrics.weeklyXp / studentMetrics.weeklyXpGoal) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                  <Shield size={22} className="stroke-[2.2]" />
                </div>
              </div>
            </div>

            {/* Stat 4: Global Rank */}
            <div className="card p-4 transition-all hover:border-brand-200 hover:shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-ink-muted">Global Rank</p>
                  <p className="mt-1 font-display text-2xl font-bold text-ink">{studentMetrics.globalRank}</p>
                  <p className="mt-2 text-xs font-semibold text-orange-500">{studentMetrics.globalRank === 'Unranked' ? 'Complete activities to rank' : 'Keep improving!'}</p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                  <Crown size={22} className="stroke-[2.2]" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Continue Learning Section */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="section-title text-lg">Continue Learning</h2>
              <Link
                to="/practice"
                className="text-xs font-semibold text-brand-600 hover:underline inline-flex items-center gap-1"
              >
                View all <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              {/* Left Card: Active Problem */}
              <div className="card p-5 lg:col-span-7 flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Dark preview tile */}
                  <div className="w-full sm:w-44 h-32 shrink-0 rounded-xl bg-navy-950 p-3.5 flex flex-col justify-between border border-navy-900 shadow-inner relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-slate-200">
                        {learningQueue.active.topics[0] || 'Practice'}
                      </span>
                      <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                        {learningQueue.active.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-center my-auto">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-brand-400 font-mono text-base font-bold">
                        &lt;/&gt;
                      </div>
                    </div>
                    <div className="font-mono text-[10px] text-slate-400 truncate">
                      {learningQueue.active.id}.py
                    </div>
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                      <span className="font-medium text-ink">{learningQueue.active.topics[0] || 'Practice'}</span>
                      <span>·</span>
                      <span className="font-medium text-amber-600">{learningQueue.active.difficulty}</span>
                    </div>
                    <h3 className="mt-1 font-display text-base font-bold text-ink sm:text-lg">
                      {learningQueue.active.title}
                    </h3>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-ink-muted font-medium">Progress</span>
                        <span className="font-semibold text-emerald-600">{learningQueue.activeProgress}% completed</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all"
                          style={{ width: `${learningQueue.activeProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-line/60 flex flex-wrap items-center gap-3">
                  <Link to={`/practice/${learningQueue.active.id}`}>
                    <Button variant="primary" size="sm" className="px-4 font-semibold">
                      Continue Practice
                    </Button>
                  </Link>
                  <Link to={`/practice/${learningQueue.active.id}?tab=solution`}>
                    <Button variant="outline" size="sm" className="px-4 font-semibold">
                      View Solution
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Up Next List */}
              <div className="card p-5 lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-line">
                    <h3 className="font-display text-sm font-bold text-ink">Up Next</h3>
                    <span className="text-xs text-ink-muted">{learningQueue.next.length} problems</span>
                  </div>

                  <ul className="divide-y divide-line/60">
                    {learningQueue.next.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={`/practice/${item.id}`}
                          className="group flex items-center justify-between py-3 hover:bg-surface-subtle -mx-2 px-2 rounded-lg transition-colors"
                        >
                          <div className="min-w-0 flex-1 pr-2">
                            <p className="truncate text-sm font-semibold text-ink group-hover:text-brand-600 transition-colors">
                              {item.title}
                            </p>
                            <span
                              className={cn(
                                'inline-block mt-0.5 rounded border px-1.5 py-0.2 text-[10px] font-semibold',
                                item.difficulty === 'Easy'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : item.difficulty === 'Medium'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-red-50 text-red-700 border-red-200',
                              )}
                            >
                              {item.difficulty}
                            </span>
                          </div>
                          <ChevronRight
                            size={16}
                            className="shrink-0 text-ink-muted group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 text-right">
                  <Link
                    to="/practice"
                    className="text-xs font-semibold text-brand-600 hover:underline inline-flex items-center gap-1"
                  >
                    View all problems <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Recommended for You Section */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="section-title text-lg">Recommended for You</h2>
              <Link
                to="/practice"
                className="text-xs font-semibold text-brand-600 hover:underline inline-flex items-center gap-1"
              >
                View all <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {personalizedRecommendedCards.map((card) => (
                <Link
                  key={card.id}
                  to={card.to}
                  className={cn(
                    'card group flex flex-col justify-between p-4 transition-all hover:-translate-y-0.5 hover:shadow-md',
                    card.accentBg,
                  )}
                >
                  <div>
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105',
                        card.iconBg,
                      )}
                    >
                      <card.icon size={20} className="stroke-[2.2]" />
                    </div>
                    <h3 className="mt-3 font-display text-sm font-bold text-ink group-hover:text-brand-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-xs text-ink-muted leading-snug">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-xs">
                    <span className="font-semibold text-ink">
                      {card.badgeText}
                    </span>
                    {card.badgeType === 'check' ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    ) : (
                      <span className="text-ink-muted group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all">
                        <ArrowRight size={14} />
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 5. Your Learning Journey Section */}
          <section className="card p-5 sm:p-6">
            {/* Header with dropdown and overall progress */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-line/70">
              <div className="flex items-center gap-3">
                <h2 className="section-title text-base sm:text-lg">Your Learning Journey</h2>

                {/* Dropdown: Semester 4 Progress ⌵ */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSemesterDropdownOpen((v) => !v)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-2xs hover:bg-surface-subtle transition-colors"
                  >
                    <span>{selectedSemester}</span>
                    <ChevronDown size={14} className="text-ink-muted" />
                  </button>

                  {semesterDropdownOpen && (
                    <div className="absolute left-0 mt-1.5 w-48 rounded-xl border border-line bg-surface py-1.5 shadow-pop z-30">
                      {[
                        'Semester 1 Progress',
                        'Semester 2 Progress',
                        'Semester 3 Progress',
                        'Semester 4 Progress',
                        'Semester 5 Progress',
                        'Semester 6 Progress',
                      ].map((sem) => (
                        <button
                          key={sem}
                          type="button"
                          onClick={() => {
                            setSelectedSemester(sem)
                            setSemesterDropdownOpen(false)
                          }}
                          className={cn(
                            'w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-surface-subtle',
                            selectedSemester === sem ? 'font-bold text-brand-600 bg-brand-50/50' : 'text-ink',
                          )}
                        >
                          {sem}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-ink-muted">Overall Progress:</span>
                  <span className="font-display text-sm font-bold text-brand-600">{overallJourneyProgress}%</span>
                </div>
                <Link to="/journey">
                  <Button variant="outline" size="sm" className="rounded-lg text-xs font-semibold px-3 h-8">
                    View Full Roadmap
                  </Button>
                </Link>
              </div>
            </div>

            {/* Horizontal Stepper Track */}
            <div className="overflow-x-auto pb-3 pt-2">
              <div className="min-w-[660px] px-4">
                <div className="relative">
                  {/* Connecting line */}
                  <div
                    aria-hidden="true"
                    className="absolute top-5 left-[7%] right-[7%] h-0.5 bg-line z-0"
                  >
                    <div
                      className="h-full bg-brand-600 rounded-full"
                      style={{ width: `${overallJourneyProgress}%` }}
                    />
                  </div>

                  <div className="relative z-10 grid grid-cols-7 gap-2">
                    {journeySteps.map((step) => (
                      <div key={step.id} className="flex flex-col items-center text-center">
                        {step.status === 'completed' ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
                            <Check size={18} strokeWidth={3} />
                          </div>
                        ) : step.status === 'active' ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white font-mono text-xs font-bold ring-4 ring-brand-100 shadow-md shadow-brand-500/20">
                            &lt;/&gt;
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-subtle text-ink-muted">
                            <Lock size={16} />
                          </div>
                        )}

                        <p className="mt-2.5 font-display text-xs font-bold text-ink truncate max-w-[90px]">
                          {step.name}
                        </p>
                        <span
                          className={cn(
                            'mt-0.5 text-[11px] font-semibold',
                            step.status === 'completed'
                              ? 'text-emerald-600'
                              : step.status === 'active'
                                ? 'text-brand-600'
                                : 'text-ink-muted',
                          )}
                        >
                          {step.progress}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
      rail={
        <div className="space-y-6">
          {/* 6.1 Today's Plan */}
          <div className="card p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="section-title">Today&apos;s Plan</h3>
              <Link
                to={`/calendar?date=${weekDays[activeDayIndex].dateKey}`}
                className="text-xs font-semibold text-brand-600 hover:underline inline-flex items-center gap-0.5"
              >
                View full calendar →
              </Link>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center justify-between rounded-lg bg-surface-subtle px-3 py-1.5 border border-line/70 mb-3">
              <button
                type="button"
                onClick={handlePrevDay}
                className="p-1 text-ink-muted hover:text-ink rounded hover:bg-white transition-colors"
                aria-label="Previous day"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="font-display text-xs font-bold text-ink">
                &lt; {weekDays[activeDayIndex].fullDate} &gt;
              </span>
              <button
                type="button"
                onClick={handleNextDay}
                className="p-1 text-ink-muted hover:text-ink rounded hover:bg-white transition-colors"
                aria-label="Next day"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-1 text-center mb-4">
              {weekDays.map((day, idx) => {
                const isActive = idx === activeDayIndex
                return (
                  <button
                    key={day.dayName}
                    type="button"
                    onClick={() => setActiveDayIndex(idx)}
                    className={cn(
                      'flex flex-col items-center py-1.5 px-0.5 rounded-lg transition-all text-xs',
                      isActive
                        ? 'bg-brand-600 text-white font-bold shadow-xs'
                        : 'text-ink hover:bg-surface-subtle',
                    )}
                  >
                    <span
                      className={cn(
                        'text-[10px] uppercase font-medium',
                        isActive ? 'text-white/80' : 'text-ink-muted',
                      )}
                    >
                      {day.dayName}
                    </span>
                    <span className="mt-0.5 font-bold text-xs">{day.dayNumber}</span>
                  </button>
                )
              })}
            </div>

            {/* Tasks List */}
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border border-line bg-surface p-2.5 hover:border-brand-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={cn('h-2 w-2 rounded-full shrink-0', task.dotColor)} />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-ink">
                        {task.title}
                      </p>
                      <p className="text-[11px] text-ink-muted flex items-center gap-1">
                        <Clock size={10} /> {task.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* + Add Task Button */}
            <button
              type="button"
              onClick={() => setShowAddTaskModal(true)}
              className="mt-3 w-full rounded-lg border border-dashed border-line py-2 text-xs font-semibold text-ink-muted hover:border-brand-400 hover:bg-brand-50/50 hover:text-brand-600 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus size={14} /> Add Task
            </button>
          </div>

          {/* 6.2 Study Streak */}
          <div className="card p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <Flame size={20} className="stroke-[2.2]" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-ink">
                    {studentMetrics.streakDays} days <span className="text-xs font-normal text-ink-muted">(Your current streak)</span>
                  </p>
                  <p className="text-[11px] text-ink-muted">Study Streak</p>
                </div>
              </div>
              <Link
                to="/analytics"
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                View details →
              </Link>
            </div>

            {/* Mon-Sun calendar dots */}
            <div className="grid grid-cols-7 gap-1.5 pt-3 border-t border-line/60">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((dayLetter, index) => (
                <div key={index} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-ink-muted">{dayLetter}</span>
                  <div className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full shadow-2xs',
                    index >= 7 - Math.min(studentMetrics.streakDays, 7)
                      ? 'bg-emerald-500 text-white'
                      : 'border border-line bg-surface-subtle text-ink-muted',
                  )}>
                    {index >= 7 - Math.min(studentMetrics.streakDays, 7) ? <Check size={12} strokeWidth={3} /> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6.3 Leaderboard */}
          <div className="card p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="section-title">Leaderboard</h3>
              <Link
                to="/compete"
                className="text-xs font-semibold text-brand-600 hover:underline inline-flex items-center gap-0.5"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-1.5">
              {leaderboardEntries.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors',
                    item.isUser
                      ? 'bg-brand-50 border border-brand-200 text-brand-900 font-semibold shadow-2xs'
                      : 'hover:bg-surface-subtle text-ink',
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-5 w-5 items-center justify-center text-xs font-bold shrink-0">
                      {index === 0 ? <Crown size={14} className="text-amber-500 fill-amber-400" /> : index === 1 ? <Medal size={14} className="text-slate-400 fill-slate-300" /> : index === 2 ? <Medal size={14} className="text-amber-700 fill-amber-600" /> : <span className="text-ink-muted">#{index + 1}</span>}
                    </span>
                    <span className="truncate">
                      {item.name}
                      {item.isUser && (
                        <span className="ml-1.5 rounded bg-brand-600 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                          You
                        </span>
                      )}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 font-display font-semibold',
                      item.isUser ? 'text-brand-700' : 'text-ink-muted',
                    )}
                  >
                    {item.xp.toLocaleString()} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 6.4 Quick Links */}
          <div className="card p-4 sm:p-5">
            <h3 className="section-title mb-3">Quick Links</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Notes', icon: FileText, to: '/journey', color: 'bg-blue-50 text-blue-600' },
                { label: 'Bookmarks', icon: Bookmark, to: '/practice', color: 'bg-amber-50 text-amber-600' },
                { label: 'Flashcards', icon: Layers, to: '/master', color: 'bg-purple-50 text-purple-600' },
                { label: 'Downloads', icon: Download, to: '/career', color: 'bg-emerald-50 text-emerald-600' },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="group flex flex-col items-center justify-center rounded-xl border border-line p-2.5 transition-all hover:border-brand-300 hover:bg-surface-subtle text-center"
                >
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-105',
                      link.color,
                    )}
                  >
                    <link.icon size={18} />
                  </div>
                  <span className="mt-1.5 text-[11px] font-medium text-ink group-hover:text-brand-600 transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      }
    />

    {/* Add Task Modal */}
    {showAddTaskModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 backdrop-blur-xs p-4">
        <div className="card w-full max-w-sm p-5 shadow-pop bg-surface">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-bold text-ink">Add New Task</h3>
            <button
              type="button"
              onClick={() => setShowAddTaskModal(false)}
              className="rounded-lg p-1 text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label htmlFor="task-title" className="block text-xs font-semibold text-ink mb-1.5">
                Task Name
              </label>
              <input
                id="task-title"
                type="text"
                placeholder="e.g. Dynamic Programming Practice"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="task-time" className="block text-xs font-semibold text-ink mb-1.5">
                Scheduled Time
              </label>
              <input
                id="task-time"
                type="text"
                placeholder="e.g. 4:30 PM"
                value={newTaskTime}
                onChange={(e) => setNewTaskTime(e.target.value)}
                className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddTaskModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={!newTaskTitle.trim()}
              >
                Add Task
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
  )
}
