import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/helpers'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className, ...props }, ref) => {
    return (
      <div className="form-field">
        {label && <label className="form-label">{label}</label>}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'input',
              leftIcon && 'pl-9',
              error && 'input-error',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="form-error">{error}</p>}
      </div>
    )
  }
)