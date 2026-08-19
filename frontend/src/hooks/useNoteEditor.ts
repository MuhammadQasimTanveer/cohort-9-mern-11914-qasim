import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useDebouncedAutoSave } from './useDebouncedAutoSave'
import { useNotesStore, type NoteSavePayload } from '../store/notesStore'
import { formatRelativeUpdatedAt } from '../lib/noteHelpers'

export const useNoteEditor = () => {
  const { noteId } = useParams()
  const navigate = useNavigate()
  const [isDetailsOpen, setIsDetailsOpen] = useState(true)

  const editor = useNotesStore((state) => state.editor)
  const savePayload = useNotesStore(
    useShallow((state) => ({
      title: state.editor.title,
      content: state.editor.content,
      tag: state.editor.tag,
    })),
  )
  const loadNote = useNotesStore((state) => state.loadNote)
  const initNewNote = useNotesStore((state) => state.initNewNote)
  const saveNote = useNotesStore((state) => state.saveNote)
  const setActiveNoteId = useNotesStore((state) => state.setActiveNoteId)
  const setTitle = useNotesStore((state) => state.setTitle)
  const setTag = useNotesStore((state) => state.setTag)
  const setContent = useNotesStore((state) => state.setContent)
  const resetEditor = useNotesStore((state) => state.resetEditor)

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId)
      loadNote(noteId)
      return
    }

    initNewNote()
  }, [noteId, loadNote, initNewNote, setActiveNoteId])

  useEffect(() => {
    return () => resetEditor()
  }, [resetEditor])

  const handleSave = useCallback(
    async (payload: NoteSavePayload) => {
      const savedNoteId = await saveNote(payload)

      if (savedNoteId && !noteId) {
        navigate(`/dashboard/notes/${savedNoteId}`, { replace: true })
      }
    },
    [saveNote, noteId, navigate],
  )

  const { saveStatus, lastSavedAt } = useDebouncedAutoSave({
    data: savePayload,
    onSave: handleSave,
    delay: 1500,
    enabled: !editor.isLoading && !editor.loadError,
    resetKey: noteId ?? 'new',
  })

  const lastEdited = formatRelativeUpdatedAt(lastSavedAt ?? editor.updatedAt)

  const handleContentChange = (content: Record<string, unknown>, plainText: string) => {
    setContent(content, plainText)
  }

  return {
    editor,
    saveStatus,
    lastEdited,
    isDetailsOpen,
    setIsDetailsOpen,
    setTitle,
    setTag,
    handleContentChange,
  }
}
