import { NotesHeader } from '../components/notes/NotesHeader'
import { NotesList } from '../components/notes/NotesList'
import { useNotesList } from '../hooks/useNotesList'

export const NotesPage = () => {
  const { notes, listLoading, query, viewMode, setQuery, setViewMode, deleteNote } = useNotesList()

  return (
    <div className="space-y-4">
      <NotesHeader
        query={query}
        viewMode={viewMode}
        onQueryChange={setQuery}
        onViewModeChange={setViewMode}
      />

      {listLoading ? (
        <p className="text-sm text-text-muted">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-sm text-text-muted">No notes found.</p>
      ) : (
        <NotesList notes={notes} viewMode={viewMode} onDeleteNote={deleteNote} />
      )}
    </div>
  )
}
