import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { OnboardingProfile } from '../../types'

const STORAGE_KEY = 'c2cedge.onboarding'

const initialProfile: OnboardingProfile = {
  name: 'Ananya Sharma',
  year: null,
  interests: [],
  level: null,
  languages: [],
  dailyTime: null,
  connectedAccounts: [],
  goals: [],
  learningModes: [],
  preferredTime: null,
  notifications: {
    recommendations: true,
    reminders: true,
    opportunities: true,
  },
}

interface OnboardingContextValue {
  profile: OnboardingProfile
  update: (patch: Partial<OnboardingProfile>) => void
  toggleIn: (key: 'interests' | 'languages' | 'goals' | 'connectedAccounts' | 'learningModes', value: string) => void
  completion: number
  reset: () => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

function readStored(): OnboardingProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...initialProfile, ...(JSON.parse(raw) as OnboardingProfile) } : initialProfile
  } catch {
    return initialProfile
  }
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<OnboardingProfile>(readStored)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  const update = useCallback((patch: Partial<OnboardingProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }))
  }, [])

  const toggleIn = useCallback<OnboardingContextValue['toggleIn']>((key, value) => {
    setProfile((prev) => {
      const list = prev[key]
      return {
        ...prev,
        [key]: list.includes(value)
          ? list.filter((entry) => entry !== value)
          : [...list, value],
      }
    })
  }, [])

  const completion = useMemo(() => {
    const checks = [
      profile.year !== null,
      profile.interests.length > 0,
      profile.level !== null,
      profile.languages.length > 0,
      profile.dailyTime !== null,
      profile.goals.length > 0,
      profile.learningModes.length > 0,
      profile.preferredTime !== null,
    ]
    return Math.round((checks.filter(Boolean).length / checks.length) * 100)
  }, [profile])

  const reset = useCallback(() => setProfile(initialProfile), [])

  const value = useMemo(
    () => ({ profile, update, toggleIn, completion, reset }),
    [profile, update, toggleIn, completion, reset],
  )

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) {
    throw new Error('useOnboarding must be used inside OnboardingProvider')
  }
  return ctx
}

export const onboardingSteps = [
  { index: 1, path: '/onboarding/year', label: 'Year of study' },
  { index: 2, path: '/onboarding/interests', label: 'Interests' },
  { index: 3, path: '/onboarding/skill-level', label: 'Skill level' },
  { index: 4, path: '/onboarding/accounts', label: 'Accounts' },
  { index: 5, path: '/onboarding/goals', label: 'Goals' },
  { index: 6, path: '/onboarding/preferences', label: 'Preferences' },
]
