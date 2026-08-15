import { FiBookOpen } from 'react-icons/fi'
import type { Note } from '../../types/note.types'
import { NoteActionsDropdown } from './NoteActionsDropdown'

interface NoteCardProps {
  note: Note
}

const tagClasses: Record<string, string> = {
  Work: 'bg-blue-100 text-blue-700',
  Memo: 'bg-violet-100 text-violet-700',
  Life: 'bg-amber-100 text-amber-700',
  Study: 'bg-emerald-100 text-emerald-700',
}

export const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <tr className="flex justify-between cursor-pointer border-b border-border-subtle mb-4">
      <td className="flex justify-start items-center py-3 gap-3">
        <FiBookOpen className="w-12 h-12 rounded-lg text-xs bg-surface-secondary text-text-muted p-3.5" />
        <div className="flex flex-col items-start gap-1">
          <div className='space-x-2'>
            <span className="text-lg font-medium text-text-primary">{note.title}</span>
            <span className={`rounded-lg px-2 py-0.5 text-xs font-medium ${tagClasses[note.tag] ?? 'bg-slate-100 text-slate-700'}`}>
              {note.tag}
            </span>
          </div>
          <td className="text-xs text-text-muted">{note.updatedAt}</td>
        </div>
      </td>
      <td className="px-2 py-3">
        <NoteActionsDropdown />
      </td>
    </tr>
  )
}
