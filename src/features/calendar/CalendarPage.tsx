import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Plus } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

interface CalendarTask {
  id: string
  date: string
  title: string
  time: string
  dotColor: string
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10)
}

function getWeek(date: Date) {
  const monday = new Date(date)
  const offset = monday.getDay() === 0 ? 6 : monday.getDay() - 1
  monday.setDate(monday.getDate() - offset)
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(monday)
    day.setDate(monday.getDate() + index)
    return day
  })
}

export function CalendarPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialDate = searchParams.get('date') || formatDate(new Date())
  const [selectedDate, setSelectedDate] = useState(initialDate)
  const [weekAnchor, setWeekAnchor] = useState(new Date(`${initialDate}T12:00:00`))
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newTime, setNewTime] = useState('')
  const week = getWeek(weekAnchor)
  const [tasks, setTasks] = useState<CalendarTask[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('c2cedge.calendar_tasks') || '[]') as CalendarTask[]
      if (saved.length > 0) return saved
      const onboarding = JSON.parse(localStorage.getItem('c2cedge.onboarding') || '{}')
      const focus = onboarding.interests?.[0] || 'Learning'
      return [
        { id: 'default-1', date: initialDate, title: `${focus} practice session`, time: '9:00 AM', dotColor: 'bg-brand-500' },
        { id: 'default-2', date: initialDate, title: `${onboarding.goals?.[0] || 'Learning'} focus block`, time: '11:30 AM', dotColor: 'bg-purple-500' },
        { id: 'default-3', date: initialDate, title: onboarding.learningModes?.[0] || 'Build a project', time: '3:00 PM', dotColor: 'bg-orange-500' },
      ]
    } catch {
      return []
    }
  })

  const selectedTasks = useMemo(
    () => tasks.filter((task) => task.date === selectedDate),
    [selectedDate, tasks],
  )

  const selectDate = (date: Date) => {
    const value = formatDate(date)
    setSelectedDate(value)
    setSearchParams({ date: value })
  }

  const moveWeek = (amount: number) => {
    const next = new Date(weekAnchor)
    next.setDate(next.getDate() + amount * 7)
    setWeekAnchor(next)
  }

  const addTask = (event: React.FormEvent) => {
    event.preventDefault()
    if (!newTitle.trim()) return
    const nextTasks = [
      ...tasks,
      {
        id: crypto.randomUUID(),
        date: selectedDate,
        title: newTitle.trim(),
        time: newTime.trim() || '12:00 PM',
        dotColor: 'bg-brand-500',
      },
    ]
    setTasks(nextTasks)
    localStorage.setItem('c2cedge.calendar_tasks', JSON.stringify(nextTasks))
    setNewTitle('')
    setNewTime('')
    setShowAddTask(false)
  }

  return (
    <div className="space-y-6 pb-16">
      <header className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand-600">
            <CalendarDays size={18} />
            <span className="text-xs font-bold uppercase tracking-wide">Schedule</span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">Full Calendar</h1>
          <p className="mt-1 text-sm text-ink-muted">View your scheduled learning work by day.</p>
        </div>
        <button type="button" onClick={() => setShowAddTask(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700">
          <Plus size={15} /> Add task
        </button>
      </header>

      <section className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between rounded-xl border border-line bg-surface-subtle px-3 py-2">
          <button type="button" onClick={() => moveWeek(-1)} aria-label="Previous week" className="rounded-lg p-2 text-ink-muted hover:bg-surface hover:text-ink"><ChevronLeft size={18} /></button>
          <p className="font-display text-sm font-bold text-ink">
            {week[0].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {week[6].toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <button type="button" onClick={() => moveWeek(1)} aria-label="Next week" className="rounded-lg p-2 text-ink-muted hover:bg-surface hover:text-ink"><ChevronRight size={18} /></button>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-3">
          {week.map((day) => {
            const value = formatDate(day)
            const selected = value === selectedDate
            const hasTasks = tasks.some((task) => task.date === value)
            return (
              <button key={value} type="button" onClick={() => selectDate(day)} className={`rounded-xl border px-1 py-3 text-center transition-colors sm:px-3 ${selected ? 'border-blue-600 bg-blue-600 text-white' : 'border-line bg-surface hover:border-blue-300'}`}>
                <span className={`block text-[10px] font-semibold uppercase ${selected ? 'text-white/80' : 'text-ink-muted'}`}>{day.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                <span className="mt-1 block text-lg font-bold">{day.getDate()}</span>
                <span className={`mx-auto mt-2 block h-1.5 w-1.5 rounded-full ${hasTasks ? selected ? 'bg-white' : 'bg-blue-600' : 'bg-transparent'}`} />
              </button>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Selected day</p>
            <h2 className="mt-1 font-display text-lg font-bold text-ink">{new Date(`${selectedDate}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h2>
          </div>
          <span className="text-xs font-semibold text-ink-muted">{selectedTasks.length} scheduled {selectedTasks.length === 1 ? 'task' : 'tasks'}</span>
        </div>

        <div className="mt-4 space-y-3">
          {selectedTasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 rounded-xl border border-line p-4">
              <span className={`h-2.5 w-2.5 rounded-full ${task.dotColor}`} />
              <div className="min-w-0 flex-1"><p className="font-semibold text-ink">{task.title}</p><p className="mt-1 flex items-center gap-1 text-xs text-ink-muted"><Clock size={13} /> {task.time}</p></div>
            </div>
          ))}
          {selectedTasks.length === 0 ? <div className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-ink-muted">No work scheduled for this day.</div> : null}
        </div>
      </section>

      {showAddTask ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4">
          <form onSubmit={addTask} className="w-full max-w-md rounded-2xl border border-line bg-surface p-5 shadow-xl">
            <h2 className="font-display text-lg font-bold text-ink">Add task</h2>
            <p className="mt-1 text-xs text-ink-muted">Schedule work for the selected day.</p>
            <input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} autoFocus placeholder="Task name" className="mt-4 h-10 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-blue-500" />
            <input value={newTime} onChange={(event) => setNewTime(event.target.value)} placeholder="Time, e.g. 9:00 AM" className="mt-3 h-10 w-full rounded-xl border border-line px-3 text-sm outline-none focus:border-blue-500" />
            <div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setShowAddTask(false)} className="rounded-xl border border-line px-3 py-2 text-xs font-bold text-ink">Cancel</button><button type="submit" className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white">Save task</button></div>
          </form>
        </div>
      ) : null}
    </div>
  )
}
