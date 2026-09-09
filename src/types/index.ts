export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type Verdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Time Limit Exceeded'
  | 'Runtime Error'

export interface LearningPath {
  id: string
  title: string
  description: string
  category: string
  completion: number
  accent: 'brand' | 'purple' | 'green' | 'orange' | 'cyan' | 'red'
  icon: string
}

export interface PathModule {
  id: string
  title: string
  topicCount: number
  completion: number
  locked: boolean
  topics: { id: string; title: string; done: boolean }[]
}

export interface Problem {
  id: string
  number: number
  title: string
  difficulty: Difficulty
  topics: string[]
  successRate: number
  solvedBy: number
  solved: boolean
  statement: string
  examples: { input: string; output: string; explanation?: string }[]
  constraints: string[]
  hints: string[]
  starterCode: Record<string, string>
}

export interface Submission {
  id: number
  submittedOn: string
  language: string
  verdict: Verdict
  runtimeMs: number | null
  memoryMb: number | null
  testsPassed: number
  testsTotal: number
  score: number
}

export interface OnboardingProfile {
  name: string
  year: 1 | 2 | 3 | 4 | null
  interests: string[]
  level: 'Beginner' | 'Basic' | 'Intermediate' | 'Advanced' | null
  languages: string[]
  dailyTime: string | null
  connectedAccounts: string[]
  goals: string[]
  learningModes: string[]
  preferredTime: string | null
  notifications: {
    recommendations: boolean
    reminders: boolean
    opportunities: boolean
  }
}
