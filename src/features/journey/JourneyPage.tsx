import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Cpu,
  FileText,
  Flame,
  FolderGit2,
  GitBranch,
  Github,
  GraduationCap,
  Heart,
  HelpCircle,
  Layers,
  Layout,
  Lightbulb,
  Linkedin,
  Mail,
  Medal,
  MessageSquare,
  Network,
  Presentation,
  RefreshCw,
  Repeat,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  Terminal,
  Trophy,
  UserCheck,
  Users,
  Video,
  Zap,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { fourYearRoadmap, weeklyRitual } from '../../data/mock'

export function JourneyPage() {
  const [activeYearHighlight, setActiveYearHighlight] = useState<number | null>(null)

  const yearOverview = fourYearRoadmap.map((yearInfo) => ({
    ...yearInfo,
    accent:
      yearInfo.year === 1
        ? 'emerald'
        : yearInfo.year === 2
          ? 'amber'
          : yearInfo.year === 3
            ? 'rose'
            : 'purple',
  }))

  return (
    <div className="min-h-full space-y-6 pb-16">
      {/* Top Controller: Year Filter & Quick Practice Link */}
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold text-xs">
            Y{activeYearHighlight ?? 'All'}
          </span>
          <div>
            <h2 className="font-display text-xs font-bold text-ink">
              Interactive 4-Year Journey Map
            </h2>
            <p className="text-[11px] text-ink-muted">
              Filter by engineering year or view the holistic intervention framework.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-xl border border-line bg-surface-subtle p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveYearHighlight(null)}
              className={cn(
                'rounded-lg px-2.5 py-1 font-semibold transition-colors',
                activeYearHighlight === null
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-ink-muted hover:text-ink',
              )}
            >
              All Years
            </button>
            {[1, 2, 3, 4].map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setActiveYearHighlight(y)}
                className={cn(
                  'rounded-lg px-2.5 py-1 font-semibold transition-colors',
                  activeYearHighlight === y
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-ink-muted hover:text-ink',
                )}
              >
                Year {y}
              </button>
            ))}
          </div>

          <Link
            to="/master"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            Start Today&apos;s Practice <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {yearOverview.map((yearInfo) => {
          const isActive = activeYearHighlight === null || activeYearHighlight === yearInfo.year
          const accentStyles = {
            emerald: 'border-emerald-200 bg-emerald-50/70 text-emerald-950',
            amber: 'border-amber-200 bg-amber-50/70 text-amber-950',
            rose: 'border-rose-200 bg-rose-50/70 text-rose-950',
            purple: 'border-purple-200 bg-purple-50/70 text-purple-950',
          }

          return (
            <button
              key={yearInfo.year}
              type="button"
              onClick={() => setActiveYearHighlight(yearInfo.year)}
              className={cn(
                'rounded-2xl border p-3 text-left transition-all duration-200 shadow-xs',
                accentStyles[yearInfo.accent as keyof typeof accentStyles],
                isActive ? 'scale-[1.01] ring-2 ring-blue-200 shadow-md' : 'opacity-70 hover:opacity-100',
              )}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-sm font-black shadow-xs">
                  {yearInfo.year}
                </span>
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-slate-700">
                  {yearInfo.badge}
                </span>
              </div>

              <h3 className="font-display text-sm font-black uppercase leading-snug">
                {yearInfo.title}
              </h3>

              <ul className="mt-3 space-y-1.5 text-[10px] font-medium leading-snug">
                {yearInfo.outcomes.slice(0, 3).map((outcome) => (
                  <li key={outcome} className="flex items-start gap-1.5">
                    <span className="mt-0.5 text-[11px]">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>

      {activeYearHighlight === null ? (
        <div className="rounded-3xl border border-slate-200 bg-[#FDFEFE] p-4 sm:p-6 lg:p-8 shadow-sm space-y-8">
          <div className="rounded-2xl border-2 border-blue-600/70 bg-white p-4 text-center shadow-xs">
            <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#071633] uppercase">
              COMPLETE 4-YEAR INTERVENTION FRAMEWORK
            </h1>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm font-extrabold tracking-wide">
              <span className="text-blue-700">LEARN</span>
              <span className="text-slate-400">•</span>
              <span className="text-rose-600">SOLVE</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-600">BUILD</span>
              <span className="text-slate-400">•</span>
              <span className="text-blue-700">COMPETE</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-700">PRESENT</span>
              <span className="text-slate-400">•</span>
              <span className="text-teal-700">REFLECT</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-600">IMPROVE</span>
              <span className="text-blue-600 ml-1">(REPEAT)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-2xl border-2 border-purple-400/80 bg-purple-50/20 p-4 space-y-3.5 shadow-xs">
                <div className="inline-flex items-center gap-2 rounded-xl border border-purple-300 bg-purple-100/70 px-3 py-1 text-xs font-black text-purple-900 shadow-xs">
                  <Code2 size={15} className="text-purple-700" />
                  1. CORE SKILLS <span className="text-[10px] font-bold text-purple-700">(MUST HAVE)</span>
                </div>

                <div className="rounded-xl border border-purple-200 bg-white p-3 space-y-1.5">
                  <h4 className="font-display text-[11px] font-black tracking-wide text-purple-900 uppercase">
                    DSA &amp; Problem Solving
                  </h4>
                  <ul className="space-y-0.5 text-[11px] text-slate-700">
                    <li>• Arrays, Strings, Math</li>
                    <li>• Recursion, Backtracking</li>
                    <li>• Hashing, Two Pointers</li>
                    <li>• Stack, Queue, Deque</li>
                    <li>• Linked List</li>
                    <li>• Trees, BST, Heaps</li>
                    <li>• Graphs</li>
                    <li>• DP, Greedy</li>
                    <li>• System Design (Basics)</li>
                    <li>• Advanced DSA</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-purple-200 bg-white p-3 space-y-1.5">
                  <h4 className="font-display text-[11px] font-black tracking-wide text-purple-900 uppercase">
                    Programming
                  </h4>
                  <ul className="space-y-0.5 text-[11px] text-slate-700">
                    <li>• Strong in 1+ Language (C++/Java/Python)</li>
                    <li>• OOPs Concepts</li>
                    <li>• STL / Collections</li>
                    <li>• Debugging Skills</li>
                    <li>• Code Quality</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-purple-200 bg-white p-3 space-y-1.5">
                  <h4 className="font-display text-[11px] font-black tracking-wide text-purple-900 uppercase">
                    CS Fundamentals
                  </h4>
                  <ul className="space-y-0.5 text-[11px] text-slate-700">
                    <li>• DBMS (SQL, Normalization)</li>
                    <li>• Operating Systems</li>
                    <li>• Computer Networks</li>
                    <li>• Computer Architecture</li>
                    <li>• Theory of Computation</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-purple-200 bg-white p-3 space-y-1.5">
                  <h4 className="font-display text-[11px] font-black tracking-wide text-purple-900 uppercase">
                    Development Skills
                  </h4>
                  <ul className="space-y-0.5 text-[11px] text-slate-700">
                    <li>• HTML, CSS, JavaScript</li>
                    <li>• Frontend / Backend</li>
                    <li>• APIs &amp; REST</li>
                    <li>• Databases (SQL &amp; NoSQL)</li>
                    <li>• Git &amp; GitHub</li>
                    <li>• Testing &amp; Debugging</li>
                    <li>• Agile / SDLC</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-purple-200 bg-white p-3 space-y-1.5">
                  <h4 className="font-display text-[11px] font-black tracking-wide text-purple-900 uppercase">
                    Tools &amp; Technologies
                  </h4>
                  <ul className="space-y-0.5 text-[11px] text-slate-700">
                    <li>• Linux Basics</li>
                    <li>• Docker</li>
                    <li>• CI/CD</li>
                    <li>• Cloud (AWS/GCP Basics)</li>
                    <li>• VS Code, Postman, etc.</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-purple-200 bg-white p-3 space-y-1.5">
                  <h4 className="font-display text-[11px] font-black tracking-wide text-purple-900 uppercase">
                    Frontier Technologies
                  </h4>
                  <ul className="space-y-0.5 text-[11px] text-slate-700">
                    <li>• AI / ML Basics</li>
                    <li>• Generative AI &amp; LLMs</li>
                    <li>• Data Science</li>
                    <li>• Cloud Native</li>
                    <li>• DevOps</li>
                    <li>• Cybersecurity Basics</li>
                    <li>• Blockchain / Web3 (Basics)</li>
                    <li>• IoT (Basics)</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-blue-400/80 bg-blue-50/20 p-4 space-y-3.5 shadow-xs">
                <div className="inline-flex items-center gap-2 rounded-xl border border-blue-300 bg-blue-100/70 px-3 py-1 text-xs font-black text-blue-900 shadow-xs">
                  <Briefcase size={15} className="text-blue-700" />
                  5. CAREER PREPARATION
                </div>

                <div className="space-y-2">
                  {[
                    { title: 'RESUME BUILDING', icon: FileText, desc: 'Impactful, ATS Friendly, Projects, Skills, Achievements' },
                    { title: 'GITHUB & PORTFOLIO', icon: Github, desc: 'Clean, Organized, Well Documented' },
                    { title: 'LINKEDIN BRANDING', icon: Linkedin, desc: 'Headline, About, Experience, Projects, Posts' },
                    { title: 'APTITUDE & REASONING', icon: Target, desc: 'Quant, Logical, Verbal' },
                    { title: 'MOCK INTERVIEWS', icon: Users, desc: 'Technical + HR + Managerial' },
                    { title: 'COMPANY PREPARATION', icon: Building2, desc: 'Onboarding Process, Culture, Tech Stack, Recent Updates' },
                    { title: 'PLACEMENT TRAINING', icon: Award, desc: 'Group Discussions, HR Rounds, Salary Negotiation' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl border border-blue-200 bg-white p-2.5 hover:border-blue-300 transition-colors"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                        <item.icon size={14} />
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-display text-[11px] font-black text-blue-950">{item.title}</h4>
                        <p className="text-[10px] text-slate-600 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl border-2 border-orange-400/80 bg-orange-50/20 p-4 space-y-3 shadow-xs">
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-orange-300 bg-orange-100/70 px-3 py-1 text-xs font-black text-orange-950 shadow-xs">
                    <UserCheck size={15} className="text-orange-700" />
                    2. PERSONAL &amp; PROFESSIONAL SKILLS
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {[
                    { label: 'Communication', icon: MessageSquare },
                    { label: 'Presentation', icon: Presentation },
                    { label: 'Confidence Building', icon: Award },
                    { label: 'Time Management', icon: Clock },
                    { label: 'Teamwork & Collaboration', icon: Users },
                    { label: 'Leadership', icon: Star },
                    { label: 'Interview Skills', icon: Users },
                    { label: 'Resume & LinkedIn', icon: FileText },
                    { label: 'Email & Professional Etiquette', icon: Mail },
                    { label: 'Problem Solving Mindset', icon: Lightbulb },
                    { label: 'Adaptability & Learning Agility', icon: RefreshCw },
                  ].map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-3 py-1.5 text-xs font-bold text-orange-950 shadow-xs"
                    >
                      <skill.icon size={13} className="text-orange-600 shrink-0" />
                      <span className="truncate">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex flex-col items-center justify-center p-6 text-center">
                <div className="relative flex flex-col items-center justify-center rounded-full border-4 border-blue-600/80 bg-gradient-to-tr from-white via-blue-50/60 to-white px-8 py-7 shadow-lg max-w-sm w-full">
                  <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                    <GraduationCap size={28} />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-black tracking-tight text-[#071633] uppercase leading-tight">
                    ENGINEERING STUDENT <br />
                    <span className="text-blue-600 font-extrabold text-sm lowercase tracking-normal">To</span> <br />
                    INDUSTRY-READY ENGINEER
                  </h3>
                  <p className="mt-1 text-[11px] font-extrabold tracking-wider uppercase text-blue-700">
                    4 YEAR CONTINUOUS GROWTH JOURNEY
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-blue-400/80 bg-white overflow-hidden shadow-xs">
                <div className="bg-blue-50/70 border-b border-blue-200 px-4 py-2.5 text-center">
                  <span className="inline-block rounded-lg bg-blue-600 text-white px-3 py-1 text-xs font-black tracking-wider">
                    7. 4-YEAR JOURNEY ROADMAP
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-xs">
                    <thead>
                      <tr className="border-b border-blue-100 bg-slate-50/70 text-slate-700 font-extrabold text-[10px] uppercase">
                        <th className="px-3 py-2 text-center w-12">Year</th>
                        <th className="px-3 py-2 text-left w-28">Focus</th>
                        <th className="px-3 py-2 text-left">Technical</th>
                        <th className="px-3 py-2 text-left">Experiences</th>
                        <th className="px-3 py-2 text-left">Outcomes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {fourYearRoadmap.map((row) => {
                        const isHighlighted = activeYearHighlight === row.year
                        return (
                          <tr
                            key={row.year}
                            className={cn(
                              'transition-colors',
                              isHighlighted ? 'bg-blue-50/80 font-semibold' : 'hover:bg-slate-50/50',
                            )}
                          >
                            <td className="px-3 py-3 text-center">
                              <span
                                className={cn(
                                  'inline-flex h-7 w-7 items-center justify-center rounded-full font-black text-sm',
                                  row.year === 1 && 'bg-emerald-100 text-emerald-800',
                                  row.year === 2 && 'bg-amber-100 text-amber-800',
                                  row.year === 3 && 'bg-rose-100 text-rose-800',
                                  row.year === 4 && 'bg-purple-100 text-purple-800',
                                )}
                              >
                                {row.year}
                              </span>
                            </td>
                            <td className="px-3 py-3">
                              <span
                                className={cn(
                                  'font-display text-[11px] font-black uppercase leading-snug block',
                                  row.year === 1 && 'text-emerald-800',
                                  row.year === 2 && 'text-amber-800',
                                  row.year === 3 && 'text-rose-800',
                                  row.year === 4 && 'text-purple-800',
                                )}
                              >
                                {row.title}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-[11px] text-slate-700">
                              <ul className="space-y-0.5">
                                {row.technical.map((t, i) => (
                                  <li key={i}>• {t}</li>
                                ))}
                              </ul>
                            </td>
                            <td className="px-3 py-3 text-[11px] text-slate-700">
                              <ul className="space-y-0.5">
                                {row.experiences.map((exp, i) => (
                                  <li key={i}>• {exp}</li>
                                ))}
                              </ul>
                            </td>
                            <td className="px-3 py-3 text-[11px] text-slate-800 font-medium">
                              <ul className="space-y-0.5">
                                {row.outcomes.map((out, i) => (
                                  <li key={i} className="text-emerald-700 font-semibold">
                                    ✓ {out}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 space-y-2.5 shadow-xs">
                <div className="flex justify-center">
                  <span className="rounded-lg bg-slate-800 text-white px-3 py-1 text-xs font-black tracking-wider">
                    8. WEEKLY STUDENT RITUAL <span className="text-[10px] font-normal text-slate-300">(EXAMPLE)</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
                  {[
                    { day: 'MON', title: 'DSA Practice', sub: '1–2 Problems' },
                    { day: 'TUE', title: 'Development', sub: 'Work on Project' },
                    { day: 'WED', title: 'CS Concept +', sub: 'Revise DSA' },
                    { day: 'THU', title: 'Contest /', sub: 'Timed Practice' },
                    { day: 'FRI', title: 'Project /', sub: 'Feature Build' },
                    { day: 'SAT', title: 'Mock Interview /', sub: 'Presentation' },
                    { day: 'SUN', title: 'Review, Reflect,', sub: 'Plan Next Week' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-slate-50/60 p-2 text-center flex flex-col justify-between"
                    >
                      <span className="font-mono text-[11px] font-black text-blue-700 block border-b border-slate-200 pb-1">
                        {item.day}
                      </span>
                      <div className="pt-1.5">
                        <p className="font-display text-[10px] font-bold text-ink leading-tight">{item.title}</p>
                        <p className="text-[9px] text-ink-muted leading-tight mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border-2 border-blue-400/80 bg-blue-50/20 p-4 space-y-3 shadow-xs">
                <div className="flex justify-center">
                  <span className="rounded-lg bg-blue-600 text-white px-3 py-1 text-xs font-black tracking-wider">
                    9. END STATE (WHEN THEY GRADUATE)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
                  {[
                    { label: 'Strong DSA & Problem Solving', icon: Target },
                    { label: 'Build Any Software', icon: Terminal },
                    { label: 'Explain & Present Confidently', icon: Presentation },
                    { label: 'Adapt to Any Technology', icon: Brain },
                    { label: 'Industry Ready Mindset', icon: Award },
                    { label: 'Get Hired in Top Companies', icon: Briefcase },
                  ].map((cap, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center rounded-xl border border-blue-200 bg-white p-2.5 shadow-xs"
                    >
                      <cap.icon size={18} className="text-blue-600 mb-1.5" />
                      <span className="text-[10px] font-bold text-slate-800 leading-tight">{cap.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-2xl border-2 border-emerald-400/80 bg-emerald-50/20 p-4 space-y-3.5 shadow-xs">
                <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-100/70 px-3 py-1 text-xs font-black text-emerald-950 shadow-xs">
                  <Star size={15} className="text-emerald-700" />
                  3. EXPERIENCE BUILDING ACTIVITIES
                </div>

                <div className="space-y-2">
                  {[
                    { title: 'PROJECTS', icon: FolderGit2, items: ['Mini Projects (Year 1)', 'Full Stack Projects (Year 2)', 'Advanced Projects (Year 3)', 'Industry Grade Project (Year 4)'] },
                    { title: 'HACKATHONS', icon: Trophy, items: ['Internal College Hackathons', 'National Hackathons', 'Track & Theme Based', 'Build, Ship & Present'] },
                    { title: 'CODING CONTESTS', icon: Code2, items: ['Weekly Practice Contests', 'Bi-weekly Timed Contests', 'Platform Contests (Codeforces, LeetCode, CodeChef, etc.)', 'College Coding League'] },
                    { title: 'OPEN SOURCE', icon: GitBranch, items: ['Explore', 'Contribute', 'Create', 'Maintain'] },
                    { title: 'INTERNSHIPS', icon: Briefcase, items: ['Summer Internships', 'Part-time / Remote', 'Industry Exposure', 'Real World Problems'] },
                    { title: 'COMPETITIONS', icon: Medal, items: ['Tech Events', 'Paper Presentations', 'Case Studies', 'Innovation Challenges'] },
                    { title: 'COMMUNITY & NETWORKING', icon: Network, items: ['Tech Communities', 'Meetups & Workshops', 'Mentorship', 'LinkedIn Networking'] },
                    { title: 'TECHNICAL PRESENTATIONS', icon: Presentation, items: ['Project Demos', 'PPT Sessions', 'Explain Concepts', 'Peer Teaching'] },
                  ].map((act, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-white p-2.5 hover:border-emerald-300 transition-colors"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 mt-0.5">
                        <act.icon size={14} />
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-display text-[11px] font-black text-emerald-950">{act.title}</h4>
                        <ul className="text-[10px] text-slate-600 leading-snug space-y-0.5 mt-0.5">
                          {act.items.map((it, i) => (
                            <li key={i}>• {it}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border-2 border-rose-400/80 bg-rose-50/20 p-4 space-y-3.5 shadow-xs">
                <div className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-100/70 px-3 py-1 text-xs font-black text-rose-950 shadow-xs">
                  <Repeat size={15} className="text-rose-700" />
                  4. CONTINUOUS ASSESSMENT &amp; FEEDBACK LOOP
                </div>

                <div className="space-y-1.5 text-xs">
                  {[
                    { title: 'WEEKLY CHECK-INS', desc: 'Track progress, tiny goals', icon: Calendar },
                    { title: 'MONTHLY SKILL ASSESSMENTS', desc: 'DSA, Development, CS, Aptitude', icon: Award },
                    { title: 'PERFORMANCE ANALYTICS', desc: 'Strengths, Weaknesses, Trends', icon: Activity },
                    { title: 'PERSONALIZED LEARNING PATH', desc: 'AI-driven adaptive roadmap', icon: Brain },
                    { title: 'MENTOR FEEDBACK', desc: '1:1 Mentorship & Guidance', icon: UserCheck },
                    { title: 'PEER FEEDBACK', desc: 'Code Reviews, Project Reviews', icon: Users },
                    { title: 'IMPROVEMENT PLAN', desc: 'Focus Areas, Resources, Practice', icon: Target },
                    { title: 'REPEAT & LEVEL UP', desc: 'Consistent Improvement Cycle', icon: RefreshCw },
                  ].map((loop, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-white p-2 hover:border-rose-300 transition-colors"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                        <loop.icon size={13} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-[10px] font-black text-rose-950 leading-none">{loop.title}</p>
                        <p className="text-[9px] text-slate-600 mt-0.5 truncate">{loop.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border-2 border-amber-400/80 bg-amber-50/20 p-4 space-y-3.5 shadow-xs">
                <div className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-100/70 px-3 py-1 text-xs font-black text-amber-950 shadow-xs">
                  <Heart size={15} className="text-amber-700" />
                  6. INTERVENTION &amp; MOTIVATION SYSTEM
                </div>

                <div className="space-y-1.5 text-xs">
                  {[
                    { title: 'DAILY MICRO-CHALLENGES', desc: '5–20 mins practice' },
                    { title: 'STREAKS & BADGES', desc: 'Gamification to stay consistent' },
                    { title: 'LEADERBOARDS', desc: 'Healthy Competition' },
                    { title: 'ACHIEVEMENT UNLOCKS', desc: 'Milestones & Rewards' },
                    { title: 'REMINDERS & NUDGES', desc: 'Stay on track' },
                    { title: 'MOTIVATIONAL CONTENT', desc: 'Success Stories, Talks, Blogs' },
                    { title: 'MENTOR CONNECT', desc: 'Regular motivation & guidance' },
                    { title: 'STUDENT COMMUNITY', desc: 'Support, Collab, Grow Together' },
                  ].map((mot, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-amber-200 bg-white px-3 py-2 text-amber-950 shadow-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-display text-[10px] font-black leading-tight uppercase">{mot.title}</p>
                        <p className="text-[9px] text-slate-600 mt-0.5">{mot.desc}</p>
                      </div>
                      <Zap size={13} className="text-amber-500 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#061B40] border border-blue-600/40 p-4 sm:p-5 text-center shadow-lg">
            <p className="font-display text-xs sm:text-sm md:text-base font-black tracking-wide uppercase text-white">
              THE OUTCOME: A CONFIDENT, SKILLED, WELL-ROUNDED ENGINEER READY TO TACKLE ANY CHALLENGE IN THE INDUSTRY 🚀
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-[#FDFEFE] p-4 sm:p-6 lg:p-8 shadow-sm space-y-6">
          {(() => {
            const selectedYear = fourYearRoadmap.find((yearInfo) => yearInfo.year === activeYearHighlight)
            if (!selectedYear) return null

            return (
              <>
                <div className="rounded-2xl border-2 border-blue-600/70 bg-white p-5 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg font-black text-blue-700">
                      {selectedYear.year}
                    </span>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-blue-700">
                      {selectedYear.badge}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-black uppercase tracking-tight text-[#071633]">
                    {selectedYear.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Detailed roadmap for the selected year, covering technical focus, experiences, and expected outcomes.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="mb-3 font-display text-sm font-black uppercase text-slate-800">Technical Focus</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {selectedYear.technical.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 text-blue-600">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="mb-3 font-display text-sm font-black uppercase text-slate-800">Experience Goals</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {selectedYear.experiences.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 text-emerald-600">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="mb-3 font-display text-sm font-black uppercase text-slate-800">Expected Outcomes</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {selectedYear.outcomes.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 text-amber-600">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}
