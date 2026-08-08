import { ForgotForm } from "../components/auth/ForgotForm"

export const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="card w-full max-w-md p-8">
            <div className="mb-10 text-center">
            <h1 className="text-2xl font-semibold mb-2">
                Forgot Password
            </h1>
            <p className="text-sm text-text-secondary mt-1">
                Enter your email and we'll send you a link to reset the password.
            </p>
            </div>
            <ForgotForm />
        </div>
    </div>
  )
}