import { useNavigate } from 'react-router-dom'
import { useNotesStore } from '../store/notesStore'

export const useCreateNote = () => {
  const navigate = useNavigate()
  const createNote = useNotesStore((state) => state.createNote)
  const isCreating = useNotesStore((state) => state.isCreating)

  const handleCreateNote = async () => {
    const noteId = await createNote()

    if (noteId) {
      navigate(`/dashboard/notes/${noteId}`)
    }
  }

  return {
    handleCreateNote,
    isCreating,
  }
}
