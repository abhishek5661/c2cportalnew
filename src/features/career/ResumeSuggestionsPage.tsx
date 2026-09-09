import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  ExternalLink,
  FileCheck,
  FileCode,
  FileText,
  Filter,
  GraduationCap,
  Lightbulb,
  Link2,
  List,
  Plus,
  RefreshCw,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  User,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'

interface SuggestionItem {
  id: string
  title: string
  description: string
  example?: string
  impact: 'High Impact' | 'Medium Impact' | 'Low Impact'
  impactColor: string
  icon: any
  iconColor: string
  iconBg: string
}

const suggestions: SuggestionItem[] = [
  {
    id: 's1',
    title: 'Add more impactful metrics',
    description: 'Your resume can be stronger with more quantifiable achievements. Try adding numbers to showcase your impact.',
    example: 'Example: "Improved system performance" → "Improved system performance by 30%"',
    impact: 'High Impact',
    impactColor: 'text-rose-600 bg-rose-50 border-rose-200',
    icon: Target,
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-50 border-rose-100',
  },
  {
    id: 's2',
    title: 'Include more relevant keywords',
    description: "Add industry-relevant keywords to increase your resume's visibility in ATS and catch recruiters' attention.",
    example: 'Example Keywords: React, Node.js, AWS, Docker, CI/CD',
    impact: 'High Impact',
    impactColor: 'text-rose-600 bg-rose-50 border-rose-200',
    icon: Star,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50 border-emerald-100',
  },
  {
    id: 's3',
    title: 'Highlight key achievements',
    description: 'You have good experience. Highlight key achievements to make your resume more compelling.',
    example: 'Example: Led a team of 4 developers to build a scalable web application.',
    impact: 'Medium Impact',
    impactColor: 'text-amber-600 bg-amber-50 border-amber-200',
    icon: Briefcase,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50 border-amber-100',
  },
  {
    id: 's4',
    title: 'Improve bullet point clarity',
    description: 'Some bullet points can be clearer and more concise. Make them easy to scan and understand.',
    example: 'Example: Use action verbs and remove unnecessary words.',
    impact: 'Medium Impact',
    impactColor: 'text-amber-600 bg-amber-50 border-amber-200',
    icon: List,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50 border-purple-100',
  },
  {
    id: 's5',
    title: 'Add links to your work',
    description: 'Add links to your projects, GitHub, or portfolio to provide evidence of your work and skills.',
    example: 'Example: https://github.com/username, https://yourportfolio.com',
    impact: 'Low Impact',
    impactColor: 'text-blue-600 bg-blue-50 border-blue-200',
    icon: Link2,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50 border-blue-100',
  },
  {
    id: 's6',
    title: 'Add more education details',
    description: 'Include relevant coursework, honors, or certifications to strengthen your academic background.',
    example: 'Example: Dean\'s List 2023, Relevant Coursework: Distributed Systems, Advanced Algorithms',
    impact: 'Low Impact',
    impactColor: 'text-blue-600 bg-blue-50 border-blue-200',
    icon: GraduationCap,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50 border-purple-100',
  },
]

