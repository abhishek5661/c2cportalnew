import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Eye,
  FileCheck,
  FileCode,
  FileText,
  GraduationCap,
  Layers,
  MessageSquare,
  Mic,
  Network,
  Plus,
  Search,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'

export function ProfessionalPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Overview')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === 'Resume & Portfolio') {
      navigate('/career')
    } else if (tab === 'Career Growth') {
      navigate('/career-growth')
    } else if (tab === 'Communication') {
      navigate('/mentor')
    } else if (tab === 'Interviews') {
      navigate('/career?tab=interviews')
    }
  }

  const tabs = [
    'Overview',
    'Communication',
    'Interviews',
    'Resume & Portfolio',
    'Career Growth',
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
        <Link
          to="/dashboard"
          className="flex items-center gap-1 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Professional</span>
        </Link>
      </nav>

      {/* Header Card */}
      <Card className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 shadow-2xs">
              <Briefcase size={28} className="stroke-[2.2]" />
            </div>
            <div className="space-y-1.5">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Professional
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted max-w-xl leading-relaxed">
                Sharpen your professional skills and advance your career.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Row */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4">
          {tabs.map((tab) => (
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

      {/* 5 Stat Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          {
            icon: <Users size={16} className="text-blue-600" />,
            bg: 'bg-blue-50 border-blue-200',
            label: 'Skills Added',
            val: '24',
            sub: '↑ 6 this month',
            subColor: 'text-emerald-600',
          },
          {
            icon: <Shield size={16} className="text-purple-600" />,
            bg: 'bg-purple-50 border-purple-200',
            label: 'Certifications',
            val: '8',
            sub: '↑ 2 this month',
            subColor: 'text-emerald-600',
          },
          {
            icon: <MessageSquare size={16} className="text-purple-600" />,
            bg: 'bg-purple-50 border-purple-200',
            label: 'Mock Interviews',
            val: '12',
            sub: '↑ 3 this month',
            subColor: 'text-emerald-600',
          },
          {
            icon: <Target size={16} className="text-purple-600" />,
            bg: 'bg-purple-50 border-purple-200',
            label: 'Career Goals',
            val: '3',
            sub: 'In Progress',
            subColor: 'text-purple-600',
          },
          {
            icon: <Briefcase size={16} className="text-blue-600" />,
            bg: 'bg-blue-50 border-blue-200',
            label: 'Applications',
            val: '17',
            sub: '↑ 5 this month',
            subColor: 'text-emerald-600',
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

      {/* Main Grid: 8 Cols Left + 4 Cols Right */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Continue Your Professional Journey */}
          <div className="space-y-3">
            <h2 className="font-display text-sm font-bold text-ink">
              Continue Your Professional Journey
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Card 1: Improve Communication Skills */}
              <Card className="rounded-2xl border border-line bg-surface p-4 shadow-xs flex flex-col justify-between hover:border-brand-200 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold px-2 py-0.5">
                      In Progress
                    </span>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
                    <MessageSquare size={18} />
                  </div>

                  <div>
                    <h3 className="font-display text-xs font-bold text-ink leading-snug">
                      Improve Communication Skills
                    </h3>
                    <p className="mt-1 text-[11px] font-bold text-purple-600">75% Complete</p>
                    <div className="mt-1.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    Enhance your verbal and written communication for professional success.
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-line/50">
                  <button
                    type="button"
                    onClick={() => navigate('/mentor')}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:underline"
                  >
                    Continue Learning &rarr;
                  </button>
                </div>
              </Card>

              {/* Card 2: System Design Basics */}
              <Card className="rounded-2xl border border-line bg-surface p-4 shadow-xs flex flex-col justify-between hover:border-brand-200 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5">
                      Recommended
                    </span>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                    <Network size={18} />
                  </div>

                  <div>
                    <h3 className="font-display text-xs font-bold text-ink leading-snug">
                      System Design Basics
                    </h3>
                    <p className="mt-1 text-[11px] font-bold text-purple-600">40% Complete</p>
                    <div className="mt-1.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>

                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    Learn fundamental concepts of system design and architecture.
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-line/50">
                  <button
                    type="button"
                    onClick={() => navigate('/master/dsa')}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:underline"
                  >
                    Continue Learning &rarr;
                  </button>
                </div>
              </Card>

              {/* Card 3: Crack Technical Interviews */}
              <Card className="rounded-2xl border border-line bg-surface p-4 shadow-xs flex flex-col justify-between hover:border-brand-200 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-bold px-2 py-0.5">
                      Next Step
                    </span>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
                    <Star size={18} />
                  </div>

                  <div>
                    <h3 className="font-display text-xs font-bold text-ink leading-snug">
                      Crack Technical Interviews
                    </h3>
                    <p className="mt-1 text-[11px] font-bold text-purple-600">20% Complete</p>
                    <div className="mt-1.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>

                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    Practice DSA, coding and problem solving to ace interviews.
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-line/50">
                  <button
                    type="button"
                    onClick={() => navigate('/career?tab=interviews')}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:underline"
                  >
                    Continue Learning &rarr;
                  </button>
                </div>
              </Card>

              {/* Card 4: Explore More */}
              <Card className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4 shadow-xs flex flex-col justify-between items-center text-center hover:bg-slate-100 transition-all">
                <div className="space-y-3 pt-4">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-600 border border-slate-200 shadow-2xs">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-xs font-bold text-ink">Explore More</h3>
                    <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                      Discover more professional courses and resources.
                    </p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => showToast('Opening course catalog...')}
                  className="w-full mt-4 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold"
                >
                  Explore Now
                </Button>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-bold text-ink">Recent Activity</h2>
              <button
                type="button"
                onClick={() => showToast('Viewing full activity log...')}
                className="text-xs font-bold text-brand-600 hover:underline"
              >
                View all activity &rarr;
              </button>
            </div>

            <Card className="rounded-2xl border border-line bg-surface p-2 shadow-xs divide-y divide-line/60">
              {[
                {
                  icon: <MessageSquare size={16} className="text-purple-600" />,
                  bg: 'bg-purple-50 border-purple-200',
                  title: 'Completed mock interview: Frontend Developer',
                  sub: 'Score: 82%',
                  time: '2 days ago',
                },
                {
                  icon: <ShieldCheck size={16} className="text-blue-600" />,
                  bg: 'bg-blue-50 border-blue-200',
                  title: 'Earned certification: AWS Cloud Practitioner',
                  sub: 'Amazon Web Services',
                  time: '5 days ago',
                },
                {
                  icon: <Award size={16} className="text-amber-600" />,
                  bg: 'bg-amber-50 border-amber-200',
                  title: 'Added new skill: System Design',
                  sub: 'Verified via practice assessments',
                  time: '1 week ago',
                },
                {
                  icon: <FileText size={16} className="text-emerald-600" />,
                  bg: 'bg-emerald-50 border-emerald-200',
                  title: 'Updated resume',
                  sub: 'Version 2.4 created',
                  time: '2 weeks ago',
                },
                {
                  icon: <Briefcase size={16} className="text-indigo-600" />,
                  bg: 'bg-indigo-50 border-indigo-200',
                  title: 'Applied to Software Engineer at Microsoft',
                  sub: 'Application ID: MS-2026-8941',
                  time: '2 weeks ago',
                },
              ].map((act, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 sm:p-3.5 hover:bg-slate-50/60 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-2xs', act.bg)}>
                      {act.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink">{act.title}</p>
                      <p className="text-[11px] text-ink-muted">{act.sub}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-ink-muted whitespace-nowrap pl-2">
                    {act.time}
                  </span>
                </div>
              ))}
            </Card>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Professional Profile Completeness */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xs font-bold text-ink">Professional Profile</h3>
              <button
                type="button"
                onClick={() => showToast('Opening professional profile...')}
                className="text-[11px] font-bold text-brand-600 hover:underline"
              >
                View profile &rarr;
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
                  <span className="text-[8px] font-bold text-purple-600">Completeness</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check size={12} className="text-emerald-500 stroke-[3]" />
                  <span>Basic Information</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check size={12} className="text-emerald-500 stroke-[3]" />
                  <span>Skills (24/30)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check size={12} className="text-emerald-500 stroke-[3]" />
                  <span>Experience (2/5)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Check size={12} className="text-emerald-500 stroke-[3]" />
                  <span>Resume</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <div className="h-2 w-2 rounded-full bg-slate-300 ml-0.5 mr-0.5" />
                  <span>Portfolio</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <h3 className="font-display text-xs font-bold text-ink">Quick Actions</h3>

            <div className="space-y-1 divide-y divide-line/60 text-xs">
              {[
                { label: 'Take Mock Interview', action: () => navigate('/career?tab=interviews') },
                { label: 'Build Resume', action: () => navigate('/career') },
                { label: 'Add Skill', action: () => showToast('Add skill modal opened') },
                { label: 'Explore Courses', action: () => navigate('/master') },
                { label: 'Track Applications', action: () => showToast('Application tracker opened') },
              ].map((qa, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={qa.action}
                  className="w-full flex items-center justify-between py-2 text-slate-700 hover:text-brand-600 transition-colors text-left"
                >
                  <span className="font-semibold">{qa.label}</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </button>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xs font-bold text-ink">Upcoming Events</h3>
              <button
                type="button"
                onClick={() => showToast('Viewing full events calendar...')}
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
                  time: 'May 22, 2026 • 7:00 PM IST',
                },
                {
                  day: '29',
                  mon: 'MAY',
                  title: 'Resume Review Session',
                  time: 'May 29, 2026 • 6:00 PM IST',
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
                    Upcoming
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Skills */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xs font-bold text-ink">Top Skills</h3>
              <button
                type="button"
                onClick={() => showToast('Viewing all skills...')}
                className="text-[11px] font-bold text-brand-600 hover:underline"
              >
                View all &rarr;
              </button>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              {[
                { name: 'JavaScript', pct: 85 },
                { name: 'System Design', pct: 70 },
                { name: 'Python', pct: 68 },
                { name: 'Problem Solving', pct: 65 },
                { name: 'Communication', pct: 60 },
              ].map((sk, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">{sk.name}</span>
                    <span className="font-bold text-ink">{sk.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-600 rounded-full" style={{ width: `${sk.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xs font-bold text-ink">Achievements</h3>
              <button
                type="button"
                onClick={() => showToast('Viewing all achievement badges...')}
                className="text-[11px] font-bold text-brand-600 hover:underline"
              >
                View all &rarr;
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1 text-center">
              {[
                { name: 'Mock Interview Expert', icon: <ShieldCheck size={18} className="text-blue-600" />, bg: 'bg-blue-50 border-blue-200' },
                { name: 'Active Learner', icon: <Star size={18} className="text-amber-600" />, bg: 'bg-amber-50 border-amber-200' },
                { name: 'Early Applicant', icon: <Award size={18} className="text-indigo-600" />, bg: 'bg-indigo-50 border-indigo-200' },
                { name: 'Problem Solver Badge', icon: <Shield size={18} className="text-cyan-600" />, bg: 'bg-cyan-50 border-cyan-200' },
              ].map((ach, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl border shadow-2xs mb-1.5', ach.bg)}>
                    {ach.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 leading-tight line-clamp-2">
                    {ach.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

