import type { DashboardStat } from '../../types/note.types'

interface StatCardProps {
  stat: DashboardStat
}

export const StatCard = ({ stat }: StatCardProps) => {

  const Icon = stat.Icon;

  return (
    <article className="flex justify-between items-center rounded-xl border border-border-subtle bg-white px-4 py-6">
      <div className='space-y-2'>
        <p className="text-xs text-text-muted">{stat.label}</p>
        <p className="mt-1 text-4xl font-semibold text-text-primary">{stat.value}</p>
        <p className="text-xs text-text-secondary">{stat.helper}</p>
      </div>
      <Icon className="text-xl text-text-muted p-2 w-10 h-10 rounded-sm" />
    </article>
  )
}
