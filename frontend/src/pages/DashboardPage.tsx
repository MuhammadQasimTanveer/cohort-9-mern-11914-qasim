import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { DashboardStats } from '../components/dashboard/DashboardStats'
import { RecentNotes } from '../components/dashboard/RecentNotes'
import { TasksPreview } from '../components/dashboard/TasksPreview'
import { mockRecentNotes, mockStats, mockTasks } from '../data/mockStats'

export const DashboardPage = () => {
  return (
    <div className="space-y-10">
      <DashboardHeader
        title="Good morning, Zami"
        subtitle="Here's what's happening with your workspace today."
        actionLabel="New"
      />
      <DashboardStats stats={mockStats} />
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RecentNotes notes={mockRecentNotes} />
        <TasksPreview tasks={mockTasks} />
      </section>
    </div>
  )
}
