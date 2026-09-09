import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, UserCircle2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { user } from '../../data/mock'

export function TopBar({ onOpenNav }: { onOpenNav: () => void }) {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const currentProfile = (() => {
    try {
      const rawSession = localStorage.getItem('c2cedge.current_session')
      const session = rawSession ? JSON.parse(rawSession) : null
      if (session?.user) {
        return {
          name: session.user.email?.split('@')[0] || session.user.name,
          avatar: session.user.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        }
      }

      const rawAccounts = localStorage.getItem('c2cedge.connectedProfilesMap')
      const accounts = rawAccounts ? JSON.parse(rawAccounts) : null
      const rawOnboarding = localStorage.getItem('c2cedge.onboarding')
      const onboarding = rawOnboarding ? JSON.parse(rawOnboarding) : null
      const gh = accounts?.GitHub
      const li = accounts?.LinkedIn
      return {
        name: gh?.name || li?.name || onboarding?.name || user.name,
        avatar: gh?.avatar || li?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      }
    } catch {
      return { name: user.name, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' }
    }
  })()

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const openPage = (path: string) => {
    setIsMenuOpen(false)
    navigate(path)
  }

  const signOut = () => {
    localStorage.removeItem('c2cedge.current_session')
    setIsMenuOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 lg:px-6">
      <button
        type="button"
        onClick={onOpenNav}
        aria-label="Open navigation"
        className="rounded-card p-2 text-ink-muted hover:bg-surface-subtle lg:hidden"
      >
        <Menu size={20} />
      </button>

      <label className="relative flex-1 max-w-xl">
        <span className="sr-only">Search</span>
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
        />
        <input
          type="search"
          placeholder="Search topics, skills or courses..."
          className="h-10 w-full rounded-xl border border-line bg-surface-subtle pl-9 pr-12 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:bg-surface focus:outline-none transition-colors"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-line bg-surface px-1.5 py-0.5 text-[11px] text-ink-muted sm:block">
          /
        </kbd>
      </label>

      <div className="ml-auto flex items-center gap-2.5">
        <Link
          to="/notifications"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors"
        >
          <Bell size={19} />
          <span className="absolute right-1 top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
            3
          </span>
        </Link>
        <div ref={menuRef} className="relative">
          <button
            type="button"
            title={currentProfile.name}
            aria-label="Open profile menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center gap-2 rounded-full p-0.5 transition-all hover:ring-2 hover:ring-brand-500/20"
          >
            <img
              src={currentProfile.avatar}
              alt={currentProfile.name}
              className="h-8 w-8 rounded-full border border-line object-cover shadow-sm"
            />
            <ChevronDown
              size={14}
              className={`hidden text-ink-muted transition-transform sm:block ${isMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full z-40 mt-3 w-60 overflow-hidden rounded-xl border border-line bg-surface shadow-lg ring-1 ring-slate-900/5">
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <img
                  src={currentProfile.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full border border-line object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{currentProfile.name}</p>
                  <p className="text-xs text-ink-muted">Student account</p>
                </div>
              </div>

              <div className="p-1.5">
                <button
                  type="button"
                  onClick={() => openPage('/settings')}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-surface-subtle"
                >
                  <UserCircle2 size={17} className="text-ink-muted" />
                  My profile
                </button>
                <button
                  type="button"
                  onClick={() => openPage('/settings')}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-surface-subtle"
                >
                  <Settings size={17} className="text-ink-muted" />
                  Settings
                </button>
                <div className="my-1 border-t border-line" />
                <button
                  type="button"
                  onClick={signOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
