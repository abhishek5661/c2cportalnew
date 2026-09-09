# C2C Portal

A modern student growth and career platform built with React, TypeScript, Vite, and Tailwind CSS. The app helps students onboard, track their learning progress, practice technical skills, explore career pathways, manage connected profiles, and stay organized with notifications and calendar planning.

## Overview

C2C Portal is designed as a student-focused learning dashboard that combines:

- onboarding and profile setup
- personalized dashboard and progress tracking
- learning path exploration
- DSA and aptitude practice flows
- project-building and contest participation
- mentorship, analytics, and career preparation
- notifications and schedule planning
- connected GitHub, LinkedIn, and social account setup

## Features

### Student onboarding
- guided onboarding flow
- year, interests, goals, preferences, and skill selection
- account connection setup for GitHub, LinkedIn, and other platforms
- profile completion state

### Learning experience
- custom dashboard with semester-based insights
- streak/XP/progress tracking
- learning paths and lesson modules
- practice pages with problem navigation
- project and competition modules

### Career readiness
- career growth and interview preparation journeys
- resume score and suggestions
- company-readiness and professional development views

### Productivity tools
- notification center overview
- calendar and scheduled work planning
- settings page for profile and connected accounts

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- Lucide React

## Project Structure

```text
src/
  app/
    router.tsx
  components/
    layout/
    navigation/
    ui/
  data/
    mock.ts
  features/
    analytics/
    auth/
    build/
    career/
    compete/
    dashboard/
    help/
    journey/
    learning-paths/
    mentor/
    notifications/
    onboarding/
    problems/
    settings/
  lib/
  pages/
  styles/
  types/
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 18+ installed
- npm or yarn installed

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd learnlytica
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open the app in your browser at:
```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```
Starts the Vite development server.

```bash
npm run build
```
Runs TypeScript compilation and production build.

```bash
npm run preview
```
Previews the production build locally.

## Environment Configuration

This app may use environment variables for OAuth and external integrations such as Google login.

Create a `.env` file in the root directory and add values like:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_LINKEDIN_CLIENT_ID=your_linkedin_client_id
```

> Keep any secret keys server-side and do not expose them in client-side code.

## Typical User Flow

1. Sign in or access the student portal
2. Complete onboarding steps
3. Explore the dashboard and personalized recommendations
4. Continue learning via the learning path and practice modules
5. Track performance through analytics and streaks
6. Review notifications and schedule upcoming tasks
7. Manage profile settings and connected accounts

## Notes

- The app currently uses mock/local data for some student profile and analytics behaviors.
- Some flows are designed to be extended with a backend or real authentication provider integration.
- The UI is highly modular and suitable for adding more student learning workflows.

## License

This project is currently unlicensed unless specified otherwise.

## Author

C2C Portal / Learnlytica
