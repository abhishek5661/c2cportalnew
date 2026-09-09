import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileCheck,
  FileCode,
  FileText,
  Filter,
  GraduationCap,
  HelpCircle,
  Info,
  Layers,
  Lightbulb,
  Link2,
  Lock,
  MoreVertical,
  Plus,
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

export function ResumePortfolioPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Tab management via query params or state
  const queryParams = new URLSearchParams(location.search)
  const qTab = queryParams.get('tab')
  const [activeTab, setActiveTab] = useState<string>(
    qTab === 'resume-score' || qTab === 'score'
      ? 'Resume Score'
      : qTab === 'portfolio'
      ? 'Portfolio'
      : qTab === 'templates'
      ? 'Templates'
      : qTab === 'ats-check'
      ? 'ATS Check'
      : qTab === 'history'
      ? 'Download History'
      : 'My Resume'
  )

  const [activeSubTab, setActiveSubTab] = useState('Score Breakdown')
  const [targetRole, setTargetRole] = useState('Full Stack Developer')
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === 'Resume Score') {
      navigate('/career?tab=resume-score', { replace: true })
    } else if (tab === 'My Resume') {
      navigate('/career', { replace: true })
    } else {
      navigate(`/career?tab=${tab.toLowerCase().replace(/\s+/g, '-')}`, { replace: true })
    }
  }

  const navTabs = [
    'My Resume',
    'Portfolio',
    'Templates',
    'Resume Score',
    'ATS Check',
    'Download History',
  ]

  const scoreRows = [
    {
      id: 1,
      name: 'Content',
      desc: 'Relevance, accomplishment, and value addition',
      score: 80,
      status: 'Good',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: <FileText size={16} className="text-purple-600" />,
      feedback: 'Good accomplishment statements, but could benefit from more quantifiable data.',
    },
    {
      id: 2,
      name: 'Structure',
      desc: 'Sections, formatting, and organization',
      score: 90,
      status: 'Excellent',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: <Layers size={16} className="text-blue-600" />,
      feedback: 'Standard chronological layout with clear headings and consistent margins.',
    },
    {
      id: 3,
      name: 'Skills Match',
      desc: 'Match with target role and industry',
      score: 85,
      status: 'Very Good',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: <Target size={16} className="text-indigo-600" />,
      feedback: 'Matches 92% of required keywords for Full Stack Developer roles.',
    },
    {
      id: 4,
      name: 'Readability',
      desc: 'Clarity, concise language, and readability',
      score: 88,
      status: 'Excellent',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: <span className="font-bold text-xs text-purple-600">Aa</span>,
      feedback: 'Concise bullet points with strong active action verbs.',
    },
    {
      id: 5,
      name: 'Keyword Optimization',
      desc: 'ATS keywords and relevance',
      score: 82,
      status: 'Good',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: <Sparkles size={16} className="text-amber-600" />,
      feedback: 'Add Cloud Deployment (AWS, Docker) keywords to reach 95%+ ATS scan rate.',
    },
    {
      id: 6,
      name: 'Impact',
      desc: 'Overall impact and value proposition',
      score: 84,
      status: 'Very Good',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: <Star size={16} className="text-cyan-600" />,
      feedback: 'Projects showcase real production architecture and business impact.',
    },
  ]

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      badge: 'Best Match',
      accent: 'border-blue-500',
      color: 'bg-blue-600',
    },
    {
      id: 'clean',
      name: 'Clean Minimal',
      accent: 'border-slate-300',
      color: 'bg-slate-700',
    },
    {
      id: 'creative',
      name: 'Creative Blue',
      accent: 'border-cyan-400',
      color: 'bg-cyan-600',
    },
    {
      id: 'tech',
      name: 'Tech Focused',
      accent: 'border-indigo-400',
      color: 'bg-indigo-600',
    },
    {
      id: 'exec',
      name: 'Executive',
      accent: 'border-amber-400',
      color: 'bg-amber-600',
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
        <button
          type="button"
          onClick={() => handleTabChange('My Resume')}
          className="hover:text-brand-600 transition-colors"
        >
          Resume &amp; Portfolio
        </button>
        {activeTab === 'Resume Score' && (
          <>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="font-bold text-ink">Resume Score</span>
          </>
        )}
      </nav>

      {/* Header Card */}
      <Card className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 shadow-2xs">
              <FileText size={28} className="stroke-[2.2]" />
            </div>
            <div className="space-y-1.5">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                {activeTab === 'Resume Score' ? 'Resume Score' : 'Resume & Portfolio'}
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted max-w-xl leading-relaxed">
                {activeTab === 'Resume Score'
                  ? 'Detailed analysis of your resume and how to make it stand out.'
                  : 'Create, manage and optimize your professional presence.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {activeTab === 'Resume Score' ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Downloading resume analysis report PDF...')}
                  className="gap-1.5 text-xs font-bold"
                >
                  <Download size={14} />
                  Download Report
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => showToast('Opening AI Resume Optimizer...')}
                  className="gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm"
                >
                  <Sparkles size={14} />
                  Improve Score
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Opening resume preview...')}
                  className="gap-1.5 text-xs font-bold"
                >
                  <Eye size={14} />
                  Preview Resume
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => showToast('Creating new resume draft...')}
                  className="gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm"
                >
                  <Plus size={14} />
                  Create New
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4">
          {navTabs.map((tab) => (
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
      {/* TAB 1: MY RESUME (Matches media_1788779857517.png)        */}
      {/* ========================================================= */}
      {activeTab === 'My Resume' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Summary Banner: 3 Cards */}
            <div className="grid gap-4 sm:grid-cols-12">
              {/* Card 1: Resume Score & Quality */}
              <Card className="sm:col-span-6 rounded-2xl border border-line bg-surface p-5 shadow-xs flex flex-col justify-between">
                <div className="flex items-start gap-4">
                  {/* Donut Ring */}
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
                        className="text-emerald-500"
                        strokeDasharray="86, 100"
                        strokeLinecap="round"
                        strokeWidth="3.2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-display text-lg font-black text-ink">86</span>
                      <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
                        Excellent
                      </span>
                    </div>
                  </div>

                  {/* Checklist & Text */}
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-display text-xs font-bold text-ink">
                        Great job! Your resume is strong.
                      </h3>
                      <p className="text-[11px] text-ink-muted leading-tight mt-0.5">
                        Keep optimizing to match top job descriptions.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
                      <div className="flex items-center gap-1 text-slate-700">
                        <Check size={11} className="text-emerald-500 stroke-[3]" />
                        <span>Content</span>
                        <span className="font-semibold text-emerald-600">Good</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-700">
                        <Check size={11} className="text-emerald-500 stroke-[3]" />
                        <span>Structure</span>
                        <span className="font-semibold text-emerald-600">Excellent</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-700">
                        <Check size={11} className="text-emerald-500 stroke-[3]" />
                        <span>Skills Match</span>
                        <span className="font-semibold text-emerald-600">Very Good</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-700">
                        <Check size={11} className="text-emerald-500 stroke-[3]" />
                        <span>Readability</span>
                        <span className="font-semibold text-emerald-600">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-line/50 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTabChange('Resume Score')}
                    className="text-[11px] font-bold py-1 h-7 border-slate-200 hover:border-brand-300 hover:text-brand-600"
                  >
                    Improve Score
                  </Button>
                </div>
              </Card>

              {/* Card 2: ATS Compatibility */}
              <Card className="sm:col-span-3 rounded-2xl border border-line bg-surface p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink">ATS Compatibility</span>
                  <div className="mt-3 flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
                      <Shield size={18} />
                    </div>
                    <span className="font-display text-2xl font-black text-ink">92%</span>
                  </div>
                  <p className="mt-2 text-[11px] font-bold text-purple-600">Highly ATS Friendly</p>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '92%' }} />
                </div>
              </Card>

              {/* Card 3: Profile Completeness */}
              <Card className="sm:col-span-3 rounded-2xl border border-line bg-surface p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-ink">Profile Completeness</span>
                  <div className="mt-3 flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                      <User size={16} />
                    </div>
                    <span className="font-display text-2xl font-black text-ink">90%</span>
                  </div>
                  <p className="mt-2 text-[11px] font-bold text-slate-700">Almost Complete</p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Opening completeness suggestions...')}
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View suggestions &rarr;
                </button>
              </Card>
            </div>

            {/* My Resumes (2) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-sm font-bold text-ink">My Resumes (2)</h2>
              </div>

              {/* Resume 1: Full Stack Developer */}
              <Card className="rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-xs hover:border-brand-200 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Miniature Paper Graphic */}
                    <div className="relative flex h-20 w-16 shrink-0 flex-col justify-between rounded-lg border border-slate-200 bg-slate-50/80 p-2 shadow-2xs">
                      <div className="space-y-1">
                        <div className="h-1.5 w-8 rounded bg-slate-400" />
                        <div className="h-1 w-10 rounded bg-slate-200" />
                        <div className="h-1 w-9 rounded bg-slate-200" />
                        <div className="h-1 w-11 rounded bg-slate-200" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="h-0.5 w-full rounded bg-slate-200" />
                        <div className="h-0.5 w-3/4 rounded bg-slate-200" />
                      </div>
                    </div>

                    {/* Resume Details */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-sm font-bold text-ink">
                          Full Stack Developer Resume
                        </h3>
                        <span className="rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold px-2 py-0.5">
                          Primary
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-muted">
                        Last updated: May 20, 2026 &bull; 2 pages
                      </p>

                      <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <User size={13} className="text-slate-400" />
                          <span>Target Role</span>
                          <span className="font-semibold text-ink">Full Stack Developer</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400" />
                          <span>Experience</span>
                          <span className="font-semibold text-ink">2+ Years</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck size={13} className="text-emerald-500" />
                          <span>Best Match</span>
                          <span className="font-semibold text-emerald-600">92%</span>
                        </div>
                      </div>

                      {/* Quick Action Links */}
                      <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-semibold text-ink-muted">
                        <button
                          type="button"
                          onClick={() => showToast('Opening resume preview...')}
                          className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                        >
                          <Eye size={13} />
                          <span>Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast('Downloading PDF...')}
                          className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                        >
                          <Download size={13} />
                          <span>Download PDF</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTabChange('Resume Score')}
                          className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                        >
                          <Shield size={13} />
                          <span>ATS Check</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast('Link copied to clipboard!')}
                          className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                        >
                          <Share2 size={13} />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => showToast('Opening resume editor...')}
                      className="text-xs font-bold border-slate-200 hover:border-brand-300"
                    >
                      Edit Resume
                    </Button>
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-50 transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </Card>

              {/* Resume 2: Software Engineer Resume */}
              <Card className="rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-xs hover:border-brand-200 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="relative flex h-20 w-16 shrink-0 flex-col justify-between rounded-lg border border-slate-200 bg-slate-50/80 p-2 shadow-2xs">
                      <div className="space-y-1">
                        <div className="h-1.5 w-7 rounded bg-slate-400" />
                        <div className="h-1 w-10 rounded bg-slate-200" />
                        <div className="h-1 w-8 rounded bg-slate-200" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="h-0.5 w-full rounded bg-slate-200" />
                        <div className="h-0.5 w-2/3 rounded bg-slate-200" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-display text-sm font-bold text-ink">
                        Software Engineer Resume
                      </h3>
                      <p className="text-[11px] text-ink-muted">
                        Last updated: Apr 10, 2026 &bull; 1 page
                      </p>

                      <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <User size={13} className="text-slate-400" />
                          <span>Target Role</span>
                          <span className="font-semibold text-ink">Software Engineer</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400" />
                          <span>Experience</span>
                          <span className="font-semibold text-ink">2+ Years</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck size={13} className="text-blue-500" />
                          <span>Best Match</span>
                          <span className="font-semibold text-blue-600">78%</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-semibold text-ink-muted">
                        <button
                          type="button"
                          onClick={() => showToast('Opening resume preview...')}
                          className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                        >
                          <Eye size={13} />
                          <span>Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast('Downloading PDF...')}
                          className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                        >
                          <Download size={13} />
                          <span>Download PDF</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTabChange('Resume Score')}
                          className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                        >
                          <Shield size={13} />
                          <span>ATS Check</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast('Link copied to clipboard!')}
                          className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                        >
                          <Share2 size={13} />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => showToast('Opening resume editor...')}
                      className="text-xs font-bold border-slate-200 hover:border-brand-300"
                    >
                      Edit Resume
                    </Button>
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-50 transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </Card>

              {/* Create New Resume Dotted Card */}
              <button
                type="button"
                onClick={() => showToast('Starting new resume builder wizard...')}
                className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-purple-50/40 hover:border-brand-300 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-brand-600 shadow-2xs group-hover:bg-brand-600 group-hover:text-white transition-all">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink group-hover:text-brand-600 transition-colors">
                      Create New Resume
                    </h4>
                    <p className="text-[11px] text-ink-muted">Start from scratch or use a template</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>

            {/* Recommended Templates */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-sm font-bold text-ink">Recommended Templates</h2>
                <button
                  type="button"
                  onClick={() => handleTabChange('Templates')}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  View all templates &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {templates.map((tpl) => (
                  <Card
                    key={tpl.id}
                    className={cn(
                      'relative overflow-hidden rounded-xl border p-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group',
                      tpl.badge ? 'border-brand-400 bg-white ring-2 ring-brand-500/10' : 'border-line bg-surface'
                    )}
                    onClick={() => showToast(`Selected template: ${tpl.name}`)}
                  >
                    {/* Miniature Page preview */}
                    <div className="h-24 w-full rounded bg-slate-50 border border-slate-200/80 p-2 flex flex-col justify-between group-hover:border-brand-200 transition-colors">
                      <div className="space-y-1">
                        <div className={cn('h-1.5 w-10 rounded', tpl.color)} />
                        <div className="h-0.5 w-full bg-slate-200 rounded" />
                        <div className="h-0.5 w-3/4 bg-slate-200 rounded" />
                        <div className="h-0.5 w-5/6 bg-slate-200 rounded" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="h-0.5 w-full bg-slate-200 rounded" />
                        <div className="h-0.5 w-2/3 bg-slate-200 rounded" />
                      </div>
                    </div>

                    <div className="mt-2 text-center">
                      <p className="text-[11px] font-bold text-ink truncate">{tpl.name}</p>
                      {tpl.badge && (
                        <span className="inline-block mt-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.2 border border-emerald-200">
                          {tpl.badge}
                        </span>
                      )}
                    </div>
                  </Card>
                ))}

                {/* Browse More */}
                <button
                  type="button"
                  onClick={() => handleTabChange('Templates')}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-brand-300 transition-all text-center group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-brand-600 shadow-2xs group-hover:bg-brand-600 group-hover:text-white transition-all">
                    <Plus size={16} />
                  </div>
                  <span className="mt-2 text-[11px] font-bold text-ink">Browse More</span>
                  <span className="text-[9px] text-ink-muted">Explore all templates</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Rail (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Resume Optimization Tips */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Resume Optimization Tips</h3>
                <button
                  type="button"
                  onClick={() => showToast('Opening all 12 optimization tips...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View all &rarr;
                </button>
              </div>

              <div className="space-y-3 pt-1">
                {[
                  {
                    icon: <Award size={15} className="text-purple-600" />,
                    bg: 'bg-purple-50 border-purple-200',
                    title: 'Add more metrics to your achievements',
                    desc: 'Quantify your impact with numbers',
                  },
                  {
                    icon: <FileText size={15} className="text-blue-600" />,
                    bg: 'bg-blue-50 border-blue-200',
                    title: 'Include a professional summary',
                    desc: 'Highlight your key strengths',
                  },
                  {
                    icon: <ShieldCheck size={15} className="text-indigo-600" />,
                    bg: 'bg-indigo-50 border-indigo-200',
                    title: 'Add relevant certifications',
                    desc: 'Boost your credibility',
                  },
                  {
                    icon: <Target size={15} className="text-amber-600" />,
                    bg: 'bg-amber-50 border-amber-200',
                    title: 'Tailor for specific job roles',
                    desc: 'Increase your chances of getting noticed',
                  },
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border shadow-2xs', tip.bg)}>
                      {tip.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink leading-snug">{tip.title}</p>
                      <p className="text-[11px] text-ink-muted">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Skills in Your Resume */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Top Skills in Your Resume</h3>
                <button
                  type="button"
                  onClick={() => showToast('Opening skills editor...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  Edit skills &rarr;
                </button>
              </div>

              <div className="space-y-2.5 pt-1">
                {[
                  { name: 'JavaScript', pct: 90 },
                  { name: 'React', pct: 85 },
                  { name: 'Node.js', pct: 80 },
                  { name: 'System Design', pct: 75 },
                  { name: 'SQL', pct: 70 },
                ].map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">{s.name}</span>
                      <span className="font-bold text-ink">{s.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full bg-brand-600 rounded-full" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center border-t border-line/60">
                <button
                  type="button"
                  onClick={() => showToast('Viewing all 18 skills...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View all skills &rarr;
                </button>
              </div>
            </Card>

            {/* Resume Analytics */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Resume Analytics</h3>
                <button
                  type="button"
                  onClick={() => showToast('Opening full analytics report...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View report &rarr;
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="rounded-xl border border-line/80 bg-slate-50/50 p-2.5">
                  <div className="flex justify-center text-purple-600 mb-1">
                    <Eye size={15} />
                  </div>
                  <p className="font-display text-base font-black text-ink">12</p>
                  <p className="text-[10px] text-ink-muted">Views</p>
                  <p className="mt-1 text-[9px] font-bold text-emerald-600">&uarr; 25% this month</p>
                </div>
                <div className="rounded-xl border border-line/80 bg-slate-50/50 p-2.5">
                  <div className="flex justify-center text-blue-600 mb-1">
                    <Download size={15} />
                  </div>
                  <p className="font-display text-base font-black text-ink">7</p>
                  <p className="text-[10px] text-ink-muted">Downloads</p>
                  <p className="mt-1 text-[9px] font-bold text-emerald-600">&uarr; 40% this month</p>
                </div>
                <div className="rounded-xl border border-line/80 bg-slate-50/50 p-2.5">
                  <div className="flex justify-center text-indigo-600 mb-1">
                    <Share2 size={15} />
                  </div>
                  <p className="font-display text-base font-black text-ink">4</p>
                  <p className="text-[10px] text-ink-muted">Shares</p>
                  <p className="mt-1 text-[9px] font-bold text-emerald-600">&uarr; 33% this month</p>
                </div>
              </div>
            </Card>

            {/* Need Help? Expert Review */}
            <Card className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/40 p-5 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-display text-xs font-bold text-ink">Need Help?</h4>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    Get your resume reviewed by experts and stand out to recruiters.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 border border-purple-200 shadow-2xs">
                  <FileCheck size={20} />
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => showToast('Opening expert reviewer booking...')}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold"
              >
                Get Reviewed
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: RESUME SCORE (Matches media_1788779857553.png)     */}
      {/* ========================================================= */}
      {activeTab === 'Resume Score' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Overall Resume Score Card */}
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left Donut Ring */}
                <div className="flex items-center gap-5">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-emerald-500"
                        strokeDasharray="86, 100"
                        strokeLinecap="round"
                        strokeWidth="3.2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-display text-2xl font-black text-ink">86</span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                        Excellent
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-sm font-bold text-ink">
                      Great job! Your resume is strong.
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Keep optimizing to match top job descriptions.
                    </p>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Check size={12} className="text-emerald-500 stroke-[3]" />
                        <span className="text-slate-600">Content</span>
                        <span className="font-bold text-emerald-600">Good</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check size={12} className="text-emerald-500 stroke-[3]" />
                        <span className="text-slate-600">Skills Match</span>
                        <span className="font-bold text-emerald-600">Very Good</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check size={12} className="text-emerald-500 stroke-[3]" />
                        <span className="text-slate-600">Structure</span>
                        <span className="font-bold text-emerald-600">Excellent</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check size={12} className="text-emerald-500 stroke-[3]" />
                        <span className="text-slate-600">Readability</span>
                        <span className="font-bold text-emerald-600">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score Benchmark */}
                <div className="rounded-xl border border-line/70 bg-slate-50/60 p-4 space-y-2.5 min-w-[200px]">
                  <div className="flex items-center justify-between text-xs font-bold text-ink">
                    <span>Score Benchmark</span>
                    <Info size={13} className="text-slate-400" />
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700">You</span>
                      <span className="font-bold text-emerald-600">86</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '86%' }} />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-ink-muted">Top 25%</span>
                      <span className="font-semibold text-slate-700">75</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '75%' }} />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-ink-muted">Average</span>
                      <span className="font-semibold text-slate-700">50</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: '50%' }} />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-ink-muted">Bottom 25%</span>
                      <span className="font-semibold text-slate-700">25</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-300 rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Subtabs for Score Breakdown */}
            <div className="flex flex-wrap items-center gap-2 border-b border-line pb-2 text-xs font-semibold text-ink-muted">
              {['Score Breakdown', 'Content Analysis', 'Structure Analysis', 'Keyword Match', 'Readability'].map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setActiveSubTab(st)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg transition-all',
                      activeSubTab === st
                        ? 'text-brand-600 bg-brand-50/80 font-bold'
                        : 'hover:text-ink hover:bg-slate-50'
                    )}
                  >
                    {st}
                  </button>
                )
              )}
            </div>

            {/* 6 Score Breakdown Rows */}
            <div className="space-y-3">
              {scoreRows.map((row) => (
                <Card
                  key={row.id}
                  className="overflow-hidden rounded-2xl border border-line bg-surface p-4 shadow-xs transition-all hover:border-slate-300"
                >
                  <div
                    className="flex items-center justify-between gap-4 cursor-pointer"
                    onClick={() => setExpandedSection(expandedSection === row.id ? null : row.id)}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                        {row.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ink">{row.name}</h4>
                        <p className="text-[11px] text-ink-muted">{row.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-display text-xs font-bold text-ink">
                        {row.score}<span className="text-[10px] text-ink-muted">/100</span>
                      </span>
                      <span
                        className={cn(
                          'rounded-md text-[10px] font-bold px-2 py-0.5 border',
                          row.statusColor
                        )}
                      >
                        {row.status}
                      </span>
                      <ChevronDown
                        size={15}
                        className={cn(
                          'text-slate-400 transition-transform duration-200',
                          expandedSection === row.id && 'rotate-180 text-brand-600'
                        )}
                      />
                    </div>
                  </div>

                  {expandedSection === row.id && (
                    <div className="mt-3 pt-3 border-t border-line/60 text-xs text-slate-600 bg-slate-50/60 -mx-4 -mb-4 p-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        <p>{row.feedback}</p>
                      </div>
                      <div className="flex justify-end pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => showToast(`Optimizing ${row.name}...`)}
                          className="text-[11px] font-bold h-7 py-0"
                        >
                          Optimize {row.name}
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}

              <div className="pt-1 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Generating full 14-page detailed analysis...')}
                  className="text-xs font-bold border-slate-300"
                >
                  View Detailed Analysis
                </Button>
              </div>
            </div>

            {/* How Your Resume Compares */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">How Your Resume Compares</h3>
                  <p className="text-[11px] text-ink-muted">Comparison with other candidates applying for similar roles.</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-bold text-ink shadow-2xs focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    icon: <Briefcase size={15} className="text-purple-600" />,
                    title: 'Experience',
                    pct: 78,
                    label: 'Above Average',
                  },
                  {
                    icon: <Sparkles size={15} className="text-indigo-600" />,
                    title: 'Skills',
                    pct: 82,
                    label: 'Above Average',
                  },
                  {
                    icon: <GraduationCap size={15} className="text-blue-600" />,
                    title: 'Education',
                    pct: 90,
                    label: 'Excellent',
                  },
                  {
                    icon: <Star size={15} className="text-amber-600" />,
                    title: 'Achievements',
                    pct: 70,
                    label: 'Average',
                  },
                ].map((item, idx) => (
                  <Card key={idx} className="rounded-2xl border border-line bg-surface p-4 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
                        {item.icon}
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{item.title}</span>
                    </div>

                    <div>
                      <span className="font-display text-xl font-black text-ink">{item.pct}%</span>
                      <p className="text-[10px] font-bold text-purple-600">{item.label}</p>
                    </div>

                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-600 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail for Resume Score (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Top Strengths */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-600" />
                <h3 className="font-display text-xs font-bold text-ink">Top Strengths</h3>
              </div>

              <div className="space-y-3 pt-1">
                {[
                  {
                    title: 'Strong professional summary',
                    desc: 'Clearly communicates your value',
                  },
                  {
                    title: 'Relevant work experience',
                    desc: 'Well-aligned with target role',
                  },
                  {
                    title: 'Good use of metrics',
                    desc: 'You quantify your achievements',
                  },
                  {
                    title: 'Clean and professional layout',
                    desc: 'Well-structured and easy to read',
                  },
                ].map((st, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mt-0.5">
                      <Check size={11} className="stroke-[3]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink leading-snug">{st.title}</p>
                      <p className="text-[11px] text-ink-muted">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Areas to Improve */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-amber-600" />
                <h3 className="font-display text-xs font-bold text-ink">Areas to Improve</h3>
              </div>

              <div className="space-y-3 pt-1">
                {[
                  {
                    title: 'Add more metrics',
                    desc: 'Use numbers to show more impact',
                    impact: 'High Impact',
                    color: 'text-amber-700 bg-amber-50 border-amber-200',
                  },
                  {
                    title: 'Include more relevant keywords',
                    desc: 'Add skills from job descriptions',
                    impact: 'High Impact',
                    color: 'text-amber-700 bg-amber-50 border-amber-200',
                  },
                  {
                    title: 'Highlight key achievements',
                    desc: 'Showcase 2-3 more achievements',
                    impact: 'Medium Impact',
                    color: 'text-orange-700 bg-orange-50 border-orange-200',
                  },
                  {
                    title: 'Add links to your work',
                    desc: 'Add portfolio or project links',
                    impact: 'Low Impact',
                    color: 'text-blue-700 bg-blue-50 border-blue-200',
                  },
                ].map((ar, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-ink leading-snug">{ar.title}</p>
                        <p className="text-[11px] text-ink-muted">{ar.desc}</p>
                      </div>
                    </div>
                    <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0', ar.color)}>
                      {ar.impact}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Resume Optimization Suggestions */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-500" />
                <h3 className="font-display text-xs font-bold text-ink">Resume Optimization Suggestions</h3>
              </div>
              <p className="text-[11px] text-ink-muted leading-relaxed">
                Personalized suggestions to improve your resume based on current job openings.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Opening personalized suggestions modal...')}
                className="w-full text-xs font-bold"
              >
                View Suggestions &rarr;
              </Button>
            </Card>

            {/* Get Expert Resume Review */}
            <Card className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/40 p-5 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-display text-xs font-bold text-ink">Get Expert Resume Review</h4>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    Let our experts review your resume and provide personalized feedback.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 border border-purple-200 shadow-2xs">
                  <FileCheck size={20} />
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => showToast('Opening expert reviewer booking...')}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold"
              >
                Get Reviewed
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* Fallback for other tabs: Portfolio, Templates, ATS Check, Download History */}
      {activeTab !== 'My Resume' && activeTab !== 'Resume Score' && (
        <Card className="rounded-2xl border border-line bg-surface p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200">
            <FileText size={28} />
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-ink">{activeTab}</h3>
          <p className="mt-1 text-xs text-ink-muted max-w-sm mx-auto">
            Manage your {activeTab.toLowerCase()} settings, assets, and configurations.
          </p>
          <div className="mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleTabChange('My Resume')}
              className="text-xs font-bold"
            >
              &larr; Back to My Resume
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