export function ResumeSuggestionsPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const filteredSuggestions = suggestions.filter((s) => {
    if (activeFilter === 'High') return s.impact === 'High Impact'
    if (activeFilter === 'Medium') return s.impact === 'Medium Impact'
    if (activeFilter === 'Low') return s.impact === 'Low Impact'
    return true
  })

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
        <Link to="/career?tab=resume-score" className="hover:text-brand-600 transition-colors">
          Resume Score
        </Link>
        <ChevronRight size={13} className="text-slate-400" />
        <span className="font-bold text-ink">Resume Suggestions</span>
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
                Resume Suggestions
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted max-w-xl leading-relaxed">
                Personalized suggestions to improve your resume and increase your chances.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/career?tab=resume-score')}
              className="gap-1.5 rounded-xl border-line text-xs font-bold text-ink hover:bg-slate-50"
            >
              <ArrowLeft size={14} />
              Back to Resume Score
            </Button>
          </div>
        </div>
      </Card>

      {/* Filter Pills Row */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter('All')}
            className={cn(
              'rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-2',
              activeFilter === 'All'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white border border-line text-ink-muted hover:text-ink hover:bg-slate-50'
            )}
          >
            <span>All Suggestions</span>
            <span
              className={cn(
                'rounded-full px-1.5 py-0.2 text-[10px] font-extrabold',
                activeFilter === 'All' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              )}
            >
              12
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('High')}
            className={cn(
              'rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-2',
              activeFilter === 'High'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white border border-line text-ink-muted hover:text-ink hover:bg-slate-50'
            )}
          >
            <span>High Impact</span>
            <span
              className={cn(
                'rounded-full px-1.5 py-0.2 text-[10px] font-extrabold',
                activeFilter === 'High' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
              )}
            >
              4
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('Medium')}
            className={cn(
              'rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-2',
              activeFilter === 'Medium'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white border border-line text-ink-muted hover:text-ink hover:bg-slate-50'
            )}
          >
            <span>Medium Impact</span>
            <span
              className={cn(
                'rounded-full px-1.5 py-0.2 text-[10px] font-extrabold',
                activeFilter === 'Medium' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'
              )}
            >
              5
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('Low')}
            className={cn(
              'rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-2',
              activeFilter === 'Low'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white border border-line text-ink-muted hover:text-ink hover:bg-slate-50'
            )}
          >
            <span>Low Impact</span>
            <span
              className={cn(
                'rounded-full px-1.5 py-0.2 text-[10px] font-extrabold',
                activeFilter === 'Low' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
              )}
            >
              3
            </span>
          </button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => showToast('Opening filters panel...')}
          className="rounded-xl border-line text-xs font-bold text-ink hover:bg-slate-50 gap-1.5"
        >
          <Filter size={14} />
          Filter
        </Button>
      </div>

      {/* Main Content Grid: Left 8 cols, Right 4 cols */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols): Suggestion Cards List */}
        <div className="lg:col-span-8 space-y-4">
          {filteredSuggestions.map((item) => {
            const Icon = item.icon
            const isExpanded = expandedId === item.id
            return (
              <Card
                key={item.id}
                className="overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all hover:border-slate-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border',
                        item.iconBg,
                        item.iconColor
                      )}
                    >
                      <Icon size={24} className="stroke-[2.2]" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-sm sm:text-base font-bold text-ink">
                          {item.title}
                        </h3>
                        <span
                          className={cn(
                            'rounded-md px-2 py-0.5 text-[10px] font-bold border',
                            item.impactColor
                          )}
                        >
                          {item.impact}
                        </span>
                      </div>

                      <p className="text-xs text-ink-muted leading-relaxed max-w-xl">
                        {item.description}
                      </p>

                      {item.example && (
                        <div className="rounded-xl border border-line/60 bg-slate-50/70 p-3 text-xs text-slate-700 font-mono">
                          {item.example}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => showToast(`Applying suggestion: ${item.title}`)}
                      className="rounded-xl text-xs font-bold text-brand-600 border-brand-200 hover:bg-brand-50"
                    >
                      Apply Suggestion
                    </Button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="p-1 text-slate-400 hover:text-ink transition-colors"
                    >
                      <ChevronDown
                        size={18}
                        className={cn('transition-transform duration-200', isExpanded && 'rotate-180')}
                      />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-line/60 text-xs text-slate-600 space-y-2">
                    <span className="font-bold text-ink">Action Plan:</span>
                    <p>
                      Clicking &quot;Apply Suggestion&quot; will automatically rewrite the affected resume section using AI and prompt you for final approval.
                    </p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Resume Score Donut */}
          <Card className="rounded-2xl border border-line bg-surface p-6 shadow-xs space-y-4">
            <span className="text-xs font-bold text-ink">Resume Score</span>
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
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-0.5">
                    Excellent
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-display text-xs font-bold text-ink leading-snug">
                  Great job! Your resume is strong.
                </h4>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  Keep optimizing to match top job descriptions.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/career?tab=resume-score')}
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 pt-1"
            >
              <span>View Detailed Analysis</span>
              <ArrowRight size={13} />
            </button>
          </Card>

          {/* Card 2: Suggestions Overview */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <h4 className="font-display text-sm font-bold text-ink">Suggestions Overview</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-line/40">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-purple-50 text-purple-600">
                    <List size={13} />
                  </div>
                  <span className="text-slate-700 font-medium">Total Suggestions</span>
                </div>
                <span className="font-display font-extrabold text-ink">12</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-line/40">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-rose-50 text-rose-600">
                    <ArrowRight size={13} className="-rotate-45" />
                  </div>
                  <span className="text-slate-700 font-medium">High Impact</span>
                </div>
                <span className="font-display font-extrabold text-ink">4</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-line/40">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-amber-50 text-amber-600">
                    <span className="font-bold text-xs">-</span>
                  </div>
                  <span className="text-slate-700 font-medium">Medium Impact</span>
                </div>
                <span className="font-display font-extrabold text-ink">5</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-50 text-blue-600">
                    <ArrowRight size={13} className="rotate-45" />
                  </div>
                  <span className="text-slate-700 font-medium">Low Impact</span>
                </div>
                <span className="font-display font-extrabold text-ink">3</span>
              </div>
            </div>
          </Card>

          {/* Card 3: Tips for Best Results */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Lightbulb size={14} />
              </div>
              <h4 className="font-display text-sm font-bold text-ink">Tips for Best Results</h4>
            </div>

            <ol className="space-y-2 text-xs text-ink-muted pl-4 list-decimal">
              <li>Review each suggestion carefully</li>
              <li>Apply changes that are relevant</li>
              <li>Keep your resume concise and clear</li>
              <li>Update your resume regularly</li>
            </ol>
          </Card>

          {/* Card 4: Get Expert Resume Review CTA */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
            <div className="space-y-1">
              <h4 className="font-display text-sm font-bold text-ink">
                Get Expert Resume Review
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Let our experts review your resume and provide personalized feedback.
              </p>
            </div>

            <div className="flex justify-center py-2">
              {/* Illustration of checklist with magnifying glass */}
              <div className="relative flex h-24 w-28 items-center justify-center rounded-xl bg-purple-50 border border-purple-100 p-2">
                <FileCheck size={44} className="text-purple-600" />
                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm">
                  <Star size={14} />
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => showToast('Opening Expert Resume Review request...')}
              className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-2.5 shadow-sm"
            >
              Get Reviewed
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

