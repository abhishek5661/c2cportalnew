import { useState, useMemo } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Circle,
  Clock,
  Code2,
  Coins,
  Download,
  Edit3,
  ExternalLink,
  FileText,
  Filter,
  Flag,
  Flame,
  Gamepad2,
  Globe,
  Headphones,
  HelpCircle,
  Info,
  Laptop,
  Layers,
  Lightbulb,
  Mail,
  Medal,
  Megaphone,
  MessageSquare,
  Minus,
  Monitor,
  MoreVertical,
  Phone,
  Play,
  Plus,
  RotateCcw,
  Search,
  Share2,
  Shield,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Terminal,
  Timer,
  TrendingUp,
  Trophy,
  User,
  UserCheck,
  UserPlus,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { ProgressRing } from '../../components/ui/Progress'
import { cn } from '../../lib/cn'
import { leaderboard, user } from '../../data/mock'

// ==========================================
// Types & Data Models
// ==========================================

export interface ContestSummary {
  id: string
  slug: string
  title: string
  organizer: string
  date: string
  duration: string
  registeredCount: number
  problemCount: number
  prizePool?: string
  status: 'Live' | 'Upcoming' | 'Past'
  difficulty: 'Div 2' | 'Div 3' | 'Open'
  tags?: string[]
}

const hubContests: ContestSummary[] = [
  {
    id: 'cs2026',
    slug: 'codesprint-2026',
    title: 'CodeSprint 2026',
    organizer: 'c2cedge Platform',
    date: '25 Sep - 28 Sep 2026 · Starts in 19d',
    duration: '3 Days',
    registeredCount: 1200,
    problemCount: 8,
    prizePool: '₹1,50,000',
    status: 'Upcoming',
    difficulty: 'Open',
    tags: ['DSA', 'Web Dev', 'App Dev', 'AI/ML'],
  },
  {
    id: 'cs48',
    slug: 'codesprint-48',
    title: 'CodeSprint 48',
    organizer: 'c2cedge Platform',
    date: 'Live Now · Ends in 2d 14h',
    duration: '2 Hours',
    registeredCount: 3248,
    problemCount: 5,
    prizePool: '5,000 Coins',
    status: 'Live',
    difficulty: 'Open',
    tags: ['DSA', 'Arrays', 'DP'],
  },
  {
    id: 'c1',
    slug: 'weekly-sprint-42',
    title: 'c2cedge Weekly Sprint #42',
    organizer: 'c2cedge Platform',
    date: 'Saturday, 12 Sep · 7:00 PM IST',
    duration: '90 mins',
    registeredCount: 1420,
    problemCount: 4,
    status: 'Upcoming',
    difficulty: 'Div 2',
    tags: ['DSA', 'Math', 'Greedy'],
  },
  {
    id: 'c2',
    slug: 'national-college-league-r3',
    title: 'National College Coding League – Round 3',
    organizer: 'Inter-University League',
    date: 'Wednesday, 16 Sep · 8:00 PM IST',
    duration: '120 mins',
    registeredCount: 3850,
    problemCount: 5,
    prizePool: '₹75,000',
    status: 'Upcoming',
    difficulty: 'Open',
    tags: ['Algorithms', 'ICPC Style', 'DP'],
  },
  {
    id: 'c3',
    slug: 'speed-coding-arrays-dp',
    title: 'Speed Coding Challenge: Arrays & DP',
    organizer: 'c2cedge Platform',
    date: 'Last Saturday',
    duration: '60 mins',
    registeredCount: 980,
    problemCount: 3,
    status: 'Past',
    difficulty: 'Div 3',
    tags: ['Arrays', 'Strings'],
  },
  {
    id: 'c4',
    slug: 'graph-theory-grand-prix',
    title: 'Algorithmic Grand Prix: Graphs & Trees',
    organizer: 'c2cedge Platform',
    date: 'Sunday, 20 Sep · 6:00 PM IST',
    duration: '150 mins',
    registeredCount: 2150,
    problemCount: 6,
    prizePool: '10,000 Coins',
    status: 'Upcoming',
    difficulty: 'Open',
    tags: ['Graphs', 'Shortest Path', 'Trees'],
  },
]

const hackathons = [
  {
    id: 'h1',
    title: 'Smart Campus AI Hackathon 2024',
    theme: 'AI for Education & Campus Operations',
    format: '36 Hours Online · Build, Ship & Present',
    dates: '18–20 September',
    prizePool: '₹1,00,000',
    participants: 640,
    status: 'Registration Open',
  },
  {
    id: 'h2',
    title: 'National Cloud & Web3 Buildathon',
    theme: 'Decentralized Applications & Cloud Native',
    format: '48 Hours Hybrid · Final Presentation at Tech Park',
    dates: '02–04 October',
    prizePool: '₹2,50,000',
    participants: 1200,
    status: 'Registration Open',
  },
  {
    id: 'h3',
    title: 'GenAI & Agentic Systems Hackathon',
    theme: 'Autonomous Multi-Agent Systems & Tool Use',
    format: '24 Hours Virtual · Live Demo Day',
    dates: '10–12 October',
    prizePool: '₹1,50,000',
    participants: 890,
    status: 'Registration Open',
  },
]

interface ContestProblem {
  letter: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  acceptance: string
  points: number
  solved: boolean
  tags: string[]
  solutionSnippet?: string
}

