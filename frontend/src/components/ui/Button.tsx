import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/helpers'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'social'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  isLoading?: boolean
  leftIcon?: React.ReactNode
}

export const Button = ({
  variant = 'primary',
  isLoading,
  leftIcon,
  children,
  className,
  ...props
}: ButtonProps) => {
    
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    social: 'btn-social',
  }[variant]

  return (
    <button
      className={cn(variantClass, className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Spinner /> : leftIcon}
      {children}
    </button>
  )
}

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10"
      stroke="currentColor" strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
)