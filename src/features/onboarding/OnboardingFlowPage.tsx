import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, BriefcaseBusiness, Check, Code2, Coffee, Compass, Github, GraduationCap, Laptop, Linkedin, Palette, Rocket, Target, Trophy, Users } from 'lucide-react'
import { OnboardingLayout } from './OnboardingLayout'
import { OnboardingProvider, useOnboarding } from './OnboardingContext'
import { ProfilePreview } from './ProfilePreview'
import { SelectableCard } from '../../components/ui/SelectableCard'

const stepByPath: Record<string, number> = {
  '/onboarding/year': 1,
  '/onboarding/interests': 2,
  '/onboarding/skill-level': 3,
  '/onboarding/accounts': 4,
  '/onboarding/goals': 5,
  '/onboarding/preferences': 6,
}

const stepContent = {
  1: {
    title: 'Where are you in your journey?',
    description: 'Tell us your current year so we can tune the pace and recommendations for you.',
    minutes: 5,
  },
  2: {
    title: 'What do you want to learn?',
    description: 'Choose the areas that excite you. We will use these to shape your learning path.',
    minutes: 4,
  },
  3: {
    title: 'How would you describe your coding level?',
    description: 'There is no wrong answer. This helps us start you at the right difficulty.',
    minutes: 3,
  },
  4: {
    title: 'Connect your developer accounts',
    description: 'Bring your existing work into your profile so your recommendations reflect your experience.',
    minutes: 2,
  },
  5: {
    title: 'What are you working toward?',
    description: 'Pick the outcomes that matter most to you right now.',
    minutes: 3,
  },
  6: {
    title: 'Make your plan feel like yours',
    description: 'Choose how you prefer to learn and when you want helpful nudges.',
    minutes: 3,
  },
} as const

type ConnectedAccountData = {
  username: string
  name: string
  avatar: string
  email?: string
  repositories?: number
  followers?: number
  stars?: number
}

type PlatformAccount = 'GitHub' | 'LinkedIn' | 'LeetCode' | 'HackerRank'

