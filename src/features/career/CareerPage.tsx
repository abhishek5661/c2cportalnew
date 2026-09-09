import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  FileCheck,
  FileText,
  Github,
  Linkedin,
  MessageSquare,
  Sparkles,
  Star,
  Target,
  UserCheck,
  Users,
  Video,
  Zap,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ProgressRing } from '../../components/ui/Progress'
import { cn } from '../../lib/cn'
import { ResumePortfolioPage } from './ResumePortfolioPage'
import { CareerOverviewPage } from './CareerOverviewPage'
import { CompanyReadinessPage } from './CompanyReadinessPage'
import { ResumeScorePage } from './ResumeScorePage'
import { ResumeSuggestionsPage } from './ResumeSuggestionsPage'
import { ResumeBuilderPage } from './ResumeBuilderPage'

const companyPacks = [
  {
    company: 'Google',
    role: 'Software Engineer (L3 / Early Career)',
    hiringProcess: 'OA -> 3 Tech Rounds (DSA) -> Googliness',
    techFocus: 'Advanced DSA, Graphs, Dynamic Programming, Time Complexity',
    questionCount: 45,
    matchScore: 92,
  },
  {
    company: 'Microsoft',
    role: 'Software Development Engineer (SDE-1)',
    hiringProcess: 'Online Assessment -> 3-4 Rounds DSA + LLD / OOPs',
    techFocus: 'Trees, Strings, Dynamic Programming, OOPs Design',
    questionCount: 38,
    matchScore: 88,
  },
  {
    company: 'Amazon',
    role: 'SDE-1',
    hiringProcess: 'OA (2 questions) -> 3 Technical + Leadership Principles',
    techFocus: '16 Leadership Principles, Heaps, Hashing, System Scalability',
    questionCount: 52,
    matchScore: 84,
  },
  {
    company: 'Razorpay / Atlassian',
    role: 'Backend Engineer',
    hiringProcess: 'Machine Coding (2.5h) -> Problem Solving -> Architecture',
    techFocus: 'Clean Code, Concurrency, RESTful APIs, DB Locking',
    questionCount: 30,
    matchScore: 80,
  },
]

