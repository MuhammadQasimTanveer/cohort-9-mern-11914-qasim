import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { DashboardStats } from '../components/dashboard/DashboardStats'
import { RecentNotes } from '../components/dashboard/RecentNotes'
import { useCreateNote } from '../hooks/useCreateNote'
import { useDashboardStats } from '../hooks/useDashboardStats'
import { useRecentNotes } from '../hooks/useRecentNotes'
import { getFirstName } from '../lib/userHelpers'
import { useAuthStore } from '../store/authStore'

export const DashboardPage = () => {
  const user = useAuthStore((state) => state.user)
  const { recentNotes } = useRecentNotes()
  const stats = useDashboardStats()
  const { handleCreateNote, isCreating } = useCreateNote()
  const firstName = getFirstName(user?.fullName)

  return (
    <div className="space-y-10">
      <DashboardHeader
        title={`Good morning, ${firstName} 👋`}
        subtitle="Here's what's happening with your workspace today."
        actionLabel="New"
        onActionClick={handleCreateNote}
        isActionLoading={isCreating}
      />
      <DashboardStats stats={stats} />
      <section className="grid grid-cols-1">
        <RecentNotes notes={recentNotes} />
        {/* <TasksPreview tasks={mockTasks} /> */}
      </section>
    </div>
  )
}