function FlowContent() {
  const location = useLocation()
  const navigate = useNavigate()
  const { profile, update, toggleIn } = useOnboarding()
  const [loginNotice, setLoginNotice] = useState<string | null>(null)
  const [githubData, setGithubData] = useState<ConnectedAccountData | null>(null)
  const [linkedinData, setLinkedinData] = useState<ConnectedAccountData | null>(null)
  const [publicProfiles, setPublicProfiles] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem('c2cedge.publicProfiles') || '{}') as Record<string, string>
    } catch {
      return {}
    }
  })
  const step = stepByPath[location.pathname] || 1
  const content = stepContent[step as keyof typeof stepContent]

  const completeAccountLogin = (
    account: 'GitHub' | 'LinkedIn',
    accountData?: ConnectedAccountData,
  ) => {
    if (!profile.connectedAccounts.includes(account)) {
      toggleIn('connectedAccounts', account)
    }

    if (account === 'GitHub' && accountData) setGithubData(accountData)
    if (account === 'LinkedIn' && accountData) setLinkedinData(accountData)

    try {
      const raw = localStorage.getItem('c2cedge.connectedProfilesMap')
      const accounts = raw ? JSON.parse(raw) : {}
      if (!accounts[account]) {
        accounts[account] = accountData || {
          username: `${account.toLowerCase()}-account`,
          name: `${account} account`,
          avatar: '',
        }
      }
      if (accountData) accounts[account] = accountData
      localStorage.setItem('c2cedge.connectedProfilesMap', JSON.stringify(accounts))
    } catch {
      // The onboarding selection remains available through OnboardingContext.
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const stateProvider = params.get('state')?.split(':')[0]
    const provider = params.get('provider') || stateProvider
    const error = params.get('error')
    const encodedGithubData = params.get('github_data')
    const encodedLinkedinData = params.get('linkedin_data')
    if (provider === 'github' && encodedGithubData) {
      try {
        const data = JSON.parse(atob(encodedGithubData)) as typeof githubData
        completeAccountLogin('GitHub', data)
        setLoginNotice('GitHub login completed successfully. Your real GitHub data is now synced.')
      } catch {
        setLoginNotice('GitHub login completed, but the profile data could not be read.')
      }
      navigate(location.pathname, { replace: true })
      return
    }
    if (provider === 'linkedin' && encodedLinkedinData) {
      try {
        const data = JSON.parse(atob(encodedLinkedinData)) as ConnectedAccountData
        completeAccountLogin('LinkedIn', data)
        setLoginNotice('LinkedIn login completed successfully. Your real profile data is now synced.')
      } catch {
        setLoginNotice('LinkedIn login completed, but the profile data could not be read.')
      }
      navigate(location.pathname, { replace: true })
      return
    }
    if (error) {
      setLoginNotice(`${provider === 'github' ? 'GitHub' : 'LinkedIn'} login was cancelled or failed.`)
      navigate(location.pathname, { replace: true })
    }
    if (params.get('code') && (provider === 'github' || provider === 'linkedin')) {
      const account = provider === 'github' ? 'GitHub' : 'LinkedIn'
      completeAccountLogin(account)
      setLoginNotice(`${account} login completed successfully. You can continue onboarding.`)
      navigate(location.pathname, { replace: true })
    }
  }, [location.pathname, location.search, navigate, profile.connectedAccounts])

  const canContinue = useMemo(() => {
    if (step === 1) return profile.year !== null
    if (step === 2) return profile.interests.length > 0
    if (step === 3) return profile.level !== null
    if (step === 5) return profile.goals.length > 0
    if (step === 6) return profile.learningModes.length > 0 && profile.preferredTime !== null
    return true
  }, [profile, step])

  const nextPath = step < 6 ? Object.keys(stepByPath)[step] : '/dashboard'

  const continueFlow = () => {
    if (step === 6) {
      navigate('/dashboard')
      return
    }
    navigate(nextPath)
  }

  const openPlatformLogin = (account: PlatformAccount) => {
    if (account === 'LeetCode' || account === 'HackerRank') {
      setLoginNotice(`Add your public ${account} profile URL below to share it with c2cedge.`)
      return
    }

    const provider = account.toLowerCase()
    const clientId = account === 'GitHub'
      ? import.meta.env.VITE_GITHUB_CLIENT_ID
      : import.meta.env.VITE_LINKEDIN_CLIENT_ID
    const returnUrl = account === 'GitHub'
      ? `${window.location.origin}/api/auth/github/callback`
      : `${window.location.origin}/api/auth/linkedin/callback`

    if (!clientId) {
      setLoginNotice(`Add VITE_${account.toUpperCase()}_CLIENT_ID to .env before connecting ${account}.`)
      return
    }

    const state = `${provider}:${crypto.randomUUID()}`
    sessionStorage.setItem(`c2cedge.oauth_state.${provider}`, state)
    const loginUrl = account === 'GitHub'
      ? `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(returnUrl)}&scope=read:user%20user:email&state=${encodeURIComponent(state)}`
      : `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(returnUrl)}&scope=openid%20profile%20email&state=${encodeURIComponent(state)}`
    const loginWindow = window.open(
      loginUrl,
      `${account.toLowerCase()}-login`,
      'width=520,height=720,menubar=no,toolbar=no,location=yes,resizable=yes,scrollbars=yes',
    )

    if (!loginWindow) {
      window.location.assign(loginUrl)
      return
    }

    const checkReturn = window.setInterval(() => {
      if (loginWindow.closed) {
        window.clearInterval(checkReturn)
        return
      }

      try {
        const returnedUrl = new URL(loginWindow.location.href)
        if (returnedUrl.origin === window.location.origin && returnedUrl.pathname === '/onboarding/accounts') {
          loginWindow.close()
          window.clearInterval(checkReturn)
          completeAccountLogin(account)
          setLoginNotice(`${account} login completed. You can now continue onboarding.`)
        }
      } catch {
        // The popup is still on the provider domain; access becomes available after redirect.
      }
    }, 500)
  }

  const savePublicProfile = (account: 'LeetCode' | 'HackerRank', value: string) => {
    const profileUrl = value.trim()
    if (!profileUrl) return
    const profiles = { ...publicProfiles, [account]: profileUrl }
    localStorage.setItem('c2cedge.publicProfiles', JSON.stringify(profiles))
    setPublicProfiles(profiles)
    if (!profile.connectedAccounts.includes(account)) toggleIn('connectedAccounts', account)
    setLoginNotice(`${account} profile shared successfully.`)
  }

  return (
    <OnboardingLayout
      step={step}
      minutesLeft={content.minutes}
      title={content.title}
      description={content.description}
      canContinue={canContinue}
      onContinue={continueFlow}
      continueLabel={step === 6 ? 'Finish setup' : 'Continue'}
      rail={<ProfilePreview mode={step >= 3 ? 'step4' : 'step3'} />}
    >
      {loginNotice ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {loginNotice}
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((year) => (
            <SelectableCard
              key={year}
              selected={profile.year === year}
              onSelect={() => update({ year: year as 1 | 2 | 3 | 4 })}
              icon={<GraduationCap size={21} className="text-blue-600" />}
              title={`${['First', 'Second', 'Third', 'Fourth'][year - 1]} year`}
              description="Build a focused plan for your current stage."
            />
          ))}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['Software Engineering', Code2],
            ['Data & AI', Compass],
            ['Product & Design', Palette],
            ['Career Preparation', BriefcaseBusiness],
          ].map(([label, Icon]) => (
            <SelectableCard
              key={label as string}
              selected={profile.interests.includes(label as string)}
              onSelect={() => toggleIn('interests', label as string)}
              icon={<Icon size={21} className="text-cyan-600" />}
              title={label as string}
              description="Personalized lessons, projects, and practice."
            />
          ))}
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {(['Beginner', 'Basic', 'Intermediate', 'Advanced'] as const).map((level) => (
            <SelectableCard
              key={level}
              selected={profile.level === level}
              onSelect={() => update({ level })}
              icon={<Laptop size={21} className="text-purple-600" />}
              title={level}
              description="We will adjust explanations and challenge level."
            />
          ))}
        </div>
      ) : null}

      {step === 4 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['GitHub', Github],
            ['LinkedIn', Linkedin],
          ].map(([label, Icon]) => (
            <div
              key={label as string}
              className={`rounded-card border bg-surface p-4 transition-colors ${
                profile.connectedAccounts.includes(label as string)
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : 'border-line hover:border-brand-500/60'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-slate-100 text-ink">
                  <Icon size={21} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold text-ink">{label as string}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                    Sync your profile and projects for better recommendations.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openPlatformLogin(label as 'GitHub' | 'LinkedIn')}
                className={`mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
                  profile.connectedAccounts.includes(label as string)
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {profile.connectedAccounts.includes(label as string) ? <Check size={14} /> : null}
                {profile.connectedAccounts.includes(label as string) ? 'Completed' : `Login with ${label as string}`}
              </button>

              {profile.connectedAccounts.includes(label as string) ? (
                <div className="mt-3 border-t border-emerald-200 pt-3">
                  <p className="text-[11px] font-semibold text-emerald-900">Platform data synced to your portal</p>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                    {(label === 'GitHub'
                      ? [
                          [githubData ? String(githubData.repositories) : '--', 'Repos'],
                          [githubData ? String(githubData.followers) : '--', 'Followers'],
                          [githubData ? String(githubData.stars) : '--', 'Stars'],
                        ]
                      : [
                          [linkedinData?.name || '--', 'Name'],
                          [linkedinData?.email || '--', 'Email'],
                          [linkedinData?.username || '--', 'Profile'],
                        ]
                    ).map(([value, name]) => (
                      <div key={name} className="rounded-lg bg-white/80 px-1 py-2">
                        <p className="text-sm font-bold text-ink">{value}</p>
                        <p className="mt-0.5 text-[9px] text-ink-muted">{name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}

          {[
            ['LeetCode', Trophy],
            ['HackerRank', Code2],
          ].map(([label, Icon]) => (
            <div key={label as string} className="rounded-card border border-line bg-surface p-4 transition-colors hover:border-brand-500/60">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-slate-100 text-ink">
                  <Icon size={21} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold text-ink">{label as string}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                    Open your account to add your practice progress later.
                  </p>
                </div>
              </div>
              <input
                type="url"
                value={publicProfiles[label as string] || ''}
                onChange={(event) => setPublicProfiles((profiles) => ({ ...profiles, [label as string]: event.target.value }))}
                placeholder={`https://${label === 'LeetCode' ? 'leetcode.com/u/your-username' : 'hackerrank.com/profile/your-username'}`}
                className="mt-4 h-10 w-full rounded-xl border border-line bg-surface-subtle px-3 text-xs text-ink placeholder:text-ink-muted focus:border-brand-500 focus:bg-surface focus:outline-none"
              />
              <button
                type="button"
                onClick={() => savePublicProfile(label as 'LeetCode' | 'HackerRank', publicProfiles[label as string] || '')}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700"
              >
                {publicProfiles[label as string] ? 'Profile shared' : 'Share profile'}
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {step === 5 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['Get an internship', BriefcaseBusiness],
            ['Build real projects', Rocket],
            ['Prepare for interviews', Target],
            ['Find a community', Users],
          ].map(([label, Icon]) => (
            <SelectableCard
              key={label as string}
              selected={profile.goals.includes(label as string)}
              onSelect={() => toggleIn('goals', label as string)}
              icon={<Icon size={21} className="text-orange-600" />}
              title={label as string}
              description="Keep this goal visible throughout your journey."
            />
          ))}
        </div>
      ) : null}

      {step === 6 ? (
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-sm font-bold text-ink">Your preferred learning style</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                ['Guided lessons', BookOpen],
                ['Hands-on projects', Laptop],
                ['Quick practice', Coffee],
                ['Peer learning', Users],
              ].map(([label, Icon]) => (
                <SelectableCard
                  key={label as string}
                  selected={profile.learningModes.includes(label as string)}
                  onSelect={() => toggleIn('learningModes', label as string)}
                  icon={<Icon size={21} className="text-blue-600" />}
                  title={label as string}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-sm font-bold text-ink">When should we send reminders?</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {['Morning', 'Afternoon', 'Evening'].map((time) => (
                <SelectableCard
                  key={time}
                  selected={profile.preferredTime === time}
                  onSelect={() => update({ preferredTime: time })}
                  title={time}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </OnboardingLayout>
  )
}

export function OnboardingFlowPage() {
  return (
    <OnboardingProvider>
      <FlowContent />
    </OnboardingProvider>
  )
}