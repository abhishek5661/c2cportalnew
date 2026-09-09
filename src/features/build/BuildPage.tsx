import { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  AtSign,
  BarChart3,
  BookOpen,
  Briefcase,
  Bug,
  Calendar,
  Check,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Clock,
  CloudSun,
  Code2,
  Copy,
  Download,
  Edit2,
  Edit3,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  Flame,
  Folder,
  FolderGit2,
  GitBranch,
  GitCommit,
  Github,
  GitPullRequest,
  Globe,
  Grid,
  HeartPulse,
  HelpCircle,
  Layers,
  LayoutGrid,
  Lightbulb,
  Link2,
  List,
  ListTodo,
  Lock,
  Mail,
  MessageSquare,
  Milestone,
  MoreHorizontal,
  MoreVertical,
  Paperclip,
  PenLine,
  PieChart,
  Play,
  Plus,
  PlusCircle,
  RefreshCw,
  Search,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sliders,
  Smile,
  Sparkles,
  Star,
  Tag,
  Terminal,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  X,
  Zap,
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'

// ==========================================
// TYPES & INTERFACES
// ==========================================

export type ProjectStatus = 'In Progress' | 'Completed' | 'Under Review' | 'Not Started'

export interface CatalogProject {
  id: string
  slug: string
  title: string
  description: string
  techStack: string[]
  status: ProjectStatus
  progress: number
  updatedAt: string
  icon: 'wallet' | 'ecommerce' | 'ai' | 'health' | 'weather' | 'default'
  stars: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: 'Project Owner' | 'Frontend Dev' | 'Backend Dev' | 'UI/UX' | 'QA' | 'DevOps' | 'Technical Writer'
  access: 'Full Access' | 'Can Edit' | 'Can Comment' | 'Can View'
  status: 'Active' | 'Offline'
  activity: string
  avatarBg: string
  avatarText: string
}

export interface ProjectMilestone {
  id: string
  title: string
  description: string
  status: 'Completed' | 'In Progress' | 'Pending'
  dueDate?: string
  progress?: number
}

export interface ProjectUpdate {
  id: string
  author: string
  role: string
  time: string
  content: string
  avatarBg: string
  avatarText: string
  tag?: string
}

// ==========================================
// INITIAL DATA
// ==========================================

const initialCatalogProjects: CatalogProject[] = [
  {
    id: 'proj-1',
    slug: 'smart-expense-tracker',
    title: 'Smart Expense Tracker',
    description:
      'A comprehensive personal finance tracker built with MERN stack featuring budget alerts, expense categorization, and analytical visual reports.',
    techStack: ['MERN Stack', 'MongoDB', 'Express', 'React', 'Node.js'],
    status: 'In Progress',
    progress: 60,
    updatedAt: 'Updated 2 days ago',
    icon: 'wallet',
    stars: 24,
    level: 'Intermediate',
    category: 'FinTech',
  },
  {
    id: 'proj-2',
    slug: 'e-commerce-website',
    title: 'E-Commerce Website',
    description:
      'Full-featured multi-vendor storefront with real-time inventory management, Stripe payment processing, and admin analytics dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Redux', 'Tailwind'],
    status: 'In Progress',
    progress: 35,
    updatedAt: 'Updated 5 days ago',
    icon: 'ecommerce',
    stars: 42,
    level: 'Intermediate',
    category: 'E-Commerce',
  },
  {
    id: 'proj-3',
    slug: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    description:
      'NLP-powered ATS resume score generator that parses PDF resumes, compares against job descriptions, and provides keyword optimization tips.',
    techStack: ['Python', 'NLP', 'Streamlit', 'Spacy', 'OpenAI'],
    status: 'Completed',
    progress: 100,
    updatedAt: 'Updated 1 week ago',
    icon: 'ai',
    stars: 88,
    level: 'Advanced',
    category: 'AI / ML',
  },
  {
    id: 'proj-4',
    slug: 'health-fitness-app',
    title: 'Health & Fitness App',
    description:
      'Cross-platform mobile fitness tracker featuring daily calorie logging, workout routine builder, water reminder, and sleep telemetry.',
    techStack: ['Flutter', 'Firebase', 'Dart', 'BLoC', 'Cloud Functions'],
    status: 'Under Review',
    progress: 90,
    updatedAt: 'Updated 3 days ago',
    icon: 'health',
    stars: 31,
    level: 'Intermediate',
    category: 'Mobile / Health',
  },
  {
    id: 'proj-5',
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    description:
      'Sleek weather monitoring app with 7-day forecasts, radar weather maps, UV index gauge, and historical precipitation trend charts.',
    techStack: ['JavaScript', 'API', 'Chart.js', 'OpenWeather', 'CSS3'],
    status: 'Completed',
    progress: 100,
    updatedAt: 'Updated 2 weeks ago',
    icon: 'weather',
    stars: 19,
    level: 'Beginner',
    category: 'Web App',
  },
]

const initialTeamMembers: TeamMember[] = [
  {
    id: 'm1',
    name: 'Sachin Diwakar',
    email: 'sachin.diwakar@learnlytica.edu',
    role: 'Project Owner',
    access: 'Full Access',
    status: 'Active',
    activity: '42 commits',
    avatarBg: 'bg-indigo-600 text-white',
    avatarText: 'SD',
  },
  {
    id: 'm2',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@learnlytica.edu',
    role: 'Frontend Dev',
    access: 'Can Edit',
    status: 'Active',
    activity: '28 commits',
    avatarBg: 'bg-emerald-600 text-white',
    avatarText: 'AS',
  },
  {
    id: 'm3',
    name: 'Rohan Verma',
    email: 'rohan.verma@learnlytica.edu',
    role: 'Backend Dev',
    access: 'Can Edit',
    status: 'Active',
    activity: '35 commits',
    avatarBg: 'bg-blue-600 text-white',
    avatarText: 'RV',
  },
  {
    id: 'm4',
    name: 'Vikram Singh',
    email: 'vikram.singh@learnlytica.edu',
    role: 'UI/UX',
    access: 'Can Edit',
    status: 'Active',
    activity: '12 designs',
    avatarBg: 'bg-orange-600 text-white',
    avatarText: 'VS',
  },
  {
    id: 'm5',
    name: 'Neha Patel',
    email: 'neha.patel@learnlytica.edu',
    role: 'QA',
    access: 'Can Comment',
    status: 'Active',
    activity: '19 test cases',
    avatarBg: 'bg-purple-600 text-white',
    avatarText: 'NP',
  },
  {
    id: 'm6',
    name: 'Aditya Joshi',
    email: 'aditya.joshi@learnlytica.edu',
    role: 'DevOps',
    access: 'Can Edit',
    status: 'Offline',
    activity: '8 pipelines',
    avatarBg: 'bg-slate-700 text-white',
    avatarText: 'AJ',
  },
  {
    id: 'm7',
    name: 'Priya Nair',
    email: 'priya.nair@learnlytica.edu',
    role: 'Technical Writer',
    access: 'Can Comment',
    status: 'Active',
    activity: '14 documents',
    avatarBg: 'bg-pink-600 text-white',
    avatarText: 'PN',
  },
]

const initialMilestones: ProjectMilestone[] = [
  {
    id: 'ms-1',
    title: 'Project Initialization',
    description: 'Repo setup, folder structure, CI/CD pipeline, and development environment configuration.',
    status: 'Completed',
    dueDate: 'May 15, 2024',
    progress: 100,
  },
  {
    id: 'ms-2',
    title: 'Authentication Module',
    description: 'User signup, login, password reset, JWT auth with refresh tokens, and protected routes.',
    status: 'Completed',
    dueDate: 'May 28, 2024',
    progress: 100,
  },
  {
    id: 'ms-3',
    title: 'Expense CRUD',
    description: 'Add, update, delete transactions, category management, recurring expense scheduler (75% complete).',
    status: 'In Progress',
    dueDate: 'June 12, 2024',
    progress: 75,
  },
  {
    id: 'ms-4',
    title: 'Analytics Dashboard',
    description: 'Visual expense breakdown charts, monthly budget tracker, trend forecasting, and PDF export.',
    status: 'Pending',
    dueDate: 'June 25, 2024',
    progress: 15,
  },
  {
    id: 'ms-5',
    title: 'Testing & Deployment',
    description: 'Unit & integration tests with Jest/Supertest, Dockerization, and deployment on Render/AWS.',
    status: 'Pending',
    dueDate: 'July 10, 2024',
    progress: 0,
  },
]

const initialUpdates: ProjectUpdate[] = [
  {
    id: 'up-1',
    author: 'Sachin Diwakar',
    role: 'Project Owner',
    time: '2 hours ago',
    content:
      'Completed backend REST API endpoints for category breakdown, integrated JWT refresh token rotation, and pushed unit tests for auth middleware.',
    avatarBg: 'bg-indigo-600 text-white',
    avatarText: 'SD',
    tag: 'Backend API',
  },
  {
    id: 'up-2',
    author: 'Ananya Sharma',
    role: 'Frontend Dev',
    time: 'Yesterday at 4:15 PM',
    content:
      'Finished UI components for budget alert cards and spending charts with responsive breakdowns. Connected TanStack Query hooks for real-time optimistic updates.',
    avatarBg: 'bg-emerald-600 text-white',
    avatarText: 'AS',
    tag: 'Frontend UI',
  },
  {
    id: 'up-3',
    author: 'Rohan Verma',
    role: 'Backend Dev',
    time: '3 days ago',
    content:
      'Configured MongoDB compound indexes for rapid transaction query filtering, seeded test datasets, and added Docker compose configuration for local staging.',
    avatarBg: 'bg-blue-600 text-white',
    avatarText: 'RV',
    tag: 'Database & DevOps',
  },
]

export interface DiscussionReply {
  id: string
  author: string
  role?: string
  isOwner?: boolean
  avatarBg: string
  avatarText: string
  time: string
  content: string
  likes: number
  hasLiked?: boolean
  isSuggestion?: boolean
}

export interface ProjectDiscussion {
  id: string
  title: string
  snippet: string
  badgeType: 'Question' | 'Suggestion' | 'Bug' | 'Update'
  priority?: 'Low' | 'Medium' | 'High'
  status: 'Open' | 'Resolved'
  author: string
  authorRole?: string
  authorAvatarBg?: string
  authorAvatarText?: string
  createdAt: string
  category: 'Features' | 'Enhancements' | 'Bugs' | 'Architecture' | 'Updates' | 'Integrations'
  replyCount: number
  lastReplyText: string
  participants: { name: string; avatarBg: string; avatarText: string }[]
  replies?: DiscussionReply[]
  attachments?: { name: string; size: string; type: string; addedBy: string }[]
  relatedLinks?: { title: string; url: string; sub?: string }[]
}

