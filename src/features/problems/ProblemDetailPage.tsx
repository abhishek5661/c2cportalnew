import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Copy,
  Database,
  HelpCircle,
  Lightbulb,
  Lock,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  Sun,
  ThumbsDown,
  ThumbsUp,
  Trophy,
  X,
  Zap,
} from 'lucide-react'
import { Card, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { ProgressBar, ProgressRing } from '../../components/ui/Progress'
import { Tabs } from '../../components/ui/Tabs'
import { cn } from '../../lib/cn'
import { focusAreas, problems, submissions } from '../../data/mock'

interface TestCaseData {
  id: number
  name: string
  input: string
  expected: string
  output: string
  status: 'Accepted' | 'Wrong Answer'
  runtime: string
  memory: string
}

const defaultTestCases: TestCaseData[] = [
  {
    id: 1,
    name: 'Testcase 1',
    input: '[3, 7, 2, 9, 5]',
    expected: '9',
    output: '9',
    status: 'Accepted',
    runtime: '56 ms',
    memory: '14.2 MB',
  },
  {
    id: 2,
    name: 'Testcase 2',
    input: '[1]',
    expected: '1',
    output: '1',
    status: 'Accepted',
    runtime: '48 ms',
    memory: '14.0 MB',
  },
  {
    id: 3,
    name: 'Testcase 3',
    input: '[-10, -5, -20, -3]',
    expected: '-3',
    output: '-3',
    status: 'Accepted',
    runtime: '52 ms',
    memory: '14.1 MB',
  },
]

interface SolutionItem {
  id: number
  title: string
  badge?: string
  author: string
  initials: string
  time: string
  likes: number
  rate: number
  explanation: string
  language: string
  code: string
  steps: { num: number; title: string; desc: string }[]
  timeComplexity: string
  spaceComplexity: string
  helpfulYes: number
  helpfulNo: number
}

const solutionsList: SolutionItem[] = [
  {
    id: 1,
    title: 'Solution 1',
    badge: 'Most Effective',
    author: 'Rahul Singh',
    initials: 'RS',
    time: 'Solved 2 weeks ago',
    likes: 128,
    rate: 92,
    explanation:
      'The idea is to iterate through the array and keep track of the maximum element seen so far. At the end of the loop, the maximum element will be the answer.',
    language: 'Python 3',
    code: `def largestElement(nums):
    max_element = nums[0]
    for num in nums:
        if num > max_element:
            max_element = num
    return max_element`,
    steps: [
      {
        num: 1,
        title: 'Initialize the Maximum Element',
        desc: 'Set max_element to nums[0]. This handles positive and negative numbers correctly without arbitrary sentinel values.',
      },
      {
        num: 2,
        title: 'Iterate Through the Array',
        desc: 'Traverse each number in nums sequentially from the beginning to the end using a standard for loop.',
      },
      {
        num: 3,
        title: 'Compare and Update',
        desc: 'During each iteration, if the current element num is strictly greater than max_element, update max_element = num.',
      },
      {
        num: 4,
        title: 'Return the Result',
        desc: 'After inspecting all elements in the array, max_element holds the largest value. Return it as the final answer.',
      },
    ],
    timeComplexity: 'Time Complexity: O(n)',
    spaceComplexity: 'Space Complexity: O(1)',
    helpfulYes: 96,
    helpfulNo: 3,
  },
  {
    id: 2,
    title: 'Solution 2',
    author: 'Priya Verma',
    initials: 'PV',
    time: 'Solved 1 week ago',
    likes: 94,
    rate: 88,
    explanation:
      "Using Python's built-in max() function which runs an optimized linear scan implemented in C.",
    language: 'Python 3',
    code: `def largestElement(nums):
    return max(nums)`,
    steps: [
      {
        num: 1,
        title: 'Call Built-in max()',
        desc: 'Pass the array nums directly to Python’s native max() function.',
      },
      {
        num: 2,
        title: 'C-Level Iteration',
        desc: 'Python evaluates the maximum in optimized C routines without Python bytecode overhead.',
      },
      {
        num: 3,
        title: 'Return Value',
        desc: 'Return the computed maximum directly in one line.',
      },
    ],
    timeComplexity: 'Time Complexity: O(n)',
    spaceComplexity: 'Space Complexity: O(1)',
    helpfulYes: 82,
    helpfulNo: 5,
  },
  {
    id: 3,
    title: 'Solution 3',
    author: 'Aman Kumar',
    initials: 'AK',
    time: 'Solved 3 days ago',
    likes: 76,
    rate: 82,
    explanation:
      'Sorting the array in non-decreasing order and returning the last element at index -1.',
    language: 'Python 3',
    code: `def largestElement(nums):
    nums.sort()
    return nums[-1]`,
    steps: [
      {
        num: 1,
        title: 'Sort Array',
        desc: 'Sort the elements in ascending order using Python’s built-in Timsort.',
      },
      {
        num: 2,
        title: 'Index Last Element',
        desc: 'The highest number will now be situated at the last index (index -1).',
      },
      {
        num: 3,
        title: 'Return Value',
        desc: 'Return nums[-1] as the maximum.',
      },
    ],
    timeComplexity: 'Time Complexity: O(n log n)',
    spaceComplexity: 'Space Complexity: O(1)',
    helpfulYes: 54,
    helpfulNo: 11,
  },
  {
    id: 4,
    title: 'Solution 4',
    author: 'Neha Patel',
    initials: 'NP',
    time: 'Solved 5 days ago',
    likes: 61,
    rate: 78,
    explanation:
      'Divide and Conquer: Recursively split the array into halves, finding the max of each half.',
    language: 'Python 3',
    code: `def largestElement(nums):
    def findMax(l, r):
        if l == r:
            return nums[l]
        mid = (l + r) // 2
        return max(findMax(l, mid), findMax(mid + 1, r))
    return findMax(0, len(nums) - 1)`,
    steps: [
      {
        num: 1,
        title: 'Base Case',
        desc: 'If left index equals right index, return the single element.',
      },
      {
        num: 2,
        title: 'Divide',
        desc: 'Calculate midpoint and recursively find maximum of left and right halves.',
      },
      {
        num: 3,
        title: 'Conquer',
        desc: 'Return the max between the left half maximum and right half maximum.',
      },
    ],
    timeComplexity: 'Time Complexity: O(n)',
    spaceComplexity: 'Space Complexity: O(log n)',
    helpfulYes: 41,
    helpfulNo: 8,
  },
  {
    id: 5,
    title: 'Solution 5',
    author: 'Rohit Gupta',
    initials: 'RG',
    time: 'Solved 6 days ago',
    likes: 49,
    rate: 75,
    explanation:
      'Functional approach using functools.reduce to fold over array comparing consecutive items.',
    language: 'Python 3',
    code: `from functools import reduce

def largestElement(nums):
    return reduce(lambda a, b: a if a > b else b, nums)`,
    steps: [
      {
        num: 1,
        title: 'Import reduce',
        desc: 'Import the reduce function from Python standard library functools.',
      },
      {
        num: 2,
        title: 'Apply Lambda',
        desc: 'Use reduce with a binary comparator that keeps the larger of two values.',
      },
      {
        num: 3,
        title: 'Return Result',
        desc: 'The accumulator holds the maximum element at completion.',
      },
    ],
    timeComplexity: 'Time Complexity: O(n)',
    spaceComplexity: 'Space Complexity: O(1)',
    helpfulYes: 33,
    helpfulNo: 7,
  },
]

const pythonStarter = `def largestElement(nums):
    # Write your code here
    pass
`

export function ProblemDetailPage() {
  const { problemId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const problem =
    problems.find(
      (entry) =>
        entry.id === problemId ||
        (problemId === 'largest-element' && entry.id === 'largest-element-in-an-array') ||
        (problemId === 'check-sorted' && entry.id === 'check-if-array-is-sorted'),
    ) ?? problems[0]

  // Tab resolution from pathname
  const pathTab = location.pathname.endsWith('/editorial')
    ? 'editorial'
    : location.pathname.endsWith('/solutions')
      ? 'solutions'
      : location.pathname.endsWith('/submissions')
        ? 'submissions'
        : 'problem'

  const [activeTab, setActiveTab] = useState(pathTab)
  const [isFavorite, setIsFavorite] = useState(false)
  const [language, setLanguage] = useState('Python 3')
  const [code, setCode] = useState(problem.starterCode?.['Python 3'] ?? pythonStarter)
  const [activeTestcase, setActiveTestcase] = useState(1)
  const [running, setRunning] = useState(false)
  const [showAiAssistant, setShowAiAssistant] = useState(false)
  const [hint1Expanded, setHint1Expanded] = useState(true)
  const [showNewDiscussion, setShowNewDiscussion] = useState(false)
  const [newComment, setNewComment] = useState('')

  // Submissions filters and pagination state
  const [submissionLangFilter, setSubmissionLangFilter] = useState('All Languages')
  const [submissionVerdictFilter, setSubmissionVerdictFilter] = useState('All Verdicts')
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [submissionPage, setSubmissionPage] = useState(1)

  // Solutions view state
  const [selectedSolutionId, setSelectedSolutionId] = useState(1)
  const [codeDarkMode, setCodeDarkMode] = useState(true)
  const [codeCopied, setCodeCopied] = useState(false)
  const [likesState, setLikesState] = useState<Record<number, { likes: number; userLiked: boolean; userDisliked: boolean }>>({
    1: { likes: 128, userLiked: false, userDisliked: false },
    2: { likes: 94, userLiked: false, userDisliked: false },
    3: { likes: 76, userLiked: false, userDisliked: false },
    4: { likes: 61, userLiked: false, userDisliked: false },
    5: { likes: 49, userLiked: false, userDisliked: false },
  })
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<number, 'yes' | 'no' | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  })

  // Discussions list
  const [discussionList, setDiscussionList] = useState([
    {
      id: 1,
      author: 'Aman Verma',
      initials: 'AV',
      time: '2h ago',
      text: 'Why does this solution work even for negative numbers?',
      replies: '4 replies',
    },
    {
      id: 2,
      author: 'Priya Sharma',
      initials: 'PS',
      time: '5h ago',
      text: 'My solution is getting TLE for large inputs. Any ideas?',
      replies: '3 replies',
    },
    {
      id: 3,
      author: 'Rohit Gupta',
      initials: 'RG',
      time: '1d ago',
      text: "Here's a short and clean Python solution.",
      replies: '6 replies',
    },
  ])

  // Sync tab with URL
  useEffect(() => {
    setActiveTab(pathTab)
  }, [pathTab])

  const handleTabChange = (nextTab: string) => {
    setActiveTab(nextTab)
    if (nextTab === 'problem') {
      navigate(`/practice/${problem.id}`)
    } else {
      navigate(`/practice/${problem.id}/${nextTab}`)
    }
  }

  const handleRun = () => {
    setRunning(true)
    setTimeout(() => {
      setRunning(false)
    }, 450)
  }

  const handleSubmit = () => {
    setRunning(true)
    setTimeout(() => {
      setRunning(false)
      setActiveTab('submissions')
      navigate(`/practice/${problem.id}/submissions`)
    }, 600)
  }

  const handleResetCode = () => {
    setCode(problem.starterCode?.['Python 3'] ?? pythonStarter)
  }

  const handleAddDiscussion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setDiscussionList((prev) => [
      {
        id: Date.now(),
        author: 'Ananya Sharma',
        initials: 'AS',
        time: 'Just now',
        text: newComment.trim(),
        replies: '0 replies',
      },
      ...prev,
    ])
    setNewComment('')
    setShowNewDiscussion(false)
  }

  const handleCopyCode = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy)
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  const handleLikeSolution = (solId: number) => {
    setLikesState((prev) => {
      const current = prev[solId] ?? { likes: 0, userLiked: false, userDisliked: false }
      if (current.userLiked) {
        return {
          ...prev,
          [solId]: { ...current, likes: current.likes - 1, userLiked: false },
        }
      }
      return {
        ...prev,
        [solId]: {
          ...current,
          likes: current.likes + 1 + (current.userDisliked ? 0 : 0),
          userLiked: true,
          userDisliked: false,
        },
      }
    })
  }

  const handleDislikeSolution = (solId: number) => {
    setLikesState((prev) => {
      const current = prev[solId] ?? { likes: 0, userLiked: false, userDisliked: false }
      if (current.userDisliked) {
        return {
          ...prev,
          [solId]: { ...current, userDisliked: false },
        }
      }
      return {
        ...prev,
        [solId]: {
          ...current,
          likes: current.userLiked ? current.likes - 1 : current.likes,
          userLiked: false,
          userDisliked: true,
        },
      }
    })
  }

  const handleHelpfulVote = (solId: number, type: 'yes' | 'no') => {
    setHelpfulFeedback((prev) => ({
      ...prev,
      [solId]: prev[solId] === type ? null : type,
    }))
  }

  // Filtered submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchLang =
      submissionLangFilter === 'All Languages' || sub.language === submissionLangFilter
    const matchVerdict =
      submissionVerdictFilter === 'All Verdicts' || sub.verdict === submissionVerdictFilter
    return matchLang && matchVerdict
  })

  // Selected solution item
  const currentSolution =
    solutionsList.find((s) => s.id === selectedSolutionId) ?? solutionsList[0]
  const currentLikes = likesState[currentSolution.id] ?? {
    likes: currentSolution.likes,
    userLiked: false,
    userDisliked: false,
  }

  // Calculate lines for Code Editor line numbering
  const codeLines = code.split('\n')
  const lineCount = Math.max(4, codeLines.length)
  const currentTest = defaultTestCases.find((tc) => tc.id === activeTestcase) ?? defaultTestCases[0]

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="space-y-3">
        {activeTab === 'solutions' ? (
          <Link
            to={`/practice/${problem.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Problem
          </Link>
        ) : (
          <Link
            to="/master/dsa"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Practice
          </Link>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 font-display text-sm font-bold text-white shadow-xs">
              1
            </span>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
              Largest Element in an Array
            </h1>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
            leadingIcon={
              <Bookmark
                size={15}
                className={cn(
                  'transition-colors',
                  isFavorite ? 'fill-amber-400 text-amber-500' : 'text-ink-muted',
                )}
              />
            }
          >
            Add to Favorites
          </Button>
        </div>

        {/* Metadata Badges Row */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            Easy
          </span>
          <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            Arrays
          </span>
          <span className="text-ink-muted">
            Accuracy: <strong className="font-semibold text-ink">92%</strong>
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-ink-muted">
            Solved by <strong className="font-semibold text-ink">12.4K learners</strong>
          </span>
        </div>
      </div>

      {/* 2. Top Tabs */}
      <Tabs
        items={[
          { id: 'problem', label: 'Problem' },
          { id: 'editorial', label: 'Editorial' },
          { id: 'solutions', label: 'Solutions', count: 24 },
          { id: 'submissions', label: 'Submissions', count: 10 },
        ]}
        value={activeTab}
        onChange={handleTabChange}
      />

      {/* ========================================================================= */}
      {/* TAB 1: PROBLEM VIEW                                                       */}
      {/* ========================================================================= */}
      {activeTab === 'problem' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          {/* LEFT COLUMN: Problem Statement & Examples (4 cols) */}
          <div className="space-y-6 lg:col-span-4">
            <Card className="rounded-xl border border-line bg-surface p-5 shadow-card space-y-6">
              {/* Problem Statement */}
              <div>
                <h2 className="font-display text-sm font-bold text-ink">
                  Problem Statement
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  Given an array of integers{' '}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink">
                    nums
                  </code>
                  , return the largest element in the array.
                </p>
              </div>

              {/* Examples */}
              <div>
                <h3 className="font-display text-sm font-bold text-ink">
                  Examples
                </h3>
                <div className="mt-3 space-y-3">
                  {/* Example 1 */}
                  <div className="rounded-lg border border-slate-100 bg-surface-subtle p-3 text-xs space-y-1.5">
                    <p className="text-[11px] font-semibold text-ink">Example 1</p>
                    <div className="space-y-1 font-mono text-[11px] text-ink-muted">
                      <div>
                        <span className="font-semibold text-ink">Input:</span> nums = [3, 7, 2, 9, 5]
                      </div>
                      <div>
                        <span className="font-semibold text-ink">Output:</span> 9
                      </div>
                      <div>
                        <span className="font-semibold text-ink">Explanation:</span> The largest element in the array is 9.
                      </div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="rounded-lg border border-slate-100 bg-surface-subtle p-3 text-xs space-y-1.5">
                    <p className="text-[11px] font-semibold text-ink">Example 2</p>
                    <div className="space-y-1 font-mono text-[11px] text-ink-muted">
                      <div>
                        <span className="font-semibold text-ink">Input:</span> nums = [1]
                      </div>
                      <div>
                        <span className="font-semibold text-ink">Output:</span> 1
                      </div>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="rounded-lg border border-slate-100 bg-surface-subtle p-3 text-xs space-y-1.5">
                    <p className="text-[11px] font-semibold text-ink">Example 3</p>
                    <div className="space-y-1 font-mono text-[11px] text-ink-muted">
                      <div>
                        <span className="font-semibold text-ink">Input:</span> nums = [-10, -5, -20, -3]
                      </div>
                      <div>
                        <span className="font-semibold text-ink">Output:</span> -3
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Constraints */}
              <div>
                <h3 className="font-display text-sm font-bold text-ink">
                  Constraints
                </h3>
                <ul className="mt-2.5 space-y-1.5 text-xs text-ink-muted">
                  <li className="flex items-center gap-2 font-mono">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    <code className="rounded bg-surface-subtle px-1.5 py-0.5 text-[11px] text-ink font-semibold">
                      1 &lt;= nums.length &lt;= 10<sup>5</sup>
                    </code>
                  </li>
                  <li className="flex items-center gap-2 font-mono">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    <code className="rounded bg-surface-subtle px-1.5 py-0.5 text-[11px] text-ink font-semibold">
                      -10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup>
                    </code>
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          {/* CENTER COLUMN: Code Editor & Test Cases (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Code Editor Container */}
            <div className="rounded-xl border border-line bg-surface shadow-card overflow-hidden">
              {/* Editor Header: Language selector */}
              <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
                <div className="relative inline-flex items-center">
                  <div className="pointer-events-none absolute left-2.5 flex items-center text-blue-600">
                    <Code2 size={15} />
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="h-8 cursor-pointer appearance-none rounded-lg border border-line bg-surface pl-8 pr-7 text-xs font-semibold text-ink shadow-xs hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Python 3">Python 3</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="JavaScript">JavaScript</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 flex items-center text-slate-400">
                    <ChevronDown size={14} />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetCode}
                  title="Reset starter code"
                  className="inline-flex h-8 items-center gap-1 rounded-lg border border-line bg-surface px-2.5 text-xs text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors"
                >
                  <RotateCcw size={13} />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

              {/* Code Editor Body with Line Numbers */}
              <div className="relative flex min-h-[160px] bg-surface">
                {/* Gutter: Line numbers */}
                <div
                  aria-hidden="true"
                  className="select-none bg-slate-50/70 border-r border-slate-100 py-3.5 pl-3.5 pr-2.5 text-right font-mono text-[13px] leading-[22px] text-slate-400 shrink-0 min-w-[38px]"
                >
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i + 1}>{i + 1}</div>
                  ))}
                </div>

                {/* Textarea */}
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  rows={Math.max(4, lineCount)}
                  className="w-full flex-1 resize-y bg-transparent py-3.5 px-3.5 font-mono text-[13px] leading-[22px] text-ink focus:outline-none border-0 ring-0 focus:ring-0"
                />
              </div>

              {/* AI Assistant Banner (if opened) */}
              {showAiAssistant && (
                <div className="mx-4 mb-3 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50/50 p-3 text-xs shadow-xs animate-in fade-in">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <Sparkles size={16} className="text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-purple-900">AI Code Assistant</p>
                        <p className="mt-0.5 text-purple-700 leading-relaxed">
                          Initialize a variable <code className="bg-purple-100 px-1 py-0.5 rounded text-purple-900 font-mono">max_val = nums[0]</code> and iterate through the array. Update <code className="bg-purple-100 px-1 py-0.5 rounded text-purple-900 font-mono">max_val</code> whenever you find a larger element.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAiAssistant(false)}
                      className="text-purple-400 hover:text-purple-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-surface px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => setShowAiAssistant(!showAiAssistant)}
                  title="AI assistant"
                  className={cn(
                    'inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors shadow-xs',
                    showAiAssistant
                      ? 'border-purple-400 bg-purple-100 text-purple-700'
                      : 'border-purple-200 bg-purple-50 text-purple-600 hover:bg-purple-100',
                  )}
                >
                  <Sparkles size={16} />
                </button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    loading={running}
                    leadingIcon={<Play size={13} className="fill-slate-600 text-slate-600" />}
                    onClick={handleRun}
                  >
                    Run
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const el = document.getElementById('test-cases-section')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Test Cases
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    leadingIcon={<Send size={13} />}
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>

            {/* Test Cases Section */}
            <div
              id="test-cases-section"
              className="rounded-xl border border-line bg-surface p-4 shadow-card space-y-3.5"
            >
              {/* Header: Test Cases with View All ↗ */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Test Cases
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  View All <ArrowUpRight size={13} />
                </button>
              </div>

              {/* Tabs: Testcase 1 (active), Testcase 2, Testcase 3 */}
              <div className="flex items-center gap-2">
                {defaultTestCases.map((tc) => (
                  <button
                    key={tc.id}
                    type="button"
                    onClick={() => setActiveTestcase(tc.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                      activeTestcase === tc.id
                        ? 'bg-slate-100 text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700',
                    )}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {tc.name}
                  </button>
                ))}
              </div>

              {/* Test Case Details */}
              <div className="space-y-3">
                {/* Input box */}
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                    Input
                  </div>
                  <div className="rounded-lg border border-line bg-surface-subtle px-3 py-2 font-mono text-xs text-ink font-medium">
                    {currentTest.input}
                  </div>
                </div>

                {/* Expected Output & Your Output */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                      Expected Output
                    </div>
                    <div className="rounded-lg border border-line bg-surface-subtle px-3 py-2 font-mono text-xs font-bold text-ink">
                      {currentTest.expected}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                      Your Output
                    </div>
                    <div className="rounded-lg border border-line bg-surface-subtle px-3 py-2 font-mono text-xs font-bold text-ink">
                      {currentTest.output}
                    </div>
                  </div>
                </div>

                {/* Result status */}
                <div className="flex items-center justify-between pt-1">
                  <div className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    <Check size={14} strokeWidth={3} className="text-emerald-600" />
                    {currentTest.status}
                  </div>
                </div>
              </div>

              {/* Telemetry footer: Runtime · Memory */}
              <div className="flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-ink-muted font-mono">
                <span>
                  Runtime: <strong className="font-semibold text-ink">{currentTest.runtime}</strong>
                </span>
                <span className="text-slate-300">·</span>
                <span>
                  Memory: <strong className="font-semibold text-ink">{currentTest.memory}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Telemetry, Hints & Discussions (3 cols) */}
          <div className="space-y-6 lg:col-span-3">
            {/* Your Progress card with "View All" */}
            <Card className="rounded-xl border border-line p-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Your Progress
                </h3>
                <button
                  type="button"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="relative flex items-center justify-center shrink-0">
                  <ProgressRing
                    value={60}
                    size={76}
                    strokeWidth={7}
                    accent="brand"
                    hideLabel
                  />
                  <span className="absolute font-display text-sm font-bold text-ink">
                    60%
                  </span>
                </div>
                <div className="min-w-0 flex-1 space-y-1 text-xs">
                  <div>
                    <span className="text-[11px] text-ink-muted">Correct Submissions</span>
                    <p className="font-display text-base font-bold text-ink">6 / 10</p>
                  </div>
                  <div className="text-[11px] text-ink-muted">
                    Attempted: <strong className="font-semibold text-ink">10</strong>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs">
                <div className="rounded-lg bg-surface-subtle p-2.5 border border-slate-100">
                  <span className="text-[11px] text-ink-muted block font-medium">Accuracy</span>
                  <span className="font-display font-bold text-ink text-sm">92%</span>
                </div>
                <div className="rounded-lg bg-surface-subtle p-2.5 border border-slate-100">
                  <span className="text-[11px] text-ink-muted block font-medium">Points Earned</span>
                  <span className="font-display font-bold text-ink text-sm">15 / 20</span>
                </div>
              </div>
            </Card>

            {/* Hints (2 / 3 used) card */}
            <Card className="rounded-xl border border-line p-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Hints <span className="font-normal text-xs text-ink-muted">(2 / 3 used)</span>
                </h3>
              </div>

              <div className="mt-3 space-y-2.5">
                {/* Hint 1 */}
                <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setHint1Expanded(!hint1Expanded)}
                    className="flex w-full items-center justify-between font-semibold text-ink"
                  >
                    <span className="flex items-center gap-1.5 text-blue-700 font-bold">
                      <Lightbulb size={14} className="text-amber-500" />
                      Hint 1
                    </span>
                    <ChevronRight
                      size={14}
                      className={cn(
                        'text-blue-600 transition-transform duration-200',
                        hint1Expanded ? 'rotate-90' : '',
                      )}
                    />
                  </button>
                  {hint1Expanded && (
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                      Try iterating through the array and keep track of the maximum element seen so far.
                    </p>
                  )}
                </div>

                {/* Hint 2 */}
                <div className="rounded-lg border border-line bg-surface p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-ink flex items-center gap-1.5">
                      <Lightbulb size={14} className="text-slate-400" />
                      Hint 2
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <Lock size={12} />
                      Locked
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400 italic">
                    Compare each element with the current maximum and update it if needed.
                  </p>
                </div>

                {/* Hint 3 */}
                <div className="rounded-lg border border-line bg-surface p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-ink flex items-center gap-1.5">
                      <Lightbulb size={14} className="text-slate-400" />
                      Hint 3
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <Lock size={12} />
                      Locked
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400 italic">
                    Think about what value to return after the loop.
                  </p>
                </div>
              </div>
            </Card>

            {/* Discussion card */}
            <Card className="rounded-xl border border-line p-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Discussion
                </h3>
                <button
                  type="button"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="mt-3 divide-y divide-slate-100">
                {discussionList.map((comment) => (
                  <div key={comment.id} className="py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">
                          {comment.initials}
                        </span>
                        <span className="font-semibold text-xs text-ink">{comment.author}</span>
                      </div>
                      <span className="text-[11px] text-ink-muted">{comment.time}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">
                      {comment.text}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:underline cursor-pointer">
                      <MessageSquare size={11} />
                      {comment.replies}
                    </div>
                  </div>
                ))}
              </div>

              {showNewDiscussion ? (
                <form onSubmit={handleAddDiscussion} className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ask a question or share a thought..."
                    rows={2}
                    className="w-full rounded-lg border border-line p-2 text-xs text-ink focus:border-blue-500 focus:outline-none"
                    autoFocus
                  />
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNewDiscussion(false)}
                      className="text-xs h-7"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      type="submit"
                      className="text-xs h-7 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Post
                    </Button>
                  </div>
                </form>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewDiscussion(true)}
                  className="mt-3.5 w-full justify-center text-xs font-semibold text-ink border-line hover:bg-surface-subtle"
                >
                  + Start a Discussion
                </Button>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: EDITORIAL VIEW                                                     */}
      {/* ========================================================================= */}
      {activeTab === 'editorial' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <Card className="rounded-xl border border-line p-6 shadow-card space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200 mb-2">
                  <Sparkles size={13} /> Official Editorial
                </span>
                <h2 className="font-display text-xl font-bold text-ink">
                  Editorial: Largest Element in an Array
                </h2>
                <p className="mt-1 text-xs text-ink-muted">
                  Comprehensive breakdown of single-pass linear traversal and optimal constraints analysis.
                </p>
              </div>

              <div>
                <h3 className="font-display text-sm font-bold text-ink">Intuition &amp; Approach</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  To find the largest element in an unsorted array, we cannot avoid inspecting every element at least once. 
                  Therefore, the theoretical best possible time complexity is <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-ink">O(n)</code>.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  Initialize a tracker variable <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-ink">max_element = nums[0]</code>. 
                  Then iterate through the array starting from index 1. For each integer, if it exceeds <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-ink">max_element</code>, update the tracker.
                </p>
              </div>

              <div>
                <h3 className="font-display text-sm font-bold text-ink">Python 3 Implementation</h3>
                <div className="mt-2.5 rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-100 overflow-x-auto shadow-inner">
                  <pre>{`def largestElement(nums):
    # Initialize maximum with first element
    max_element = nums[0]
    
    # Iterate through the elements
    for num in nums:
        if num > max_element:
            max_element = num
            
    return max_element`}</pre>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
                  <div className="flex items-center gap-1.5 font-semibold text-xs text-emerald-800">
                    <Clock size={14} className="text-emerald-600" /> Time Complexity: O(n)
                  </div>
                  <p className="mt-1 text-[11px] text-emerald-700">
                    We visit each element in nums exactly once in a single linear scan.
                  </p>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50/60 p-3">
                  <div className="flex items-center gap-1.5 font-semibold text-xs text-blue-800">
                    <Database size={14} className="text-blue-600" /> Space Complexity: O(1)
                  </div>
                  <p className="mt-1 text-[11px] text-blue-700">
                    Only a single auxiliary variable <code className="font-mono">max_element</code> is used.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h3 className="font-display text-sm font-bold text-ink">Common Pitfalls</h3>
                <ul className="mt-2 space-y-2 text-xs text-ink-muted">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-ink">Initializing with 0:</strong> If all numbers in <code className="font-mono text-ink">nums</code> are negative, initializing <code className="font-mono text-ink">max_element = 0</code> will return an incorrect result. Always initialize with <code className="font-mono text-ink">nums[0]</code> or <code className="font-mono text-ink">-Infinity</code>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>
                      <strong className="text-ink">Sorting the Array:</strong> Sorting takes <code className="font-mono text-ink">O(n log n)</code> time, which is suboptimal compared to the <code className="font-mono text-ink">O(n)</code> linear scan.
                    </span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="rounded-xl border border-line p-4 shadow-card">
              <h3 className="font-display text-sm font-bold text-ink mb-3">
                Key Insights
              </h3>
              <ul className="space-y-2.5 text-xs text-ink-muted">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>Single-pass traversal is the optimal theoretical lower bound since all elements must be inspected.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>Works for negative integers as long as initial max is set to <code className="font-mono text-ink">nums[0]</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>Applicable to streams and online algorithms where numbers arrive one at a time.</span>
                </li>
              </ul>
            </Card>

            <Card className="rounded-xl border border-line p-4 shadow-card">
              <h3 className="font-display text-sm font-bold text-ink mb-3">
                Similar Problems
              </h3>
              <ul className="space-y-2.5">
                <li className="rounded-lg border border-line p-2.5 hover:bg-surface-subtle transition-colors cursor-pointer">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-ink">Second Largest Element</span>
                    <span className="rounded bg-emerald-50 text-emerald-700 px-1.5 py-0.5 text-[10px] font-bold border border-emerald-200">Easy</span>
                  </div>
                  <p className="mt-1 text-[11px] text-ink-muted">Find the second distinct largest element in an array.</p>
                </li>
                <li className="rounded-lg border border-line p-2.5 hover:bg-surface-subtle transition-colors cursor-pointer">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-ink">Maximum Subarray</span>
                    <span className="rounded bg-blue-50 text-blue-700 px-1.5 py-0.5 text-[10px] font-bold border border-blue-200">Medium</span>
                  </div>
                  <p className="mt-1 text-[11px] text-ink-muted">Find the subarray with the largest sum using Kadane's algorithm.</p>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SOLUTIONS VIEW (Matches Image 4)                                    */}
      {/* ========================================================================= */}
      {activeTab === 'solutions' && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 items-start">
          {/* MAIN AREA (LEFT): Solution Details (6 cols on xl) */}
          <div className="xl:col-span-6 space-y-6">
            <Card className="rounded-xl border border-line bg-surface p-5 sm:p-6 shadow-card space-y-5">
              {/* Header: Title + Badge + Upvote/Downvote/Menu */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-lg font-bold text-ink">
                    {currentSolution.title}
                  </h2>
                  {currentSolution.badge && (
                    <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      {currentSolution.badge}
                    </span>
                  )}
                </div>

                {/* Upvote, Downvote, Three Dots */}
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => handleLikeSolution(currentSolution.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors',
                      currentLikes.userLiked
                        ? 'border-blue-300 bg-blue-50 text-blue-700 font-semibold'
                        : 'border-line text-ink-muted hover:border-slate-300 hover:text-ink hover:bg-surface-subtle',
                    )}
                  >
                    <ThumbsUp
                      size={13}
                      className={cn(
                        currentLikes.userLiked ? 'fill-blue-600 text-blue-600' : 'text-slate-500',
                      )}
                    />
                    <span>{currentLikes.likes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDislikeSolution(currentSolution.id)}
                    className={cn(
                      'inline-flex items-center justify-center h-7 w-7 rounded-lg border transition-colors',
                      currentLikes.userDisliked
                        ? 'border-rose-300 bg-rose-50 text-rose-700'
                        : 'border-line text-ink-muted hover:border-slate-300 hover:text-ink hover:bg-surface-subtle',
                    )}
                    title="Dislike"
                  >
                    <ThumbsDown
                      size={13}
                      className={cn(
                        currentLikes.userDisliked ? 'fill-rose-600 text-rose-600' : 'text-slate-500',
                      )}
                    />
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center h-7 w-7 rounded-lg border border-line text-ink-muted hover:border-slate-300 hover:text-ink hover:bg-surface-subtle transition-colors"
                    title="More actions"
                  >
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>

              {/* Author & Solved info */}
              <div className="flex items-center gap-2.5 text-xs">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700 text-xs shadow-xs">
                  {currentSolution.initials}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-ink">{currentSolution.author}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-ink-muted">{currentSolution.time}</span>
                </div>
              </div>

              {/* Explanation text */}
              <p className="text-xs leading-relaxed text-ink-muted">
                {currentSolution.explanation}
              </p>

              {/* Code Block Container */}
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0d1117] shadow-sm">
                {/* Code Block Top Bar */}
                <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#161b22] px-3.5 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-200">
                      {currentSolution.language}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Dark/Light mode toggle */}
                    <button
                      type="button"
                      onClick={() => setCodeDarkMode(!codeDarkMode)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                      title={codeDarkMode ? 'Switch to light view' : 'Switch to dark view'}
                    >
                      {codeDarkMode ? <Moon size={13} /> : <Sun size={13} />}
                    </button>

                    {/* Copy Code button */}
                    <button
                      type="button"
                      onClick={() => handleCopyCode(currentSolution.code)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#21262d] px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-[#30363d] hover:text-white transition-colors"
                    >
                      {codeCopied ? (
                        <>
                          <Check size={13} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Code Content */}
                <div
                  className={cn(
                    'p-4 font-mono text-xs leading-relaxed overflow-x-auto transition-colors',
                    codeDarkMode ? 'bg-[#0d1117] text-slate-200' : 'bg-slate-50 text-slate-900',
                  )}
                >
                  <pre className="font-mono">
                    <code>{currentSolution.code}</code>
                  </pre>
                </div>
              </div>

              {/* Numbered Steps Explanation (1 to 4) */}
              <div className="space-y-3 pt-1">
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-ink">
                  Step-by-Step Explanation
                </h3>
                <div className="space-y-3">
                  {currentSolution.steps.map((step) => (
                    <div key={step.num} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-surface-subtle p-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-700">
                        {step.num}
                      </span>
                      <div className="space-y-0.5 text-xs">
                        <h4 className="font-semibold text-ink">{step.title}</h4>
                        <p className="text-ink-muted leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complexity Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <Clock size={13} /> {currentSolution.timeComplexity}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  <Database size={13} /> {currentSolution.spaceComplexity}
                </span>
              </div>

              {/* Was this solution helpful? */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-surface-subtle p-3.5 text-xs">
                <span className="font-semibold text-ink">
                  Was this solution helpful?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleHelpfulVote(currentSolution.id, 'yes')}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold transition-colors',
                      helpfulFeedback[currentSolution.id] === 'yes'
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                        : 'border-line bg-surface text-ink hover:bg-slate-50',
                    )}
                  >
                    <ThumbsUp size={12} className={helpfulFeedback[currentSolution.id] === 'yes' ? 'fill-emerald-600' : ''} />
                    <span>Yes ({currentSolution.helpfulYes + (helpfulFeedback[currentSolution.id] === 'yes' ? 1 : 0)})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHelpfulVote(currentSolution.id, 'no')}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold transition-colors',
                      helpfulFeedback[currentSolution.id] === 'no'
                        ? 'border-rose-300 bg-rose-50 text-rose-700'
                        : 'border-line bg-surface text-ink hover:bg-slate-50',
                    )}
                  >
                    <ThumbsDown size={12} className={helpfulFeedback[currentSolution.id] === 'no' ? 'fill-rose-600' : ''} />
                    <span>No ({currentSolution.helpfulNo + (helpfulFeedback[currentSolution.id] === 'no' ? 1 : 0)})</span>
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* MIDDLE COLUMN: All Solutions (24) + Editorial Card (3 cols on xl) */}
          <div className="xl:col-span-3 space-y-6">
            {/* All Solutions (24) card */}
            <Card className="rounded-xl border border-line p-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  All Solutions <span className="font-normal text-xs text-ink-muted">(24)</span>
                </h3>
              </div>

              <div className="mt-3 space-y-2.5">
                {solutionsList.map((sol) => {
                  const isSelected = sol.id === selectedSolutionId
                  return (
                    <div
                      key={sol.id}
                      onClick={() => setSelectedSolutionId(sol.id)}
                      className={cn(
                        'cursor-pointer rounded-lg border p-3 transition-all text-xs',
                        isSelected
                          ? 'border-blue-500 bg-blue-50/50 shadow-xs'
                          : 'border-slate-100 bg-surface hover:border-slate-200 hover:bg-surface-subtle',
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 font-semibold text-ink">
                          <span>{sol.title}:</span>
                          {sol.badge && (
                            <span className="rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700">
                              {sol.badge}
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-emerald-600">{sol.rate}%</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-ink-muted mt-1">
                        <span>{sol.author}</span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp size={11} /> {sol.likes}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full justify-center text-xs font-semibold text-blue-600 border-line hover:bg-surface-subtle"
              >
                View All Solutions <ChevronRight size={14} />
              </Button>
            </Card>

            {/* Editorial Card */}
            <Card className="rounded-xl border border-line p-4 shadow-card space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Sparkles size={15} />
                </div>
                <h3 className="font-display text-sm font-bold text-ink">
                  Editorial
                </h3>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Step-by-step approach and common variations.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleTabChange('editorial')}
                className="w-full justify-center text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Read Editorial <ChevronRight size={14} />
              </Button>
            </Card>
          </div>

          {/* RIGHT RAIL: Progress, Submissions Summary, Leaderboard, Similar Problems (3 cols on xl) */}
          <div className="xl:col-span-3 space-y-6">
            {/* 1. Your Progress */}
            <Card className="rounded-xl border border-line p-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Your Progress
                </h3>
                <button
                  type="button"
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="relative flex items-center justify-center shrink-0">
                  <ProgressRing
                    value={60}
                    size={76}
                    strokeWidth={7}
                    accent="brand"
                    hideLabel
                  />
                  <span className="absolute font-display text-sm font-bold text-ink">
                    60%
                  </span>
                </div>
                <div className="min-w-0 flex-1 space-y-1 text-xs">
                  <div>
                    <span className="text-[11px] text-ink-muted">Correct Submissions</span>
                    <p className="font-display text-base font-bold text-ink">6 / 10</p>
                  </div>
                  <div className="text-[11px] text-ink-muted">
                    Attempted: <strong className="font-semibold text-ink">10</strong>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs">
                <div className="rounded-lg bg-surface-subtle p-2 border border-slate-100">
                  <span className="text-[10px] text-ink-muted block font-medium">Accuracy</span>
                  <span className="font-display font-bold text-ink text-sm">92%</span>
                </div>
                <div className="rounded-lg bg-surface-subtle p-2 border border-slate-100">
                  <span className="text-[10px] text-ink-muted block font-medium">Points</span>
                  <span className="font-display font-bold text-ink text-sm">15 / 20</span>
                </div>
              </div>
            </Card>

            {/* 2. Submissions Summary */}
            <Card className="rounded-xl border border-line p-4 shadow-card space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Submissions
                </h3>
                <span className="text-xs text-ink-muted font-medium">10 Total Submissions</span>
              </div>

              {/* Segmented bar for the 10 submissions */}
              <div className="h-2 w-full rounded-full bg-slate-100 flex overflow-hidden">
                <div style={{ width: '60%' }} className="bg-emerald-500 h-full" title="6 Accepted" />
                <div style={{ width: '30%' }} className="bg-rose-500 h-full" title="3 Wrong Answer" />
                <div style={{ width: '10%' }} className="bg-amber-500 h-full" title="1 Time Limit" />
              </div>

              {/* Status Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="flex items-center gap-2 rounded-lg bg-surface-subtle p-2 border border-slate-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-ink-muted font-medium truncate">
                    <strong className="text-ink">6</strong> Accepted
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-surface-subtle p-2 border border-slate-100">
                  <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                  <span className="text-ink-muted font-medium truncate">
                    <strong className="text-ink">3</strong> Wrong Ans
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-surface-subtle p-2 border border-slate-100">
                  <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-ink-muted font-medium truncate">
                    <strong className="text-ink">1</strong> Time Limit
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-surface-subtle p-2 border border-slate-100">
                  <span className="h-2 w-2 rounded-full bg-slate-400 shrink-0" />
                  <span className="text-ink-muted font-medium truncate">
                    <strong className="text-ink">0</strong> Runtime Err
                  </span>
                </div>
              </div>
            </Card>

            {/* 3. Leaderboard */}
            <Card className="rounded-xl border border-line p-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Leaderboard
                </h3>
                <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
                  Full View
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                {/* #1 Rahul Singh */}
                <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50/40 p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 font-bold text-[10px] text-white">
                      1
                    </span>
                    <span className="font-semibold text-ink">Rahul Singh</span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="text-emerald-600 font-semibold">92%</span>
                    <span className="font-mono text-ink-muted text-[11px]">15.20 pts</span>
                  </div>
                </div>

                {/* #2 Priya Verma */}
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/70 p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 font-bold text-[10px] text-slate-700">
                      2
                    </span>
                    <span className="font-semibold text-ink">Priya Verma</span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="text-emerald-600 font-semibold">88%</span>
                    <span className="font-mono text-ink-muted text-[11px]">14.80 pts</span>
                  </div>
                </div>

                {/* #3 Aman Kumar */}
                <div className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50/40 p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 font-bold text-[10px] text-white">
                      3
                    </span>
                    <span className="font-semibold text-ink">Aman Kumar</span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="text-emerald-600 font-semibold">82%</span>
                    <span className="font-mono text-ink-muted text-[11px]">13.50 pts</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex justify-center py-0.5 text-slate-300 text-xs font-bold">
                  ···
                </div>

                {/* #12 You */}
                <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50/80 p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 font-bold text-[10px] text-white">
                      12
                    </span>
                    <span className="font-bold text-blue-900 flex items-center gap-1.5">
                      You
                      <span className="rounded bg-blue-200/80 px-1 py-0.2 text-[10px] font-bold text-blue-800">
                        Rank 12
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="text-blue-700 font-semibold">60%</span>
                    <span className="font-mono text-blue-800 font-medium text-[11px]">10.00 pts</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 4. Similar Problems */}
            <Card className="rounded-xl border border-line p-4 shadow-card space-y-3">
              <h3 className="font-display text-sm font-bold text-ink pb-2 border-b border-slate-100">
                Similar Problems
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  to="/practice"
                  className="block rounded-lg border border-slate-100 bg-surface-subtle p-2.5 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-ink">Second Largest Element in Array</span>
                    <span className="rounded bg-emerald-50 text-emerald-700 px-1.5 py-0.5 text-[10px] font-bold border border-emerald-200">
                      Easy
                    </span>
                  </div>
                  <span className="text-[11px] text-ink-muted mt-0.5 block">84% Accuracy</span>
                </Link>

                <Link
                  to="/practice"
                  className="block rounded-lg border border-slate-100 bg-surface-subtle p-2.5 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-ink">Maximum Subarray</span>
                    <span className="rounded bg-blue-50 text-blue-700 px-1.5 py-0.5 text-[10px] font-bold border border-blue-200">
                      Medium
                    </span>
                  </div>
                  <span className="text-[11px] text-ink-muted mt-0.5 block">68% Accuracy</span>
                </Link>
              </div>

              <Link
                to="/master/dsa"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-line py-2 text-xs font-semibold text-ink hover:bg-surface-subtle transition-colors"
              >
                Practice More Problems <ChevronRight size={14} />
              </Link>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: SUBMISSIONS VIEW (Matches Image 1)                                  */}
      {/* ========================================================================= */}
      {activeTab === 'submissions' && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px] items-start">
          {/* Main Area: Submissions Table & Trophy Banner */}
          <div className="min-w-0 space-y-6">
            <Card className="p-0 overflow-hidden border border-line rounded-xl shadow-card bg-surface">
              {/* Header with Filters */}
              <div className="flex flex-col gap-3 border-b border-line px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between bg-surface">
                <h2 className="font-display text-base font-bold text-ink">
                  Your Submissions
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    aria-label="Filter by language"
                    value={submissionLangFilter}
                    onChange={(e) => setSubmissionLangFilter(e.target.value)}
                    className="h-8 rounded-lg border border-line bg-surface px-2.5 text-xs font-medium text-ink focus:border-brand-500 focus:outline-none"
                  >
                    <option value="All Languages">All Languages</option>
                    <option value="Python 3">Python 3</option>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="JavaScript">JavaScript</option>
                  </select>
                  <select
                    aria-label="Filter by verdict"
                    value={submissionVerdictFilter}
                    onChange={(e) => setSubmissionVerdictFilter(e.target.value)}
                    className="h-8 rounded-lg border border-line bg-surface px-2.5 text-xs font-medium text-ink focus:border-brand-500 focus:outline-none"
                  >
                    <option value="All Verdicts">All Verdicts</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Wrong Answer">Wrong Answer</option>
                    <option value="Time Limit Exceeded">Time Limit Exceeded</option>
                    <option value="Runtime Error">Runtime Error</option>
                  </select>
                </div>
              </div>

              {/* 10 Submissions Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-xs">
                  <thead>
                    <tr className="border-b border-line bg-slate-50/70 text-left text-ink-muted">
                      <th className="px-4 py-2.5 font-semibold">#</th>
                      <th className="px-4 py-2.5 font-semibold">Submitted On</th>
                      <th className="px-4 py-2.5 font-semibold">Language</th>
                      <th className="px-4 py-2.5 font-semibold">Status</th>
                      <th className="px-4 py-2.5 font-semibold">Runtime</th>
                      <th className="px-4 py-2.5 font-semibold">Memory</th>
                      <th className="px-4 py-2.5 font-semibold">Test Cases</th>
                      <th className="px-4 py-2.5 font-semibold">Score</th>
                      <th className="px-3 py-2.5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {filteredSubmissions.map((submission) => (
                      <tr
                        key={submission.id}
                        className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                      >
                        <td className="px-4 py-3 text-ink-muted font-medium">
                          {submission.id}
                        </td>
                        <td className="px-4 py-3 text-ink font-medium">
                          {submission.submittedOn}
                        </td>
                        <td className="px-4 py-3 text-ink">
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                            {submission.language}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {submission.verdict === 'Accepted' && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                              <Check size={12} strokeWidth={3} className="text-emerald-600" />
                              Accepted
                            </span>
                          )}
                          {submission.verdict === 'Wrong Answer' && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700">
                              <X size={12} strokeWidth={3} className="text-rose-600" />
                              Wrong Answer
                            </span>
                          )}
                          {submission.verdict === 'Time Limit Exceeded' && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                              <Clock size={12} className="text-amber-600" />
                              Time Limit Exceeded
                            </span>
                          )}
                          {submission.verdict === 'Runtime Error' && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700">
                              <X size={12} strokeWidth={3} className="text-rose-600" />
                              Runtime Error
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-ink font-mono">
                          {submission.runtimeMs ? `${submission.runtimeMs} ms` : '-'}
                        </td>
                        <td className="px-4 py-3 text-ink font-mono">
                          {submission.memoryMb ? `${submission.memoryMb} MB` : '-'}
                        </td>
                        <td className="px-4 py-3 text-ink">
                          <span className="font-medium">
                            {submission.testsPassed} / {submission.testsTotal}
                          </span>
                        </td>
                        <td
                          className={cn(
                            'px-4 py-3 font-bold',
                            submission.score === 100
                              ? 'text-emerald-600'
                              : 'text-amber-600',
                          )}
                        >
                          {submission.score}%
                        </td>
                        <td className="px-3 py-3 text-right text-slate-400 group-hover:text-blue-600 transition-colors">
                          <ChevronRight size={15} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-2 border-t border-line px-4 py-3 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between bg-surface">
                <div className="flex items-center gap-2">
                  <span>Rows per page:</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(e.target.value)}
                    className="rounded border border-line bg-surface px-1.5 py-0.5 text-xs text-ink focus:outline-none"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <div className="flex items-center gap-1 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setSubmissionPage(1)}
                    className="rounded border border-line px-2 py-1 hover:bg-surface-subtle disabled:opacity-40 transition-colors"
                    disabled={submissionPage === 1}
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmissionPage(1)}
                    className={cn(
                      'rounded px-2.5 py-1 font-semibold transition-colors',
                      submissionPage === 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-line hover:bg-surface-subtle text-ink',
                    )}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmissionPage(2)}
                    className={cn(
                      'rounded px-2.5 py-1 transition-colors',
                      submissionPage === 2
                        ? 'bg-blue-600 font-semibold text-white'
                        : 'border border-line hover:bg-surface-subtle text-ink',
                    )}
                  >
                    2
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmissionPage(2)}
                    className="rounded border border-line px-2 py-1 hover:bg-surface-subtle transition-colors"
                    disabled={submissionPage === 2}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </Card>

            {/* Bottom Trophy Banner */}
            <div className="flex flex-col gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-blue-100/60 p-5 sm:flex-row sm:items-center sm:justify-between shadow-xs">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white shadow-md shadow-amber-500/20">
                  <Trophy size={24} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">
                    Keep practicing to improve your accuracy!
                  </h3>
                  <p className="text-xs text-ink-muted">
                    Solve more problems and climb the leaderboard.
                  </p>
                </div>
              </div>
              <Link
                to="/master/dsa"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors shrink-0"
              >
                Explore More Problems <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Rail for Submissions */}
          <aside className="space-y-6">
            {/* 1. Your Progress */}
            <Card className="rounded-xl border border-line p-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Your Progress
                </h3>
                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="relative flex items-center justify-center shrink-0">
                  <ProgressRing
                    value={60}
                    size={76}
                    strokeWidth={7}
                    accent="brand"
                    hideLabel
                  />
                  <span className="absolute font-display text-sm font-bold text-ink">
                    60%
                  </span>
                </div>
                <div className="flex-1 space-y-1 text-xs">
                  <div>
                    <span className="text-ink-muted">Correct Submissions</span>
                    <p className="font-display text-base font-bold text-ink">
                      6 / 10
                    </p>
                  </div>
                  <div className="text-[11px] text-ink-muted">
                    Attempted: <strong className="font-semibold text-ink">10</strong>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs">
                <div className="rounded-lg bg-surface-subtle p-2.5 border border-slate-100">
                  <span className="text-[11px] text-ink-muted block font-medium">Accuracy</span>
                  <span className="font-display font-bold text-ink text-sm">92%</span>
                </div>
                <div className="rounded-lg bg-surface-subtle p-2.5 border border-slate-100">
                  <span className="text-[11px] text-ink-muted block font-medium">Points</span>
                  <span className="font-display font-bold text-ink text-sm">15 / 20</span>
                </div>
              </div>
            </Card>

            {/* 2. Recent Submissions */}
            <Card className="rounded-xl border border-line p-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Recent Submissions
                </h3>
                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  View All
                </button>
              </div>

              <ul className="mt-3 space-y-2.5 text-xs">
                {[
                  { verdict: 'Accepted', time: '10:32 AM', meta: '56 ms · 14.2 MB', tone: 'emerald' },
                  { verdict: 'Wrong Answer', time: '10:21 AM', meta: '32 ms · 13.8 MB', tone: 'rose' },
                  { verdict: 'Accepted', time: '10:15 AM', meta: '52 ms · 14.1 MB', tone: 'emerald' },
                  { verdict: 'Time Limit Exceeded', time: '10:10 AM', meta: '-', tone: 'amber' },
                  { verdict: 'Accepted', time: '10:02 AM', meta: '48 ms · 13.9 MB', tone: 'emerald' },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-slate-100 bg-surface-subtle p-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'h-2 w-2 rounded-full',
                          item.tone === 'emerald' && 'bg-emerald-500',
                          item.tone === 'rose' && 'bg-rose-500',
                          item.tone === 'amber' && 'bg-amber-500',
                        )}
                      />
                      <div>
                        <span className="font-semibold text-ink">
                          {item.verdict}
                        </span>
                        <p className="text-[11px] text-ink-muted font-mono">{item.meta}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-ink-muted">{item.time}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* 3. Focus Areas */}
            <Card className="rounded-xl border border-line p-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display text-sm font-bold text-ink">
                  Focus Areas
                </h3>
                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  View All
                </button>
              </div>

              <ul className="mt-3 space-y-3">
                {focusAreas.map((area) => (
                  <li key={area.id}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-ink">{area.label}</span>
                      <span className="font-bold text-ink-muted">{area.value}%</span>
                    </div>
                    <ProgressBar
                      value={area.value}
                      accent={area.accent}
                      label={area.label}
                    />
                  </li>
                ))}
              </ul>
            </Card>

            {/* 4. Need help? Card */}
            <Card className="rounded-xl border border-line p-4 shadow-card space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <HelpCircle size={16} />
                </div>
                <h3 className="font-display text-sm font-bold text-ink">
                  Need help?
                </h3>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Join a live session or ask in the community.
              </p>
              <Link
                to="/career/live"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-xs"
              >
                View Live Sessions <ChevronRight size={14} />
              </Link>
            </Card>
          </aside>
        </div>
      )}
    </div>
  )
}
