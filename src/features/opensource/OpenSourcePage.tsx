import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bookmark,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  FileCode,
  FileText,
  Filter,
  Flame,
  Folder,
  GitBranch,
  GitCommit,
  GitFork,
  GitMerge,
  GitPullRequest,
  Globe,
  Layers,
  MessageSquare,
  Minus,
  MoreVertical,
  Plus,
  Search,
  BarChart2,
  Sliders,
  Sparkles,
  Star,
  Tag,
  Trophy,
  User,
  Users,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'

export function OpenSourcePage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Read query params for subtab
  const queryParams = new URLSearchParams(location.search)
  const qTab = queryParams.get('tab')?.toLowerCase()
  const [activeMainTab, setActiveMainTab] = useState<string>(
    qTab === 'my-contributions' || qTab === 'contributions'
      ? 'My Contributions'
      : qTab === 'bookmarks'
      ? 'Bookmarks'
      : qTab === 'my-projects' || qTab === 'projects'
      ? 'My Projects'
      : 'Explore'
  )
  const [activeContribSubTab, setActiveContribSubTab] = useState<string>('Overview')

  // Search and filters for Explore
  const [exploreSearch, setExploreSearch] = useState('')
  const [languageFilter, setLanguageFilter] = useState('All Languages')
  const [topicFilter, setTopicFilter] = useState('All Topics')
  const [sortBy, setSortBy] = useState('Recently Updated')
  const [explorePage, setExplorePage] = useState(1)

  // State for Bookmarks
  const [bookmarkSubTab, setBookmarkSubTab] = useState('All Bookmarks')
  const [bookmarkSearch, setBookmarkSearch] = useState('')
  const [bookmarkTypeFilter, setBookmarkTypeFilter] = useState('All Types')
  const [bookmarkSortBy, setBookmarkSortBy] = useState('Recently Added')

  // State for My Projects
  const [projectSubTab, setProjectSubTab] = useState('All Projects')
  const [projectSearch, setProjectSearch] = useState('')
  const [projectLanguageFilter, setProjectLanguageFilter] = useState('All Languages')
  const [projectSortBy, setProjectSortBy] = useState('Recently Updated')

  // Year filter for Contributions
  const [contribYear, setContribYear] = useState('This Year')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleTabChange = (tab: string) => {
    setActiveMainTab(tab)
    if (tab === 'My Contributions') {
      navigate('/opensource?tab=my-contributions', { replace: true })
    } else if (tab === 'Bookmarks') {
      navigate('/opensource?tab=bookmarks', { replace: true })
    } else if (tab === 'My Projects') {
      navigate('/opensource?tab=my-projects', { replace: true })
    } else {
      navigate('/opensource', { replace: true })
    }
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-blue-200 bg-brand-600 px-4 py-2.5 text-xs font-semibold text-white shadow-pop transition-all animate-bounce">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-ink-muted">
        <button
          type="button"
          onClick={() => handleTabChange('Explore')}
          className="hover:text-brand-600 transition-colors"
        >
          Open Source
        </button>
        <ChevronRight size={13} className="text-slate-400" />
        <span className="font-bold text-ink">{activeMainTab}</span>
      </nav>

      {/* Hero Header Card */}
      <Card className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-2xs",
              activeMainTab === 'Bookmarks' || activeMainTab === 'My Projects'
                ? "bg-purple-50 text-purple-600 border-purple-200"
                : activeMainTab === 'My Contributions'
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "bg-emerald-50 text-emerald-600 border-emerald-200"
            )}>
              {activeMainTab === 'Bookmarks' ? (
                <Bookmark size={28} className="stroke-[2.2]" />
              ) : activeMainTab === 'My Projects' ? (
                <Folder size={28} className="stroke-[2.2]" />
              ) : activeMainTab === 'My Contributions' ? (
                <Users size={28} className="stroke-[2.2]" />
              ) : (
                <Globe size={28} className="stroke-[2.2]" />
              )}
            </div>
            <div className="space-y-1.5">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                {activeMainTab === 'Bookmarks'
                  ? 'Bookmarks'
                  : activeMainTab === 'My Projects'
                  ? 'My Projects'
                  : activeMainTab === 'My Contributions'
                  ? 'My Contributions'
                  : 'Open Source'}
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted max-w-xl leading-relaxed">
                {activeMainTab === 'Bookmarks'
                  ? 'Your saved projects, repositories and resources for quick access.'
                  : activeMainTab === 'My Projects'
                  ? 'Projects you own or actively contribute to.'
                  : activeMainTab === 'My Contributions'
                  ? 'Track your open source journey and impact.'
                  : 'Contribute, collaborate and build amazing things together.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {activeMainTab === 'Bookmarks' ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => showToast('Opening Add Bookmark modal...')}
                className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs"
                leadingIcon={<Plus size={14} />}
              >
                Add Bookmark
              </Button>
            ) : activeMainTab === 'My Projects' ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => showToast('Opening New Open Source Project modal...')}
                className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs"
                leadingIcon={<Plus size={14} />}
              >
                New Project
              </Button>
            ) : activeMainTab === 'My Contributions' ? (
              <select
                value={contribYear}
                onChange={(e) => setContribYear(e.target.value)}
                className="rounded-xl border border-line bg-surface-subtle px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
              >
                <option value="This Year">This Year</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="All Time">All Time</option>
              </select>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => showToast('Opening New Open Source Project Submission modal...')}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs"
                leadingIcon={<Plus size={14} />}
              >
                New Project
              </Button>
            )}
          </div>
        </div>

        {/* Subtabs for Bookmarks/My Projects OR Stat Tiles for Explore/My Contributions */}
        {activeMainTab === 'Bookmarks' ? (
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4 text-xs font-semibold text-ink-muted">
            {['All Bookmarks', 'Projects', 'Repositories', 'People', 'Topics', 'Resources'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setBookmarkSubTab(st)}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg transition-all',
                  bookmarkSubTab === st
                    ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200'
                    : 'hover:bg-slate-50 hover:text-ink'
                )}
              >
                {st}
              </button>
            ))}
          </div>
        ) : activeMainTab === 'My Projects' ? (
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line/60 pt-4 text-xs font-semibold text-ink-muted">
            {['All Projects', 'Owned by Me', 'Contributing', 'Archived', 'Starred'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setProjectSubTab(st)}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg transition-all',
                  projectSubTab === st
                    ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200'
                    : 'hover:bg-slate-50 hover:text-ink'
                )}
              >
                {st}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5 pt-4 border-t border-line/60">
          {activeMainTab === 'My Contributions' ? (
            <>
              <div className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg sm:text-xl font-bold text-ink">28</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 5 this month</span>
                </div>
                <div className="text-xs text-ink-muted flex items-center gap-1.5">
                  <Code2 size={13} className="text-indigo-600" />
                  Contributions
                </div>
              </div>
              <div className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg sm:text-xl font-bold text-ink">12</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 2 this month</span>
                </div>
                <div className="text-xs text-ink-muted flex items-center gap-1.5">
                  <GitBranch size={13} className="text-purple-600" />
                  Repositories
                </div>
              </div>
              <div className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg sm:text-xl font-bold text-ink">18</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 7 this month</span>
                </div>
                <div className="text-xs text-ink-muted flex items-center gap-1.5">
                  <MessageSquare size={13} className="text-blue-600" />
                  Issues Resolved
                </div>
              </div>
              <div className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg sm:text-xl font-bold text-ink">16</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 4 this month</span>
                </div>
                <div className="text-xs text-ink-muted flex items-center gap-1.5">
                  <GitPullRequest size={13} className="text-purple-600" />
                  Pull Requests
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg sm:text-xl font-bold text-ink">124</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 12 this month</span>
                </div>
                <div className="text-xs text-ink-muted flex items-center gap-1.5">
                  <Users size={13} className="text-purple-600" />
                  Contributors
                </div>
              </div>
              <div className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg sm:text-xl font-bold text-ink">28</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 5 this month</span>
                </div>
                <div className="text-xs text-ink-muted flex items-center gap-1.5">
                  <Code2 size={13} className="text-blue-600" />
                  Active Projects
                </div>
              </div>
              <div className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg sm:text-xl font-bold text-ink">156</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 18 this month</span>
                </div>
                <div className="text-xs text-ink-muted flex items-center gap-1.5">
                  <GitPullRequest size={13} className="text-purple-600" />
                  Pull Requests
                </div>
              </div>
              <div className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg sm:text-xl font-bold text-ink">892</span>
                  <span className="text-[11px] font-semibold text-emerald-600">↑ 73 this month</span>
                </div>
                <div className="text-xs text-ink-muted flex items-center gap-1.5">
                  <Star size={13} className="text-amber-500 fill-amber-400" />
                  Stars Earned
                </div>
              </div>
            </>
          )}
        </div>
        )}
      </Card>

      {/* Main Tabs Row */}
      <div className="border-b border-line flex items-center gap-1 overflow-x-auto scrollbar-none">
        {['Explore', 'My Contributions', 'My Projects', 'Bookmarks', 'Organizations'].map((tab) => {
          const active = activeMainTab.toLowerCase() === tab.toLowerCase()
          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={cn(
                'whitespace-nowrap border-b-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all',
                active
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-ink-muted hover:border-slate-300 hover:text-ink'
              )}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* TAB 1: EXPLORE VIEW (Matching Images 2 & 4) */}
      {activeMainTab === 'Explore' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Search & Filter Strip */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative flex-1 w-full">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={exploreSearch}
                  onChange={(e) => setExploreSearch(e.target.value)}
                  placeholder="Search projects, topics, or technologies..."
                  className="w-full rounded-xl border border-line bg-surface pl-9 pr-4 py-2 text-xs text-ink placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="All Languages">All Languages</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Go">Go</option>
                </select>

                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="All Topics">All Topics</option>
                  <option value="Algorithms">Algorithms</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Developer Tools">Developer Tools</option>
                  <option value="Database">Database</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="Recently Updated">Sort by: Recently Updated</option>
                  <option value="Most Stars">Sort by: Most Stars</option>
                  <option value="Most Forks">Sort by: Most Forks</option>
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Opening Advanced Project Filters...')}
                  className="rounded-xl border-line text-xs font-semibold px-2.5"
                  leadingIcon={<Sliders size={13} />}
                >
                  Filters
                </Button>
              </div>
            </div>

            {/* 5 Project Cards */}
            <div className="space-y-3.5">
              {[
                {
                  id: 'dsa-visualizer',
                  name: 'c2cedge-edu / dsa-visualizer',
                  featured: true,
                  iconBg: 'bg-emerald-950 text-emerald-400 font-mono font-bold',
                  iconText: 'JS',
                  desc: 'Interactive visualizer for Data Structures and Algorithms. Learn by doing!',
                  tags: ['JavaScript', 'React', 'D3.js', 'Algorithms', 'Visualization'],
                  updated: 'Updated 2 days ago',
                  stars: '128',
                  forks: '32',
                },
                {
                  id: 'py-sheets',
                  name: 'c2cedge-edu / py-sheets',
                  iconBg: 'bg-blue-950 text-amber-400 font-mono font-bold',
                  iconText: 'Py',
                  desc: 'A lightweight Python library to read, write and analyze data from Google Sheets.',
                  tags: ['Python', 'Google API', 'Pandas', 'Data Analysis', 'Sheets'],
                  updated: 'Updated 5 days ago',
                  stars: '96',
                  forks: '21',
                },
                {
                  id: 'code-snippets',
                  name: 'c2cedge-edu / code-snippets',
                  iconBg: 'bg-purple-950 text-indigo-300 font-mono font-bold',
                  iconText: '</>',
                  desc: 'Collection of useful code snippets for developers.',
                  tags: ['TypeScript', 'Node.js', 'Utils', 'Snippets', 'Developer Tools'],
                  updated: 'Updated 1 week ago',
                  stars: '74',
                  forks: '18',
                },
                {
                  id: 'dev-utils',
                  name: 'c2cedge-edu / dev-utils',
                  iconBg: 'bg-rose-950 text-rose-300 font-mono font-bold',
                  iconText: '💡',
                  desc: 'A set of developer tools and utilities to boost productivity.',
                  tags: ['Go', 'CLI', 'Utilities', 'Developer Tools', 'Productivity'],
                  updated: 'Updated 1 week ago',
                  stars: '63',
                  forks: '11',
                },
                {
                  id: 'mongo-playground',
                  name: 'c2cedge-edu / mongo-playground',
                  iconBg: 'bg-emerald-900 text-emerald-300 font-mono font-bold',
                  iconText: '🍃',
                  desc: 'Playground to learn and experiment with MongoDB.',
                  tags: ['MongoDB', 'Database', 'NoSQL', 'Learning'],
                  updated: 'Updated 2 weeks ago',
                  stars: '52',
                  forks: '9',
                },
              ]
                .filter((p) => !exploreSearch || p.name.toLowerCase().includes(exploreSearch.toLowerCase()) || p.desc.toLowerCase().includes(exploreSearch.toLowerCase()))
                .map((proj) => (
                  <Card
                    key={proj.id}
                    className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-all hover:border-slate-300 hover:shadow-card cursor-pointer"
                    onClick={() => showToast(`Selected repository: ${proj.name}`)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs shadow-xs', proj.iconBg)}>
                          {proj.iconText}
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-display text-sm sm:text-base font-bold text-ink group-hover:text-brand-600 transition-colors">
                              {proj.name}
                            </h3>
                            {proj.featured && (
                              <span className="rounded-full bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 text-[10px] font-bold">
                                Featured
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-ink-muted max-w-xl leading-relaxed">
                            {proj.desc}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {proj.tags.map((t, tidx) => (
                              <span
                                key={tidx}
                                className="rounded-md border border-line bg-surface-subtle px-2 py-0.5 text-[10px] font-medium text-slate-600"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Meta & Actions */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-2 sm:pt-0 border-t border-line/40 sm:border-t-0">
                        <span className="text-[11px] text-slate-400">
                          {proj.updated}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              showToast(`Starred ${proj.name}`)
                            }}
                            className="flex items-center gap-1 rounded-lg border border-line bg-surface-subtle px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                          >
                            <Star size={12} className="text-amber-500 fill-amber-400" />
                            {proj.stars}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              showToast(`Forked ${proj.name}`)
                            }}
                            className="flex items-center gap-1 rounded-lg border border-line bg-surface-subtle px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                          >
                            <GitFork size={12} className="text-slate-500" />
                            {proj.forks}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1 pt-4">
              <button
                type="button"
                onClick={() => setExplorePage(Math.max(1, explorePage - 1))}
                disabled={explorePage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface hover:bg-surface-subtle disabled:opacity-50 text-xs font-bold"
              >
                &lt;
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setExplorePage(page)}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-semibold',
                    explorePage === page
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-line bg-surface text-ink hover:bg-surface-subtle'
                  )}
                >
                  {page}
                </button>
              ))}
              <span className="px-1 text-slate-400 text-xs">...</span>
              <button
                type="button"
                onClick={() => setExplorePage(10)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-xs font-semibold text-ink hover:bg-surface-subtle"
              >
                10
              </button>
              <button
                type="button"
                onClick={() => setExplorePage(Math.min(10, explorePage + 1))}
                disabled={explorePage === 10}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface hover:bg-surface-subtle disabled:opacity-50 text-xs font-bold"
              >
                &gt;
              </button>
            </div>
          </div>

          {/* Right Rail */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Contribution Overview */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-ink">Contribution Overview</h3>
                <button
                  type="button"
                  onClick={() => handleTabChange('My Contributions')}
                  className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                >
                  View All <ArrowRight size={11} />
                </button>
              </div>

              <div className="flex items-center gap-5">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-indigo-600 transition-all duration-1000"
                      strokeDasharray="68, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-base font-extrabold text-ink">68%</span>
                    <span className="text-[8px] text-ink-muted uppercase">Score</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs flex-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-ink-muted">
                      <span className="h-2 w-2 rounded-full bg-purple-600" /> Commits
                    </span>
                    <span className="font-bold text-ink">142</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-ink-muted">
                      <span className="h-2 w-2 rounded-full bg-blue-600" /> Pull Requests
                    </span>
                    <span className="font-bold text-ink">48</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-ink-muted">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Issues
                    </span>
                    <span className="font-bold text-ink">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-ink-muted">
                      <span className="h-2 w-2 rounded-full bg-amber-500" /> Reviews
                    </span>
                    <span className="font-bold text-ink">31</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Top Languages */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-ink">Top Languages</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing languages analytics...')}
                  className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                >
                  View All <ArrowRight size={11} />
                </button>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: 'JavaScript', pct: 42, color: 'bg-amber-400' },
                  { name: 'Python', pct: 28, color: 'bg-blue-500' },
                  { name: 'TypeScript', pct: 16, color: 'bg-indigo-500' },
                  { name: 'Go', pct: 8, color: 'bg-cyan-500' },
                  { name: 'Other', pct: 6, color: 'bg-slate-300' },
                ].map((lang, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-ink">{lang.name}</span>
                      <span className="text-ink-muted">{lang.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className={cn('h-full rounded-full', lang.color)} style={{ width: `${lang.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Open Source Events */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-ink">Open Source Events</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing all upcoming open source events...')}
                  className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                >
                  View All <ArrowRight size={11} />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { day: '15', month: 'MAY', title: 'Intro to Open Source', time: 'May 15, 2026 • 7:00 PM IST', status: 'Upcoming' },
                  { day: '22', month: 'MAY', title: 'Hacktoberfest Prep', time: 'May 22, 2026 • 7:00 PM IST', status: 'Upcoming' },
                  { day: '05', month: 'JUN', title: 'Contributing to Projects', time: 'Jun 5, 2026 • 7:00 PM IST', status: 'Upcoming' },
                ].map((ev, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center justify-center rounded-xl bg-blue-50 text-brand-600 border border-blue-200 h-11 w-11 shrink-0">
                        <span className="text-sm font-bold leading-tight">{ev.day}</span>
                        <span className="text-[9px] font-bold uppercase tracking-wider">{ev.month}</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink">{ev.title}</div>
                        <div className="text-[10px] text-ink-muted">{ev.time}</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold">
                      {ev.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Getting Started */}
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-blue-50/50 p-5 space-y-3">
              <h4 className="text-xs font-bold text-ink">Getting Started</h4>
              <p className="text-[11px] text-ink-muted leading-relaxed">
                New to open source? Start your journey with our guide and resources.
              </p>
              <button
                type="button"
                onClick={() => showToast('Opening Open Source Contribution Guide...')}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-800"
              >
                Open Source Guide <ArrowRight size={12} />
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* TAB 2: MY CONTRIBUTIONS VIEW (Matching Image 3) */}
      {activeMainTab === 'My Contributions' && (
        <div className="space-y-6">
          {/* Sub-tabs row */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none border-b border-line pb-2">
            {[
              'Overview',
              'Pull Requests',
              'Issues',
              'Repositories',
              'Activity',
              'Achievements',
              'Bookmarks',
            ].map((sub) => {
              const active = activeContribSubTab.toLowerCase() === sub.toLowerCase()
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setActiveContribSubTab(sub)}
                  className={cn(
                    'rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all',
                    active
                      ? 'bg-blue-50 text-brand-600 font-bold border border-blue-200/80 shadow-2xs'
                      : 'text-slate-600 hover:bg-surface-subtle hover:text-ink'
                  )}
                >
                  {sub}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Main Area */}
            <div className="lg:col-span-8 space-y-6">
              {/* Split row: Activity Heatmap & Top Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                {/* Contribution Heatmap Card */}
                <Card className="sm:col-span-8 rounded-2xl border border-line bg-surface p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xs sm:text-sm font-bold text-ink">Contribution Activity</h3>
                    <button
                      type="button"
                      onClick={() => showToast('Opening contribution settings...')}
                      className="text-[11px] font-semibold text-slate-500 hover:text-ink flex items-center gap-1"
                    >
                      Contribution settings ⌵
                    </button>
                  </div>

                  {/* Heatmap Grid mockup */}
                  <div className="overflow-x-auto pb-2">
                    <div className="min-w-[420px] space-y-1">
                      <div className="flex justify-between text-[9px] text-slate-400 px-6">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                      </div>
                      <div className="grid grid-cols-24 gap-1">
                        {Array.from({ length: 96 }).map((_, idx) => {
                          const intensity = idx % 7 === 0 ? 'bg-emerald-600' : idx % 5 === 0 ? 'bg-emerald-500' : idx % 3 === 0 ? 'bg-emerald-300' : idx % 2 === 0 ? 'bg-emerald-100' : 'bg-slate-100'
                          return (
                            <div
                              key={idx}
                              className={cn('h-2.5 w-2.5 rounded-xs transition-transform hover:scale-125', intensity)}
                              title={`Contributions on week ${idx + 1}`}
                            />
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-ink-muted pt-2 border-t border-line/60">
                    <span>Total contributions: <strong>312</strong></span>
                    <span>Longest streak: <strong>18 days</strong></span>
                  </div>
                </Card>

                {/* Top Contributed Languages */}
                <Card className="sm:col-span-4 rounded-2xl border border-line bg-surface p-5 space-y-3">
                  <h3 className="font-display text-xs sm:text-sm font-bold text-ink">Top Contributed Languages</h3>
                  <div className="flex flex-col items-center justify-center pt-2">
                    <div className="relative flex h-24 w-24 items-center justify-center">
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#9333ea" strokeWidth="5" strokeDasharray="42 100" />
                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#2563eb" strokeWidth="5" strokeDasharray="28 100" strokeDashoffset="-42" />
                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10b981" strokeWidth="5" strokeDasharray="16 100" strokeDashoffset="-70" />
                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f59e0b" strokeWidth="5" strokeDasharray="8 100" strokeDashoffset="-86" />
                      </svg>
                    </div>

                    <div className="w-full space-y-1 pt-3 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-purple-600" /> JavaScript</span>
                        <span className="font-bold">42%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-600" /> Python</span>
                        <span className="font-bold">28%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> TypeScript</span>
                        <span className="font-bold">16%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Go</span>
                        <span className="font-bold">8%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Contributions Card */}
              <Card className="rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm sm:text-base font-bold text-ink">Recent Contributions</h3>
                  <button
                    type="button"
                    onClick={() => showToast('Opening all contributions log...')}
                    className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    View all activity <ArrowRight size={12} />
                  </button>
                </div>

                <div className="divide-y divide-line/60">
                  {[
                    {
                      repo: 'c2cedge / dsa-visualizer',
                      featured: true,
                      title: 'feat: add tree traversal visualization #142',
                      iconBg: 'bg-emerald-900 text-emerald-300 font-mono',
                      iconText: 'JS',
                      status: 'Merged PR',
                      statusColor: 'bg-purple-50 text-purple-700 border-purple-200',
                      statusIcon: <GitMerge size={12} />,
                      time: '2 days ago',
                    },
                    {
                      repo: 'c2cedge / py-sheets',
                      title: 'fix: handle empty rows in sheet parser #87',
                      iconBg: 'bg-blue-950 text-amber-400 font-mono',
                      iconText: 'Py',
                      status: 'Closed Issue',
                      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
                      statusIcon: <CheckCircle2 size={12} />,
                      time: '5 days ago',
                    },
                    {
                      repo: 'c2cedge / code-snippets',
                      title: 'docs: update README with contributing guide #63',
                      iconBg: 'bg-purple-950 text-indigo-300 font-mono',
                      iconText: '</>',
                      status: 'Merged PR',
                      statusColor: 'bg-purple-50 text-purple-700 border-purple-200',
                      statusIcon: <GitMerge size={12} />,
                      time: '1 week ago',
                    },
                    {
                      repo: 'c2cedge / mongo-playground',
                      title: 'feat: add aggregation pipeline examples #34',
                      iconBg: 'bg-emerald-950 text-emerald-400 font-mono',
                      iconText: '🍃',
                      status: 'Merged PR',
                      statusColor: 'bg-purple-50 text-purple-700 border-purple-200',
                      statusIcon: <GitMerge size={12} />,
                      time: '2 weeks ago',
                    },
                    {
                      repo: 'c2cedge / dev-utils',
                      title: 'chore: update dependencies #29',
                      iconBg: 'bg-rose-950 text-rose-300 font-mono',
                      iconText: '💡',
                      status: 'Closed Issue',
                      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
                      statusIcon: <CheckCircle2 size={12} />,
                      time: '2 weeks ago',
                    },
                  ].map((contrib, idx) => (
                    <div
                      key={idx}
                      onClick={() => showToast(`Selected contribution: ${contrib.title}`)}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 group cursor-pointer hover:bg-slate-50/50 px-2 rounded-xl transition-colors"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs shadow-xs', contrib.iconBg)}>
                          {contrib.iconText}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-ink">{contrib.repo}</span>
                            {contrib.featured && (
                              <span className="rounded-full bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.2 text-[9px] font-bold">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-ink-muted group-hover:text-brand-600 transition-colors mt-0.5">
                            {contrib.title}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold', contrib.statusColor)}>
                          {contrib.statusIcon}
                          {contrib.status}
                        </span>
                        <span className="text-[11px] text-slate-400 min-w-[70px] text-right">
                          {contrib.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => showToast('Opening complete contribution log...')}
                    className="rounded-xl border-line text-xs font-semibold"
                  >
                    View all contributions →
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Rail */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Contribution Summary */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-ink">Contribution Summary</h3>
                  <button
                    type="button"
                    onClick={() => showToast('Viewing contribution metrics...')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                  >
                    View all <ArrowRight size={11} />
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><Users size={13} className="text-indigo-600" /> Contributions</span>
                    <span className="font-bold text-ink">28</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><GitBranch size={13} className="text-purple-600" /> Repositories</span>
                    <span className="font-bold text-ink">12</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-600" /> Issues Resolved</span>
                    <span className="font-bold text-ink">18</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><GitPullRequest size={13} className="text-blue-600" /> Pull Requests</span>
                    <span className="font-bold text-ink">16</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-line/40">
                    <span className="text-ink-muted flex items-center gap-1.5"><Star size={13} className="text-amber-500 fill-amber-400" /> Stars Earned</span>
                    <span className="font-bold text-ink">156</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-ink font-bold">Total Impact</span>
                    <span className="font-extrabold text-indigo-700 text-sm">312</span>
                  </div>
                </div>
              </Card>

              {/* Current Streak */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-ink">Current Streak</h3>
                  <span className="text-[11px] text-ink-muted">Keep it up! 🎉</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <Flame size={20} className="text-orange-500 fill-orange-400" />
                  <span className="font-display text-2xl font-black text-ink">18 days</span>
                </div>
                {/* SVG trend sparkline */}
                <div className="h-10 w-full">
                  <svg className="h-full w-full overflow-visible" viewBox="0 0 200 40">
                    <path
                      d="M 0 30 Q 30 15, 60 25 T 120 10 T 170 20 T 200 5"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                    />
                    <circle cx="200" cy="5" r="3.5" fill="#6366f1" />
                  </svg>
                </div>
                <div className="text-[11px] text-slate-400 text-right">
                  Best streak: 24 days
                </div>
              </Card>

              {/* Badges Earned */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-ink">Badges Earned</h3>
                  <button
                    type="button"
                    onClick={() => showToast('Viewing all earned contributor badges...')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                  >
                    View all <ArrowRight size={11} />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { title: 'First PR', icon: '🚀', bg: 'bg-purple-50 border-purple-200' },
                    { title: 'Issue Solver', icon: '🎯', bg: 'bg-blue-50 border-blue-200' },
                    { title: 'Active Contributor', icon: '⚡', bg: 'bg-emerald-50 border-emerald-200' },
                    { title: 'Streak Master', icon: '🔥', bg: 'bg-amber-50 border-amber-200' },
                  ].map((bdg, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className={cn('mx-auto flex h-10 w-10 items-center justify-center rounded-xl border text-base shadow-2xs', bdg.bg)}>
                        {bdg.icon}
                      </div>
                      <div className="text-[10px] font-bold text-ink leading-tight">{bdg.title}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Explore Projects CTA */}
              <div className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3 text-center">
                <h4 className="text-xs font-bold text-ink">Explore Projects</h4>
                <p className="text-[11px] text-ink-muted">
                  Looking for more projects to contribute to?
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTabChange('Explore')}
                  className="w-full rounded-xl text-xs font-semibold text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                  trailingIcon={<ArrowRight size={12} />}
                >
                  Explore Projects
                </Button>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* TAB 3: BOOKMARKS VIEW (Matches media_1788779857540.png) */}
      {activeMainTab === 'Bookmarks' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Search & Filter Strip */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative flex-1 w-full">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={bookmarkSearch}
                  onChange={(e) => setBookmarkSearch(e.target.value)}
                  placeholder="Search your bookmarks..."
                  className="w-full rounded-xl border border-line bg-surface pl-9 pr-4 py-2 text-xs text-ink placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={bookmarkTypeFilter}
                  onChange={(e) => setBookmarkTypeFilter(e.target.value)}
                  className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="All Types">All Types</option>
                  <option value="Repositories">Repositories</option>
                  <option value="Projects">Projects</option>
                  <option value="Resources">Resources</option>
                </select>

                <select
                  value={bookmarkSortBy}
                  onChange={(e) => setBookmarkSortBy(e.target.value)}
                  className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="Recently Added">Sort: Recently Added</option>
                  <option value="Most Starred">Sort: Most Starred</option>
                  <option value="Alphabetical">Sort: Name (A-Z)</option>
                </select>

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => showToast('Opening advanced filters...')}
                  className="rounded-xl text-xs font-semibold text-slate-700 border-line hover:bg-slate-50"
                  leadingIcon={<Filter size={13} />}
                >
                  Filters
                </Button>
              </div>
            </div>

            {/* Bookmarks List (6 Cards) */}
            <div className="space-y-3">
              {[
                {
                  id: 'dsa-visualizer',
                  name: 'dsa-visualizer',
                  type: 'Repository',
                  desc: 'Interactive visualizer for Data Structures and Algorithms. Learn by doing!',
                  tags: ['JavaScript', 'React', 'D3.js', 'Algorithms', 'Visualization'],
                  dotColor: 'bg-amber-400',
                  icon: <span className="font-bold text-xs text-amber-700">JS</span>,
                  iconBg: 'bg-amber-100 border-amber-300',
                  time: '2 days ago',
                },
                {
                  id: 'py-sheets',
                  name: 'py-sheets',
                  type: 'Repository',
                  desc: 'A lightweight Python library to read, write and analyze data from Google Sheets.',
                  tags: ['Python', 'Google API', 'Pandas', 'Data Analysis', 'Sheets'],
                  dotColor: 'bg-blue-500',
                  icon: <Code2 size={16} className="text-blue-600" />,
                  iconBg: 'bg-blue-50 border-blue-200',
                  time: '5 days ago',
                },
                {
                  id: 'code-snippets',
                  name: 'code-snippets',
                  type: 'Repository',
                  desc: 'Collection of useful code snippets for developers.',
                  tags: ['TypeScript', 'Node.js', 'Utils', 'Snippets', 'Developer Tools'],
                  dotColor: 'bg-indigo-500',
                  icon: <FileCode size={16} className="text-purple-600" />,
                  iconBg: 'bg-purple-50 border-purple-200',
                  time: '1 week ago',
                },
                {
                  id: 'dev-utils',
                  name: 'dev-utils',
                  type: 'Repository',
                  desc: 'A set of developer tools and utilities to boost productivity.',
                  tags: ['Go', 'CLI', 'Utilities', 'Developer Tools', 'Productivity'],
                  dotColor: 'bg-cyan-500',
                  icon: <Sparkles size={16} className="text-amber-500" />,
                  iconBg: 'bg-amber-50 border-amber-200',
                  time: '1 week ago',
                },
                {
                  id: 'mongo-playground',
                  name: 'mongo-playground',
                  type: 'Repository',
                  desc: 'Playground to learn and experiment with MongoDB.',
                  tags: ['MongoDB', 'Database', 'NoSQL', 'Learning'],
                  dotColor: 'bg-emerald-500',
                  icon: <Layers size={16} className="text-emerald-600" />,
                  iconBg: 'bg-emerald-50 border-emerald-200',
                  time: '2 weeks ago',
                },
                {
                  id: 'react-hook-form',
                  name: 'react-hook-form',
                  type: 'Repository',
                  desc: 'Performant, flexible and extensible forms with easy-to-use validation.',
                  tags: ['TypeScript', 'React', 'Forms', 'Validation'],
                  dotColor: 'bg-cyan-500',
                  icon: <Code2 size={16} className="text-cyan-600" />,
                  iconBg: 'bg-cyan-50 border-cyan-200',
                  time: '2 weeks ago',
                },
              ].map((bm) => (
                <Card
                  key={bm.id}
                  className="rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-xs hover:border-brand-200 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-2xs', bm.iconBg)}>
                        {bm.icon}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-xs sm:text-sm font-bold text-ink">
                            {bm.name}
                          </h3>
                          <span className="rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold px-2 py-0.5">
                            {bm.type}
                          </span>
                        </div>

                        <p className="text-xs text-ink-muted leading-relaxed">
                          {bm.desc}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {bm.tags.map((tg, idx) => (
                            <span
                              key={tg}
                              className={cn(
                                'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold border',
                                idx === 0
                                  ? 'bg-slate-50 text-ink border-line'
                                  : 'bg-surface text-ink-muted border-line/60'
                              )}
                            >
                              {idx === 0 && <span className={cn('h-1.5 w-1.5 rounded-full', bm.dotColor)} />}
                              {tg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => showToast(`Removed ${bm.name} from bookmarks`)}
                        className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
                        title="Remove bookmark"
                      >
                        <Bookmark size={16} className="fill-purple-600" />
                      </button>

                      <span className="text-[11px] text-ink-muted hidden sm:inline whitespace-nowrap">
                        {bm.time}
                      </span>

                      <button
                        type="button"
                        className="p-1 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-50"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-ink-muted">
              <span>Showing 1 to 6 of 24 bookmarks</span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="p-1.5 rounded-lg border border-line bg-surface text-slate-400 hover:bg-slate-50 disabled:opacity-40"
                  disabled
                >
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="h-7 w-7 rounded-lg bg-brand-600 text-white font-bold text-xs">
                  1
                </button>
                <button type="button" className="h-7 w-7 rounded-lg border border-line bg-surface text-ink font-semibold text-xs hover:bg-slate-50">
                  2
                </button>
                <button type="button" className="h-7 w-7 rounded-lg border border-line bg-surface text-ink font-semibold text-xs hover:bg-slate-50">
                  3
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button type="button" className="h-7 w-7 rounded-lg border border-line bg-surface text-ink font-semibold text-xs hover:bg-slate-50">
                  4
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-lg border border-line bg-surface text-ink hover:bg-slate-50"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Aside (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Bookmark Overview (6 Tiles) */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Bookmark Overview</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing all bookmarks overview...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View all &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {[
                  { label: 'Total Bookmarks', val: '24', icon: <Bookmark size={15} className="text-purple-600" /> },
                  { label: 'Repositories', val: '12', icon: <Code2 size={15} className="text-blue-600" /> },
                  { label: 'Projects', val: '6', icon: <Layers size={15} className="text-emerald-600" /> },
                  { label: 'People', val: '2', icon: <User size={15} className="text-amber-600" /> },
                  { label: 'Topics', val: '3', icon: <span className="font-bold text-xs text-indigo-600">#</span> },
                  { label: 'Resources', val: '1', icon: <FileText size={15} className="text-rose-600" /> },
                ].map((ov, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-line/70 bg-slate-50/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-black text-ink">{ov.val}</span>
                      {ov.icon}
                    </div>
                    <p className="text-[10px] font-semibold text-ink-muted">{ov.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Categories */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Categories</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing all categories...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View all &rarr;
                </button>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                {[
                  { name: 'Algorithms & Data Structures', count: 6, icon: <Code2 size={13} className="text-blue-600" /> },
                  { name: 'Developer Tools', count: 5, icon: <Sparkles size={13} className="text-purple-600" /> },
                  { name: 'Data Science', count: 4, icon: <BarChart2 size={13} className="text-cyan-600" /> },
                  { name: 'Web Development', count: 4, icon: <Globe size={13} className="text-emerald-600" /> },
                  { name: 'Databases', count: 3, icon: <Layers size={13} className="text-amber-600" /> },
                  { name: 'Others', count: 2, icon: <FileText size={13} className="text-slate-500" /> },
                ].map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-700 hover:text-brand-600 cursor-pointer py-0.5">
                    <div className="flex items-center gap-2">
                      {cat.icon}
                      <span className="font-semibold text-[11px]">{cat.name}</span>
                    </div>
                    <span className="text-[11px] font-bold text-ink-muted">{cat.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Popular Tags */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Popular Tags</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing all tags...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View all &rarr;
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { name: 'javascript', count: 8 },
                  { name: 'python', count: 6 },
                  { name: 'typescript', count: 5 },
                  { name: 'react', count: 5 },
                  { name: 'go', count: 4 },
                  { name: 'database', count: 3 },
                  { name: 'algorithms', count: 3 },
                  { name: 'cli', count: 2 },
                  { name: 'visualization', count: 2 },
                  { name: 'api', count: 2 },
                ].map((tg) => (
                  <button
                    key={tg.name}
                    type="button"
                    onClick={() => showToast(`Filtering by tag #${tg.name}`)}
                    className="inline-flex items-center gap-1 rounded-lg border border-line/80 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-600 transition-colors"
                  >
                    <span>{tg.name}</span>
                    <span className="text-slate-400 font-normal">{tg.count}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => showToast('Showing all 24 tags...')}
                className="text-[11px] font-bold text-brand-600 hover:underline pt-1 block"
              >
                Show more &rarr;
              </button>
            </Card>

            {/* Stay Organized */}
            <Card className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/40 p-5 shadow-xs space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-display text-xs font-bold text-ink">Stay Organized</h4>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    Use categories and tags to easily find your saved bookmarks.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 border border-purple-200 shadow-2xs">
                  <Bookmark size={20} />
                </div>
              </div>
            </Card>
          </aside>
        </div>
      )}

      {/* TAB 4: MY PROJECTS VIEW (Matches media_1788780706779.png) */}
      {activeMainTab === 'My Projects' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Search & Filter Strip */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative flex-1 w-full">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Search my projects..."
                  className="w-full rounded-xl border border-line bg-surface pl-9 pr-4 py-2 text-xs text-ink placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={projectLanguageFilter}
                  onChange={(e) => setProjectLanguageFilter(e.target.value)}
                  className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="All Languages">All Languages</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Go">Go</option>
                </select>

                <select
                  value={projectSortBy}
                  onChange={(e) => setProjectSortBy(e.target.value)}
                  className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="Recently Updated">Sort: Recently Updated</option>
                  <option value="Most Starred">Sort: Most Starred</option>
                  <option value="Most Forks">Sort: Most Forks</option>
                </select>

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => showToast('Opening advanced project filters...')}
                  className="rounded-xl text-xs font-semibold text-slate-700 border-line hover:bg-slate-50"
                  leadingIcon={<Filter size={13} />}
                >
                  Filters
                </Button>
              </div>
            </div>

            {/* Projects List (5 Cards) */}
            <div className="space-y-3">
              {[
                {
                  id: 'dsa-visualizer',
                  name: 'dsa-visualizer',
                  badge: 'Owner',
                  badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
                  desc: 'Interactive visualizer for Data Structures and Algorithms. Learn by doing!',
                  tags: ['JavaScript', 'React', 'D3.js', 'Algorithms', 'Visualization'],
                  dotColor: 'bg-amber-400',
                  icon: <span className="font-bold text-xs text-amber-700">JS</span>,
                  iconBg: 'bg-amber-100 border-amber-300',
                  time: 'Updated 2 days ago',
                  stars: '1.2k',
                  forks: '312',
                  issues: '28',
                },
                {
                  id: 'py-sheets',
                  name: 'py-sheets',
                  badge: 'Owner',
                  badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
                  desc: 'A lightweight Python library to read, write and analyze data from Google Sheets.',
                  tags: ['Python', 'Google API', 'Pandas', 'Data Analysis', 'Sheets'],
                  dotColor: 'bg-blue-500',
                  icon: <Code2 size={16} className="text-blue-600" />,
                  iconBg: 'bg-blue-50 border-blue-200',
                  time: 'Updated 5 days ago',
                  stars: '856',
                  forks: '201',
                  issues: '16',
                },
                {
                  id: 'code-snippets',
                  name: 'code-snippets',
                  badge: 'Contributor',
                  badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  desc: 'Collection of useful code snippets for developers.',
                  tags: ['TypeScript', 'Node.js', 'Utils', 'Snippets', 'Developer Tools'],
                  dotColor: 'bg-indigo-500',
                  icon: <FileCode size={16} className="text-purple-600" />,
                  iconBg: 'bg-purple-50 border-purple-200',
                  time: 'Updated 1 week ago',
                  stars: '642',
                  forks: '158',
                  issues: '22',
                },
                {
                  id: 'dev-utils',
                  name: 'dev-utils',
                  badge: 'Contributor',
                  badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  desc: 'A set of developer tools and utilities to boost productivity.',
                  tags: ['Go', 'CLI', 'Utilities', 'Developer Tools', 'Productivity'],
                  dotColor: 'bg-cyan-500',
                  icon: <Sparkles size={16} className="text-amber-500" />,
                  iconBg: 'bg-amber-50 border-amber-200',
                  time: 'Updated 1 week ago',
                  stars: '512',
                  forks: '134',
                  issues: '18',
                },
                {
                  id: 'mongo-playground',
                  name: 'mongo-playground',
                  badge: 'Contributor',
                  badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  desc: 'Playground to learn and experiment with MongoDB.',
                  tags: ['MongoDB', 'Database', 'NoSQL', 'Learning'],
                  dotColor: 'bg-emerald-500',
                  icon: <Layers size={16} className="text-emerald-600" />,
                  iconBg: 'bg-emerald-50 border-emerald-200',
                  time: 'Updated 2 weeks ago',
                  stars: '423',
                  forks: '97',
                  issues: '13',
                },
              ].map((proj) => (
                <Card
                  key={proj.id}
                  className="rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-xs hover:border-brand-200 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-2xs', proj.iconBg)}>
                        {proj.icon}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-xs sm:text-sm font-bold text-ink">
                            {proj.name}
                          </h3>
                          <span className={cn('rounded-md border text-[10px] font-bold px-2 py-0.5', proj.badgeColor)}>
                            {proj.badge}
                          </span>
                        </div>

                        <p className="text-xs text-ink-muted leading-relaxed">
                          {proj.desc}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {proj.tags.map((tg, idx) => (
                            <span
                              key={tg}
                              className={cn(
                                'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold border',
                                idx === 0
                                  ? 'bg-slate-50 text-ink border-line'
                                  : 'bg-surface text-ink-muted border-line/60'
                              )}
                            >
                              {idx === 0 && <span className={cn('h-1.5 w-1.5 rounded-full', proj.dotColor)} />}
                              {tg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-line/60">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-ink-muted whitespace-nowrap">
                          {proj.time}
                        </span>
                        <button
                          type="button"
                          className="p-1 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-50"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Star size={13} className="text-slate-400" />
                          <span className="font-semibold">{proj.stars}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={13} className="text-slate-400" />
                          <span className="font-semibold">{proj.forks}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-3 w-3 rounded-full border border-slate-400 flex items-center justify-center text-[8px] font-bold">!</span>
                          <span className="font-semibold">{proj.issues}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-ink-muted">
              <span>Showing 1 to 5 of 8 projects</span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="p-1.5 rounded-lg border border-line bg-surface text-slate-400 hover:bg-slate-50 disabled:opacity-40"
                  disabled
                >
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="h-7 w-7 rounded-lg bg-brand-600 text-white font-bold text-xs">
                  1
                </button>
                <button type="button" className="h-7 w-7 rounded-lg border border-line bg-surface text-ink font-semibold text-xs hover:bg-slate-50">
                  2
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-lg border border-line bg-surface text-ink hover:bg-slate-50"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Aside (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Projects Overview */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Projects Overview</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing full projects overview...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View all &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {[
                  { label: 'Total Projects', val: '5', icon: <Folder size={15} className="text-purple-600" /> },
                  { label: 'Owned by Me', val: '2', icon: <User size={15} className="text-blue-600" /> },
                  { label: 'Contributing', val: '3', icon: <Users size={15} className="text-emerald-600" /> },
                  { label: 'Archived', val: '0', icon: <Layers size={15} className="text-amber-600" /> },
                ].map((ov, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-line/70 bg-slate-50/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-black text-ink">{ov.val}</span>
                      {ov.icon}
                    </div>
                    <p className="text-[10px] font-semibold text-ink-muted">{ov.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Languages */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Top Languages</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing all language statistics...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View all &rarr;
                </button>
              </div>

              <div className="space-y-2.5 pt-1 text-xs">
                {[
                  { name: 'JavaScript', pct: 42, icon: <span className="font-bold text-[10px] text-amber-600">JS</span>, bg: 'bg-amber-100' },
                  { name: 'Python', pct: 28, icon: <Code2 size={12} className="text-blue-600" />, bg: 'bg-blue-50' },
                  { name: 'TypeScript', pct: 16, icon: <span className="font-bold text-[10px] text-indigo-600">TS</span>, bg: 'bg-indigo-50' },
                  { name: 'Go', pct: 8, icon: <span className="font-bold text-[10px] text-cyan-600">GO</span>, bg: 'bg-cyan-50' },
                  { name: 'Other', pct: 6, icon: <span className="text-[10px] text-slate-500">•••</span>, bg: 'bg-slate-100' },
                ].map((lang, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn('flex h-5 w-5 items-center justify-center rounded', lang.bg)}>
                          {lang.icon}
                        </span>
                        <span className="font-semibold text-slate-700">{lang.name}</span>
                      </div>
                      <span className="font-bold text-ink">{lang.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-600 rounded-full" style={{ width: `${lang.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-ink">Recent Activity</h3>
                <button
                  type="button"
                  onClick={() => showToast('Viewing full activity stream...')}
                  className="text-[11px] font-bold text-brand-600 hover:underline"
                >
                  View all &rarr;
                </button>
              </div>

              <div className="space-y-3 pt-1 text-xs">
                {[
                  {
                    icon: <GitMerge size={14} className="text-emerald-600" />,
                    bg: 'bg-emerald-50 border-emerald-200',
                    title: 'Merged pull request #142 in dsa-visualizer',
                    time: '2 days ago',
                  },
                  {
                    icon: <CheckCircle2 size={14} className="text-blue-600" />,
                    bg: 'bg-blue-50 border-blue-200',
                    title: 'Closed issue #87 in py-sheets',
                    time: '5 days ago',
                  },
                  {
                    icon: <Star size={14} className="text-amber-500 fill-amber-400" />,
                    bg: 'bg-amber-50 border-amber-200',
                    title: 'Starred code-snippets',
                    time: '1 week ago',
                  },
                  {
                    icon: <GitCommit size={14} className="text-indigo-600" />,
                    bg: 'bg-indigo-50 border-indigo-200',
                    title: 'Pushed 3 commits to dev-utils',
                    time: '1 week ago',
                  },
                ].map((act, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border shadow-2xs mt-0.5', act.bg)}>
                      {act.icon}
                    </div>
                    <div>
                      <p className="font-bold text-ink leading-snug">{act.title}</p>
                      <p className="text-[10px] text-ink-muted">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Create Something New */}
            <Card className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/60 via-white to-blue-50/40 p-5 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-display text-xs font-bold text-ink">Create Something New ✨</h4>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    Start a new open source project and make an impact.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 border border-purple-200 shadow-2xs">
                  <Folder size={20} />
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => showToast('Launching project creation wizard...')}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold"
                leadingIcon={<Plus size={14} />}
              >
                New Project
              </Button>
            </Card>
          </aside>
        </div>
      )}

      {/* Fallback for other sub-tabs (Organizations) */}
      {!['explore', 'my contributions', 'bookmarks', 'my projects'].includes(activeMainTab.toLowerCase()) && (
        <Card className="rounded-2xl border border-line bg-surface p-8 text-center space-y-4 shadow-card">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <Layers size={28} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-ink">{activeMainTab} Workspace</h3>
            <p className="text-xs text-ink-muted mt-1 max-w-md mx-auto leading-relaxed">
              You are viewing the {activeMainTab} section. All open source repositories, bookmarks, and collaborative groups are actively synchronized.
            </p>
          </div>
          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleTabChange('Explore')}
              className="bg-brand-600 text-white"
            >
              Back to Explore
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

