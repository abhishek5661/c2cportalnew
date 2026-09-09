import { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  BrainCircuit,
  ArrowUpRight,
  Flame,
  Code2,
  Layers,
  ChevronRight,
  Filter,
  GraduationCap,
  Sparkles,
  AlertCircle,
  Users,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ProgressRing } from '../../components/ui/Progress'
import { cn } from '../../lib/cn'

interface MetricSummary {
  label: string
  value: string
  subtext: string
  trend: string
  trendPositive: boolean
  icon: any
  color: string
}

const metrics: MetricSummary[] = [
  {
    label: 'Habit Consistency',
    value: '94%',
    subtext: '18-day continuous streak',
    trend: '+6% this month',
    trendPositive: true,
    icon: Flame,
    color: 'text-amber-500 bg-amber-50 border-amber-200',
  },
  {
    label: 'Skill Benchmark Index',
    value: '820 / 1000',
    subtext: 'Top 3.3% in CSE cohort',
    trend: '+38 pts vs last test',
    trendPositive: true,
    icon: Award,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    label: 'Problems Solved',
    value: '254',
    subtext: '142 Easy · 88 Med · 24 Hard',
    trend: '+19 solved this week',
    trendPositive: true,
    icon: Code2,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    label: 'Mock Test Average',
    value: '84.5%',
    subtext: 'Across 12 evaluated tests',
    trend: '+4.2% cohort gain',
    trendPositive: true,
    icon: Target,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
  },
]

const skillPercentiles = [
  {
    name: 'Data Structures & Algorithms',
    percentile: 92,
    category: 'Core Skills',
    solved: 164,
    color: 'bg-blue-600',
    collegeAvg: 58,
    top10Avg: 88,
  },
  {
    name: 'Quantitative Aptitude & Logic',
    percentile: 88,
    category: 'Aptitude & Math',
    solved: 96,
    color: 'bg-indigo-600',
    collegeAvg: 62,
    top10Avg: 85,
  },
  {
    name: 'Computer Science Fundamentals',
    percentile: 85,
    category: 'OS, DBMS, Networks',
    solved: 72,
    color: 'bg-emerald-600',
    collegeAvg: 54,
    top10Avg: 84,
  },
  {
    name: 'Full-Stack Web & Cloud',
    percentile: 81,
    category: 'Build Track',
    solved: 48,
    color: 'bg-amber-600',
    collegeAvg: 48,
    top10Avg: 82,
  },
  {
    name: 'System Design & Architecture',
    percentile: 78,
    category: 'Systems',
    solved: 34,
    color: 'bg-rose-600',
    collegeAvg: 41,
    top10Avg: 79,
  },
  {
    name: 'Soft Skills & Technical Pitching',
    percentile: 76,
    category: 'Personal Skills',
    solved: 22,
    color: 'bg-teal-600',
    collegeAvg: 52,
    top10Avg: 80,
  },
]

const weeklyRitualStatus = [
  {
    day: 'Mon',
    tasks: ['DSA Practice (2 problems)', 'Binary Search drill'],
    completed: true,
    count: 2,
  },
  {
    day: 'Tue',
    tasks: ['DBMS Normalization lesson', 'SQL query challenge'],
    completed: true,
    count: 3,
  },
  {
    day: 'Wed',
    tasks: ['Number Systems Masterclass', 'Aptitude Quiz'],
    completed: true,
    count: 2,
  },
  {
    day: 'Thu',
    tasks: ['Full-stack project sprint', 'Git commit & PR'],
    completed: true,
    count: 4,
  },
  {
    day: 'Fri',
    tasks: ['Peer code review exchange', 'Doubt channel response'],
    completed: true,
    count: 2,
  },
  {
    day: 'Sat',
    tasks: ['Weekly Timed Contest #24', 'Live leaderboard'],
    completed: true,
    count: 4,
  },
  {
    day: 'Sun',
    tasks: ['Reflection log & weekly review', 'AI diagnostic check'],
    completed: false,
    count: 1,
  },
]

