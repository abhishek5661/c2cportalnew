import { useState } from 'react'
import {
  Users,
  Video,
  MessageSquare,
  GitPullRequest,
  CheckCircle2,
  Clock,
  Star,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  ExternalLink,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Send,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

interface Mentor {
  id: string
  name: string
  role: string
  company: string
  avatarBg: string
  rating: number
  sessions: number
  experience: string
  expertise: string[]
  nextSlot: string
  bio: string
}

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Siddharth Rao',
    role: 'Staff Software Engineer',
    company: 'Google',
    avatarBg: 'bg-blue-600',
    rating: 4.98,
    sessions: 184,
    experience: '9+ yrs',
    expertise: ['Advanced DSA', 'System Design', 'Googliness & Behavioral'],
    nextSlot: 'Tomorrow, 5:30 PM IST',
    bio: 'Ex-Amazon, currently leading infrastructure services at Google Mountain View. Mentored 200+ students to top-tier offers.',
  },
  {
    id: '2',
    name: 'Aishwarya Sen',
    role: 'Senior SDE-2',
    company: 'Microsoft',
    avatarBg: 'bg-emerald-600',
    rating: 4.95,
    sessions: 142,
    experience: '6+ yrs',
    expertise: ['Dynamic Programming', 'LLD & OOPs', 'Azure Cloud'],
    nextSlot: 'Thursday, 7:00 PM IST',
    bio: 'Core contributor to Microsoft 365 developer platform. Specializes in breaking down complex recursion and state machine DP.',
  },
  {
    id: '3',
    name: 'Karan Mehra',
    role: 'Engineering Lead',
    company: 'Razorpay',
    avatarBg: 'bg-purple-600',
    rating: 4.92,
    sessions: 116,
    experience: '7+ yrs',
    expertise: ['Fintech Architecture', 'High-Scale Backend', 'Mock Interviews'],
    nextSlot: 'Friday, 6:00 PM IST',
    bio: 'Architected high-throughput payment settlement pipelines processing 10k+ TPS. Passionate about clean code and system reliability.',
  },
  {
    id: '4',
    name: 'Divya Nambiar',
    role: 'Senior Frontend Architect',
    company: 'Atlassian',
    avatarBg: 'bg-indigo-600',
    rating: 4.97,
    sessions: 95,
    experience: '8+ yrs',
    expertise: ['React & Next.js Internals', 'Web Performance', 'Portfolio Audit'],
    nextSlot: 'Saturday, 11:00 AM IST',
    bio: 'Design systems lead at Jira Cloud. Helps engineers turn standard side projects into standout production-grade portfolios.',
  },
]

const peerPullRequests = [
  {
    id: 'pr-1',
    title: 'Feat: Distributed In-Memory Cache with LRU Eviction & Gossip Protocol',
    repo: 'alex-j/go-cache-distributed',
    author: 'Alex Johnson (You)',
    status: 'In Review',
    submittedDate: '2 hours ago',
    reviewsReceived: 2,
    reviewsRequired: 3,
    xpReward: 35,
    tags: ['Go', 'Concurrency', 'Networking'],
  },
  {
    id: 'pr-2',
    title: 'Refactor: Optimize Graph DFS Space Complexity using Bitmasks',
    repo: 'priya-tech/algo-forge',
    author: 'Priya Sharma',
    status: 'Needs Review',
    submittedDate: '5 hours ago',
    reviewsReceived: 1,
    reviewsRequired: 2,
    xpReward: 30,
    tags: ['C++', 'Algorithms', 'Bitwise'],
  },
  {
    id: 'pr-3',
    title: 'Feat: Add JWT Auth Interceptor & Refresh Token Rotation',
    repo: 'rohan-dev/campus-hub-api',
    author: 'Rohan Deshmukh',
    status: 'Needs Review',
    submittedDate: '1 day ago',
    reviewsReceived: 0,
    reviewsRequired: 2,
    xpReward: 25,
    tags: ['TypeScript', 'Node.js', 'Security'],
  },
]

