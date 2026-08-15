import { useCallback, useMemo, useState } from 'react'
import { FiSidebar } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { NotesDetailsPanel } from '../components/notes/editor/NotesDetailsPanel'
import { NotesEditorCanvas } from '../components/notes/editor/NotesEditorCanvas'
import { NotesEditorHeader } from '../components/notes/editor/NotesEditorHeader'
import { getNoteById } from '../data/mockNotes'
import { useDebouncedAutoSave } from '../hooks/useDebouncedAutoSave'
import {
  emptyNoteContent,
  formatRelativeUpdatedAt,
  getPlainTextFromContent,
} from '../lib/noteHelpers'

interface NoteSavePayload {
  title: string
  content: Record<string, unknown>
  tag: string
}

const saveNote = async (payload: NoteSavePayload) => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 800)
  })

  // Placeholder for future API integration.
  void payload
}

export const NotesEditorPage = () => {
  const { noteId } = useParams()
  const existingNote = noteId ? getNoteById(noteId) : undefined

  const initialContent = useMemo(
    () => existingNote?.content ?? emptyNoteContent(),
    [existingNote],
  )

  const [title, setTitle] = useState(existingNote?.title ?? 'Untitled Note')
  const [tag, setTag] = useState(existingNote?.tag ?? '')
  const [content, setContent] = useState<Record<string, unknown>>(initialContent)
  const [plainText, setPlainText] = useState(() => getPlainTextFromContent(initialContent))
  const [isDetailsOpen, setIsDetailsOpen] = useState(true)
  const [createdAt] = useState(existingNote?.createdAt ?? new Date().toISOString())
  const [updatedAt, setUpdatedAt] = useState(existingNote?.updatedAt ?? new Date().toISOString())

  const savePayload = useMemo(
    () => ({ title, content, tag }),
    [title, content, tag],
  )

  const handleSave = useCallback(async (payload: NoteSavePayload) => {
    await saveNote(payload)
    setUpdatedAt(new Date().toISOString())
  }, [])

  const { saveStatus, lastSavedAt } = useDebouncedAutoSave({
    data: savePayload,
    onSave: handleSave,
    delay: 1500,
  })

  const lastEdited = formatRelativeUpdatedAt(lastSavedAt ?? updatedAt)

  const handleContentChange = (nextContent: Record<string, unknown>, nextPlainText: string) => {
    setContent(nextContent)
    setPlainText(nextPlainText)
  }

  return (
    <div className="min-h-screen p-4 bg-surface">
      <div className="mx-auto w-full space-y-4">
        <NotesEditorHeader
          title={title}
          onTitleChange={setTitle}
          lastEdited={lastEdited}
          saveStatus={saveStatus}
        />

        <div className="flex items-start gap-4">
          <div className={`transition-all duration-200 ${isDetailsOpen ? 'w-full xl:w-[calc(100%-336px)]' : 'mx-auto w-full max-w-4xl'}`}>
            <NotesEditorCanvas content={content} onContentChange={handleContentChange} />
          </div>

          {isDetailsOpen ? (
            <NotesDetailsPanel
              isOpen={isDetailsOpen}
              onClose={() => setIsDetailsOpen(false)}
              tag={tag}
              onTagChange={setTag}
              createdAt={createdAt}
              updatedAt={updatedAt}
              plainText={plainText}
            />
          ) : null}
        </div>

        {!isDetailsOpen ? (
          <div className="absolute right-6 top-16">
            <button
              type="button"
              onClick={() => setIsDetailsOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border-subtle bg-white px-3 py-2 text-sm text-text-secondary cursor-pointer hover:bg-surface"
            >
              <FiSidebar /> Open Details Panel
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