const aiImprovementPlan = [
  {
    id: 1,
    category: 'Dynamic Programming',
    urgency: 'High Priority',
    title: 'State Optimization in 2D Grid DP',
    finding: 'Your runtime on LeetCode #64 & #62 was in the bottom 38% due to redundant O(M*N) memory allocations.',
    action: 'Solve 3 rolling-array space optimization problems. Review Masterclass Lesson 8.',
    estHours: '2.5 hrs',
    status: 'In Progress',
  },
  {
    id: 2,
    category: 'System Design',
    urgency: 'Medium Priority',
    title: 'Database Sharding & Consistent Hashing',
    finding: 'Diagnostic quiz highlighted uncertainty when handling rebalancing in ring topologies.',
    action: 'Simulate virtual node placement in the System Design interactive playground.',
    estHours: '1.5 hrs',
    status: 'Pending',
  },
  {
    id: 3,
    category: 'Operating Systems',
    urgency: 'Medium Priority',
    title: 'Virtual Memory & Page Replacement Policies',
    finding: 'Campus placement screening tests consistently question LRU cache page faults.',
    action: 'Complete the OS Memory Management flash drills and implement LRU in C++.',
    estHours: '2.0 hrs',
    status: 'Pending',
  },
]

const cohortRankings = [
  { rank: 1, name: 'Ananya Sharma', roll: '22CS104', xp: '18,450 XP', solved: 412, contestRating: 1980, badge: 'Grandmaster' },
  { rank: 2, name: 'Rohan Deshmukh', roll: '22CS089', xp: '17,200 XP', solved: 388, contestRating: 1945, badge: 'Grandmaster' },
  { rank: 3, name: 'Tanvi Patel', roll: '22CS156', xp: '16,950 XP', solved: 360, contestRating: 1910, badge: 'Master' },
  { rank: 13, name: 'Devendra K.', roll: '22CS044', xp: '14,600 XP', solved: 260, contestRating: 1740, badge: 'Expert' },
  { rank: 14, name: 'You (Alex Johnson)', roll: '22CS021', xp: '14,250 XP', solved: 254, contestRating: 1724, badge: 'Expert', isUser: true },
  { rank: 15, name: 'Neha Gupta', roll: '22CS112', xp: '14,100 XP', solved: 248, contestRating: 1715, badge: 'Expert' },
]

