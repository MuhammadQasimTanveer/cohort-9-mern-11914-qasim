import { FiMoreVertical } from 'react-icons/fi'
import type { Note } from '../../types/note.types'

interface RecentNotesProps {
  notes: Note[]
}

const tagClasses: Record<string, string> = {
  Work: 'bg-blue-100 text-blue-700',
  Memo: 'bg-violet-100 text-violet-700',
  Life: 'bg-amber-100 text-amber-700',
  Study: 'bg-emerald-100 text-emerald-700',
}

export const RecentNotes = ({ notes }: RecentNotesProps) => {
  return (
    <article className="rounded-xl border border-border-subtle bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Recent Notes</h2>
        <button type="button" className="text-text-muted hover:text-text-primary" aria-label="More note actions">
          <FiMoreVertical />
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {notes.map((note) => (
          <div key={note.id} className="flex items-center justify-between p-3 ps-0">
            <div>
              <p className="text-sm font-medium text-text-primary">{note.title}</p>
              <p className="text-xs text-text-muted">{note.updatedAt}</p>
            </div>
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${tagClasses[note.tag] ?? 'bg-slate-100 text-slate-700'}`}>
              {note.tag}
            </span>
          </div>
        ))}
      </div>
    </article>
  )
}
