import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { mockTasks } from '../data/mockStats'

export const TasksPage = () => {
  return (
    <div className="space-y-4">
      <DashboardHeader title="Tasks" subtitle="Static task list for now. API can be integrated next." actionLabel="Add Task" />
      <div className="space-y-3">
        {mockTasks.map((task) => (
          <article key={task.id} className="rounded-xl border border-border-subtle bg-white p-4">
            <p className="text-sm font-semibold text-text-primary">{task.title}</p>
            <p className="text-xs text-text-secondary">{task.due}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
