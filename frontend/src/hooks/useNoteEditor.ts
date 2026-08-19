import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useDebouncedAutoSave } from './useDebouncedAutoSave'
import { useNotesStore, type NoteSavePayload } from '../store/notesStore'
import { formatRelativeUpdatedAt } from '../lib/noteHelpers'
import { useSettingsStore } from '../store/settingsStore'

export const useNoteEditor = () => {
  const { noteId } = useParams()
  const navigate = useNavigate()
  const [isDetailsOpen, setIsDetailsOpen] = useState(true)
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState('')
  const [isManualSaving, setIsManualSaving] = useState(false)
  const [isExitPromptOpen, setIsExitPromptOpen] = useState(false)
  const [isSavingBeforeExit, setIsSavingBeforeExit] = useState(false)
  const autosaveEnabled = useSettingsStore((state) => state.autosaveEnabled)

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
      setLastSavedSnapshot(JSON.stringify(payload))

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
    enabled: autosaveEnabled && !editor.isLoading && !editor.loadError,
    resetKey: noteId ?? 'new',
  })

  useEffect(() => {
    if (editor.isLoading) {
      return
    }

    const snapshot = JSON.stringify({
      title: editor.title,
      content: editor.content,
      tag: editor.tag,
    })

    setLastSavedSnapshot(snapshot)
  }, [editor.activeNoteId, editor.isLoading])

  const currentSnapshot = JSON.stringify(savePayload)
  const hasUnsavedChanges = currentSnapshot !== lastSavedSnapshot
  const lastEdited = formatRelativeUpdatedAt(lastSavedAt ?? editor.updatedAt)

  const handleContentChange = (content: Record<string, unknown>, plainText: string) => {
    setContent(content, plainText)
  }

  const handleManualSave = useCallback(async () => {
    if (!hasUnsavedChanges) {
      return
    }

    setIsManualSaving(true)
    try {
      await handleSave(savePayload as NoteSavePayload)
    } finally {
      setIsManualSaving(false)
    }
  }, [hasUnsavedChanges, handleSave, savePayload])

  const handleBack = useCallback(() => {
    if (hasUnsavedChanges) {
      setIsExitPromptOpen(true)
      return
    }

    navigate('/dashboard/notes')
  }, [hasUnsavedChanges, navigate])

  const handleSaveAndExit = useCallback(async () => {
    setIsSavingBeforeExit(true)
    try {
      await handleSave(savePayload as NoteSavePayload)
      setIsExitPromptOpen(false)
      navigate('/dashboard/notes')
    } finally {
      setIsSavingBeforeExit(false)
    }
  }, [handleSave, navigate, savePayload])

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) {
        return
      }

      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  return {
    editor,
    saveStatus,
    autosaveEnabled,
    hasUnsavedChanges,
    lastEdited,
    isManualSaving,
    isDetailsOpen,
    isExitPromptOpen,
    isSavingBeforeExit,
    setIsDetailsOpen,
    setIsExitPromptOpen,
    setTitle,
    setTag,
    handleBack,
    handleManualSave,
    handleSaveAndExit,
    handleContentChange,
  }
}
