import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Circle,
  Clock,
  Code2,
  Download,
  ExternalLink,
  FileCode,
  FileText,
  Flame,
  LayoutGrid,
  MessageSquare,
  Play,
  Sparkles,
  Video,
  X,
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { DifficultyBadge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'
import type { Difficulty } from '../../types'

interface SubTopic {
  id: string
  number: string
  title: string
  duration: string
  status: 'completed' | 'in-progress' | 'not-started'
  type: 'concept' | 'video' | 'practice'
}

interface CourseTopic {
  id: string
  number: number
  title: string
  progress: number
  status: 'completed' | 'in-progress' | 'not-started'
  totalSubtopics: number
  completedSubtopics: number
  duration: string
  subtopics: SubTopic[]
}

interface RelatedProblem {
  id: string
  title: string
  difficulty: Difficulty
  acceptance: string
  solved: boolean
}

interface TopicResource {
  id: string
  title: string
  type: 'Article' | 'Video' | 'Collection' | 'PDF'
  source: string
  url: string
  icon: typeof FileText
  badgeTone: string
}

const initialTopics: CourseTopic[] = [
  {
    id: 'intro',
    number: 1,
    title: 'Introduction to Arrays',
    progress: 100,
    status: 'completed',
    totalSubtopics: 4,
    completedSubtopics: 4,
    duration: '45 min',
    subtopics: [
      {
        id: '1.1',
        number: '1.1',
        title: 'What is an Array? Definition & Memory Layout',
        duration: '10 min',
        status: 'completed',
        type: 'concept',
      },
      {
        id: '1.2',
        number: '1.2',
        title: 'Memory Representation & Indexing (Base Address math)',
        duration: '15 min',
        status: 'completed',
        type: 'concept',
      },
      {
        id: '1.3',
        number: '1.3',
        title: 'Static vs Dynamic Arrays in Memory',
        duration: '12 min',
        status: 'completed',
        type: 'video',
      },
      {
        id: '1.4',
        number: '1.4',
        title: 'Array Operations & Big-O Complexity Cheatsheet',
        duration: '8 min',
        status: 'completed',
        type: 'practice',
      },
    ],
  },
  {
    id: 'traversing',
    number: 2,
    title: 'Traversing Arrays',
    progress: 100,
    status: 'completed',
    totalSubtopics: 3,
    completedSubtopics: 3,
    duration: '32 min',
    subtopics: [
      {
        id: '2.1',
        number: '2.1',
        title: 'Forward and Backward Linear Traversal',
        duration: '10 min',
        status: 'completed',
        type: 'concept',
      },
      {
        id: '2.2',
        number: '2.2',
        title: 'Boundary Checking & Handling Edge Cases',
        duration: '8 min',
        status: 'completed',
        type: 'concept',
      },
      {
        id: '2.3',
        number: '2.3',
        title: 'Multi-dimensional Matrix Iteration & Flattening',
        duration: '14 min',
        status: 'completed',
        type: 'practice',
      },
    ],
  },
  {
    id: 'insertion',
    number: 3,
    title: 'Insertion in Arrays',
    progress: 60,
    status: 'in-progress',
    totalSubtopics: 4,
    completedSubtopics: 2,
    duration: '34 min',
    subtopics: [
      {
        id: '3.1',
        number: '3.1',
        title: 'Insert at Beginning',
        duration: '12 min',
        status: 'completed',
        type: 'concept',
      },
      {
        id: '3.2',
        number: '3.2',
        title: 'Insert at End',
        duration: '8 min',
        status: 'completed',
        type: 'concept',
      },
      {
        id: '3.3',
        number: '3.3',
        title: 'Insert at Any Position',
        duration: '9 min',
        status: 'in-progress',
        type: 'concept',
      },
      {
        id: '3.4',
        number: '3.4',
        title: 'Practice Problems',
        duration: '5 Problems',
        status: 'not-started',
        type: 'practice',
      },
    ],
  },
  {
    id: 'deletion',
    number: 4,
    title: 'Deletion in Arrays',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 4,
    completedSubtopics: 0,
    duration: '39 min',
    subtopics: [
      {
        id: '4.1',
        number: '4.1',
        title: 'Delete from Beginning (Left Shift Overhead)',
        duration: '10 min',
        status: 'not-started',
        type: 'concept',
      },
      {
        id: '4.2',
        number: '4.2',
        title: 'Delete from End (Constant time removal)',
        duration: '6 min',
        status: 'not-started',
        type: 'concept',
      },
      {
        id: '4.3',
        number: '4.3',
        title: 'Delete at Any Position by Index or Value',
        duration: '12 min',
        status: 'not-started',
        type: 'concept',
      },
      {
        id: '4.4',
        number: '4.4',
        title: 'Practice Problems (In-place Element Removal)',
        duration: '4 Problems',
        status: 'not-started',
        type: 'practice',
      },
    ],
  },
  {
    id: 'searching',
    number: 5,
    title: 'Searching in Arrays',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 4,
    completedSubtopics: 0,
    duration: '44 min',
    subtopics: [
      {
        id: '5.1',
        number: '5.1',
        title: 'Linear Search Analysis & Best/Worst Cases',
        duration: '8 min',
        status: 'not-started',
        type: 'concept',
      },
      {
        id: '5.2',
        number: '5.2',
        title: 'Binary Search Fundamentals on Sorted Arrays',
        duration: '18 min',
        status: 'not-started',
        type: 'concept',
      },
      {
        id: '5.3',
        number: '5.3',
        title: 'Order-Agnostic Binary Search & Upper/Lower Bound',
        duration: '12 min',
        status: 'not-started',
        type: 'concept',
      },
      {
        id: '5.4',
        number: '5.4',
        title: 'Practice Problems (Search in Rotated Sorted Array)',
        duration: '6 Problems',
        status: 'not-started',
        type: 'practice',
      },
    ],
  },
  {
    id: 'two-pointer',
    number: 6,
    title: 'Two Pointer Technique',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 4,
    completedSubtopics: 0,
    duration: '53 min',
    subtopics: [
      {
        id: '6.1',
        number: '6.1',
        title: 'Opposite Direction Pointers (Converging Pattern)',
        duration: '15 min',
        status: 'not-started',
        type: 'concept',
      },
      {
        id: '6.2',
        number: '6.2',
        title: 'Same Direction / Fast & Slow Runner Pattern',
        duration: '18 min',
        status: 'not-started',
        type: 'concept',
      },
      {
        id: '6.3',
        number: '6.3',
        title: '3-Pointer Dutch National Flag Partitioning',
        duration: '20 min',
        status: 'not-started',
        type: 'concept',
      },
      {
        id: '6.4',
        number: '6.4',
        title: 'Practice Problems (Container With Most Water & 3Sum)',
        duration: '8 Problems',
        status: 'not-started',
        type: 'practice',
      },
    ],
  },
  // Additional topics 7 to 23 for "View All Topics (23)"
  {
    id: 'sliding-window',
    number: 7,
    title: 'Sliding Window Technique (Fixed & Dynamic)',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 4,
    completedSubtopics: 0,
    duration: '48 min',
    subtopics: [
      { id: '7.1', number: '7.1', title: 'Fixed-size Window Maximum', duration: '12 min', status: 'not-started', type: 'concept' },
      { id: '7.2', number: '7.2', title: 'Variable-size Window (Shortest Subarray)', duration: '16 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'prefix-sum',
    number: 8,
    title: 'Prefix Sum & Range Queries',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 3,
    completedSubtopics: 0,
    duration: '35 min',
    subtopics: [
      { id: '8.1', number: '8.1', title: '1D Prefix Sum Construction', duration: '10 min', status: 'not-started', type: 'concept' },
      { id: '8.2', number: '8.2', title: '2D Prefix Sum & Submatrix Sums', duration: '15 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'kadanes',
    number: 9,
    title: "Kadane's Algorithm (Maximum Subarray)",
    progress: 0,
    status: 'not-started',
    totalSubtopics: 3,
    completedSubtopics: 0,
    duration: '28 min',
    subtopics: [
      { id: '9.1', number: '9.1', title: "Kadane's Dynamic Programming Logic", duration: '12 min', status: 'not-started', type: 'concept' },
      { id: '9.2', number: '9.2', title: 'Handling All-Negative Elements', duration: '8 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'cyclic-sort',
    number: 10,
    title: 'Cyclic Sort Pattern (Numbers in Range 1..N)',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 3,
    completedSubtopics: 0,
    duration: '30 min',
    subtopics: [
      { id: '10.1', number: '10.1', title: 'Linear Time In-Place Placement', duration: '14 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'merge-intervals',
    number: 11,
    title: 'Merge Intervals & Overlapping Spans',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 3,
    completedSubtopics: 0,
    duration: '40 min',
    subtopics: [
      { id: '11.1', number: '11.1', title: 'Sorting by Start vs End Time', duration: '15 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'subarrays-subseq',
    number: 12,
    title: 'Subarrays vs Subsequences Mechanics',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 3,
    completedSubtopics: 0,
    duration: '32 min',
    subtopics: [
      { id: '12.1', number: '12.1', title: 'Total Subarrays (N*(N+1)/2) vs Subsequences (2^N)', duration: '12 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'matrix-rotation',
    number: 13,
    title: 'Matrix Operations & In-Place Rotation',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 3,
    completedSubtopics: 0,
    duration: '38 min',
    subtopics: [
      { id: '13.1', number: '13.1', title: 'Transpose and Reverse Method', duration: '14 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'spiral-matrix',
    number: 14,
    title: 'Spiral Matrix Traversal',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 2,
    completedSubtopics: 0,
    duration: '25 min',
    subtopics: [
      { id: '14.1', number: '14.1', title: '4-Boundary Layer Peeling', duration: '15 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'dutch-national-flag',
    number: 15,
    title: 'Dutch National Flag (0s, 1s, 2s Sort)',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 2,
    completedSubtopics: 0,
    duration: '22 min',
    subtopics: [
      { id: '15.1', number: '15.1', title: 'Three-way In-place Partitioning', duration: '12 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'next-permutation',
    number: 16,
    title: 'Next Permutation Algorithm',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 2,
    completedSubtopics: 0,
    duration: '26 min',
    subtopics: [
      { id: '16.1', number: '16.1', title: 'Lexicographical Pivot & Swap', duration: '14 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'trapping-rain',
    number: 17,
    title: 'Trapping Rain Water & Monotonic Concepts',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 3,
    completedSubtopics: 0,
    duration: '45 min',
    subtopics: [
      { id: '17.1', number: '17.1', title: 'Prefix Max & Suffix Max Arrays', duration: '18 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'majority-element',
    number: 18,
    title: 'Majority Element (Boyer-Moore Voting)',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 2,
    completedSubtopics: 0,
    duration: '20 min',
    subtopics: [
      { id: '18.1', number: '18.1', title: 'O(1) Space Cancellation Principle', duration: '12 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'longest-consecutive',
    number: 19,
    title: 'Longest Consecutive Sequence (Hash Set)',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 2,
    completedSubtopics: 0,
    duration: '24 min',
    subtopics: [
      { id: '19.1', number: '19.1', title: 'O(N) Exploration with HashSet', duration: '14 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'array-inversions',
    number: 20,
    title: 'Count Inversions in an Array (Merge Sort)',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 2,
    completedSubtopics: 0,
    duration: '35 min',
    subtopics: [
      { id: '20.1', number: '20.1', title: 'Divide and Conquer Count', duration: '18 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'product-except-self',
    number: 21,
    title: 'Product of Array Except Self',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 2,
    completedSubtopics: 0,
    duration: '22 min',
    subtopics: [
      { id: '21.1', number: '21.1', title: 'Prefix and Suffix Running Products', duration: '12 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'find-duplicates',
    number: 22,
    title: 'Find Duplicates in Array without Extra Space',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 2,
    completedSubtopics: 0,
    duration: '25 min',
    subtopics: [
      { id: '22.1', number: '22.1', title: 'Sign-flip Index Marking Technique', duration: '14 min', status: 'not-started', type: 'concept' },
    ],
  },
  {
    id: 'advanced-partitioning',
    number: 23,
    title: 'Advanced Array Optimization & Bitmasking',
    progress: 0,
    status: 'not-started',
    totalSubtopics: 3,
    completedSubtopics: 0,
    duration: '40 min',
    subtopics: [
      { id: '23.1', number: '23.1', title: 'Bitmask Subsets Generation', duration: '16 min', status: 'not-started', type: 'concept' },
    ],
  },
]

const relatedProblemsData: RelatedProblem[] = [
  {
    id: 'insert-delete-getrandom',
    title: 'Insert Delete GetRandom O(1)',
    difficulty: 'Easy',
    acceptance: '53.4%',
    solved: true,
  },
  {
    id: 'insert-interval',
    title: 'Insert Interval',
    difficulty: 'Medium',
    acceptance: '40.2%',
    solved: false,
  },
  {
    id: 'design-add-search-words',
    title: 'Design Add and Search Words',
    difficulty: 'Medium',
    acceptance: '44.8%',
    solved: false,
  },
  {
    id: 'largest-number',
    title: 'Largest Number',
    difficulty: 'Hard',
    acceptance: '36.5%',
    solved: false,
  },
]

const resourcesData: TopicResource[] = [
  {
    id: 'res-gfg',
    title: 'Arrays - GeeksforGeeks',
    type: 'Article',
    source: 'geeksforgeeks.org',
    url: 'https://www.geeksforgeeks.org/array-data-structure/',
    icon: FileText,
    badgeTone: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'res-vis',
    title: 'Arrays Visualization',
    type: 'Video',
    source: 'visualgo.net',
    url: 'https://visualgo.net/en/array',
    icon: Video,
    badgeTone: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'res-leetcode',
    title: 'LeetCode Explore - Arrays',
    type: 'Collection',
    source: 'leetcode.com',
    url: 'https://leetcode.com/explore/featured/card/fun-with-arrays/',
    icon: BookOpen,
    badgeTone: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'res-cheatsheet',
    title: 'Cheat Sheet - Arrays',
    type: 'PDF',
    source: 'Learnlytica PDF Engine',
    url: '#',
    icon: FileCode,
    badgeTone: 'bg-amber-50 text-amber-700 border-amber-200',
  },
]

const navTabs = [
  { id: 'topics', label: 'Topics' },
  { id: 'problems', label: 'Problems', count: 76 },
  { id: 'notes', label: 'Notes' },
  { id: 'practice-plan', label: 'Practice Plan' },
  { id: 'resources', label: 'Resources', count: 4 },
  { id: 'discuss', label: 'Discuss' },
]

export function TopicLearnPage() {
  // Tab State
  const [activeTab, setActiveTab] = useState('topics')

  // Expanded topics state: Topic 3 is open by default
  const [expandedTopicIds, setExpandedTopicIds] = useState<string[]>(['insertion'])

  // Show all 23 topics toggle
  const [showAllTopics, setShowAllTopics] = useState(false)

  // Bookmarking state
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Active subtopic modal/viewer state
  const [activeSubtopicModal, setActiveSubtopicModal] = useState<SubTopic | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3200)
  }

  const toggleTopic = (id: string) => {
    setExpandedTopicIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const handleExpandCollapseAll = () => {
    const visibleList = showAllTopics ? initialTopics : initialTopics.slice(0, 6)
    if (expandedTopicIds.length === visibleList.length) {
      setExpandedTopicIds([])
    } else {
      setExpandedTopicIds(visibleList.map((t) => t.id))
    }
  }

  const displayedTopics = showAllTopics ? initialTopics : initialTopics.slice(0, 6)
  const isAllExpanded = expandedTopicIds.length >= displayedTopics.length

  const handleContinueTopic = () => {
    showToast('Resuming 3.3 Insert at Any Position (9 min)...')
    // Open subtopic 3.3 interactive lesson viewer
    const subtopic = initialTopics[2].subtopics.find((s) => s.id === '3.3')
    if (subtopic) {
      setActiveSubtopicModal(subtopic)
    }
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-navy-950 px-4 py-3 text-xs font-semibold text-white shadow-pop transition-all animate-bounce">
          <Sparkles size={16} className="text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-ink-muted">
        <Link
          to="/master/dsa"
          className="inline-flex items-center gap-1.5 font-medium text-ink-muted hover:text-brand-600 transition-colors"
        >
          <ArrowLeft size={14} className="stroke-[2.2]" />
          <span>DSA &amp; Coding</span>
        </Link>
        <ChevronRight size={14} className="text-line" />
        <Link
          to="/master/dsa"
          className="font-medium text-ink-muted hover:text-brand-600 transition-colors"
        >
          Learn
        </Link>
        <ChevronRight size={14} className="text-line" />
        <span className="font-semibold text-ink">Arrays</span>
      </nav>

      {/* 2. Header Card */}
      <Card className="rounded-2xl border border-line bg-surface p-6 shadow-xs">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 xl:items-center">
          {/* Left / Info Column */}
          <div className="space-y-5 xl:col-span-7">
            {/* Title & Badge */}
            <div className="flex items-start gap-4">
              {/* Purple grid icon tile */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 border border-purple-200 shadow-sm">
                <LayoutGrid size={28} className="stroke-[2.2]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                    Arrays
                  </h1>
                  <span className="inline-flex items-center rounded-full bg-purple-100 border border-purple-200 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                    In Progress
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Learn about arrays, their properties, types, and how to solve problems using array techniques.
                </p>
              </div>
            </div>

            {/* Progress Bar (72% Completed) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-purple-600 font-bold">72% Completed</span>
                <span className="text-ink-muted">16 of 23 Topics Completed</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-purple-500 transition-all duration-500 shadow-xs"
                  style={{ width: '72%' }}
                />
              </div>
            </div>

            {/* Metadata Row: 23 Topics, 76 Problems, 6h 24m, Beginner level */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-ink-muted">
              <div className="flex items-center gap-1.5">
                <BookOpen size={15} className="text-ink-muted" />
                <span>23 Topics</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <Code2 size={15} className="text-ink-muted" />
                <span>76 Problems</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-ink-muted" />
                <span>6h 24m</span>
              </div>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <BarChart3 size={15} className="text-ink-muted" />
                <span>Beginner level</span>
              </div>
            </div>

            {/* Actions: Bookmark & Continue Learning */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setIsBookmarked(!isBookmarked)
                  showToast(!isBookmarked ? 'Arrays saved to your bookmarks!' : 'Bookmark removed')
                }}
                leadingIcon={
                  <Bookmark
                    size={16}
                    className={isBookmarked ? 'fill-purple-600 text-purple-600' : 'text-ink-muted'}
                  />
                }
                className={cn(
                  'rounded-xl border-line font-medium text-xs sm:text-sm',
                  isBookmarked && 'border-purple-200 bg-purple-50 text-purple-700',
                )}
              >
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleContinueTopic}
                leadingIcon={<Play size={16} className="fill-white" />}
                className="rounded-xl px-5 font-semibold text-xs sm:text-sm shadow-sm hover:shadow"
              >
                Continue Learning
              </Button>
            </div>
          </div>

          {/* Right Section: Your Progress in Arrays */}
          <div className="xl:col-span-5">
            <div className="rounded-xl border border-line bg-surface-subtle/80 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xs sm:text-sm font-bold tracking-tight text-ink uppercase text-ink-muted">
                  Your Progress in Arrays
                </h2>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* 4 Stats Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* 16 / 23 Topics Completed (purple icon) */}
                <div className="flex items-center gap-3 rounded-lg border border-line/60 bg-surface p-3 shadow-2xs">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 border border-purple-200">
                    <BookOpen size={17} className="stroke-[2.2]" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-ink truncate">16 / 23</div>
                    <div className="text-[11px] text-ink-muted truncate">Topics Completed</div>
                  </div>
                </div>

                {/* 48 / 76 Problems Solved (green check) */}
                <div className="flex items-center gap-3 rounded-lg border border-line/60 bg-surface p-3 shadow-2xs">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 border border-green-100">
                    <CheckCircle2 size={17} className="stroke-[2.2]" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-ink truncate">48 / 76</div>
                    <div className="text-[11px] text-ink-muted truncate">Problems Solved</div>
                  </div>
                </div>

                {/* 6h 24m Time Spent (blue clock) */}
                <div className="flex items-center gap-3 rounded-lg border border-line/60 bg-surface p-3 shadow-2xs">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600 border border-brand-100">
                    <Clock size={17} className="stroke-[2.2]" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-ink truncate">6h 24m</div>
                    <div className="text-[11px] text-ink-muted truncate">Time Spent</div>
                  </div>
                </div>

                {/* 12 Day Streak (flame) */}
                <div className="flex items-center gap-3 rounded-lg border border-line/60 bg-surface p-3 shadow-2xs">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 border border-orange-100">
                    <Flame size={17} className="stroke-[2.2] fill-orange-500" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-ink truncate">12 Days</div>
                    <div className="text-[11px] text-ink-muted truncate">Current Streak</div>
                  </div>
                </div>
              </div>

              {/* View Analytics -> Link */}
              <div className="pt-1 text-right">
                <Link
                  to="/analytics"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
                >
                  View Analytics <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-line">
        <div className="flex gap-1 overflow-x-auto">
          {navTabs.map((tab) => {
            const isSelected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  '-mb-px whitespace-nowrap border-b-2 px-4 py-3 text-xs sm:text-sm font-medium transition-colors cursor-pointer',
                  isSelected
                    ? 'border-brand-600 text-brand-600 font-semibold'
                    : 'border-transparent text-ink-muted hover:text-ink hover:border-slate-300',
                )}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      'ml-2 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                      isSelected
                        ? 'bg-brand-100 text-brand-600'
                        : 'bg-surface-subtle text-ink-muted',
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 4 & 5. Main Area (Topics Tab) & Right Rail */}
      {activeTab === 'topics' && (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
          {/* Main Area: Course Content */}
          <div className="min-w-0 space-y-4">
            {/* Header: Course Content & Expand All */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-ink">
                  Course Content
                </h2>
                <p className="text-xs text-ink-muted">
                  {showAllTopics ? '23' : '6'} Topics · 16 Completed · 1 In Progress
                </p>
              </div>

              <button
                type="button"
                onClick={handleExpandCollapseAll}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:bg-surface-subtle transition-colors shadow-2xs cursor-pointer"
              >
                {isAllExpanded ? (
                  <>
                    Collapse All <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    Expand All <ChevronDown size={14} />
                  </>
                )}
              </button>
            </div>

            {/* Topic List */}
            <div className="space-y-3">
              {displayedTopics.map((topic) => {
                const isExpanded = expandedTopicIds.includes(topic.id)
                const isCompleted = topic.status === 'completed'
                const isInProgress = topic.status === 'in-progress'

                return (
                  <div
                    key={topic.id}
                    className={cn(
                      'rounded-xl border bg-surface transition-all overflow-hidden shadow-2xs',
                      isInProgress
                        ? 'border-brand-300 ring-1 ring-brand-100'
                        : 'border-line hover:border-slate-300',
                    )}
                  >
                    {/* Topic Header Row */}
                    <div
                      onClick={() => toggleTopic(topic.id)}
                      className={cn(
                        'flex items-center justify-between p-4 cursor-pointer select-none transition-colors',
                        isExpanded ? 'bg-surface-subtle/50' : 'hover:bg-surface-subtle/30',
                      )}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Number Indicator / Status Icon */}
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
                              isCompleted
                                ? 'bg-green-100 text-green-500 font-mono'
                                : isInProgress
                                  ? 'bg-brand-100 text-brand-600 font-mono'
                                  : 'bg-surface-subtle text-ink-muted font-mono border border-line',
                            )}
                          >
                            {topic.number}
                          </span>
                        </div>

                        {/* Title & Status */}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-sm font-bold text-ink truncate">
                              {topic.number}. {topic.title}
                            </h3>

                            {/* Status Badge */}
                            {isCompleted && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-500">
                                <CheckCircle2 size={13} className="text-green-500" />
                                100% Completed
                              </span>
                            )}
                            {isInProgress && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-purple-100 px-2 py-0.5 text-[11px] font-semibold text-purple-600">
                                <Play size={11} className="fill-purple-600 text-purple-600" />
                                {topic.progress}% In Progress
                              </span>
                            )}
                            {!isCompleted && !isInProgress && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-surface-subtle px-2 py-0.5 text-[11px] font-medium text-ink-muted border border-line">
                                <Circle size={10} className="text-slate-300" />
                                0% Not Started
                              </span>
                            )}
                          </div>

                          <div className="mt-0.5 text-[11px] text-ink-muted flex items-center gap-2">
                            <span>{topic.duration}</span>
                            <span>•</span>
                            <span>
                              {topic.completedSubtopics} of {topic.totalSubtopics} items done
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action & Chevron */}
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <button
                          type="button"
                          aria-label={isExpanded ? 'Collapse topic' : 'Expand topic'}
                          className="rounded-lg p-1 text-ink-muted hover:text-ink hover:bg-surface transition-colors"
                        >
                          <ChevronDown
                            size={18}
                            className={cn('transition-transform duration-200', isExpanded && 'rotate-180')}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Subtopics Expanded Panel */}
                    {isExpanded && (
                      <div className="border-t border-line bg-surface divide-y divide-line/60">
                        {topic.subtopics.map((subtopic) => {
                          const isSubDone = subtopic.status === 'completed'
                          const isSubCurrent = subtopic.status === 'in-progress'

                          return (
                            <div
                              key={subtopic.id}
                              className={cn(
                                'flex items-center justify-between px-4 py-3 sm:px-5 transition-colors',
                                isSubCurrent
                                  ? 'bg-purple-50/40 border-l-4 border-l-purple-600'
                                  : 'hover:bg-surface-subtle/60',
                              )}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {/* Subtopic Status Icon */}
                                {isSubDone && (
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500">
                                    <Check size={12} strokeWidth={3} />
                                  </span>
                                )}
                                {isSubCurrent && (
                                  <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-30 animate-ping" />
                                    <span className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-purple-600 bg-white">
                                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                                    </span>
                                  </span>
                                )}
                                {!isSubDone && !isSubCurrent && (
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-slate-300">
                                    <Circle size={15} />
                                  </span>
                                )}

                                {/* Subtopic Title & Meta */}
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-ink">
                                      {subtopic.number} {subtopic.title}
                                    </span>
                                    {isSubCurrent && (
                                      <span className="rounded bg-purple-100 px-1.5 py-0.2 text-[10px] font-bold text-purple-700">
                                        Current
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-ink-muted">
                                    {subtopic.duration}
                                  </span>
                                </div>
                              </div>

                              {/* Subtopic Action */}
                              <div className="shrink-0 ml-3">
                                {isSubCurrent ? (
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => {
                                      showToast(`Starting ${subtopic.number} ${subtopic.title}...`)
                                      setActiveSubtopicModal(subtopic)
                                    }}
                                    leadingIcon={<Play size={12} className="fill-white" />}
                                    className="h-7 text-xs rounded-lg px-3 bg-brand-600 shadow-2xs"
                                  >
                                    Resume
                                  </Button>
                                ) : isSubDone ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      showToast(`Reviewing ${subtopic.number} ${subtopic.title}...`)
                                      setActiveSubtopicModal(subtopic)
                                    }}
                                    className="text-xs font-semibold text-ink-muted hover:text-brand-600 transition-colors"
                                  >
                                    Review
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      showToast(`Opening ${subtopic.number} ${subtopic.title}...`)
                                      setActiveSubtopicModal(subtopic)
                                    }}
                                    className="text-xs font-medium text-ink-muted hover:text-brand-600 transition-colors"
                                  >
                                    Start
                                  </button>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Bottom Button: View All Topics (23) */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowAllTopics(!showAllTopics)}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-6 py-2.5 text-xs sm:text-sm font-semibold text-ink hover:bg-surface-subtle transition-colors shadow-2xs cursor-pointer"
              >
                {showAllTopics ? (
                  <>
                    Show Less Topics <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    View All Topics (23) <ChevronDown size={16} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Rail */}
          <aside className="space-y-5">
            {/* Card 1: Up Next */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-ping" />
                  <h3 className="font-display text-sm font-bold text-ink">Up Next</h3>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Displaying all upcoming subtopics')}
                  className="text-xs font-semibold text-brand-600 hover:underline cursor-pointer"
                >
                  See All
                </button>
              </div>

              <div className="mt-3.5 space-y-3">
                <div className="rounded-xl border border-purple-100 bg-purple-50/60 p-3.5 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 font-mono text-xs font-bold">
                      3.3
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-ink leading-tight">
                        Insert at Any Position
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink-muted">
                        9 min · Insertion in Arrays
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleContinueTopic}
                    leadingIcon={<Play size={13} className="fill-white" />}
                    className="w-full rounded-lg text-xs font-semibold h-8 bg-brand-600"
                  >
                    Continue Topic
                  </Button>
                </div>
              </div>
            </Card>

            {/* Card 2: Related Problems */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <h3 className="font-display text-sm font-bold text-ink">Related Problems</h3>
                <Link
                  to="/practice"
                  className="text-xs font-semibold text-brand-600 hover:underline cursor-pointer"
                >
                  View All
                </Link>
              </div>

              <ul className="mt-3 space-y-2.5">
                {relatedProblemsData.map((problem) => (
                  <li key={problem.id}>
                    <Link
                      to={`/practice/${problem.id}`}
                      className="group flex items-center justify-between rounded-lg p-2 hover:bg-surface-subtle transition-colors border border-transparent hover:border-line"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="text-xs font-semibold text-ink group-hover:text-brand-600 transition-colors truncate">
                          {problem.title}
                        </p>
                        <p className="text-[11px] text-ink-muted">
                          Acceptance: {problem.acceptance}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        <DifficultyBadge value={problem.difficulty} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Card 3: Resources */}
            <Card className="rounded-xl border border-line p-4 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <h3 className="font-display text-sm font-bold text-ink">Resources</h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('resources')}
                  className="text-xs font-semibold text-brand-600 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              <ul className="mt-3 space-y-2.5">
                {resourcesData.map((res) => {
                  const Icon = res.icon
                  return (
                    <li
                      key={res.id}
                      className="flex items-center justify-between rounded-lg p-2 bg-surface-subtle/70 border border-line/60 hover:border-line transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface border border-line text-brand-600">
                          <Icon size={15} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block truncate text-xs font-bold text-ink hover:text-brand-600 transition-colors"
                          >
                            {res.title}
                          </a>
                          <p className="text-[11px] text-ink-muted truncate">{res.source}</p>
                        </div>
                      </div>

                      <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-semibold shrink-0 ml-2 border', res.badgeTone)}>
                        {res.type}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Card>

            {/* Card 4: Need Help? */}
            <div className="relative overflow-hidden rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-50/80 via-white to-indigo-50/60 p-5 shadow-xs">
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-500/20">
                    <MessageSquare size={17} />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-ink">Need Help?</h3>
                    <p className="text-[11px] text-ink-muted">24/7 Community &amp; AI Mentors</p>
                  </div>
                </div>

                <p className="text-xs text-ink-muted leading-relaxed">
                  Ask your doubts in the discussion forum or connect with a mentor.
                </p>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveTab('discuss')}
                  leadingIcon={<MessageSquare size={14} />}
                  className="w-full rounded-xl text-xs font-semibold h-9 shadow-xs"
                >
                  Go to Discuss
                </Button>
              </div>

              {/* Decorative Background Illustration */}
              <div className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-brand-200/30 blur-xl" />
              <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-purple-200/30 blur-lg" />
            </div>
          </aside>
        </div>
      )}

      {/* Problems Tab Content */}
      {activeTab === 'problems' && (
        <Card className="rounded-xl border border-line p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Arrays Practice Set</h2>
              <p className="text-xs text-ink-muted">
                76 problems curated across Easy, Medium, and Hard tiers.
              </p>
            </div>
            <Link to="/practice">
              <Button variant="primary" size="sm" className="rounded-xl">
                Open Full Practice Arena
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink">
              <thead className="bg-surface-subtle border-y border-line text-ink-muted uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Title</th>
                  <th className="py-3 px-4 font-semibold">Difficulty</th>
                  <th className="py-3 px-4 font-semibold">Acceptance</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {[
                  { title: 'Two Sum', diff: 'Easy', acc: '49.8%', solved: true },
                  { title: 'Best Time to Buy and Sell Stock', diff: 'Easy', acc: '54.1%', solved: true },
                  { title: 'Contains Duplicate', diff: 'Easy', acc: '61.2%', solved: true },
                  { title: 'Insert Delete GetRandom O(1)', diff: 'Easy', acc: '53.4%', solved: true },
                  { title: 'Maximum Subarray', diff: 'Medium', acc: '50.3%', solved: true },
                  { title: 'Insert Interval', diff: 'Medium', acc: '40.2%', solved: false },
                  { title: '3Sum', diff: 'Medium', acc: '33.1%', solved: false },
                  { title: 'Container With Most Water', diff: 'Medium', acc: '54.5%', solved: false },
                  { title: 'Largest Number', diff: 'Hard', acc: '36.5%', solved: false },
                  { title: 'Trapping Rain Water', diff: 'Hard', acc: '60.1%', solved: false },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface-subtle transition-colors">
                    <td className="py-3 px-4">
                      {item.solved ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-500">
                          <Check size={12} strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-slate-300">
                          <Circle size={12} />
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-bold text-ink hover:text-brand-600 cursor-pointer">
                      {item.title}
                    </td>
                    <td className="py-3 px-4">
                      <DifficultyBadge value={item.diff as Difficulty} />
                    </td>
                    <td className="py-3 px-4 text-ink-muted">{item.acc}</td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant={item.solved ? 'subtle' : 'secondary'}
                        size="sm"
                        onClick={() => showToast(`Opening problem: ${item.title}`)}
                        className="rounded-lg h-7 text-xs px-2.5"
                      >
                        {item.solved ? 'Review' : 'Solve'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Notes Tab Content */}
      {activeTab === 'notes' && (
        <Card className="rounded-xl border border-line p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Arrays Revision Notes</h2>
              <p className="text-xs text-ink-muted">
                Key memory mechanics, operation complexities &amp; common pitfalls.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast('Notes copied to clipboard!')}
              leadingIcon={<Download size={14} />}
              className="rounded-xl text-xs"
            >
              Export Notes
            </Button>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-ink leading-relaxed">
            <div className="rounded-xl bg-surface-subtle p-4 border border-line">
              <h3 className="font-bold text-ink text-sm mb-1.5">1. Contiguous Memory Allocation</h3>
              <p className="text-ink-muted">
                Arrays are stored in contiguous memory blocks. The address of any element at index <code className="bg-slate-200 px-1 rounded text-ink">i</code> is computed using:
                <br />
                <code className="font-mono text-purple-700 bg-purple-50 px-2 py-1 rounded inline-block mt-1">
                  Address(arr[i]) = Base_Address + (i * size_of_data_type)
                </code>
              </p>
            </div>

            <div className="rounded-xl bg-surface-subtle p-4 border border-line">
              <h3 className="font-bold text-ink text-sm mb-1.5">2. Operation Complexities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-surface border border-line">
                  <span className="text-ink-muted block text-[11px]">Random Access</span>
                  <span className="font-bold text-emerald-600">O(1)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface border border-line">
                  <span className="text-ink-muted block text-[11px]">Linear Search</span>
                  <span className="font-bold text-amber-600">O(N)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface border border-line">
                  <span className="text-ink-muted block text-[11px]">Insert/Delete (Middle)</span>
                  <span className="font-bold text-amber-600">O(N)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface border border-line">
                  <span className="text-ink-muted block text-[11px]">Insert/Delete (End)</span>
                  <span className="font-bold text-emerald-600">O(1) amortized</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-surface-subtle p-4 border border-line">
              <h3 className="font-bold text-ink text-sm mb-1.5">3. Dynamic Array Resizing (Geometric Doubling)</h3>
              <p className="text-ink-muted">
                When internal capacity is exhausted, dynamic arrays allocate a new block of size <code className="bg-slate-200 px-1 rounded text-ink">2 * N</code>, copy existing elements, and free previous memory. The amortized insertion cost remains <code className="font-bold text-emerald-600">O(1)</code>.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Practice Plan Tab Content */}
      {activeTab === 'practice-plan' && (
        <Card className="rounded-xl border border-line p-6 shadow-xs space-y-5">
          <div className="pb-4 border-b border-line">
            <h2 className="font-display text-lg font-bold text-ink">7-Day Structured Practice Plan</h2>
            <p className="text-xs text-ink-muted">
              Recommended daily regimen to master arrays from beginner to advanced.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { day: 'Day 1', title: 'Array Fundamentals & Memory Layout', status: 'Completed', tasks: 'Introduction, 1D/2D arrays, 4 Easy problems' },
              { day: 'Day 2', title: 'Traversal, Linear & Binary Search', status: 'Completed', tasks: 'Binary search boundaries, Order agnostic search' },
              { day: 'Day 3', title: 'Insertion & Deletion Mechanics', status: 'In Progress', tasks: 'In-place element removal, Insert interval' },
              { day: 'Day 4', title: 'Two-Pointer Converging & Fast/Slow', status: 'Upcoming', tasks: 'Two Sum II, Container With Most Water, 3Sum' },
              { day: 'Day 5', title: 'Sliding Window (Fixed & Variable)', status: 'Upcoming', tasks: 'Max sum subarray of size K, Minimum window substring' },
              { day: 'Day 6', title: "Prefix Sum & Kadane's Algorithm", status: 'Upcoming', tasks: 'Subarray sum equals K, Maximum contiguous sum' },
              { day: 'Day 7', title: '2D Matrix Traversal & Hard Arrays', status: 'Upcoming', tasks: 'Rotate image, Spiral matrix, Trapping rain water' },
            ].map((plan, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl border border-line bg-surface hover:bg-surface-subtle transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 border border-brand-100 font-bold text-xs text-brand-600">
                    {plan.day}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-ink">{plan.title}</h4>
                    <p className="text-xs text-ink-muted">{plan.tasks}</p>
                  </div>
                </div>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0',
                    plan.status === 'Completed'
                      ? 'bg-green-100 text-green-500'
                      : plan.status === 'In Progress'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-surface-subtle text-ink-muted border border-line',
                  )}
                >
                  {plan.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Resources Tab Content */}
      {activeTab === 'resources' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {resourcesData.map((res) => {
            const Icon = res.icon
            return (
              <Card key={res.id} className="rounded-xl border border-line p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 border border-brand-100 text-brand-600">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-ink">{res.title}</h4>
                      <p className="text-xs text-ink-muted">{res.source}</p>
                    </div>
                  </div>
                  <span className={cn('rounded px-2 py-0.5 text-xs font-semibold border', res.badgeTone)}>
                    {res.type}
                  </span>
                </div>
                <p className="text-xs text-ink-muted">
                  Official reference and interactive visualization tools to deepen your array concept intuition.
                </p>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline pt-1"
                >
                  Open Resource <ExternalLink size={13} />
                </a>
              </Card>
            )
          })}
        </div>
      )}

      {/* Discuss Tab Content */}
      {activeTab === 'discuss' && (
        <Card className="rounded-xl border border-line p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-line">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Arrays Community Discussion</h2>
              <p className="text-xs text-ink-muted">
                124 questions discussed by peers and certified mentors.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => showToast('Question form opened')}
              leadingIcon={<MessageSquare size={14} />}
              className="rounded-xl text-xs"
            >
              Ask a Question
            </Button>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Why is insertion at the middle of dynamic array O(N) instead of O(1)?',
                author: 'Kavya S.',
                replies: 12,
                votes: 38,
                time: '2 hours ago',
                tag: 'Complexity',
              },
              {
                title: 'How to cleanly handle edge cases in 2-pointer sliding window without off-by-one errors?',
                author: 'Rohan Mehta',
                replies: 7,
                votes: 24,
                time: '1 day ago',
                tag: 'Techniques',
              },
              {
                title: 'Is Dutch National Flag algorithm guaranteed stable sort?',
                author: 'Aditya Raj',
                replies: 19,
                votes: 45,
                time: '2 days ago',
                tag: 'Sorting',
              },
            ].map((q, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl border border-line bg-surface hover:bg-surface-subtle transition-colors cursor-pointer"
                onClick={() => showToast(`Opening thread: ${q.title}`)}
              >
                <div className="space-y-1 pr-3">
                  <span className="rounded bg-surface-subtle px-2 py-0.5 text-[10px] font-semibold text-ink-muted border border-line">
                    {q.tag}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-ink hover:text-brand-600 transition-colors">
                    {q.title}
                  </h4>
                  <p className="text-[11px] text-ink-muted">
                    Asked by {q.author} · {q.time}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs font-semibold text-ink-muted">
                  <span>👍 {q.votes}</span>
                  <span>💬 {q.replies}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Subtopic Interactive Modal */}
      {activeSubtopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl border border-line bg-surface p-6 shadow-pop animate-in fade-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 border border-purple-200">
                  <Play size={18} className="fill-purple-600" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {activeSubtopicModal.number} {activeSubtopicModal.title}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {activeSubtopicModal.duration} · Arrays &gt; Insertion in Arrays
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveSubtopicModal(null)}
                className="rounded-lg p-1.5 text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="rounded-xl bg-surface-subtle p-4 border border-line space-y-2.5 text-xs text-ink leading-relaxed">
              <p className="font-semibold text-ink">Key takeaway for this concept:</p>
              <p className="text-ink-muted">
                When inserting at index <code className="bg-slate-200 px-1 rounded">k</code> in an array of size <code className="bg-slate-200 px-1 rounded">N</code>, all elements from index <code className="bg-slate-200 px-1 rounded">N-1</code> down to <code className="bg-slate-200 px-1 rounded">k</code> must be shifted one position to the right to prevent data overwrite.
              </p>
              <div className="font-mono bg-navy-950 text-purple-200 p-3 rounded-lg text-xs">
                {`for (int i = size - 1; i >= k; i--) {\n    arr[i + 1] = arr[i];\n}\narr[k] = new_element;\nsize++;`}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button
                variant="subtle"
                size="sm"
                onClick={() => setActiveSubtopicModal(null)}
                className="rounded-xl"
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                leadingIcon={<Check size={14} />}
                onClick={() => {
                  showToast(`Lesson ${activeSubtopicModal.number} marked as complete!`)
                  setActiveSubtopicModal(null)
                }}
                className="rounded-xl"
              >
                Mark as Complete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
