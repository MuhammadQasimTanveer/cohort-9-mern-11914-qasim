import type { Note } from '../../types/note.types'
import { NoteCard } from './NoteCard'

interface NotesListProps {
  notes: Note[]
}

export const NotesList = ({ notes }: NotesListProps) => {
  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <tbody>
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
