import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { MasterPage } from '../features/learning-paths/MasterPage'
import { PathDetailPage } from '../features/learning-paths/PathDetailPage'
import { LessonModulePage } from '../features/learning-paths/LessonModulePage'
import { TopicLearnPage } from '../features/learning-paths/TopicLearnPage'
import { JourneyPage } from '../features/journey/JourneyPage'
import { PracticePage } from '../features/problems/PracticePage'
import { ProblemDetailPage } from '../features/problems/ProblemDetailPage'
import { BuildPage } from '../features/build/BuildPage'
import { CompetePage } from '../features/compete/CompetePage'
import { CareerPage } from '../features/career/CareerPage'
import { CareerOverviewPage } from '../features/career/CareerOverviewPage'
import { CompanyReadinessPage } from '../features/career/CompanyReadinessPage'
import { ResumeScorePage } from '../features/career/ResumeScorePage'
import { ResumeSuggestionsPage } from '../features/career/ResumeSuggestionsPage'
import { ResumeBuilderPage } from '../features/career/ResumeBuilderPage'
import { SkillRoadmapPage } from '../features/career/SkillRoadmapPage'
import { InterviewsPage } from '../features/interviews/InterviewsPage'
import { ProfessionalPage } from '../features/professional/ProfessionalPage'
import { OpenSourcePage } from '../features/opensource/OpenSourcePage'
import { AnalyticsPage } from '../features/analytics/AnalyticsPage'
import { MentorPage } from '../features/mentor/MentorPage'
import { HelpPage } from '../features/help/HelpPage'
import { SettingsPage } from '../features/settings/SettingsPage'
import { NotificationsPage } from '../features/notifications/NotificationsPage'
import { CalendarPage } from '../features/calendar/CalendarPage'
import { LoginPage } from '../features/auth/LoginPage'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { OnboardingFlowPage } from '../features/onboarding/OnboardingFlowPage'
import { TrackOverviewPage } from '../features/learning-paths/TrackOverviewPage'
import { CsFundamentalsPage } from '../features/learning-paths/CsFundamentalsPage'

