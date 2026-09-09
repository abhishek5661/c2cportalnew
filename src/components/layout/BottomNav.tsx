import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { mobileNav } from '../navigation/navItems'

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface lg:hidden">
      {mobileNav.map((item) => (
        <NavLink
          key={item.id}
          to={item.to}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center gap-1 py-2 text-[11px] font-medium',
              isActive ? 'text-brand-600' : 'text-ink-muted',
            )
          }
        >
          <item.icon size={18} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