export function CareerPage() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const qTab = queryParams.get('tab')

  // If on overview or no tab specified, render CareerOverviewPage (matching media_1788780706821.png)
  if (!qTab || qTab === 'overview') {
    return <CareerOverviewPage />
  }

  // Company Readiness (media_1788845031150.png)
  if (qTab === 'company-readiness') {
    return <CompanyReadinessPage />
  }

  // Resume Suggestions (media_1788845031159.png)
  if (qTab === 'resume-suggestions' || qTab === 'suggestions') {
    return <ResumeSuggestionsPage />
  }

  // Resume Builder / Edit Resume (media_1788845031177.png)
  if (qTab === 'resume-builder' || qTab === 'builder' || qTab === 'edit-resume') {
    return <ResumeBuilderPage />
  }

  // Resume Score (media_1788845031192.png)
  if (qTab === 'resume-score' || qTab === 'score') {
    return <ResumeScorePage />
  }

  // If on resume / portfolio / templates / ats-check, render ResumePortfolioPage
  if (qTab === 'resume' || qTab === 'portfolio' || qTab === 'templates' || qTab === 'ats-check' || qTab === 'history') {
    return <ResumePortfolioPage />
  }

  const [activeTab, setActiveTab] = useState<'resume' | 'interviews' | 'companies' | 'placement'>(
    qTab === 'interviews' ? 'interviews' : qTab === 'companies' ? 'companies' : 'placement'
  )

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-900 via-indigo-900 to-navy-950 p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
            <Briefcase size={13} className="text-blue-400" />
            Pillar 5: Career Preparation Track
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Career Preparation &amp; Placement Readiness
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Convert coding and engineering ability into high-impact job offers. Build ATS-proof resumes, optimize your GitHub &amp; LinkedIn branding, practice technical mock interviews, and master company-specific hiring bars.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            {[
              { id: 'resume', label: 'ATS Resume & Portfolio' },
              { id: 'interviews', label: 'Mock Interviews' },
              { id: 'companies', label: 'Company Hiring Packs' },
              { id: 'placement', label: 'Placement Training (HR & GD)' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as any)}
                className={cn(
                  'rounded-xl px-4 py-2 text-xs font-bold transition-all',
                  activeTab === t.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB 1: ATS Resume & Portfolio */}
      {activeTab === 'resume' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* ATS Score Card */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="rounded-2xl border border-line bg-surface p-5 space-y-4">
              <h3 className="font-display text-sm font-bold text-ink">
                ATS Resume Score
              </h3>

              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center">
                  <ProgressRing value={88} size={84} strokeWidth={7} caption="Score" />
                  <span className="absolute font-display text-base font-bold text-ink">
                    88<span className="text-[10px] text-ink-muted">/100</span>
                  </span>
                </div>
                <div className="text-xs">
                  <span className="inline-block rounded-md bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 text-[10px]">
                    ATS Optimized
                  </span>
                  <p className="font-display text-xs font-bold text-ink mt-1">
                    Industry-Ready Format
                  </p>
                  <p className="text-[11px] text-ink-muted">
                    Scans clean on Workday, Lever &amp; Greenhouse.
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                <div className="flex items-center justify-between text-ink-muted">
                  <span>Action Verbs &amp; Impact Metrics</span>
                  <span className="font-bold text-emerald-600">✓ Pass</span>
                </div>
                <div className="flex items-center justify-between text-ink-muted">
                  <span>Single-Column Standard Layout</span>
                  <span className="font-bold text-emerald-600">✓ Pass</span>
                </div>
                <div className="flex items-center justify-between text-ink-muted">
                  <span>Keyword Density (DSA/Dev)</span>
                  <span className="font-bold text-emerald-600">92% Match</span>
                </div>
              </div>

              <Button
                size="sm"
                className="w-full bg-blue-600 text-white text-xs mt-2"
                leadingIcon={<Download size={14} />}
              >
                Download ATS Resume PDF
              </Button>
            </Card>

            {/* GitHub & LinkedIn Audit */}
            <Card className="rounded-2xl border border-line bg-surface p-5 space-y-3">
              <h3 className="font-display text-sm font-bold text-ink">
                GitHub &amp; Portfolio Health
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-subtle border border-line">
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <Github size={14} /> Pinned Repositories (4/4)
                  </span>
                  <span className="text-emerald-600 font-bold">Clean</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-subtle border border-line">
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <Linkedin size={14} /> Profile Headline &amp; About
                  </span>
                  <span className="text-blue-600 font-bold">Optimized</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-surface-subtle border border-line">
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <FileCheck size={14} /> Live Project URLs
                  </span>
                  <span className="text-emerald-600 font-bold">Verified</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Resume Sections Preview */}
          <div className="lg:col-span-8 space-y-4">
            <Card className="rounded-2xl border border-line bg-surface p-6 space-y-5">
              <div className="border-b border-line pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="font-display text-base font-bold text-ink">
                    Ananya Sharma
                  </h2>
                  <p className="text-xs text-ink-muted">
                    B.Tech Computer Science (2024–2028) • Bengaluru, India • ananya@example.com
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-700">
                    github.com/ananya
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-700">
                    linkedin.com/in/ananya
                  </span>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="space-y-1.5">
                <h4 className="font-display text-xs font-black uppercase text-blue-700 tracking-wide">
                  Technical Skills
                </h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  <strong className="text-ink">Languages:</strong> Python, C++, TypeScript, SQL <br />
                  <strong className="text-ink">Core:</strong> Data Structures &amp; Algorithms, OOPs, DBMS, Operating Systems, Computer Networks <br />
                  <strong className="text-ink">Frameworks &amp; Tools:</strong> React, Node.js, Express, Docker, Git, Linux, PostgreSQL, Redis
                </p>
              </div>

              {/* Projects */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-display text-xs font-black uppercase text-blue-700 tracking-wide">
                  Featured Projects
                </h4>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-ink">
                    <span>Full Stack Real-Time Collaboration Hub</span>
                    <span className="text-ink-muted font-normal">Next.js, WebSockets, PostgreSQL</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-ink-muted space-y-0.5">
                    <li>Engineered multi-user collaborative whiteboard supporting concurrent users with sub-50ms latency.</li>
                    <li>Designed PostgreSQL schema with Prisma ORM, utilizing Redis caching for real-time presence sync.</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: Mock Interviews */}
      {activeTab === 'interviews' && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                type: 'DSA & Problem Solving',
                mentor: 'Rahul Verma · Ex-Google SWE',
                duration: '60 mins',
                focus: 'Binary Trees, Graphs, Complexity Analysis',
                rating: '4.9/5',
                nextSlot: 'Tomorrow at 6:00 PM',
              },
              {
                type: 'System Design & Architecture',
                mentor: 'Priya Sharma · Senior Architect at Uber',
                duration: '60 mins',
                focus: 'Microservices, Caching, Scaling APIs, DB Sharding',
                rating: '5.0/5',
                nextSlot: 'Thursday at 8:00 PM',
              },
              {
                type: 'HR & Behavioral (STAR Method)',
                mentor: 'Aman Saxena · Tech Recruiter',
                duration: '45 mins',
                focus: 'Leadership Principles, Conflict Resolution, Salary Prep',
                rating: '4.8/5',
                nextSlot: 'Saturday at 11:00 AM',
              },
            ].map((mock, idx) => (
              <Card key={idx} className="rounded-2xl border border-line bg-surface p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
                    <UserCheck size={18} />
                  </span>
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                    <Star size={12} className="fill-amber-400" /> {mock.rating}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-sm font-bold text-ink">{mock.type}</h4>
                  <p className="text-xs font-medium text-blue-600 mt-0.5">{mock.mentor}</p>
                  <p className="text-[11px] text-ink-muted mt-1 leading-snug">Focus: {mock.focus}</p>
                  <p className="text-[11px] text-slate-600 mt-2 font-semibold">
                    <Clock size={12} className="inline mr-1" /> Next: {mock.nextSlot}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Button size="sm" className="w-full bg-blue-600 text-white text-xs">
                    Book Mock Session
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Company Hiring Packs */}
      {activeTab === 'companies' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {companyPacks.map((comp) => (
            <Card key={comp.company} className="rounded-2xl border border-line bg-surface p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-blue-600" />
                  <h3 className="font-display text-base font-bold text-ink">{comp.company}</h3>
                </div>
                <span className="rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs font-bold border border-emerald-200">
                  {comp.matchScore}% Match
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <p className="text-ink font-semibold">{comp.role}</p>
                <p className="text-ink-muted">
                  <strong className="text-slate-700">Interview Process:</strong> {comp.hiringProcess}
                </p>
                <p className="text-ink-muted">
                  <strong className="text-slate-700">Core Focus:</strong> {comp.techFocus}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-ink-muted">
                  {comp.questionCount} Curated Questions
                </span>
                <Button variant="secondary" size="sm" className="text-xs">
                  Explore Pack
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 4: Placement Training */}
      {activeTab === 'placement' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Group Discussion (GD) Masterclass',
              desc: 'Learn topic frameworks, entry phrases, body language, and voice modulation for corporate recruitment rounds.',
              modules: '6 Modules · 1.5 hrs',
            },
            {
              title: 'HR Behavioral STAR Formulation',
              desc: 'Format your project stories and leadership examples into crisp Situation-Task-Action-Result narratives.',
              modules: '12 Examples · 1 hr',
            },
            {
              title: 'Offer Evaluation & Salary Negotiation',
              desc: 'Understand base pay, stock options (ESOPs/RSUs), joining bonuses, and professional counter-offer communication.',
              modules: '5 Templates · 45 mins',
            },
          ].map((item, idx) => (
            <Card key={idx} className="rounded-2xl border border-line bg-surface p-5 space-y-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Award size={18} />
              </span>
              <h4 className="font-display text-sm font-bold text-ink">{item.title}</h4>
              <p className="text-xs text-ink-muted leading-relaxed">{item.desc}</p>
              <p className="text-[11px] font-mono text-blue-600 font-semibold pt-1">
                {item.modules}
              </p>
              <Button variant="secondary" size="sm" className="w-full text-xs mt-2">
                Start Module
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
