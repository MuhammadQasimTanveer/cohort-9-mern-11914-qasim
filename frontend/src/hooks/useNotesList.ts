import { useEffect, useMemo } from 'react'
import { useNotesStore } from '../store/notesStore'

export const useNotesList = () => {
  const notes = useNotesStore((state) => state.notes)
  const query = useNotesStore((state) => state.query)
  const listLoading = useNotesStore((state) => state.listLoading)
  const viewMode = useNotesStore((state) => state.viewMode)
  const fetchNotes = useNotesStore((state) => state.fetchNotes)
  const deleteNote = useNotesStore((state) => state.deleteNote)
  const setQuery = useNotesStore((state) => state.setQuery)
  const setViewMode = useNotesStore((state) => state.setViewMode)

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return notes
    }

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(normalizedQuery) ||
        note.tag.toLowerCase().includes(normalizedQuery),
    )
  }, [notes, query])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  return {
    notes: filteredNotes,
    listLoading,
    query,
    viewMode,
    setQuery,
    setViewMode,
    deleteNote,
  }
}
