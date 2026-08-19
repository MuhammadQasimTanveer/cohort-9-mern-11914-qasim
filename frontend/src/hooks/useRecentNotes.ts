import { useEffect, useMemo } from 'react'
import { useNotesStore } from '../store/notesStore'

export const useRecentNotes = (limit = 3) => {
  const notes = useNotesStore((state) => state.notes)
  const fetchNotes = useNotesStore((state) => state.fetchNotes)

  const recentNotes = useMemo(() => notes.slice(0, limit), [notes, limit])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  return { recentNotes }
}
