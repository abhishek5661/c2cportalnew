import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart2,
  BarChart3,
  Bookmark,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileCode,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Lightbulb,
  Lock,
  MessageSquare,
  Mic,
  MoreVertical,
  Play,
  Plus,
  Search,
  Server,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Video,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'

export function InterviewsPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Read query params for subtab
  const queryParams = new URLSearchParams(location.search)
  const qTab = queryParams.get('tab')?.toLowerCase()
  const [activeTab, setActiveTab] = useState<string>(
    qTab === 'mock-interviews' || qTab === 'mocks'
      ? 'Mock Interviews'
      : qTab === 'question-bank'
      ? 'Question Bank'
      : qTab === 'history'
      ? 'Interview History'
      : qTab === 'feedback'
      ? 'Feedback & Analytics'
      : 'Overview'
  )

  const [activeMockSubTab, setActiveMockSubTab] = useState('All Mocks')
  const [mockSearch, setMockSearch] = useState('')
  const [mockRoleFilter, setMockRoleFilter] = useState('All Roles')
  const [mockDifficultyFilter, setMockDifficultyFilter] = useState('All Difficulty')
  const [mockStatusFilter, setMockStatusFilter] = useState('All Status')

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === 'Mock Interviews') {
      navigate('/interviews?tab=mock-interviews', { replace: true })
    } else if (tab === 'Overview') {
      navigate('/interviews', { replace: true })
    } else {
      navigate(`/interviews?tab=${tab.toLowerCase().replace(/\s+/g, '-')}`, { replace: true })
    }
  }

  const interviewTabs = [
    'Overview',
    'Mock Interviews',
    'Question Bank',
    'Interview History',
    'Feedback & Analytics',
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
        <span className="font-bold text-ink">Interviews</span>
        {activeTab === 'Mock Interviews' && (
          <>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="font-bold text-ink">Mock Interviews</span>
          </>
        )}
      </nav>

      {/* Header Card */}
      <Card className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 shadow-2xs">
              {activeTab === 'Mock Interviews' ? (
                <MessageSquare size={28} className="stroke-[2.2]" />
              ) : (
                <Mic size={28} className="stroke-[2.2]" />
              )}
            </div>
            <div className="space-y-1.5">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                {activeTab === 'Mock Interviews' ? 'Mock Interviews' : 'Interviews'}
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted max-w-xl leading-relaxed">
                {activeTab === 'Mock Interviews'
                  ? 'Practice with realistic mock interviews and get AI-powered feedback.'
                  : 'Practice, prepare and ace your interviews with confidence.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {activeTab === 'Mock Interviews' ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => showToast('Starting new mock interview session...')}
                className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs"
                leadingIcon={<Plus size={14} />}
              >
                Start New Mock
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => handleTabChange('Mock Interviews')}
                className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs"
                leadingIcon={<Sparkles size={14} />}
              >
                Practice Interview
              </Button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        {activeTab === 'Mock Interviews' ? (
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4 text-xs font-semibold text-ink-muted">
            {['All Mocks', 'My Mocks', 'AI Feedback', 'Saved Mocks'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setActiveMockSubTab(st)}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg transition-all',
                  activeMockSubTab === st
                    ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200'
                    : 'hover:bg-slate-50 hover:text-ink'
                )}
              >
                {st}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4">
            {interviewTabs.map((tab) => (
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
        )}
      </Card>

      {/* ========================================================= */}
      {/* TAB 1: OVERVIEW (Matches media_1788780706839.png)         */}
      {/* ========================================================= */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* 5 Stat Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              {
                icon: <MessageSquare size={16} className="text-purple-600" />,
                bg: 'bg-purple-50 border-purple-200',
                label: 'Mock Interviews',
                val: '12',
                sub: '↑ 3 this month',
                subColor: 'text-emerald-600',
              },
              {
                icon: <Shield size={16} className="text-blue-600" />,
                bg: 'bg-blue-50 border-blue-200',
                label: 'Average Score',
                val: '78%',
                sub: '↑ 12% this month',
                subColor: 'text-emerald-600',
              },
              {
                icon: <Award size={16} className="text-indigo-600" />,
                bg: 'bg-indigo-50 border-indigo-200',
                label: 'Strong Areas',
                val: '5',
                sub: 'View details →',
                subColor: 'text-brand-600 cursor-pointer',
              },
              {
                icon: <Target size={16} className="text-purple-600" />,
                bg: 'bg-purple-50 border-purple-200',
                label: 'Areas to Improve',
                val: '3',
                sub: 'View details →',
                subColor: 'text-brand-600 cursor-pointer',
              },
              {
                icon: <Briefcase size={16} className="text-blue-600" />,
                bg: 'bg-blue-50 border-blue-200',
                label: 'Interviews Scheduled',
                val: '2',
                sub: 'Upcoming',
                subColor: 'text-purple-600',
              },
            ].map((st, idx) => (
              <Card key={idx} className="rounded-2xl border border-line bg-surface p-4 shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <div className={cn('flex h-8 w-8 items-center justify-center rounded-xl border shadow-2xs', st.bg)}>
                    {st.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{st.label}</span>
                </div>
                <div className="pt-1">
                  <span className="font-display text-2xl font-black text-ink">{st.val}</span>
                  <p className={cn('text-[11px] font-bold mt-0.5', st.subColor)}>{st.sub}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Grid: Left 8 cols + Right 4 cols */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Recommended for You */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-sm font-bold text-ink">Recommended for You</h2>
                    <p className="text-xs text-ink-muted">Personalized mock interviews based on your target role and progress.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTabChange('Mock Interviews')}
                    className="text-xs font-bold text-brand-600 hover:underline"
                  >
                    View all recommendations &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 1,
                      badge: 'Best Match',
                      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      title: 'Full Stack Developer',
                      meta: '60 min • 5 Rounds • Intermediate',
                      desc: 'Covers DSA, System Design, Frontend, Backend and behavioral rounds.',
                    },
                    {
                      id: 2,
                      badge: 'Improve System Design',
                      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
                      title: 'System Design Interview',
                      meta: '45 min • 3 Rounds • Intermediate',
                      desc: 'Practice designing scalable systems and explaining your approach.',
                    },
                    {
                      id: 3,
                      badge: 'Behavioral Focus',
                      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
                      title: 'Behavioral Interview',
                      meta: '30 min • 2 Rounds • Beginner',
                      desc: 'Common HR questions, STAR method and situational scenarios.',
                    },
                  ].map((rec) => (
                    <Card
                      key={rec.id}
                      className="rounded-2xl border border-line bg-surface p-4 shadow-xs flex flex-col justify-between hover:border-brand-200 transition-all group"
                    >
                      <div className="space-y-2">
                        <span className={cn('inline-block text-[9px] font-bold px-2 py-0.5 rounded border', rec.badgeColor)}>
                          {rec.badge}
                        </span>

                        <h3 className="font-display text-xs font-bold text-ink group-hover:text-brand-600 transition-colors">
                          {rec.title}
                        </h3>

                        <p className="text-[10px] text-ink-muted font-medium">{rec.meta}</p>

                        <p className="text-[11px] text-ink-muted leading-relaxed pt-1">
                          {rec.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => showToast(`Starting ${rec.title}...`)}
                          className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold h-8 py-0"
                        >
                          Start Mock Interview
                        </Button>
                        <button
                          type="button"
                          onClick={() => showToast(`Bookmarked ${rec.title}`)}
                          className="p-1.5 rounded-lg border border-line hover:bg-slate-50 text-slate-400 hover:text-brand-600"
                        >
                          <Bookmark size={15} />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Mock Interviews */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-sm font-bold text-ink">Recent Mock Interviews</h2>
                  <button
                    type="button"
                    onClick={() => handleTabChange('Interview History')}
                    className="text-xs font-bold text-brand-600 hover:underline"
                  >
                    View all history &rarr;
                  </button>
                </div>

                <Card className="rounded-2xl border border-line bg-surface shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-line bg-slate-50/70 text-[11px] font-semibold text-ink-muted">
                          <th className="py-3 px-4">Role</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4 text-center">Score</th>
                          <th className="py-3 px-4">Duration</th>
                          <th className="py-3 px-4">Feedback</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line/60">
                        {[
                          {
                            role: 'Full Stack Developer',
                            icon: <span className="font-bold text-[10px] text-amber-600">JS</span>,
                            iconBg: 'bg-amber-100',
                            date: 'May 18, 2026',
                            score: 82,
                            scoreColor: 'text-emerald-500',
                            duration: '58 min',
                            feedback: 'Good',
                            feedbackBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                          },
                          {
                            role: 'System Design Interview',
                            icon: <Server size={13} className="text-purple-600" />,
                            iconBg: 'bg-purple-50',
                            date: 'May 14, 2026',
                            score: 74,
                            scoreColor: 'text-blue-500',
                            duration: '45 min',
                            feedback: 'Average',
                            feedbackBg: 'bg-amber-50 text-amber-700 border-amber-200',
                          },
                          {
                            role: 'Frontend Developer',
                            icon: <Code2 size={13} className="text-cyan-600" />,
                            iconBg: 'bg-cyan-50',
                            date: 'May 10, 2026',
                            score: 69,
                            scoreColor: 'text-amber-500',
                            duration: '50 min',
                            feedback: 'Average',
                            feedbackBg: 'bg-amber-50 text-amber-700 border-amber-200',
                          },
                          {
                            role: 'Behavioral Interview',
                            icon: <User size={13} className="text-blue-600" />,
                            iconBg: 'bg-blue-50',
                            date: 'May 07, 2026',
                            score: 90,
                            scoreColor: 'text-emerald-500',
                            duration: '28 min',
                            feedback: 'Excellent',
                            feedbackBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                          },
                          {
                            role: 'Backend Developer',
                            icon: <Database size={13} className="text-emerald-600" />,
                            iconBg: 'bg-emerald-50',
                            date: 'May 03, 2026',
                            score: 65,
                            scoreColor: 'text-amber-500',
                            duration: '55 min',
                            feedback: 'Needs Work',
                            feedbackBg: 'bg-orange-50 text-orange-700 border-orange-200',
                          },
                        ].map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg shadow-2xs', item.iconBg)}>
                                  {item.icon}
                                </div>
                                <span className="font-bold text-ink">{item.role}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-ink-muted">{item.date}</td>
                            <td className="py-3 px-4 text-center">
                              <span className="font-bold text-ink">{item.score}%</span>
                            </td>
                            <td className="py-3 px-4 text-ink-muted">{item.duration}</td>
                            <td className="py-3 px-4">
                              <span className={cn('rounded px-2 py-0.5 text-[10px] font-bold border', item.feedbackBg)}>
                                {item.feedback}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => showToast(`Opening AI Feedback for ${item.role}...`)}
                                  className="p-1 rounded text-slate-400 hover:text-brand-600 hover:bg-slate-100"
                                >
                                  <MessageSquare size={14} />
                                </button>
                                <button type="button" className="p-1 rounded text-slate-400 hover:text-ink hover:bg-slate-100">
                                  <MoreVertical size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3 text-center border-t border-line/60">
                    <button
                      type="button"
                      onClick={() => handleTabChange('Interview History')}
                      className="text-xs font-bold text-brand-600 hover:underline"
                    >
                      View all interview history &rarr;
                    </button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Rail (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Interview Readiness Score */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-xs font-bold text-ink">Interview Readiness Score</h3>
                    <ShieldCheck size={14} className="text-slate-400" />
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Opening readiness analytics...')}
                    className="text-[11px] font-bold text-brand-600 hover:underline"
                  >
                    View details &rarr;
                  </button>
                </div>

                <div className="flex items-center gap-4 pt-1">
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
                        strokeDasharray="78, 100"
                        strokeLinecap="round"
                        strokeWidth="3.2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-display text-base font-black text-ink">78%</span>
                      <span className="text-[8px] font-bold text-emerald-600">Good</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-600">↑ 8% improvement this month</span>
                    <p className="text-[11px] text-ink-muted leading-relaxed">
                      Keep practicing! Focus on System Design and SQL to reach the next level.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Upcoming Interviews */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xs font-bold text-ink">Upcoming Interviews</h3>
                  <button
                    type="button"
                    onClick={() => showToast('Opening interview calendar...')}
                    className="text-[11px] font-bold text-brand-600 hover:underline"
                  >
                    View all &rarr;
                  </button>
                </div>

                <div className="space-y-2.5 pt-1">
                  {[
                    {
                      day: '22',
                      mon: 'MAY',
                      title: 'Mock Interview Marathon',
                      sub: 'Full Stack Developer',
                      time: 'May 22, 2026 • 7:00 PM IST',
                      status: 'Confirmed',
                    },
                    {
                      day: '29',
                      mon: 'MAY',
                      title: 'System Design Mock',
                      sub: 'System Design Interview',
                      time: 'May 29, 2026 • 6:00 PM IST',
                      status: 'Confirmed',
                    },
                  ].map((ev, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-line/80 bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-white border border-slate-200 text-center shadow-2xs">
                          <span className="font-display text-xs font-black text-ink">{ev.day}</span>
                          <span className="text-[8px] font-bold text-purple-600">{ev.mon}</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-ink">{ev.title}</p>
                          <p className="text-[10px] text-ink-muted">{ev.time}</p>
                        </div>
                      </div>
                      <span className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5">
                        {ev.status}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Syncing with calendar...')}
                  className="w-full text-xs font-bold border-slate-300"
                  leadingIcon={<Calendar size={13} />}
                >
                  Add to Calendar
                </Button>
              </Card>

              {/* Recommended Practice */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xs font-bold text-ink">Recommended Practice</h3>
                  <button
                    type="button"
                    onClick={() => handleTabChange('Question Bank')}
                    className="text-[11px] font-bold text-brand-600 hover:underline"
                  >
                    View all &rarr;
                  </button>
                </div>

                <div className="space-y-3 pt-1 text-xs">
                  {[
                    { title: 'Top 50 SQL Questions', count: '20 Questions', pct: 60, icon: <Database size={14} className="text-emerald-600" /> },
                    { title: 'System Design Case Studies', count: '8 Case Studies', pct: 40, icon: <Layers size={14} className="text-purple-600" /> },
                    { title: 'Behavioral Question Bank', count: '100+ Questions', pct: 70, icon: <User size={14} className="text-blue-600" /> },
                  ].map((prac, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {prac.icon}
                          <span className="font-semibold text-slate-700">{prac.title}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => showToast(`Starting ${prac.title}...`)}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white transition-colors"
                        >
                          <Play size={10} className="fill-current ml-0.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-ink-muted">
                        <span>{prac.count}</span>
                        <span className="font-bold text-ink">{prac.pct}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-600 rounded-full" style={{ width: `${prac.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Get Expert Feedback */}
              <Card className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/40 p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="font-display text-xs font-bold text-ink">Get Expert Feedback</h4>
                    <p className="text-[11px] text-ink-muted leading-relaxed">
                      Book a 1:1 mock interview with experts from top tech companies.
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 border border-purple-200 shadow-2xs">
                    <Users size={20} />
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => showToast('Opening mentor mock interview booking...')}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold"
                >
                  Book Now
                </Button>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: MOCK INTERVIEWS (Matches media_1788780706807.png)  */}
      {/* ========================================================= */}
      {activeTab === 'Mock Interviews' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative flex-1 w-full">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={mockSearch}
                  onChange={(e) => setMockSearch(e.target.value)}
                  placeholder="Search mocks..."
                  className="w-full rounded-xl border border-line bg-surface pl-9 pr-4 py-2 text-xs text-ink placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={mockRoleFilter}
                  onChange={(e) => setMockRoleFilter(e.target.value)}
                  className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="All Roles">All Roles</option>
                  <option value="Full Stack Developer">Full Stack</option>
                  <option value="Frontend Developer">Frontend</option>
                  <option value="Backend Developer">Backend</option>
                </select>

                <select
                  value={mockDifficultyFilter}
                  onChange={(e) => setMockDifficultyFilter(e.target.value)}
                  className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="All Difficulty">All Difficulty</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                <select
                  value={mockStatusFilter}
                  onChange={(e) => setMockStatusFilter(e.target.value)}
                  className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="All Status">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Review Pending">Review Pending</option>
                </select>

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => showToast('Opening filters drawer...')}
                  className="rounded-xl text-xs font-semibold text-slate-700 border-line hover:bg-slate-50"
                  leadingIcon={<Filter size={13} />}
                >
                  Filters
                </Button>
              </div>
            </div>

            {/* How Mock Interviews Work */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
              <h3 className="font-display text-xs font-bold text-ink">How Mock Interviews Work</h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center sm:text-left">
                {[
                  {
                    step: '1',
                    title: 'Choose a role',
                    desc: 'Select the role and difficulty level',
                    icon: <Calendar size={16} className="text-blue-600" />,
                    bg: 'bg-blue-50 border-blue-200',
                  },
                  {
                    step: '2',
                    title: 'Join the interview',
                    desc: 'Answer questions in a realistic environment',
                    icon: <Video size={16} className="text-purple-600" />,
                    bg: 'bg-purple-50 border-purple-200',
                  },
                  {
                    step: '3',
                    title: 'Get AI feedback',
                    desc: 'Receive detailed feedback and improvement tips',
                    icon: <Sparkles size={16} className="text-amber-600" />,
                    bg: 'bg-amber-50 border-amber-200',
                  },
                  {
                    step: '4',
                    title: 'Track & improve',
                    desc: 'Monitor your progress and grow',
                    icon: <BarChart3 size={16} className="text-emerald-600" />,
                    bg: 'bg-emerald-50 border-emerald-200',
                  },
                ].map((st, idx) => (
                  <div key={idx} className="relative flex flex-col justify-between p-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={cn('flex h-8 w-8 items-center justify-center rounded-xl border shadow-2xs', st.bg)}>
                          {st.icon}
                        </div>
                        <span className="font-display text-xs font-black text-slate-400">{st.step}</span>
                      </div>
                      <div>
                        <h4 className="font-display text-xs font-bold text-ink">{st.title}</h4>
                        <p className="text-[11px] text-ink-muted leading-tight mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Mock Interviews List */}
            <div className="space-y-3">
              <h3 className="font-display text-xs font-bold text-ink">Mock Interviews</h3>

              {[
                {
                  id: 1,
                  role: 'Full Stack Developer',
                  badge: 'Latest',
                  icon: <span className="font-bold text-xs text-amber-600">JS</span>,
                  iconBg: 'bg-amber-100 border-amber-300',
                  exp: '2-4 Years',
                  diff: 'Intermediate',
                  tags: ['DSA', 'System Design', 'Behavioral', '+2'],
                  date: 'May 18, 2026 • 10:00 AM',
                  score: 82,
                  scoreLabel: 'Good',
                  scoreColor: 'text-emerald-600',
                  ringColor: 'text-emerald-500',
                  duration: '58 min',
                  status: 'Completed',
                  statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                },
                {
                  id: 2,
                  role: 'Frontend Developer',
                  icon: <Code2 size={16} className="text-cyan-600" />,
                  iconBg: 'bg-cyan-50 border-cyan-200',
                  exp: '1-3 Years',
                  diff: 'Beginner',
                  tags: ['HTML/CSS', 'JavaScript', 'React', '+2'],
                  date: 'May 14, 2026 • 04:30 PM',
                  score: 74,
                  scoreLabel: 'Average',
                  scoreColor: 'text-blue-600',
                  ringColor: 'text-blue-500',
                  duration: '45 min',
                  status: 'Completed',
                  statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                },
                {
                  id: 3,
                  role: 'System Design Interview',
                  icon: <Server size={16} className="text-purple-600" />,
                  iconBg: 'bg-purple-50 border-purple-200',
                  exp: '3-6 Years',
                  diff: 'Advanced',
                  tags: ['Scalability', 'Low Level Design', 'HLD/LLD', '+1'],
                  date: 'May 10, 2026 • 11:00 AM',
                  score: 69,
                  scoreLabel: 'Average',
                  scoreColor: 'text-amber-600',
                  ringColor: 'text-amber-500',
                  duration: '50 min',
                  status: 'Completed',
                  statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                },
                {
                  id: 4,
                  role: 'Behavioral Interview',
                  icon: <User size={16} className="text-indigo-600" />,
                  iconBg: 'bg-indigo-50 border-indigo-200',
                  exp: 'Any',
                  diff: 'Beginner',
                  tags: ['HR Questions', 'STAR Method', 'Personality'],
                  date: 'May 07, 2026 • 03:00 PM',
                  score: 90,
                  scoreLabel: 'Excellent',
                  scoreColor: 'text-emerald-600',
                  ringColor: 'text-emerald-500',
                  duration: '28 min',
                  status: 'Completed',
                  statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                },
                {
                  id: 5,
                  role: 'Backend Developer',
                  icon: <Database size={16} className="text-emerald-600" />,
                  iconBg: 'bg-emerald-50 border-emerald-200',
                  exp: '2-4 Years',
                  diff: 'Intermediate',
                  tags: ['SQL', 'API Design', 'Node.js', '+2'],
                  date: 'May 03, 2026 • 02:00 PM',
                  score: 65,
                  scoreLabel: 'Needs Work',
                  scoreColor: 'text-orange-600',
                  ringColor: 'text-orange-500',
                  duration: '55 min',
                  status: 'Review Pending',
                  statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
                },
              ].map((mock) => (
                <Card
                  key={mock.id}
                  className="rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-xs hover:border-brand-200 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-2xs', mock.iconBg)}>
                        {mock.icon}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-display text-xs sm:text-sm font-bold text-ink">
                            {mock.role}
                          </h4>
                          {mock.badge && (
                            <span className="rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold px-2 py-0.5">
                              {mock.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-ink-muted">
                          Experience: {mock.exp} &bull; Difficulty: {mock.diff}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {mock.tags.map((tg, idx) => (
                            <span
                              key={idx}
                              className="rounded-md px-2 py-0.5 text-[10px] font-semibold bg-slate-50 text-slate-600 border border-line/70"
                            >
                              {tg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-line/60">
                      {/* Date & Time */}
                      <div className="text-right hidden md:block">
                        <p className="text-xs font-bold text-ink">{mock.date.split(' • ')[0]}</p>
                        <p className="text-[10px] text-ink-muted">{mock.date.split(' • ')[1]}</p>
                      </div>

                      {/* Donut Score */}
                      <div className="flex items-center gap-2">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                            <path
                              className="text-slate-100"
                              strokeWidth="3.2"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className={mock.ringColor}
                              strokeDasharray={`${mock.score}, 100`}
                              strokeLinecap="round"
                              strokeWidth="3.2"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="font-display text-[10px] font-black text-ink">{mock.score}%</span>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className={cn('text-[11px] font-bold', mock.scoreColor)}>{mock.scoreLabel}</p>
                          <span className="text-[10px] text-ink-muted">{mock.duration}</span>
                        </div>
                      </div>

                      {/* Status Badge & Menu */}
                      <div className="flex items-center gap-2">
                        <span className={cn('rounded-md px-2.5 py-1 text-[10px] font-bold border', mock.statusColor)}>
                          {mock.status}
                        </span>
                        <button type="button" className="p-1 rounded text-slate-400 hover:text-ink">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-ink-muted">
              <span>Showing 1 to 5 of 12 mock interviews</span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="p-1.5 rounded-lg border border-line bg-surface text-slate-400 hover:bg-slate-50 disabled:opacity-40"
                  disabled
                >
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="h-7 w-7 rounded-lg bg-brand-600 text-white font-bold text-xs">
                  1
                </button>
                <button type="button" className="h-7 w-7 rounded-lg border border-line bg-surface text-ink font-semibold text-xs hover:bg-slate-50">
                  2
                </button>
                <button type="button" className="h-7 w-7 rounded-lg border border-line bg-surface text-ink font-semibold text-xs hover:bg-slate-50">
                  3
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button type="button" className="h-7 w-7 rounded-lg border border-line bg-surface text-ink font-semibold text-xs hover:bg-slate-50">
                  8
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-lg border border-line bg-surface text-ink hover:bg-slate-50"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Aside (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Your Interview Performance */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Your Interview Performance</h3>
                <button
                  type="button"
                  onClick={() => showToast('Opening interview performance report...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View analytics &rarr;
                </button>
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
                      strokeDasharray="76, 100"
                      strokeLinecap="round"
                      strokeWidth="3.2"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-display text-base font-black text-ink">76%</span>
                    <span className="text-[8px] font-bold text-purple-600">Overall Score</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-slate-700">Strong (8)</span>
                    </div>
                    <span className="font-bold text-ink">33%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-slate-700">Average (12)</span>
                    </div>
                    <span className="font-bold text-ink">50%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      <span className="text-slate-700">Needs Work (3)</span>
                    </div>
                    <span className="font-bold text-ink">13%</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-rose-500" />
                      <span className="text-slate-700">Poor (1)</span>
                    </div>
                    <span className="font-bold text-ink">4%</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] font-bold text-emerald-600 pt-2 border-t border-line/60">
                ↑ 10% improvement this month
              </p>
            </Card>

            {/* Performance Trend */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Performance Trend</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing performance trend report...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View report &rarr;
                </button>
              </div>

              <div className="h-32 w-full pt-1">
                <svg className="h-full w-full overflow-visible" viewBox="0 0 280 90">
                  <line x1="0" y1="20" x2="280" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="50" x2="280" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="80" x2="280" y2="80" stroke="#f1f5f9" strokeWidth="1" />

                  <path
                    d="M 10 75 Q 70 68 135 52 T 210 38 T 270 18"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="75" r="3.5" fill="#7c3aed" />
                  <circle cx="70" cy="68" r="3.5" fill="#7c3aed" />
                  <circle cx="135" cy="52" r="3.5" fill="#7c3aed" />
                  <circle cx="210" cy="38" r="3.5" fill="#7c3aed" />
                  <circle cx="270" cy="18" r="3.5" fill="#7c3aed" />
                </svg>
                <div className="flex justify-between text-[10px] text-ink-muted pt-1">
                  <span>Jan '26</span>
                  <span>Feb '26</span>
                  <span>Mar '26</span>
                  <span>Apr '26</span>
                  <span>May '26</span>
                </div>
              </div>
            </Card>

            {/* Top Strengths */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Top Strengths</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing all strengths...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View all &rarr;
                </button>
              </div>

              <div className="space-y-2.5 pt-1 text-xs">
                {[
                  { name: 'Communication', pct: 85 },
                  { name: 'Problem Solving', pct: 80 },
                  { name: 'System Design', pct: 75 },
                ].map((st, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-500" />
                        <span className="font-semibold text-slate-700">{st.name}</span>
                      </div>
                      <span className="font-bold text-ink">{st.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: `${st.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Areas to Improve */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Areas to Improve</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing all improvement areas...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View all &rarr;
                </button>
              </div>

              <div className="space-y-2.5 pt-1 text-xs">
                {[
                  { name: 'Advanced Algorithms', pct: 55 },
                  { name: 'Low Level Design', pct: 60 },
                  { name: 'Behavioral (STAR)', pct: 65 },
                ].map((ar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <AlertCircle size={13} className="text-amber-500" />
                        <span className="font-semibold text-slate-700">{ar.name}</span>
                      </div>
                      <span className="font-bold text-ink">{ar.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${ar.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Need Help Preparing */}
            <Card className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/40 p-5 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-display text-xs font-bold text-ink">Need help preparing for interviews?</h4>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    Get curated resources and expert guidance.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 border border-purple-200 shadow-2xs">
                  <Video size={20} />
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Opening interview prep resources...')}
                className="w-full text-xs font-bold border-purple-200 hover:bg-purple-50"
              >
                Explore Resources
              </Button>
            </Card>
          </aside>
        </div>
      )}

      {/* Fallback for other tabs */}
      {activeTab !== 'Overview' && activeTab !== 'Mock Interviews' && (
        <Card className="rounded-2xl border border-line bg-surface p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
            <Mic size={28} />
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-ink">{activeTab}</h3>
          <p className="mt-1 text-xs text-ink-muted max-w-sm mx-auto">
            Review your {activeTab.toLowerCase()} content, questions, and evaluations.
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

