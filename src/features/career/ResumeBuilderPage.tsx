import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileCode,
  FileText,
  GripVertical,
  HelpCircle,
  Layers,
  Lightbulb,
  Link2,
  MapPin,
  MoreVertical,
  Pencil,
  Plus,
  RefreshCw,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'

interface ExperienceItem {
  id: string
  company: string
  companyInitials: string
  companyColor: string
  role: string
  period: string
  location: string
  isCurrent?: boolean
  responsibilities: string[]
  technologies: string[]
}

const initialExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'TechNova Solutions',
    companyInitials: 'T',
    companyColor: 'bg-blue-600 text-white',
    role: 'Software Engineer',
    period: 'Jun 2022 – Present',
    location: 'Bengaluru, India',
    isCurrent: true,
    responsibilities: [
      'Developed and maintained scalable web applications using React.js, Node.js and MongoDB.',
      'Collaborated with cross-functional teams to define, design and ship new features.',
      'Improved application performance by 30% by optimizing database queries and implementing caching.',
      'Integrated RESTful APIs and third-party services to enhance application functionality.',
    ],
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'AWS', 'Docker', 'Git'],
  },
  {
    id: 'exp-2',
    company: 'CodeDash Technologies',
    companyInitials: 'CD',
    companyColor: 'bg-purple-600 text-white',
    role: 'Software Development Intern',
    period: 'Jan 2021 – May 2022',
    location: 'Remote',
    isCurrent: false,
    responsibilities: [
      'Built responsive UI components and pages using HTML, CSS, JavaScript and React.',
      'Assisted in developing REST APIs and integrating frontend with backend services.',
      'Fixed bugs and improved existing features based on user feedback.',
      'Participated in code reviews and contributed to team knowledge sharing sessions.',
    ],
    technologies: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'Git'],
  },
  {
    id: 'exp-3',
    company: 'LearnIt Labs',
    companyInitials: 'LI',
    companyColor: 'bg-emerald-600 text-white',
    role: 'Web Development Intern',
    period: 'Jun 2020 – Dec 2020',
    location: 'Remote',
    isCurrent: false,
    responsibilities: [
      'Developed static and dynamic websites for client projects.',
      'Worked on front-end development and improved site responsiveness.',
      'Assisted in content updates and performance optimization.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'WordPress'],
  },
]