const contestProblems: ContestProblem[] = [
  {
    letter: 'A',
    title: 'Two Sum',
    difficulty: 'Easy',
    acceptance: '58.71%',
    points: 100,
    solved: true,
    tags: ['Array', 'Hash Map'],
    solutionSnippet: `// Hash Map O(N) Approach
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
  },
  {
    letter: 'B',
    title: 'Subarray with Given Sum',
    difficulty: 'Medium',
    acceptance: '42.36%',
    points: 200,
    solved: true,
    tags: ['Two Pointers', 'Sliding Window'],
    solutionSnippet: `// Sliding Window O(N) Approach
function subarraySum(arr: number[], target: number): [number, number] | [-1] {
  let curr = 0, left = 0;
  for (let right = 0; right < arr.length; right++) {
    curr += arr[right];
    while (curr > target && left <= right) {
      curr -= arr[left++];
    }
    if (curr === target) return [left + 1, right + 1];
  }
  return [-1];
}`,
  },
  {
    letter: 'C',
    title: 'Maximum Subarray Sum',
    difficulty: 'Medium',
    acceptance: '37.12%',
    points: 200,
    solved: false,
    tags: ['Kadane Algorithm', 'DP'],
  },
  {
    letter: 'D',
    title: 'Count Inversions',
    difficulty: 'Hard',
    acceptance: '28.45%',
    points: 300,
    solved: false,
    tags: ['Merge Sort', 'Divide & Conquer', 'Fenwick Tree'],
  },
  {
    letter: 'E',
    title: 'DP on Grid',
    difficulty: 'Hard',
    acceptance: '21.09%',
    points: 300,
    solved: false,
    tags: ['Dynamic Programming', 'Matrix', 'Memoization'],
  },
]

interface LeaderboardEntry {
  rank: number
  name: string
  points: number
  penalty: string
  solvedCount: number
  isYou?: boolean
  solves: { [key: string]: { status: 'accepted' | 'failed' | 'unattempted'; time?: string; tries?: number } }
}

const liveLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Ananya',
    isYou: true,
    points: 500,
    penalty: '00:42:15',
    solvedCount: 2,
    solves: {
      A: { status: 'accepted', time: '00:08', tries: 1 },
      B: { status: 'accepted', time: '00:34', tries: 1 },
      C: { status: 'unattempted' },
      D: { status: 'unattempted' },
      E: { status: 'unattempted' },
    },
  },
  {
    rank: 2,
    name: 'Rohan Verma',
    isYou: false,
    points: 500,
    penalty: '00:58:30',
    solvedCount: 2,
    solves: {
      A: { status: 'accepted', time: '00:12', tries: 1 },
      B: { status: 'accepted', time: '00:46', tries: 2 },
      C: { status: 'unattempted' },
      D: { status: 'unattempted' },
      E: { status: 'unattempted' },
    },
  },
  {
    rank: 3,
    name: 'Priya Sharma',
    isYou: false,
    points: 400,
    penalty: '00:39:10',
    solvedCount: 2,
    solves: {
      A: { status: 'accepted', time: '00:15', tries: 1 },
      B: { status: 'accepted', time: '00:24', tries: 1 },
      C: { status: 'failed', tries: 2 },
      D: { status: 'unattempted' },
      E: { status: 'unattempted' },
    },
  },
  {
    rank: 4,
    name: 'Karthik Reddy',
    isYou: false,
    points: 400,
    penalty: '00:45:22',
    solvedCount: 2,
    solves: {
      A: { status: 'accepted', time: '00:18', tries: 1 },
      B: { status: 'accepted', time: '00:27', tries: 2 },
      C: { status: 'unattempted' },
      D: { status: 'unattempted' },
      E: { status: 'unattempted' },
    },
  },
  {
    rank: 5,
    name: 'Arjun Patel',
    isYou: false,
    points: 300,
    penalty: '00:19:40',
    solvedCount: 1,
    solves: {
      A: { status: 'accepted', time: '00:19', tries: 1 },
      B: { status: 'failed', tries: 3 },
      C: { status: 'unattempted' },
      D: { status: 'unattempted' },
      E: { status: 'unattempted' },
    },
  },
]

// ==========================================
// Main CompetePage Component
// ==========================================

export function CompetePage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Check if CodeSprint 2026 is requested: /compete/codesprint-2026
  const isCodeSprint2026 = useMemo(() => {
    const path = location.pathname.toLowerCase().replace(/\/$/, '')
    return path === '/compete/codesprint-2026' || path.startsWith('/compete/codesprint-2026')
  }, [location.pathname])

  // Determine if we should show the detail view for CodeSprint 48 or default
  const isDetailView = useMemo(() => {
    const path = location.pathname.toLowerCase().replace(/\/$/, '')
    return path === '/compete/codesprint-48' || (path.startsWith('/compete/') && path !== '/compete')
  }, [location.pathname])

  if (isCodeSprint2026) {
    return <CodeSprint2026DetailView onBack={() => navigate('/compete')} />
  }

  if (isDetailView) {
    return <ContestDetailView onBack={() => navigate('/compete')} />
  }

  return <ContestsHubView onSelectContest={(slug) => navigate(`/compete/${slug}`)} />
}

// ==========================================
// VIEW 1: Contests Hub (`/compete`)
// ==========================================

function ContestsHubView({ onSelectContest }: { onSelectContest: (slug: string) => void }) {
  const [activeTab, setActiveTab] = useState<'contests' | 'hackathons' | 'leaderboard'>('contests')
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'Live' | 'Upcoming' | 'Past'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredContests = useMemo(() => {
    return hubContests.filter((c) => {
      const matchesStatus = filterDifficulty === 'all' || c.status === filterDifficulty
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.tags && c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
      return matchesStatus && matchesSearch
    })
  }, [filterDifficulty, searchQuery])

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-900 via-indigo-900 to-navy-950 p-6 sm:p-8 text-white shadow-md">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
            <Trophy size={13} className="text-amber-400" />
            Pillar 3: Experience Building &amp; Contests
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Compete, Contest &amp; Hackathon Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Test your algorithmic skills under timed competition pressure. Climb the college leaderboard, take part in weekly timed sprints, and build winning hackathon products with peers.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTab('contests')}
              className={cn(
                'rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5',
                activeTab === 'contests'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400/40'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20',
              )}
            >
              <Code2 size={14} />
              Coding Contests (Weekly &amp; Live)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hackathons')}
              className={cn(
                'rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5',
                activeTab === 'hackathons'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400/40'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20',
              )}
            >
              <Users size={14} />
              Hackathons &amp; Team Finder
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('leaderboard')}
              className={cn(
                'rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5',
                activeTab === 'leaderboard'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400/40'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20',
              )}
            >
              <Trophy size={14} />
              College Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* User Contest Stats Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Contest Rating', value: '1,640', sub: 'Top 8% in College', icon: Trophy, tone: 'text-amber-500' },
          { label: 'Contests Solved', value: '28', sub: '86% attendance', icon: Code2, tone: 'text-blue-600' },
          { label: 'Best College Rank', value: '#4', sub: 'Round 2 Division', icon: Medal, tone: 'text-emerald-500' },
          { label: 'Current Streak', value: `${user.streakDays} Days`, sub: 'Active practice', icon: Flame, tone: 'text-orange-500' },
        ].map((stat, idx) => (
          <Card key={idx} className="rounded-xl border border-line bg-surface p-4 shadow-xs hover:border-brand-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink-muted font-medium">{stat.label}</span>
              <stat.icon size={16} className={stat.tone} />
            </div>
            <p className="font-display text-xl font-bold text-ink mt-2">{stat.value}</p>
            <p className="text-[11px] text-ink-muted mt-0.5">{stat.sub}</p>
          </Card>
        ))}
      </div>

      {/* FEATURED LIVE CONTEST HIGHLIGHT: CodeSprint 48 */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-400/60 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/40 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 text-xs font-bold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                LIVE NOW
              </span>
              <span className="rounded-md bg-blue-50 text-blue-700 px-2 py-0.5 text-xs font-semibold border border-blue-200">
                Ranked
              </span>
              <span className="rounded-md bg-amber-50 text-amber-800 px-2 py-0.5 text-xs font-semibold border border-amber-200">
                Prize: 5,000 Coins
              </span>
              <div className="flex gap-1">
                {['DSA', 'Arrays', 'DP'].map((t) => (
                  <span key={t} className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl sm:text-2xl font-black text-ink">
                CodeSprint 48
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted mt-0.5">
                Test your problem solving skills in this 2-hour coding contest. 5 algorithmic challenges are live.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                <Clock size={14} className="text-emerald-600" />
                Ends in 2d 14h 32m
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-blue-600" />
                3,248 participants
              </span>
              <span className="flex items-center gap-1.5">
                <Globe size={14} className="text-indigo-600" />
                Online · ICPC Style
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onSelectContest('codesprint-48')}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Enter Contest View
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: Contests List */}
      {activeTab === 'contests' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-base font-bold text-ink">
                Weekly &amp; Bi-Weekly Timed Contests
              </h2>
              <p className="text-xs text-ink-muted">
                Standard timed contests modeled after LeetCode, Codeforces, and ICPC style.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search contests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-44 sm:w-56 rounded-xl border border-line bg-surface pl-9 pr-3 text-xs text-ink placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex rounded-xl border border-line bg-surface p-0.5 text-xs">
                {(['all', 'Live', 'Upcoming', 'Past'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setFilterDifficulty(mode)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 font-semibold transition-colors capitalize',
                      filterDifficulty === mode
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:text-ink',
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3.5">
            {filteredContests.map((c) => (
              <Card
                key={c.id}
                className={cn(
                  'flex flex-col gap-4 rounded-2xl border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between transition-all shadow-xs cursor-pointer',
                  c.status === 'Live'
                    ? 'border-emerald-300 hover:border-emerald-500 bg-gradient-to-r from-emerald-50/20 to-white'
                    : 'border-line hover:border-blue-300',
                )}
                onClick={() => onSelectContest(c.slug)}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={cn(
                      'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border font-bold',
                      c.status === 'Live'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-blue-50 text-blue-600 border-blue-100',
                    )}
                  >
                    <Trophy size={20} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          'rounded-md px-2 py-0.5 text-[10px] font-bold border',
                          c.status === 'Live'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : c.status === 'Upcoming'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200',
                        )}
                      >
                        {c.status}
                      </span>
                      <span className="rounded-md bg-blue-50 text-blue-700 px-2 py-0.5 text-[10px] font-bold border border-blue-200">
                        {c.difficulty}
                      </span>
                      {c.prizePool ? (
                        <span className="rounded-md bg-amber-50 text-amber-800 px-2 py-0.5 text-[10px] font-bold border border-amber-200">
                          Prize: {c.prizePool}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="font-display text-sm sm:text-base font-bold text-ink mt-1.5 hover:text-brand-600 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5 flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {c.date}
                      </span>
                      <span>•</span>
                      <span>{c.duration}</span>
                      <span>•</span>
                      <span>{c.problemCount} Problems</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <div className="text-right hidden sm:block text-xs">
                    <span className="font-bold text-ink block">
                      {c.registeredCount.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-ink-muted">Registered</span>
                  </div>

                  <Button
                    size="sm"
                    className={cn(
                      'px-4 text-xs font-semibold rounded-xl',
                      c.status === 'Live'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : c.status === 'Upcoming'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectContest(c.slug)
                    }}
                  >
                    {c.status === 'Live'
                      ? 'Solve Live'
                      : c.status === 'Upcoming'
                        ? 'Register Now'
                        : 'View Editorial'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Hackathons & Team Finder */}
      {activeTab === 'hackathons' && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hackathons.map((h) => (
              <Card key={h.id} className="rounded-2xl border border-line bg-surface p-5 space-y-4 flex flex-col justify-between hover:border-brand-500/40 transition-colors shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold">
                      {h.status}
                    </span>
                    <span className="font-display text-xs font-black text-amber-600">
                      Prize: {h.prizePool}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      {h.title}
                    </h3>
                    <p className="text-xs font-medium text-blue-600 mt-1">
                      Theme: {h.theme}
                    </p>
                    <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">
                      {h.format}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-2 font-mono">
                      {h.dates} • {h.participants} Hackers Registered
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    <UserPlus size={14} /> Find Teammates
                  </button>
                  <Button size="sm" className="bg-blue-600 text-white text-xs rounded-xl">
                    Apply Team
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: College Coding League */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          <Card className="p-0 overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
            <div className="border-b border-line px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-sm font-bold text-ink">
                  College Coding League – Global Standings
                </h3>
                <p className="text-xs text-ink-muted">
                  Ranked by contest score, XP, and verified algorithmic solves.
                </p>
              </div>
              <span className="rounded-lg bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 text-xs font-bold self-start sm:self-auto">
                Batch 2024–2028 · Division 1
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-line bg-slate-50/60 text-left text-ink-muted">
                    <th className="px-5 py-3 font-bold">Rank</th>
                    <th className="px-5 py-3 font-bold">Student</th>
                    <th className="px-5 py-3 font-bold">Total XP</th>
                    <th className="px-5 py-3 font-bold">Contest Rating</th>
                    <th className="px-5 py-3 font-bold">Problems Solved</th>
                    <th className="px-5 py-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {leaderboard.map((student) => (
                    <tr
                      key={student.rank}
                      className={cn(
                        'transition-colors',
                        student.you ? 'bg-blue-50/80 font-bold' : 'hover:bg-surface-subtle',
                      )}
                    >
                      <td className="px-5 py-3.5 font-mono font-bold">
                        {student.rank === 1 ? '🥇 #1' : student.rank === 2 ? '🥈 #2' : student.rank === 3 ? '🥉 #3' : `#${student.rank}`}
                      </td>
                      <td className="px-5 py-3.5 text-ink font-semibold">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
                            {student.name[0]}
                          </div>
                          <span>{student.name}</span>
                          {student.you ? (
                            <span className="rounded bg-brand-600 text-white text-[10px] font-bold px-1.5 py-0.2">
                              YOU
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-ink">
                        {student.xp} XP
                      </td>
                      <td className="px-5 py-3.5 font-mono font-bold text-blue-600">
                        {1800 - student.rank * 40}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-slate-600">
                        {35 - student.rank * 4} Solved
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                          <Zap size={12} /> Active Streak
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

// ==========================================
// VIEW 3: Contest Detail View: CodeSprint 2026
// (Matches Images 4, 3, 2: Overview, Details, Timeline)
// ==========================================

function CodeSprint2026DetailView({ onBack }: { onBack: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()

  // Read tab from URL query if present
  const queryParams = new URLSearchParams(location.search)
  const qTab = queryParams.get('tab')?.toLowerCase()
  let parsedTab = 'Overview'
  if (qTab === 'details') parsedTab = 'Details'
  else if (qTab === 'timeline') parsedTab = 'Timeline'
  else if (qTab === 'tracks') parsedTab = 'Tracks'
  else if (qTab === 'rules') parsedTab = 'Rules'
  else if (qTab === 'prizes') parsedTab = 'Prizes'
  else if (qTab === 'participants') parsedTab = 'Participants'
  else if (qTab === 'leaderboard') parsedTab = 'Leaderboard'
  else if (qTab === 'updates') parsedTab = 'Updates'
  else if (qTab === 'faqs' || qTab === 'faq') parsedTab = 'FAQs'
  else if (qTab === 'my-journey' || qTab === 'journey' || qTab === 'myjourney') parsedTab = 'My Journey'

  const [activeTab, setActiveTab] = useState<string>(parsedTab)
  const [registered, setRegistered] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null)

  // Rules tab states
  const [activeRuleId, setActiveRuleId] = useState<number>(1)
  const [rulesExpanded, setRulesExpanded] = useState<boolean>(false)

  // FAQs tab states
  const [faqCategory, setFaqCategory] = useState<string>('All Questions')
  const [faqSearch, setFaqSearch] = useState<string>('')
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(1)

  // Updates tab states
  const [updatesCategory, setUpdatesCategory] = useState<string>('All Updates')
  const [updatesPage, setUpdatesPage] = useState<number>(1)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleSwitchTab = (tabName: string) => {
    setActiveTab(tabName)
    const slug = tabName === 'My Journey' ? 'my-journey' : tabName.toLowerCase()
    navigate(`/compete/codesprint-2026?tab=${slug}`, { replace: true })
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-blue-200 bg-brand-600 px-4 py-2.5 text-xs font-semibold text-white shadow-pop transition-all animate-bounce">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-ink-muted flex-wrap">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-brand-600 flex items-center gap-1 text-slate-500 transition-colors"
        >
          <ArrowLeft size={13} />
          Competitions
        </button>
        <ChevronRight size={13} className="text-slate-400" />
        <button
          type="button"
          onClick={() => handleSwitchTab('Overview')}
          className={cn(
            'transition-colors',
            activeTab.toLowerCase() === 'overview' ? 'font-bold text-ink' : 'hover:text-brand-600 text-slate-600'
          )}
        >
          CodeSprint 2026
        </button>
        {activeTab.toLowerCase() !== 'overview' && (
          <>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="font-bold text-ink">{activeTab}</span>
          </>
        )}
      </nav>

      {/* 2. Header Card */}
      <Card className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Tile icon: </> in dark purple square */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-900 to-navy-950 text-indigo-300 font-mono text-2xl font-bold shadow-md border border-indigo-700/40">
              <Code2 size={32} className="stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  CodeSprint 2026
                </h1>
                {activeTab.toLowerCase() === 'overview' ? (
                  <span className="rounded-md bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 text-xs font-bold">
                    Upcoming
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                    </span>
                    Live Now
                  </span>
                )}
              </div>

              <p className="max-w-2xl text-xs sm:text-sm text-ink-muted leading-relaxed">
                {activeTab.toLowerCase() === 'overview'
                  ? 'A national level coding competition to test your problem solving, DSA and development skills. Build, compete and win!'
                  : 'National Level Coding Competition • Code. Solve. Innovate. Compete.'}
              </p>

              {/* Metadata Badges Strip */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-ink-muted">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-subtle px-2.5 py-1 text-slate-700 font-medium">
                  <Calendar size={13} className="text-indigo-600" />
                  25 Sep – 28 Sep 2026
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-subtle px-2.5 py-1 text-slate-700 font-medium">
                  <Users size={13} className="text-emerald-600" />
                  1200+ Registered
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-subtle px-2.5 py-1 text-slate-700 font-medium">
                  <UserCheck size={13} className="text-blue-600" />
                  {activeTab.toLowerCase() === 'overview' ? 'Individual / Team' : 'Open to All'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-subtle px-2.5 py-1 text-slate-700 font-medium">
                  <Globe size={13} className="text-purple-600" />
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Countdown Widget */}
          <div className="flex shrink-0 flex-col items-start lg:items-end justify-center border-t border-line/60 pt-4 lg:border-t-0 lg:pt-0">
            <span className="text-xs font-semibold text-ink-muted mb-2">
              {activeTab.toLowerCase() === 'overview' ? 'Starts in' : 'Registration Closes In'}
            </span>
            <div className="flex items-center gap-2">
              {[
                { val: activeTab.toLowerCase() === 'overview' ? '19' : '02', label: 'Days' },
                { val: '14', label: 'Hours' },
                { val: '32', label: 'Mins' },
                { val: '45', label: 'Secs' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-subtle px-2.5 sm:px-3 py-1.5 shadow-2xs min-w-[50px]"
                >
                  <span className="font-display text-lg sm:text-xl font-black text-indigo-700">
                    {item.val}
                  </span>
                  <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-line flex items-center gap-1 overflow-x-auto scrollbar-none">
        {[
          'Overview',
          'Details',
          'Timeline',
          'Tracks',
          'Rules',
          'Prizes',
          'Participants',
          'Leaderboard',
          'Updates',
          'FAQs',
          'My Journey',
        ].map((tab) => {
          const active = activeTab.toLowerCase() === tab.toLowerCase()
          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleSwitchTab(tab)}
              className={cn(
                'whitespace-nowrap border-b-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all',
                active
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-ink-muted hover:border-slate-300 hover:text-ink'
              )}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* 4. TAB 1: OVERVIEW TAB (IMAGE 4) */}
      {activeTab.toLowerCase() === 'overview' && (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Left Column */}
          <div className="min-w-0 space-y-6">
            {/* About CodeSprint 2026 */}
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-bold text-ink">About CodeSprint 2026</h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed max-w-2xl">
                    CodeSprint is an annual coding competition that brings together problem solvers,
                    developers and innovators from across the country. Solve real-world problems, build
                    impactful solutions and compete for exciting prizes.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setRegistered(true)
                      showToast('Successfully registered for CodeSprint 2026!')
                    }}
                    className={cn(
                      'rounded-xl text-xs font-semibold px-5',
                      registered ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-brand-600 hover:bg-brand-700 text-white'
                    )}
                  >
                    {registered ? 'Registered ✓' : 'Register Now'}
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href)
                      showToast('Competition link copied to clipboard!')
                    }}
                    className="rounded-xl text-xs font-semibold"
                    leadingIcon={<Share2 size={14} />}
                  >
                    Share
                  </Button>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="pt-3">
                <h4 className="font-display text-xs font-bold text-ink uppercase tracking-wider mb-3">
                  Key Highlights
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      title: 'Multiple Tracks',
                      desc: 'Choose your domain and compete',
                      icon: Layers,
                      color: 'bg-purple-100 text-purple-700 border-purple-200',
                    },
                    {
                      title: 'Real-world Problems',
                      desc: 'Solve industry grade challenges',
                      icon: Globe,
                      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                    },
                    {
                      title: 'Exciting Prizes',
                      desc: 'Win cash prizes and goodies',
                      icon: Trophy,
                      color: 'bg-amber-100 text-amber-700 border-amber-200',
                    },
                    {
                      title: 'Certificates',
                      desc: 'Participation certificates for all',
                      icon: FileText,
                      color: 'bg-blue-100 text-blue-700 border-blue-200',
                    },
                  ].map((h, idx) => {
                    const Icon = h.icon
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-2 hover:border-brand-200 transition-colors"
                      >
                        <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg border shadow-2xs', h.color)}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-ink">{h.title}</div>
                          <div className="text-[11px] text-ink-muted mt-0.5 leading-snug">{h.desc}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>

            {/* Tracks */}
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-ink">Tracks</h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: 'Algorithmic Challenge',
                    desc: 'Data Structures, Algorithms, DP, Graphs and more',
                    badge: 'Individual',
                    badgeTone: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    icon: Code2,
                    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                  },
                  {
                    title: 'Web Development',
                    desc: 'Build full-stack web apps with modern tech',
                    badge: 'Individual / Team',
                    badgeTone: 'bg-blue-50 text-blue-700 border-blue-200',
                    icon: Monitor,
                    color: 'bg-blue-100 text-blue-700 border-blue-200',
                  },
                  {
                    title: 'App Development',
                    desc: 'Build innovative mobile applications',
                    badge: 'Team (2 - 4)',
                    badgeTone: 'bg-orange-50 text-orange-700 border-orange-200',
                    icon: Smartphone,
                    color: 'bg-orange-100 text-orange-700 border-orange-200',
                  },
                  {
                    title: 'AI/ML Challenge',
                    desc: 'Machine Learning, NLP, Computer Vision problems',
                    badge: 'Individual / Team',
                    badgeTone: 'bg-purple-50 text-purple-700 border-purple-200',
                    icon: Brain,
                    color: 'bg-purple-100 text-purple-700 border-purple-200',
                  },
                ].map((track, idx) => {
                  const Icon = track.icon
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-line bg-surface p-4 space-y-3 hover:border-brand-300 transition-colors shadow-2xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-2xs', track.color)}>
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-display text-xs sm:text-sm font-bold text-ink truncate">
                            {track.title}
                          </h4>
                          <p className="text-[11px] text-ink-muted mt-0.5 leading-snug">
                            {track.desc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-1">
                        <span className={cn('rounded px-2 py-0.5 text-[10px] font-bold border', track.badgeTone)}>
                          {track.badge}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pt-2 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSwitchTab('Tracks')}
                  className="rounded-xl text-xs font-semibold px-6"
                >
                  View All Tracks
                </Button>
              </div>
            </Card>

            {/* Previous Edition Winners (2025) */}
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-ink">Previous Edition Winners (2025)</h3>
                <button
                  type="button"
                  onClick={() => showToast('Opening previous edition hall of fame')}
                  className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
                >
                  View All Winners <ArrowRight size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  {
                    place: '1st Place',
                    team: 'Team Code Warriors',
                    prize: '₹75,000 + Goodies',
                    icon: Trophy,
                    color: 'bg-amber-50 text-amber-600 border-amber-200',
                  },
                  {
                    place: '2nd Place',
                    team: 'Binary Brains',
                    prize: '₹50,000 + Goodies',
                    icon: Medal,
                    color: 'bg-slate-100 text-slate-600 border-slate-200',
                  },
                  {
                    place: '3rd Place',
                    team: 'Algo Avengers',
                    prize: '₹25,000 + Goodies',
                    icon: Award,
                    color: 'bg-orange-50 text-orange-600 border-orange-200',
                  },
                ].map((w, idx) => {
                  const Icon = w.icon
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-line bg-surface-subtle p-4 text-center space-y-2 hover:border-brand-200 transition-colors"
                    >
                      <div className={cn('mx-auto flex h-11 w-11 items-center justify-center rounded-full border shadow-2xs', w.color)}>
                        <Icon size={22} />
                      </div>
                      <div className="text-[11px] font-bold text-ink-muted uppercase">{w.place}</div>
                      <div className="font-display text-xs sm:text-sm font-bold text-ink">{w.team}</div>
                      <div className="text-xs font-semibold text-emerald-600">{w.prize}</div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Right Rail */}
          <aside className="space-y-6">
            {/* Competition Overview */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
              <h3 className="font-display text-sm font-bold text-ink">Competition Overview</h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Registration Open
                  </span>
                  <span className="font-medium text-slate-700">1 Aug – 24 Sep 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <Calendar size={13} />
                    Competition Dates
                  </span>
                  <span className="font-medium text-slate-700">25 Sep – 28 Sep 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <Monitor size={13} />
                    Mode
                  </span>
                  <span className="font-medium text-slate-700">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <Users size={13} />
                    Eligibility
                  </span>
                  <span className="font-medium text-slate-700">All Students</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <Building2 size={13} />
                    Organized By
                  </span>
                  <span className="font-bold text-brand-600">c2cedge</span>
                </div>
              </div>
            </Card>

            {/* Registration Progress */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-ink">Registration Progress</h3>
                <span className="font-display text-xs font-bold text-brand-600">60%</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-ink">
                  <span>1200 / 2000</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-brand-600 transition-all" style={{ width: '60%' }} />
                </div>
                <div className="text-[11px] text-ink-muted">800 seats left</div>
              </div>
            </Card>

            {/* Popular Tracks */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-ink">Popular Tracks</h3>
                <button
                  type="button"
                  onClick={() => handleSwitchTab('Tracks')}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { name: 'Algorithmic Challenge', count: '642 registered', pct: '65%', color: 'bg-emerald-500' },
                  { name: 'Web Development', count: '368 registered', pct: '37%', color: 'bg-blue-600' },
                  { name: 'App Development', count: '128 registered', pct: '13%', color: 'bg-orange-500' },
                  { name: 'AI/ML Challenge', count: '62 registered', pct: '6%', color: 'bg-purple-600' },
                ].map((track, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink">{track.name}</span>
                      <span className="text-[11px] text-ink-muted">{track.count}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className={cn('h-full rounded-full', track.color)} style={{ width: track.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
              <h3 className="font-display text-sm font-bold text-ink">Quick Actions</h3>
              <div className="space-y-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => handleSwitchTab('Timeline')}
                  className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-ink-muted" />
                    Competition Timeline
                  </span>
                  <ChevronRight size={14} className="text-ink-muted" />
                </button>

                <button
                  type="button"
                  onClick={() => showToast('Downloading CodeSprint 2026 Brochure (PDF)...')}
                  className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Download size={14} className="text-ink-muted" />
                    Download Brochure
                  </span>
                  <ChevronRight size={14} className="text-ink-muted" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSwitchTab('Rules')}
                  className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={14} className="text-ink-muted" />
                    Rules &amp; Guidelines
                  </span>
                  <ChevronRight size={14} className="text-ink-muted" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSwitchTab('FAQs')}
                  className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle size={14} className="text-ink-muted" />
                    FAQ
                  </span>
                  <ChevronRight size={14} className="text-ink-muted" />
                </button>
              </div>
            </Card>
          </aside>
        </div>
      )}

      {/* 5. TAB 2: DETAILS TAB (IMAGE 3) */}
      {activeTab.toLowerCase() === 'details' && (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Left Column */}
          <div className="min-w-0 space-y-6">
            {/* About the Competition */}
            <Card className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-card">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <h3 className="font-display text-base font-bold text-ink">About the Competition</h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    CodeSprint 2026 is a national level online coding competition that brings together
                    problem solvers, developers and innovators from across the country. Participants
                    will solve real-world problems, showcase their skills and compete for exciting
                    prizes.
                  </p>
                </div>

                {/* Laptop & Trophy Illustration */}
                <div className="relative shrink-0 flex items-center justify-center p-4">
                  <div className="relative flex h-28 w-44 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-950 to-slate-900 border border-slate-700 shadow-lg text-indigo-300">
                    <Laptop size={44} className="text-indigo-400" />
                    <div className="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-navy-950 font-bold shadow-md ring-4 ring-surface">
                      <Trophy size={24} className="fill-navy-950" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Eligibility & Team Size */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <Users size={22} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-ink">Who Can Participate?</h4>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                    All students from any stream and any year are eligible to participate.
                  </p>
                </div>
              </Card>

              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 border border-orange-200">
                  <UserPlus size={22} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-ink">Team Size</h4>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                    Individual or Team <span className="font-medium text-slate-700">(Team size: 2 – 4 members)</span>
                  </p>
                </div>
              </Card>
            </div>

            {/* Competition Format (4 Step Process) */}
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card space-y-4">
              <h3 className="font-display text-base font-bold text-ink">Competition Format</h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 relative">
                {[
                  {
                    step: 1,
                    title: 'Register',
                    desc: 'Sign up and complete your registration.',
                    icon: Edit3,
                    numBg: 'bg-emerald-600 text-white',
                    iconColor: 'text-emerald-600',
                  },
                  {
                    step: 2,
                    title: 'Solve',
                    desc: 'Solve problems in your selected track.',
                    icon: Code2,
                    numBg: 'bg-blue-600 text-white',
                    iconColor: 'text-blue-600',
                  },
                  {
                    step: 3,
                    title: 'Submit',
                    desc: 'Submit your solutions before the deadline.',
                    icon: Trophy,
                    numBg: 'bg-purple-600 text-white',
                    iconColor: 'text-purple-600',
                  },
                  {
                    step: 4,
                    title: 'Win',
                    desc: 'Top performers win exciting prizes!',
                    icon: Award,
                    numBg: 'bg-orange-600 text-white',
                    iconColor: 'text-orange-600',
                  },
                ].map((st, idx) => {
                  const Icon = st.icon
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-line bg-surface-subtle p-4 space-y-3 relative hover:border-brand-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className={cn('flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shadow-2xs', st.numBg)}>
                          {st.step}
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-line">
                          <Icon size={16} className={st.iconColor} />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-display text-sm font-bold text-ink">{st.title}</h4>
                        <p className="text-xs text-ink-muted mt-1 leading-relaxed">{st.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Key Highlights */}
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card space-y-4">
              <h3 className="font-display text-base font-bold text-ink">Key Highlights</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    title: 'Multiple Tracks',
                    desc: 'Compete in various domains',
                    icon: Layers,
                    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  },
                  {
                    title: 'Real-world Problems',
                    desc: 'Solve practical and industry relevant challenges',
                    icon: Globe,
                    color: 'bg-blue-50 text-blue-700 border-blue-200',
                  },
                  {
                    title: 'Exciting Prizes',
                    desc: 'Win cash prizes and goodies',
                    icon: Trophy,
                    color: 'bg-purple-50 text-purple-700 border-purple-200',
                  },
                  {
                    title: 'Certificates',
                    desc: 'Participation certificates for all',
                    icon: Award,
                    color: 'bg-amber-50 text-amber-700 border-amber-200',
                  },
                ].map((h, idx) => {
                  const Icon = h.icon
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-2 hover:border-brand-200 transition-colors"
                    >
                      <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg border shadow-2xs', h.color)}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink">{h.title}</div>
                        <div className="text-[11px] text-ink-muted mt-0.5 leading-snug">{h.desc}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Right Rail */}
          <aside className="space-y-6">
            {/* Key Information */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
              <h3 className="font-display text-sm font-bold text-ink">Key Information</h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <Monitor size={13} />
                    Mode
                  </span>
                  <span className="font-medium text-slate-700">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <Users size={13} />
                    Eligibility
                  </span>
                  <span className="font-medium text-slate-700">All Students</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <Building2 size={13} />
                    Organisation
                  </span>
                  <span className="font-bold text-brand-600">c2cedge</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <Mail size={13} />
                    Contact
                  </span>
                  <span className="font-medium text-brand-600">support@c2cedge.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-ink-muted">
                    <Globe size={13} />
                    Website
                  </span>
                  <span className="font-medium text-brand-600">www.c2cedge.com/codesprint2026</span>
                </div>
              </div>
            </Card>

            {/* Register Now */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
              <h3 className="font-display text-sm font-bold text-ink">Register Now</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Hurry up! Limited seats available.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setRegistered(true)
                  showToast('Registered for CodeSprint 2026!')
                }}
                className="w-full bg-brand-600 text-white hover:bg-brand-700 text-xs font-semibold"
              >
                {registered ? 'Registered ✓' : 'Register Now'}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href)
                  showToast('Competition link copied!')
                }}
                className="w-full text-xs font-semibold"
                leadingIcon={<Share2 size={13} />}
              >
                Share Competition
              </Button>
            </Card>

            {/* Documents */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
              <h3 className="font-display text-sm font-bold text-ink">Documents</h3>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'Brochure', size: 'PDF • 1.2 MB' },
                  { name: 'Rules & Guidelines', size: 'PDF • 850 KB' },
                  { name: 'FAQs', size: 'PDF • 620 KB' },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-line bg-surface-subtle p-2.5 hover:border-brand-300 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText size={16} className="text-brand-600" />
                      <div>
                        <div className="font-semibold text-ink">{doc.name}</div>
                        <div className="text-[10px] text-ink-muted">{doc.size}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast(`Downloading ${doc.name}...`)}
                      className="p-1 text-ink-muted hover:text-brand-600"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
              <h3 className="font-display text-sm font-bold text-ink">Quick Links</h3>
              <div className="space-y-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => handleSwitchTab('Timeline')}
                  className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-ink-muted" />
                    Timeline
                  </span>
                  <ChevronRight size={14} className="text-ink-muted" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSwitchTab('Tracks')}
                  className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Code2 size={14} className="text-ink-muted" />
                    Tracks
                  </span>
                  <ChevronRight size={14} className="text-ink-muted" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSwitchTab('Rules')}
                  className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={14} className="text-ink-muted" />
                    Rules
                  </span>
                  <ChevronRight size={14} className="text-ink-muted" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSwitchTab('Prizes')}
                  className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Trophy size={14} className="text-ink-muted" />
                    Prize Details
                  </span>
                  <ChevronRight size={14} className="text-ink-muted" />
                </button>
              </div>
            </Card>
          </aside>
        </div>
      )}

      {/* 6. TAB 3: TIMELINE TAB (IMAGE 5: media_1788779818674.png) */}
      {activeTab.toLowerCase() === 'timeline' && (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Left Column */}
          <div className="min-w-0 space-y-6">
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-bold text-ink">Competition Timeline</h3>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    All important dates and milestones for CodeSprint 2026.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Synced CodeSprint 2026 with your Calendar!')}
                  className="rounded-xl border-line text-xs font-semibold shrink-0"
                  leadingIcon={<Calendar size={13} className="text-indigo-600" />}
                >
                  + Add to Calendar
                </Button>
              </div>

              {/* 8 Connected Milestones */}
              <div className="space-y-4 relative pl-8 before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-line">
                {[
                  {
                    id: 1,
                    title: 'Registrations Open',
                    desc: 'Start registering your team for CodeSprint 2026.',
                    date: '20 Aug 2026',
                    time: '10:00 AM',
                    badge: 'Completed',
                    badgeTone: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    icon: <Megaphone size={14} />,
                    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
                  },
                  {
                    id: 2,
                    title: 'Registrations Close',
                    desc: 'Last date to register for the competition.',
                    date: '24 Sep 2026',
                    time: '11:59 PM',
                    badge: 'Upcoming',
                    badgeTone: 'bg-blue-50 text-blue-700 border-blue-200',
                    icon: <FileText size={14} />,
                    iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
                  },
                  {
                    id: 3,
                    title: 'Problem Statements Released',
                    desc: 'Problem statements will be released for all tracks.',
                    date: '25 Sep 2026',
                    time: '09:00 AM',
                    badge: 'Upcoming',
                    badgeTone: 'bg-blue-50 text-blue-700 border-blue-200',
                    icon: <Layers size={14} />,
                    iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
                  },
                  {
                    id: 4,
                    title: 'Competition Starts',
                    desc: 'The coding battle begins!',
                    date: '25 Sep 2026',
                    time: '10:00 AM',
                    badge: 'Upcoming',
                    badgeTone: 'bg-blue-50 text-blue-700 border-blue-200',
                    icon: <Play size={14} />,
                    iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
                  },
                  {
                    id: 5,
                    title: 'Mid Evaluation',
                    desc: 'Partial evaluation and standings update.',
                    date: '26 Sep 2026',
                    time: '09:00 AM',
                    badge: 'Upcoming',
                    badgeTone: 'bg-blue-50 text-blue-700 border-blue-200',
                    icon: <Clock size={14} />,
                    iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
                  },
                  {
                    id: 6,
                    title: 'Final Submission Deadline',
                    desc: 'Last date and time to submit solutions.',
                    date: '27 Sep 2026',
                    time: '06:00 PM',
                    badge: 'Upcoming',
                    badgeTone: 'bg-blue-50 text-blue-700 border-blue-200',
                    icon: <Flag size={14} />,
                    iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
                  },
                  {
                    id: 7,
                    title: 'Winners Announcement',
                    desc: 'Winners will be announced and celebrated.',
                    date: '28 Sep 2026',
                    time: '07:00 PM',
                    badge: 'Upcoming',
                    badgeTone: 'bg-blue-50 text-blue-700 border-blue-200',
                    icon: <Trophy size={14} />,
                    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
                  },
                  {
                    id: 8,
                    title: 'Certificates & Prizes Distribution',
                    desc: 'E-certificates and prizes will be distributed.',
                    date: '05 Oct 2026',
                    time: 'Onwards',
                    badge: 'Upcoming',
                    badgeTone: 'bg-blue-50 text-blue-700 border-blue-200',
                    icon: <Award size={14} />,
                    iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
                  },
                ].map((ms) => (
                  <div
                    key={ms.id}
                    className="relative flex items-center justify-between p-3 rounded-2xl border border-line bg-surface-subtle/50 hover:bg-slate-50 transition-colors"
                  >
                    {/* Timeline dot icon */}
                    <div className={cn(
                      'absolute -left-8 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border bg-surface shadow-2xs',
                      ms.iconBg
                    )}>
                      {ms.icon}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-display text-xs sm:text-sm font-bold text-ink">{ms.title}</h4>
                      <p className="text-[11px] sm:text-xs text-ink-muted">{ms.desc}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-right">
                      <div>
                        <div className="text-xs font-bold text-slate-800">{ms.date}</div>
                        <div className="text-[10px] text-ink-muted">{ms.time}</div>
                      </div>
                      <span className={cn('rounded-full border px-2.5 py-0.5 text-[10px] font-semibold', ms.badgeTone)}>
                        {ms.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Callout Banner */}
              <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3.5 text-xs text-indigo-900">
                <Info size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-indigo-800">
                  Dates are subject to change. All updates will be communicated via email and dashboard notifications.
                </p>
              </div>
            </Card>
          </div>

          {/* Right Rail */}
          <aside className="space-y-6">
            {/* Key Information */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
              <h3 className="font-display text-sm font-bold text-ink">Key Information</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-line/40">
                  <span className="text-ink-muted flex items-center gap-1.5"><Monitor size={13} className="text-indigo-600" /> Mode</span>
                  <span className="font-semibold text-ink">Online</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-line/40">
                  <span className="text-ink-muted flex items-center gap-1.5"><Users size={13} className="text-purple-600" /> Team Size</span>
                  <span className="font-semibold text-ink">1 or Team (2 – 4)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-line/40">
                  <span className="text-ink-muted flex items-center gap-1.5"><UserCheck size={13} className="text-emerald-600" /> Eligibility</span>
                  <span className="font-semibold text-ink">All Students</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-line/40">
                  <span className="text-ink-muted flex items-center gap-1.5"><Building2 size={13} className="text-blue-600" /> Organised By</span>
                  <span className="font-bold text-brand-600">c2cedge</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-line/40">
                  <span className="text-ink-muted flex items-center gap-1.5"><Mail size={13} className="text-amber-600" /> Contact</span>
                  <span className="font-medium text-slate-700">support@c2cedge.com</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-ink-muted flex items-center gap-1.5"><Globe size={13} className="text-cyan-600" /> Website</span>
                  <span className="font-medium text-brand-600 truncate max-w-[160px]">www.c2cedge.com/codesprint2026</span>
                </div>
              </div>
            </Card>

            {/* Upcoming Milestones */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-ink">Upcoming Milestones</h3>
                <button
                  type="button"
                  onClick={() => handleSwitchTab('Timeline')}
                  className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                >
                  View Full Timeline <ArrowRight size={11} />
                </button>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <div className="font-bold text-ink">25 Sep 2026, 10:00 AM</div>
                    <div className="text-[11px] text-ink-muted">Competition Starts</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <div className="font-bold text-ink">26 Sep 2026, 09:00 AM</div>
                    <div className="text-[11px] text-ink-muted">Mid Evaluation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div>
                    <div className="font-bold text-ink">27 Sep 2026, 06:00 PM</div>
                    <div className="text-[11px] text-ink-muted">Final Submission Deadline</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  <div>
                    <div className="font-bold text-ink">28 Sep 2026, 07:00 PM</div>
                    <div className="text-[11px] text-ink-muted">Winners Announcement</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Downloads */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
              <h3 className="font-display text-sm font-bold text-ink">Downloads</h3>
              <div className="space-y-2">
                {[
                  { name: 'Participant Guide', size: 'PDF • 1.2 MB' },
                  { name: 'Rules & Guidelines', size: 'PDF • 850 KB' },
                  { name: 'Timeline', size: 'PDF • 620 KB' },
                  { name: 'FAQ Document', size: 'PDF • 420 KB' },
                  { name: 'Banner Kit', size: 'ZIP • 5.4 MB' },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-line bg-surface-subtle p-2.5 transition-colors hover:bg-slate-100/70"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText size={15} className="text-indigo-600 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-ink">{doc.name}</div>
                        <div className="text-[10px] text-ink-muted">{doc.size}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast(`Downloading ${doc.name}...`)}
                      className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-ink transition-colors"
                    >
                      <Download size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      )}

      {/* 4. TRACKS TAB (Image 1: media_1788776369749.png) */}
      {activeTab.toLowerCase() === 'tracks' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-ink">Competition Tracks</h2>
              <p className="text-xs sm:text-sm text-ink-muted">Choose a track that matches your skills and interests.</p>
            </div>

            {/* 5 Track Cards */}
            <div className="space-y-4">
              {[
                {
                  id: 'algo',
                  title: 'Algorithmic Challenge',
                  badge: 'Most Popular',
                  icon: <Terminal size={22} className="stroke-[2.5]" />,
                  iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
                  desc: 'Test your problem-solving skills with algorithmic and data structure challenges.',
                  format: 'Individual',
                  level: 'All Levels',
                  duration: '2.5 Hours',
                  difficulty: 'Easy – Hard',
                  participants: '642',
                },
                {
                  id: 'app',
                  title: 'App Development',
                  icon: <Code2 size={22} className="stroke-[2.2]" />,
                  iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
                  desc: 'Build innovative and impactful applications to solve real-world problems.',
                  format: 'Team (2 - 4)',
                  level: 'All Levels',
                  duration: '3.5 Hours',
                  difficulty: 'Medium – Hard',
                  participants: '312',
                },
                {
                  id: 'aiml',
                  title: 'AI/ML Challenge',
                  icon: <Brain size={22} className="stroke-[2.2]" />,
                  iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
                  desc: 'Solve problems using machine learning and artificial intelligence.',
                  format: 'Individual',
                  level: 'Intermediate+',
                  duration: '3 Hours',
                  difficulty: 'Medium – Hard',
                  participants: '198',
                },
                {
                  id: 'cyber',
                  title: 'Cyber Security Challenge',
                  icon: <ShieldCheck size={22} className="stroke-[2.2]" />,
                  iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
                  desc: 'Find vulnerabilities, solve security puzzles and protect systems.',
                  format: 'Individual',
                  level: 'Intermediate+',
                  duration: '2.5 Hours',
                  difficulty: 'Medium – Hard',
                  participants: '146',
                },
                {
                  id: 'gamedev',
                  title: 'Game Development',
                  icon: <Gamepad2 size={22} className="stroke-[2.2]" />,
                  iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
                  desc: 'Create engaging games with innovative gameplay and design.',
                  format: 'Team (2 - 4)',
                  level: 'All Levels',
                  duration: '3.5 Hours',
                  difficulty: 'Medium',
                  participants: '102',
                },
              ].map((track) => (
                <Card
                  key={track.id}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-5 sm:p-6 transition-all hover:border-slate-300 hover:shadow-card cursor-pointer"
                  onClick={() => showToast(`Selected track: ${track.title}`)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-xs', track.iconBg)}>
                        {track.icon}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-base font-bold text-ink group-hover:text-brand-600 transition-colors">
                            {track.title}
                          </h3>
                          {track.badge && (
                            <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                              {track.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-ink-muted max-w-xl leading-relaxed">
                          {track.desc}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-ink-muted">
                          <span className="flex items-center gap-1">
                            {track.format.includes('Team') ? <Users size={12} className="text-purple-600" /> : <User size={12} className="text-emerald-600" />}
                            {track.format}
                          </span>
                          <span className="flex items-center gap-1">
                            <BarChart3 size={12} className="text-amber-600" />
                            {track.level}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-blue-600" />
                            {track.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target size={12} className="text-slate-500" />
                            {track.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t border-line/40 sm:border-t-0 pt-3 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <div className="font-display text-sm font-bold text-indigo-700">
                          {track.participants}
                        </div>
                        <div className="text-[10px] text-ink-muted uppercase font-semibold">
                          Participants
                        </div>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface-subtle text-slate-500 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Bottom Banner */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                  <Lightbulb size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-ink">Not sure which track to choose?</h4>
                  <p className="text-[11px] sm:text-xs text-ink-muted">You can participate in only one track. Choose wisely based on your skills and interest.</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Opening track guidelines handbook...')}
                className="shrink-0 bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold text-xs rounded-xl"
                trailingIcon={<ArrowRight size={12} />}
              >
                View Track Guidelines
              </Button>
            </div>
          </div>

          {/* Right Rail */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Track Categories */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-4">
              <h3 className="font-display text-sm font-bold text-ink">Track Categories</h3>
              <div className="space-y-3.5">
                {[
                  {
                    icon: <User size={15} />,
                    iconBg: 'bg-emerald-50 text-emerald-600',
                    title: 'Individual',
                    desc: 'Participate solo and showcase your skills.',
                  },
                  {
                    icon: <Users size={15} />,
                    iconBg: 'bg-purple-50 text-purple-600',
                    title: 'Team',
                    desc: 'Collaborate and build amazing solutions.',
                  },
                  {
                    icon: <BarChart3 size={15} />,
                    iconBg: 'bg-amber-50 text-amber-600',
                    title: 'All Levels',
                    desc: 'Open for beginners to advanced coders.',
                  },
                  {
                    icon: <Clock size={15} />,
                    iconBg: 'bg-blue-50 text-blue-600',
                    title: 'Time Duration',
                    desc: 'Duration includes coding + submission.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-line/40', item.iconBg)}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ink">{item.title}</div>
                      <div className="text-[11px] text-ink-muted">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Need Help Choosing? */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
              <h3 className="font-display text-sm font-bold text-ink">Need Help Choosing?</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Check out the track guidelines and past problems to make the right choice.
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={() => showToast('Opening CodeSprint Track Guidelines PDF...')}
                className="w-full text-xs font-semibold rounded-xl"
                leadingIcon={<FileText size={13} />}
              >
                View Guidelines
              </Button>
            </Card>

            {/* Previous Years */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
              <div>
                <h3 className="font-display text-sm font-bold text-ink">Previous Years</h3>
                <p className="text-xs text-ink-muted mt-0.5">See how past editions were organized.</p>
              </div>
              <div className="divide-y divide-line/60">
                {[
                  { edition: 'CodeSprint 2025' },
                  { edition: 'CodeSprint 2024' },
                  { edition: 'CodeSprint 2023' },
                ].map((prev, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2.5">
                    <span className="text-xs font-semibold text-ink">{prev.edition}</span>
                    <button
                      type="button"
                      onClick={() => showToast(`Viewing archived archive for ${prev.edition}`)}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => showToast('Viewing all past editions...')}
                className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 pt-1"
              >
                View All Editions <ArrowRight size={12} />
              </button>
            </Card>
          </aside>
        </div>
      )}

      {/* 5. RULES TAB (Image 2: media_1788776369770.png) */}
      {activeTab.toLowerCase() === 'rules' && (
        <div className="space-y-6">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-ink">Competition Rules</h2>
              <p className="text-xs sm:text-sm text-ink-muted">Please read the rules and guidelines carefully before participating.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast('Downloading Official CodeSprint 2026 Rules (PDF)...')}
              className="rounded-xl border-line text-xs font-semibold"
              leadingIcon={<Download size={13} />}
            >
              Download Rules (PDF)
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Main Area: Split between Categories and Rule details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                {/* Left Category List */}
                <div className="sm:col-span-4 rounded-2xl border border-line bg-surface p-2 space-y-1">
                  {[
                    { id: 1, name: 'Eligibility' },
                    { id: 2, name: 'Registration' },
                    { id: 3, name: 'Conduct' },
                    { id: 4, name: 'Code of Ethics' },
                    { id: 5, name: 'Submission' },
                    { id: 6, name: 'Judging & Scoring' },
                    { id: 7, name: 'Disqualifications' },
                    { id: 8, name: 'Intellectual Property' },
                    { id: 9, name: 'General' },
                  ].map((cat) => {
                    const active = activeRuleId === cat.id
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setActiveRuleId(cat.id)
                          if (cat.id > 3) setRulesExpanded(true)
                        }}
                        className={cn(
                          'w-full text-left rounded-xl px-3.5 py-2 text-xs font-semibold transition-all flex items-center justify-between',
                          active
                            ? 'bg-blue-50 text-brand-600 font-bold border border-blue-200/60 shadow-2xs'
                            : 'text-slate-600 hover:bg-surface-subtle hover:text-ink'
                        )}
                      >
                        <span>{cat.id}. {cat.name}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Center Content: Rule Cards */}
                <div className="sm:col-span-8 space-y-4">
                  {/* Rule 1: Eligibility */}
                  <Card className={cn('rounded-2xl border bg-surface p-5 space-y-3 transition-all', activeRuleId === 1 ? 'border-brand-500/60 ring-1 ring-brand-500/20 shadow-xs' : 'border-line')}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">
                        1
                      </div>
                      <h3 className="font-display text-sm font-bold text-ink">Eligibility</h3>
                    </div>
                    <ul className="space-y-2 text-xs text-ink-muted pl-1">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Open to all students currently enrolled in any undergraduate or postgraduate program.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Participants must register individually or as a team as per the track rules.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Each participant/team must have a valid student ID or proof of enrollment.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Organizers reserve the right to verify eligibility at any stage.</span>
                      </li>
                    </ul>
                  </Card>

                  {/* Rule 2: Registration */}
                  <Card className={cn('rounded-2xl border bg-surface p-5 space-y-3 transition-all', activeRuleId === 2 ? 'border-brand-500/60 ring-1 ring-brand-500/20 shadow-xs' : 'border-line')}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">
                        2
                      </div>
                      <h3 className="font-display text-sm font-bold text-ink">Registration</h3>
                    </div>
                    <ul className="space-y-2 text-xs text-ink-muted pl-1">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Registration must be completed on or before the specified deadline.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Each participant can register for a maximum of one track.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Ensure all details provided are accurate and up-to-date.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Incomplete registrations may be rejected.</span>
                      </li>
                    </ul>
                  </Card>

                  {/* Rule 3: Conduct */}
                  <Card className={cn('rounded-2xl border bg-surface p-5 space-y-3 transition-all', activeRuleId === 3 ? 'border-brand-500/60 ring-1 ring-brand-500/20 shadow-xs' : 'border-line')}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">
                        3
                      </div>
                      <h3 className="font-display text-sm font-bold text-ink">Conduct</h3>
                    </div>
                    <ul className="space-y-2 text-xs text-ink-muted pl-1">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Participants must maintain integrity and professionalism throughout the competition.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Any form of cheating, plagiarism, or unfair advantage is strictly prohibited.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Respect other participants, organizers, and staff.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>Organizers&apos; decisions are final and binding.</span>
                      </li>
                    </ul>
                  </Card>

                  {/* Additional Rules 4-9 (toggleable) */}
                  {rulesExpanded && (
                    <div className="space-y-4 pt-1 animate-fadeIn">
                      {[
                        {
                          id: 4,
                          title: 'Code of Ethics',
                          points: [
                            'Maintain intellectual honesty. Collaboration outside registered teammates is strictly disallowed.',
                            'All source code and assets created during the contest must be authentic and properly credited.',
                            'Harassment, discrimination, or abusive communication will result in zero-tolerance bans.',
                          ],
                        },
                        {
                          id: 5,
                          title: 'Submission',
                          points: [
                            'All submissions must be uploaded via the c2cedge competition portal before 27 Sep 2026, 06:00 PM IST.',
                            'Late submissions will not be accepted under any circumstances.',
                            'Include a valid repository URL, project demo link, and required technical documentation.',
                          ],
                        },
                        {
                          id: 6,
                          title: 'Judging & Scoring',
                          points: [
                            'Algorithmic tracks are evaluated on automated test suites (correctness, runtime, memory).',
                            'Project and development tracks are evaluated on Innovation (30%), Technical Implementation (40%), and Presentation (30%).',
                            'Decisions of the jury panel are definitive and not open to dispute.',
                          ],
                        },
                        {
                          id: 7,
                          title: 'Disqualifications',
                          points: [
                            'Any use of unauthorized botting or plagiarized materials will lead to immediate disqualification.',
                            'Multiple account usage or identity falsification leads to permanent platform suspension.',
                          ],
                        },
                        {
                          id: 8,
                          title: 'Intellectual Property',
                          points: [
                            'Participants retain full ownership of intellectual property created during CodeSprint 2026.',
                            'By participating, candidates grant c2cedge non-exclusive rights to showcase projects for portfolio highlights.',
                          ],
                        },
                        {
                          id: 9,
                          title: 'General',
                          points: [
                            'The organizing committee reserves the right to modify timelines or problem details with prior notice.',
                            'All disputes are subject to the exclusive jurisdiction of the organizers in accordance with IT guidelines.',
                          ],
                        },
                      ].map((item) => (
                        <Card
                          key={item.id}
                          className={cn(
                            'rounded-2xl border bg-surface p-5 space-y-3 transition-all',
                            activeRuleId === item.id ? 'border-brand-500/60 ring-1 ring-brand-500/20 shadow-xs' : 'border-line'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">
                              {item.id}
                            </div>
                            <h3 className="font-display text-sm font-bold text-ink">{item.title}</h3>
                          </div>
                          <ul className="space-y-2 text-xs text-ink-muted pl-1">
                            {item.points.map((pt, pidx) => (
                              <li key={pidx} className="flex items-start gap-2">
                                <span className="text-slate-400 mt-1">•</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* View more toggle */}
                  <button
                    type="button"
                    onClick={() => setRulesExpanded(!rulesExpanded)}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    <span>{rulesExpanded ? 'View less' : 'View more'}</span>
                    {rulesExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {/* Bottom Banner */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-ink">Ready to Compete?</h4>
                    <p className="text-[11px] sm:text-xs text-ink-muted">Make sure you&apos;ve read all the rules and guidelines. All the best!</p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleSwitchTab('Overview')
                    showToast('Proceeding to contest registration...')
                  }}
                  className="shrink-0 bg-brand-600 text-white font-semibold text-xs rounded-xl"
                  trailingIcon={<ArrowRight size={12} />}
                >
                  Go to Participate
                </Button>
              </div>
            </div>

            {/* Right Rail */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Quick Navigation */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                <h3 className="font-display text-sm font-bold text-ink">Quick Navigation</h3>
                <div className="divide-y divide-line/60">
                  {[
                    { label: 'Rules Overview', action: () => { setActiveRuleId(1); setRulesExpanded(false) } },
                    { label: 'Important Dates', action: () => handleSwitchTab('Timeline') },
                    { label: 'Track Guidelines', action: () => handleSwitchTab('Tracks') },
                    { label: 'FAQ', action: () => handleSwitchTab('FAQs') },
                  ].map((nav, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={nav.action}
                      className="w-full flex items-center justify-between py-2.5 text-xs font-semibold text-ink hover:text-brand-600 transition-colors"
                    >
                      <span>{nav.label}</span>
                      <ChevronRight size={14} className="text-slate-400" />
                    </button>
                  ))}
                </div>
              </Card>

              {/* Need Clarification? */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
                <h3 className="font-display text-sm font-bold text-ink">Need Clarification?</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  If you have any questions regarding the rules, feel free to reach out.
                </p>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => showToast('Connecting you with the contest support panel...')}
                  className="w-full text-xs font-semibold rounded-xl"
                  leadingIcon={<MessageSquare size={13} />}
                >
                  Ask a Question
                </Button>
              </Card>

              {/* Important Note */}
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <Lightbulb size={16} className="text-amber-600 shrink-0" />
                  <span>Important Note</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  By participating in CodeSprint 2026, you agree to abide by all the rules and decisions made by the organizers.
                </p>
              </div>

              {/* Organizers */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                <h3 className="font-display text-sm font-bold text-ink">Organizers</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="text-ink-muted text-[11px]">Event Organizing Team</div>
                    <div className="flex items-center justify-between font-medium text-slate-700 mt-0.5">
                      <span>events@c2cedge.com</span>
                      <Mail size={13} className="text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <div className="text-ink-muted text-[11px]">Support Team</div>
                    <div className="flex items-center justify-between font-medium text-slate-700 mt-0.5">
                      <span>support@c2cedge.com</span>
                      <Mail size={13} className="text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <div className="text-ink-muted text-[11px]">Phone</div>
                    <div className="flex items-center justify-between font-medium text-slate-700 mt-0.5">
                      <span>+91 98765 43210</span>
                      <Phone size={13} className="text-emerald-600" />
                    </div>
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      )}

      {/* 6. FAQS TAB (Image 3: media_1788776369784.png) */}
      {activeTab.toLowerCase() === 'faqs' && (
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-ink">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-ink-muted">Find answers to the most common questions about CodeSprint 2026.</p>
          </div>

          {/* Search bar & Category filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search questions..."
                className="w-full rounded-xl border border-line bg-surface pl-9 pr-4 py-2 text-xs text-ink placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <select
              value={faqCategory}
              onChange={(e) => setFaqCategory(e.target.value)}
              className="w-full sm:w-48 rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
            >
              <option value="All Questions">All Categories</option>
              <option value="Registration">Registration</option>
              <option value="Eligibility">Eligibility</option>
              <option value="Teams">Teams</option>
              <option value="Submission">Submission</option>
              <option value="Tracks & Problems">Tracks & Problems</option>
              <option value="Evaluation">Evaluation</option>
              <option value="Prizes">Prizes</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Main Area */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                {/* Left Category Subnav */}
                <div className="sm:col-span-4 rounded-2xl border border-line bg-surface p-2 space-y-1">
                  {[
                    'All Questions',
                    'Registration',
                    'Eligibility',
                    'Teams',
                    'Submission',
                    'Tracks & Problems',
                    'Evaluation',
                    'Prizes',
                    'General',
                  ].map((cat) => {
                    const active = faqCategory === cat
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFaqCategory(cat)}
                        className={cn(
                          'w-full text-left rounded-xl px-3.5 py-2 text-xs font-semibold transition-all flex items-center justify-between',
                          active
                            ? 'bg-blue-50 text-brand-600 font-bold border border-blue-200/60 shadow-2xs'
                            : 'text-slate-600 hover:bg-surface-subtle hover:text-ink'
                        )}
                      >
                        <span>{cat}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Right Accordion List (10 items) */}
                <div className="sm:col-span-8 space-y-3">
                  {[
                    {
                      id: 1,
                      category: 'Eligibility',
                      q: '1. Who can participate in CodeSprint 2026?',
                      a: 'CodeSprint 2026 is open to all students from any stream and any academic year. Participants can register individually or as a team of 2 to 4 members.',
                    },
                    {
                      id: 2,
                      category: 'Registration',
                      q: '2. How do I register for the competition?',
                      a: 'Visit the competition page on c2cedge, select your preferred track, fill in your profile details, and click Register. You will receive an instant confirmation email.',
                    },
                    {
                      id: 3,
                      category: 'Teams',
                      q: '3. Can I change my team members after registration?',
                      a: 'Yes, team members can be added, replaced, or updated anytime before the registration deadline (22 Sep 2026). Post deadline, team rosters are strictly frozen.',
                    },
                    {
                      id: 4,
                      category: 'Registration',
                      q: '4. What is the registration fee?',
                      a: 'CodeSprint 2026 is completely free of cost for all eligible students and participating academic institutions.',
                    },
                    {
                      id: 5,
                      category: 'General',
                      q: '5. How will the competition be conducted?',
                      a: 'The entire competition is online. Problem statements will be released on the platform, and submissions will be evaluated automatically with live test runners.',
                    },
                    {
                      id: 6,
                      category: 'General',
                      q: '6. What is the duration of the competition?',
                      a: 'The competition runs for 72 hours from 25 Sep 2026, 10:00 AM IST to 28 Sep 2026, 10:00 AM IST.',
                    },
                    {
                      id: 7,
                      category: 'Tracks & Problems',
                      q: '7. What tools or programming languages are allowed?',
                      a: 'We support C++, Java, Python, JavaScript, Go, Rust, and Kotlin for algorithmic challenges. Any modern web, mobile, or game framework is permitted for dev tracks.',
                    },
                    {
                      id: 8,
                      category: 'Evaluation',
                      q: '8. How will the problems be evaluated?',
                      a: 'Algorithmic problems are evaluated on test case correctness, runtime speed, and memory optimization. Dev tracks are evaluated by industry expert panels on functionality, architecture, and UX.',
                    },
                    {
                      id: 9,
                      category: 'Prizes',
                      q: '9. When and how will the results be announced?',
                      a: 'Official winners will be published on the leaderboard and broadcasted during the live closing ceremony on 05 Oct 2026 at 05:00 PM IST.',
                    },
                    {
                      id: 10,
                      category: 'General',
                      q: '10. How can I contact the organizers for more queries?',
                      a: 'You can email support@c2cedge.com, join the official community discussion forum, or click the Contact Organizers button below.',
                    },
                  ]
                    .filter((item) => {
                      const matchesCat = faqCategory === 'All Questions' || item.category === faqCategory
                      const matchesSearch = !faqSearch || item.q.toLowerCase().includes(faqSearch.toLowerCase()) || item.a.toLowerCase().includes(faqSearch.toLowerCase())
                      return matchesCat && matchesSearch
                    })
                    .map((item) => {
                      const isOpen = expandedFaqId === item.id
                      return (
                        <Card
                          key={item.id}
                          className="rounded-2xl border border-line bg-surface p-4 transition-all hover:border-slate-300 shadow-2xs"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedFaqId(isOpen ? null : item.id)}
                            className="w-full flex items-center justify-between text-left gap-3"
                          >
                            <span className="font-display text-xs sm:text-sm font-bold text-ink">
                              {item.q}
                            </span>
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-surface-subtle text-slate-500 font-bold text-sm">
                              {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                            </div>
                          </button>

                          {isOpen && (
                            <p className="text-xs text-ink-muted mt-3 pt-3 border-t border-line/50 leading-relaxed">
                              {item.a}
                            </p>
                          )}
                        </Card>
                      )
                    })}
                </div>
              </div>

              {/* Bottom Banner */}
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-ink">Still have questions?</h4>
                    <p className="text-[11px] sm:text-xs text-ink-muted">Can&apos;t find the answer you&apos;re looking for? We&apos;re here to help!</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Opening contact channel with CodeSprint organizers...')}
                  className="shrink-0 bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold text-xs rounded-xl"
                >
                  Contact Organizers
                </Button>
              </div>
            </div>

            {/* Right Rail: Key Information, Milestones & Downloads */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Key Information */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                <h3 className="font-display text-sm font-bold text-ink">Key Information</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><Monitor size={13} className="text-indigo-600" /> Mode</span>
                    <span className="font-semibold text-ink">Online</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><Users size={13} className="text-purple-600" /> Team Size</span>
                    <span className="font-semibold text-ink">1 or Team (2 – 4)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><UserCheck size={13} className="text-emerald-600" /> Eligibility</span>
                    <span className="font-semibold text-ink">All Students</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><Building2 size={13} className="text-blue-600" /> Organised By</span>
                    <span className="font-bold text-brand-600">c2cedge</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><Mail size={13} className="text-amber-600" /> Contact</span>
                    <span className="font-medium text-slate-700">support@c2cedge.com</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-ink-muted flex items-center gap-1.5"><Globe size={13} className="text-cyan-600" /> Website</span>
                    <span className="font-medium text-brand-600 truncate max-w-[160px]">www.c2cedge.com/codesprint2026</span>
                  </div>
                </div>
              </Card>

              {/* Upcoming Milestones */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-ink">Upcoming Milestones</h3>
                  <button
                    type="button"
                    onClick={() => handleSwitchTab('Timeline')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                  >
                    View Full Timeline <ArrowRight size={11} />
                  </button>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-ink">25 Sep 2026, 10:00 AM</div>
                      <div className="text-[11px] text-ink-muted">Competition Starts</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-ink">26 Sep 2026, 09:00 AM</div>
                      <div className="text-[11px] text-ink-muted">Mid Evaluation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-ink">27 Sep 2026, 06:00 PM</div>
                      <div className="text-[11px] text-ink-muted">Final Submission Deadline</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-ink">28 Sep 2026, 07:00 PM</div>
                      <div className="text-[11px] text-ink-muted">Winners Announcement</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Downloads */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
                <h3 className="font-display text-sm font-bold text-ink">Downloads</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Participant Guide', size: 'PDF • 1.2 MB' },
                    { name: 'Rules & Guidelines', size: 'PDF • 850 KB' },
                    { name: 'Timeline', size: 'PDF • 620 KB' },
                    { name: 'FAQ Document', size: 'PDF • 420 KB' },
                    { name: 'Banner Kit', size: 'ZIP • 5.4 MB' },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-line bg-surface-subtle p-2.5 transition-colors hover:bg-slate-100/70"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText size={15} className="text-indigo-600 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-ink">{doc.name}</div>
                          <div className="text-[10px] text-ink-muted">{doc.size}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast(`Downloading ${doc.name}...`)}
                        className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-ink transition-colors"
                      >
                        <Download size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </aside>
          </div>
        </div>
      )}

      {/* 7. UPDATES TAB (Image 4: media_1788776369793.png) */}
      {activeTab.toLowerCase() === 'updates' && (
        <div className="space-y-6">
          {/* Header & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-ink">Latest Updates</h2>
              <p className="text-xs sm:text-sm text-ink-muted">Stay informed about all the important announcements and notifications.</p>
            </div>
            <select
              value={updatesCategory}
              onChange={(e) => setUpdatesCategory(e.target.value)}
              className="rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
            >
              <option value="All Updates">All Updates</option>
              <option value="Announcement">Announcements</option>
              <option value="Schedule Update">Schedule Updates</option>
              <option value="Track Update">Track Updates</option>
              <option value="Resource Update">Resource Updates</option>
              <option value="Important">Important Notices</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Main Updates Stream */}
            <div className="lg:col-span-8 space-y-6">
              <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-line">
                {[
                  {
                    id: 1,
                    type: 'Announcement',
                    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    icon: <Megaphone size={14} />,
                    iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
                    title: 'Registrations Are Open!',
                    desc: 'CodeSprint 2026 registrations are now open. Gather your team and be part of the biggest coding event.',
                    date: '20 Aug 2026, 10:00 AM',
                  },
                  {
                    id: 2,
                    type: 'Schedule Update',
                    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
                    icon: <Calendar size={14} />,
                    iconColor: 'bg-amber-50 text-amber-600 border-amber-200',
                    title: 'Timeline Released',
                    desc: 'We have released the complete timeline for CodeSprint 2026. Check all the important dates.',
                    date: '18 Aug 2026, 06:30 PM',
                  },
                  {
                    id: 3,
                    type: 'Track Update',
                    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
                    icon: <Code2 size={14} />,
                    iconColor: 'bg-purple-50 text-purple-600 border-purple-200',
                    title: 'New Track Added: GameDev Arena',
                    desc: 'We are excited to introduce a new track - GameDev Arena. Showcase your creativity!',
                    date: '15 Aug 2026, 11:15 AM',
                  },
                  {
                    id: 4,
                    type: 'Resource Update',
                    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
                    icon: <FileText size={14} />,
                    iconColor: 'bg-blue-50 text-blue-600 border-blue-200',
                    title: 'Problem Statements Released',
                    desc: 'Problem statements for all tracks have been released. Start practicing now!',
                    date: '23 Sep 2026, 09:00 AM',
                  },
                  {
                    id: 5,
                    type: 'Important',
                    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
                    icon: <AlertTriangle size={14} />,
                    iconColor: 'bg-rose-50 text-rose-600 border-rose-200',
                    title: 'Clarification on Submission',
                    desc: 'Important clarification regarding code submission and evaluation process.',
                    date: '23 Sep 2026, 04:15 PM',
                  },
                  {
                    id: 6,
                    type: 'General',
                    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                    icon: <Trophy size={14} />,
                    iconColor: 'bg-indigo-50 text-indigo-600 border-indigo-200',
                    title: 'Exciting Prizes Await!',
                    desc: 'Win amazing cash prizes, goodies, certificates and more. Check out the prize pool.',
                    date: '10 Aug 2026, 02:45 PM',
                  },
                ]
                  .filter((item) => updatesCategory === 'All Updates' || item.type === updatesCategory)
                  .map((item) => (
                    <div key={item.id} className="relative">
                      {/* Timeline dot icon */}
                      <div className={cn(
                        'absolute -left-6 top-4 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border bg-surface shadow-2xs',
                        item.iconColor
                      )}>
                        {item.icon}
                      </div>

                      <Card className="rounded-2xl border border-line bg-surface p-5 space-y-3 transition-all hover:border-slate-300 hover:shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-bold', item.badgeColor)}>
                              {item.type}
                            </span>
                            <h3 className="font-display text-sm font-bold text-ink">{item.title}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => showToast(`Opening announcement: ${item.title}`)}
                              className="text-xs font-semibold text-brand-600 hover:text-brand-700 h-7 px-2"
                              trailingIcon={<ArrowRight size={11} />}
                            >
                              View Details
                            </Button>
                            <button
                              type="button"
                              onClick={() => showToast('Options menu')}
                              className="text-slate-400 hover:text-ink p-1 rounded-md"
                            >
                              <MoreVertical size={13} />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-ink-muted leading-relaxed">
                          {item.desc}
                        </p>

                        <div className="text-[11px] font-medium text-slate-400">
                          {item.date}
                        </div>
                      </Card>
                    </div>
                  ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-ink-muted border-t border-line/60">
                <span>Showing 1 to 6 of 18 updates</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setUpdatesPage(Math.max(1, updatesPage - 1))}
                    disabled={updatesPage === 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface hover:bg-surface-subtle disabled:opacity-50"
                  >
                    &lt;
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setUpdatesPage(page)}
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg border font-semibold',
                        updatesPage === page
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-line bg-surface text-ink hover:bg-surface-subtle'
                      )}
                    >
                      {page}
                    </button>
                  ))}
                  <span className="px-1 text-slate-400">...</span>
                  <button
                    type="button"
                    onClick={() => setUpdatesPage(3)}
                    className="rounded-lg border border-line bg-surface px-2.5 py-1 font-semibold text-ink hover:bg-surface-subtle"
                  >
                    Last
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpdatesPage(Math.min(3, updatesPage + 1))}
                    disabled={updatesPage === 3}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface hover:bg-surface-subtle disabled:opacity-50"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>

            {/* Right Rail */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Key Information */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                <h3 className="font-display text-sm font-bold text-ink">Key Information</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><Monitor size={13} className="text-indigo-600" /> Mode</span>
                    <span className="font-semibold text-ink">Online</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><Users size={13} className="text-purple-600" /> Team Size</span>
                    <span className="font-semibold text-ink">1 or Team (2 – 4)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><UserCheck size={13} className="text-emerald-600" /> Eligibility</span>
                    <span className="font-semibold text-ink">All Students</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><Building2 size={13} className="text-blue-600" /> Organised By</span>
                    <span className="font-bold text-brand-600">c2cedge</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><Mail size={13} className="text-amber-600" /> Contact</span>
                    <span className="font-medium text-slate-700">support@c2cedge.com</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-ink-muted flex items-center gap-1.5"><Globe size={13} className="text-cyan-600" /> Website</span>
                    <span className="font-medium text-brand-600 truncate max-w-[160px]">www.c2cedge.com/codesprint2026</span>
                  </div>
                </div>
              </Card>

              {/* Upcoming Milestones */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-ink">Upcoming Milestones</h3>
                  <button
                    type="button"
                    onClick={() => handleSwitchTab('Timeline')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                  >
                    View Full Timeline <ArrowRight size={11} />
                  </button>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-ink">25 Sep 2026, 10:00 AM</div>
                      <div className="text-[11px] text-ink-muted">Competition Starts</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-ink">26 Sep 2026, 09:00 AM</div>
                      <div className="text-[11px] text-ink-muted">Mid Evaluation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-ink">27 Sep 2026, 06:00 PM</div>
                      <div className="text-[11px] text-ink-muted">Final Submission Deadline</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <div>
                      <div className="font-bold text-ink">28 Sep 2026, 07:00 PM</div>
                      <div className="text-[11px] text-ink-muted">Winners Announcement</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Downloads */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
                <h3 className="font-display text-sm font-bold text-ink">Downloads</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Participant Guide', size: 'PDF • 1.2 MB' },
                    { name: 'Rules & Guidelines', size: 'PDF • 850 KB' },
                    { name: 'Timeline', size: 'PDF • 620 KB' },
                    { name: 'FAQ Document', size: 'PDF • 420 KB' },
                    { name: 'Banner Kit', size: 'ZIP • 5.4 MB' },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-line bg-surface-subtle p-2.5 transition-colors hover:bg-slate-100/70"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText size={15} className="text-indigo-600 shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-ink">{doc.name}</div>
                          <div className="text-[10px] text-ink-muted">{doc.size}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast(`Downloading ${doc.name}...`)}
                        className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-ink transition-colors"
                      >
                        <Download size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </aside>
          </div>
        </div>
      )}

      {/* 8. MY JOURNEY TAB (Image 5: media_1788776369809.png) */}
      {(activeTab.toLowerCase() === 'my journey' || activeTab.toLowerCase() === 'my-journey') && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-ink">My Progress</h2>
                <p className="text-xs sm:text-sm text-ink-muted">Track your performance and stay on top of your goals.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwitchTab('Leaderboard')}
                className="rounded-xl border-line text-xs font-semibold"
                leadingIcon={<Trophy size={13} className="text-amber-500" />}
              >
                View Leaderboard
              </Button>
            </div>

            {/* 4 Circular Gauge Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Card 1: Problems Solved */}
              <Card className="rounded-2xl border border-line bg-surface p-4 text-center space-y-3 shadow-2xs">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500 transition-all duration-1000"
                      strokeDasharray="60, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-base font-extrabold text-ink">6/10</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-ink">Problems Solved</div>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-ink-muted mt-0.5">
                    <Target size={11} className="text-emerald-600" />
                    Target: 10
                  </div>
                </div>
              </Card>

              {/* Card 2: Contests Attempted */}
              <Card className="rounded-2xl border border-line bg-surface p-4 text-center space-y-3 shadow-2xs">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-purple-600 transition-all duration-1000"
                      strokeDasharray="50, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-base font-extrabold text-ink">2/4</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-ink">Contests Attempted</div>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-ink-muted mt-0.5">
                    <Target size={11} className="text-purple-600" />
                    Target: 4
                  </div>
                </div>
              </Card>

              {/* Card 3: Accuracy */}
              <Card className="rounded-2xl border border-line bg-surface p-4 text-center space-y-3 shadow-2xs">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-amber-500 transition-all duration-1000"
                      strokeDasharray="72, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-base font-extrabold text-ink">72%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-ink">Accuracy</div>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-ink-muted mt-0.5">
                    <Target size={11} className="text-amber-600" />
                    Target: 80%
                  </div>
                </div>
              </Card>

              {/* Card 4: Total Coding Time */}
              <Card className="rounded-2xl border border-line bg-surface p-4 text-center space-y-3 shadow-2xs">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-blue-600 transition-all duration-1000"
                      strokeDasharray="45, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-sm font-extrabold text-ink">4h 32m</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-ink">Total Coding Time</div>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-ink-muted mt-0.5">
                    <Target size={11} className="text-blue-600" />
                    Target: 10h
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm sm:text-base font-bold text-ink">Recent Activity</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing all competition activity...')}
                  className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
                >
                  View All Activity <ArrowRight size={12} />
                </button>
              </div>

              <div className="divide-y divide-line/60">
                {[
                  {
                    icon: <Check size={14} className="text-emerald-600 stroke-[3]" />,
                    iconBg: 'bg-emerald-50 border-emerald-200',
                    title: 'Solved Problem: Binary Ninjas',
                    sub: 'Difficulty: Medium • Track: Algorithmic Challenge',
                    time: '2 hours ago',
                  },
                  {
                    icon: <Trophy size={14} className="text-purple-600" />,
                    iconBg: 'bg-purple-50 border-purple-200',
                    title: 'Completed Contest: Weekly Challenge #2',
                    sub: 'Rank: 12/324 • Score: 1850',
                    time: '5 hours ago',
                  },
                  {
                    icon: <Code2 size={14} className="text-blue-600" />,
                    iconBg: 'bg-blue-50 border-blue-200',
                    title: 'Started Problem: Code Warriors',
                    sub: 'Difficulty: Hard • Track: App Development',
                    time: 'Yesterday',
                  },
                  {
                    icon: <FileText size={14} className="text-amber-600" />,
                    iconBg: 'bg-amber-50 border-amber-200',
                    title: 'Updated Profile',
                    sub: 'Your profile is now 100% complete!',
                    time: '2 days ago',
                  },
                ].map((act, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 group cursor-pointer"
                    onClick={() => showToast(`Activity: ${act.title}`)}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full border', act.iconBg)}>
                        {act.icon}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-ink group-hover:text-brand-600 transition-colors">
                          {act.title}
                        </div>
                        <div className="text-[11px] text-ink-muted">{act.sub}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">{act.time}</span>
                      <ChevronRight size={14} className="text-slate-400 group-hover:text-ink transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Bottom Banner */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                  <Trophy size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-ink">Next Up: Final Submission Deadline</h4>
                  <p className="text-[11px] sm:text-xs text-ink-muted">Submit your solutions before 27 Sep 2026, 06:00 PM.</p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSwitchTab('Timeline')}
                className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl"
                trailingIcon={<ArrowRight size={12} />}
              >
                View Timeline
              </Button>
            </div>
          </div>

          {/* Right Rail */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Overall Progress */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-4">
              <h3 className="font-display text-sm font-bold text-ink">Overall Progress</h3>
              <div className="flex items-center gap-5">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500 transition-all duration-1000"
                      strokeDasharray="42, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-lg font-black text-ink">42%</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-ink-muted">Solved</span>
                    <span className="font-bold text-ink ml-auto">6/10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-600" />
                    <span className="text-ink-muted">Attempted</span>
                    <span className="font-bold text-ink ml-auto">2/4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="text-ink-muted">Pending</span>
                    <span className="font-bold text-ink ml-auto">4/10</span>
                  </div>
                </div>
              </div>
              <div className="text-[11px] font-medium text-slate-400 text-center pt-1 border-t border-line/50">
                Competition Journey
              </div>
            </Card>

            {/* Motivational Quote with Mountain Flag */}
            <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-blue-50/50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <Lightbulb size={14} />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink leading-relaxed italic">
                    &ldquo;Small steps every day lead to big results.&rdquo;
                  </p>
                  <p className="text-[11px] font-semibold text-indigo-700 mt-1">
                    Keep coding, keep growing!
                  </p>
                </div>
              </div>
              <div className="flex justify-end pt-2 opacity-80">
                <Flag size={20} className="text-indigo-500/60" />
              </div>
            </div>

            {/* Recent Badges */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-ink">Recent Badges</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing all your achievements & badges...')}
                  className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                >
                  View All <ArrowRight size={11} />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { title: 'Problem Solver', sub: '6 Solved', icon: <Star size={16} className="text-emerald-600 fill-emerald-100" />, bg: 'bg-emerald-50 border-emerald-200' },
                  { title: 'Contest Rookie', sub: '2 Contests', icon: <Trophy size={16} className="text-purple-600" />, bg: 'bg-purple-50 border-purple-200' },
                  { title: 'Speed Coder', sub: '1h Time', icon: <Timer size={16} className="text-amber-600" />, bg: 'bg-amber-50 border-amber-200' },
                  { title: 'Rising Star', sub: 'Rank 12', icon: <Award size={16} className="text-blue-600" />, bg: 'bg-blue-50 border-blue-200' },
                ].map((bdg, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className={cn('mx-auto flex h-10 w-10 items-center justify-center rounded-xl border', bdg.bg)}>
                      {bdg.icon}
                    </div>
                    <div className="text-[10px] font-bold text-ink leading-tight">{bdg.title}</div>
                    <div className="text-[9px] text-ink-muted">{bdg.sub}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
              <h3 className="font-display text-sm font-bold text-ink">Quick Links</h3>
              <div className="divide-y divide-line/60">
                {[
                  {
                    title: 'Practice Problems',
                    sub: 'Solve more questions',
                    icon: <FileText size={15} className="text-indigo-600" />,
                    action: () => navigate('/master/dsa?tab=practice'),
                  },
                  {
                    title: 'Upcoming Contests',
                    sub: 'Check schedule',
                    icon: <Calendar size={15} className="text-purple-600" />,
                    action: () => navigate('/compete'),
                  },
                  {
                    title: 'Discussion Forum',
                    sub: 'Ask & help others',
                    icon: <MessageSquare size={15} className="text-blue-600" />,
                    action: () => showToast('Navigating to CodeSprint 2026 discussion channel...'),
                  },
                  {
                    title: 'Download Resources',
                    sub: 'Rules | Sample Questions | Past Papers',
                    icon: <Download size={15} className="text-emerald-600" />,
                    action: () => showToast('Opening contest resource downloads pack...'),
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={item.action}
                    className="flex items-center justify-between py-2.5 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-subtle border border-line/60">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink group-hover:text-brand-600 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-ink-muted">{item.sub}</div>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-400 group-hover:text-ink transition-colors" />
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      )}

      {/* 9. OTHER REMAINING TABS (Prizes, Participants, Leaderboard) */}
      {!['overview', 'details', 'timeline', 'tracks', 'rules', 'faqs', 'updates', 'my journey', 'my-journey'].includes(activeTab.toLowerCase()) && (
        <Card className="rounded-2xl border border-line bg-surface p-8 text-center space-y-4 shadow-card">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200">
            {activeTab.toLowerCase() === 'prizes' && <Trophy size={28} />}
            {activeTab.toLowerCase() === 'participants' && <Users size={28} />}
            {activeTab.toLowerCase() === 'leaderboard' && <Award size={28} />}
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-ink">{activeTab} Workspace</h3>
            <p className="text-xs text-ink-muted mt-1 max-w-md mx-auto leading-relaxed">
              You are viewing the {activeTab} section for CodeSprint 2026. All competition rankings,
              participant registrations, and award allocations are synchronized in real-time.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-2.5">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSwitchTab('Overview')}
              className="bg-brand-600 text-white"
            >
              Back to Overview
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSwitchTab('Tracks')}
            >
              View Tracks
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSwitchTab('Timeline')}
            >
              View Timeline
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

// ==========================================
// VIEW 2: Contest Detail View: CodeSprint 48
// ==========================================

function ContestDetailView({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Problems' | 'Leaderboard' | 'Discuss' | 'Editorial' | 'Submissions'>('Overview')
  const [problemFilter, setProblemFilter] = useState<'all' | 'solved' | 'unsolved'>('all')
  const [showRulesModal, setShowRulesModal] = useState(false)
  const [showRewardsModal, setShowRewardsModal] = useState(false)
  const [showAnnouncementsModal, setShowAnnouncementsModal] = useState(false)
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false)
  const [activeSolution, setActiveSolution] = useState<ContestProblem | null>(null)
  const [hasStarted, setHasStarted] = useState(true)

  // Filter problems
  const filteredProblems = useMemo(() => {
    if (problemFilter === 'solved') {
      return contestProblems.filter((p) => p.solved)
    }
    if (problemFilter === 'unsolved') {
      return contestProblems.filter((p) => !p.solved)
    }
    return contestProblems
  }, [problemFilter])

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-ink-muted">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-brand-600 flex items-center gap-1 text-slate-500 transition-colors"
        >
          <ArrowLeft size={13} />
          Competitions
        </button>
        <ChevronRight size={13} className="text-slate-400" />
        <span className="font-bold text-ink">CodeSprint 48</span>
      </nav>

      {/* 2. Header Card */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            {/* Top row: Timer icon, Live badge, tags */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                <Timer size={14} className="text-emerald-600" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                Live
              </div>

              <div className="flex items-center gap-1.5">
                {['DSA', 'Arrays', 'DP'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-blue-50 text-blue-700 px-2.5 py-0.5 text-xs font-semibold border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                CodeSprint 48
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                Test your problem solving skills in this 2-hour coding contest.
              </p>
            </div>

            {/* Contest Info Metadata Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-ink-muted pt-1">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 bg-emerald-50/70 px-2 py-0.5 rounded-md border border-emerald-200">
                <Clock size={13} className="text-emerald-600" />
                ends in 2d 14h 32m
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Users size={13} className="text-blue-600" />
                <span><strong className="text-ink">3,248</strong> participants</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Globe size={13} className="text-indigo-600" />
                <span>Online</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Trophy size={13} className="text-amber-500" />
                <span>Ranked</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <Coins size={13} className="text-amber-600" />
                Prize Pool: 5,000 coins
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowRulesModal(true)}
              className="text-xs font-semibold rounded-xl border-line hover:bg-surface-subtle"
            >
              View Rules
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setHasStarted(true)
                setActiveTab('Problems')
              }}
              className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm px-5"
            >
              <Play size={14} className="fill-white" />
              Start Contest
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-line flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
        {(
          [
            'Overview',
            'Problems',
            'Leaderboard',
            'Discuss',
            'Editorial',
            'Submissions',
          ] as const
        ).map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold transition-all shrink-0',
                isActive
                  ? 'text-brand-600 font-bold'
                  : 'text-ink-muted hover:text-ink',
              )}
            >
              {tab}
              {tab === 'Problems' && (
                <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.2 text-[10px] font-bold text-slate-600">
                  5
                </span>
              )}
              {tab === 'Submissions' && (
                <span className="ml-1.5 rounded-full bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700">
                  2
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      {/* 4. Tab Content Area */}
      {activeTab === 'Overview' && (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main Column */}
          <div className="min-w-0 space-y-6">
            {/* 3-Column Row: Contest Details, Timeline, Rewards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Contest Details */}
              <Card className="rounded-2xl border border-line bg-surface p-5 space-y-3.5 shadow-xs">
                <div className="flex items-center gap-2 text-ink font-display font-bold text-sm border-b border-line pb-2.5">
                  <Info size={16} className="text-brand-600" />
                  Contest Details
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Start Time:</span>
                    <span className="font-semibold text-ink">Today, 02:00 PM IST</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Duration:</span>
                    <span className="font-semibold text-ink">2 Hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Format:</span>
                    <span className="font-semibold text-ink">ICPC Style</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Scoring:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      +100 / -25
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Platform:</span>
                    <span className="font-semibold text-brand-600">c2cedge Judge</span>
                  </div>
                </div>
              </Card>

              {/* Card 2: Timeline */}
              <Card className="rounded-2xl border border-line bg-surface p-5 space-y-3.5 shadow-xs">
                <div className="flex items-center gap-2 text-ink font-display font-bold text-sm border-b border-line pb-2.5">
                  <Clock size={16} className="text-emerald-600" />
                  Timeline
                </div>
                <div className="relative pl-5 space-y-3 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {/* Step 1: Contest Started */}
                  <div className="relative">
                    <span className="absolute -left-5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <p className="font-bold text-ink">Contest Started</p>
                    <p className="text-[11px] text-ink-muted">02:00 PM IST</p>
                  </div>

                  {/* Step 2: Live Now */}
                  <div className="relative">
                    <span className="absolute -left-5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    </span>
                    <p className="font-bold text-emerald-700">Live Now</p>
                    <p className="text-[11px] text-ink-muted">Ends in 2d 14h 32m</p>
                  </div>

                  {/* Step 3: 1 Hour Left */}
                  <div className="relative">
                    <span className="absolute -left-5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-slate-400 border border-slate-300">
                      <Circle size={8} />
                    </span>
                    <p className="font-medium text-slate-600">1 Hour Left</p>
                    <p className="text-[11px] text-ink-muted">Leaderboard freeze</p>
                  </div>

                  {/* Step 4: Contest Ends */}
                  <div className="relative">
                    <span className="absolute -left-5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-slate-400 border border-slate-300">
                      <Circle size={8} />
                    </span>
                    <p className="font-medium text-slate-600">Contest Ends</p>
                    <p className="text-[11px] text-ink-muted">Final ratings updated</p>
                  </div>
                </div>
              </Card>

              {/* Card 3: Rewards */}
              <Card className="rounded-2xl border border-line bg-surface p-5 space-y-3.5 shadow-xs">
                <div className="flex items-center justify-between border-b border-line pb-2.5">
                  <div className="flex items-center gap-2 text-ink font-display font-bold text-sm">
                    <Award size={16} className="text-amber-500" />
                    Rewards
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowRewardsModal(true)}
                    className="text-[11px] font-bold text-brand-600 hover:underline inline-flex items-center gap-0.5"
                  >
                    View All Rewards &rarr;
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between py-0.5">
                    <span className="flex items-center gap-1.5 text-ink font-medium">
                      <span className="text-amber-500 font-bold">🥇 1st Prize</span>
                    </span>
                    <span className="font-mono font-bold text-amber-600">2,500 Coins</span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="flex items-center gap-1.5 text-ink font-medium">
                      <span className="text-slate-400 font-bold">🥈 2nd Prize</span>
                    </span>
                    <span className="font-mono font-bold text-slate-700">1,500 Coins</span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="flex items-center gap-1.5 text-ink font-medium">
                      <span className="text-amber-700 font-bold">🥉 3rd Prize</span>
                    </span>
                    <span className="font-mono font-bold text-amber-800">1,000 Coins</span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-ink-muted">Ranks 4–10:</span>
                    <span className="font-mono font-semibold text-ink">200 Coins</span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-ink-muted">Ranks 11–50:</span>
                    <span className="font-mono font-semibold text-ink">100 Coins</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Problems Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">
                    Problems
                  </h2>
                  <p className="text-xs text-ink-muted">
                    Solve all problems to maximize contest points and climb the college rank.
                  </p>
                </div>

                {/* Filter pills: All (5), Solved (2), Unsolved (3) */}
                <div className="flex items-center rounded-xl border border-line bg-surface p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setProblemFilter('all')}
                    className={cn(
                      'rounded-lg px-3 py-1 transition-colors',
                      problemFilter === 'all'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    All (5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProblemFilter('solved')}
                    className={cn(
                      'rounded-lg px-3 py-1 transition-colors',
                      problemFilter === 'solved'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    Solved (2)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProblemFilter('unsolved')}
                    className={cn(
                      'rounded-lg px-3 py-1 transition-colors',
                      problemFilter === 'unsolved'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    Unsolved (3)
                  </button>
                </div>
              </div>

              {/* Problems Table / Cards List */}
              <div className="space-y-3">
                {filteredProblems.map((problem) => (
                  <Card
                    key={problem.letter}
                    className={cn(
                      'flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-4 sm:p-5 transition-colors shadow-xs',
                      problem.solved
                        ? 'border-emerald-200 bg-surface hover:border-emerald-300'
                        : 'border-line bg-surface hover:border-brand-300',
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* Letter badge */}
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display font-extrabold text-sm border',
                          problem.solved
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-50 text-slate-700 border-slate-200',
                        )}
                      >
                        {problem.letter}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-sm sm:text-base font-bold text-ink">
                            Problem {problem.letter}: {problem.title}
                          </h3>

                          {/* Solved check */}
                          {problem.solved ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                              <CheckCircle2 size={13} className="text-emerald-600" />
                              Solved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                              Unsolved
                            </span>
                          )}
                        </div>

                        {/* Metadata row */}
                        <div className="flex flex-wrap items-center gap-2.5 text-xs text-ink-muted">
                          <span
                            className={cn(
                              'rounded px-2 py-0.5 text-[10px] font-bold',
                              problem.difficulty === 'Easy'
                                ? 'bg-emerald-100 text-emerald-800'
                                : problem.difficulty === 'Medium'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-red-100 text-red-800',
                            )}
                          >
                            {problem.difficulty}
                          </span>
                          <span>•</span>
                          <span>Acceptance: <strong className="text-ink">{problem.acceptance}</strong></span>
                          <span>•</span>
                          <span className="font-mono font-semibold text-brand-600">{problem.points} pts</span>
                          <span>•</span>
                          <div className="flex gap-1">
                            {problem.tags.map((tag) => (
                              <span key={tag} className="text-[11px] text-slate-500 bg-slate-50 px-1.5 py-0.2 rounded border border-slate-100">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      {problem.solved ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveSolution(problem)}
                          className="text-xs font-semibold rounded-xl border-line hover:bg-slate-50 text-emerald-700 border-emerald-200 hover:border-emerald-300"
                        >
                          View Solution
                        </Button>
                      ) : (
                        <Link to="/practice">
                          <Button
                            variant="primary"
                            size="sm"
                            className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-xs px-4"
                          >
                            Solve Now
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail (Aside) */}
          <aside className="space-y-5">
            {/* 1. Your Progress */}
            <Card className="rounded-2xl border border-line bg-surface p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <h3 className="font-display text-sm font-bold text-ink flex items-center gap-2">
                  <Flame size={16} className="text-orange-500" />
                  Your Progress
                </h3>
                <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                  Active
                </span>
              </div>

              {/* Rank & Trend */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-ink-muted">Contest Rank</span>
                  <span className="font-display text-2xl font-black text-brand-600">
                    #1,248
                    <span className="text-xs font-normal text-ink-muted"> / 3,248</span>
                  </span>
                </div>

                {/* Trend sparkline */}
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <TrendingUp size={12} />
                      +412 ranks gained
                    </span>
                    <span className="text-ink-muted">Top 38%</span>
                  </div>

                  <div className="h-10 w-full pt-1">
                    {/* SVG Sparkline */}
                    <svg className="h-full w-full overflow-visible" viewBox="0 0 200 40">
                      <defs>
                        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 35 Q 40 32, 70 25 T 140 16 T 200 6"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 0 35 Q 40 32, 70 25 T 140 16 T 200 6 L 200 40 L 0 40 Z"
                        fill="url(#sparkGrad)"
                      />
                      <circle cx="200" cy="6" r="3.5" fill="#10b981" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stats Grid: Score, Solved, Accuracy */}
              <div className="grid grid-cols-3 gap-2 border-t border-b border-line py-3 text-center">
                <div className="space-y-0.5">
                  <p className="text-[11px] text-ink-muted font-medium">Score</p>
                  <p className="font-display text-base font-bold text-ink">500</p>
                </div>
                <div className="space-y-0.5 border-x border-line">
                  <p className="text-[11px] text-ink-muted font-medium">Solved</p>
                  <p className="font-display text-base font-bold text-emerald-600">2 / 5</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] text-ink-muted font-medium">Accuracy</p>
                  <p className="font-display text-base font-bold text-ink">100%</p>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowAnalyticsModal(true)}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline flex items-center justify-between w-full"
                >
                  <span>View Full Analytics</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </Card>

            {/* 2. Live Leaderboard */}
            <Card className="rounded-2xl border border-line bg-surface p-5 space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <h3 className="font-display text-sm font-bold text-ink flex items-center gap-2">
                  <Trophy size={16} className="text-amber-500" />
                  Live Leaderboard
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('Leaderboard')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  Full Table &rarr;
                </button>
              </div>

              <div className="space-y-2.5">
                {liveLeaderboard.map((item) => (
                  <div
                    key={item.rank}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs transition-colors',
                      item.isYou
                        ? 'bg-blue-50/80 border border-blue-200 font-bold'
                        : 'hover:bg-surface-subtle',
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-ink-muted w-5">
                        {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : `#${item.rank}`}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-ink font-semibold">{item.name}</span>
                        {item.isYou && (
                          <span className="rounded bg-brand-600 px-1 py-0.2 text-[9px] font-bold text-white">
                            YOU
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-ink">{item.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 3. Announcements */}
            <Card className="rounded-2xl border border-line bg-surface p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <h3 className="font-display text-sm font-bold text-ink flex items-center gap-2">
                  <Bell size={16} className="text-brand-600" />
                  Announcements
                </h3>
                <span className="h-2 w-2 rounded-full bg-brand-600" />
              </div>

              <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-3 space-y-1.5">
                <p className="text-xs text-ink leading-relaxed font-medium">
                  &ldquo;Make sure to read the problem statements carefully before submitting.&rdquo;
                </p>
                <div className="flex items-center justify-between text-[10px] text-ink-muted">
                  <span>Judge Admin</span>
                  <span className="font-mono">02:15 PM</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAnnouncementsModal(true)}
                className="text-xs font-bold text-brand-600 hover:underline flex items-center justify-between w-full pt-1"
              >
                <span>View All Announcements</span>
                <ArrowRight size={13} />
              </button>
            </Card>

            {/* 4. Quick Links */}
            <Card className="rounded-2xl border border-line bg-surface p-5 space-y-3 shadow-xs">
              <h3 className="font-display text-sm font-bold text-ink border-b border-line pb-2.5">
                Quick Links
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowRulesModal(true)}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-subtle/50 p-3 hover:border-brand-400 hover:bg-blue-50/40 transition-colors text-center group"
                >
                  <ShieldCheck size={18} className="text-brand-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-ink">Contest Rules</span>
                  <span className="text-[10px] text-ink-muted">ICPC &amp; Penalty</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('Discuss')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-subtle/50 p-3 hover:border-brand-400 hover:bg-blue-50/40 transition-colors text-center group"
                >
                  <MessageSquare size={18} className="text-indigo-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-ink">Discuss</span>
                  <span className="text-[10px] text-ink-muted">14 questions</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('Editorial')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-subtle/50 p-3 hover:border-brand-400 hover:bg-blue-50/40 transition-colors text-center group"
                >
                  <BookOpen size={18} className="text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-ink">Editorial</span>
                  <span className="text-[10px] text-ink-muted">Solutions &amp; Math</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('Submissions')}
                  className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface-subtle/50 p-3 hover:border-brand-400 hover:bg-blue-50/40 transition-colors text-center group"
                >
                  <CheckCircle2 size={18} className="text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-ink">My Submissions</span>
                  <span className="text-[10px] text-ink-muted">2 Accepted</span>
                </button>
              </div>
            </Card>
          </aside>
        </div>
      )}

      {/* OTHER TABS (Problems, Leaderboard, Discuss, Editorial, Submissions) */}
      {activeTab === 'Problems' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-ink">
              CodeSprint 48 Problem Set (5 Problems)
            </h2>
            <span className="text-xs text-ink-muted">ICPC Scoring: +100 per solve</span>
          </div>

          <div className="space-y-3">
            {contestProblems.map((p) => (
              <Card key={p.letter} className="rounded-2xl border border-line bg-surface p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-xl font-display font-extrabold text-base border',
                      p.solved
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200',
                    )}
                  >
                    {p.letter}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      Problem {p.letter}: {p.title}
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5 flex items-center gap-2">
                      <span
                        className={cn(
                          'rounded px-2 py-0.5 text-[10px] font-bold',
                          p.difficulty === 'Easy'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.difficulty === 'Medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800',
                        )}
                      >
                        {p.difficulty}
                      </span>
                      <span>•</span>
                      <span>Acceptance: {p.acceptance}</span>
                      <span>•</span>
                      <span className="font-mono font-semibold text-brand-600">{p.points} pts</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {p.solved ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveSolution(p)}
                      className="text-xs font-semibold rounded-xl text-emerald-700 border-emerald-200"
                    >
                      View Solution
                    </Button>
                  ) : (
                    <Link to="/practice">
                      <Button size="sm" className="bg-brand-600 text-white text-xs font-bold rounded-xl px-5">
                        Solve Now
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Leaderboard' && (
        <div className="space-y-4">
          <Card className="p-0 overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
            <div className="border-b border-line px-5 py-3.5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-sm font-bold text-ink">
                  Live Contest Leaderboard (ICPC Scoreboard)
                </h3>
                <p className="text-xs text-ink-muted">
                  3,248 participants · Score updates in real-time
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                🟢 Live Auto-refresh
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-line bg-slate-50/60 text-left text-ink-muted">
                    <th className="px-5 py-3 font-bold">Rank</th>
                    <th className="px-5 py-3 font-bold">Contestant</th>
                    <th className="px-5 py-3 font-bold text-center">Score</th>
                    <th className="px-5 py-3 font-bold text-center">Penalty</th>
                    <th className="px-3 py-3 font-bold text-center">A</th>
                    <th className="px-3 py-3 font-bold text-center">B</th>
                    <th className="px-3 py-3 font-bold text-center">C</th>
                    <th className="px-3 py-3 font-bold text-center">D</th>
                    <th className="px-3 py-3 font-bold text-center">E</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {liveLeaderboard.map((item) => (
                    <tr
                      key={item.rank}
                      className={cn(
                        'transition-colors',
                        item.isYou ? 'bg-blue-50/80 font-bold' : 'hover:bg-surface-subtle',
                      )}
                    >
                      <td className="px-5 py-3.5 font-mono font-bold">
                        {item.rank === 1 ? '🥇 1' : item.rank === 2 ? '🥈 2' : item.rank === 3 ? '🥉 3' : `#${item.rank}`}
                      </td>
                      <td className="px-5 py-3.5 text-ink">
                        <div className="flex items-center gap-2">
                          <span>{item.name}</span>
                          {item.isYou && (
                            <span className="rounded bg-brand-600 text-white text-[9px] font-bold px-1.5 py-0.2">
                              YOU
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-center font-mono font-bold text-brand-600">
                        {item.points}
                      </td>
                      <td className="px-5 py-3.5 text-center font-mono text-slate-500">
                        {item.penalty}
                      </td>
                      {(['A', 'B', 'C', 'D', 'E'] as const).map((letter) => {
                        const s = item.solves[letter]
                        return (
                          <td key={letter} className="px-3 py-3.5 text-center font-mono">
                            {s?.status === 'accepted' ? (
                              <span className="inline-block rounded bg-emerald-100 text-emerald-800 px-1.5 py-0.5 text-[10px] font-bold">
                                +{s.tries}
                              </span>
                            ) : s?.status === 'failed' ? (
                              <span className="inline-block rounded bg-red-100 text-red-800 px-1.5 py-0.5 text-[10px] font-bold">
                                -{s.tries}
                              </span>
                            ) : (
                              <span className="text-slate-300">·</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'Discuss' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-ink">
              Contest Discussions &amp; Clarifications
            </h2>
            <Button size="sm" className="bg-brand-600 text-white text-xs font-bold rounded-xl">
              Ask Clarification
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Clarification on Problem D: Count Inversions constraints',
                user: 'Vikram S.',
                time: '15m ago',
                comments: 6,
                upvotes: 14,
                reply: 'Admin: Array size is up to 10^5. O(N^2) brute force will TLE.',
              },
              {
                title: 'Are duplicate elements guaranteed in Problem B?',
                user: 'Aman K.',
                time: '34m ago',
                comments: 4,
                upvotes: 8,
                reply: 'Admin: Yes, all elements in the input array are positive integers.',
              },
              {
                title: 'Tips for DP on Grid memory limit',
                user: 'Rohan V.',
                time: '45m ago',
                comments: 9,
                upvotes: 21,
                reply: 'Community: You can optimize 2D DP array into two rolling 1D rows.',
              },
            ].map((d, i) => (
              <Card key={i} className="rounded-2xl border border-line bg-surface p-5 space-y-2.5 shadow-xs">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-sm font-bold text-ink hover:text-brand-600 cursor-pointer">
                      {d.title}
                    </h3>
                    <p className="text-[11px] text-ink-muted mt-1">
                      Posted by <strong className="text-slate-700">{d.user}</strong> • {d.time} • {d.comments} responses
                    </p>
                  </div>
                  <span className="rounded-lg bg-slate-100 text-slate-700 px-2 py-1 text-xs font-bold">
                    👍 {d.upvotes}
                  </span>
                </div>
                {d.reply && (
                  <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-xs text-slate-700 mt-2">
                    <span className="font-bold text-brand-600">Official Clarification: </span>
                    {d.reply}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Editorial' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-bold text-ink">
                Official Contest Editorial
              </h2>
              <p className="text-xs text-ink-muted">
                Detailed algorithmic walk-throughs and sample solutions for all 5 problems.
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-bold border border-emerald-200">
              Verified Solutions
            </span>
          </div>

          <div className="space-y-4">
            <Card className="rounded-2xl border border-line bg-surface p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-ink">
                  Problem A: Two Sum – O(N) Hash Map
                </h3>
                <span className="rounded bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 font-bold">
                  Easy
                </span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Rather than using a nested quadratic loop check, insert elements into a hash table mapping value to index. For each element <code className="bg-slate-100 px-1 py-0.5 rounded text-ink">x</code>, check if <code className="bg-slate-100 px-1 py-0.5 rounded text-ink">target - x</code> exists in the map.
              </p>
              <pre className="rounded-xl bg-navy-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
{`function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement)!, i];
    map.set(nums[i], i);
  }
  return [];
}`}
              </pre>
            </Card>

            <Card className="rounded-2xl border border-line bg-surface p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-ink">
                  Problem B: Subarray with Given Sum – Sliding Window
                </h3>
                <span className="rounded bg-amber-100 text-amber-800 text-xs px-2 py-0.5 font-bold">
                  Medium
                </span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Since all numbers are positive, maintain two pointers representing the active window. Expand the right pointer to increase sum; when sum exceeds target, contract left pointer.
              </p>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'Submissions' && (
        <div className="space-y-4">
          <Card className="p-0 overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
            <div className="border-b border-line px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-ink">
                Your Submissions (CodeSprint 48)
              </h3>
              <span className="text-xs text-ink-muted">2 of 2 Accepted (100% Accuracy)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-line bg-slate-50 text-left text-ink-muted">
                    <th className="px-5 py-3 font-bold">Problem</th>
                    <th className="px-5 py-3 font-bold">Verdict</th>
                    <th className="px-5 py-3 font-bold">Language</th>
                    <th className="px-5 py-3 font-bold">Runtime</th>
                    <th className="px-5 py-3 font-bold">Memory</th>
                    <th className="px-5 py-3 font-bold">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr className="hover:bg-surface-subtle">
                    <td className="px-5 py-3.5 font-bold text-ink">Problem A: Two Sum</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[11px] font-bold">
                        <CheckCircle2 size={12} /> Accepted
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono">TypeScript</td>
                    <td className="px-5 py-3.5 font-mono text-slate-600">24 ms</td>
                    <td className="px-5 py-3.5 font-mono text-slate-600">44.1 MB</td>
                    <td className="px-5 py-3.5 font-mono text-ink-muted">02:08 PM</td>
                  </tr>
                  <tr className="hover:bg-surface-subtle">
                    <td className="px-5 py-3.5 font-bold text-ink">Problem B: Subarray with Given Sum</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[11px] font-bold">
                        <CheckCircle2 size={12} /> Accepted
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono">TypeScript</td>
                    <td className="px-5 py-3.5 font-mono text-slate-600">42 ms</td>
                    <td className="px-5 py-3.5 font-mono text-slate-600">48.3 MB</td>
                    <td className="px-5 py-3.5 font-mono text-ink-muted">02:34 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ==========================================
          MODALS & DRAWERS
         ========================================== */}

      {/* Modal 1: Contest Rules */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl border border-line bg-surface p-6 shadow-pop space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-brand-600" />
                <h3 className="font-display text-base font-bold text-ink">
                  CodeSprint 48 – Official Rules
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRulesModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-ink-muted leading-relaxed">
              <div className="rounded-xl bg-blue-50/70 p-3 text-blue-900 border border-blue-200">
                <strong className="block text-sm font-bold text-blue-950 mb-1">
                  ICPC Scoring &amp; Penalties
                </strong>
                Every accepted submission awards full problem points (+100 or +200). Each rejected submission incurs a 25-minute penalty upon subsequent acceptance.
              </div>

              <div className="space-y-2 text-slate-700">
                <p>
                  <strong>1. Submission Formats:</strong> Code is executed against comprehensive hidden test cases, edge cases, and memory limits.
                </p>
                <p>
                  <strong>2. Fair Play &amp; Plagiarism:</strong> Submissions are processed through our AI semantic code similarity checker. Any detected collusion will lead to rating disqualification.
                </p>
                <p>
                  <strong>3. Supported Compilers:</strong> C++20, Java 17, Python 3.11, TypeScript 5.4, Go 1.22.
                </p>
                <p>
                  <strong>4. Rating Recalculation:</strong> Standard Elo rating formula calibrated to your college division standing will update immediately after contest closing.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                size="sm"
                onClick={() => setShowRulesModal(false)}
                className="bg-brand-600 text-white text-xs font-bold rounded-xl px-5"
              >
                Understood, Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: All Rewards */}
      {showRewardsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-pop space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Award size={20} className="text-amber-500" />
                <h3 className="font-display text-base font-bold text-ink">
                  CodeSprint 48 – Prize Pool Breakdown
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRewardsModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-amber-50/80 p-3 border border-amber-200">
                <span className="font-bold text-amber-900">🥇 1st Place Champion</span>
                <span className="font-mono font-black text-amber-700">2,500 Coins + Gold Badge</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-100 p-3 border border-slate-200">
                <span className="font-bold text-slate-900">🥈 2nd Place Runner Up</span>
                <span className="font-mono font-black text-slate-700">1,500 Coins + Silver Badge</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-amber-50/50 p-3 border border-amber-100">
                <span className="font-bold text-amber-950">🥉 3rd Place</span>
                <span className="font-mono font-black text-amber-800">1,000 Coins + Bronze Badge</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-subtle p-3 border border-line">
                <span className="font-medium text-ink">Ranks 4 – 10</span>
                <span className="font-mono font-bold text-ink">200 Coins each</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-subtle p-3 border border-line">
                <span className="font-medium text-ink">Ranks 11 – 50</span>
                <span className="font-mono font-bold text-ink">100 Coins each</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                size="sm"
                onClick={() => setShowRewardsModal(false)}
                className="bg-brand-600 text-white text-xs font-bold rounded-xl px-5"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Announcements */}
      {showAnnouncementsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl border border-line bg-surface p-6 shadow-pop space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Bell size={20} className="text-brand-600" />
                <h3 className="font-display text-base font-bold text-ink">
                  Contest Announcements
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAnnouncementsModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900">Broadcast Notice</span>
                  <span className="font-mono text-[11px] text-blue-600">02:15 PM IST</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Make sure to read the problem statements carefully before submitting. Hidden boundary tests for Problem D require long integers to prevent 32-bit overflow.
                </p>
              </div>

              <div className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink">Contest Started</span>
                  <span className="font-mono text-[11px] text-ink-muted">02:00 PM IST</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  CodeSprint 48 is officially underway! Judge submission queues are running with 0ms latency.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                size="sm"
                onClick={() => setShowAnnouncementsModal(false)}
                className="bg-brand-600 text-white text-xs font-bold rounded-xl px-5"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Full Analytics */}
      {showAnalyticsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-pop space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-600" />
                <h3 className="font-display text-base font-bold text-ink">
                  Your Contest Analytics
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAnalyticsModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-line bg-surface-subtle p-3 text-center">
                  <span className="text-ink-muted">Current Rank</span>
                  <p className="font-display text-xl font-bold text-brand-600 mt-1">#1,248</p>
                  <span className="text-[10px] text-emerald-600 font-semibold">Top 38%</span>
                </div>
                <div className="rounded-xl border border-line bg-surface-subtle p-3 text-center">
                  <span className="text-ink-muted">Estimated Rating &Delta;</span>
                  <p className="font-display text-xl font-bold text-emerald-600 mt-1">+34 pts</p>
                  <span className="text-[10px] text-slate-500">New: 1,674</span>
                </div>
              </div>

              <div className="rounded-xl border border-line p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Time to First Solve:</span>
                  <span className="font-mono font-bold text-ink">8 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Total Penalty:</span>
                  <span className="font-mono font-bold text-ink">00:42:15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Wrong Attempts:</span>
                  <span className="font-mono font-bold text-emerald-600">0 (Clean)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                size="sm"
                onClick={() => setShowAnalyticsModal(false)}
                className="bg-brand-600 text-white text-xs font-bold rounded-xl px-5"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 5: View Solution Preview */}
      {activeSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-2xl border border-line bg-surface p-6 shadow-pop space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <h3 className="font-display text-base font-bold text-ink">
                  Accepted Solution: Problem {activeSolution.letter} ({activeSolution.title})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSolution(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-ink-muted">
                <span>Status: <strong className="text-emerald-600">Accepted (100 pts)</strong></span>
                <span className="font-mono">TypeScript · 24ms · 44.1MB</span>
              </div>

              <pre className="rounded-xl bg-navy-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-72">
                {activeSolution.solutionSnippet || '// Solution accepted in contest'}
              </pre>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                size="sm"
                onClick={() => setActiveSolution(null)}
                className="bg-brand-600 text-white text-xs font-bold rounded-xl px-5"
              >
                Close Solution
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