const initialDiscussions: ProjectDiscussion[] = [
  {
    id: 'disc-1',
    title: 'How should we handle currency conversion for expenses?',
    snippet:
      "I'm thinking of using an exchange rate API. Any suggestions on which one would be best for accuracy and frequent updates? Also, should we store the converted amount or the original amount along with the rate? Looking forward to your inputs!",
    badgeType: 'Question',
    priority: 'High',
    status: 'Open',
    author: 'Ananya Sharma',
    authorRole: 'Frontend Developer',
    authorAvatarBg: 'bg-emerald-600 text-white',
    authorAvatarText: 'AS',
    createdAt: '20 May 2024, 4:30 PM',
    category: 'Features',
    replyCount: 8,
    lastReplyText: 'Last reply 2h ago',
    participants: [
      { name: 'Sachin Diwakar', avatarBg: 'bg-indigo-600 text-white', avatarText: 'SD' },
      { name: 'Ananya Sharma', avatarBg: 'bg-emerald-600 text-white', avatarText: 'AS' },
      { name: 'Rohan Verma', avatarBg: 'bg-blue-600 text-white', avatarText: 'RV' },
      { name: 'Vikram Singh', avatarBg: 'bg-orange-600 text-white', avatarText: 'VS' },
    ],
    replies: [
      {
        id: 'rep-1',
        author: 'Sachin Diwakar',
        role: 'Project Owner',
        isOwner: true,
        avatarBg: 'bg-indigo-600 text-white',
        avatarText: 'SD',
        time: '20 May 2024, 5:05 PM',
        content:
          'We can use ExchangeRate API. It has good accuracy and supports frequent updates. Storing both original amount and converted amount with the rate at that time would be ideal.',
        likes: 3,
      },
      {
        id: 'rep-2',
        author: 'Ananya Sharma',
        role: 'Frontend Dev',
        avatarBg: 'bg-emerald-600 text-white',
        avatarText: 'AS',
        time: '20 May 2024, 5:20 PM',
        content:
          'Makes sense. Storing both will help in case rates change later. Should we update converted amounts daily or in real-time?',
        likes: 1,
      },
      {
        id: 'rep-3',
        author: 'Rohan Verma',
        role: 'Backend Dev',
        avatarBg: 'bg-blue-600 text-white',
        avatarText: 'RV',
        time: '21 May 2024, 9:15 AM',
        content:
          "Real-time might be overkill and can hit API limits. I'd suggest updating once every 24 hours unless the user refreshes manually.",
        likes: 2,
      },
      {
        id: 'rep-4',
        author: 'Vikram Singh',
        role: 'UI/UX Designer',
        avatarBg: 'bg-orange-600 text-white',
        avatarText: 'VS',
        time: '21 May 2024, 11:30 AM',
        content:
          'Agree with Rohan. Also, let\'s cache the rates to minimize API calls.',
        likes: 1,
      },
    ],
    attachments: [
      {
        name: 'sample_exchange_rates.csv',
        size: '12 KB',
        type: 'CSV',
        addedBy: 'Sachin Diwakar',
      },
      {
        name: 'Currency_Conversion_Approaches.pdf',
        size: '245 KB',
        type: 'PDF',
        addedBy: 'Rohan Verma',
      },
    ],
    relatedLinks: [
      {
        title: 'ExchangeRate API Documentation',
        url: 'https://www.exchangerate-api.com/docs',
      },
      {
        title: 'Currency Conversion Best Practices',
        url: '#',
        sub: 'Internal Wiki • Updated on 10 Apr 2024',
      },
      {
        title: 'Previous Discussion: Budget alerts',
        url: '#',
        sub: 'View Discussion',
      },
    ],
  },
  {
    id: 'disc-2',
    title: 'Suggestion: Add monthly budget alerts',
    snippet:
      'We can notify users when they are close to exceeding their monthly budget. I can work on this.',
    badgeType: 'Suggestion',
    status: 'Open',
    author: 'Rohan Verma',
    authorRole: 'Backend Developer',
    authorAvatarBg: 'bg-blue-600 text-white',
    authorAvatarText: 'RV',
    createdAt: '18 May 2024, 11:15 AM',
    category: 'Enhancements',
    replyCount: 5,
    lastReplyText: 'Last reply 1d ago',
    participants: [
      { name: 'Rohan Verma', avatarBg: 'bg-blue-600 text-white', avatarText: 'RV' },
      { name: 'Sachin Diwakar', avatarBg: 'bg-indigo-600 text-white', avatarText: 'SD' },
    ],
  },
  {
    id: 'disc-3',
    title: 'Bug: Expense edit not saving changes',
    snippet:
      'When I try to edit an expense, the changes are not getting saved and it reverts back.',
    badgeType: 'Bug',
    status: 'Open',
    author: 'Vikram Singh',
    authorRole: 'UI/UX Designer',
    authorAvatarBg: 'bg-orange-600 text-white',
    authorAvatarText: 'VS',
    createdAt: '17 May 2024, 2:45 PM',
    category: 'Bugs',
    replyCount: 3,
    lastReplyText: 'Last reply 1d ago',
    participants: [
      { name: 'Vikram Singh', avatarBg: 'bg-orange-600 text-white', avatarText: 'VS' },
      { name: 'Ananya Sharma', avatarBg: 'bg-emerald-600 text-white', avatarText: 'AS' },
    ],
  },
  {
    id: 'disc-4',
    title: 'Best approach for state management in this project?',
    snippet:
      'Should we go with Redux Toolkit or Zustand? What\'s a better fit for our use case?',
    badgeType: 'Question',
    status: 'Open',
    author: 'Sachin Diwakar',
    authorRole: 'Project Owner',
    authorAvatarBg: 'bg-indigo-600 text-white',
    authorAvatarText: 'SD',
    createdAt: '15 May 2024, 9:10 AM',
    category: 'Architecture',
    replyCount: 12,
    lastReplyText: 'Last reply 2d ago',
    participants: [
      { name: 'Sachin Diwakar', avatarBg: 'bg-indigo-600 text-white', avatarText: 'SD' },
      { name: 'Rohan Verma', avatarBg: 'bg-blue-600 text-white', avatarText: 'RV' },
      { name: 'Vikram Singh', avatarBg: 'bg-orange-600 text-white', avatarText: 'VS' },
    ],
  },
  {
    id: 'disc-5',
    title: 'Authentication flow completed',
    snippet:
      'Implemented login, signup and JWT authentication flow. Please review.',
    badgeType: 'Update',
    status: 'Resolved',
    author: 'Rohan Verma',
    authorRole: 'Backend Developer',
    authorAvatarBg: 'bg-blue-600 text-white',
    authorAvatarText: 'RV',
    createdAt: '14 May 2024, 5:20 PM',
    category: 'Updates',
    replyCount: 2,
    lastReplyText: 'Last reply 3d ago',
    participants: [
      { name: 'Rohan Verma', avatarBg: 'bg-blue-600 text-white', avatarText: 'RV' },
      { name: 'Sachin Diwakar', avatarBg: 'bg-indigo-600 text-white', avatarText: 'SD' },
    ],
  },
]

// ==========================================
// MAIN COMPONENT
// ==========================================

