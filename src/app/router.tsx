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
