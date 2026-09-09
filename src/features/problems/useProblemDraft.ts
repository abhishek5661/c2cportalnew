import { useCallback, useEffect, useState } from 'react'
import type { Verdict } from '../../types'

export interface TestResult {
  id: number
  input: string
  expected: string
  actual: string
  passed: boolean
  runtimeMs: number
}

export interface ProblemDraft {
  code: string
  language: string
  testResults: TestResult[] | null
  lastSubmission: {
    verdict: Verdict
    runtimeMs: number
    memoryMb: number
    submittedOn: string
  } | null
}

const key = (problemId: string) => `c2cedge.draft.${problemId}`

export function useProblemDraft(problemId: string, initial: ProblemDraft) {
  const [draft, setDraft] = useState<ProblemDraft>(() => {
    try {
      const raw = localStorage.getItem(key(problemId))
      return raw ? { ...initial, ...(JSON.parse(raw) as ProblemDraft) } : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    localStorage.setItem(key(problemId), JSON.stringify(draft))
  }, [problemId, draft])

  const patch = useCallback((next: Partial<ProblemDraft>) => {
    setDraft((prev) => ({ ...prev, ...next }))
  }, [])

  return [draft, patch] as const
}
