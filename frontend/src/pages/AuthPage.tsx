import { useState } from 'react'
import { LoginForm } from '../components/auth/LoginForm'
import { SignupForm } from '../components/auth/SignupForm'
import { Button } from '../components/ui/Button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

type AuthTab = 'login' | 'signup'

export const AuthPage = () => {
  const [tab, setTab] = useState<AuthTab>('signup')

  return (
    <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
      <div className="card w-full max-w-md p-8">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-text-primary rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="font-semibold text-sm">mystuff</span>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            {tab === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {tab === 'signup'
              ? 'Start organizing your ideas and tasks.'
              : 'Login to your account.'}
          </p>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <Button variant="social" leftIcon={<FcGoogle size={18} />}>
            Continue with Google
          </Button>
          <Button variant="social" leftIcon={<FaGithub size={18} />}>
            Continue with GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="divider mb-6">or</div>

        {/* Form */}
        {tab === 'login' ? <LoginForm /> : <SignupForm />}

        {/* Tab Switch */}
        <p className="text-center text-sm text-text-secondary mt-6">
          {tab === 'login' ? (
            <>Don't have an account?{' '}
              <button onClick={() => setTab('signup')}
                className="text-primary font-medium hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button onClick={() => setTab('login')}
                className="text-primary font-medium hover:underline">
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}