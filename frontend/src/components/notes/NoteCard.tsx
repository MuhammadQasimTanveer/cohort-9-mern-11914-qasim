import { FiBookOpen } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import type { Note } from '../../types/note.types'
import { formatRelativeUpdatedAt } from '../../lib/noteHelpers'
import { NoteActionsDropdown } from './NoteActionsDropdown'

interface NoteCardProps {
  note: Note
  viewMode: 'grid' | 'list'
  onDelete: (noteId: string) => void
}

const tagClasses: Record<string, string> = {
  Work: 'bg-blue-100 text-blue-700',
  Memo: 'bg-violet-100 text-violet-700',
  Life: 'bg-amber-100 text-amber-700',
  Study: 'bg-emerald-100 text-emerald-700',
}

export const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  const navigate = useNavigate()

  const handleOpenNote = () => {
    navigate(`/dashboard/notes/${note.id}`)
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleOpenNote}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleOpenNote()
        }
      }}
      className="flex cursor-pointer justify-between items-center rounded-xl border border-border-subtle bg-surface-primary p-4 transition-colors hover:bg-surface-secondary/50"
    >
      <div className="flex items-center gap-3">
        <FiBookOpen className="h-12 w-12 rounded-lg bg-surface-secondary p-3.5 text-xs text-text-muted" />
        <div className="flex flex-col items-start gap-1">
          <div className="space-x-2">
            <span className="text-lg font-medium text-text-primary">{note.title}</span>
            {note.tag ? (
              <span
                className={`rounded-lg px-2 py-0.5 text-xs font-medium ${tagClasses[note.tag] ?? 'bg-slate-100 text-slate-700'}`}
              >
                {note.tag}
              </span>
            ) : null}
          </div>
          <span className="text-xs text-text-muted">{formatRelativeUpdatedAt(note.updatedAt)}</span>
        </div>
      </div>
      <div className="shrink-0">
        <NoteActionsDropdown
          onEdit={() => navigate(`/dashboard/notes/${note.id}`)}
          onDelete={() => onDelete(note.id)}
        />
      </div>
    </article>
  )
}
