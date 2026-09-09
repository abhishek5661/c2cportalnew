import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BarChart2,
  BarChart3,
  Bookmark,
  BookOpen,
  Bot,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Code2,
  Coins,
  Compass,
  Download,
  ExternalLink,
  Eye,
  FileCode,
  FileText,
  Flame,
  Globe,
  GraduationCap,
  Layers,
  Lightbulb,
  Lock,
  MessageSquare,
  MoreVertical,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'

export function SkillRoadmapPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Tab management via query params or state
  const queryParams = new URLSearchParams(location.search)
  const qTab = queryParams.get('tab')
  const [activeTab, setActiveTab] = useState<string>(
    qTab === 'skill-roadmap' || qTab === 'roadmap'
      ? 'Skill Roadmap'
      : qTab === 'goal-tracker'
      ? 'Goal Tracker'
      : qTab === 'career-path' || qTab === 'learning-path'
      ? 'Career Path'
      : qTab === 'industry-insights' || qTab === 'insights'
      ? 'Industry Insights'
      : qTab === 'skill-demand'
      ? 'Skill Demand'
      : 'Overview'
  )

  const [opportunitiesFilter, setOpportunitiesFilter] = useState<'Recommended' | 'Saved' | 'Applied'>('Recommended')
  const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>({})

  const toggleSaveJob = (role: string) => {
    setSavedJobs((prev) => ({ ...prev, [role]: !prev[role] }))
    showToast(savedJobs[role] ? `Removed ${role} from saved` : `Saved ${role}`)
  }

  const [targetRole, setTargetRole] = useState('Full Stack Developer')
  const [expandedModule, setExpandedModule] = useState<number | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [timeRange, setTimeRange] = useState('Last 6 Months')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === 'Overview') {
      navigate('/career-growth', { replace: true })
    } else if (tab === 'Skill Roadmap') {
      navigate('/career-growth?tab=skill-roadmap', { replace: true })
    } else {
      navigate(`/career-growth?tab=${tab.toLowerCase().replace(/\s+/g, '-')}`, { replace: true })
    }
  }

  const careerTabs = [
    'Overview',
    'Goal Tracker',
    'Career Path',
    'Industry Insights',
    'Skill Demand',
    'Skill Roadmap',
  ]

  // Modules for the Skill Roadmap tab (Image 1 from previous batch)
  const modules = [
    {
      id: 1,
      title: 'Advanced JavaScript',
      desc: 'Closures, Promises, Async/Await, Event Loop',
      icon: <Code2 size={16} className="text-indigo-600" />,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      progress: 100,
      completed: true,
    },
    {
      id: 2,
      title: 'React Advanced',
      desc: 'Hooks, Context API, Performance Optimization',
      icon: <Sparkles size={16} className="text-cyan-600" />,
      iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-200',
      progress: 75,
      action: 'Continue',
    },
    {
      id: 3,
      title: 'Node.js & Express',
      desc: 'REST APIs, Middleware, Authentication',
      icon: <Layers size={16} className="text-emerald-600" />,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      progress: 40,
      action: 'Continue',
    },
    {
      id: 4,
      title: 'Database Design',
      desc: 'Schema Design, Indexing, Normalization, Queries',
      icon: <Server size={16} className="text-amber-600" />,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
      progress: 30,
      action: 'Continue',
    },
    {
      id: 5,
      title: 'Testing & Debugging',
      desc: 'Unit Testing, Integration Testing, Debugging Tools',
      icon: <Target size={16} className="text-rose-600" />,
      iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
      progress: 0,
      action: 'Start',
    },
  ]

  const recommendedCourses = [
    {
      title: 'Full Stack Web Development Masterclass',
      author: 'Sachin Diwakar',
      rating: 4.9,
      reviews: 1420,
      level: 'All Levels',
      duration: '42 hours',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Advanced React & Next.js Architecture',
      author: 'Ananya Sharma',
      rating: 4.8,
      reviews: 980,
      level: 'Intermediate',
      duration: '28 hours',
      color: 'from-cyan-600 to-blue-600',
    },
    {
      title: 'Microservices & Distributed Systems with Go',
      author: 'Rohan Verma',
      rating: 4.9,
      reviews: 820,
      level: 'Advanced',
      duration: '35 hours',
      color: 'from-emerald-600 to-teal-600',
    },
    {
      title: 'System Design for Tech Interviews',
      author: 'Vikram Singh',
      rating: 4.9,
      reviews: 2150,
      level: 'Intermediate',
      duration: '30 hours',
      color: 'from-purple-600 to-indigo-600',
    },
  ]

  return (
    <div className="space-y-6 pb-20">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-purple-200 bg-brand-600 px-4 py-2.5 text-xs font-semibold text-white shadow-pop transition-all animate-bounce">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-ink-muted">
        <Link to="/professional" className="hover:text-brand-600 transition-colors">
          Professional
        </Link>
        <ChevronRight size={13} className="text-slate-400" />
        <span className="font-bold text-ink">Career Growth</span>
        {activeTab === 'Skill Roadmap' && (
          <>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="font-bold text-ink">Skill Roadmap</span>
          </>
        )}
      </nav>

      {/* Header Card */}
      <Card className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 shadow-2xs">
              <TrendingUp size={26} className="stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Career Growth
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted max-w-xl leading-relaxed">
                Track your progress, set goals and build the career you want.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-purple-50/70 px-4 py-1.5 text-xs font-medium text-purple-700 shadow-2xs">
            <Sparkles size={14} className="text-purple-600" />
            <span>&ldquo;Small steps every day lead to big results.&rdquo;</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4">
          {careerTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={cn(
                'relative px-3.5 py-2 text-xs font-bold rounded-lg transition-all',
                activeTab === tab
                  ? 'text-brand-600 bg-brand-50/80 font-extrabold'
                  : 'text-ink-muted hover:text-ink hover:bg-slate-50'
              )}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* ========================================================= */}
      {/* TAB 1: OVERVIEW (Matches media_1788780706855.png)         */}
      {/* ========================================================= */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* 4 Stat Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Career Readiness Score */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-700">Career Readiness Score</span>
                <div className="font-display text-2xl sm:text-3xl font-black text-ink">72%</div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <span>&uarr;</span> 12% this month
                </div>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 shadow-2xs">
                <Target size={22} />
              </div>
            </Card>

            {/* 2. Job Market Value */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-700">Job Market Value</span>
                <div className="font-display text-2xl sm:text-3xl font-black text-ink">
                  8.4 <span className="text-base font-bold text-ink-muted">/ 10</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <span>&uarr;</span> 0.6 this month
                </div>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs">
                <Briefcase size={22} />
              </div>
            </Card>

            {/* 3. Total Opportunities */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-700">Total Opportunities</span>
                <div className="font-display text-2xl sm:text-3xl font-black text-ink">18</div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <span>&uarr;</span> 5 this month
                </div>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 shadow-2xs">
                <Rocket size={22} />
              </div>
            </Card>

            {/* 4. Time to Next Role */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-700">Time to Next Role</span>
                <div className="font-display text-2xl sm:text-3xl font-black text-ink">
                  6 &ndash; 12 <span className="text-sm font-bold text-ink-muted">months</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <Check size={13} className="stroke-[3]" /> On track
                </div>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs">
                <Calendar size={22} />
              </div>
            </Card>
          </div>
      {/* Main Grid: Left 8 cols + Right 4 cols */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Row 1: Your Career Progress Line Chart & Career Path Stepper */}
          <div className="grid gap-6 md:grid-cols-12">
            {/* Your Career Progress Line Chart (7 cols) */}
            <Card className="md:col-span-7 rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-sm font-bold text-ink">Your Career Progress</h2>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="rounded-xl border border-line bg-surface px-2.5 py-1 text-xs font-bold text-ink shadow-2xs focus:outline-none cursor-pointer"
                >
                  <option value="Last 6 Months">Last 6 Months</option>
                  <option value="Last 3 Months">Last 3 Months</option>
                  <option value="Last 1 Year">Last 1 Year</option>
                </select>
              </div>

              {/* SVG Line Graph */}
              <div className="relative pt-6 pb-2">
                <div className="h-44 w-full">
                  <svg viewBox="0 0 360 160" className="h-full w-full overflow-visible">
                    {/* Horizontal Grid lines */}
                    {[
                      { y: 15, label: '100' },
                      { y: 47.5, label: '75' },
                      { y: 80, label: '50' },
                      { y: 112.5, label: '25' },
                      { y: 145, label: '0' },
                    ].map((grid) => (
                      <g key={grid.label}>
                        <line
                          x1="30"
                          y1={grid.y}
                          x2="350"
                          y2={grid.y}
                          stroke="#F1F5F9"
                          strokeWidth="1"
                        />
                        <text
                          x="20"
                          y={grid.y + 3}
                          textAnchor="end"
                          className="fill-slate-400 text-[9px] font-medium"
                        >
                          {grid.label}
                        </text>
                      </g>
                    ))}

                    {/* Chart Line Path */}
                    <path
                      d="M 45 105 L 105 92 L 165 85 L 225 74 L 285 62 L 335 48"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                        />

                    {/* Points */}
                    {[
                      { x: 45, y: 105, month: 'Jan' },
                      { x: 105, y: 92, month: 'Feb' },
                      { x: 165, y: 85, month: 'Mar' },
                      { x: 225, y: 74, month: 'Apr' },
                      { x: 285, y: 62, month: 'May' },
                    ].map((pt) => (
                      <g key={pt.month}>
                        <circle cx={pt.x} cy={pt.y} r="3.5" fill="#7C3AED" />
                        <text
                          x={pt.x}
                          y="160"
                          textAnchor="middle"
                          className="fill-slate-500 text-[10px] font-semibold"
                        >
                          {pt.month}
                        </text>
                      </g>
                    ))}

                    {/* Jun Highlighted Point with Tooltip */}
                    <g>
                      <circle cx="335" cy="48" r="7" fill="#7C3AED" className="opacity-30" />
                      <circle cx="335" cy="48" r="4" fill="#7C3AED" />
                      <text
                        x="335"
                        y="160"
                        textAnchor="middle"
                        className="fill-slate-900 text-[10px] font-bold"
                      >
                        Jun
                      </text>

                      {/* Tooltip Tag above Jun */}
                      <g transform="translate(315, 8)">
                        <rect
                          x="0"
                          y="0"
                          width="40"
                          height="28"
                          rx="6"
                          fill="#1E293B"
                        />
                        <polygon points="16,28 24,28 20,33" fill="#1E293B" />
                        <text x="20" y="11" textAnchor="middle" fill="#94A3B8" className="text-[8px] font-bold">
                          Jun
                        </text>
                        <text x="20" y="23" textAnchor="middle" fill="#FFFFFF" className="text-[10px] font-extrabold">
                          72%
                        </text>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </Card>

            {/* Career Path (5 cols) */}
            <Card className="md:col-span-5 rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-sm font-bold text-ink">Career Path</h2>
                <button
                  type="button"
                  onClick={() => setActiveTab('Career Path')}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
                >
                  View full path <ArrowRight size={12} />
                </button>
              </div>

              <div className="space-y-3 pt-1">
                {/* Stage 1: Current Role */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <div className="flex-1 -mt-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Current Role
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-bold text-ink">Full Stack Developer</span>
                      <ChevronRight size={14} className="text-slate-400" />
                    </div>
                    <span className="text-[11px] text-ink-muted">(2+ years)</span>
                  </div>
                </div>

                {/* Connecting Line 1 */}
                <div className="ml-3.5 h-3.5 w-0.5 bg-slate-200" />

                {/* Stage 2: Next Step */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-purple-600 bg-white text-purple-600 shadow-2xs">
                    <div className="h-2 w-2 rounded-full bg-purple-600" />
                  </div>
                  <div className="flex-1 -mt-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                      Next Step
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-bold text-ink">Senior Software Engineer</span>
                      <ChevronRight size={14} className="text-slate-400" />
                    </div>
                    <span className="text-[11px] text-ink-muted">(2&ndash;4 years)</span>
                  </div>
                </div>

                {/* Connecting Line 2 */}
                <div className="ml-3.5 h-3.5 w-0.5 bg-slate-200" />

                {/* Stage 3: Future Goal */}
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-slate-300">
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                  </div>
                  <div className="flex-1 -mt-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Future Goal
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-bold text-ink">Tech Lead / Architect</span>
                      <ChevronRight size={14} className="text-slate-400" />
                    </div>
                    <span className="text-[11px] text-ink-muted">(5+ years)</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Row 2: Career Opportunities */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-sm font-bold text-ink">Career Opportunities</h2>
              </div>

              <button
                type="button"
                onClick={() => showToast('Viewing all job opportunities...')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                View all opportunities <ArrowRight size={13} />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 border-b border-line pb-3">
              {(['Recommended', 'Saved', 'Applied'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setOpportunitiesFilter(filter)}
                  className={cn(
                    'rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all',
                    opportunitiesFilter === filter
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line/70 text-[11px] font-bold uppercase text-ink-muted">
                    <th className="py-2.5 pl-1 pr-3">Role</th>
                    <th className="py-2.5 px-3">Company</th>
                    <th className="py-2.5 px-3">Location</th>
                    <th className="py-2.5 px-3 text-center">Match Score</th>
                    <th className="py-2.5 px-3">Posted</th>
                    <th className="py-2.5 pr-1 pl-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/40">
                  {[
                    {
                      role: 'Senior Software Engineer',
                      company: 'Microsoft',
                      logo: (
                        <div className="grid grid-cols-2 gap-0.5 w-4 h-4 shrink-0">
                          <div className="bg-[#F25022] rounded-[1px]" />
                          <div className="bg-[#7FBA00] rounded-[1px]" />
                          <div className="bg-[#00A4EF] rounded-[1px]" />
                          <div className="bg-[#FFB900] rounded-[1px]" />
                        </div>
                      ),
                      location: 'Bengaluru, India',
                      matchScore: 92,
                      posted: '2 days ago',
                    },
                    {
                      role: 'Software Development Engineer II',
                      company: 'Google',
                      logo: (
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center font-bold text-[11px] text-blue-600">
                          G
                        </div>
                      ),
                      location: 'Hyderabad, India',
                      matchScore: 88,
                      posted: '3 days ago',
                    },
                    {
                      role: 'Full Stack Engineer',
                      company: 'Amazon',
                      logo: (
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center font-black text-[10px] text-slate-900">
                          a
                        </div>
                      ),
                      location: 'Bengaluru, India',
                      matchScore: 84,
                      posted: '5 days ago',
                    },
                    {
                      role: 'Backend Engineer',
                      company: 'Adobe',
                      logo: (
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-[#FA0F00] font-black text-[9px] text-white">
                          A
                        </div>
                      ),
                      location: 'Pune, India',
                      matchScore: 78,
                      posted: '1 week ago',
                    },
                  ].map((job) => (
                    <tr key={job.role} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 pl-1 pr-3 font-bold text-ink">
                        {job.role}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2 font-semibold text-slate-700">
                          {job.logo}
                          <span>{job.company}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-ink-muted">
                        {job.location}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-flex items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[11px] font-extrabold text-emerald-700">
                          {job.matchScore}%
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-ink-muted">
                        {job.posted}
                      </td>
                      <td className="py-3.5 pr-1 pl-3 text-right">
                        <button
                          type="button"
                          onClick={() => toggleSaveJob(job.role)}
                          className={cn(
                            'p-1.5 rounded-lg border transition-colors',
                            savedJobs[job.role]
                              ? 'border-purple-300 bg-purple-50 text-purple-600'
                              : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                          )}
                          title={savedJobs[job.role] ? 'Saved' : 'Save opportunity'}
                        >
                          <Bookmark size={14} className={savedJobs[job.role] ? 'fill-purple-600' : ''} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Rail (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Your Career Goals */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-ink">Your Career Goals</h3>
              <button
                type="button"
                onClick={() => setActiveTab('Goal Tracker')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
              >
                Edit goals <ArrowRight size={12} />
              </button>
            </div>

            <div className="space-y-3.5 pt-1">
              {[
                { title: 'Get promoted to Senior Engineer', target: 'Target: 12 months', done: true },
                { title: 'Build strong system design skills', target: 'Target: 6 months', done: true },
                { title: 'Work on a high-impact product', target: 'Target: 1 year', done: false },
                { title: 'Transition to Tech Lead', target: 'Target: 3–5 years', done: false },
              ].map((goal, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  {goal.done ? (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white mt-0.5 shadow-2xs">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                  ) : (
                    <div className="h-5 w-5 shrink-0 rounded-full border-2 border-slate-300 bg-white mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <p className={cn('text-xs font-bold', goal.done ? 'text-ink' : 'text-slate-700')}>
                      {goal.title}
                    </p>
                    <p className="text-[11px] text-ink-muted">{goal.target}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Card 2: Encouragement Banner */}
          <Card className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/60 to-indigo-50/60 p-5 shadow-xs space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700 shadow-2xs">
                <Trophy size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-xs font-bold text-ink">
                  You&apos;re on the right track!
                </h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Your progress is 68% ahead of your career plan. Keep going!
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <ArrowRight size={16} className="text-purple-600" />
            </div>
          </Card>

          {/* Card 3: Industry Insights */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-ink">Industry Insights</h3>
              <button
                type="button"
                onClick={() => setActiveTab('Industry Insights')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
              >
                View all <ArrowRight size={12} />
              </button>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600 border border-purple-200">
                <Lightbulb size={16} />
              </div>
              <span className="font-display text-xs font-bold text-ink">
                Top Growing Tech Roles (2025)
              </span>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              {[
                { num: 1, role: 'AI/ML Engineer', pct: '+42%' },
                { num: 2, role: 'Cloud Engineer', pct: '+38%' },
                { num: 3, role: 'Full Stack Developer', pct: '+32%' },
                { num: 4, role: 'DevOps Engineer', pct: '+28%' },
                { num: 5, role: 'Data Engineer', pct: '+24%' },
              ].map((item) => (
                <div key={item.role} className="flex items-center justify-between py-1 border-b border-line/40 last:border-0">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <span className="text-ink-muted text-[11px] font-bold w-3">{item.num}</span>
                    <span>{item.role}</span>
                  </div>
                  <span className="font-bold text-emerald-600">{item.pct}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Card 4: Career Resources */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-ink">Career Resources</h3>
              <button
                type="button"
                onClick={() => showToast('Opening career library...')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
              >
                View all <ArrowRight size={12} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                { icon: <FileText size={16} className="text-purple-600" />, label: 'Resume Tips' },
                { icon: <User size={16} className="text-blue-600" />, label: 'Interview Prep' },
                { icon: <Coins size={16} className="text-amber-600" />, label: 'Salary Guide' },
                { icon: <BookOpen size={16} className="text-emerald-600" />, label: 'Career Articles' },
              ].map((res) => (
                <button
                  key={res.label}
                  type="button"
                  onClick={() => showToast(`Opening ${res.label}...`)}
                  className="flex items-center gap-2 rounded-xl border border-line/80 bg-slate-50/60 p-2.5 text-left text-xs font-bold text-ink hover:bg-slate-100 hover:border-slate-300 transition-all shadow-2xs"
                >
                  {res.icon}
                  <span className="truncate">{res.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )}

      {/* ========================================================= */}
      {/* TAB 2: SKILL ROADMAP (Matches media_1788779818626.png)    */}
      {/* ========================================================= */}
      {activeTab === 'Skill Roadmap' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Roadmap Stepper Card */}
            <Card className="rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-ink-muted">Target Role:</span>
                    <select
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-bold text-ink shadow-2xs focus:border-brand-500 focus:outline-none"
                    >
                      <option value="Full Stack Developer">Full Stack Developer</option>
                      <option value="Frontend Engineer">Frontend Engineer</option>
                      <option value="Backend Engineer">Backend Engineer</option>
                    </select>
                  </div>
                  <p className="text-xs text-ink-muted">Estimated Time: 6 – 9 Months</p>
                </div>

                {/* Progress Donut */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-purple-600"
                        strokeDasharray="68, 100"
                        strokeLinecap="round"
                        strokeWidth="3.2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-display text-xs font-black text-ink">68%</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-ink">Overall Progress</span>
                    <p className="text-[11px] text-purple-600 font-semibold">Stage 3 of 5</p>
                  </div>
                </div>
              </div>

              {/* Horizontal Stepper */}
              <div className="relative pt-2">
                <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200" />
                <div className="absolute top-5 left-8 w-[50%] h-0.5 bg-purple-600" />

                <div className="relative grid grid-cols-5 gap-2 text-center text-xs">
                  {/* Stage 1 */}
                  <div className="space-y-2">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white font-bold ring-4 ring-white shadow-2xs">
                      <Check size={18} className="stroke-[3]" />
                    </div>
                    <div>
                      <p className="font-bold text-ink">Foundations</p>
                      <p className="text-[10px] text-emerald-600 font-bold">100%</p>
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div className="space-y-2">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white font-bold ring-4 ring-white shadow-2xs">
                      <Check size={18} className="stroke-[3]" />
                    </div>
                    <div>
                      <p className="font-bold text-ink">Core Development</p>
                      <p className="text-[10px] text-emerald-600 font-bold">100%</p>
                    </div>
                  </div>

                  {/* Stage 3 (Active) */}
                  <div className="space-y-2">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold ring-4 ring-purple-100 shadow-2xs">
                      68%
                    </div>
                    <div>
                      <p className="font-bold text-purple-700">Advanced Topics</p>
                      <p className="text-[10px] text-purple-600 font-bold">In Progress</p>
                    </div>
                  </div>

                  {/* Stage 4 */}
                  <div className="space-y-2 opacity-70">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 font-bold ring-4 ring-white shadow-2xs">
                      4
                    </div>
                    <div>
                      <p className="font-bold text-ink">Real World Skills</p>
                      <p className="text-[10px] text-ink-muted">Locked</p>
                    </div>
                  </div>

                  {/* Stage 5 */}
                  <div className="space-y-2 opacity-50">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-400 font-bold ring-4 ring-white shadow-2xs">
                      <Lock size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-ink">Career Ready</p>
                      <p className="text-[10px] text-ink-muted">Locked</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Info Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-purple-50/80 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-2xs">
                  <Sparkles size={16} />
                </div>
                <p className="text-xs font-bold text-ink">
                  Keep it up! Complete <span className="text-purple-700">Advanced Topics</span> to unlock Real World Skills.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Opening learning path navigator...')}
                className="text-xs font-bold border-slate-300 hover:border-brand-300 shrink-0"
              >
                View Learning Path &rarr;
              </Button>
            </div>

            {/* Current Stage 3: Advanced Topics Modules */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-sm font-bold text-ink">Stage 3: Advanced Topics</h2>
                  <p className="text-xs text-ink-muted">Master advanced web concepts, frameworks, and architecture.</p>
                </div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                  68% Completed
                </span>
              </div>

              {/* 5 Module Cards */}
              <div className="space-y-3">
                {modules.map((m) => (
                  <Card
                    key={m.id}
                    className="overflow-hidden rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-xs transition-all hover:border-slate-300"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-2xs', m.iconBg)}>
                          {m.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-display text-xs font-bold text-ink">{m.title}</h3>
                            {m.completed && (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                <Check size={11} className="stroke-[3]" /> Done
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-ink-muted">{m.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:block text-right">
                          <span className="text-xs font-bold text-ink">{m.progress}%</span>
                          <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-brand-600 rounded-full" style={{ width: `${m.progress}%` }} />
                          </div>
                        </div>

                        {m.action ? (
                          <Button
                            variant={m.action === 'Continue' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => showToast(`Launching module: ${m.title}`)}
                            className={cn(
                              'text-xs font-bold h-8 px-3',
                              m.action === 'Continue' ? 'bg-brand-600 text-white' : 'border-slate-300'
                            )}
                          >
                            {m.action}
                          </Button>
                        ) : (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <Check size={14} className="stroke-[3]" />
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => setExpandedModule(expandedModule === m.id ? null : m.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-50 transition-colors"
                        >
                          <ChevronDown
                            size={16}
                            className={cn('transition-transform duration-200', expandedModule === m.id && 'rotate-180 text-brand-600')}
                          />
                        </button>
                      </div>
                    </div>

                    {expandedModule === m.id && (
                      <div className="mt-4 pt-3 border-t border-line/60 text-xs text-slate-600 bg-slate-50/50 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-4 space-y-2">
                        <p className="font-semibold text-ink">Included Lessons &amp; Projects:</p>
                        <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
                          <li>In-depth core architecture walkthrough</li>
                          <li>2 hands-on coding drills with automated unit tests</li>
                          <li>1 production-ready mini project submission</li>
                        </ul>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Recommended Resources for You Carousel */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-sm font-bold text-ink">Recommended Resources for You</h2>
                  <p className="text-xs text-ink-muted">Handpicked courses and masterclasses to accelerate your roadmap.</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                    disabled={carouselIndex === 0}
                    className="p-1.5 rounded-lg border border-line bg-surface text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCarouselIndex(Math.min(recommendedCourses.length - 2, carouselIndex + 1))}
                    disabled={carouselIndex >= recommendedCourses.length - 2}
                    className="p-1.5 rounded-lg border border-line bg-surface text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedCourses.slice(carouselIndex, carouselIndex + 2).map((course, idx) => (
                  <Card
                    key={idx}
                    className="rounded-2xl border border-line bg-surface p-4 shadow-xs flex flex-col justify-between hover:border-brand-200 transition-all group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-ink-muted">
                        <span className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700">
                          {course.level}
                        </span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star size={11} className="fill-amber-400" />
                          {course.rating} ({course.reviews})
                        </span>
                      </div>

                      <h3 className="font-display text-xs font-bold text-ink leading-snug group-hover:text-brand-600 transition-colors">
                        {course.title}
                      </h3>

                      <p className="text-[11px] text-ink-muted">Instructor: {course.author}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-line/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock size={12} /> {course.duration}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => showToast(`Enrolling in ${course.title}...`)}
                        className="text-[11px] font-bold h-7 py-0 border-slate-300 hover:border-brand-300"
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail for Skill Roadmap (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Skills Overview Donut */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Skills Overview</h3>
                <span className="text-[10px] font-bold text-purple-600">24 Total</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                  <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.2"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-purple-600"
                      strokeDasharray="68, 100"
                      strokeLinecap="round"
                      strokeWidth="3.2"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-display text-base font-black text-ink">68%</span>
                    <span className="text-[8px] font-bold text-purple-600">Mastered</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Strong (8)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>Moderate (10)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span>Basic (4)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <span>Yet to Learn (2)</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upcoming Milestones */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <h3 className="font-display text-xs font-bold text-ink">Upcoming Milestones</h3>

              <div className="space-y-2.5 pt-1 text-xs">
                {[
                  { title: 'Complete React Advanced', sub: 'Unlocks Real World Skills', done: false },
                  { title: 'Build 2 Full Stack Projects', sub: 'Portfolio Requirement', done: false },
                  { title: 'Solve 100 DSA Problems', sub: 'Target: 82 / 100 solved', done: false },
                ].map((ms, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl border border-line/70 bg-slate-50/50">
                    <div className="h-4 w-4 rounded border border-slate-300 bg-white mt-0.5 flex items-center justify-center shrink-0">
                      {ms.done && <Check size={12} className="text-emerald-500" />}
                    </div>
                    <div>
                      <p className="font-bold text-ink">{ms.title}</p>
                      <p className="text-[10px] text-ink-muted">{ms.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Ask Mentor Card */}
            <Card className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/40 p-5 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-display text-xs font-bold text-ink">Need Help? Ask Mentor</h4>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    Stuck on advanced concepts? Connect with an industry mentor for 1:1 guidance.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 border border-purple-200 shadow-2xs">
                  <Bot size={20} />
                </div>
              </div>

              <Button
                size="sm"
                onClick={() => navigate('/mentor')}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold"
              >
                Connect with Mentor
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* Fallback for other subtabs */}
      {activeTab !== 'Overview' && activeTab !== 'Skill Roadmap' && (
        <Card className="rounded-2xl border border-line bg-surface p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
            <TrendingUp size={28} />
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-ink">{activeTab}</h3>
          <p className="mt-1 text-xs text-ink-muted max-w-sm mx-auto">
            Review your {activeTab.toLowerCase()} insights, analytics, and goals.
          </p>
          <div className="mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleTabChange('Overview')}
              className="text-xs font-bold"
            >
              &larr; Back to Overview
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export const CareerGrowthPage = SkillRoadmapPage
