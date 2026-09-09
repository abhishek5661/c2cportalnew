import {
  Home,
  Compass,
  Code2,
  LayoutGrid,
  Monitor,
  Layers,
  Sparkles,
  FolderGit2,
  Trophy,
  Globe,
  MessageSquare,
  Mic,
  Briefcase,
  Building2,
  FileText,
  BarChart3,
  UserCheck,
  Bell,
  Settings,
  Brain,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  id: string
  label: string
  to: string
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  badge?: number
}

export interface NavGroup {
  id: string
  label?: string
  items: NavItem[]
}

export const topNavItems: NavItem[] = [
  { id: 'home', label: 'Home', to: '/dashboard', icon: Home, iconColor: 'text-indigo-600' },
  { id: 'journey', label: 'My Journey', to: '/journey', icon: Compass, iconColor: 'text-purple-600' },
]

export const navGroups: NavGroup[] = [
  {
    id: 'foundation',
    label: 'FOUNDATION',
    items: [
      {
        id: 'dsa',
        label: 'DSA & Coding',
        to: '/master/dsa',
        icon: Code2,
        iconColor: 'text-blue-600',
        iconBg: 'bg-navy-950 text-blue-400',
      },
      {
        id: 'aptitude',
        label: 'Aptitude & Reasoning',
        to: '/master/aptitude',
        icon: LayoutGrid,
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-50 text-amber-600',
      },
      {
        id: 'software-dev',
        label: 'Software Development',
        to: '/master',
        icon: Monitor,
        iconColor: 'text-cyan-600',
        iconBg: 'bg-cyan-50 text-cyan-600',
      },
      {
        id: 'cs-fundamentals',
        label: 'CS Fundamentals',
        to: '/cs-fundamentals',
        icon: Layers,
        iconColor: 'text-orange-600',
        iconBg: 'bg-orange-50 text-orange-600',
      },
      {
        id: 'frontier-tech',
        label: 'Frontier Tech',
        to: '/frontier-tech',
        icon: Sparkles,
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-50 text-purple-600',
      },
      {
        id: 'aptitude-track',
        label: 'Aptitude',
        to: '/aptitude',
        icon: BarChart3,
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-50 text-amber-600',
      },
      {
        id: 'reasoning-track',
        label: 'Reasoning',
        to: '/reasoning',
        icon: Brain,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50 text-emerald-600',
      },
    ],
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    items: [
      {
        id: 'projects',
        label: 'Projects',
        to: '/build',
        icon: FolderGit2,
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-50 text-blue-600',
      },
      {
        id: 'competitions',
        label: 'Competitions',
        to: '/compete',
        icon: Trophy,
        iconColor: 'text-indigo-600',
        iconBg: 'bg-indigo-50 text-indigo-600',
      },
      {
        id: 'open-source',
        label: 'Open Source',
        to: '/opensource',
        icon: Globe,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50 text-emerald-600',
      },
    ],
  },
  {
    id: 'professional',
    label: 'PROFESSIONAL',
    items: [
      {
        id: 'communication',
        label: 'Communication',
        to: '/mentor',
        icon: MessageSquare,
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-50 text-purple-600',
      },
      {
        id: 'interviews',
        label: 'Interviews',
        to: '/interviews',
        icon: Mic,
        iconColor: 'text-orange-600',
        iconBg: 'bg-orange-50 text-orange-600',
      },
      {
        id: 'resume-portfolio',
        label: 'Resume & Portfolio',
        to: '/career?tab=resume',
        icon: FileText,
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-50 text-purple-600',
      },
      {
        id: 'career-growth',
        label: 'Career Growth',
        to: '/career-growth',
        icon: BarChart3,
        iconColor: 'text-indigo-600',
        iconBg: 'bg-indigo-50 text-indigo-600',
      },
    ],
  },
  {
    id: 'career',
    label: 'CAREER',
    items: [
      {
        id: 'career-hub',
        label: 'Career',
        to: '/career',
        icon: Briefcase,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50 text-emerald-600',
      },
      {
        id: 'company-readiness',
        label: 'Company Readiness',
        to: '/company-readiness',
        icon: Building2,
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-50 text-blue-600',
      },
    ],
  },
  {
    id: 'insights',
    label: 'INSIGHTS',
    items: [
      {
        id: 'progress',
        label: 'Progress',
        to: '/analytics',
        icon: BarChart3,
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-50 text-blue-600',
      },
    ],
  },
  {
    id: 'support',
    label: 'SUPPORT',
    items: [
      {
        id: 'mentor',
        label: 'Mentor',
        to: '/mentor',
        icon: UserCheck,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50 text-emerald-600',
      },
    ],
  },
]

export const bottomNavItems: NavItem[] = [
  { id: 'notifications', label: 'Notifications', to: '/notifications', icon: Bell, badge: 3, iconColor: 'text-slate-600' },
  { id: 'settings', label: 'Settings', to: '/settings', icon: Settings, iconColor: 'text-slate-600' },
]

export const mobileNav: NavItem[] = [
  { id: 'home', label: 'Home', to: '/dashboard', icon: Home },
  { id: 'journey', label: 'Journey', to: '/journey', icon: Compass },
  { id: 'projects', label: 'Projects', to: '/build', icon: FolderGit2 },
  { id: 'competitions', label: 'Competitions', to: '/compete', icon: Trophy },
  { id: 'progress', label: 'Progress', to: '/analytics', icon: BarChart3 },
]
