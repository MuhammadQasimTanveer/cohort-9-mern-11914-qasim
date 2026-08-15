import { useMemo, useState } from 'react'
import { NotesHeader } from '../components/notes/NotesHeader'
import { NotesList } from '../components/notes/NotesList'
import { mockNotes } from '../data/mockNotes'

export const NotesPage = () => {
  const [notes, setNotes] = useState(mockNotes)
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return notes
    }

    return notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(normalizedQuery) ||
        note.tag.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [notes, query])

  const handleDeleteNote = (noteId: string) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== noteId))
  }

  return (
    <div className="space-y-4">
      <NotesHeader
        query={query}
        viewMode={viewMode}
        onQueryChange={setQuery}
        onViewModeChange={setViewMode}
      />
      <NotesList notes={filteredNotes} viewMode={viewMode} onDeleteNote={handleDeleteNote} />
    </div>
  )
}
