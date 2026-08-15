import type { Note } from '../../types/note.types'
import { NoteCard } from './NoteCard'

interface NotesListProps {
  notes: Note[]
  viewMode: 'grid' | 'list'
  onDeleteNote: (noteId: string) => void
}

export const NotesList = ({ notes, viewMode, onDeleteNote }: NotesListProps) => {
  return (
    <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3' : 'space-y-3'}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} viewMode={viewMode} onDelete={onDeleteNote} />
      ))}
    </div>
  )
}
