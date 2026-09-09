import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Flame,
  Lightbulb,
  Lock,
  Maximize2,
  MessageSquare,
  Pause,
  Play,
  Settings as SettingsIcon,
  Sparkles,
  Trophy,
  Volume2,
  Zap,
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { ProgressRing } from '../../components/ui/Progress'
import { cn } from '../../lib/cn'
import { numberSystemsLessons } from '../../data/mock'

export function LessonModulePage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'notes' | 'discuss' | 'leaderboard'>('learn')
  const [activeLessonSubtab, setActiveLessonSubtab] = useState<'concepts' | 'examples' | 'shortcuts' | 'notes'>('concepts')
  const [selectedLessonId, setSelectedLessonId] = useState(lessonId || 'integers')
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState('1.0x')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentLessonIndex = numberSystemsLessons.findIndex((l) => l.id === selectedLessonId)
  const currentLesson = numberSystemsLessons[currentLessonIndex] ?? numberSystemsLessons[2]

  const handleNextLesson = () => {
    if (currentLessonIndex < numberSystemsLessons.length - 1) {
      setSelectedLessonId(numberSystemsLessons[currentLessonIndex + 1].id)
    }
  }

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setSelectedLessonId(numberSystemsLessons[currentLessonIndex - 1].id)
    }
  }

  return (
    <div className="min-h-screen bg-surface-subtle pb-12">
      {/* Module Navigation Header */}
      <div className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6">
          <Link
            to="/master"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline mb-3"
          >
            <ArrowLeft size={15} /> Back to Aptitude
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 border border-orange-100 shadow-sm">
                <BarChart3 size={22} className="stroke-[2.2]" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
                    Aptitude – Number Systems
                  </h1>
                  <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    Easy
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Master the fundamentals and build strong quantitative skills.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                leadingIcon={
                  <Bookmark
                    size={15}
                    className={isBookmarked ? 'fill-blue-600 text-blue-600' : ''}
                  />
                }
              >
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button
                size="sm"
                onClick={() => setIsCompleted(!isCompleted)}
                className={isCompleted ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-blue-600 text-white'}
                leadingIcon={<Check size={15} />}
              >
                {isCompleted ? 'Completed' : 'Mark as Completed'}
              </Button>
            </div>
          </div>

          {/* Module Tabs */}
          <div className="mt-5 flex gap-6 border-b border-line text-sm font-medium">
            {[
              { id: 'learn', label: 'Learn' },
              { id: 'practice', label: 'Practice' },
              { id: 'notes', label: 'Notes' },
              { id: 'discuss', label: 'Discuss' },
              { id: 'leaderboard', label: 'Leaderboard' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'pb-3 text-xs font-semibold border-b-2 transition-colors',
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-ink-muted hover:text-ink',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3-Column Layout: Module Contents | Lesson Player & Concepts | Progress & Practice Rail */}
      <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* LEFT COLUMN: Module Contents (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-0 overflow-hidden border border-line rounded-xl bg-surface shadow-xs">
              <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-surface">
                <h3 className="font-display text-xs font-bold text-ink">
                  Module Contents
                </h3>
                <span className="text-[11px] font-semibold text-ink-muted">
                  0 / 12 completed
                </span>
              </div>

              <ul className="divide-y divide-line max-h-[640px] overflow-y-auto">
                {numberSystemsLessons.map((lesson) => {
                  const isCurrent = lesson.id === selectedLessonId
                  const isDone = lesson.status === 'completed'
                  const isLocked = lesson.status === 'locked'
                  const isInProgress = lesson.status === 'in-progress' || (isCurrent && !isDone && !isLocked)

                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isLocked) setSelectedLessonId(lesson.id)
                        }}
                        disabled={isLocked}
                        className={cn(
                          'w-full flex items-center gap-3 px-3.5 py-3 text-left transition-colors border-l-4',
                          isCurrent
                            ? 'bg-blue-50/70 border-blue-600'
                            : 'border-transparent hover:bg-surface-subtle',
                          isLocked ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer',
                        )}
                      >
                        {/* Status Icon */}
                        <span
                          className={cn(
                            'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-transform',
                            isDone && 'bg-emerald-100 text-emerald-600',
                            (isInProgress || isCurrent) && !isDone && 'bg-blue-600 text-white shadow-xs',
                            isLocked && 'bg-slate-100 text-slate-400',
                            !isDone && !isInProgress && !isCurrent && !isLocked && 'bg-slate-100 text-slate-700',
                          )}
                        >
                          {isDone ? (
                            <Check size={12} strokeWidth={2.5} />
                          ) : isInProgress || isCurrent ? (
                            <Play size={10} className="fill-white translate-x-0.5" />
                          ) : (
                            <Lock size={11} />
                          )}
                        </span>

                        {/* Title & Duration */}
                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              'truncate text-xs leading-tight',
                              isCurrent
                                ? 'font-bold text-blue-700'
                                : isLocked
                                ? 'font-medium text-slate-600'
                                : 'font-semibold text-ink',
                            )}
                          >
                            {lesson.title}
                          </p>
                          <p
                            className={cn(
                              'mt-0.5 text-[11px]',
                              isLocked ? 'text-slate-400' : 'text-ink-muted',
                            )}
                          >
                            {lesson.duration}
                            {isInProgress || isCurrent ? (
                              <span className="ml-1.5 font-semibold text-blue-600">
                                • In Progress
                              </span>
                            ) : null}
                          </p>
                        </div>

                        {/* Right-hand play icon for in-progress / active lesson */}
                        {isCurrent || isInProgress ? (
                          <span className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Play size={9} className="fill-white translate-x-0.5" />
                          </span>
                        ) : null}
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* Download Module PDF Outline Button */}
              <div className="border-t border-line p-3 bg-surface">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-xs font-semibold border-line text-ink hover:bg-surface-subtle"
                  leadingIcon={<Download size={14} />}
                >
                  Download Module PDF
                </Button>
              </div>
            </Card>
          </div>

          {/* MIDDLE COLUMN: Video Lesson & Concept Notes (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Encouragement / Trophy Banner */}
            <div className="relative overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 via-amber-100/50 to-orange-50/60 p-3.5 shadow-2xs">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-white shadow-xs">
                    <Trophy size={18} className="fill-amber-100" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display text-xs font-bold text-amber-950">
                      You're doing great!
                    </h4>
                    <p className="text-[11px] text-amber-900/90 leading-snug">
                      Complete this lesson to strengthen your Number Systems foundation.
                    </p>
                  </div>
                </div>
                {/* Confetti / Sparkle Accents */}
                <div className="flex items-center gap-1 text-amber-500 shrink-0 select-none">
                  <Sparkles size={18} className="text-amber-500 fill-amber-300 animate-pulse" />
                  <span className="text-xs">✨</span>
                </div>
              </div>
            </div>

            {/* Video Lesson Player Component */}
            <Card className="p-0 overflow-hidden border border-line rounded-xl bg-surface shadow-xs">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5 bg-surface">
                <h3 className="font-display text-xs font-bold text-ink">
                  Video Lesson
                </h3>
                <span className="rounded bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                  12:32 HD
                </span>
              </div>

              {/* Video Surface: Educator Whiteboard Mockup */}
              <div className="relative aspect-video w-full bg-[#0b1329] overflow-hidden flex flex-col justify-between p-4 text-white select-none">
                {/* Header within Video: Lesson Title & c2cedge branding */}
                <div className="flex justify-between items-start z-10">
                  <div className="rounded-md bg-black/40 border border-white/10 px-2.5 py-1 text-[11px] font-mono text-slate-300 backdrop-blur-xs">
                    {currentLesson.title}
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-black/40 border border-white/10 px-2.5 py-1 text-xs font-bold tracking-tight text-white backdrop-blur-xs">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    c2cedge
                  </div>
                </div>

                {/* Video Blackboard / Whiteboard Canvas Mockup */}
                <div className="my-auto text-center space-y-3 z-10">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                    Integers
                  </h2>
                  <div>
                    <div className="inline-block rounded-xl bg-slate-800/80 px-4 py-2 font-mono text-xs sm:text-sm text-emerald-300 border border-emerald-500/30 shadow-inner">
                      Integers = &#123;..., -3, -2, -1, 0, 1, 2, 3, ...&#125;
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs text-slate-300 pt-1">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      Includes negative numbers
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      Includes zero
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Includes positive numbers
                    </span>
                  </div>
                </div>

                {/* Big Center Play Button Overlay */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/90 hover:bg-blue-600 text-white shadow-xl shadow-blue-600/30 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95 z-20"
                >
                  {isPlaying ? (
                    <Pause size={24} className="fill-white" />
                  ) : (
                    <Play size={24} className="fill-white translate-x-0.5" />
                  )}
                </button>

                {/* Video Controls Bar: Play/Pause, 06:24 / 12:32, Speed: 1.0x, CC, settings, fullscreen */}
                <div className="space-y-2 pt-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent -mx-4 -mb-4 px-4 pb-3 z-10">
                  {/* Seekbar */}
                  <div className="relative h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-slate-700/80 group">
                    <div className="h-full w-[51%] rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors" />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
                      </button>
                      <button
                        type="button"
                        aria-label="Volume"
                        className="hover:text-white transition-colors"
                      >
                        <Volume2 size={16} />
                      </button>
                      <span className="font-mono text-[11px] font-medium text-slate-300">
                        06:24 / 12:32
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400 hidden sm:inline">Speed:</span>
                        <select
                          value={speed}
                          onChange={(e) => setSpeed(e.target.value)}
                          aria-label="Playback speed"
                          className="rounded bg-black/50 border border-slate-700 px-1.5 py-0.5 text-[11px] font-medium text-slate-200 focus:outline-none hover:border-slate-500 cursor-pointer"
                        >
                          <option value="0.75x">0.75x</option>
                          <option value="1.0x">1.0x</option>
                          <option value="1.25x">1.25x</option>
                          <option value="1.5x">1.5x</option>
                          <option value="2.0x">2.0x</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        aria-label="Closed captions"
                        className="rounded border border-slate-700 bg-black/40 px-1.5 py-0.5 text-[10px] font-bold text-slate-300 hover:text-white hover:border-slate-500"
                      >
                        CC
                      </button>
                      <button
                        type="button"
                        aria-label="Settings"
                        className="hover:text-white transition-colors"
                      >
                        <SettingsIcon size={15} />
                      </button>
                      <button
                        type="button"
                        aria-label="Fullscreen"
                        className="hover:text-white transition-colors"
                      >
                        <Maximize2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Lesson Subtabs: Key Concepts (active), Examples, Shortcuts, Notes */}
            <div className="flex gap-6 border-b border-line text-xs font-semibold">
              {[
                { id: 'concepts', label: 'Key Concepts' },
                { id: 'examples', label: 'Examples' },
                { id: 'shortcuts', label: 'Shortcuts' },
                { id: 'notes', label: 'Notes' },
              ].map((subtab) => (
                <button
                  key={subtab.id}
                  type="button"
                  onClick={() => setActiveLessonSubtab(subtab.id as any)}
                  className={cn(
                    'pb-2.5 border-b-2 transition-colors',
                    activeLessonSubtab === subtab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-ink-muted hover:text-ink',
                  )}
                >
                  {subtab.label}
                </button>
              ))}
            </div>

            {/* Subtab Contents: Key Concepts (Default active) */}
            {activeLessonSubtab === 'concepts' && (
              <div className="space-y-4">
                {/* Key Takeaways Card with Blue Lightbulb */}
                <Card className="rounded-xl border border-line p-4 bg-surface space-y-3 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                      <Lightbulb size={16} className="stroke-[2.2]" />
                    </span>
                    <h4 className="font-display text-xs font-bold text-ink">
                      Key Takeaways
                    </h4>
                  </div>

                  <ul className="space-y-2 text-xs text-ink-muted pl-0.5">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        Integers include negative numbers, zero and positive numbers.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        They extend whole numbers to the left of zero on the number line.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        Operations on integers follow specific rules for addition, subtraction, multiplication and division.
                      </span>
                    </li>
                  </ul>
                </Card>

                {/* Example 1 Card + Pro Tip */}
                <Card className="rounded-xl border border-line p-4 bg-surface space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-blue-100/80 text-blue-700 px-2 py-0.5 text-[11px] font-bold">
                      Example 1
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-ink">
                    Find the value of: <span className="font-mono font-bold text-blue-700">-12 + 8</span>
                  </p>
                  <div className="rounded-lg bg-surface-subtle p-3 font-mono text-xs text-ink border border-line">
                    <p>
                      <strong className="text-emerald-600 font-sans font-bold">Solution:</strong> -12 + 8 = -(12 - 8) = <span className="font-bold text-blue-600">-4</span>
                    </p>
                  </div>

                  {/* Pro Tip Callout */}
                  <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5">
                    <div className="flex items-center gap-1.5 text-amber-900 font-display text-xs font-bold mb-1">
                      <Zap size={14} className="fill-amber-500 text-amber-500" />
                      Pro Tip
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      When adding two integers with different signs, subtract the smaller absolute value from the larger and take the sign of the larger number.
                    </p>
                  </div>
                </Card>
              </div>
            )}

            {activeLessonSubtab === 'examples' && (
              <div className="space-y-4">
                <Card className="rounded-xl border border-line p-4 bg-surface space-y-3 shadow-xs">
                  <span className="rounded bg-blue-100/80 text-blue-700 px-2 py-0.5 text-[11px] font-bold">
                    Example 1
                  </span>
                  <p className="text-xs font-semibold text-ink">
                    Find the value of: <span className="font-mono font-bold text-blue-700">-12 + 8</span>
                  </p>
                  <div className="rounded-lg bg-surface-subtle p-3 font-mono text-xs text-ink border border-line">
                    <p><strong className="text-emerald-600 font-sans font-bold">Solution:</strong> -12 + 8 = -(12 - 8) = <span className="font-bold text-blue-600">-4</span></p>
                  </div>
                </Card>

                <Card className="rounded-xl border border-line p-4 bg-surface space-y-3 shadow-xs">
                  <span className="rounded bg-blue-100/80 text-blue-700 px-2 py-0.5 text-[11px] font-bold">
                    Example 2
                  </span>
                  <p className="text-xs font-semibold text-ink">
                    Evaluate: <span className="font-mono font-bold text-blue-700">(-5) × (-4) + (-15) ÷ 3</span>
                  </p>
                  <div className="rounded-lg bg-surface-subtle p-3 font-mono text-xs text-ink border border-line">
                    <p><strong className="text-emerald-600 font-sans font-bold">Solution:</strong> 20 + (-5) = 20 - 5 = <span className="font-bold text-blue-600">15</span></p>
                  </div>
                </Card>

                <Card className="rounded-xl border border-line p-4 bg-surface space-y-3 shadow-xs">
                  <span className="rounded bg-blue-100/80 text-blue-700 px-2 py-0.5 text-[11px] font-bold">
                    Example 3
                  </span>
                  <p className="text-xs font-semibold text-ink">
                    Find the difference: <span className="font-mono font-bold text-blue-700">14 - (-9)</span>
                  </p>
                  <div className="rounded-lg bg-surface-subtle p-3 font-mono text-xs text-ink border border-line">
                    <p><strong className="text-emerald-600 font-sans font-bold">Solution:</strong> 14 + 9 = <span className="font-bold text-blue-600">23</span></p>
                  </div>
                </Card>
              </div>
            )}

            {activeLessonSubtab === 'shortcuts' && (
              <div className="space-y-4">
                <Card className="rounded-xl border border-line p-4 bg-surface space-y-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-amber-500 fill-amber-500" />
                    <h4 className="font-display text-xs font-bold text-ink">Sign Rules for Multiplication &amp; Division</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-surface-subtle border border-line">(+) × (+) = <strong className="text-emerald-600">(+)</strong></div>
                    <div className="p-2.5 rounded-lg bg-surface-subtle border border-line">(-) × (-) = <strong className="text-emerald-600">(+)</strong></div>
                    <div className="p-2.5 rounded-lg bg-surface-subtle border border-line">(+) × (-) = <strong className="text-red-500">(-)</strong></div>
                    <div className="p-2.5 rounded-lg bg-surface-subtle border border-line">(-) × (+) = <strong className="text-red-500">(-)</strong></div>
                  </div>
                </Card>
              </div>
            )}

            {activeLessonSubtab === 'notes' && (
              <Card className="rounded-xl border border-line p-4 bg-surface space-y-3 shadow-xs">
                <h4 className="font-display text-xs font-bold text-ink">Your Lesson Notes</h4>
                <textarea
                  className="w-full rounded-lg border border-line p-3 text-xs text-ink focus:border-blue-600 focus:outline-none"
                  rows={4}
                  placeholder="Write your personal notes for this lesson here..."
                  defaultValue="Remember: Subtracting a negative number is equivalent to adding a positive number."
                />
                <div className="flex justify-end">
                  <Button size="sm" className="bg-blue-600 text-white text-xs">Save Note</Button>
                </div>
              </Card>
            )}

            {/* Lesson Navigation Footer Buttons: Previous & Next */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevLesson}
                disabled={currentLessonIndex === 0}
                className="border-line text-ink hover:bg-surface-subtle"
                leadingIcon={<ArrowLeft size={14} />}
              >
                Previous Lesson
              </Button>
              <Button
                size="sm"
                onClick={handleNextLesson}
                disabled={currentLessonIndex === numberSystemsLessons.length - 1}
                className="bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
                trailingIcon={<ArrowRight size={14} />}
              >
                Next Lesson
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN: Progress & Practice Rail (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Your Progress */}
            <Card className="rounded-xl border border-line p-4 bg-surface shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-line/60">
                <h3 className="font-display text-xs font-bold text-ink">
                  Your Progress
                </h3>
                <button type="button" className="text-[11px] font-semibold text-blue-600 hover:underline">
                  View Module
                </button>
              </div>

              <div className="mt-3.5 flex items-center gap-3.5">
                <ProgressRing value={20} size={64} strokeWidth={6} accent="brand" caption="Progress" />
                <div>
                  <p className="font-display text-base font-bold text-ink leading-none">
                    3 / 12
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Lessons Completed
                  </p>
                </div>
              </div>

              {/* 3 Metric Boxes: Day Streak, Module XP, Time Spent */}
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line/60 pt-3 text-center">
                <div className="rounded-lg bg-surface-subtle p-2 border border-line/40">
                  <Flame size={15} className="text-orange-500 fill-orange-500/20 mx-auto" />
                  <p className="font-display text-xs font-bold text-ink mt-1">12</p>
                  <p className="text-[10px] text-ink-muted leading-tight">Day Streak</p>
                </div>
                <div className="rounded-lg bg-surface-subtle p-2 border border-line/40">
                  <Trophy size={15} className="text-amber-500 fill-amber-500/20 mx-auto" />
                  <p className="font-display text-xs font-bold text-ink mt-1">450</p>
                  <p className="text-[10px] text-ink-muted leading-tight">Module XP</p>
                </div>
                <div className="rounded-lg bg-surface-subtle p-2 border border-line/40">
                  <Clock size={15} className="text-blue-500 mx-auto" />
                  <p className="font-display text-xs font-bold text-ink mt-1">3.8 hrs</p>
                  <p className="text-[10px] text-ink-muted leading-tight">Time Spent</p>
                </div>
              </div>
            </Card>

            {/* Practice This Topic */}
            <Card className="rounded-xl border border-line p-4 bg-surface shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-line/60">
                <h3 className="font-display text-xs font-bold text-ink">
                  Practice This Topic
                </h3>
                <button type="button" className="text-[11px] font-semibold text-blue-600 hover:underline">
                  View all
                </button>
              </div>

              <ul className="mt-3 space-y-2.5">
                {[
                  { title: 'Quick Quiz', count: '5 Questions • 5 min' },
                  { title: 'Topic Exercise', count: '15 Questions • 15 min' },
                  { title: 'Mixed Problems', count: '20 Questions • 20 min' },
                ].map((test) => (
                  <li
                    key={test.title}
                    className="flex items-center justify-between rounded-lg border border-line/60 bg-surface-subtle p-2.5"
                  >
                    <div>
                      <h4 className="font-display text-xs font-bold text-ink">
                        {test.title}
                      </h4>
                      <p className="text-[10px] text-ink-muted mt-0.5">{test.count}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs px-3 bg-surface border-line text-ink font-semibold hover:bg-surface-subtle shadow-2xs"
                      onClick={() => navigate('/practice')}
                    >
                      Start
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Doubt? Ask the Community */}
            <Card className="rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 shadow-xs">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                  <MessageSquare size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="font-display text-xs font-bold text-ink">
                    Doubt? Ask the Community
                  </h4>
                  <p className="mt-0.5 text-[11px] text-ink-muted leading-relaxed">
                    Get help from peers and mentors.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('discuss')}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Ask a Doubt <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </Card>

            {/* Related Topics */}
            <Card className="rounded-xl border border-line p-4 bg-surface shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-line/60">
                <h3 className="font-display text-xs font-bold text-ink">
                  Related Topics
                </h3>
                <button type="button" className="text-[11px] font-semibold text-blue-600 hover:underline">
                  View all
                </button>
              </div>

              <ul className="mt-3 space-y-2.5 text-xs">
                <li className="flex items-center justify-between py-1 border-b border-line/60 pb-2">
                  <span className="font-medium text-ink">HCF &amp; LCM</span>
                  <span className="rounded bg-blue-50 text-blue-700 px-2 py-0.5 text-[10px] font-semibold border border-blue-200">
                    Next Lesson
                  </span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-line/60 pb-2 cursor-pointer hover:text-blue-600 transition-colors">
                  <span className="font-medium text-ink">Divisibility Rules</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </li>
                <li className="flex items-center justify-between py-1 cursor-pointer hover:text-blue-600 transition-colors">
                  <span className="font-medium text-ink">Prime Numbers</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </li>
              </ul>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