const activeDoubts = [
  {
    id: 'd-1',
    channel: '#dsa-doubts',
    title: 'Why does Dijkstra fail with negative weights while Bellman-Ford succeeds?',
    author: 'Tanvi P. (Batch 2026)',
    time: '25m ago',
    replies: 4,
    upvotes: 12,
    hasVerifiedAnswer: true,
    preview: 'I understand Dijkstra greedily assumes visited nodes have final shortest paths, but in what exact DAG configuration does it break?',
  },
  {
    id: 'd-2',
    channel: '#system-design',
    title: 'Preventing double-seat booking in distributed ticketing with Redis distributed lock vs Postgres SELECT FOR UPDATE',
    author: 'Devendra K. (Batch 2026)',
    time: '2h ago',
    replies: 7,
    upvotes: 19,
    hasVerifiedAnswer: true,
    preview: 'Redlock vs database level pessimistic locking: Which is preferred when processing concurrent bookings for 100k seats in under 5 seconds?',
  },
  {
    id: 'd-3',
    channel: '#hackathon-teams',
    title: 'Looking for 1 Backend Dev (Go / Python) for Smart India Hackathon (SIH 2026)',
    author: 'Ananya S. (Batch 2026)',
    time: '4h ago',
    replies: 5,
    upvotes: 8,
    hasVerifiedAnswer: false,
    preview: 'We are a 3-member team (2 Full-Stack + 1 ML/Computer Vision). Problem statement: Real-time traffic optimization using edge AI.',
  },
]

