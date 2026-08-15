import { useMemo, useState } from 'react'
import {
  FiBarChart2,
  FiCalendar,
  FiCheckSquare,
  FiFolder,
  FiGrid,
  FiList,
  FiMoreVertical,
  FiPlus,
  FiSearch,
  FiSettings,
  FiTag,
} from 'react-icons/fi'

type TabKey = 'dashboard' | 'notes' | 'tasks' | 'projects' | 'settings'

interface NavItem {
  key: TabKey
  label: string
  icon: React.ReactNode
  isIndented?: boolean
}

interface StatCard {
  label: string
  value: string
  helper: string
}

interface NoteRow {
  title: string
  updatedAt: string
  tag: string
  tagClass: string
}

const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <FiBarChart2 /> },
  { key: 'notes', label: 'Notes', icon: <FiCheckSquare />, isIndented: true },
  { key: 'tasks', label: 'Tasks', icon: <FiCalendar />, isIndented: true },
  { key: 'projects', label: 'Projects', icon: <FiFolder />, isIndented: true },
  { key: 'settings', label: 'Settings', icon: <FiSettings /> },
]

const stats: StatCard[] = [
  { label: 'Notes', value: '128', helper: 'Total notes' },
  { label: 'Tasks', value: '24', helper: 'Pending tasks' },
  { label: 'Projects', value: '5', helper: 'Active projects' },
  { label: 'Ideas', value: '12', helper: 'Unstructured' },
]

const notesData: NoteRow[] = [
  { title: 'Project Roadmap', updatedAt: 'Updated 2h ago', tag: 'Work', tagClass: 'bg-blue-100 text-blue-700' },
  { title: 'Design System Ideas', updatedAt: 'Updated 5h ago', tag: 'Memo', tagClass: 'bg-violet-100 text-violet-700' },
  { title: 'Client Meeting Notes', updatedAt: 'Updated 1d ago', tag: 'Work', tagClass: 'bg-indigo-100 text-indigo-700' },
  { title: 'Personal Goals', updatedAt: 'Updated 2d ago', tag: 'Life', tagClass: 'bg-amber-100 text-amber-700' },
]

const tasksData = [
  { title: 'Review project proposal', due: 'Due today', priority: 'High' },
  { title: 'Update landing page', due: 'Due today', priority: 'Medium' },
  { title: 'Send invoices', due: 'Due tomorrow', priority: 'Low' },
]

const projectsData = [
  { name: 'Website Redesign', status: 'In Progress', owner: 'Design Team' },
  { name: 'Mobile App', status: 'Planning', owner: 'Product Team' },
  { name: 'CRM Migration', status: 'On Hold', owner: 'Engineering' },
]

const EmptyPane = ({ title }: { title: string }) => (
  <div className="rounded-xl border border-border-subtle bg-white p-6">
    <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
    <p className="mt-2 text-sm text-text-secondary">Static placeholder content. API integration can be added next.</p>
  </div>
)