export function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'benchmarks' | 'habits' | 'ai-plan' | 'cohort'>('overview')

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-300">
            <BarChart3 size={13} className="text-rose-400" />
            Pillar 4: Continuous Assessment &amp; Feedback Loop
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            College Analytics &amp; Performance Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Measure what matters across your 4-year engineering journey. Track weekly ritual consistency, benchmark DSA &amp; CS percentiles against batch peers, and act on AI-driven weakness diagnostics.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 sm:gap-3">
            {[
              { id: 'overview', label: 'Overview & Scorecard' },
              { id: 'benchmarks', label: 'Skill Benchmarks' },
              { id: 'habits', label: 'Weekly Rituals (94%)' },
              { id: 'ai-plan', label: 'AI Diagnostic Plan' },
              { id: 'cohort', label: 'Batch Standing (#14)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'rounded-xl px-4 py-2 text-xs font-bold transition-all',
                  activeTab === tab.id
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary 4 Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <Card key={m.label} className="rounded-2xl border border-line bg-surface p-5 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-muted">{m.label}</span>
                <div className={cn('rounded-xl border p-2', m.color)}>
                  <Icon size={16} />
                </div>
              </div>
              <div className="mt-3">
                <div className="font-display text-2xl font-bold text-ink">{m.value}</div>
                <div className="text-xs text-ink-muted mt-0.5">{m.subtext}</div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <TrendingUp size={13} />
                <span>{m.trend}</span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* TAB 1: OVERVIEW & SCORECARD */}
      {activeTab === 'overview' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Problem Difficulty Breakdown */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="rounded-2xl border border-line bg-surface p-5 space-y-4 shadow-sm">
              <h3 className="font-display text-sm font-bold text-ink flex items-center justify-between">
                <span>Problem Solving Breakdown</span>
                <span className="text-xs font-normal text-ink-muted">254 Solved</span>
              </h3>

              <div className="flex items-center justify-center py-2">
                <div className="relative flex items-center justify-center">
                  <ProgressRing value={68} size={110} strokeWidth={8} caption="Solved" />
                  <div className="absolute text-center">
                    <span className="font-display text-xl font-bold text-ink">254</span>
                    <span className="block text-[10px] text-ink-muted">/ 400 target</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between rounded-xl bg-emerald-50/70 border border-emerald-100 p-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="font-bold text-emerald-950">Easy</span>
                  </div>
                  <div className="font-mono font-bold text-emerald-900">
                    142 <span className="text-ink-muted font-normal text-[11px]">/ 180 (79%)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-amber-50/70 border border-amber-100 p-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="font-bold text-amber-950">Medium</span>
                  </div>
                  <div className="font-mono font-bold text-amber-900">
                    88 <span className="text-ink-muted font-normal text-[11px]">/ 150 (59%)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-rose-50/70 border border-rose-100 p-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    <span className="font-bold text-rose-950">Hard</span>
                  </div>
                  <div className="font-mono font-bold text-rose-900">
                    24 <span className="text-ink-muted font-normal text-[11px]">/ 70 (34%)</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-xs text-blue-900">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Sparkles size={13} className="text-blue-600" />
                  Target Recommendation
                </div>
                Solve 12 more Medium problems in <strong>Graphs &amp; Heaps</strong> to unlock 95th cohort percentile.
              </div>
            </Card>

            {/* Verdict Distribution */}
            <Card className="rounded-2xl border border-line bg-surface p-5 space-y-3 shadow-sm">
              <h3 className="font-display text-sm font-bold text-ink">
                Submission Verdicts (Last 30 Days)
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Accepted (AC)', pct: 72, count: 182, color: 'bg-emerald-500' },
                  { label: 'Wrong Answer (WA)', pct: 16, count: 40, color: 'bg-rose-500' },
                  { label: 'Time Limit Exceeded (TLE)', pct: 8, count: 20, color: 'bg-amber-500' },
                  { label: 'Runtime Error (RE)', pct: 4, count: 12, color: 'bg-indigo-500' },
                ].map((v) => (
                  <div key={v.label} className="space-y-1">
                    <div className="flex justify-between text-ink font-semibold text-[11px]">
                      <span>{v.label}</span>
                      <span className="font-mono text-ink-muted">{v.count} ({v.pct}%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className={cn('h-full rounded-full', v.color)} style={{ width: `${v.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Velocity & Benchmark Columns */}
          <div className="lg:col-span-8 space-y-6">
            {/* Weekly Velocity Histogram */}
            <Card className="rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">
                    Weekly Problem Solving Velocity
                  </h3>
                  <p className="text-xs text-ink-muted">
                    Consistent growth over the last 8 calendar weeks
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-slate-50 px-2.5 py-1 text-xs font-semibold text-ink">
                  <Calendar size={13} className="text-ink-muted" />
                  Semester 4 · Spring 2026
                </div>
              </div>

              {/* Bar Chart Visualization */}
              <div className="pt-4 grid grid-cols-8 gap-2 items-end h-48 border-b border-line pb-2">
                {[
                  { week: 'W1', count: 18, height: '42%' },
                  { week: 'W2', count: 24, height: '56%' },
                  { week: 'W3', count: 20, height: '48%' },
                  { week: 'W4', count: 32, height: '74%' },
                  { week: 'W5', count: 28, height: '65%' },
                  { week: 'W6', count: 35, height: '82%' },
                  { week: 'W7', count: 42, height: '100%', active: true },
                  { week: 'W8', count: 38, height: '90%' },
                ].map((bar) => (
                  <div key={bar.week} className="flex flex-col items-center gap-1 h-full justify-end group">
                    <span className="text-[11px] font-mono font-bold text-ink opacity-0 group-hover:opacity-100 transition-opacity">
                      {bar.count}
                    </span>
                    <div
                      className={cn(
                        'w-full max-w-[36px] rounded-t-lg transition-all duration-300',
                        bar.active ? 'bg-rose-600 shadow-md shadow-rose-600/30' : 'bg-slate-200 group-hover:bg-rose-400',
                      )}
                      style={{ height: bar.height }}
                    />
                    <span className="text-[11px] font-semibold text-ink-muted">{bar.week}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-ink-muted pt-1">
                <span>Peak Velocity: <strong>42 problems</strong> in Week 7</span>
                <span>Average: <strong>29.6 problems / week</strong></span>
                <span className="text-emerald-600 font-semibold">+110% vs College Baseline</span>
              </div>
            </Card>

            {/* Quick Skill Benchmarks Snapshot */}
            <Card className="rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-ink">
                  Skill Benchmarks vs Cohort Percentiles
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('benchmarks')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700"
                >
                  Full Diagnostics <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-4">
                {skillPercentiles.slice(0, 4).map((s) => (
                  <div key={s.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-ink">{s.name}</span>
                        <span className="ml-2 text-[11px] text-ink-muted">({s.category})</span>
                      </div>
                      <div className="font-mono font-bold text-ink">
                        {s.percentile}th <span className="text-ink-muted font-normal text-[11px]">percentile</span>
                      </div>
                    </div>
                    <div className="relative h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className={cn('h-full rounded-full', s.color)} style={{ width: `${s.percentile}%` }} />
                      {/* College Average marker */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-slate-400"
                        style={{ left: `${s.collegeAvg}%` }}
                        title={`College Avg: ${s.collegeAvg}%`}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-ink-muted">
                      <span>College Avg: {s.collegeAvg}%</span>
                      <span className="text-emerald-600 font-semibold">+{s.percentile - s.collegeAvg}% Ahead</span>
                      <span>Top 10% Cutoff: {s.top10Avg}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: SKILL BENCHMARKS */}
      {activeTab === 'benchmarks' && (
        <div className="space-y-6">
          <Card className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <div className="max-w-3xl space-y-2 mb-6">
              <h3 className="font-display text-base font-bold text-ink">
                Comprehensive 6-Pillar Skill Benchmarking
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted">
                Each pillar is evaluated using verified code submissions, timed contest performance, and standardized monthly aptitude diagnostics compared against 420 students in your CSE cohort.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skillPercentiles.map((s) => (
                <div key={s.name} className="rounded-xl border border-line bg-slate-50/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-white border border-line px-2 py-0.5 text-[10px] font-bold text-ink-muted">
                      {s.category}
                    </span>
                    <span className="font-display text-sm font-bold text-rose-600">
                      {s.percentile}th %ile
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-xs font-bold text-ink">{s.name}</h4>
                    <p className="text-[11px] text-ink-muted mt-0.5">{s.solved} verified problems &amp; drills</p>
                  </div>

                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className={cn('h-full rounded-full', s.color)} style={{ width: `${s.percentile}%` }} />
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-ink-muted">
                    <span>Cohort Avg: {s.collegeAvg}%</span>
                    <span className="font-bold text-emerald-600">
                      {s.percentile >= s.top10Avg ? 'Tier 1 Cutoff Met' : 'Approaching Tier 1'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: WEEKLY RITUALS */}
      {activeTab === 'habits' && (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    Weekly Student Ritual Execution
                  </h3>
                  <p className="text-xs text-ink-muted">
                    Learn • Solve • Build • Compete • Present • Reflect • Repeat
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <Flame size={14} className="text-emerald-600" />
                  6 / 7 Days On Track
                </div>
              </div>

              <div className="space-y-3">
                {weeklyRitualStatus.map((d) => (
                  <div
                    key={d.day}
                    className={cn(
                      'flex items-start sm:items-center justify-between rounded-xl border p-3.5 text-xs transition-colors',
                      d.completed
                        ? 'border-emerald-100 bg-emerald-50/40 text-emerald-950'
                        : 'border-amber-200 bg-amber-50/40 text-amber-950',
                    )}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-lg font-display text-xs font-bold shrink-0',
                          d.completed ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white',
                        )}
                      >
                        {d.day}
                      </div>
                      <div>
                        <div className="font-bold text-ink flex items-center gap-2">
                          <span>{d.tasks[0]}</span>
                          {d.completed && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                              <CheckCircle2 size={12} /> Done
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-ink-muted mt-0.5">
                          {d.tasks[1]}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="font-mono font-bold text-ink">{d.count} tasks</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="rounded-2xl border border-line bg-surface p-5 space-y-4 shadow-sm">
              <h3 className="font-display text-sm font-bold text-ink">
                30-Day Ritual Consistency
              </h3>
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center">
                  <ProgressRing value={94} size={80} strokeWidth={7} caption="Score" />
                  <span className="absolute font-display text-base font-bold text-ink">94%</span>
                </div>
                <div className="text-xs space-y-1">
                  <p className="font-bold text-ink">Top Consistency Tier</p>
                  <p className="text-[11px] text-ink-muted">
                    You have maintained continuous daily practice for 28 out of the past 30 days.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-line space-y-2 text-xs">
                <div className="flex justify-between text-ink-muted">
                  <span>Current Active Streak:</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <Flame size={12} /> 18 Days
                  </span>
                </div>
                <div className="flex justify-between text-ink-muted">
                  <span>Longest Streak:</span>
                  <span className="font-bold text-ink">42 Days</span>
                </div>
                <div className="flex justify-between text-ink-muted">
                  <span>Weekly Study Hours:</span>
                  <span className="font-bold text-ink">14.5 / 20.0 hrs</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 4: AI IMPROVEMENT PLAN */}
      {activeTab === 'ai-plan' && (
        <div className="space-y-6">
          <Card className="rounded-2xl border border-line bg-surface p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-700 mb-2">
                  <BrainCircuit size={13} />
                  AI Diagnostic Engine v2.4
                </div>
                <h3 className="font-display text-base font-bold text-ink">
                  14-Day Targeted Weakness Remediation Plan
                </h3>
                <p className="text-xs text-ink-muted">
                  Generated automatically by analyzing wrong answer submissions, TLE patterns, and mock interview notes.
                </p>
              </div>

              <Button variant="outline" size="sm" className="rounded-xl border-line text-xs font-bold">
                Re-run Diagnostic Scan
              </Button>
            </div>

            <div className="space-y-4">
              {aiImprovementPlan.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-xl border border-line bg-slate-50/50 p-4 sm:p-5 space-y-3 hover:border-slate-300 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-white border border-line px-2.5 py-1 text-[11px] font-bold text-ink">
                        {plan.category}
                      </span>
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[10px] font-bold',
                          plan.urgency.includes('High')
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800',
                        )}
                      >
                        {plan.urgency}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
                      <Clock size={13} />
                      <span>{plan.estHours} estimated</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-sm font-bold text-ink">{plan.title}</h4>
                    <p className="text-xs text-rose-800 bg-rose-50/60 border border-rose-100 rounded-lg p-2.5 mt-2">
                      <strong>Telemetry Diagnostic:</strong> {plan.finding}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                        Prescribed Remediation
                      </span>
                      <p className="font-semibold text-ink">{plan.action}</p>
                    </div>

                    <Button size="sm" className="rounded-xl bg-blue-600 text-white text-xs font-bold shrink-0">
                      Start Remediation Drill
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 5: COHORT & BATCH STANDING */}
      {activeTab === 'cohort' && (
        <div className="space-y-6">
          <Card className="rounded-2xl border border-line bg-surface p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-700 mb-2">
                  <GraduationCap size={13} />
                  CSE Class of 2026 Cohort
                </div>
                <h3 className="font-display text-base font-bold text-ink">
                  Batch Standing &amp; Department Leaderboard
                </h3>
                <p className="text-xs text-ink-muted">
                  Real-time rank calculated from solved problem weights, contest ratings, and project evaluations.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-center">
                  <span className="block text-[10px] uppercase font-bold text-blue-700">Your Standing</span>
                  <span className="font-display text-lg font-bold text-blue-900">Rank #14</span>
                  <span className="block text-[10px] text-blue-600">Top 3.3% of 420</span>
                </div>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-line bg-slate-50 text-[11px] font-bold text-ink-muted">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Roll No.</th>
                    <th className="py-3 px-4">Total XP</th>
                    <th className="py-3 px-4">Problems</th>
                    <th className="py-3 px-4">Contest Rating</th>
                    <th className="py-3 px-4">Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {cohortRankings.map((student) => (
                    <tr
                      key={student.roll}
                      className={cn(
                        'transition-colors',
                        student.isUser ? 'bg-rose-50/70 font-semibold' : 'hover:bg-slate-50/50',
                      )}
                    >
                      <td className="py-3 px-4 font-mono font-bold">
                        {student.rank === 1 ? '🥇 #1' : student.rank === 2 ? '🥈 #2' : student.rank === 3 ? '🥉 #3' : `#${student.rank}`}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-ink flex items-center gap-1.5">
                          {student.name}
                          {student.isUser && (
                            <span className="rounded bg-rose-600 text-white text-[9px] px-1.5 py-0.2">You</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-ink-muted">{student.roll}</td>
                      <td className="py-3 px-4 font-mono font-bold text-ink">{student.xp}</td>
                      <td className="py-3 px-4 font-mono text-ink">{student.solved}</td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">{student.contestRating}</td>
                      <td className="py-3 px-4">
                        <span className="rounded-full bg-slate-100 border border-line px-2 py-0.5 text-[10px] font-bold text-ink">
                          {student.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
