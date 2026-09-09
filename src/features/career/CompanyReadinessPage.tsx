import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  Bookmark,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Lightbulb,
  MoreVertical,
  Plus,
  Search,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Video,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'

interface TargetCompany {
  id: string
  name: string
  logo: string
  logoBg: string
  role: string
  readinessScore: number
  status: 'In Progress' | 'Not Started' | 'Ready'
  statusColor: string
  nextStep: string
  nextStepDate: string
}

const targetCompanies: TargetCompany[] = [
  {
    id: 'google',
    name: 'Google',
    logo: 'https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png',
    logoBg: 'bg-white',
    role: 'Software Engineer',
    readinessScore: 85,
    status: 'In Progress',
    statusColor: 'text-brand-600 bg-brand-50 border-brand-200',
    nextStep: 'System Design Practice',
    nextStepDate: 'May 24, 2026',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    logoBg: 'bg-white',
    role: 'Software Engineer',
    readinessScore: 78,
    status: 'In Progress',
    statusColor: 'text-brand-600 bg-brand-50 border-brand-200',
    nextStep: 'Mock Interview',
    nextStepDate: 'May 25, 2026',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    logoBg: 'bg-white',
    role: 'SDE II',
    readinessScore: 68,
    status: 'In Progress',
    statusColor: 'text-brand-600 bg-brand-50 border-brand-200',
    nextStep: 'Behavioral Prep',
    nextStepDate: 'May 27, 2026',
  },
  {
    id: 'meta',
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    logoBg: 'bg-white',
    role: 'Software Engineer',
    readinessScore: 60,
    status: 'Not Started',
    statusColor: 'text-slate-600 bg-slate-100 border-slate-200',
    nextStep: 'Create Study Plan',
    nextStepDate: 'May 30, 2026',
  },
  {
    id: 'apple',
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    logoBg: 'bg-white',
    role: 'iOS Developer',
    readinessScore: 45,
    status: 'Not Started',
    statusColor: 'text-slate-600 bg-slate-100 border-slate-200',
    nextStep: 'DSA Practice',
    nextStepDate: 'Jun 02, 2026',
  },
  {
    id: 'netflix',
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    logoBg: 'bg-white',
    role: 'Software Engineer',
    readinessScore: 35,
    status: 'Not Started',
    statusColor: 'text-slate-600 bg-slate-100 border-slate-200',
    nextStep: 'Resume Review',
    nextStepDate: 'Jun 05, 2026',
  },
]

