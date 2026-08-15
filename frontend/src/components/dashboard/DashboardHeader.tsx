import { FiPlus } from 'react-icons/fi'
import { Button } from '../ui/Button'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
  actionLabel?: string
  onActionClick?: () => void
}

export const DashboardHeader = ({ title, subtitle, actionLabel, onActionClick }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary mb-2">{title}👋</h1>
        {subtitle ? <p className="text-sm text-text-secondary">{subtitle}</p> : null}
      </div>
      {actionLabel ? (
        <Button className="px-4 py-3 text-md font-light" onClick={onActionClick}>
          <FiPlus /> {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
