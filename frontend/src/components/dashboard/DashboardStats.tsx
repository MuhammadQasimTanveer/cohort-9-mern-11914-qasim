import type { DashboardStat } from '../../types/note.types'
import { StatCard } from './StatCard'

interface DashboardStatsProps {
  stats: DashboardStat[]
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </section>
  )
}