export function CompanyReadinessPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Overview')
  const [bookmarkedResources, setBookmarkedResources] = useState<Record<string, boolean>>({
    'handbook': true,
    'primer': false,
    'ctci': false,
  })
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const toggleBookmark = (id: string) => {
    setBookmarkedResources((prev) => {
      const next = !prev[id]
      showToast(next ? 'Resource bookmarked' : 'Resource removed from bookmarks')
      return { ...prev, [id]: next }
    })
  }

  const tabs = [
    'Overview',
    'Target Companies',
    'Application Tracker',
    'Company Insights',
    'Preparation Plan',
    'Offer Analytics',
  ]

  return (
    <div className="space-y-6 pb-20">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-600 px-4 py-2.5 text-xs font-semibold text-white shadow-pop transition-all animate-bounce">
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
        <Link to="/career-growth" className="hover:text-brand-600 transition-colors">
          Career Growth
        </Link>
        <ChevronRight size={13} className="text-slate-400" />
        <span className="font-bold text-ink">Company Readiness</span>
      </nav>

      {/* Header Card */}
      <Card className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 border border-brand-200 shadow-2xs">
              <Building2 size={28} className="stroke-[2.2]" />
            </div>
            <div className="space-y-1.5">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Company Readiness
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted max-w-xl leading-relaxed">
                Track your preparation for dream companies and improve your chances.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => showToast('Opening Add Target Company modal...')}
              className="gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm rounded-xl px-4 py-2"
            >
              <Plus size={15} />
              Add Target Company
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
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

      {/* Main Grid: Left 8 cols, Right 4 cols */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top 4 Stat Tiles */}
          <div className="grid gap-4 sm:grid-cols-12">
            {/* Tile 1: Overall Readiness Score */}
            <Card className="sm:col-span-4 rounded-2xl border border-line bg-surface p-5 shadow-xs flex flex-col justify-between">
              <span className="text-xs font-bold text-ink">Overall Readiness Score</span>
              <div className="my-3 flex items-center gap-4">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                  <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-blue-600"
                      strokeDasharray="74, 100"
                      strokeLinecap="round"
                      strokeWidth="3.4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-display text-lg font-black text-ink leading-none">74</span>
                    <span className="text-[9px] font-bold text-ink-muted">Good</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <TrendingUp size={12} />
                    12% this month
                  </span>
                  <p className="text-[11px] text-ink-muted">Keep improving!</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('Viewing readiness score details...')}
                className="inline-flex items-center justify-center rounded-xl border border-line bg-slate-50/80 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-slate-100 transition-colors"
              >
                View Details
              </button>
            </Card>

            {/* Tile 2: Target Companies */}
            <Card className="sm:col-span-3 rounded-2xl border border-line bg-surface p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Building2 size={16} />
                </div>
                <span className="text-xs font-bold text-ink">Target Companies</span>
              </div>
              <div className="my-2 flex items-baseline gap-6">
                <div>
                  <span className="font-display text-2xl font-extrabold text-ink">6</span>
                  <p className="text-[11px] text-ink-muted font-medium">Active</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-extrabold text-ink">2</span>
                  <p className="text-[11px] text-ink-muted font-medium">Applied</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening Target Companies manager...')}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
              >
                <span>Manage Targets</span>
                <ChevronRight size={13} />
              </button>
            </Card>

            {/* Tile 3: Applications */}
            <Card className="sm:col-span-2 rounded-2xl border border-line bg-surface p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Send size={16} />
                </div>
                <span className="text-xs font-bold text-ink">Applications</span>
              </div>
              <div className="my-2 flex items-baseline gap-4">
                <div>
                  <span className="font-display text-2xl font-extrabold text-ink">5</span>
                  <p className="text-[11px] text-ink-muted font-medium">Total</p>
                </div>
                <div>
                  <span className="font-display text-2xl font-extrabold text-ink">3</span>
                  <p className="text-[11px] text-ink-muted font-medium">In Progress</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('Viewing active applications...')}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
              >
                <span>View Applications</span>
                <ChevronRight size={13} />
              </button>
            </Card>

            {/* Tile 4: Upcoming Deadlines */}
            <Card className="sm:col-span-3 rounded-2xl border border-line bg-surface p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Calendar size={16} />
                </div>
                <span className="text-xs font-bold text-ink">Upcoming Deadlines</span>
              </div>
              <div className="my-2 flex items-baseline gap-4">
                <div>
                  <span className="font-display text-2xl font-extrabold text-ink">2</span>
                  <p className="text-[11px] text-ink-muted font-medium">This Week</p>
                </div>
                <div className="text-[11px] text-ink-muted">
                  <p className="font-medium text-slate-500">This Month</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening preparation calendar...')}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
              >
                <span>View Calendar</span>
                <ChevronRight size={13} />
              </button>
            </Card>
          </div>

          {/* Company Preparation Progress Table Card */}
          <Card className="rounded-2xl border border-line bg-surface p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold text-ink">
                  Company Preparation Progress
                </h3>
                <p className="text-xs text-ink-muted">
                  Track your readiness for each target company.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast('Viewing all 6 targets...')}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
              >
                <span>View all targets</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line/80 text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                    <th className="pb-3 pr-4">Company</th>
                    <th className="pb-3 px-4">Role</th>
                    <th className="pb-3 px-4">Readiness Score</th>
                    <th className="pb-3 px-4">Status</th>
                    <th className="pb-3 px-4">Next Step</th>
                    <th className="pb-3 pl-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {targetCompanies.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Company */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line/80 bg-white p-1.5 shadow-2xs">
                            <img
                              src={c.logo}
                              alt={c.name}
                              className="max-h-full max-w-full object-contain"
                              onError={(e) => {
                                // fallback text
                                e.currentTarget.style.display = 'none'
                                e.currentTarget.parentElement!.innerHTML = `<span class="font-bold text-xs text-brand-600">${c.name.charAt(0)}</span>`
                              }}
                            />
                          </div>
                          <span className="font-bold text-ink">{c.name}</span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-4 font-medium text-slate-600">
                        {c.role}
                      </td>

                      {/* Readiness Score Progress */}
                      <td className="py-4 px-4 min-w-[140px]">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-28 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-brand-600 transition-all"
                              style={{ width: `${c.readinessScore}%` }}
                            />
                          </div>
                          <span className="font-bold text-ink">{c.readinessScore}%</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={cn(
                            'inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold border',
                            c.statusColor
                          )}
                        >
                          {c.status}
                        </span>
                      </td>

                      {/* Next Step */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-400 shrink-0" />
                          <div>
                            <span className="font-semibold text-ink block">{c.nextStep}</span>
                            <span className="text-[10px] text-ink-muted">{c.nextStepDate}</span>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pl-4 text-right">
                        <button
                          type="button"
                          onClick={() => showToast(`Actions for ${c.name}`)}
                          className="rounded-lg p-1.5 text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => showToast('Navigating to full Company Insights hub...')}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
              >
                <span>Explore Company Insights</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </Card>

          {/* Bottom 2 Cards (Side-by-side) */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1: Your Preparation Plan */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-sm font-bold text-ink">
                    Your Preparation Plan
                  </h4>
                  <button
                    type="button"
                    onClick={() => showToast('Opening complete preparation plan...')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    <span>View full plan</span>
                    <ChevronRight size={13} />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink">
                          Strengthen System Design
                        </span>
                        <span className="text-[11px] font-bold text-ink-muted">6/10</span>
                      </div>
                      <p className="text-[11px] text-ink-muted">
                        Complete 10 System Design problems
                      </p>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink">
                          Company Specific Preparation
                        </span>
                        <span className="text-[11px] font-bold text-ink-muted">3/5</span>
                      </div>
                      <p className="text-[11px] text-ink-muted">
                        Complete Google Interview Guide
                      </p>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-blue-600" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink">
                          Mock Interviews
                        </span>
                        <span className="text-[11px] font-bold text-ink-muted">2/5</span>
                      </div>
                      <p className="text-[11px] text-ink-muted">
                        Complete 5 mock interviews
                      </p>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-purple-600" style={{ width: '40%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 2: Recommended Resources */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-sm font-bold text-ink">
                    Recommended Resources
                  </h4>
                  <button
                    type="button"
                    onClick={() => showToast('Viewing all recommended resources...')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    <span>View all resources</span>
                    <ChevronRight size={13} />
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {/* Resource 1 */}
                  <div className="flex items-center justify-between rounded-xl border border-line/60 bg-slate-50/50 p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-900 text-white font-bold text-[9px] uppercase shadow-2xs">
                        Book
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-ink">
                            Google Interview Handbook
                          </span>
                          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 border border-emerald-200">
                            Guide
                          </span>
                        </div>
                        <p className="text-[11px] text-ink-muted">By Learnlytica</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleBookmark('handbook')}
                      className={cn(
                        'p-1.5 rounded-lg transition-colors',
                        bookmarkedResources['handbook']
                          ? 'text-brand-600 bg-brand-50'
                          : 'text-slate-400 hover:text-ink'
                      )}
                    >
                      <Bookmark size={15} className={bookmarkedResources['handbook'] ? 'fill-current' : ''} />
                    </button>
                  </div>

                  {/* Resource 2 */}
                  <div className="flex items-center justify-between rounded-xl border border-line/60 bg-slate-50/50 p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-900 text-white font-bold text-[9px] uppercase shadow-2xs">
                        Course
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-ink">
                            System Design Primer
                          </span>
                          <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 border border-blue-200">
                            Course
                          </span>
                        </div>
                        <p className="text-[11px] text-ink-muted">By Educative</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleBookmark('primer')}
                      className={cn(
                        'p-1.5 rounded-lg transition-colors',
                        bookmarkedResources['primer']
                          ? 'text-brand-600 bg-brand-50'
                          : 'text-slate-400 hover:text-ink'
                      )}
                    >
                      <Bookmark size={15} className={bookmarkedResources['primer'] ? 'fill-current' : ''} />
                    </button>
                  </div>

                  {/* Resource 3 */}
                  <div className="flex items-center justify-between rounded-xl border border-line/60 bg-slate-50/50 p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-800 text-white font-bold text-[9px] uppercase shadow-2xs">
                        Book
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-ink">
                            Cracking the Coding Interview
                          </span>
                          <span className="rounded bg-purple-50 px-1.5 py-0.5 text-[9px] font-bold text-purple-600 border border-purple-200">
                            Book
                          </span>
                        </div>
                        <p className="text-[11px] text-ink-muted">By Gayle Laakmann McDowell</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleBookmark('ctci')}
                      className={cn(
                        'p-1.5 rounded-lg transition-colors',
                        bookmarkedResources['ctci']
                          ? 'text-brand-600 bg-brand-50'
                          : 'text-slate-400 hover:text-ink'
                      )}
                    >
                      <Bookmark size={15} className={bookmarkedResources['ctci'] ? 'fill-current' : ''} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Rail Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Your Strengths & Gaps */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm font-bold text-ink">
                Your Strengths &amp; Gaps
              </h4>
              <button
                type="button"
                onClick={() => showToast('Opening complete diagnostic report...')}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                <span>View full report</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* Top Strengths */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">
                Top Strengths
              </span>

              <div className="flex items-center justify-between py-1 border-b border-line/40">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-emerald-500" />
                  <span className="text-xs font-medium text-slate-700">
                    Data Structures &amp; Algorithms
                  </span>
                </div>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  Strong
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-line/40">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 fill-emerald-100" />
                  <span className="text-xs font-medium text-slate-700">Problem Solving</span>
                </div>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  Strong
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-emerald-500" />
                  <span className="text-xs font-medium text-slate-700">Core JavaScript</span>
                </div>
                <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                  Good
                </span>
              </div>
            </div>

            {/* Areas to Improve */}
            <div className="space-y-2 pt-2 border-t border-line/60">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">
                Areas to Improve
              </span>

              <div className="flex items-center justify-between py-1 border-b border-line/40">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-amber-500" />
                  <span className="text-xs font-medium text-slate-700">System Design</span>
                </div>
                <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                  Needs Work
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-line/40">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-amber-500" />
                  <span className="text-xs font-medium text-slate-700">Behavioral Interviews</span>
                </div>
                <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                  Needs Work
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <AlertCircle size={15} className="text-amber-500" />
                  <span className="text-xs font-medium text-slate-700">Advanced SQL</span>
                </div>
                <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                  Needs Work
                </span>
              </div>
            </div>
          </Card>

          {/* Card 2: Recommended for You */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm font-bold text-ink">
                Recommended for You
              </h4>
              <button
                type="button"
                onClick={() => showToast('Viewing all recommendations...')}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                <span>View all</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="space-y-3">
              {/* Rec 1 */}
              <div className="flex items-center justify-between rounded-xl border border-line/60 bg-slate-50/50 p-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-ink block">
                      System Design Intensive
                    </span>
                    <span className="text-[10px] text-ink-muted">
                      Master HLD &amp; LLD with real-world examples
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Starting System Design Intensive...')}
                  className="rounded-lg text-xs font-bold px-3 py-1 text-brand-600 border-brand-200 hover:bg-brand-50"
                >
                  Start
                </Button>
              </div>

              {/* Rec 2 */}
              <div className="flex items-center justify-between rounded-xl border border-line/60 bg-slate-50/50 p-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                    <Video size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-ink block">
                      Company Specific Mock Interviews
                    </span>
                    <span className="text-[10px] text-ink-muted">
                      Practice role and company specific mocks
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/interviews?tab=mock-interviews')}
                  className="rounded-lg text-xs font-bold px-3 py-1 text-brand-600 border-brand-200 hover:bg-brand-50"
                >
                  View
                </Button>
              </div>

              {/* Rec 3 */}
              <div className="flex items-center justify-between rounded-xl border border-line/60 bg-slate-50/50 p-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <Users size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-ink block">
                      Behavioral Interview Mastery
                    </span>
                    <span className="text-[10px] text-ink-muted">
                      Ace your behavioral rounds
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Starting Behavioral Interview course...')}
                  className="rounded-lg text-xs font-bold px-3 py-1 text-brand-600 border-brand-200 hover:bg-brand-50"
                >
                  Start
                </Button>
              </div>
            </div>
          </Card>

          {/* Card 3: Company Insights Snapshot */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-sm font-bold text-ink">
                Company Insights Snapshot
              </h4>
              <button
                type="button"
                onClick={() => showToast('Viewing all company insights...')}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                <span>View all insights</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white p-1">
                <img
                  src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png"
                  alt="Google"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-display text-sm font-bold text-ink">Google</span>
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-xl border border-line/60 bg-slate-50/60 p-3 text-center">
              <div>
                <span className="text-[10px] font-medium text-ink-muted block">Interview Difficulty</span>
                <span className="font-display text-xs font-extrabold text-ink mt-0.5 block">Hard</span>
              </div>
              <div>
                <span className="text-[10px] font-medium text-ink-muted block">Average Rounds</span>
                <span className="font-display text-xs font-extrabold text-ink mt-0.5 block">5</span>
              </div>
              <div>
                <span className="text-[10px] font-medium text-ink-muted block">Offer Rate</span>
                <span className="font-display text-xs font-extrabold text-ink mt-0.5 block">1.8%</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast('Opening Google detailed insights...')}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
            >
              <span>View detailed insights</span>
              <ChevronRight size={13} />
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}