export function ResumeBuilderPage() {
  const navigate = useNavigate()
  const [resumeTitle, setResumeTitle] = useState('Software Engineer Resume')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [activeSection, setActiveSection] = useState('Experience')
  const [experiences, setExperiences] = useState<ExperienceItem[]>(initialExperiences)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleDeleteExperience = (id: string, name: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id))
    showToast(`Removed ${name} from experience`)
  }

  const sections = [
    'Basic Info',
    'Summary',
    'Experience',
    'Education',
    'Skills',
    'Projects',
    'Certifications',
    'Achievements',
    'Additional',
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
        <span className="text-ink-muted">Resume Builder</span>
        <ChevronRight size={13} className="text-slate-400" />
        <span className="font-bold text-ink">Edit Resume</span>
      </nav>

      {/* Top Header Bar */}
      <Card className="rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {isEditingTitle ? (
              <input
                type="text"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                autoFocus
                className="font-display text-xl sm:text-2xl font-extrabold text-ink border-b-2 border-brand-600 bg-transparent focus:outline-none"
              />
            ) : (
              <div className="flex items-center gap-2.5">
                <h1 className="font-display text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                  {resumeTitle}
                </h1>
                <button
                  type="button"
                  onClick={() => setIsEditingTitle(true)}
                  className="rounded-lg p-1 text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors"
                >
                  <Pencil size={16} />
                </button>
              </div>
            )}
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 border border-emerald-200">
              Live
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle2 size={14} />
              Saved just now
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast('Generating preview modal...')}
              className="rounded-xl border-line text-xs font-bold text-ink hover:bg-slate-50 gap-1.5"
            >
              <Eye size={14} />
              Preview
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => showToast('Downloading resume PDF...')}
              className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold gap-1.5 shadow-sm px-4"
            >
              <Download size={14} />
              Download
            </Button>

            <button
              type="button"
              onClick={() => showToast('Resume settings options')}
              className="rounded-xl border border-line p-2 text-slate-500 hover:text-ink hover:bg-slate-50 transition-colors"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4 overflow-x-auto">
          {sections.map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => setActiveSection(sec)}
              className={cn(
                'relative px-3.5 py-2 text-xs font-bold rounded-lg transition-all shrink-0',
                activeSection === sec
                  ? 'text-brand-600 bg-brand-50/80 font-extrabold'
                  : 'text-ink-muted hover:text-ink hover:bg-slate-50'
              )}
            >
              {sec}
              {activeSection === sec && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Main Grid: Left 8 cols, Right 4 cols */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols): Work Experience Editor */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="rounded-2xl border border-line bg-surface p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold text-ink">
                  Work Experience
                </h3>
                <p className="text-xs text-ink-muted">
                  Add your work experience in reverse chronological order.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Opening Add Experience form...')}
                className="rounded-xl border-brand-200 text-brand-600 hover:bg-brand-50 text-xs font-bold gap-1.5"
              >
                <Plus size={14} />
                Add Experience
              </Button>
            </div>

            {/* Experience Cards List */}
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="group rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all hover:border-slate-300 space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      {/* Drag Handle */}
                      <button
                        type="button"
                        className="cursor-grab text-slate-300 hover:text-slate-500 pt-1"
                      >
                        <GripVertical size={16} />
                      </button>

                      {/* Company Logo Badge */}
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display font-extrabold text-xs shadow-2xs',
                          exp.companyColor
                        )}
                      >
                        {exp.companyInitials}
                      </div>

                      {/* Role & Company Header */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-sm font-bold text-ink">
                            {exp.company}
                          </h4>
                        </div>
                        <p className="text-xs font-semibold text-slate-700">
                          {exp.role}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-ink-muted pt-0.5">
                          <span>{exp.period}</span>
                          <span>•</span>
                          <span>{exp.location}</span>
                          {exp.isCurrent && (
                            <span className="rounded-full bg-emerald-50 px-2 py-0.2 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => showToast(`Editing experience at ${exp.company}...`)}
                        className="rounded-lg p-1.5 text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteExperience(exp.id, exp.company)}
                        className="rounded-lg p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="space-y-1.5 pl-8">
                    <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">
                      Key Responsibilities
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700 leading-relaxed">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-slate-400 font-bold">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies Used */}
                  <div className="space-y-1.5 pl-8">
                    <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider block">
                      Technologies Used
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-line bg-slate-50/80 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Rail Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Experience Tips */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb size={16} className="text-purple-600" />
                <h4 className="font-display text-sm font-bold text-ink">Experience Tips</h4>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening writing guide...')}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:text-brand-700"
              >
                <span>View Guide</span>
                <ExternalLink size={12} />
              </button>
            </div>

            <ul className="space-y-2 text-xs text-ink-muted pl-4 list-disc leading-relaxed">
              <li>Use action verbs and quantify your achievements.</li>
              <li>Focus on your impact, not just your responsibilities.</li>
              <li>List experiences in reverse chronological order.</li>
            </ul>
          </Card>

          {/* Card 2: Suggestions Score & Checklist */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-purple-600" />
              <h4 className="font-display text-sm font-bold text-ink">Suggestions</h4>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-50 text-emerald-700 font-display font-black text-sm">
                85
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Good start! Implement the suggestions below to improve your score.
              </p>
            </div>

            <div className="space-y-2 text-xs border-t border-line/60 pt-3">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <Check size={13} className="text-rose-500 stroke-[3]" />
                  <span className="text-slate-700 font-medium">Add measurable achievements</span>
                </div>
                <span className="rounded bg-rose-50 px-2 py-0.5 text-[9px] font-bold text-rose-700 border border-rose-200">
                  High
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-500 stroke-[3]" />
                  <span className="text-slate-700 font-medium">Use strong action verbs</span>
                </div>
                <span className="rounded bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-700 border border-amber-200">
                  Medium
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <Check size={13} className="text-amber-500 stroke-[3]" />
                  <span className="text-slate-700 font-medium">Add more technical skills</span>
                </div>
                <span className="rounded bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-700 border border-amber-200">
                  Medium
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-500 stroke-[3]" />
                  <span className="text-slate-700 font-medium">Improve summary section</span>
                </div>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                  Completed
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <Check size={13} className="text-blue-500 stroke-[3]" />
                  <span className="text-slate-700 font-medium">Add projects to showcase work</span>
                </div>
                <span className="rounded bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700 border border-blue-200">
                  Low
                </span>
              </div>
            </div>
          </Card>

          {/* Card 3: Your Progress */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-ink">
              <span>Your Progress</span>
              <span>80%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-brand-600" style={{ width: '80%' }} />
            </div>
            <p className="text-[11px] text-ink-muted">
              Great progress! Keep building your professional profile.
            </p>
          </Card>

          {/* Card 4: Quick Actions */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
            <h4 className="font-display text-sm font-bold text-ink">Quick Actions</h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => showToast('Previewing full resume...')}
                className="w-full flex items-center justify-between rounded-xl border border-line/60 p-3 text-xs font-semibold text-ink hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <FileText size={15} />
                  </div>
                  <div>
                    <span className="font-bold text-ink block">Preview Full Resume</span>
                    <span className="text-[10px] text-ink-muted">See how your resume looks</span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => showToast('Downloading resume as PDF...')}
                className="w-full flex items-center justify-between rounded-xl border border-line/60 p-3 text-xs font-semibold text-ink hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Download size={15} />
                  </div>
                  <div>
                    <span className="font-bold text-ink block">Download as PDF</span>
                    <span className="text-[10px] text-ink-muted">Download resume in PDF format</span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => showToast('Requesting AI Resume Review...')}
                className="w-full flex items-center justify-between rounded-xl border border-line/60 p-3 text-xs font-semibold text-ink hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Sparkles size={15} />
                  </div>
                  <div>
                    <span className="font-bold text-ink block">Get AI Review</span>
                    <span className="text-[10px] text-ink-muted">Get AI feedback on your resume</span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => showToast('Share link copied to clipboard!')}
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
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

