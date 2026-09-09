import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { BottomNav } from './BottomNav'

export function AppShell() {
  const [expanded, setExpanded] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-full">
      <Sidebar
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div
        className={cn(
          'transition-[padding] duration-200',
          expanded ? 'lg:pl-[240px]' : 'lg:pl-[96px]',
        )}
      >
        <TopBar onOpenNav={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-content px-4 pb-20 pt-6 lg:px-6 lg:pb-10">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}

export function PageLayout({
  main,
  rail,
}: {
  main: React.ReactNode
  rail?: React.ReactNode
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-6">{main}</div>
      {rail ? <aside className="space-y-6">{rail}</aside> : null}
    </div>
  )
}
