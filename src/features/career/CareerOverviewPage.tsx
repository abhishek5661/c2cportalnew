import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart2,
  BarChart3,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Flame,
  Globe,
  GraduationCap,
  Layers,
  Lightbulb,
  MapPin,
  MessageSquare,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Settings,
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

export function CareerOverviewPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>('Overview')
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({})

  const toggleSave = (id: string) => {
    setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const tabs = [
    'Overview',
    'Experience',
    'Education',
    'Certifications',
    'Achievements',
    'Goals & Plans',
  ]

  const strengths = [
    { name: 'Problem Solving', pct: 90, icon: <Settings size={14} className="text-purple-600" /> },
    { name: 'System Design', pct: 85, icon: <Shield size={14} className="text-purple-600" /> },
    { name: 'Communication', pct: 80, icon: <MessageSquare size={14} className="text-purple-600" /> },
    { name: 'Leadership', pct: 75, icon: <Award size={14} className="text-purple-600" /> },
    { name: 'Team Collaboration', pct: 70, icon: <Users size={14} className="text-purple-600" /> },
  ]

  return (
    <div className="space-y-6 pb-16">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Professional</span>
        </button>
        <span>&gt;</span>
        <span className="text-brand-600">Career</span>
        <span>&gt;</span>
        <span className="text-ink font-bold">Overview</span>
      </div>

      {/* Header Banner */}
      <Card className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
              <Briefcase size={24} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
                Career Overview
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                Track your career journey and growth.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-slate-200 bg-white text-xs font-bold text-ink hover:bg-slate-50"
              onClick={() => navigate('/settings')}
            >
              <Pencil size={14} className="mr-1.5 text-purple-600" />
              Update Profile
            </Button>
            <Button
              size="sm"
              className="rounded-xl bg-brand-600 text-xs font-bold text-white shadow-sm hover:bg-brand-700"
              onClick={() => setActiveTab('Experience')}
            >
              <Plus size={14} className="mr-1" />
              Add Experience
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-1 border-b border-line pt-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative px-4 py-2 text-xs font-bold transition-all rounded-t-lg',
                activeTab === tab
                  ? 'text-brand-600 font-extrabold bg-brand-50/50'
                  : 'text-ink-muted hover:text-ink hover:bg-slate-50'
              )}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Main Grid: Left content (8 cols) + Right rail (4 cols) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols) */}
        <div className="space-y-6 lg:col-span-8">
          {/* Career Snapshot Section */}
          <div className="space-y-3">
            <h2 className="font-display text-sm font-bold text-ink">Career Snapshot</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* 1. Years of Experience */}
              <Card className="p-4 rounded-2xl border border-line bg-surface flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-600 border border-purple-200">
                  <Briefcase size={18} />
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold text-ink">3.2</div>
                  <div className="text-[11px] text-ink-muted leading-tight">Years of Experience</div>
                </div>
              </Card>

              {/* 2. Companies */}
              <Card className="p-4 rounded-2xl border border-line bg-surface flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                  <Building2 size={18} />
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold text-ink">2</div>
                  <div className="text-[11px] text-ink-muted leading-tight">Companies</div>
                </div>
              </Card>

              {/* 3. Key Achievements */}
              <Card className="p-4 rounded-2xl border border-line bg-surface flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <Award size={18} />
                </div>
                <div>
                  <div className="font-display text-xl font-extrabold text-ink">5</div>
                  <div className="text-[11px] text-ink-muted leading-tight">Key Achievements</div>
                </div>
              </Card>

              {/* 4. Career Growth Score */}
              <Card className="p-4 rounded-2xl border border-line bg-surface flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-display text-xl font-extrabold text-ink">86%</span>
                    <span className="text-[10px] text-ink-muted cursor-pointer" title="Calculated from skill milestones, project impact and tenure">ⓘ</span>
                  </div>
                  <div className="text-[11px] text-ink-muted leading-tight">Career Growth Score</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-bold text-ink">Work Experience</h2>
              <button
                type="button"
                onClick={() => setActiveTab('Experience')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                View all experience <ArrowRight size={13} />
              </button>
            </div>

            {/* Experience Card 1: Microsoft */}
            <Card className="p-5 rounded-2xl border border-line bg-surface space-y-4 shadow-sm hover:border-slate-300 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  {/* Microsoft 4-color Logo */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-xs p-2">
                    <div className="grid grid-cols-2 gap-1 w-6 h-6">
                      <div className="bg-[#F25022] rounded-xs" />
                      <div className="bg-[#7FBA00] rounded-xs" />
                      <div className="bg-[#00A4EF] rounded-xs" />
                      <div className="bg-[#FFB900] rounded-xs" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-sm font-bold text-ink">Software Engineer II</h3>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        Current
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-brand-600 hover:underline cursor-pointer">
                      Microsoft
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-ink-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> Jan 2023 – Present
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> Bangalore, India
                      </span>
                    </div>
                  </div>
                </div>

                <button type="button" className="text-ink-muted hover:text-ink p-1">
                  <MoreVertical size={16} />
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Working on cloud-scale applications and developer tools used by millions of customers worldwide.
              </p>

              <ul className="space-y-1.5 text-xs text-ink/80">
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span>Designed and developed scalable microservices using .NET and Azure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span>Improved system performance by 30% through caching and optimization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span>Collaborated with cross-functional teams to deliver impactful features.</span>
                </li>
              </ul>
            </Card>

            {/* Experience Card 2: Tata Consultancy Services */}
            <Card className="p-5 rounded-2xl border border-line bg-surface space-y-4 shadow-sm hover:border-slate-300 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  {/* TCS Logo */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 shadow-xs text-white font-black text-xs">
                    tcs
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-sm font-bold text-ink">Software Engineer</h3>
                    <div className="text-xs font-semibold text-brand-600 hover:underline cursor-pointer">
                      Tata Consultancy Services
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-ink-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> Jun 2021 – Dec 2022
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> Hyderabad, India
                      </span>
                    </div>
                  </div>
                </div>

                <button type="button" className="text-ink-muted hover:text-ink p-1">
                  <MoreVertical size={16} />
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Worked on enterprise solutions for global clients in the BFSI domain.
              </p>

              <ul className="space-y-1.5 text-xs text-ink/80">
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span>Built RESTful APIs and integrated with third-party services.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span>Automated deployment pipelines using Jenkins and Docker.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <span>Received &apos;On the Spot Award&apos; for outstanding performance.</span>
                </li>
              </ul>
            </Card>

            {/* Add Experience Dashed Button */}
            <button
              type="button"
              onClick={() => setActiveTab('Experience')}
              className="w-full rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/20 py-3.5 text-xs font-bold text-brand-600 hover:border-brand-400 hover:bg-brand-50/50 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={15} />
              Add Experience
            </button>
          </div>

          {/* Education Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-bold text-ink">Education</h2>
              <button
                type="button"
                onClick={() => setActiveTab('Education')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                View all education <ArrowRight size={13} />
              </button>
            </div>

            <Card className="p-5 rounded-2xl border border-line bg-surface space-y-3 shadow-sm hover:border-slate-300 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  {/* VTU Emblem */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 shadow-xs text-amber-700">
                    <GraduationCap size={22} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-sm font-bold text-ink">
                        Bachelor of Engineering in Information Science
                      </h3>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        8.6 / 10 CGPA
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-brand-600 hover:underline cursor-pointer">
                      Visvesvaraya Technological University
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-ink-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> Aug 2017 – May 2021
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> Bangalore, India
                      </span>
                    </div>
                  </div>
                </div>

                <button type="button" className="text-ink-muted hover:text-ink p-1">
                  <MoreVertical size={16} />
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Rail (4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          {/* Card 1: Career Progress Gauge */}
          <Card className="p-5 rounded-2xl border border-line bg-surface space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-ink">Career Progress</h3>
              <button
                type="button"
                onClick={() => navigate('/career-growth')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                View full report <ArrowRight size={12} />
              </button>
            </div>

            {/* Semicircle Gauge Visual */}
            <div className="flex flex-col items-center justify-center pt-2">
              <div className="relative flex h-32 w-52 items-center justify-center overflow-hidden">
                <svg viewBox="0 0 200 110" className="h-full w-full">
                  {/* Background Track */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />
                  {/* Active Progress */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#purpleGradient)"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 0.72)}
                  />
                  <defs>
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute bottom-2 flex flex-col items-center">
                  <span className="font-display text-3xl font-black text-ink">72%</span>
                  <span className="text-[11px] font-medium text-ink-muted">Career Progress Score</span>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-ink-muted">
              You&apos;re on the right track! Keep building your skills and gaining experience.
            </p>
          </Card>

          {/* Card 2: Top Strengths */}
          <Card className="p-5 rounded-2xl border border-line bg-surface space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-ink">Top Strengths</h3>
              <button
                type="button"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                View all <ArrowRight size={12} />
              </button>
            </div>

            <div className="space-y-3">
              {strengths.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-medium text-ink">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <span className="font-bold text-ink">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-600 to-purple-600"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Card 3: Next Milestone */}
          <Card className="p-5 rounded-2xl border border-line bg-surface space-y-3 shadow-sm">
            <h3 className="font-display text-sm font-bold text-ink">Next Milestone</h3>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Target size={20} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-display text-xs font-bold text-ink">
                    Senior Software Engineer
                  </h4>
                  <p className="text-[11px] text-ink-muted">Estimated in 1.8 years</p>
                </div>
              </div>

              <p className="text-xs text-ink/80 leading-relaxed">
                Keep building advanced skills and leadership experience.
              </p>

              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-xl border-slate-200 bg-white text-xs font-bold text-ink hover:bg-slate-50"
                onClick={() => navigate('/career-growth')}
              >
                View Roadmap
              </Button>
            </div>
          </Card>

          {/* Card 4: Recommended for You */}
          <Card className="p-5 rounded-2xl border border-line bg-surface space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-ink">Recommended for You</h3>
              <button
                type="button"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                View all <ArrowRight size={12} />
              </button>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xs">
                <Layers size={22} />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-xs font-bold text-ink">
                  Advanced System Design
                </h4>
                <p className="text-[11px] text-ink-muted line-clamp-2">
                  Master high level design concepts and architecture.
                </p>
                <div className="flex items-center gap-2 pt-0.5 text-[10px] text-ink-muted">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-700">Course</span>
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    4.7 <Star size={10} className="fill-amber-400" />
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

