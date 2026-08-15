import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { mockProjects } from '../data/mockStats'

export const ProjectsPage = () => {
  return (
    <div className="space-y-4">
      <DashboardHeader title="Projects" subtitle="Static projects list for now. API can be integrated next." actionLabel="Add Project" />
      <div className="space-y-3">
        {mockProjects.map((project) => (
          <article key={project.id} className="rounded-xl border border-border-subtle bg-white p-4">
            <p className="text-sm font-semibold text-text-primary">{project.name}</p>
            <p className="text-xs text-text-secondary">{project.status} - {project.owner}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
