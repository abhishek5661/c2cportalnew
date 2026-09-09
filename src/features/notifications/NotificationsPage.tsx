import { useMemo, useState } from 'react'
import { Bell, BookOpen, CheckCheck, ChevronRight, Clock3, Flame, Target, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

const initialNotifications = [
  {
    id: 'plan-ready',
    title: 'Your personalized plan is ready',
    description: 'Your onboarding choices have been used to prepare your next learning actions.',
    time: 'Just now',
    category: 'Learning',
    icon: BookOpen,
    iconClass: 'bg-blue-100 text-blue-600',
    to: '/dashboard',
    unread: true,
  },
  {
    id: 'streak-reminder',
    title: 'Keep your learning streak going',
    description: 'Complete one activity today to keep your progress moving forward.',
    time: '2 hours ago',
    category: 'Reminder',
    icon: Flame,
    iconClass: 'bg-orange-100 text-orange-600',
    to: '/practice',
    unread: true,
  },
  {
    id: 'goal-progress',
    title: 'Your goal needs attention',
    description: 'Spend a few minutes on a recommended activity aligned with your selected goal.',
    time: 'Yesterday',
    category: 'Goals',
    icon: Target,
    iconClass: 'bg-emerald-100 text-emerald-600',
    to: '/journey',
    unread: false,
  },
  {
    id: 'contest',
    title: 'A new contest is available',
    description: 'Test your skills and build experience with the next live competition.',
    time: '2 days ago',
    category: 'Opportunities',
    icon: Trophy,
    iconClass: 'bg-purple-100 text-purple-600',
    to: '/compete',
    unread: false,
  },
]

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Unread', 'Learning', 'Goals', 'Opportunities', 'Reminder']
  const unreadCount = notifications.filter((notification) => notification.unread).length
  const visibleNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      if (activeFilter === 'All') return true
      if (activeFilter === 'Unread') return notification.unread
      return notification.category === activeFilter
    })
  }, [activeFilter, notifications])

  const markAllRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, unread: false })))
  }

  const markRead = (id: string) => {
    setNotifications((current) => current.map((notification) => (
      notification.id === id ? { ...notification, unread: false } : notification
    )))
  }

  return (
    <div className="space-y-6 pb-16">
      <header className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand-600">
            <Bell size={18} />
            <span className="text-xs font-bold uppercase tracking-wide">Activity center</span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">Notifications</h1>
          <p className="mt-1 text-sm text-ink-muted">Stay current with your learning plan, goals, and opportunities.</p>
        </div>
        <button
          type="button"
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-xs font-bold text-ink transition-colors hover:bg-surface-subtle disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCheck size={15} />
          Mark all as read
        </button>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeFilter === filter
                ? 'border-brand-600 bg-brand-600 text-white'
                : 'border-line bg-surface text-ink-muted hover:border-brand-300 hover:text-brand-700'
            }`}
          >
            {filter}
            {filter === 'Unread' ? ` (${unreadCount})` : ''}
          </button>
        ))}
      </div>

      <section className="space-y-3">
        {visibleNotifications.map((notification) => {
          const Icon = notification.icon
          return (
            <article
              key={notification.id}
              className={`rounded-2xl border p-4 transition-colors sm:p-5 ${
                notification.unread ? 'border-brand-200 bg-brand-50/30' : 'border-line bg-surface'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${notification.iconClass}`}>
                  <Icon size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-sm font-bold text-ink">{notification.title}</h2>
                    {notification.unread ? <span className="h-2 w-2 rounded-full bg-brand-600" aria-label="Unread" /> : null}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{notification.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1"><Clock3 size={13} />{notification.time}</span>
                    <span className="rounded-full bg-surface-subtle px-2 py-1 font-semibold">{notification.category}</span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  {notification.unread ? (
                    <button type="button" onClick={() => markRead(notification.id)} className="text-[11px] font-semibold text-brand-600 hover:underline">
                      Mark read
                    </button>
                  ) : null}
                  <Link to={notification.to} onClick={() => markRead(notification.id)} className="text-ink-muted hover:text-brand-600" aria-label={`Open ${notification.title}`}>
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </article>
          )
        })}

        {visibleNotifications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-surface p-10 text-center">
            <Bell size={24} className="mx-auto text-ink-muted" />
            <p className="mt-3 text-sm font-semibold text-ink">You are all caught up</p>
            <p className="mt-1 text-xs text-ink-muted">There are no notifications in this view.</p>
          </div>
        ) : null}
      </section>
    </div>
  )
}