export function MentorPage() {
  const [activeTab, setActiveTab] = useState<'mentors' | 'peer-reviews' | 'doubts' | 'ama'>('mentors')
  const [filterExpertise, setFilterExpertise] = useState('all')
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null)

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300">
            <Users size={13} className="text-teal-400" />
            Pillars 4 &amp; 6: Mentor Connect &amp; Community
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Industry Mentorship &amp; Peer Code Review
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Accelerate through your 4-year journey with 1:1 guidance from engineers at top tech companies, exchange real GitHub pull request reviews with peers, and collaborate in active engineering doubt forums.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 sm:gap-3">
            {[
              { id: 'mentors', label: '1:1 Industry Mentors' },
              { id: 'peer-reviews', label: 'Peer PR Exchange' },
              { id: 'doubts', label: 'Doubt Clearing Channels' },
              { id: 'ama', label: 'Live AMAs & Webinars' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'rounded-xl px-4 py-2 text-xs font-bold transition-all',
                  activeTab === tab.id
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {bookingSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{bookingSuccess}</span>
          </div>
          <button
            type="button"
            onClick={() => setBookingSuccess(null)}
            className="text-emerald-700 hover:underline font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* TAB 1: 1:1 INDUSTRY MENTORS */}
      {activeTab === 'mentors' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">
                Verified Tech Mentors
              </h2>
              <p className="text-xs text-ink-muted">
                Free 45-minute 1:1 video sessions included with your c2cedge college program.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-ink-muted font-medium">Filter:</span>
              <select
                value={filterExpertise}
                onChange={(e) => setFilterExpertise(e.target.value)}
                className="rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Specialties</option>
                <option value="Advanced DSA">Data Structures</option>
                <option value="System Design">System Design</option>
                <option value="React & Next.js Internals">Frontend &amp; Web</option>
                <option value="Fintech Architecture">High-Scale Backend</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {mentors
              .filter((m) =>
                filterExpertise === 'all' ? true : m.expertise.includes(filterExpertise),
              )
              .map((mentor) => (
                <Card key={mentor.id} className="rounded-2xl border border-line bg-surface p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'h-12 w-12 rounded-2xl flex items-center justify-center font-display text-base font-bold text-white shadow-sm',
                            mentor.avatarBg,
                          )}
                        >
                          {mentor.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-display text-sm font-bold text-ink">{mentor.name}</h3>
                            <span title="Verified Mentor"><ShieldCheck size={14} className="text-teal-600" /></span>
                          </div>
                          <p className="text-xs text-ink-muted font-medium">
                            {mentor.role} · <strong className="text-ink">{mentor.company}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-900">
                        <Star size={12} className="fill-amber-500 text-amber-500" />
                        <span>{mentor.rating}</span>
                        <span className="text-amber-700 font-normal">({mentor.sessions})</span>
                      </div>
                    </div>

                    <p className="text-xs text-ink-muted leading-relaxed">
                      {mentor.bio}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {mentor.expertise.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-slate-100 border border-line px-2 py-0.5 text-[10px] font-semibold text-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-ink-muted">
                      <Clock size={13} className="text-teal-600" />
                      <span>Next Slot: <strong>{mentor.nextSlot}</strong></span>
                    </div>

                    <Button
                      size="sm"
                      onClick={() =>
                        setBookingSuccess(
                          `1:1 Session booked with ${mentor.name} (${mentor.company}) for ${mentor.nextSlot}! Calendar invite sent.`,
                        )
                      }
                      className="rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm"
                    >
                      Book 1:1 Session
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* TAB 2: PEER PULL REQUEST EXCHANGE */}
      {activeTab === 'peer-reviews' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">
                Peer Code Review Exchange
              </h2>
              <p className="text-xs text-ink-muted">
                Review peer pull requests to sharpen your code quality discernment and earn XP. Get thorough feedback on your own projects.
              </p>
            </div>

            <Button className="rounded-xl bg-blue-600 text-white text-xs font-bold gap-1.5">
              <GitPullRequest size={14} />
              Submit PR for Review
            </Button>
          </div>

          <div className="space-y-4">
            {peerPullRequests.map((pr) => (
              <Card key={pr.id} className="rounded-2xl border border-line bg-surface p-5 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <GitPullRequest size={15} className="text-teal-600" />
                      <h3 className="font-display text-sm font-bold text-ink hover:text-blue-600 cursor-pointer">
                        {pr.title}
                      </h3>
                    </div>
                    <p className="text-xs text-ink-muted">
                      Repository: <span className="font-mono text-ink font-medium">{pr.repo}</span> · by <span className="font-semibold text-ink">{pr.author}</span> · {pr.submittedDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-[10px] font-bold text-teal-700">
                      +{pr.xpReward} XP Reward
                    </span>
                    <span className="rounded-full bg-slate-100 border border-line px-2.5 py-0.5 text-[10px] font-semibold text-ink">
                      {pr.reviewsReceived} / {pr.reviewsRequired} Reviews
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-line text-xs">
                  <div className="flex gap-1.5">
                    {pr.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-ink-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Button variant="outline" size="sm" className="rounded-xl text-xs font-bold border-line hover:bg-slate-50">
                    Open Review Workspace <ArrowRight size={13} className="ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DOUBT CLEARING FORUM */}
      {activeTab === 'doubts' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">
                Technical Doubt &amp; Discussion Channels
              </h2>
              <p className="text-xs text-ink-muted">
                Get answers from high-performing peers and verified alumni within minutes.
              </p>
            </div>

            <Button className="rounded-xl bg-blue-600 text-white text-xs font-bold gap-1.5">
              <MessageSquare size={14} />
              Ask a Doubt
            </Button>
          </div>

          <div className="space-y-4">
            {activeDoubts.map((doubt) => (
              <Card key={doubt.id} className="rounded-2xl border border-line bg-surface p-5 shadow-sm space-y-3 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-lg bg-slate-100 border border-line px-2.5 py-0.5 text-[10px] font-bold text-ink">
                    {doubt.channel}
                  </span>

                  <div className="flex items-center gap-3 text-xs text-ink-muted">
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={12} /> {doubt.upvotes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} /> {doubt.replies} replies
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-sm font-bold text-ink hover:text-blue-600 cursor-pointer">
                    {doubt.title}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    {doubt.preview}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-line text-xs">
                  <div className="text-[11px] text-ink-muted">
                    Asked by <span className="font-bold text-ink">{doubt.author}</span> · {doubt.time}
                  </div>

                  {doubt.hasVerifiedAnswer && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      <CheckCircle2 size={11} className="text-emerald-600" />
                      Verified by Mentor
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LIVE AMAS & WEBINARS */}
      {activeTab === 'ama' && (
        <div className="space-y-6">
          <Card className="rounded-2xl border border-line bg-surface p-6 shadow-sm space-y-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200 px-3 py-1 text-xs font-bold text-purple-700">
                <Sparkles size={13} />
                Weekly Engineering AMA Series
              </div>
              <h2 className="font-display text-xl font-bold text-ink">
                Cracking Google L3 &amp; L4 Interviews: Graph Traversal to System Architecture
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Join Siddharth Rao (Staff Engineer @ Google) for an interactive breakdown of actual hiring committee rubrics, how to communicate tradeoffs during 45-minute rounds, and live question teardown.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 pt-2 border-t border-line">
              <div className="rounded-xl border border-line bg-slate-50/60 p-3 space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-muted">Date &amp; Time</span>
                <p className="font-display text-xs font-bold text-ink">Saturday, Sept 12 · 6:00 PM IST</p>
              </div>
              <div className="rounded-xl border border-line bg-slate-50/60 p-3 space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-muted">Format</span>
                <p className="font-display text-xs font-bold text-ink">Live Interactive Webinar + Q&amp;A</p>
              </div>
              <div className="rounded-xl border border-line bg-slate-50/60 p-3 space-y-1">
                <span className="text-[10px] uppercase font-bold text-ink-muted">Registered Cohort</span>
                <p className="font-display text-xs font-bold text-emerald-600">284 Students Attending</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-6 shadow-md shadow-purple-600/20">
                Register Free (1-Click)
              </Button>
              <Button variant="outline" className="rounded-xl border-line text-xs font-bold">
                Add to Google Calendar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
