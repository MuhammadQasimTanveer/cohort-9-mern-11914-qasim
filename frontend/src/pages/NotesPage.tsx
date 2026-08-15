import { NotesHeader } from '../components/notes/NotesHeader'
import { NotesList } from '../components/notes/NotesList'
import { NotesToolbar } from '../components/notes/NotesToolbar'
import { mockNotes } from '../data/mockNotes'

export const NotesPage = () => {
  return (
    <div className="space-y-4">
      <NotesHeader />
      <NotesToolbar />
      <NotesList notes={mockNotes} />
    </div>
  )
}