const trackConfig = {
  frontierTech: {
    title: 'Frontier Tech',
    eyebrow: 'Emerging tech',
    summary:
      'Build fluency in AI, ML, cloud, data, and modern engineering tools so you can thrive in rapid-change product teams and future-ready roles.',
    objective:
      'Develop a strong conceptual foundation in AI/ML, LLMs, cloud-native engineering, and data-driven product building. You will learn to navigate modern technical ecosystems, evaluate trade-offs, and apply emerging tools with confidence.',
    accent: 'bg-purple-100 text-purple-700',
    icon: 'spark' as const,
    modules: [
      { title: 'AI Foundations', description: 'Understand machine learning, data flows, and model basics.', items: ['ML lifecycles', 'Feature engineering', 'Model evaluation', 'Bias and trust'] },
      { title: 'LLM & Generative AI', description: 'Learn prompt patterns, retrieval, and production scenarios.', items: ['Prompt engineering', 'RAG basics', 'LLM evaluation', 'Use-case fit'] },
      { title: 'Cloud & DevOps', description: 'Learn modern deployment and scaling patterns.', items: ['Containers', 'CI/CD', 'Cloud basics', 'Monitoring'] },
      { title: 'Data & Analytics', description: 'Turn raw information into signals and decisions.', items: ['Data pipelines', 'Dashboards', 'Metrics', 'Experimentation'] },
      { title: 'Product Engineering', description: 'Build systems that integrate models and services.', items: ['API design', 'System trade-offs', 'Reliability', 'User impact'] },
      { title: 'Applied Mini Project', description: 'Ship a practical project using frontier tools.', items: ['Problem framing', 'Prototype', 'Validation', 'Presentation'] },
    ],
  },
  csFundamentals: {
    title: 'CS Fundamentals',
    eyebrow: 'Core concepts',
    summary:
      'Strengthen the foundations that every strong engineer relies on: data structures, operating systems, networking, databases, and problem-solving fundamentals.',
    objective:
      'Master the core concepts behind software systems so you can reason clearly, debug effectively, and build scalable, reliable solutions across engineering roles.',
    accent: 'bg-blue-100 text-blue-700',
    icon: 'cpu' as const,
    modules: [
      { title: 'Data Structures', description: 'Learn the building blocks of efficient software.', items: ['Arrays', 'Hashing', 'Trees', 'Graphs'] },
      { title: 'Algorithms', description: 'Improve reasoning and optimization for real workloads.', items: ['Searching', 'Sorting', 'Greedy', 'Dynamic programming'] },
      { title: 'DBMS', description: 'Understand how systems store and retrieve data.', items: ['SQL', 'Normalization', 'Indexes', 'Transactions'] },
      { title: 'Operating Systems', description: 'See how processes, memory, and scheduling work.', items: ['Processes', 'Threads', 'Scheduling', 'Memory'] },
      { title: 'Networking', description: 'Learn how applications communicate across systems.', items: ['TCP/IP', 'HTTP', 'Sockets', 'DNS'] },
      { title: 'System Design Basics', description: 'Translate fundamentals into scalable architecture choices.', items: ['Trade-offs', 'Latency', 'Throughput', 'Reliability'] },
    ],
  },
  aptitude: {
    title: 'Aptitude',
    eyebrow: 'Quant + logic',
    summary:
      'Build accuracy and speed in quant, arithmetic, logical reasoning, and verbal problem-solving for placement and competitive exams.',
    objective:
      'Develop the speed and clarity required to solve aptitude questions quickly while improving analytical thinking and decision-making under time pressure.',
    accent: 'bg-amber-100 text-amber-700',
    icon: 'target' as const,
    modules: [
      { title: 'Arithmetic', description: 'Strengthen calculation and percentage-based problem solving.', items: ['Percentages', 'Profit & loss', 'Ratios', 'Averages'] },
      { title: 'Number Systems', description: 'Master divisibility, factors, and number properties.', items: ['LCM/HCF', 'Remainders', 'Divisibility', 'Indices'] },
      { title: 'Logical Reasoning', description: 'Practice structured deduction and pattern recognition.', items: ['Series', 'Coding', 'Blood relations', 'Direction sense'] },
      { title: 'Data Interpretation', description: 'Read and analyze tables, charts, and graphs.', items: ['Line graphs', 'Bar charts', 'Pie charts', 'Ratios'] },
      { title: 'Verbal Ability', description: 'Improve comprehension and sentence skill for communication tests.', items: ['Reading comprehension', 'Grammar', 'Vocabulary', 'Error spotting'] },
      { title: 'Timed Practice', description: 'Build practical speed and accuracy with mock rounds.', items: ['Mini tests', 'Timeboxing', 'Error review', 'Progress tracking'] },
    ],
  },
  reasoning: {
    title: 'Reasoning',
    eyebrow: 'Analytical thinking',
    summary:
      'Improve structured thinking, inference, and decision-making so you can solve logical, verbal, and pattern-based challenges with confidence.',
    objective:
      'Train your ability to reason clearly and consistently by recognizing patterns, evaluating conditions, and drawing sound conclusions under time pressure.',
    accent: 'bg-emerald-100 text-emerald-700',
    icon: 'brain' as const,
    modules: [
      { title: 'Pattern Recognition', description: 'Identify recurring structures and hidden relationships.', items: ['Number series', 'Letter series', 'Odd-one-out', 'Analogies'] },
      { title: 'Logical Deduction', description: 'Use rules and statements to infer conclusions.', items: ['Syllogisms', 'Statements & assumptions', 'Cause-effect', 'Critical reasoning'] },
      { title: 'Spatial & Visual Reasoning', description: 'Reason through arrangements and transformations.', items: ['Cube puzzles', 'Mirror images', 'Rotation', 'Direction sense'] },
      { title: 'Decision Making', description: 'Evaluate multiple constraints and choose the best next step.', items: ['Ranking', 'Binary logic', 'Scheduling', 'Ordering'] },
      { title: 'Verbal Reasoning', description: 'Interpret meaning and logic in language-based tasks.', items: ['Inference', 'Strong/weak arguments', 'Reading logic', 'Validity'] },
      { title: 'Mock Challenges', description: 'Apply reasoning under timed conditions.', items: ['Mini sets', 'Mixed rounds', 'Review', 'Retry loops'] },
    ],
  },
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/onboarding', element: <Navigate to="/onboarding/year" replace /> },
  { path: '/onboarding/year', element: <OnboardingFlowPage /> },
  { path: '/onboarding/interests', element: <OnboardingFlowPage /> },
  { path: '/onboarding/skill-level', element: <OnboardingFlowPage /> },
  { path: '/onboarding/accounts', element: <OnboardingFlowPage /> },
  { path: '/onboarding/goals', element: <OnboardingFlowPage /> },
  { path: '/onboarding/preferences', element: <OnboardingFlowPage /> },
  {
    element: <AppShell />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/journey', element: <JourneyPage /> },
      { path: '/master', element: <MasterPage /> },
      { path: '/master/frontier-tech', element: <TrackOverviewPage config={trackConfig.frontierTech} /> },
      { path: '/master/cs-fundamentals', element: <CsFundamentalsPage /> },
      { path: '/master/aptitude', element: <TrackOverviewPage config={trackConfig.aptitude} /> },
      { path: '/master/reasoning', element: <TrackOverviewPage config={trackConfig.reasoning} /> },
      { path: '/frontier-tech', element: <TrackOverviewPage config={trackConfig.frontierTech} /> },
      { path: '/cs-fundamentals', element: <CsFundamentalsPage /> },
      { path: '/aptitude', element: <TrackOverviewPage config={trackConfig.aptitude} /> },
      { path: '/reasoning', element: <TrackOverviewPage config={trackConfig.reasoning} /> },
      { path: '/master/aptitude/number-systems', element: <LessonModulePage /> },
      { path: '/master/:pathId/lesson/:lessonId', element: <LessonModulePage /> },
      { path: '/master/dsa/arrays', element: <TopicLearnPage /> },
      { path: '/master/:pathId/topic/:topicId', element: <TopicLearnPage /> },
      { path: '/master/:pathId/:topicId', element: <TopicLearnPage /> },
      { path: '/master/:pathId', element: <PathDetailPage /> },
      { path: '/practice', element: <PracticePage /> },
      { path: '/practice/:problemId', element: <ProblemDetailPage /> },
      { path: '/practice/:problemId/editorial', element: <ProblemDetailPage /> },
      { path: '/practice/:problemId/solutions', element: <ProblemDetailPage /> },
      { path: '/practice/:problemId/submissions', element: <ProblemDetailPage /> },
      { path: '/build', element: <BuildPage /> },
      { path: '/build/*', element: <BuildPage /> },
      { path: '/compete', element: <CompetePage /> },
      { path: '/compete/*', element: <CompetePage /> },
      { path: '/opensource', element: <OpenSourcePage /> },
      { path: '/opensource/*', element: <OpenSourcePage /> },
      { path: '/career', element: <CareerPage /> },
      { path: '/career/*', element: <CareerPage /> },
      { path: '/career-overview', element: <CareerOverviewPage /> },
      { path: '/career-growth', element: <SkillRoadmapPage /> },
      { path: '/career-growth/*', element: <SkillRoadmapPage /> },
      { path: '/company-readiness', element: <CompanyReadinessPage /> },
      { path: '/company-readiness/*', element: <CompanyReadinessPage /> },
      { path: '/resume-score', element: <ResumeScorePage /> },
      { path: '/resume-suggestions', element: <ResumeSuggestionsPage /> },
      { path: '/resume-builder', element: <ResumeBuilderPage /> },
      { path: '/interviews', element: <InterviewsPage /> },
      { path: '/interviews/*', element: <InterviewsPage /> },
      { path: '/professional', element: <ProfessionalPage /> },
      { path: '/professional/*', element: <ProfessionalPage /> },
      { path: '/mentor', element: <MentorPage /> },
      { path: '/mentor/*', element: <MentorPage /> },
      { path: '/analytics', element: <AnalyticsPage /> },
      { path: '/help', element: <HelpPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '/calendar', element: <CalendarPage /> },
      {
        path: '*',
        element: (
          <PlaceholderPage
            title="Page not found"
            description="The page you're looking for doesn't exist yet."
          />
        ),
      },
    ],
  },
])
