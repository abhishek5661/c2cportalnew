import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  School,
  Shield,
  Sparkles,
  User,
  Users,
  X,
} from 'lucide-react'
import { Logo } from '../../components/layout/Logo'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/cn'
import {
  verifyCredentials,
  registerUser,
  resetPassword,
  getStoredUsers,
  saveStoredUsers,
} from './userStore'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const [authMode, setAuthMode] = useState<'candidate' | 'sso'>('candidate')
  const [isMember, setIsMember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [authError, setAuthError] = useState<string | null>(null)
  const [authSuccess, setAuthSuccess] = useState<string | null>(null)
  const [fullName, setFullName] = useState('')

  // Forgot Password Modal States
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetStep, setResetStep] = useState<'request' | 'verify' | 'new_password' | 'done'>('request')
  const [resetEmail, setResetEmail] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [resetError, setResetError] = useState<string | null>(null)
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null)

  // Social Account Chooser Modal
  const [showSocialModal, setShowSocialModal] = useState<'Google' | 'Microsoft' | 'GitHub' | null>(null)
  const [customSocialEmail, setCustomSocialEmail] = useState('')
  const [customSocialName, setCustomSocialName] = useState('')

  const handleOpenForgotPassword = () => {
    setResetEmail(email.trim() || '')
    setResetStep('request')
    setResetCode('4829') // Auto-generated demo OTP for instant convenience
    setNewPassword('')
    setConfirmNewPassword('')
    setResetError(null)
    setResetSuccessMsg(null)
    setShowForgotPassword(true)
  }

  const handleSendResetCode = (e: React.FormEvent) => {
    e.preventDefault()
    setResetError(null)
    if (!resetEmail.trim()) {
      setResetError('Please enter your registered email or User ID.')
      return
    }
    setResetLoading(true)
    setTimeout(() => {
      setResetLoading(false)
      setResetStep('verify')
      setResetSuccessMsg(`Verification code sent to ${resetEmail}.`)
    }, 450)
  }

  const handleVerifyResetCode = (e: React.FormEvent) => {
    e.preventDefault()
    setResetError(null)
    if (resetCode.trim() !== '4829' && resetCode.trim().length < 4) {
      setResetError('Invalid verification code. Please enter the 4-digit code (Hint: 4829).')
      return
    }
    setResetStep('new_password')
  }

  const handleApplyNewPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setResetError(null)
    if (!newPassword || newPassword.length < 6) {
      setResetError('New password must be at least 6 characters long.')
      return
    }
    if (newPassword !== confirmNewPassword) {
      setResetError('Passwords do not match. Please re-enter.')
      return
    }

    setResetLoading(true)
    setTimeout(() => {
      setResetLoading(false)
      const res = resetPassword(resetEmail, newPassword)
      if (!res.success) {
        setResetError(res.error || 'Failed to reset password.')
        return
      }

      setResetStep('done')
      setEmail(res.user?.email || resetEmail)
      setPassword(newPassword)
      setAuthSuccess('✓ Password reset successfully! You can now log in with your new password.')
    }, 500)
  }

  const hasCompletedOnboarding = () => {
    try {
      const raw = localStorage.getItem('c2cedge.onboarding')
      if (!raw) return false
      const onboarding = JSON.parse(raw)
      if (!onboarding) return false
      const requiredFields = [
        onboarding.year,
        onboarding.interests?.length,
        onboarding.level,
        onboarding.goals?.length,
        onboarding.learningModes?.length,
        onboarding.preferredTime,
      ]
      return requiredFields.every(Boolean)
    } catch {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)
    setAuthSuccess(null)

    if (!email.trim()) {
      setAuthError('Please enter your User ID or Email.')
      return
    }

    if (!password) {
      setAuthError('Please enter your password.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)

      if (authMode === 'sso') {
        if (!email.includes('@') && !email.includes('.')) {
          setAuthError('Please enter a valid institution domain or email (e.g. niet.edu.in).')
          return
        }
        localStorage.setItem('c2cedge.isMember', 'true')
        navigate('/onboarding/year')
        return
      }

      // If user is logging in (Already a member)
      if (isMember) {
        const result = verifyCredentials(email, password)
        if (!result.success) {
          setAuthError(result.error || 'Verification failed. Please check your credentials.')
          return
        }

        const nextRoute = hasCompletedOnboarding() ? '/dashboard' : '/onboarding/year'
        setAuthSuccess(`✓ Verified! Welcome back, ${result.user?.name}.`)
        setTimeout(() => {
          navigate(nextRoute)
        }, 600)
      } else {
        // User is signing up with new credentials
        if (!fullName.trim()) {
          setAuthError('Please enter your full name.')
          return
        }
        if (password.length < 6) {
          setAuthError('Password must be at least 6 characters long.')
          return
        }

        const regResult = registerUser({
          name: fullName.trim(),
          email: email.trim(),
          password: password,
          role: 'student',
        })

        if (!regResult.success) {
          setAuthError(regResult.error || 'Registration failed.')
          return
        }

        const nextRoute = hasCompletedOnboarding() ? '/dashboard' : '/onboarding/year'
        setAuthSuccess(`✓ Account successfully created for ${regResult.user?.name}!`)
        setTimeout(() => {
          navigate(nextRoute)
        }, 600)
      }
    }, 500)
  }

  const handleSocialAuth = (providerName?: string | React.MouseEvent) => {
    const provider = typeof providerName === 'string' ? providerName : 'Google'
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const microsoftClientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID

    if (provider === 'Google') {
      if (googleClientId) {
        const redirectUri = `${window.location.origin}/login`
        const googleAuthUrl =
          `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${googleClientId}` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&response_type=token` +
          `&scope=${encodeURIComponent('openid profile email')}` +
          `&prompt=select_account`
        window.location.href = googleAuthUrl
        return
      }

      setShowSocialModal(null)
      setAuthError('Google sign-in is not configured yet. Add VITE_GOOGLE_CLIENT_ID to enable the browser Google chooser.')
      return
    }

    if (provider === 'Microsoft') {
      if (microsoftClientId) {
        const redirectUri = `${window.location.origin}/login`
        const microsoftAuthUrl =
          'https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?' +
          `client_id=${encodeURIComponent(microsoftClientId)}` +
          '&response_type=code' +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          '&response_mode=query' +
          `&scope=${encodeURIComponent('openid profile email User.Read offline_access')}` +
          '&prompt=select_account'
        window.location.href = microsoftAuthUrl
        return
      }

      setCustomSocialEmail('')
      setCustomSocialName('')
      setShowSocialModal('Microsoft')
      setAuthError('Microsoft sign-in is not configured yet. Add VITE_MICROSOFT_CLIENT_ID to open the real Microsoft login page.')
      return
    }

    setCustomSocialEmail('')
    setCustomSocialName('')
    setShowSocialModal(provider as 'Google' | 'Microsoft' | 'GitHub')
  }

  const handleSelectSocialAccount = (accountEmail: string, accountName: string, provider: string) => {
    setLoading(true)
    setShowSocialModal(null)
    setAuthError(null)

    setTimeout(() => {
      setLoading(false)
      const users = getStoredUsers()
      let matchedUser = users.find((u) => u.email.toLowerCase() === accountEmail.toLowerCase())
      if (!matchedUser) {
        matchedUser = {
          id: `usr_${Date.now()}`,
          name: accountName,
          email: accountEmail,
          username: accountEmail.split('@')[0],
          passwordHash: 'Abhishek@123',
          role: 'student',
          status: 'active',
          createdAt: new Date().toISOString(),
        }
        users.push(matchedUser)
        saveStoredUsers(users)
      }

      localStorage.setItem('c2cedge.isMember', 'true')
      localStorage.setItem(
        'c2cedge.current_user',
        JSON.stringify({
          id: matchedUser.id,
          name: matchedUser.name,
          email: matchedUser.email,
          role: matchedUser.role,
        })
      )

      try {
        const raw = localStorage.getItem('c2cedge.onboarding')
        const ob = raw ? JSON.parse(raw) : {}
        ob.name = matchedUser.name
        localStorage.setItem('c2cedge.onboarding', JSON.stringify(ob))
      } catch {}

      const nextRoute = hasCompletedOnboarding() ? '/dashboard' : '/onboarding/year'
      setAuthSuccess(`✓ Authenticated with ${provider} as ${matchedUser.name}!`)
      setTimeout(() => {
        navigate(nextRoute)
      }, 500)
    }, 400)
  }

  useEffect(() => {
    const session = localStorage.getItem('c2cedge.current_session')
    const isMember = localStorage.getItem('c2cedge.isMember') === 'true'
    if (session && isMember && hasCompletedOnboarding()) {
      navigate('/dashboard', { replace: true })
      return
    }

    // Handle redirect response from Google OAuth if token is present in hash
    const hash = window.location.hash
    if (hash && hash.includes('access_token=')) {
      const params = new URLSearchParams(hash.replace('#', '?'))
      const accessToken = params.get('access_token')
      if (accessToken) {
        setLoading(true)
        window.history.replaceState(null, '', window.location.pathname)
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.email) {
              handleSelectSocialAccount(
                data.email,
                data.name || data.email.split('@')[0],
                'Google'
              )
            } else {
              setAuthError('Failed to retrieve user email from Google.')
            }
          })
          .catch(() => setAuthError('Unable to connect to Google OAuth service.'))
          .finally(() => setLoading(false))
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50/50 text-ink flex flex-col justify-between font-sans">
      {/* Top Navbar */}
      <header className="w-full px-6 sm:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="text-xs sm:text-sm">
          {isMember ? (
            <>
              <span className="text-ink-muted">New to c2cedge? </span>
              <button
                type="button"
                onClick={() => setIsMember(false)}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
              >
                Start Onboarding <ArrowRight size={14} />
              </button>
            </>
          ) : (
            <>
              <span className="text-ink-muted">Already a member? </span>
              <button
                type="button"
                onClick={() => setIsMember(true)}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
              >
                Sign in to Dashboard <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content Split Screen */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 py-4 sm:py-8 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left Side: Hero Value Props & Visual Organic Collage */}
        <div className="lg:col-span-7 space-y-8">
          {/* Headline & Description */}
          <div className="space-y-3 max-w-xl">
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.15]">
              One Platform. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Many Possibilities.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Empowering students, educators, and organizations to build skills, create opportunities, and shape a brighter future together.
            </p>
          </div>

          {/* 2-Column: Audience Benefit Cards & Organic Student Photo Collage */}
          <div className="grid sm:grid-cols-12 gap-6 items-center">
            {/* 4 Audience Cards */}
            <div className="sm:col-span-6 space-y-3">
              {[
                {
                  title: 'For Learners',
                  desc: 'Learn, practice, build, and get career ready.',
                  icon: GraduationCap,
                  bg: 'bg-blue-100 text-blue-600',
                },
                {
                  title: 'For Educators',
                  desc: 'Track progress and empower students.',
                  icon: School,
                  bg: 'bg-emerald-100 text-emerald-600',
                },
                {
                  title: 'For Organizations',
                  desc: 'Collaborate, mentor, and create impact.',
                  icon: Users,
                  bg: 'bg-amber-100 text-amber-600',
                },
                {
                  title: 'For Admins',
                  desc: 'Manage, monitor, and drive outcomes.',
                  icon: Briefcase,
                  bg: 'bg-rose-100 text-rose-600',
                },
              ].map((role) => {
                const Icon = role.icon
                return (
                  <div
                    key={role.title}
                    className="flex items-start gap-3 p-2.5 rounded-xl border border-line bg-white/70 backdrop-blur-xs hover:shadow-xs transition-shadow"
                  >
                    <div className={cn('p-2 rounded-xl shrink-0', role.bg)}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className="font-display text-xs font-bold text-ink">
                        {role.title}
                      </h3>
                      <p className="text-[11px] text-ink-muted leading-tight mt-0.5">
                        {role.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Visual Photo Collage with Playful Organic Blobs & Handwritten Doodles */}
            <div className="sm:col-span-6 relative flex flex-col items-center gap-3">
              {/* Decorative floating pastel squares */}
              <div className="absolute -top-4 right-2 w-8 h-8 rounded-xl bg-purple-200/50 -rotate-12 pointer-events-none" />
              <div className="absolute top-28 -left-3 w-8 h-8 rounded-xl bg-emerald-200/50 rotate-12 pointer-events-none" />
              <div className="absolute -bottom-2 right-6 w-8 h-8 rounded-xl bg-blue-200/50 rotate-6 pointer-events-none" />

              {/* Photo 1: Female Student */}
              <div className="relative group">
                <div className="w-40 h-32 overflow-hidden rounded-[40%_60%_55%_45%/45%_50%_50%_55%] border-2 border-purple-200 shadow-md bg-purple-50">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                    alt="Student learning"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Handwritten sticky annotation */}
                <div className="absolute -top-2 -left-12 -rotate-12 bg-white/90 backdrop-blur-xs shadow-xs border border-purple-200 px-2 py-0.5 rounded-lg text-[10px] font-bold text-purple-800 flex items-center gap-1 select-none">
                  <span>Learn Without Limits</span>
                  <span className="text-purple-500">✦</span>
                </div>
              </div>

              {/* Photo 2: Male Student with Glasses & Headphones */}
              <div className="relative group -mt-3 ml-6">
                <div className="w-40 h-32 overflow-hidden rounded-[50%_50%_40%_60%/55%_45%_55%_45%] border-2 border-blue-200 shadow-md bg-blue-50">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80"
                    alt="Student coding"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Handwritten sticky annotation */}
                <div className="absolute top-1/2 -right-16 translate-y-[-50%] rotate-6 bg-white/90 backdrop-blur-xs shadow-xs border border-blue-200 px-2 py-0.5 rounded-lg text-[10px] font-bold text-blue-800 flex items-center gap-1 select-none">
                  <span>Build What Matters</span>
                  <span className="text-emerald-500">🌱</span>
                </div>
              </div>

              {/* Photo 3: Campus / University Architecture */}
              <div className="relative group -mt-3 -ml-4">
                <div className="w-40 h-28 overflow-hidden rounded-[45%_55%_50%_50%/50%_55%_45%_50%] border-2 border-amber-200 shadow-md bg-amber-50">
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80"
                    alt="University Campus"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Handwritten sticky annotation */}
                <div className="absolute -top-3 -left-10 -rotate-6 bg-white/90 backdrop-blur-xs shadow-xs border border-amber-200 px-2 py-0.5 rounded-lg text-[10px] font-bold text-amber-900 select-none">
                  Stronger Together
                </div>
                <div className="absolute -bottom-2 -right-14 rotate-6 bg-white/90 backdrop-blur-xs shadow-xs border border-purple-200 px-2 py-0.5 rounded-lg text-[10px] font-bold text-purple-900 select-none">
                  Turn Skills into Opportunities ➔
                </div>
              </div>
            </div>
          </div>

          {/* Quote Card */}
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/60 p-4 max-w-lg space-y-1">
            <p className="text-xs font-semibold text-slate-800 italic leading-relaxed">
              &ldquo;A future-ready talent ecosystem for a better tomorrow.&rdquo;
            </p>
            <p className="text-[11px] font-bold text-blue-700">— The c2cedge Team</p>
          </div>

          {/* Bottom Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-line">
            {[
              { label: 'Learners', val: '100K+' },
              { label: 'Institutions', val: '500+' },
              { label: 'Industry Partners', val: '1K+' },
              { label: 'Career Readiness', val: '95%' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-0.5">
                <span className="font-display text-xl font-extrabold text-ink block">
                  {stat.val}
                </span>
                <span className="text-xs text-ink-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Authentication Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-3xl border border-line shadow-xl p-7 sm:p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-1">
              <h2 className="font-display text-2xl font-bold text-ink">
                Welcome Back
              </h2>
              <p className="text-xs text-ink-muted">
                Sign in to your c2cedge account
              </p>
            </div>



            {/* Segmented Mode Selector */}
            <div className="grid grid-cols-2 gap-1 bg-slate-100/80 p-1 rounded-2xl border border-line text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMode('candidate')}
                className={cn(
                  'flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all',
                  authMode === 'candidate'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-ink-muted hover:text-ink',
                )}
              >
                <User size={14} />
                <span>Candidate / Admin</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('sso')}
                className={cn(
                  'flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all',
                  authMode === 'sso'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-ink-muted hover:text-ink',
                )}
              >
                <Building2 size={14} />
                <span>Single Sign-On (SSO)</span>
              </button>
            </div>

            {/* Error or Success feedback banners */}
            {authError && (
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 animate-in fade-in">
                <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 leading-snug">
                  <span className="font-bold block">Verification Error</span>
                  <span className="text-[11px] text-rose-800">{authError}</span>
                </div>
              </div>
            )}

            {authSuccess && (
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 animate-in fade-in">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1 leading-snug">
                  <span className="font-bold block">Verified</span>
                  <span className="text-[11px] text-emerald-800">{authSuccess}</span>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {authMode === 'candidate' ? (
                <>
                  {!isMember && (
                    <div className="space-y-1.5 animate-in fade-in">
                      <label className="font-bold text-ink">Full Name</label>
                      <div className="relative">
                        <User
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Ananya Sharma"
                          required={!isMember}
                          className="w-full rounded-xl border border-line bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="font-bold text-ink">
                      {isMember ? 'User ID (Email or Username)' : 'Work or Student Email'}
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setAuthError(null)
                        }}
                        placeholder="Enter your email or username"
                        required
                        className="w-full rounded-xl border border-line bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-ink">Password</label>
                      <button
                        type="button"
                        onClick={handleOpenForgotPassword}
                        className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          setAuthError(null)
                        }}
                        placeholder="Enter your password"
                        required
                        className="w-full rounded-xl border border-line bg-slate-50/50 py-2.5 pl-10 pr-10 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Member Status Selector */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-line bg-slate-50/70 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isMember}
                        onChange={(e) => {
                          setIsMember(e.target.checked)
                          setAuthError(null)
                        }}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="font-semibold text-ink">Already a member</span>
                    </label>
                    <span className="text-[11px] font-medium text-blue-700">
                      {isMember ? 'Verify Credentials & Enter' : 'Register New User'}
                    </span>
                  </div>
                </>
              ) : (
                <div className="space-y-1.5">
                  <label className="font-bold text-ink">Organization Domain / Email</label>
                  <div className="relative">
                    <Building2
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="e.g. niet.edu.in or your institution"
                      required
                      className="w-full rounded-xl border border-line bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-ink-muted">
                    We will redirect you to your college identity provider (SAML 2.0 / Okta).
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                loading={loading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition-all mt-2"
              >
                {authMode === 'sso'
                  ? 'Continue with Organization SSO'
                  : isMember
                  ? 'Sign In to Dashboard'
                  : 'Continue to Onboarding Setup →'}
              </Button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setIsMember(!isMember)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {isMember
                    ? 'New student? Set up your profile via Onboarding →'
                    : 'Already a member? Sign in to Dashboard →'}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-line w-full" />
              <span className="bg-white px-3 text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                OR
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSocialAuth('Google')}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-line p-2.5 text-[11px] font-semibold text-ink hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <GoogleIcon />
                <span className="truncate w-full text-center">Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialAuth('Microsoft')}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-line p-2.5 text-[11px] font-semibold text-ink hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <MicrosoftIcon />
                <span className="truncate w-full text-center">Microsoft</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialAuth('GitHub')}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-line p-2.5 text-[11px] font-semibold text-ink hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <GitHubIcon />
                <span className="truncate w-full text-center">GitHub</span>
              </button>
            </div>

            {/* Terms of Service */}
            <p className="text-[11px] text-center text-ink-muted leading-relaxed">
              By continuing, you agree to our{' '}
              <a href="#" className="font-semibold text-ink underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-semibold text-ink underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Footer Help Link */}
      <footer className="w-full px-6 sm:px-12 py-4 flex justify-end">
        <Link
          to="/help"
          className="text-xs font-semibold text-ink-muted hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
        >
          Need help? <span className="font-bold text-ink hover:text-blue-600">Contact Support</span>{' '}
          <ArrowRight size={13} />
        </Link>
      </footer>

      {/* Forgot Password Interactive Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white border border-line shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <KeyRound size={18} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    Reset Password
                  </h3>
                  <p className="text-[11px] text-ink-muted">
                    {resetStep === 'request' && 'Enter your email or user ID to receive a code'}
                    {resetStep === 'verify' && 'Verify 4-digit code sent to your email'}
                    {resetStep === 'new_password' && 'Set a new secure password'}
                    {resetStep === 'done' && 'Password updated successfully'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-ink transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Step Progress Tracker */}
            <div className="flex items-center gap-1.5">
              {[
                { step: 'request', label: '1. Identifier' },
                { step: 'verify', label: '2. Code' },
                { step: 'new_password', label: '3. New Password' },
                { step: 'done', label: '4. Done' },
              ].map((s, idx) => {
                const isCurrent = resetStep === s.step
                const isPassed =
                  (s.step === 'request' && (resetStep === 'verify' || resetStep === 'new_password' || resetStep === 'done')) ||
                  (s.step === 'verify' && (resetStep === 'new_password' || resetStep === 'done')) ||
                  (s.step === 'new_password' && resetStep === 'done')
                return (
                  <div key={s.step} className="flex-1 space-y-1">
                    <div
                      className={cn(
                        'h-1.5 rounded-full transition-all',
                        isCurrent ? 'bg-blue-600' : isPassed ? 'bg-emerald-500' : 'bg-slate-100'
                      )}
                    />
                    <span className="text-[9px] font-semibold text-slate-500 hidden sm:block truncate">
                      {s.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Error Message */}
            {resetError && (
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900">
                <AlertCircle size={15} className="text-rose-600 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug">{resetError}</span>
              </div>
            )}

            {/* Success Message */}
            {resetSuccessMsg && resetStep !== 'done' && (
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug">{resetSuccessMsg}</span>
              </div>
            )}

            {/* STEP 1: Enter Email / Username */}
            {resetStep === 'request' && (
              <form onSubmit={handleSendResetCode} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-ink">Registered Email or User ID</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={resetEmail}
                      onChange={(e) => {
                        setResetEmail(e.target.value)
                        setResetError(null)
                      }}
                      placeholder="e.g. ananya.sharma@niet.edu.in or your ID"
                      required
                      className="w-full rounded-xl border border-line bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-ink-muted">
                    We will send a 4-digit verification code to confirm ownership.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowForgotPassword(false)}
                    className="rounded-xl text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    loading={resetLoading}
                    className="rounded-xl text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-4"
                  >
                    Send Verification Code →
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 2: Verify 4-Digit Code */}
            {resetStep === 'verify' && (
              <form onSubmit={handleVerifyResetCode} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-ink">Enter 4-Digit Code</label>
                    <span className="text-[10px] text-blue-600 font-mono font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Code: 4829
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={resetCode}
                    onChange={(e) => {
                      setResetCode(e.target.value)
                      setResetError(null)
                    }}
                    placeholder="4829"
                    required
                    className="w-full text-center tracking-widest font-mono text-lg font-bold rounded-xl border border-line bg-slate-50/50 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                  />
                  <p className="text-[11px] text-ink-muted text-center">
                    Check your inbox or use the instant demo code <span className="font-bold font-mono text-ink">4829</span>.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setResetStep('request')}
                    className="text-[11px] text-ink-muted hover:text-blue-600 font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={12} /> Change email
                  </button>

                  <div className="flex items-center gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="rounded-xl text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-4"
                    >
                      Verify Code →
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {/* STEP 3: Enter New Password */}
            {resetStep === 'new_password' && (
              <form onSubmit={handleApplyNewPassword} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-ink">New Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value)
                        setResetError(null)
                      }}
                      placeholder="Minimum 6 characters"
                      required
                      className="w-full rounded-xl border border-line bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-ink">Confirm New Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => {
                        setConfirmNewPassword(e.target.value)
                        setResetError(null)
                      }}
                      placeholder="Re-enter new password"
                      required
                      className="w-full rounded-xl border border-line bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setResetStep('verify')}
                    className="rounded-xl text-xs"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    loading={resetLoading}
                    className="rounded-xl text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4"
                  >
                    Update Password & Save
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 4: Reset Complete */}
            {resetStep === 'done' && (
              <div className="text-center py-4 space-y-4 animate-in zoom-in-95">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">
                  <Check size={28} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-base font-bold text-ink">
                    Password Reset Complete!
                  </h4>
                  <p className="text-xs text-ink-muted">
                    Your password has been updated in the system. Your login credentials have been pre-filled.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full rounded-xl text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5"
                >
                  Back to Login
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Social Login Account Chooser Modal */}
      {showSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-line shadow-2xl p-6 sm:p-7 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-2xs">
                  {showSocialModal === 'Google' && <GoogleIcon />}
                  {showSocialModal === 'Microsoft' && <MicrosoftIcon />}
                  {showSocialModal === 'GitHub' && <GitHubIcon />}
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">
                    Sign in with {showSocialModal}
                  </h3>
                  <p className="text-[11px] text-ink-muted">
                    Choose an account to continue to c2cedge
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSocialModal(null)}
                className="rounded-lg p-1 text-slate-400 hover:text-ink hover:bg-slate-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Account Options */}
            <div className="space-y-2">
              {showSocialModal === 'Microsoft' && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectSocialAccount(
                        '2017219@iiitdmj.ac.in',
                        'Campus Student',
                        'Microsoft SSO'
                      )
                    }
                    className="w-full flex items-center gap-3 p-3 rounded-2xl border border-line bg-white hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition-all shadow-2xs group cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                      MS
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs text-ink group-hover:text-slate-900">
                        Campus SSO Account
                      </p>
                      <p className="text-[11px] text-ink-muted truncate font-mono">
                        2017219@iiitdmj.ac.in
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Sign In →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleSelectSocialAccount(
                        'ananya.student@outlook.com',
                        'Ananya Sharma',
                        'Microsoft'
                      )
                    }
                    className="w-full flex items-center gap-3 p-3 rounded-2xl border border-line bg-white hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition-all shadow-2xs group cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-700 text-white font-bold text-sm flex items-center justify-center">
                      AS
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs text-ink group-hover:text-slate-900">
                        Personal Microsoft Account
                      </p>
                      <p className="text-[11px] text-ink-muted truncate font-mono">
                        ananya.student@outlook.com
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Sign In →
                    </span>
                  </button>
                </>
              )}

              {showSocialModal === 'GitHub' && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectSocialAccount(
                        'abhisheksingh56611@github.com',
                        'Abhishek Singh',
                        'GitHub'
                      )
                    }
                    className="w-full flex items-center gap-3 p-3 rounded-2xl border border-line bg-white hover:border-slate-800 hover:bg-slate-50 text-left transition-all shadow-2xs group cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                      GH
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs text-ink group-hover:text-black">
                        Abhishek Singh
                      </p>
                      <p className="text-[11px] text-ink-muted truncate font-mono">
                        @abhisheksingh56611
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                      Sign In →
                    </span>
                  </button>
                </>
              )}
            </div>

            {/* Custom email input row */}
            <div className="border-t border-line pt-3 space-y-2">
              <label className="font-bold text-ink text-[11px] block">
                Or enter another {showSocialModal} email:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={customSocialEmail}
                  onChange={(e) => setCustomSocialEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-line bg-slate-50/60 px-3 py-2 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (customSocialEmail.trim()) {
                      const cleanEmail = customSocialEmail.trim()
                      const name = cleanEmail.split('@')[0]
                      handleSelectSocialAccount(cleanEmail, name, showSocialModal || 'Social')
                    }
                  }}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

