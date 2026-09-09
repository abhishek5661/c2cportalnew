import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { OnboardingProvider } from './features/onboarding/OnboardingContext'
import './styles/index.css'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element not found')
}

createRoot(container).render(
  <StrictMode>
    <OnboardingProvider>
      <RouterProvider router={router} />
    </OnboardingProvider>
  </StrictMode>,
)
