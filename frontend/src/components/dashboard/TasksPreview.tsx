import { FiMoreVertical } from 'react-icons/fi'
import type { TaskPreviewItem } from '../../types/note.types'

interface TasksPreviewProps {
  tasks: TaskPreviewItem[]
}

export const TasksPreview = ({ tasks }: TasksPreviewProps) => {
  return (
    <article className="rounded-xl border border-border-subtle bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Today's Tasks</h2>
        <button type="button" className="text-text-muted hover:text-text-primary" aria-label="More task actions">
          <FiMoreVertical />
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 rounded-lg border border-border-subtle p-3">
            <input type="checkbox" readOnly className="mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary">{task.title}</p>
              <p className="text-xs text-text-secondary">{task.due}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
