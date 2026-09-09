import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Settings,
  User,
  Bell,
  Shield,
  Key,
  Github,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Save,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'

export function SettingsPage() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<'profile' | 'accounts' | 'notifications' | 'preferences'>('profile')
  const [saved, setSaved] = useState(false)
  const [studentProfile] = useState(() => {
    try {
      const onboarding = JSON.parse(localStorage.getItem('c2cedge.onboarding') || '{}')
      const session = JSON.parse(localStorage.getItem('c2cedge.current_session') || '{}')
      const user = session.user || {}
      const yearLabels: Record<number, string> = {
        1: 'First year',
        2: 'Second year',
        3: 'Third year',
        4: 'Fourth year',
      }
      return {
        name: user.name || onboarding.name || 'Student',
        email: user.email || onboarding.email || 'Not provided',
        year: onboarding.year ? yearLabels[onboarding.year] : 'Not selected',
      }
    } catch {
      return { name: 'Student', email: 'Not provided', year: 'Not selected' }
    }
  })
  const [connectedProfiles] = useState<Record<string, any>>(() => {
    try {
      return JSON.parse(localStorage.getItem('c2cedge.connectedProfilesMap') || '{}')
    } catch {
      return {}
    }
  })
  const [publicProfiles, setPublicProfiles] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem('c2cedge.publicProfiles') || '{}')
    } catch {
      return {}
    }
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-r from-slate-900 via-navy-950 to-blue-950 p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
            <Settings size={13} />
            Platform &amp; Account Settings
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Account Preferences &amp; Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Manage your personal profile, connected coding accounts (GitHub, LeetCode), cohort notification rules, and curriculum preferences.
          </p>
        </div>
      </div>

      {saved && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-900 flex items-center gap-2 shadow-sm">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>Your settings and profile preferences have been successfully updated!</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'profile', label: 'Student Profile', icon: User },
            { id: 'accounts', label: 'Linked Accounts', icon: Github },
            { id: 'notifications', label: 'Notification Rules', icon: Bell },
            { id: 'preferences', label: 'Learning Preferences', icon: Laptop },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id as any)}
                className={cn(
                  'w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all text-left',
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-surface border border-line text-ink hover:bg-slate-50',
                )}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          {activeSection === 'profile' && (
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-sm space-y-6">
              <div>
                <h2 className="font-display text-base font-bold text-ink">Student Profile Information</h2>
                <p className="text-xs text-ink-muted">Provided during onboarding and verified by your institution.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-ink">Full Name</label>
                  <input
                    type="text"
                    defaultValue={studentProfile.name}
                    className="w-full rounded-xl border border-line bg-slate-50 px-3 py-2 text-ink font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-ink">College Email Address</label>
                  <input
                    type="email"
                    defaultValue={studentProfile.email}
                    className="w-full rounded-xl border border-line bg-slate-50 px-3 py-2 text-ink font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-ink">Roll Number</label>
                  <input
                    type="text"
                    defaultValue="22CS021"
                    disabled
                    className="w-full rounded-xl border border-line bg-slate-100 px-3 py-2 text-ink-muted font-medium cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-ink">Graduation Cohort</label>
                  <input
                    type="text"
                    defaultValue={studentProfile.year}
                    disabled
                    className="w-full rounded-xl border border-line bg-slate-100 px-3 py-2 text-ink-muted font-medium cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-line flex justify-end">
                <Button onClick={handleSave} className="rounded-xl bg-blue-600 text-white text-xs font-bold gap-1.5">
                  <Save size={14} /> Save Changes
                </Button>
              </div>
            </Card>
          )}

          {activeSection === 'accounts' && (
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-sm space-y-6">
              <div>
                <h2 className="font-display text-base font-bold text-ink">Connected Developer Profiles</h2>
                <p className="text-xs text-ink-muted">Used to sync your GitHub commits, LeetCode solutions, and HackerRank badges.</p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { id: 'GitHub', label: 'GitHub', prefix: '@', profile: connectedProfiles.GitHub?.username, detail: connectedProfiles.GitHub?.repositories ? `${connectedProfiles.GitHub.repositories} repos` : 'Profile synced' },
                  { id: 'LinkedIn', label: 'LinkedIn', prefix: '', profile: connectedProfiles.LinkedIn?.name || connectedProfiles.LinkedIn?.username, detail: connectedProfiles.LinkedIn?.email || 'Profile synced' },
                  { id: 'LeetCode', label: 'LeetCode', prefix: '', profile: publicProfiles.LeetCode, detail: 'Public profile shared' },
                  { id: 'HackerRank', label: 'HackerRank', prefix: '', profile: publicProfiles.HackerRank, detail: 'Public profile shared' },
                ].map((account) => (
                  <div key={account.id} className={`flex items-center justify-between rounded-xl border p-3.5 ${account.profile ? 'border-emerald-200 bg-emerald-50/50' : 'border-line bg-slate-50/50'}`}>
                    <div className="flex min-w-0 items-center gap-3">
                      {account.id === 'GitHub' ? <Github size={20} className="shrink-0 text-ink" /> : <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-500 text-[9px] font-bold text-white">{account.label.slice(0, 2)}</span>}
                      <div className="min-w-0">
                        <p className="font-bold text-ink">{account.label}</p>
                        <p className="truncate text-[11px] text-ink-muted">
                          {account.profile ? <>Connected as <strong>{account.prefix}{account.profile}</strong> ({account.detail})</> : 'Not connected yet'}
                        </p>
                      </div>
                    </div>
                    {account.profile ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">Connected</span>
                    ) : account.id === 'LeetCode' || account.id === 'HackerRank' ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={publicProfiles[account.id] || ''}
                          onChange={(event) => setPublicProfiles((profiles) => ({ ...profiles, [account.id]: event.target.value }))}
                          placeholder="Profile URL"
                          className="w-32 rounded-lg border border-line bg-white px-2 py-1.5 text-[11px] text-ink outline-none focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const url = publicProfiles[account.id]?.trim()
                            if (!url) return
                            localStorage.setItem('c2cedge.publicProfiles', JSON.stringify({ ...publicProfiles, [account.id]: url }))
                            window.location.reload()
                          }}
                          className="rounded-lg bg-blue-600 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => navigate('/onboarding/accounts')}
                        className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-[11px] font-bold text-ink hover:border-blue-500 hover:text-blue-600"
                      >
                        Add profile
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-sm space-y-6">
              <div>
                <h2 className="font-display text-base font-bold text-ink">Notification Rules</h2>
                <p className="text-xs text-ink-muted">Choose when and how you receive alerts and weekly digests.</p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { title: 'Weekly Contest Reminders', desc: 'Alert 1 hour before Saturday timed contests begin.', defaultChecked: true },
                  { title: 'Mentor 1:1 Booking Confirmations', desc: 'Calendar invites and meeting links via email & push.', defaultChecked: true },
                  { title: 'Peer Code Review Requests', desc: 'Notify when a peer submits a pull request in your tech stack.', defaultChecked: true },
                  { title: 'Weekly Sunday Reflection Prompt', desc: 'Reminder to submit your weekly reflection log for continuous evaluation.', defaultChecked: true },
                ].map((n) => (
                  <div key={n.title} className="flex items-start justify-between p-3.5 rounded-xl border border-line bg-slate-50/50">
                    <div>
                      <p className="font-bold text-ink">{n.title}</p>
                      <p className="text-[11px] text-ink-muted mt-0.5">{n.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={n.defaultChecked}
                      className="h-4 w-4 rounded border-line text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-line flex justify-end">
                <Button onClick={handleSave} className="rounded-xl bg-blue-600 text-white text-xs font-bold gap-1.5">
                  <Save size={14} /> Save Preferences
                </Button>
              </div>
            </Card>
          )}

          {activeSection === 'preferences' && (
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-sm space-y-6">
              <div>
                <h2 className="font-display text-base font-bold text-ink">Learning Preferences</h2>
                <p className="text-xs text-ink-muted">Configure your default IDE keybindings, primary coding languages, and daily targets.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-ink">Primary Language for Coding Drills</label>
                  <select defaultValue="cpp" className="w-full rounded-xl border border-line bg-slate-50 px-3 py-2 text-ink font-medium focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="cpp">C++ (GCC 14 / C++20)</option>
                    <option value="java">Java 21 LTS</option>
                    <option value="python">Python 3.12</option>
                    <option value="typescript">TypeScript 5</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-ink">Daily Problem Goal</label>
                  <select defaultValue="2" className="w-full rounded-xl border border-line bg-slate-50 px-3 py-2 text-ink font-medium focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="1">1 Problem / Day (Moderate)</option>
                    <option value="2">2 Problems / Day (Recommended)</option>
                    <option value="3">3 Problems / Day (Intensive SDE Prep)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-line flex justify-end">
                <Button onClick={handleSave} className="rounded-xl bg-blue-600 text-white text-xs font-bold gap-1.5">
                  <Save size={14} /> Save Preferences
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