export const WorkspaceDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard')

  const activeLabel = useMemo(() => navItems.find((item) => item.key === activeTab)?.label ?? 'Dashboard', [activeTab])

  return (
    <section className="h-screen grid w-full overflow-hidden bg-white lg:grid-cols-[220px_1fr]">
      <aside className="border-b border-border-subtle bg-surface-secondary p-4 lg:border-b-0 lg:border-r">
        <p className="text-xs font-semibold tracking-wide text-text-muted">MYSTUFF</p>
        <p className="mt-1 text-lg font-semibold text-text-primary">Dashboard</p>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-text-muted">Main</p>
        <div className="mt-2 space-y-1">
          {navItems
            .filter((item) => !item.isIndented)
            .map((item) => {
              const isActive = activeTab === item.key
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveTab(item.key)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )
            })}
        </div>

        <p className="mt-5 pl-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Tools</p>
        <div className="mt-2 space-y-1">
          {navItems
            .filter((item) => item.isIndented)
            .map((item) => {
              const isActive = activeTab === item.key
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveTab(item.key)}
                  className={`ml-3 flex w-[calc(100%-0.75rem)] items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )
            })}
        </div>
      </aside>

      <div className="bg-surface p-4 md:p-6">
        {activeTab === 'dashboard' && (
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">Good morning, Zami</h1>
                <p className="text-sm text-text-secondary">Here&apos;s what&apos;s happening with your workspace today.</p>
              </div>
              <button type="button" className="btn-primary px-3 py-2 text-xs">
                <FiPlus /> New
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article key={stat.label} className="rounded-xl border border-border-subtle p-4">
                  <p className="text-xs text-text-muted">{stat.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-secondary">{stat.helper}</p>
                </article>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
              <article className="rounded-xl border border-border-subtle p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">Recent Notes</h2>
                  <button type="button" className="text-text-muted hover:text-text-primary">
                    <FiMoreVertical />
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {notesData.slice(0, 3).map((note) => (
                    <div key={note.title} className="flex items-center justify-between rounded-lg border border-border-subtle p-3">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{note.title}</p>
                        <p className="text-xs text-text-muted">{note.updatedAt}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${note.tagClass}`}>{note.tag}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-xl border border-border-subtle p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">Today&apos;s Tasks</h2>
                  <button type="button" className="text-text-muted hover:text-text-primary">
                    <FiMoreVertical />
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {tasksData.map((task) => (
                    <div key={task.title} className="flex items-center justify-between rounded-lg border border-border-subtle p-3">
                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-0.5" readOnly />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{task.title}</p>
                          <p className="text-xs text-text-muted">{task.due}</p>
                        </div>
                      </div>
                      <span className="text-xs text-text-secondary">{task.priority}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl font-semibold text-text-primary">Notes</h1>
              <button type="button" className="btn-primary px-3 py-2 text-xs">
                <FiPlus /> Add Note
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-border-subtle p-4">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]">
                <div className="flex items-center gap-2 rounded-lg border border-border-subtle px-3 py-2">
                  <FiSearch className="text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    className="w-full bg-transparent text-sm text-text-primary outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" className="rounded-lg border border-border-subtle px-3 py-2 text-xs text-text-secondary hover:bg-surface-secondary">
                    <FiTag className="inline" /> Tags
                  </button>
                  <button type="button" className="rounded-lg border border-border-subtle px-3 py-2 text-xs text-text-secondary hover:bg-surface-secondary">
                    <FiCalendar className="inline" /> Date Modified
                  </button>
                  <button type="button" className="rounded-lg border border-border-subtle p-2 text-text-secondary hover:bg-surface-secondary">
                    <FiGrid />
                  </button>
                  <button type="button" className="rounded-lg border border-border-subtle p-2 text-text-secondary hover:bg-surface-secondary">
                    <FiList />
                  </button>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2 text-left">
                  <thead>
                    <tr className="text-xs text-text-muted">
                      <th className="px-2 py-1 font-medium">Title</th>
                      <th className="px-2 py-1 font-medium">Updated</th>
                      <th className="px-2 py-1 font-medium">Tag</th>
                      <th className="px-2 py-1 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notesData.map((note) => (
                      <tr key={note.title} className="rounded-lg border border-border-subtle bg-surface-secondary">
                        <td className="px-2 py-3">
                          <div className="flex items-center gap-2">
                            <FiCheckSquare className="text-text-muted" />
                            <span className="text-sm font-medium text-text-primary">{note.title}</span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-sm text-text-secondary">{note.updatedAt}</td>
                        <td className="px-2 py-3">
                          <span className={`rounded-full px-2 py-1 text-xs font-medium ${note.tagClass}`}>{note.tag}</span>
                        </td>
                        <td className="px-2 py-3 text-right">
                          <button
                            type="button"
                            className="rounded-md p-2 text-text-secondary hover:bg-surface-tertiary hover:text-text-primary"
                            aria-label="Open note actions: edit, delete, share"
                            title="Actions: Edit, Delete, Share"
                          >
                            <FiMoreVertical className="inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">Tasks</h1>
            <p className="mb-4 text-sm text-text-secondary">Simple static tasks view.</p>
            <div className="space-y-3">
              {tasksData.map((task) => (
                <article key={task.title} className="rounded-xl border border-border-subtle p-4">
                  <p className="text-sm font-semibold text-text-primary">{task.title}</p>
                  <p className="text-xs text-text-secondary">{task.due}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">Projects</h1>
            <p className="mb-4 text-sm text-text-secondary">Simple static projects view.</p>
            <div className="space-y-3">
              {projectsData.map((project) => (
                <article key={project.name} className="rounded-xl border border-border-subtle p-4">
                  <p className="text-sm font-semibold text-text-primary">{project.name}</p>
                  <p className="text-xs text-text-secondary">{project.status} - {project.owner}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && <EmptyPane title={activeLabel} />}
      </div>
    </section>
  )
}