export function BuildPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Routing detection: /build vs /build/:slug
  const isDetailRoute =
    location.pathname.startsWith('/build/') &&
    location.pathname !== '/build' &&
    location.pathname !== '/build/'

  // Read query params for initial tab
  const queryParams = new URLSearchParams(location.search)
  const queryTab = queryParams.get('tab')
  const initialDetailTab = queryTab
    ? queryTab.toLowerCase() === 'discussions'
      ? 'Discussions'
      : (queryTab.charAt(0).toUpperCase() + queryTab.slice(1).toLowerCase())
    : 'Overview'

  // State
  const [catalogProjects, setCatalogProjects] = useState<CatalogProject[]>(initialCatalogProjects)
  const [catalogTab, setCatalogTab] = useState<'Overview' | 'My Projects' | 'Explore Ideas' | 'Project Groups' | 'Reviews' | 'Resources'>('Overview')
  const [catalogSearch, setCatalogSearch] = useState('')
  const [catalogStatusFilter, setCatalogStatusFilter] = useState<'All' | ProjectStatus>('All')

  // Project detail states
  const [detailTab, setDetailTab] = useState<'Overview' | 'Tasks' | 'Milestones' | 'Team' | 'Files' | 'Updates' | 'Analytics' | 'Discussions' | 'Settings'>(
    (['Overview', 'Tasks', 'Milestones', 'Team', 'Files', 'Updates', 'Analytics', 'Discussions', 'Settings'].includes(initialDetailTab)
      ? initialDetailTab
      : 'Overview') as any
  )
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<string | null>(null)
  const [discussions, setDiscussions] = useState<ProjectDiscussion[]>(initialDiscussions)
  const [discussionFilterTab, setDiscussionFilterTab] = useState<'all' | 'my' | 'unanswered' | 'resolved'>('all')
  const [discussionCategoryFilter, setDiscussionCategoryFilter] = useState('All')
  const [discussionStatusFilter, setDiscussionStatusFilter] = useState('All')
  const [discussionSearch, setDiscussionSearch] = useState('')
  const [newReplyText, setNewReplyText] = useState('')
  const [isSuggestionReply, setIsSuggestionReply] = useState(false)
  const [isWatchingDiscussion, setIsWatchingDiscussion] = useState(true)
  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false)
  const [newDiscTitle, setNewDiscTitle] = useState('')
  const [newDiscDesc, setNewDiscDesc] = useState('')
  const [newDiscCategory, setNewDiscCategory] = useState<'Features' | 'Enhancements' | 'Bugs' | 'Architecture' | 'Updates'>('Features')
  const [newDiscPriority, setNewDiscPriority] = useState<'Low' | 'Medium' | 'High'>('High')

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [teamSearch, setTeamSearch] = useState('')
  const [teamRoleFilter, setTeamRoleFilter] = useState<string>('All')
  const [milestones] = useState<ProjectMilestone[]>(initialMilestones)
  const [updates, setUpdates] = useState<ProjectUpdate[]>(initialUpdates)

  // Modals & UI interactive states
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [screenshotView, setScreenshotView] = useState<'dashboard' | 'analytics' | 'budgets' | 'transactions'>('dashboard')

  // Pending Invites list
  const [pendingInvites, setPendingInvites] = useState([
    {
      id: 'inv-1',
      name: 'Amit Kumar',
      email: 'amit.kumar@learnlytica.edu',
      role: 'Full Stack Intern',
      sentAt: '2 days ago',
    },
  ])

  // New Project Form State
  const [newProjTitle, setNewProjTitle] = useState('')
  const [newProjDesc, setNewProjDesc] = useState('')
  const [newProjTech, setNewProjTech] = useState('')
  const [newProjCategory, setNewProjCategory] = useState('Full Stack')

  // Invite Member Form State
  const [inviteName, setInviteName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<TeamMember['role']>('Frontend Dev')
  const [inviteAccess, setInviteAccess] = useState<TeamMember['access']>('Can Edit')

  // Add Update Form State
  const [newUpdateAuthor, setNewUpdateAuthor] = useState('Sachin Diwakar')
  const [newUpdateTag, setNewUpdateTag] = useState('Milestone Update')
  const [newUpdateText, setNewUpdateText] = useState('')

  // Trigger temporary toast
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3200)
  }

  // Handle creating a project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProjTitle.trim()) return

    const slug = newProjTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const techArray = newProjTech
      ? newProjTech.split(',').map((t) => t.trim()).filter(Boolean)
      : ['React', 'TypeScript', 'Node.js']

    const newProject: CatalogProject = {
      id: `proj-${Date.now()}`,
      slug: slug || `project-${Date.now()}`,
      title: newProjTitle.trim(),
      description: newProjDesc.trim() || 'Custom software development project on Learnlytica.',
      techStack: techArray,
      status: 'In Progress',
      progress: 5,
      updatedAt: 'Just now',
      icon: 'default',
      stars: 1,
      level: 'Intermediate',
      category: newProjCategory,
    }

    setCatalogProjects((prev) => [newProject, ...prev])
    setShowNewProjectModal(false)
    setNewProjTitle('')
    setNewProjDesc('')
    setNewProjTech('')
    showToast(`Project "${newProject.title}" created successfully!`)
  }

  // Handle inviting a member
  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteName.trim() || !inviteEmail.trim()) return

    const initials = inviteName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

    const newMember: TeamMember = {
      id: `mem-${Date.now()}`,
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      access: inviteAccess,
      status: 'Active',
      activity: '1 commit',
      avatarBg: 'bg-brand-600 text-white',
      avatarText: initials || 'MB',
    }

    setTeamMembers((prev) => [...prev, newMember])
    setShowInviteModal(false)
    setInviteName('')
    setInviteEmail('')
    showToast(`Invitation sent and ${newMember.name} added to the team!`)
  }

  // Handle adding an update
  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUpdateText.trim()) return

    const updateItem: ProjectUpdate = {
      id: `up-${Date.now()}`,
      author: newUpdateAuthor,
      role: 'Contributor',
      time: 'Just now',
      content: newUpdateText.trim(),
      avatarBg: 'bg-brand-600 text-white',
      avatarText: newUpdateAuthor.slice(0, 2).toUpperCase(),
      tag: newUpdateTag || 'General Update',
    }

    setUpdates((prev) => [updateItem, ...prev])
    setShowUpdateModal(false)
    setNewUpdateText('')
    showToast('Project update published to the activity stream!')
  }

  // Handle posting a reply in a discussion thread
  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReplyText.trim() || !selectedDiscussionId) return
    const newReply: DiscussionReply = {
      id: `rep-${Date.now()}`,
      author: 'Ananya Sharma',
      role: 'Frontend Dev',
      avatarBg: 'bg-emerald-600 text-white',
      avatarText: 'AS',
      time: 'Just now',
      content: newReplyText.trim(),
      likes: 0,
      isSuggestion: isSuggestionReply,
    }
    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === selectedDiscussionId
          ? {
              ...d,
              replyCount: d.replyCount + 1,
              lastReplyText: 'Last reply just now',
              replies: [...(d.replies || []), newReply],
            }
          : d
      )
    )
    setNewReplyText('')
    setIsSuggestionReply(false)
    showToast('Reply posted successfully!')
  }

  // Handle toggling like on a reply
  const handleToggleLikeReply = (replyId: string) => {
    if (!selectedDiscussionId) return
    setDiscussions((prev) =>
      prev.map((d) => {
        if (d.id !== selectedDiscussionId || !d.replies) return d
        return {
          ...d,
          replies: d.replies.map((r) => {
            if (r.id !== replyId) return r
            const hasLiked = r.hasLiked
            return {
              ...r,
              hasLiked: !hasLiked,
              likes: hasLiked ? r.likes - 1 : r.likes + 1,
            }
          }),
        }
      })
    )
  }

  // Handle creating new discussion
  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDiscTitle.trim()) return
    const newDisc: ProjectDiscussion = {
      id: `disc-${Date.now()}`,
      title: newDiscTitle.trim(),
      snippet: newDiscDesc.trim() || 'New discussion topic started for Smart Expense Tracker.',
      badgeType: 'Question',
      priority: newDiscPriority,
      status: 'Open',
      author: 'Ananya Sharma',
      authorRole: 'Frontend Developer',
      authorAvatarBg: 'bg-emerald-600 text-white',
      authorAvatarText: 'AS',
      createdAt: 'Just now',
      category: newDiscCategory as any,
      replyCount: 0,
      lastReplyText: 'Created just now',
      participants: [{ name: 'Ananya Sharma', avatarBg: 'bg-emerald-600 text-white', avatarText: 'AS' }],
      replies: [],
    }
    setDiscussions((prev) => [newDisc, ...prev])
    setShowNewDiscussionModal(false)
    setNewDiscTitle('')
    setNewDiscDesc('')
    setSelectedDiscussionId(newDisc.id)
    showToast('Discussion created successfully!')
  }

  // Filtered discussions list
  const filteredDiscussions = useMemo(() => {
    return discussions.filter((d) => {
      const matchesSearch =
        d.title.toLowerCase().includes(discussionSearch.toLowerCase()) ||
        d.snippet.toLowerCase().includes(discussionSearch.toLowerCase()) ||
        d.category.toLowerCase().includes(discussionSearch.toLowerCase()) ||
        d.author.toLowerCase().includes(discussionSearch.toLowerCase())

      const matchesCategory =
        discussionCategoryFilter === 'All' ? true : d.category === discussionCategoryFilter

      const matchesStatus =
        discussionStatusFilter === 'All' ? true : d.status === discussionStatusFilter

      const matchesTab =
        discussionFilterTab === 'all'
          ? true
          : discussionFilterTab === 'my'
          ? d.author.includes('Ananya')
          : discussionFilterTab === 'unanswered'
          ? d.replyCount === 0
          : d.status === 'Resolved'

      return matchesSearch && matchesCategory && matchesStatus && matchesTab
    })
  }, [discussions, discussionSearch, discussionCategoryFilter, discussionStatusFilter, discussionFilterTab])

  // Filtered catalog projects
  const filteredCatalogProjects = useMemo(() => {
    return catalogProjects.filter((proj) => {
      const matchesSearch =
        proj.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        proj.description.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        proj.techStack.some((t) => t.toLowerCase().includes(catalogSearch.toLowerCase()))

      const matchesStatus =
        catalogStatusFilter === 'All' ? true : proj.status === catalogStatusFilter

      return matchesSearch && matchesStatus
    })
  }, [catalogProjects, catalogSearch, catalogStatusFilter])

  // Filtered team members
  const filteredTeamMembers = useMemo(() => {
    return teamMembers.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
        m.email.toLowerCase().includes(teamSearch.toLowerCase()) ||
        m.role.toLowerCase().includes(teamSearch.toLowerCase())

      const matchesRole = teamRoleFilter === 'All' ? true : m.role === teamRoleFilter

      return matchesSearch && matchesRole
    })
  }, [teamMembers, teamSearch, teamRoleFilter])

  // ==========================================
  // VIEW: PROJECT DETAIL VIEW
  // ==========================================
  if (isDetailRoute) {
    return (
      <div className="space-y-6 pb-20">
        {/* Toast feedback */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-blue-200 bg-brand-600 px-4 py-2.5 text-xs font-semibold text-white shadow-pop transition-all animate-bounce">
            <CheckCircle2 size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-ink-muted flex-wrap">
            <button
              type="button"
              onClick={() => {
                setSelectedDiscussionId(null)
                navigate('/build')
              }}
              className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
            >
              <ArrowLeft size={14} />
              Projects
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => {
                setSelectedDiscussionId(null)
                setDetailTab('Overview')
              }}
              className={cn(
                'transition-colors',
                detailTab === 'Overview' && !selectedDiscussionId
                  ? 'font-semibold text-ink'
                  : 'text-ink-muted hover:text-brand-600'
              )}
            >
              Smart Expense Tracker
            </button>
            {detailTab === 'Discussions' && (
              <>
                <span>/</span>
                <button
                  type="button"
                  onClick={() => setSelectedDiscussionId(null)}
                  className={cn(
                    'transition-colors',
                    selectedDiscussionId ? 'text-ink-muted hover:text-brand-600' : 'font-semibold text-ink'
                  )}
                >
                  Discussions
                </button>
              </>
            )}
            {detailTab === 'Discussions' && selectedDiscussionId && (
              <>
                <span>/</span>
                <span className="font-semibold text-ink truncate max-w-[280px]">
                  {discussions.find((d) => d.id === selectedDiscussionId)?.title ||
                    'How should we handle currency conversion?'}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href)
                showToast('Project link copied to clipboard!')
              }}
              className="h-8 text-xs font-semibold"
              leadingIcon={<Share2 size={13} />}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast('Opening Project Settings...')}
              className="h-8 text-xs font-semibold"
              leadingIcon={<Edit3 size={13} />}
            >
              Edit Project
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowUpdateModal(true)}
              className="h-8 text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700"
              leadingIcon={<Plus size={13} />}
            >
              + Add Update
            </Button>
          </div>
        </div>

        {/* If in Discussion Thread View, don't show the big project overview banner and tabs; show thread view directly */}
        {!(detailTab === 'Discussions' && selectedDiscussionId) && (
          <>
            {/* Header Card: Smart Expense Tracker */}
            <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/70 shadow-xs">
                    <Wallet size={28} className="stroke-[2.2]" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h1 className="font-display text-xl sm:text-2xl font-bold text-ink">
                        Smart Expense Tracker
                      </h1>
                      <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-brand-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-pulse" />
                        In Progress
                      </span>
                    </div>

                    <p className="max-w-2xl text-xs sm:text-sm text-ink-muted leading-relaxed">
                      A comprehensive personal finance tracker built with MERN stack featuring budget
                      alerts, expense categorization, and analytical visual reports.
                    </p>

                    {/* Tags */}
                    <div className="pt-1 flex flex-wrap items-center gap-1.5">
                      {['MERN Stack', 'MongoDB', 'Express.js', 'React', 'Node.js', '+2'].map((tag, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            'rounded-md px-2 py-0.5 text-[11px] font-mono font-medium',
                            tag === '+2'
                              ? 'bg-surface-subtle border border-line text-ink-muted'
                              : 'bg-brand-50 text-brand-700 border border-blue-100',
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta details */}
                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={13} className="text-ink-muted" />
                        Created 10 May 2024
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={13} className="text-ink-muted" />
                        Last updated 2 days ago
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Globe size={13} className="text-ink-muted" />
                        Public
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-amber-500">
                        <Star size={13} className="fill-amber-400 text-amber-400" />
                        4.8 (24)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Overall Progress Widget */}
                <div className="flex shrink-0 flex-col items-start lg:items-end justify-center border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-medium text-ink-muted">Overall Progress</span>
                    <span className="font-display text-base font-bold text-brand-600">60%</span>
                  </div>
                  <div className="h-2 w-48 sm:w-56 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-600 transition-all duration-500"
                      style={{ width: '60%' }}
                    />
                  </div>
                  <span className="mt-1 text-[11px] text-ink-muted">3 of 5 Milestones Completed</span>
                </div>
              </div>
            </Card>

            {/* Project Detail Navigation Tabs */}
            <div className="border-b border-line flex items-center gap-1 overflow-x-auto scrollbar-none">
              {[
                { id: 'Overview', label: 'Overview' },
                { id: 'Tasks', label: 'Tasks', count: 12 },
                { id: 'Milestones', label: 'Milestones', count: 5 },
                { id: 'Team', label: 'Team', count: 7 },
                { id: 'Files', label: 'Files' },
                { id: 'Updates', label: 'Updates', count: updates.length },
                { id: 'Analytics', label: 'Analytics' },
                { id: 'Discussions', label: 'Discussions', count: 12 },
                { id: 'Settings', label: 'Settings' },
              ].map((tab) => {
                const active = detailTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setDetailTab(tab.id as any)
                      if (tab.id !== 'Discussions') setSelectedDiscussionId(null)
                    }}
                    className={cn(
                      'inline-flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all',
                      active
                        ? 'border-brand-600 text-brand-600'
                        : 'border-transparent text-ink-muted hover:border-slate-300 hover:text-ink',
                    )}
                  >
                    {tab.label}
                    {tab.count !== undefined && (
                      <span
                        className={cn(
                          'rounded-full px-1.5 py-0.2 text-[10px] font-bold',
                          active
                            ? 'bg-brand-100 text-brand-700'
                            : 'bg-surface-subtle text-ink-muted border border-line',
                        )}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* TAB 1: OVERVIEW TAB (IMAGE 2) */}
        {detailTab === 'Overview' && (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            {/* Left / Main Column */}
            <div className="min-w-0 space-y-6">
              {/* About This Project */}
              <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card space-y-5">
                <div>
                  <h3 className="font-display text-base font-bold text-ink">About This Project</h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Smart Expense Tracker is an enterprise-grade personal finance application
                    designed for young professionals and university students. It empowers users to
                    take full control of their budgeting by categorizing debit and credit entries,
                    detecting recurring subscription charges, predicting end-of-month runway, and
                    providing automated monthly statements.
                  </p>
                </div>

                {/* 4 Feature Cards */}
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-surface-subtle p-4 hover:border-blue-300 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-brand-600 mb-2.5">
                      <PlusCircle size={18} />
                    </div>
                    <h4 className="font-display text-xs font-bold text-ink">
                      Add &amp; Track Expenses
                    </h4>
                    <p className="mt-1 text-[11px] text-ink-muted leading-relaxed">
                      Log daily expenses with custom categories, tags, receipts, and payment method
                      tags with instant transaction indexing.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-surface-subtle p-4 hover:border-blue-300 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 mb-2.5">
                      <Wallet size={18} />
                    </div>
                    <h4 className="font-display text-xs font-bold text-ink">Budget Management</h4>
                    <p className="mt-1 text-[11px] text-ink-muted leading-relaxed">
                      Set monthly category budgets with real-time threshold notifications, spending
                      caps, and automatic overspend alerts.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-surface-subtle p-4 hover:border-blue-300 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 mb-2.5">
                      <BarChart3 size={18} />
                    </div>
                    <h4 className="font-display text-xs font-bold text-ink">
                      Analytics Dashboard
                    </h4>
                    <p className="mt-1 text-[11px] text-ink-muted leading-relaxed">
                      Interactive charts showing spend breakdown, trends over time, predictive
                      savings calculations, and category heatmaps.
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-surface-subtle p-4 hover:border-blue-300 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 mb-2.5">
                      <ShieldCheck size={18} />
                    </div>
                    <h4 className="font-display text-xs font-bold text-ink">Secure &amp; Private</h4>
                    <p className="mt-1 text-[11px] text-ink-muted leading-relaxed">
                      JWT token-based authentication, bcrypt password hashing, and encrypted
                      sensitive data storage with TLS transmission.
                    </p>
                  </div>
                </div>

                {/* Screenshot Gallery Mockup */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-xs font-bold text-ink">
                      Interactive Screenshot Gallery
                    </h4>
                    <div className="flex items-center gap-1 rounded-lg border border-line bg-surface-subtle p-0.5">
                      {[
                        { id: 'dashboard', label: 'Dashboard' },
                        { id: 'analytics', label: 'Analytics' },
                        { id: 'budgets', label: 'Budgets' },
                        { id: 'transactions', label: 'Transactions' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setScreenshotView(item.id as any)}
                          className={cn(
                            'rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors',
                            screenshotView === item.id
                              ? 'bg-brand-600 text-white shadow-xs'
                              : 'text-ink-muted hover:text-ink',
                          )}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Window Browser Mockup Frame */}
                  <div className="overflow-hidden rounded-xl border border-line bg-slate-900 text-white shadow-sm">
                    {/* Top window controls */}
                    <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1 text-[11px] text-slate-400 font-mono">
                        <Lock size={10} className="text-emerald-400" />
                        smart-expense.learnlytica.dev/{screenshotView}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <RefreshCw size={12} />
                      </div>
                    </div>

                    {/* Mock Content */}
                    <div className="p-5 bg-gradient-to-b from-slate-900 to-slate-950 min-h-[220px]">
                      {screenshotView === 'dashboard' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-lg bg-slate-800/80 border border-slate-700/60 p-3">
                              <span className="text-[10px] text-slate-400">Total Balance</span>
                              <div className="text-base font-bold text-white mt-0.5">$4,850.00</div>
                              <span className="text-[10px] text-emerald-400 font-semibold">+12% vs last month</span>
                            </div>
                            <div className="rounded-lg bg-slate-800/80 border border-slate-700/60 p-3">
                              <span className="text-[10px] text-slate-400">Monthly Spending</span>
                              <div className="text-base font-bold text-white mt-0.5">$1,620.40</div>
                              <span className="text-[10px] text-amber-400 font-semibold">68% of budget</span>
                            </div>
                            <div className="rounded-lg bg-slate-800/80 border border-slate-700/60 p-3">
                              <span className="text-[10px] text-slate-400">Savings Target</span>
                              <div className="text-base font-bold text-white mt-0.5">$850.00</div>
                              <span className="text-[10px] text-brand-400 font-semibold">On track to hit goal</span>
                            </div>
                          </div>

                          <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500/20 text-brand-400 text-xs">
                                🛒
                              </span>
                              <div>
                                <p className="text-xs font-semibold text-white">Whole Foods Market</p>
                                <p className="text-[10px] text-slate-400">Groceries · Card ending in 4219</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-red-400">-$84.50</span>
                          </div>
                        </div>
                      )}

                      {screenshotView === 'analytics' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-300">Category Breakdown</span>
                            <span className="text-slate-400 text-[11px]">May 2024</span>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-slate-300">Housing &amp; Utilities</span>
                                <span className="text-slate-400 font-mono">42% ($840)</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-500 rounded-full" style={{ width: '42%' }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-slate-300">Food &amp; Dining</span>
                                <span className="text-slate-400 font-mono">28% ($560)</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '28%' }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-slate-300">Tech &amp; Subscriptions</span>
                                <span className="text-slate-400 font-mono">18% ($360)</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: '18%' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {screenshotView === 'budgets' && (
                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between items-center text-slate-300">
                            <span className="font-semibold">Active Monthly Budgets</span>
                            <span className="text-[11px] text-emerald-400 font-medium">Safe spending velocity</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-lg bg-slate-800/80 p-3 border border-slate-700/60">
                              <span className="text-slate-400 text-[10px]">Dining Out</span>
                              <div className="text-sm font-bold text-white mt-0.5">$280 / $400</div>
                              <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400 rounded-full" style={{ width: '70%' }} />
                              </div>
                            </div>
                            <div className="rounded-lg bg-slate-800/80 p-3 border border-slate-700/60">
                              <span className="text-slate-400 text-[10px]">Entertainment</span>
                              <div className="text-sm font-bold text-white mt-0.5">$110 / $200</div>
                              <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-400 rounded-full" style={{ width: '55%' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {screenshotView === 'transactions' && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-slate-300 text-xs mb-1">
                            <span className="font-semibold">Recent Ledger Entries</span>
                            <span className="text-[11px] text-brand-400">Export CSV</span>
                          </div>
                          {[
                            { name: 'Uber Ride', cat: 'Transport', amt: '-$18.20', date: 'Today' },
                            { name: 'Salary Direct Deposit', cat: 'Income', amt: '+$2,400.00', date: 'Yesterday' },
                            { name: 'Amazon Web Services', cat: 'Cloud Infra', amt: '-$24.80', date: '2 days ago' },
                          ].map((tx, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs rounded-md bg-slate-800/40 p-2 border border-slate-700/40"
                            >
                              <div>
                                <p className="font-semibold text-white">{tx.name}</p>
                                <p className="text-[10px] text-slate-400">{tx.cat} · {tx.date}</p>
                              </div>
                              <span className={cn('font-mono font-bold', tx.amt.startsWith('+') ? 'text-emerald-400' : 'text-slate-200')}>
                                {tx.amt}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Milestones List */}
              <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      Project Milestones &amp; Roadmap
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Track core deliverables, module development, and release readiness.
                    </p>
                  </div>
                  <Badge tone="brand">3/5 Active</Badge>
                </div>

                <div className="space-y-3 divide-y divide-slate-100">
                  {milestones.map((m, idx) => (
                    <div key={m.id} className={cn('pt-3 first:pt-0 flex items-start gap-3.5')}>
                      <div className="mt-0.5">
                        {m.status === 'Completed' ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <Check size={14} className="stroke-[2.5]" />
                          </span>
                        ) : m.status === 'In Progress' ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                            <Clock size={14} className="animate-spin" />
                          </span>
                        ) : (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <span className="h-2 w-2 rounded-full bg-slate-400" />
                          </span>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-display text-xs sm:text-sm font-bold text-ink">
                              {idx + 1}. {m.title}
                            </h4>
                            <Badge
                              tone={
                                m.status === 'Completed'
                                  ? 'green'
                                  : m.status === 'In Progress'
                                    ? 'brand'
                                    : 'neutral'
                              }
                            >
                              {m.status}
                            </Badge>
                          </div>
                          {m.dueDate && (
                            <span className="text-[11px] text-ink-muted">Due {m.dueDate}</span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Updates */}
              <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={18} className="text-brand-600" />
                    <h3 className="font-display text-base font-bold text-ink">
                      Recent Updates
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(true)}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    + Post Update
                  </button>
                </div>

                <div className="space-y-4">
                  {updates.map((up) => (
                    <div
                      key={up.id}
                      className="rounded-xl border border-line bg-surface-subtle p-4 hover:border-blue-200 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              'flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold',
                              up.avatarBg,
                            )}
                          >
                            {up.avatarText}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-ink">{up.author}</span>
                            <span className="text-[11px] text-ink-muted ml-1.5">({up.role})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {up.tag && (
                            <span className="rounded bg-brand-50 border border-blue-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                              {up.tag}
                            </span>
                          )}
                          <span className="text-[11px] text-ink-muted">{up.time}</span>
                        </div>
                      </div>

                      <p className="text-xs text-ink leading-relaxed pl-9">
                        {up.content}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Rail (Overview Tab) */}
            <aside className="space-y-6">
              {/* Project Links */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-4">
                <h3 className="font-display text-sm font-bold text-ink">Project Links</h3>
                <div className="space-y-2.5">
                  <a
                    href="https://smart-expense.learnlytica.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-line p-3 hover:border-brand-400 hover:bg-brand-50/40 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
                        <Globe size={16} />
                      </span>
                      <div>
                        <div className="text-xs font-bold text-ink group-hover:text-brand-600 transition-colors">
                          Live Demo
                        </div>
                        <div className="text-[10px] text-ink-muted">smart-expense.learnlytica.dev</div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-ink-muted group-hover:text-brand-600" />
                  </a>

                  <a
                    href="https://github.com/learnlytica/smart-expense-tracker"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-line p-3 hover:border-brand-400 hover:bg-brand-50/40 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-800">
                        <Github size={16} />
                      </span>
                      <div>
                        <div className="text-xs font-bold text-ink group-hover:text-brand-600 transition-colors">
                          GitHub Repo
                        </div>
                        <div className="text-[10px] text-ink-muted">github.com/learnlytica/smart-expense</div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-ink-muted group-hover:text-brand-600" />
                  </a>

                  <a
                    href="#docs"
                    onClick={(e) => {
                      e.preventDefault()
                      showToast('Opening Architecture Docs...')
                    }}
                    className="flex items-center justify-between rounded-xl border border-line p-3 hover:border-brand-400 hover:bg-brand-50/40 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-brand-600 border border-blue-200">
                        <FileText size={16} />
                      </span>
                      <div>
                        <div className="text-xs font-bold text-ink group-hover:text-brand-600 transition-colors">
                          Documentation
                        </div>
                        <div className="text-[10px] text-ink-muted">Notion / API Documentation</div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-ink-muted group-hover:text-brand-600" />
                  </a>

                  <a
                    href="#figma"
                    onClick={(e) => {
                      e.preventDefault()
                      showToast('Opening Figma UI prototype...')
                    }}
                    className="flex items-center justify-between rounded-xl border border-line p-3 hover:border-brand-400 hover:bg-brand-50/40 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 border border-purple-200">
                        <Layers size={16} />
                      </span>
                      <div>
                        <div className="text-xs font-bold text-ink group-hover:text-brand-600 transition-colors">
                          Figma Design
                        </div>
                        <div className="text-[10px] text-ink-muted">Figma Component Library</div>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-ink-muted group-hover:text-brand-600" />
                  </a>
                </div>
              </Card>

              {/* Project Details */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                <h3 className="font-display text-sm font-bold text-ink">Project Details</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-ink-muted">Architecture</span>
                    <span className="font-semibold text-ink">Full Stack (MERN)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-ink-muted">Domain</span>
                    <span className="font-semibold text-ink">FinTech</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-ink-muted">Complexity</span>
                    <span className="rounded bg-amber-50 px-2 py-0.5 font-semibold text-amber-700 border border-amber-200">
                      Medium
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-ink-muted">Status</span>
                    <span className="font-semibold text-brand-600">In Progress</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-ink-muted">License</span>
                    <span className="font-mono text-ink">MIT License</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-muted">Created By</span>
                    <span className="font-semibold text-ink">Sachin Diwakar</span>
                  </div>
                </div>
              </Card>

              {/* Team Members Avatar Preview */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-ink">Team Members</h3>
                  <button
                    type="button"
                    onClick={() => setDetailTab('Team')}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    View All (7) →
                  </button>
                </div>

                <div className="space-y-3">
                  {teamMembers.slice(0, 4).map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                            member.avatarBg,
                          )}
                        >
                          {member.avatarText}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-ink">{member.name}</div>
                          <div className="text-[11px] text-ink-muted">{member.role}</div>
                        </div>
                      </div>
                      <Badge tone={member.access === 'Full Access' ? 'purple' : 'brand'}>
                        {member.access}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDetailTab('Team')}
                  className="w-full text-xs font-semibold"
                >
                  Manage Project Team
                </Button>
              </Card>
            </aside>
          </div>
        )}

        {/* TAB 2: TEAM TAB (IMAGE 1) */}
        {detailTab === 'Team' && (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            {/* Left Column: Team Table & Controls */}
            <div className="min-w-0 space-y-6">
              <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card space-y-5">
                {/* Header Row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">Project Team</h3>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Manage project contributors, role permissions, and collaboration invites.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowInviteModal(true)}
                    className="bg-brand-600 text-white hover:bg-brand-700 text-xs font-semibold self-start sm:self-auto"
                    leadingIcon={<UserPlus size={14} />}
                  >
                    + Invite Member
                  </Button>
                </div>

                {/* Search & Role Filter */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1">
                    <Search
                      size={14}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                    />
                    <input
                      type="search"
                      value={teamSearch}
                      onChange={(e) => setTeamSearch(e.target.value)}
                      placeholder="Search members by name, email, or role..."
                      className="h-9 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-xs text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ink-muted font-medium">Role:</span>
                    <select
                      value={teamRoleFilter}
                      onChange={(e) => setTeamRoleFilter(e.target.value)}
                      className="h-9 rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                    >
                      <option value="All">All Roles</option>
                      <option value="Project Owner">Project Owner</option>
                      <option value="Frontend Dev">Frontend Dev</option>
                      <option value="Backend Dev">Backend Dev</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="QA">QA</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Technical Writer">Technical Writer</option>
                    </select>
                  </div>
                </div>

                {/* Team Members Table */}
                <div className="overflow-x-auto rounded-xl border border-line">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-line bg-surface-subtle font-semibold text-ink-muted">
                        <th className="px-4 py-3">Member</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Access Level</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Activity</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {filteredTeamMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-brand-50/20 transition-colors">
                          {/* Member name & email */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <span
                                className={cn(
                                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                                  member.avatarBg,
                                )}
                              >
                                {member.avatarText}
                              </span>
                              <div>
                                <div className="font-bold text-ink">{member.name}</div>
                                <div className="text-[11px] text-ink-muted">{member.email}</div>
                              </div>
                            </div>
                          </td>

                          {/* Role */}
                          <td className="px-4 py-3">
                            <span className="font-semibold text-ink">{member.role}</span>
                          </td>

                          {/* Access Level */}
                          <td className="px-4 py-3">
                            <Badge
                              tone={
                                member.access === 'Full Access'
                                  ? 'purple'
                                  : member.access === 'Can Edit'
                                    ? 'brand'
                                    : 'neutral'
                              }
                            >
                              {member.access}
                            </Badge>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1.5 font-medium text-[11px]">
                              <span
                                className={cn(
                                  'h-2 w-2 rounded-full',
                                  member.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400',
                                )}
                              />
                              {member.status}
                            </span>
                          </td>

                          {/* Activity */}
                          <td className="px-4 py-3 font-mono text-[11px] text-ink-muted">
                            {member.activity}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => showToast(`Opening permissions for ${member.name}...`)}
                              className="rounded-lg p-1.5 text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors"
                              title="Member Options"
                            >
                              <MoreVertical size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Right Rail (Team Tab) */}
            <aside className="space-y-6">
              {/* Team Summary */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-4">
                <h3 className="font-display text-sm font-bold text-ink">Team Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-line bg-surface-subtle p-3 text-center">
                    <div className="font-display text-xl font-bold text-ink">7</div>
                    <div className="text-[11px] font-medium text-ink-muted mt-0.5">Total Members</div>
                  </div>
                  <div className="rounded-xl border border-line bg-surface-subtle p-3 text-center">
                    <div className="font-display text-xl font-bold text-emerald-600">5</div>
                    <div className="text-[11px] font-medium text-ink-muted mt-0.5">Online Now</div>
                  </div>
                  <div className="rounded-xl border border-line bg-surface-subtle p-3 text-center">
                    <div className="font-display text-xl font-bold text-brand-600">2</div>
                    <div className="text-[11px] font-medium text-ink-muted mt-0.5">Full Access</div>
                  </div>
                  <div className="rounded-xl border border-line bg-surface-subtle p-3 text-center">
                    <div className="font-display text-xl font-bold text-amber-600">1</div>
                    <div className="text-[11px] font-medium text-ink-muted mt-0.5">Pending Invite</div>
                  </div>
                </div>
              </Card>

              {/* Role Distribution Donut Chart */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-4">
                <h3 className="font-display text-sm font-bold text-ink">Role Distribution</h3>

                {/* SVG Donut Chart */}
                <div className="flex flex-col items-center justify-center pt-2">
                  <div className="relative flex items-center justify-center">
                    <svg width="140" height="140" viewBox="0 0 100 100" className="rotate-[-90deg]">
                      {/* Circle 1: Frontend (28.6%) - Blue */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#1747ff"
                        strokeWidth="14"
                        strokeDasharray="68.2 238.7"
                        strokeDashoffset="0"
                      />
                      {/* Circle 2: Backend (28.6%) - Purple */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#7655f5"
                        strokeWidth="14"
                        strokeDasharray="68.2 238.7"
                        strokeDashoffset="-68.2"
                      />
                      {/* Circle 3: UI/UX (14.3%) - Orange */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#f28a24"
                        strokeWidth="14"
                        strokeDasharray="34.1 238.7"
                        strokeDashoffset="-136.4"
                      />
                      {/* Circle 4: QA (14.3%) - Emerald */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#20a86b"
                        strokeWidth="14"
                        strokeDasharray="34.1 238.7"
                        strokeDashoffset="-170.5"
                      />
                      {/* Circle 5: DevOps & Docs (14.2%) - Cyan */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#159bb3"
                        strokeWidth="14"
                        strokeDasharray="34.1 238.7"
                        strokeDashoffset="-204.6"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-xl font-bold text-ink">7</span>
                      <span className="text-[10px] text-ink-muted">Members</span>
                    </div>
                  </div>

                  {/* Donut Legend */}
                  <div className="mt-4 w-full space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-ink-muted">
                        <span className="h-2 w-2 rounded-full bg-[#1747ff]" />
                        Frontend (28.6%)
                      </span>
                      <span className="font-bold text-ink">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-ink-muted">
                        <span className="h-2 w-2 rounded-full bg-[#7655f5]" />
                        Backend (28.6%)
                      </span>
                      <span className="font-bold text-ink">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-ink-muted">
                        <span className="h-2 w-2 rounded-full bg-[#f28a24]" />
                        UI/UX (14.3%)
                      </span>
                      <span className="font-bold text-ink">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-ink-muted">
                        <span className="h-2 w-2 rounded-full bg-[#20a86b]" />
                        QA (14.3%)
                      </span>
                      <span className="font-bold text-ink">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-ink-muted">
                        <span className="h-2 w-2 rounded-full bg-[#159bb3]" />
                        DevOps &amp; Docs (14.2%)
                      </span>
                      <span className="font-bold text-ink">2</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Pending Invites */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-ink">Pending Invites</h3>
                  <Badge tone="orange">{pendingInvites.length}</Badge>
                </div>

                {pendingInvites.map((inv) => (
                  <div
                    key={inv.id}
                    className="rounded-xl border border-line bg-surface-subtle p-3.5 space-y-2.5"
                  >
                    <div>
                      <div className="text-xs font-bold text-ink">{inv.name}</div>
                      <div className="text-[11px] text-ink-muted">{inv.email}</div>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-ink-muted">
                        <span className="font-semibold text-brand-600">{inv.role}</span>
                        <span>•</span>
                        <span>Sent {inv.sentAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => showToast(`Resent invitation to ${inv.email}`)}
                        className="h-7 text-[11px] flex-1"
                      >
                        Resend
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setPendingInvites([])
                          showToast('Invitation revoked.')
                        }}
                        className="h-7 text-[11px] text-red-600 hover:bg-red-50 hover:border-red-200"
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </Card>

              {/* Quick Actions */}
              <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
                <h3 className="font-display text-sm font-bold text-ink">Quick Actions</h3>
                <div className="space-y-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText('https://learnlytica.dev/invite/smart-expense-team')
                      showToast('Invite link copied to clipboard!')
                    }}
                    className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Copy size={14} className="text-ink-muted" />
                      Copy Invite Link
                    </span>
                    <ChevronRight size={14} className="text-ink-muted" />
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast('Exporting team roster as CSV...')}
                    className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FileSpreadsheet size={14} className="text-ink-muted" />
                      Export Team Roster (CSV)
                    </span>
                    <Download size={14} className="text-ink-muted" />
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast('Managing RBAC role permissions...')}
                    className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-ink-muted" />
                      Manage Permissions
                    </span>
                    <ChevronRight size={14} className="text-ink-muted" />
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast('Opening Project Slack channel #proj-smart-expense...')}
                    className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare size={14} className="text-ink-muted" />
                      Team Slack Channel
                    </span>
                    <ExternalLink size={14} className="text-ink-muted" />
                  </button>
                </div>
              </Card>
            </aside>
          </div>
        )}

        {/* TAB 3: DISCUSSIONS TAB */}
        {detailTab === 'Discussions' && (
          <>
            {selectedDiscussionId ? (
              /* VIEW A: DISCUSSION THREAD VIEW (IMAGE 1) */
              <div className="space-y-6">
                {/* Back to Discussions Link */}
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedDiscussionId(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Back to Discussions
                  </button>
                </div>

                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                  {/* Left Column: Thread & Replies */}
                  <div className="min-w-0 space-y-5">
                    {/* Main Question Card */}
                    {(() => {
                      const currentDisc =
                        discussions.find((d) => d.id === selectedDiscussionId) || discussions[0]
                      return (
                        <Card className="rounded-2xl border border-line bg-surface p-6 shadow-card space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3.5">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-bold border border-purple-200 shadow-xs">
                                <HelpCircle size={22} />
                              </div>
                              <div>
                                <h2 className="font-display text-lg sm:text-xl font-bold text-ink leading-snug">
                                  {currentDisc.title}
                                </h2>
                                <p className="mt-1 text-xs text-ink-muted">
                                  Asked by <strong className="font-semibold text-brand-600">{currentDisc.author}</strong> • {currentDisc.createdAt} • in <span className="font-semibold text-indigo-600">{currentDisc.category}</span>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setIsWatchingDiscussion(!isWatchingDiscussion)
                                  showToast(isWatchingDiscussion ? 'Unwatched discussion.' : 'Watching discussion for new replies!')
                                }}
                                className={cn(
                                  'h-8 text-xs font-medium rounded-xl',
                                  isWatchingDiscussion && 'bg-brand-50 text-brand-700 border-brand-200'
                                )}
                                leadingIcon={<Eye size={13} />}
                              >
                                {isWatchingDiscussion ? 'Watching' : 'Watch'}
                              </Button>
                              <button
                                type="button"
                                onClick={() => showToast('Discussion options')}
                                className="flex h-8 w-8 items-center justify-center rounded-xl border border-line text-ink-muted hover:bg-surface-subtle hover:text-ink"
                              >
                                <MoreHorizontal size={15} />
                              </button>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <span className="rounded-md bg-blue-50 text-blue-700 px-2.5 py-0.5 text-xs font-semibold border border-blue-100">
                              {currentDisc.badgeType}
                            </span>
                            {currentDisc.priority && (
                              <span className="rounded-md bg-rose-50 text-rose-700 px-2.5 py-0.5 text-xs font-semibold border border-rose-100">
                                {currentDisc.priority} Priority
                              </span>
                            )}
                            <span className="rounded-md bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-semibold border border-emerald-100">
                              {currentDisc.status}
                            </span>
                          </div>

                          {/* Body text */}
                          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                            {currentDisc.snippet}
                          </p>

                          {/* Footer details */}
                          <div className="flex items-center justify-between border-t border-line/60 pt-3 text-xs text-ink-muted">
                            <div className="flex items-center gap-3">
                              {/* Participant Avatars */}
                              <div className="flex -space-x-1.5 overflow-hidden">
                                {currentDisc.participants.slice(0, 3).map((p, idx) => (
                                  <span
                                    key={idx}
                                    title={p.name}
                                    className={cn(
                                      'inline-flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold ring-2 ring-surface shadow-xs',
                                      p.avatarBg
                                    )}
                                  >
                                    {p.avatarText}
                                  </span>
                                ))}
                                {currentDisc.participants.length > 3 && (
                                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-600 ring-2 ring-surface">
                                    +{currentDisc.participants.length - 3}
                                  </span>
                                )}
                              </div>
                              <span className="font-medium text-slate-700">
                                {(currentDisc.replies?.length || currentDisc.replyCount)} replies
                              </span>
                            </div>
                            <span>{currentDisc.lastReplyText}</span>
                          </div>
                        </Card>
                      )
                    })()}

                    {/* Replies Subheader & Filter Tabs */}
                    <div className="flex items-center justify-between border-b border-line pb-2">
                      <div className="flex items-center gap-4 text-xs font-semibold">
                        <button
                          type="button"
                          className="border-b-2 border-brand-600 pb-2 text-brand-600 font-bold"
                        >
                          All Replies ({discussions.find((d) => d.id === selectedDiscussionId)?.replies?.length || 8})
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast('Showing suggestions filter')}
                          className="pb-2 text-ink-muted hover:text-ink transition-colors"
                        >
                          Suggestions (2)
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast('No unanswered replies')}
                          className="pb-2 text-ink-muted hover:text-ink transition-colors"
                        >
                          Unanswered (0)
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast('No resolved threads')}
                          className="pb-2 text-ink-muted hover:text-ink transition-colors"
                        >
                          Resolved (0)
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                        <span>Sort by:</span>
                        <select className="bg-transparent font-medium text-ink focus:outline-none cursor-pointer">
                          <option>Oldest First</option>
                          <option>Newest First</option>
                          <option>Most Upvoted</option>
                        </select>
                      </div>
                    </div>

                    {/* Replies List */}
                    <div className="space-y-3.5">
                      {(discussions.find((d) => d.id === selectedDiscussionId)?.replies || []).map((reply) => (
                        <Card
                          key={reply.id}
                          className="rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-xs space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <span
                                className={cn(
                                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-xs',
                                  reply.avatarBg
                                )}
                              >
                                {reply.avatarText}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs sm:text-sm font-bold text-ink">
                                    {reply.author}
                                  </span>
                                  {reply.isOwner && (
                                    <span className="rounded bg-indigo-50 text-indigo-700 px-1.5 py-0.2 text-[10px] font-bold border border-indigo-200">
                                      Owner
                                    </span>
                                  )}
                                  {reply.isSuggestion && (
                                    <span className="rounded bg-emerald-50 text-emerald-700 px-1.5 py-0.2 text-[10px] font-bold border border-emerald-200">
                                      Suggestion
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-ink-muted">{reply.time}</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => showToast('Reply options')}
                              className="text-ink-muted hover:text-ink"
                            >
                              <MoreHorizontal size={15} />
                            </button>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-11">
                            {reply.content}
                          </p>

                          <div className="flex items-center gap-4 pl-11 pt-1 text-xs">
                            <button
                              type="button"
                              onClick={() => handleToggleLikeReply(reply.id)}
                              className={cn(
                                'inline-flex items-center gap-1 font-medium transition-colors',
                                reply.hasLiked ? 'text-brand-600 font-bold' : 'text-ink-muted hover:text-brand-600'
                              )}
                            >
                              <ThumbsUp size={13} className={reply.hasLiked ? 'fill-brand-600' : ''} />
                              <span>Like</span>
                              <span>•</span>
                              <span>{reply.likes}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setNewReplyText(`@${reply.author} `)
                              }}
                              className="font-medium text-ink-muted hover:text-ink transition-colors"
                            >
                              Reply
                            </button>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Reply Composer Box */}
                    <Card className="rounded-2xl border border-line bg-surface p-4 shadow-card space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
                          AS
                        </span>
                        <div className="flex-1">
                          <textarea
                            rows={3}
                            value={newReplyText}
                            onChange={(e) => setNewReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full resize-none rounded-xl border border-line bg-surface-subtle p-3 text-xs text-ink placeholder:text-ink-muted focus:border-brand-500 focus:bg-surface focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-line/60 pt-3">
                        <div className="flex items-center gap-2 pl-12 text-ink-muted">
                          <button
                            type="button"
                            onClick={() => showToast('Attach file (PDF, CSV, image)')}
                            className="p-1 hover:text-ink transition-colors"
                            title="Attach File"
                          >
                            <Paperclip size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewReplyText((prev) => prev + '@')}
                            className="p-1 hover:text-ink transition-colors"
                            title="Mention Teammate"
                          >
                            <AtSign size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewReplyText((prev) => prev + ' 👍 ')}
                            className="p-1 hover:text-ink transition-colors"
                            title="Emoji"
                          >
                            <Smile size={15} />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 text-xs text-ink-muted cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={isSuggestionReply}
                              onChange={(e) => setIsSuggestionReply(e.target.checked)}
                              className="rounded border-line text-brand-600 focus:ring-brand-500"
                            />
                            <span>Mark as suggestion</span>
                          </label>

                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handlePostReply}
                            className="bg-brand-600 text-white hover:bg-brand-700 text-xs px-4"
                          >
                            Post Reply
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Right Rail: Discussion Details, Participants, Attachments, Related Links, Actions */}
                  <aside className="space-y-6">
                    {/* Discussion Details Card */}
                    <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                      <h3 className="font-display text-sm font-bold text-ink">Discussion Details</h3>
                      <div className="space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-ink-muted">Category</span>
                          <span className="font-semibold text-brand-600">Features</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-ink-muted">Status</span>
                          <span className="rounded bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[11px] font-bold border border-emerald-200">
                            Open
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-ink-muted">Priority</span>
                          <span className="rounded bg-rose-50 text-rose-700 px-2 py-0.5 text-[11px] font-bold border border-rose-200">
                            High
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-ink-muted">Asked by</span>
                          <div className="flex items-center gap-1.5">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[9px] font-bold">
                              AS
                            </span>
                            <span className="font-semibold text-ink">Ananya Sharma</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-ink-muted">Created on</span>
                          <span className="font-medium text-slate-700">20 May 2024, 4:30 PM</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-ink-muted">Last activity</span>
                          <span className="font-medium text-slate-700">2 hours ago</span>
                        </div>
                      </div>
                    </Card>

                    {/* Participants Card */}
                    <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-sm font-bold text-ink">Participants (6)</h3>
                        <button
                          type="button"
                          onClick={() => showToast('Viewing all 6 discussion participants')}
                          className="text-xs font-semibold text-brand-600 hover:underline"
                        >
                          View All
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {[
                          { name: 'Sachin Diwakar', bg: 'bg-indigo-600 text-white', text: 'SD' },
                          { name: 'Rohan Verma', bg: 'bg-blue-600 text-white', text: 'RV' },
                          { name: 'Ananya Sharma', bg: 'bg-emerald-600 text-white', text: 'AS' },
                          { name: 'Vikram Singh', bg: 'bg-orange-600 text-white', text: 'VS' },
                        ].map((p, idx) => (
                          <span
                            key={idx}
                            title={p.name}
                            className={cn(
                              'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-xs ring-2 ring-surface',
                              p.bg
                            )}
                          >
                            {p.text}
                          </span>
                        ))}
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 ring-2 ring-surface">
                          +2
                        </span>
                      </div>
                    </Card>

                    {/* Attachments (3) */}
                    <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-sm font-bold text-ink">Attachments (3)</h3>
                        <button
                          type="button"
                          onClick={() => showToast('Downloading all 3 attachments...')}
                          className="text-xs font-semibold text-brand-600 hover:underline"
                        >
                          Download All
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between rounded-xl border border-line bg-surface-subtle p-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                              CSV
                            </span>
                            <div>
                              <div className="font-semibold text-ink">sample_exchange_rates.csv</div>
                              <div className="text-[10px] text-ink-muted">12 KB • Added by Sachin Diwakar</div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => showToast('Downloading sample_exchange_rates.csv')}
                            className="p-1 text-ink-muted hover:text-brand-600"
                          >
                            <Download size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-line bg-surface-subtle p-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-700 text-[10px] font-bold">
                              PDF
                            </span>
                            <div>
                              <div className="font-semibold text-ink">Currency_Conversion_Approaches.pdf</div>
                              <div className="text-[10px] text-ink-muted">245 KB • Added by Rohan Verma</div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => showToast('Downloading Currency_Conversion_Approaches.pdf')}
                            className="p-1 text-ink-muted hover:text-brand-600"
                          >
                            <Download size={14} />
                          </button>
                        </div>
                      </div>
                    </Card>

                    {/* Related Links */}
                    <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
                      <h3 className="font-display text-sm font-bold text-ink">Related Links</h3>
                      <div className="space-y-2.5 text-xs">
                        <a
                          href="https://www.exchangerate-api.com/docs"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-start justify-between rounded-xl border border-line bg-surface-subtle p-2.5 hover:border-brand-300 transition-colors group"
                        >
                          <div>
                            <div className="font-semibold text-ink group-hover:text-brand-600">
                              ExchangeRate API Documentation
                            </div>
                            <div className="text-[10px] text-brand-600 underline">
                              https://www.exchangerate-api.com/docs
                            </div>
                          </div>
                          <ExternalLink size={13} className="text-ink-muted group-hover:text-brand-600 shrink-0 mt-0.5" />
                        </a>

                        <div
                          onClick={() => showToast('Opening internal documentation wiki...')}
                          className="flex items-start justify-between rounded-xl border border-line bg-surface-subtle p-2.5 hover:border-brand-300 transition-colors cursor-pointer group"
                        >
                          <div>
                            <div className="font-semibold text-ink group-hover:text-brand-600">
                              Currency Conversion Best Practices
                            </div>
                            <div className="text-[10px] text-ink-muted">Internal Wiki • Updated on 10 Apr 2024</div>
                          </div>
                          <ExternalLink size={13} className="text-ink-muted group-hover:text-brand-600 shrink-0 mt-0.5" />
                        </div>

                        <div
                          onClick={() => {
                            setSelectedDiscussionId('disc-2')
                            showToast('Switched to discussion: Budget alerts')
                          }}
                          className="flex items-start justify-between rounded-xl border border-line bg-surface-subtle p-2.5 hover:border-brand-300 transition-colors cursor-pointer group"
                        >
                          <div>
                            <div className="font-semibold text-ink group-hover:text-brand-600">
                              Previous Discussion: Budget alerts
                            </div>
                            <div className="text-[10px] text-brand-600">View Discussion</div>
                          </div>
                          <ExternalLink size={13} className="text-ink-muted group-hover:text-brand-600 shrink-0 mt-0.5" />
                        </div>
                      </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
                      <h3 className="font-display text-sm font-bold text-ink">Quick Actions</h3>
                      <div className="space-y-1.5 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setDiscussions((prev) =>
                              prev.map((d) =>
                                d.id === selectedDiscussionId ? { ...d, status: 'Resolved' } : d
                              )
                            )
                            showToast('Discussion marked as Resolved!')
                          }}
                          className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-emerald-600 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-600" />
                            Mark as Resolved
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => showToast('Editing discussion post...')}
                          className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Edit2 size={14} className="text-ink-muted" />
                            Edit Discussion
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => showToast('Move category dialog opened')}
                          className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-ink hover:bg-surface-subtle hover:text-brand-600 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Folder size={14} className="text-ink-muted" />
                            Move to Another Category
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDiscussionId(null)
                            showToast('Discussion archived.')
                          }}
                          className="w-full flex items-center justify-between rounded-lg p-2.5 text-left font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Trash2 size={14} />
                            Delete Discussion
                          </span>
                        </button>
                      </div>
                    </Card>
                  </aside>
                </div>
              </div>
            ) : (
              /* VIEW B: DISCUSSIONS LIST VIEW (IMAGE 5) */
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                {/* Left / Main Column */}
                <div className="min-w-0 space-y-6">
                  {/* Discussions Header & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">Project Discussions</h3>
                      <p className="text-xs text-ink-muted mt-0.5">
                        Ask questions, share ideas and collaborate with your team.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                        <input
                          type="text"
                          value={discussionSearch}
                          onChange={(e) => setDiscussionSearch(e.target.value)}
                          placeholder="Search discussions..."
                          className="h-9 w-48 sm:w-60 rounded-xl border border-line bg-surface pl-9 pr-3 text-xs text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none"
                        />
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setShowNewDiscussionModal(true)}
                        className="bg-brand-600 text-white hover:bg-brand-700 text-xs font-semibold h-9"
                        leadingIcon={<Plus size={13} />}
                      >
                        + New Discussion
                      </Button>
                    </div>
                  </div>

                  {/* Subtabs: All Discussions (12), My Questions (3), Unanswered (2), Resolved (7) */}
                  <div className="flex items-center gap-6 border-b border-line text-xs font-semibold">
                    {[
                      { id: 'all', label: 'All Discussions', count: 12 },
                      { id: 'my', label: 'My Questions', count: 3 },
                      { id: 'unanswered', label: 'Unanswered', count: 2 },
                      { id: 'resolved', label: 'Resolved', count: 7 },
                    ].map((tab) => {
                      const active = discussionFilterTab === tab.id
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setDiscussionFilterTab(tab.id as any)}
                          className={cn(
                            'pb-3 transition-colors flex items-center gap-1.5',
                            active
                              ? 'border-b-2 border-brand-600 text-brand-600 font-bold'
                              : 'text-ink-muted hover:text-ink'
                          )}
                        >
                          {tab.label}
                          <span className={cn('text-[11px] font-normal', active ? 'text-brand-600' : 'text-ink-muted')}>
                            {tab.count}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Filter controls row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-1.5">
                        <span className="text-ink-muted">Category:</span>
                        <select
                          value={discussionCategoryFilter}
                          onChange={(e) => setDiscussionCategoryFilter(e.target.value)}
                          className="bg-transparent font-medium text-ink focus:outline-none cursor-pointer"
                        >
                          <option value="All">All</option>
                          <option value="Features">Features</option>
                          <option value="Enhancements">Enhancements</option>
                          <option value="Bugs">Bugs</option>
                          <option value="Architecture">Architecture</option>
                          <option value="Updates">Updates</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-1.5">
                        <span className="text-ink-muted">Status:</span>
                        <select
                          value={discussionStatusFilter}
                          onChange={(e) => setDiscussionStatusFilter(e.target.value)}
                          className="bg-transparent font-medium text-ink focus:outline-none cursor-pointer"
                        >
                          <option value="All">All</option>
                          <option value="Open">Open</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-1.5">
                        <span className="text-ink-muted">Sort by:</span>
                        <select className="bg-transparent font-medium text-ink focus:outline-none cursor-pointer">
                          <option>Latest Activity</option>
                          <option>Most Upvoted</option>
                          <option>Most Replies</option>
                          <option>Newest Created</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 rounded-xl border border-line bg-surface p-1">
                      <button
                        type="button"
                        className="rounded-lg bg-brand-50 p-1.5 text-brand-600 shadow-2xs"
                        title="List View"
                      >
                        <List size={14} />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-ink-muted hover:text-ink"
                        title="Grid View"
                      >
                        <Grid size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Discussions List */}
                  <div className="space-y-3">
                    {filteredDiscussions.map((disc) => {
                      const iconComponent =
                        disc.badgeType === 'Question' ? (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-bold border border-purple-200">
                            <HelpCircle size={20} />
                          </div>
                        ) : disc.badgeType === 'Suggestion' ? (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">
                            <Lightbulb size={20} />
                          </div>
                        ) : disc.badgeType === 'Bug' ? (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 font-bold border border-amber-200">
                            <Bug size={20} />
                          </div>
                        ) : disc.category === 'Architecture' ? (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold border border-blue-200">
                            <Code2 size={20} />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">
                            <CheckCircle2 size={20} />
                          </div>
                        )

                      return (
                        <Card
                          key={disc.id}
                          onClick={() => setSelectedDiscussionId(disc.id)}
                          className="rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-card hover:border-brand-300 hover:shadow-pop transition-all cursor-pointer"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3.5 min-w-0">
                              {iconComponent}

                              <div className="space-y-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="font-display text-sm font-bold text-ink hover:text-brand-600 transition-colors truncate">
                                    {disc.title}
                                  </h4>
                                  <span
                                    className={cn(
                                      'rounded px-2 py-0.2 text-[10px] font-bold border',
                                      disc.badgeType === 'Question'
                                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                                        : disc.badgeType === 'Suggestion'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                        : disc.badgeType === 'Bug'
                                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    )}
                                  >
                                    {disc.badgeType}
                                  </span>
                                </div>

                                <p className="text-xs text-ink-muted line-clamp-1">
                                  {disc.snippet}
                                </p>

                                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-ink-muted">
                                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                                    <span
                                      className={cn(
                                        'h-4 w-4 rounded-full flex items-center justify-center text-[8px] font-bold',
                                        disc.authorAvatarBg
                                      )}
                                    >
                                      {disc.authorAvatarText}
                                    </span>
                                    {disc.author}
                                  </span>
                                  <span>•</span>
                                  <span>{disc.createdAt}</span>
                                  <span>•</span>
                                  <span>
                                    in <strong className="font-semibold text-brand-600">{disc.category}</strong>
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Right details */}
                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-line/60">
                              <div className="flex items-center gap-2">
                                <div className="flex -space-x-1.5 overflow-hidden">
                                  {disc.participants.slice(0, 3).map((p, idx) => (
                                    <span
                                      key={idx}
                                      title={p.name}
                                      className={cn(
                                        'inline-flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold ring-1.5 ring-surface shadow-xs',
                                        p.avatarBg
                                      )}
                                    >
                                      {p.avatarText}
                                    </span>
                                  ))}
                                  {disc.participants.length > 3 && (
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[8px] font-bold text-slate-600 ring-1.5 ring-surface">
                                      +{disc.participants.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="text-right text-[11px] text-ink-muted">
                                <div className="font-semibold text-slate-800">{disc.replyCount} replies</div>
                                <div className="text-[10px] text-slate-500">{disc.lastReplyText}</div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Pagination Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-ink-muted">
                    <span>Showing 1 to {filteredDiscussions.length} of 12 discussions</span>
                    <div className="flex items-center gap-1.5 self-center sm:self-auto">
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-line hover:bg-surface-subtle"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white font-bold"
                      >
                        1
                      </button>
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-line hover:bg-surface-subtle"
                      >
                        2
                      </button>
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-line hover:bg-surface-subtle"
                      >
                        3
                      </button>
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-line hover:bg-surface-subtle"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Rail: Start Discussion, Stats, Active Participants, Popular Tags */}
                <aside className="space-y-6">
                  {/* Start a Discussion Card */}
                  <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
                    <h3 className="font-display text-sm font-bold text-ink">Start a Discussion</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Have a question or idea? Start a discussion and get help from your team.
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setShowNewDiscussionModal(true)}
                      className="w-full bg-brand-600 text-white hover:bg-brand-700 text-xs font-semibold"
                      leadingIcon={<Plus size={13} />}
                    >
                      + New Discussion
                    </Button>
                  </Card>

                  {/* Discussion Stats */}
                  <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-bold text-ink">Discussion Stats</h3>
                      <button
                        type="button"
                        onClick={() => showToast('Full discussions telemetry view')}
                        className="text-xs font-semibold text-brand-600 hover:underline"
                      >
                        View All Stats →
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="rounded-xl border border-line bg-surface-subtle p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-blue-600">
                          <MessageSquare size={14} />
                          <span className="text-[11px] font-medium text-ink-muted">Total Discussions</span>
                        </div>
                        <div className="font-display text-lg font-bold text-ink">12</div>
                      </div>

                      <div className="rounded-xl border border-line bg-surface-subtle p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-600">
                          <Lightbulb size={14} />
                          <span className="text-[11px] font-medium text-ink-muted">Questions</span>
                        </div>
                        <div className="font-display text-lg font-bold text-ink">7</div>
                      </div>

                      <div className="rounded-xl border border-line bg-surface-subtle p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-orange-600">
                          <Zap size={14} />
                          <span className="text-[11px] font-medium text-ink-muted">Suggestions</span>
                        </div>
                        <div className="font-display text-lg font-bold text-ink">3</div>
                      </div>

                      <div className="rounded-xl border border-line bg-surface-subtle p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-600">
                          <Bug size={14} />
                          <span className="text-[11px] font-medium text-ink-muted">Bugs Reported</span>
                        </div>
                        <div className="font-display text-lg font-bold text-ink">2</div>
                      </div>
                    </div>
                  </Card>

                  {/* Active Participants */}
                  <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-sm font-bold text-ink">Active Participants</h3>
                      <button
                        type="button"
                        onClick={() => showToast('Listing all participants...')}
                        className="text-xs font-semibold text-brand-600 hover:underline"
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { name: 'Sachin Diwakar', role: 'Project Owner', bg: 'bg-indigo-600 text-white', text: 'SD' },
                        { name: 'Ananya Sharma', role: 'Frontend Developer', bg: 'bg-emerald-600 text-white', text: 'AS' },
                        { name: 'Rohan Verma', role: 'Backend Developer', bg: 'bg-blue-600 text-white', text: 'RV' },
                        { name: 'Vikram Singh', role: 'UI/UX Designer', bg: 'bg-orange-600 text-white', text: 'VS' },
                      ].map((u, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span
                            className={cn(
                              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-xs',
                              u.bg
                            )}
                          >
                            {u.text}
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-ink truncate">{u.name}</div>
                            <div className="text-[11px] text-ink-muted truncate">{u.role}</div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-1 text-[11px] font-semibold text-ink-muted">
                        +3 more active
                      </div>
                    </div>
                  </Card>

                  {/* Popular Tags */}
                  <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
                    <h3 className="font-display text-sm font-bold text-ink">Popular Tags</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { name: 'Feature', count: 4, tone: 'bg-blue-50 text-blue-700 border-blue-200' },
                        { name: 'Bug', count: 2, tone: 'bg-rose-50 text-rose-700 border-rose-200' },
                        { name: 'Enhancement', count: 3, tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                        { name: 'Architecture', count: 2, tone: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
                        { name: 'Integrations', count: 1, tone: 'bg-purple-50 text-purple-700 border-purple-200' },
                      ].map((tag) => (
                        <span
                          key={tag.name}
                          onClick={() => {
                            setDiscussionSearch(tag.name)
                            showToast(`Filtered by tag: ${tag.name}`)
                          }}
                          className={cn(
                            'rounded-lg px-2.5 py-1 text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity',
                            tag.tone
                          )}
                        >
                          {tag.name} ({tag.count})
                        </span>
                      ))}
                    </div>
                  </Card>
                </aside>
              </div>
            )}
          </>
        )}

        {/* OTHER DETAIL TABS (Tasks, Milestones, Files, Updates, Analytics, Settings) */}
        {detailTab !== 'Overview' && detailTab !== 'Team' && detailTab !== 'Discussions' && (
          <Card className="rounded-2xl border border-line bg-surface p-8 shadow-card text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 border border-blue-200">
              {detailTab === 'Tasks' && <ListTodo size={26} />}
              {detailTab === 'Milestones' && <Milestone size={26} />}
              {detailTab === 'Files' && <Folder size={26} />}
              {detailTab === 'Updates' && <MessageSquare size={26} />}
              {detailTab === 'Analytics' && <BarChart3 size={26} />}
              {detailTab === 'Settings' && <Settings size={26} />}
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-ink">
                {detailTab} Workspace
              </h3>
              <p className="mt-1 max-w-md mx-auto text-xs text-ink-muted leading-relaxed">
                You are currently viewing the {detailTab} module for Smart Expense Tracker. All
                collaboration telemetry and project state are synchronized in real-time.
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setDetailTab('Overview')}
                className="bg-brand-600 text-white"
              >
                Back to Overview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDetailTab('Team')}
              >
                View Project Team
              </Button>
            </div>
          </Card>
        )}

        {/* MODAL: Add Update */}
        {showUpdateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-pop space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-ink">+ Post Project Update</h3>
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="text-ink-muted hover:text-ink"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handlePostUpdate} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-ink mb-1">Author</label>
                  <input
                    type="text"
                    value={newUpdateAuthor}
                    onChange={(e) => setNewUpdateAuthor(e.target.value)}
                    className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink mb-1">Update Tag / Milestone</label>
                  <input
                    type="text"
                    value={newUpdateTag}
                    onChange={(e) => setNewUpdateTag(e.target.value)}
                    placeholder="e.g., Frontend UI, API Release, QA Verification"
                    className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink mb-1">Update Description</label>
                  <textarea
                    rows={4}
                    value={newUpdateText}
                    onChange={(e) => setNewUpdateText(e.target.value)}
                    placeholder="Summarize the work completed, pull request merged, or next blockers..."
                    className="w-full rounded-xl border border-line bg-surface p-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" className="bg-brand-600 text-white">
                    Publish Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: Invite Member */}
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-pop space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-ink">+ Invite Team Member</h3>
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="text-ink-muted hover:text-ink"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleInviteMember} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-ink mb-1">Full Name</label>
                  <input
                    type="text"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="e.g., Amit Kumar"
                    className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink mb-1">Email Address</label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="e.g., amit.kumar@learnlytica.edu"
                    className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-ink mb-1">Role</label>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as any)}
                      className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                    >
                      <option value="Frontend Dev">Frontend Dev</option>
                      <option value="Backend Dev">Backend Dev</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="QA">QA</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Technical Writer">Technical Writer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-ink mb-1">Access Level</label>
                    <select
                      value={inviteAccess}
                      onChange={(e) => setInviteAccess(e.target.value as any)}
                      className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                    >
                      <option value="Can Edit">Can Edit</option>
                      <option value="Can Comment">Can Comment</option>
                      <option value="Full Access">Full Access</option>
                      <option value="Can View">Can View</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowInviteModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" className="bg-brand-600 text-white">
                    Send Invitation
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ==========================================
  // VIEW: PROJECTS CATALOG (/build - IMAGE 5)
  // ==========================================
  return (
    <div className="space-y-6 pb-20">
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-blue-200 bg-brand-600 px-4 py-2.5 text-xs font-semibold text-white shadow-pop transition-all animate-bounce">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header: Briefcase icon Projects, subtitle, search input, + New Project (blue button) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-600 border border-blue-200/70 shadow-xs">
            <Briefcase size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">Projects</h1>
            <p className="text-xs text-ink-muted mt-0.5">
              Build real-world projects. Showcase your skills. Stand out in placements.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="search"
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              placeholder="Search projects, skills..."
              className="h-9 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-xs text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowNewProjectModal(true)}
            className="h-9 px-3.5 bg-brand-600 text-white hover:bg-brand-700 text-xs font-semibold shrink-0 shadow-xs"
            leadingIcon={<Plus size={14} />}
          >
            + New Project
          </Button>
        </div>
      </div>

      {/* Navigation Tabs: Overview (active), My Projects, Explore Ideas, Project Groups, Reviews, Resources */}
      <div className="border-b border-line flex items-center gap-1 overflow-x-auto scrollbar-none">
        {[
          { id: 'Overview', label: 'Overview' },
          { id: 'My Projects', label: 'My Projects', count: catalogProjects.length },
          { id: 'Explore Ideas', label: 'Explore Ideas', count: 24 },
          { id: 'Project Groups', label: 'Project Groups' },
          { id: 'Reviews', label: 'Reviews', count: 3 },
          { id: 'Resources', label: 'Resources' },
        ].map((tab) => {
          const active = catalogTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCatalogTab(tab.id as any)}
              className={cn(
                'inline-flex items-center gap-1.5 whitespace-nowrap border-b-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all',
                active
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-ink-muted hover:border-slate-300 hover:text-ink',
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.2 text-[10px] font-bold',
                    active
                      ? 'bg-brand-100 text-brand-700'
                      : 'bg-surface-subtle text-ink-muted border border-line',
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Hero Banner: Build. Learn. Impact. with illustration */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-900 via-indigo-900 to-navy-950 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
              <Sparkles size={13} className="text-blue-400" />
              PORTFOLIO BUILDER
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Build. Learn. Impact.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Work on meaningful projects, track your progress, and create a portfolio that gets
              you noticed in campus placements and technical interviews.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowNewProjectModal(true)}
                className="bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-brand-600/30"
              >
                Create New Project
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCatalogTab('Explore Ideas')}
                className="border-white/30 text-white hover:bg-white/10 text-xs font-semibold px-4 py-2.5 rounded-xl"
              >
                Explore Ideas
              </Button>
            </div>
          </div>

          {/* Desktop illustration / IDE window mockup on the right */}
          <div className="hidden md:block shrink-0 w-72 lg:w-80">
            <div className="rounded-xl border border-slate-700 bg-slate-950/90 shadow-2xl p-3.5 backdrop-blur-md space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400/80" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <span className="h-2 w-2 rounded-full bg-green-400/80" />
                </div>
                <span className="font-mono text-[10px] text-slate-400">PortfolioReady.tsx</span>
              </div>

              <div className="font-mono text-[11px] leading-relaxed space-y-1 text-slate-300">
                <p>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">project</span> = &#123;
                </p>
                <p className="pl-3">
                  title: <span className="text-emerald-400">'Smart Expense Tracker'</span>,
                </p>
                <p className="pl-3">
                  tech: [<span className="text-amber-300">'MERN'</span>,{' '}
                  <span className="text-amber-300">'Docker'</span>],
                </p>
                <p className="pl-3">
                  testsPassed: <span className="text-purple-400">true</span>,
                </p>
                <p className="pl-3">
                  progress: <span className="text-blue-400">60%</span>
                </p>
                <p>&#125;</p>
              </div>

              <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[10px] text-emerald-400">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 size={11} /> 14/14 checks passing
                </span>
                <span className="text-slate-400 font-mono">v1.2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Right Rail */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Left / Main Column */}
        <div className="min-w-0 space-y-6">
          {/* Your Project Summary (4 cards) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-ink">Your Project Summary</h3>
              <button
                type="button"
                onClick={() => setCatalogTab('My Projects')}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline inline-flex items-center gap-1"
              >
                View All Projects <ArrowRight size={12} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {/* Card 1: Total Projects 07 */}
              <Card className="rounded-2xl border border-line bg-surface p-4 shadow-card hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-brand-600">
                    <FolderGit2 size={16} />
                  </span>
                  <span className="text-[10px] font-semibold text-brand-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    Overall
                  </span>
                </div>
                <div className="mt-2.5">
                  <div className="font-display text-2xl font-bold text-ink">07</div>
                  <div className="text-xs font-semibold text-ink mt-0.5">Total Projects</div>
                  <div className="text-[10px] text-ink-muted">Across all tracks</div>
                </div>
              </Card>

              {/* Card 2: Completed 03 */}
              <Card className="rounded-2xl border border-line bg-surface p-4 shadow-card hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={16} />
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Shipped
                  </span>
                </div>
                <div className="mt-2.5">
                  <div className="font-display text-2xl font-bold text-ink">03</div>
                  <div className="text-xs font-semibold text-ink mt-0.5">Completed</div>
                  <div className="text-[10px] text-ink-muted">Ready for portfolio</div>
                </div>
              </Card>

              {/* Card 3: In Progress 04 */}
              <Card className="rounded-2xl border border-line bg-surface p-4 shadow-card hover:border-amber-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Clock size={16} />
                  </span>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <div className="mt-2.5">
                  <div className="font-display text-2xl font-bold text-ink">04</div>
                  <div className="text-xs font-semibold text-ink mt-0.5">In Progress</div>
                  <div className="text-[10px] text-ink-muted">Currently building</div>
                </div>
              </Card>

              {/* Card 4: Under Review 01 */}
              <Card className="rounded-2xl border border-line bg-surface p-4 shadow-card hover:border-purple-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Eye size={16} />
                  </span>
                  <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                    Pending
                  </span>
                </div>
                <div className="mt-2.5">
                  <div className="font-display text-2xl font-bold text-ink">01</div>
                  <div className="text-xs font-semibold text-ink mt-0.5">Under Review</div>
                  <div className="text-[10px] text-ink-muted">Mentor evaluation</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Recent Projects list with filter dropdown & View All */}
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base font-bold text-ink">Recent Projects</h3>
                <span className="rounded-full bg-surface-subtle border border-line px-2 py-0.5 text-xs text-ink-muted font-bold">
                  {filteredCatalogProjects.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                  <Filter size={13} />
                  <select
                    value={catalogStatusFilter}
                    onChange={(e) => setCatalogStatusFilter(e.target.value as any)}
                    className="h-8 rounded-lg border border-line bg-surface px-2.5 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setCatalogStatusFilter('All')}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                >
                  View All
                </button>
              </div>
            </div>

            {/* List of projects */}
            <div className="space-y-3.5">
              {filteredCatalogProjects.map((project) => {
                const isSmartExpense = project.slug === 'smart-expense-tracker'

                return (
                  <Card
                    key={project.id}
                    className="group rounded-2xl border border-line bg-surface p-5 shadow-card hover:border-brand-300 hover:shadow-pop transition-all cursor-pointer"
                    onClick={() => {
                      if (isSmartExpense) {
                        navigate('/build/smart-expense-tracker')
                      } else {
                        // Open detail for other projects or smart expense tracker
                        navigate(`/build/${project.slug}`)
                      }
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={cn(
                            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors',
                            project.icon === 'wallet' && 'bg-emerald-50 text-emerald-600 border border-emerald-200',
                            project.icon === 'ecommerce' && 'bg-blue-50 text-brand-600 border border-blue-200',
                            project.icon === 'ai' && 'bg-purple-50 text-purple-600 border border-purple-200',
                            project.icon === 'health' && 'bg-orange-50 text-orange-600 border border-orange-200',
                            project.icon === 'weather' && 'bg-cyan-50 text-cyan-600 border border-cyan-200',
                            project.icon === 'default' && 'bg-slate-100 text-slate-700 border border-slate-200',
                          )}
                        >
                          {project.icon === 'wallet' && <Wallet size={20} />}
                          {project.icon === 'ecommerce' && <ShoppingBag size={20} />}
                          {project.icon === 'ai' && <Sparkles size={20} />}
                          {project.icon === 'health' && <HeartPulse size={20} />}
                          {project.icon === 'weather' && <CloudSun size={20} />}
                          {project.icon === 'default' && <Code2 size={20} />}
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-display text-sm font-bold text-ink group-hover:text-brand-600 transition-colors">
                              {project.title}
                            </h4>
                            <Badge
                              tone={
                                project.status === 'Completed'
                                  ? 'green'
                                  : project.status === 'In Progress'
                                    ? 'brand'
                                    : 'purple'
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>

                          <p className="text-xs text-ink-muted line-clamp-1 max-w-lg">
                            {project.description}
                          </p>

                          {/* Tech Stack badges */}
                          <div className="pt-1 flex flex-wrap items-center gap-1.5">
                            {project.techStack.map((tech, i) => (
                              <span
                                key={i}
                                className="rounded bg-surface-subtle border border-line px-2 py-0.5 font-mono text-[10px] text-slate-700 font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right side: Progress bar & updated info */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between border-t border-slate-100 pt-3 sm:border-t-0 sm:pt-0 shrink-0">
                        <div className="space-y-1 w-32 sm:text-right">
                          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
                            <span className="text-[11px] font-bold text-ink">{project.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={cn(
                                'h-full rounded-full transition-all duration-300',
                                project.status === 'Completed'
                                  ? 'bg-emerald-500'
                                  : project.status === 'Under Review'
                                    ? 'bg-purple-500'
                                    : 'bg-brand-600',
                              )}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[11px] text-ink-muted font-medium">
                            {project.updatedAt}
                          </span>
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-subtle text-ink-muted group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                            <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Rail (Catalog) */}
        <aside className="space-y-6">
          {/* Project Activity (This Week) */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-ink">Project Activity</h3>
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-bold text-brand-700 border border-blue-100">
                This Week
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-line bg-surface-subtle p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-600">
                  <PlusCircle size={14} />
                  <span className="text-[11px] text-ink-muted font-medium">New Projects</span>
                </div>
                <div className="font-display text-xl font-bold text-ink">2</div>
              </div>

              <div className="rounded-xl border border-line bg-surface-subtle p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <GitCommit size={14} />
                  <span className="text-[11px] text-ink-muted font-medium">Commits Made</span>
                </div>
                <div className="font-display text-xl font-bold text-ink">5</div>
              </div>

              <div className="rounded-xl border border-line bg-surface-subtle p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-600">
                  <GitPullRequest size={14} />
                  <span className="text-[11px] text-ink-muted font-medium">PRs Opened</span>
                </div>
                <div className="font-display text-xl font-bold text-ink">3</div>
              </div>

              <div className="rounded-xl border border-line bg-surface-subtle p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-600">
                  <MessageSquare size={14} />
                  <span className="text-[11px] text-ink-muted font-medium">Reviews Received</span>
                </div>
                <div className="font-display text-xl font-bold text-ink">4</div>
              </div>
            </div>
          </Card>

          {/* Recommended For You */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-ink">Recommended For You</h3>
              <Sparkles size={14} className="text-amber-500" />
            </div>

            <div className="space-y-2.5">
              {[
                {
                  title: 'Real-time Chat App',
                  stack: 'Socket.io, React',
                  level: 'Intermediate',
                  xp: '+150 XP',
                },
                {
                  title: 'Movie Recommendation System',
                  stack: 'Python, Scikit-learn',
                  level: 'Intermediate',
                  xp: '+180 XP',
                },
                {
                  title: 'Password Manager',
                  stack: 'Cryptography, Electron',
                  level: 'Advanced',
                  xp: '+210 XP',
                },
              ].map((rec, idx) => (
                <div
                  key={idx}
                  className="group rounded-xl border border-line p-3 hover:border-brand-300 hover:bg-brand-50/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-xs font-bold text-ink group-hover:text-brand-600 transition-colors">
                      {rec.title}
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-600 font-mono">
                      {rec.xp}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-ink-muted">
                    <span>{rec.stack}</span>
                    <span className="text-[10px] font-semibold text-slate-500">{rec.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills You'll Gain */}
          <Card className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-3">
            <h3 className="font-display text-sm font-bold text-ink">Skills You'll Gain</h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                'React',
                'Node.js',
                'MongoDB',
                'Python',
                'Firebase',
                'Machine Learning',
                'AWS',
                'Docker',
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-surface-subtle border border-line px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-brand-300 hover:text-brand-600 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Need Help? Mentor Card */}
          <Card className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-brand-50/80 via-surface to-indigo-50/50 p-5 shadow-card space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm font-bold">
                <HelpCircle size={20} />
              </span>
              <div>
                <h4 className="font-display text-xs font-bold text-ink">
                  Need Help with your Project?
                </h4>
                <p className="text-[11px] text-ink-muted mt-0.5">
                  Get 1:1 code reviews and architecture guidance from senior mentors.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => showToast('Connecting to your assigned technical mentor...')}
              className="w-full bg-brand-600 text-white hover:bg-brand-700 text-xs font-semibold"
              leadingIcon={<MessageSquare size={13} />}
            >
              Ask for Help
            </Button>
          </Card>
        </aside>
      </div>

      {/* MODAL: Create New Project */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-pop space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-ink">+ Create New Project</h3>
              <button
                type="button"
                onClick={() => setShowNewProjectModal(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-ink mb-1">Project Title</label>
                <input
                  type="text"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="e.g., Cloud File Storage Engine"
                  className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  placeholder="What problem does this project solve? What is its core architecture?"
                  className="w-full rounded-xl border border-line bg-surface p-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink mb-1">Domain / Category</label>
                  <select
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="FinTech">FinTech</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="DevOps / Cloud">DevOps / Cloud</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-ink mb-1">Tech Stack (comma sep)</label>
                  <input
                    type="text"
                    value={newProjTech}
                    onChange={(e) => setNewProjTech(e.target.value)}
                    placeholder="React, Node.js, Redis"
                    className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewProjectModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="bg-brand-600 text-white">
                  Create Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Start New Discussion */}
      {showNewDiscussionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-pop space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-ink">+ Start New Discussion</h3>
              <button
                type="button"
                onClick={() => setShowNewDiscussionModal(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateDiscussion} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-ink mb-1">Topic Title / Question</label>
                <input
                  type="text"
                  value={newDiscTitle}
                  onChange={(e) => setNewDiscTitle(e.target.value)}
                  placeholder="e.g., How should we handle currency conversion for expenses?"
                  className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1">Details &amp; Context</label>
                <textarea
                  rows={3}
                  value={newDiscDesc}
                  onChange={(e) => setNewDiscDesc(e.target.value)}
                  placeholder="Provide background, proposed solutions, or specific questions for the team..."
                  className="w-full rounded-xl border border-line bg-surface p-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink mb-1">Category</label>
                  <select
                    value={newDiscCategory}
                    onChange={(e) => setNewDiscCategory(e.target.value as any)}
                    className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Features">Features</option>
                    <option value="Enhancements">Enhancements</option>
                    <option value="Bugs">Bugs</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Updates">Updates</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-ink mb-1">Priority</label>
                  <select
                    value={newDiscPriority}
                    onChange={(e) => setNewDiscPriority(e.target.value as any)}
                    className="h-9 w-full rounded-xl border border-line bg-surface px-3 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewDiscussionModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="bg-brand-600 text-white">
                  Post Discussion
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
