import { NavLink } from 'react-router-dom'
import { ChevronLeft, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { topNavItems, navGroups, bottomNavItems } from '../navigation/navItems'
import { Logo } from './Logo'

export function Sidebar({
  expanded,
  onToggle,
  mobileOpen,
  onCloseMobile,
}: {
  expanded: boolean
  onToggle: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}) {
  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-line bg-surface text-ink transition-[width,transform] duration-200 shadow-2xs',
          expanded ? 'w-[240px]' : 'w-[240px] lg:w-[84px]',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-line/60 px-4">
          <Logo tone="light" compact={!expanded} />
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-ink lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scrollbar-thin">
          {/* Top Primary Items (Home, My Journey) */}
          <ul className="space-y-1">
            {topNavItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  onClick={onCloseMobile}
                  title={item.label}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150',
                      !expanded && 'lg:flex-col lg:gap-1 lg:px-1.5 lg:py-2 lg:text-center',
                      isActive
                        ? 'bg-indigo-50/90 text-indigo-700 font-bold shadow-2xs border border-indigo-100/80'
                        : 'text-slate-600 hover:bg-slate-100/70 hover:text-ink',
                    )
                  }
                >
                  <item.icon
                    size={17}
                    className={cn(
                      'shrink-0 stroke-[2.2]',
                      item.iconColor || 'text-slate-500'
                    )}
                  />
                  <span
                    className={cn(
                      'truncate text-xs',
                      !expanded && 'lg:text-[10px] lg:leading-tight',
                    )}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Categorized Groups (Foundation, Experience, Professional, Career, Insights, Support) */}
          {navGroups.map((group) => (
            <div key={group.id} className="space-y-1 pt-1">
              {group.label && expanded && (
                <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {group.label}
                </div>
              )}
              {group.label && !expanded && (
                <div className="my-1 border-t border-line/60" />
              )}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.to}
                      onClick={onCloseMobile}
                      title={item.label}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150',
                          !expanded && 'lg:flex-col lg:gap-1 lg:px-1.5 lg:py-2 lg:text-center',
                          isActive
                            ? 'bg-indigo-50/90 text-indigo-700 font-bold shadow-2xs border border-indigo-100/80'
                            : 'text-slate-600 hover:bg-slate-100/70 hover:text-ink',
                        )
                      }
                    >
                      <item.icon
                        size={17}
                        className={cn(
                          'shrink-0 stroke-[2.2]',
                          item.iconColor || 'text-slate-500'
                        )}
                      />
                      <span
                        className={cn(
                          'truncate text-xs',
                          !expanded && 'lg:text-[10px] lg:leading-tight',
                        )}
                      >
                        {item.label}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom Utility Items (Notifications, Settings) */}
        <div className="shrink-0 border-t border-line/80 p-3 space-y-1">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              onClick={onCloseMobile}
              title={item.label}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors',
                  !expanded && 'lg:flex-col lg:gap-1 lg:px-1.5 lg:py-2 lg:text-center',
                  isActive
                    ? 'bg-indigo-50/90 text-indigo-700 font-bold border border-indigo-100/80'
                    : 'text-slate-600 hover:bg-slate-100/70 hover:text-ink',
                )
              }
            >
              <div className="flex items-center gap-3">
                <item.icon size={17} className="shrink-0 text-slate-500 stroke-[2]" />
                <span
                  className={cn(
                    'truncate text-xs',
                    !expanded && 'lg:text-[10px] lg:leading-tight',
                  )}
                >
                  {item.label}
                </span>
              </div>
              {item.badge && expanded && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-2xs">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}

          {/* Collapse / Expand Toggle for desktop */}
          <button
            type="button"
            onClick={onToggle}
            className="hidden w-full items-center justify-center gap-2 rounded-xl px-2 py-1.5 text-xs font-semibold text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors lg:flex mt-1"
          >
            <ChevronLeft
              size={14}
              className={cn('transition-transform', !expanded && 'rotate-180')}
            />
            {expanded ? <span>Collapse</span> : null}
          </button>
        </div>
      </aside>
    </>
  )
}
