import { useState } from 'react'
import {
  LifeBuoy,
  HelpCircle,
  BookOpen,
  Search,
  ChevronDown,
  MessageCircle,
  Sparkles,
  Award,
  Code2,
  Users,
  Compass,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

const faqs = [
  {
    q: 'What is the 4-Year Intervention Framework?',
    a: 'It is a comprehensive engineering journey structured into 6 core pillars: Core Skills (DSA, Aptitude, CS Fundamentals), Personal Skills (Communication, Projects), Experiences (Hackathons, Contests, Open Source), Assessment (Weekly Rituals & Diagnostic Scorecards), Career (Resume, Mock Interviews, Company Packs), and Motivation (Verified Mentors & Community).',
  },
  {
    q: 'How are XP points and Leaderboard rankings calculated?',
    a: 'XP is earned by solving coding challenges (+10 Easy, +20 Medium, +40 Hard), attending masterclasses (+30 XP), submitting peer code reviews (+25 to +35 XP), and completing weekly timed contests. Cohort standing uses weighted XP and contest ratings.',
  },
  {
    q: 'How do I book a 1:1 session with an industry mentor?',
    a: 'Navigate to the "Mentor" section in the sidebar, select a verified mentor from companies like Google, Microsoft, or Razorpay, and click "Book 1:1 Session". All sessions are 45 minutes and include calendar invites with Google Meet links.',
  },
  {
    q: 'What should I do if a code submission times out (TLE)?',
    a: 'Time Limit Exceeded usually indicates that your algorithm has a higher asymptotic time complexity than expected (e.g., O(N^2) instead of O(N log N)). Check the Editorial tab on the problem page or run an AI Diagnostic scan in College Analytics for optimization hints.',
  },
  {
    q: 'Can I change my target graduation year or career tracks?',
    a: 'Yes! Head to Settings -> Learning Preferences to reconfigure your target year, daily problem solving targets, and primary programming languages anytime.',
  },
]

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
            <LifeBuoy size={13} />
            Help &amp; Knowledge Center
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            How Can We Help You Today?
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Find answers to common questions about the 4-year intervention framework, contest scoring, mentor sessions, and platform shortcuts.
          </p>

          <div className="pt-2">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guide, framework pillars, scoring rules..."
                className="w-full rounded-xl bg-white/10 border border-white/20 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-4">
          <h2 className="font-display text-base font-bold text-ink">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <Card
                  key={faq.q}
                  className="rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-3"
                  >
                    <span className="font-display text-xs sm:text-sm font-bold text-ink">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn('text-ink-muted transition-transform shrink-0', isOpen && 'rotate-180 text-blue-600')}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-line text-xs text-ink-muted leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-sm space-y-4">
            <h3 className="font-display text-sm font-bold text-ink flex items-center gap-2">
              <Compass size={16} className="text-blue-600" />
              Quick Reference Guide
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-line space-y-1">
                <span className="font-bold text-ink block">Spatial Mindmap</span>
                <span className="text-[11px] text-ink-muted">
                  Explore the full 3-wing framework visualization anytime at <strong className="text-blue-600">/journey</strong>.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-line space-y-1">
                <span className="font-bold text-ink block">Keyboard Shortcuts</span>
                <div className="text-[11px] text-ink-muted space-y-1">
                  <div className="flex justify-between">
                    <span>Global Search:</span>
                    <kbd className="rounded bg-white border border-line px-1.5 py-0.5 font-mono text-[10px]">/</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Submit Code:</span>
                    <kbd className="rounded bg-white border border-line px-1.5 py-0.5 font-mono text-[10px]">Ctrl + Enter</kbd>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1 text-blue-900">
                <span className="font-bold block">Need Technical Support?</span>
                <span className="text-[11px] text-blue-800 block">
                  College mentors and teaching assistants respond in under 15 minutes in the <strong className="text-blue-900">#mentor</strong> channel.
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
