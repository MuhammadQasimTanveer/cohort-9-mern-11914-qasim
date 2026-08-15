import { Button } from "../components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

type AuthMode = "login" | "signup";

interface AuthLayoutProps {
  mode: AuthMode;
  children: React.ReactNode;
}

export const AuthLayout = ({ mode, children }: AuthLayoutProps) => {
  const isSignup = mode === "signup";

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="card w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <img src={logo} alt="web-logo" width="28px" />
          <span className="font-semibold text-lg">mystuff</span>
        </div>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {isSignup
              ? "Start organizing your ideas and tasks."
              : "Login to your account."}
          </p>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <Button variant="social" leftIcon={<FcGoogle size={18} />}>
            Continue with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="divider mb-6">or</div>

        {/* Form - Signup/Login */}
        {children}

        {/* Tab Switch */}
        <p className="text-center text-sm text-text-secondary mt-6">
          {isSignup ? 
          (
            <>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </>
          )
          :
          (
            <>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </>
          ) }
        </p>
      </div>
    </div>
  );
};
