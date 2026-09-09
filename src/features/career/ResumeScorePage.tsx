import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  Eye,
  FileCode,
  FileText,
  HelpCircle,
  Layers,
  Lightbulb,
  Link2,
  PenTool,
  Pencil,
  RefreshCw,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Type,
  Upload,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'

export function ResumeScorePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Suggestions')
  const [isReanalyzing, setIsReanalyzing] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleReanalyze = () => {
    setIsReanalyzing(true)
    showToast('Re-analyzing resume with latest AI model...')
    setTimeout(() => {
      setIsReanalyzing(false)
      showToast('Resume score updated: 86/100 (Excellent)')
    }, 1500)
  }

  const tabs = [
    'Suggestions',
    'Content Enhancements',
    'Format & Structure',
    'Impact Boosters',
    'ATS Insights',
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
        <Link to="/career?tab=resume" className="hover:text-brand-600 transition-colors">
          Resume &amp; Portfolio
        </Link>
        <ChevronRight size={13} className="text-slate-400" />
        <span className="font-bold text-ink">Resume Score</span>
      </nav>

      {/* Header Card */}
      <Card className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 shadow-2xs">
              <Lightbulb size={28} className="stroke-[2.2]" />
            </div>
            <div className="space-y-1.5">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Resume Optimization Suggestions
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted max-w-xl leading-relaxed">
                Personalized suggestions to make your resume stronger and more impactful.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReanalyze}
              disabled={isReanalyzing}
              className="gap-2 rounded-xl border-line text-xs font-bold text-ink hover:bg-slate-50"
            >
              <RefreshCw size={14} className={cn('text-brand-600', isReanalyzing && 'animate-spin')} />
              {isReanalyzing ? 'Analyzing...' : 'Re-analyze Resume'}
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
        <div className="lg:col-span-8 space-y-4">
          {/* Suggestion Card 1: Add quantified achievements */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all hover:border-slate-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
                  <FileText size={22} className="stroke-[2.2]" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-sm sm:text-base font-bold text-ink">
                      Add quantified achievements
                    </h3>
                    <span className="rounded-md px-2 py-0.5 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200">
                      High Impact
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Your resume will be stronger with more numbers and metrics that show your impact.
                  </p>
                  <div className="rounded-xl border border-line/60 bg-slate-50/70 p-2.5 text-xs text-slate-600 font-mono">
                    Example: &quot;Improved system performance by 30%&quot; instead of &quot;Improved system performance&quot;
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Opening Quantified Metrics helper...')}
                className="rounded-xl text-xs font-bold text-brand-600 border-brand-200 hover:bg-brand-50 shrink-0"
              >
                Add Metrics
              </Button>
            </div>
          </Card>

          {/* Suggestion Card 2: Highlight relevant skills */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all hover:border-slate-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Briefcase size={22} className="stroke-[2.2]" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-sm sm:text-base font-bold text-ink">
                      Highlight relevant skills
                    </h3>
                    <span className="rounded-md px-2 py-0.5 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200">
                      High Impact
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Add more role-relevant skills from the job descriptions you&apos;re targeting.
                  </p>
                  <div className="rounded-xl border border-line/60 bg-emerald-50/40 p-2.5 text-xs text-emerald-800 font-medium">
                    Suggested: System Design, AWS, Docker, Kubernetes, CI/CD
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Opening Skills Recommender...')}
                className="rounded-xl text-xs font-bold text-brand-600 border-brand-200 hover:bg-brand-50 shrink-0"
              >
                Add Skills
              </Button>
            </div>
          </Card>

          {/* Suggestion Card 3: Improve bullet points */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all hover:border-slate-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
                  <Pencil size={22} className="stroke-[2.2]" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-sm sm:text-base font-bold text-ink">
                      Improve bullet points
                    </h3>
                    <span className="rounded-md px-2 py-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200">
                      Medium Impact
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Some bullet points can be more specific and results-oriented.
                  </p>
                  <div className="rounded-xl border border-line/60 bg-amber-50/40 p-2.5 text-xs text-amber-800">
                    Tip: Start with action verbs and focus on the outcome.
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Opening Bullet Points optimizer...')}
                className="rounded-xl text-xs font-bold text-brand-600 border-brand-200 hover:bg-brand-50 shrink-0"
              >
                Improve Now
              </Button>
            </div>
          </Card>

          {/* Suggestion Card 4: Enhance summary */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all hover:border-slate-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                  <span className="font-display text-lg font-black">Aa</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-sm sm:text-base font-bold text-ink">
                      Enhance summary
                    </h3>
                    <span className="rounded-md px-2 py-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200">
                      Medium Impact
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Your professional summary can better highlight your value proposition.
                  </p>
                  <div className="rounded-xl border border-line/60 bg-blue-50/40 p-2.5 text-xs text-blue-800">
                    Tip: Include your key skills, experience and what makes you unique.
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Editing Professional Summary...')}
                className="rounded-xl text-xs font-bold text-brand-600 border-brand-200 hover:bg-brand-50 shrink-0"
              >
                Edit Summary
              </Button>
            </div>
          </Card>

          {/* Suggestion Card 5: Optimize for ATS */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all hover:border-slate-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
                  <Layers size={22} className="stroke-[2.2]" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-sm sm:text-base font-bold text-ink">
                      Optimize for ATS
                    </h3>
                    <span className="rounded-md px-2 py-0.5 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200">
                      Low Impact
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Make your resume more ATS-friendly to increase shortlisting chances.
                  </p>
                  <div className="rounded-xl border border-line/60 bg-rose-50/40 p-2.5 text-xs text-rose-800">
                    Tip: Use standard section headings and avoid complex formatting.
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Opening ATS Compatibility details...')}
                className="rounded-xl text-xs font-bold text-brand-600 border-brand-200 hover:bg-brand-50 shrink-0"
              >
                View Details
              </Button>
            </div>
          </Card>

          {/* View All Suggestions Button */}
          <div className="text-center pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/career?tab=resume-suggestions')}
              className="rounded-xl border-line px-5 py-2 text-xs font-bold text-ink hover:bg-slate-50 gap-1.5"
            >
              <span>View All Suggestions</span>
              <ChevronDown size={14} />
            </Button>
          </div>

          {/* Before vs After Preview Card */}
          <Card className="rounded-2xl border border-line bg-surface p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-sm font-bold text-ink">
                  Before vs After Preview
                </h4>
                <p className="text-xs text-ink-muted">
                  See the impact of optimization on your resume content.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/career?tab=resume-builder')}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                <span>Preview Full Resume</span>
                <ExternalLink size={13} />
              </button>
            </div>

            <div className="relative grid gap-4 md:grid-cols-2 pt-1">
              {/* Left Column: Before Optimization */}
              <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 space-y-2">
                <span className="text-[11px] font-bold text-rose-700 block">
                  Before Optimization
                </span>
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-ink">Project Experience</h5>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    • Developed a web application using MERN stack.
                  </p>
                </div>
              </div>

              {/* Center Swap Icon */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full bg-white border border-line shadow-xs text-slate-400">
                <RefreshCw size={14} />
              </div>

              {/* Right Column: After Optimization */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-2">
                <span className="text-[11px] font-bold text-emerald-700 block">
                  After Optimization
                </span>
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-ink">Project Experience</h5>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    • Developed a scalable web application using MERN stack that improved user engagement by 40% and reduced load time by 25%.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Rail Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Your Resume at a Glance */}
          <Card className="rounded-2xl border border-line bg-surface p-6 shadow-xs space-y-4">
            <span className="text-xs font-bold text-ink">Your Resume at a Glance</span>

            <div className="flex items-center gap-5">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-500"
                    strokeDasharray="86, 100"
                    strokeLinecap="round"
                    strokeWidth="3.4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-2xl font-black text-ink leading-none">86</span>
                  <span className="text-[9px] font-bold text-ink-muted block mt-0.5">Overall Score</span>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    Excellent
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Check size={13} className="text-emerald-500 stroke-[3]" />
                    <span className="text-slate-700">Content</span>
                  </div>
                  <span className="font-bold text-ink">80/100</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Check size={13} className="text-emerald-500 stroke-[3]" />
                    <span className="text-slate-700">Structure</span>
                  </div>
                  <span className="font-bold text-ink">90/100</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Check size={13} className="text-emerald-500 stroke-[3]" />
                    <span className="text-slate-700">Skills Match</span>
                  </div>
                  <span className="font-bold text-ink">85/100</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Check size={13} className="text-emerald-500 stroke-[3]" />
                    <span className="text-slate-700">Readability</span>
                  </div>
                  <span className="font-bold text-ink">88/100</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Star size={13} className="text-emerald-500" />
                    <span className="text-slate-700">Impact</span>
                  </div>
                  <span className="font-bold text-ink">84/100</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast('Opening Detailed Analysis Report...')}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 pt-1"
            >
              <span>View Detailed Analysis</span>
              <ArrowRight size={13} />
            </button>
          </Card>

          {/* Card 2: Quick Actions */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <h4 className="font-display text-sm font-bold text-ink">Quick Actions</h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => showToast('Downloading optimized resume PDF...')}
                className="w-full flex items-center justify-between rounded-xl border border-line/60 p-3 text-xs font-semibold text-ink hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <FileText size={15} />
                  </div>
                  <div>
                    <span className="font-bold text-ink block">Download Optimized Resume</span>
                    <span className="text-[10px] text-ink-muted">Download the latest optimized version</span>
                  </div>
                </div>
                <Download size={14} className="text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => showToast('Opening resume upload dialog...')}
                className="w-full flex items-center justify-between rounded-xl border border-line/60 p-3 text-xs font-semibold text-ink hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Upload size={15} />
                  </div>
                  <div>
                    <span className="font-bold text-ink block">Upload New Resume</span>
                    <span className="text-[10px] text-ink-muted">Upload and analyze a new resume</span>
                  </div>
                </div>
                <Upload size={14} className="text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/career?tab=resume-builder')}
                className="w-full flex items-center justify-between rounded-xl border border-line/60 p-3 text-xs font-semibold text-ink hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Eye size={15} />
                  </div>
                  <div>
                    <span className="font-bold text-ink block">Preview Resume</span>
                    <span className="text-[10px] text-ink-muted">Preview how your resume looks</span>
                  </div>
                </div>
                <Eye size={14} className="text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => showToast('Link copied to clipboard: c2cedge.me/r/ananya')}
                className="w-full flex items-center justify-between rounded-xl border border-line/60 p-3 text-xs font-semibold text-ink hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                    <Share2 size={15} />
                  </div>
                  <div>
                    <span className="font-bold text-ink block">Share Resume</span>
                    <span className="text-[10px] text-ink-muted">Generate a shareable link</span>
                  </div>
                </div>
                <Link2 size={14} className="text-slate-400" />
              </button>
            </div>
          </Card>

          {/* Card 3: Resources to Improve */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <h4 className="font-display text-sm font-bold text-ink">Resources to Improve</h4>
            <div className="space-y-2">
              <a
                href="#guide"
                onClick={(e) => {
                  e.preventDefault()
                  showToast('Opening Impactful Resume guide...')
                }}
                className="flex items-center justify-between rounded-xl border border-line/60 p-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FileText size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-ink block">
                      How to Write Impactful Resume
                    </span>
                    <span className="text-[10px] text-ink-muted">Guide • 8 min read</span>
                  </div>
                </div>
                <ExternalLink size={13} className="text-slate-400" />
              </a>

              <a
                href="#examples"
                onClick={(e) => {
                  e.preventDefault()
                  showToast('Opening Resume Examples catalog...')
                }}
                className="flex items-center justify-between rounded-xl border border-line/60 p-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <FileCode size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-ink block">
                      Top Resume Examples
                    </span>
                    <span className="text-[10px] text-ink-muted">Browse role-wise resume samples</span>
                  </div>
                </div>
                <ExternalLink size={13} className="text-slate-400" />
              </a>

              <a
                href="#ats"
                onClick={(e) => {
                  e.preventDefault()
                  showToast('Opening ATS Guide...')
                }}
                className="flex items-center justify-between rounded-xl border border-line/60 p-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <ShieldCheck size={15} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-ink block">
                      ATS-Friendly Resume Guide
                    </span>
                    <span className="text-[10px] text-ink-muted">Tips to pass ATS scans</span>
                  </div>
                </div>
                <ExternalLink size={13} className="text-slate-400" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => showToast('Opening all career resources...')}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 pt-1"
            >
              <span>Explore All Resources</span>
              <ArrowRight size={13} />
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}

