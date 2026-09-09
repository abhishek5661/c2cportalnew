import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, MoreVertical, SlidersHorizontal } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { DifficultyBadge, Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'
import { problems } from '../../data/mock'
import type { Difficulty } from '../../types'

const filters: (Difficulty | 'All')[] = ['All', 'Easy', 'Medium', 'Hard']

export function PracticeList() {
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All')
  const [topic, setTopic] = useState('All Topics')
  const [sort, setSort] = useState('Recommended')

  const topics = useMemo(
    () => ['All Topics', ...new Set(problems.flatMap((p) => p.topics))],
    [],
  )

  const visible = useMemo(() => {
    const list = problems.filter(
      (problem) =>
        (difficulty === 'All' || problem.difficulty === difficulty) &&
        (topic === 'All Topics' || problem.topics.includes(topic)),
    )
    if (sort === 'Success rate') {
      return [...list].sort((a, b) => b.successRate - a.successRate)
    }
    if (sort === 'Most solved') {
      return [...list].sort((a, b) => b.solvedBy - a.solvedBy)
    }
    return list
  }, [difficulty, topic, sort])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={difficulty === item}
            onClick={() => setDifficulty(item)}
            className={cn(
              'rounded-card border px-3 py-1.5 text-sm font-medium transition-colors',
              difficulty === item
                ? 'border-brand-600 bg-brand-100 text-brand-600'
                : 'border-line text-ink-muted hover:text-ink',
            )}
          >
            {item}
          </button>
        ))}

        <label className="ml-auto flex items-center gap-2 text-sm">
          <span className="sr-only">Topic</span>
          <select
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="h-9 rounded-card border border-line bg-surface px-2 text-sm text-ink"
          >
            {topics.map((entry) => (
              <option key={entry}>{entry}</option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="sr-only">Sort by</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="h-9 rounded-card border border-line bg-surface px-2 text-sm text-ink"
          >
            <option>Recommended</option>
            <option>Success rate</option>
            <option>Most solved</option>
          </select>
        </label>

        <Button variant="subtle" size="sm" aria-label="More filters">
          <SlidersHorizontal size={16} />
        </Button>
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h3 className="section-title">Practice Problems</h3>
          <span className="text-xs text-ink-muted">{visible.length} Problems</span>
        </div>
        <ul className="divide-y divide-line">
          {visible.map((problem) => (
            <li
              key={problem.id}
              className="flex flex-wrap items-center gap-3 px-4 py-3 hover:bg-surface-subtle"
            >
              <span className="w-5 shrink-0 text-sm text-ink-muted">
                {problem.number}
              </span>
              <div className="min-w-0 flex-1">
                <Link
                  to={`/practice/${problem.id}`}
                  className="block truncate text-sm font-medium text-ink hover:text-brand-600"
                >
                  {problem.title}
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <DifficultyBadge value={problem.difficulty} />
                  {problem.topics.map((entry) => (
                    <Badge key={entry}>{entry}</Badge>
                  ))}
                </div>
              </div>
              <div className="hidden w-24 text-sm sm:block">
                <p className="text-xs text-ink-muted">Success Rate</p>
                <p className="font-medium text-ink">{problem.successRate}%</p>
              </div>
              <div className="hidden w-20 text-sm sm:block">
                <p className="text-xs text-ink-muted">Solved by</p>
                <p className="font-medium text-ink">
                  {(problem.solvedBy / 1000).toFixed(1)}K
                </p>
              </div>
              {problem.solved ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-500">
                  <Check size={16} strokeWidth={3} /> Solved
                </span>
              ) : (
                <Link
                  to={`/practice/${problem.id}`}
                  className="inline-flex h-9 items-center rounded-card border border-brand-600 px-3 text-sm font-medium text-brand-600 hover:bg-brand-100"
                >
                  Solve
                </Link>
              )}
              <button
                type="button"
                aria-label={`More options for ${problem.title}`}
                className="rounded p-1 text-ink-muted hover:bg-surface"
              >
                <MoreVertical size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
