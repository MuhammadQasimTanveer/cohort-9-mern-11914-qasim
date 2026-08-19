import { FiSidebar } from 'react-icons/fi'
import { NotesDetailsPanel } from '../components/notes/editor/NotesDetailsPanel'
import { NotesEditorCanvas } from '../components/notes/editor/NotesEditorCanvas'
import { NotesEditorHeader } from '../components/notes/editor/NotesEditorHeader'
import { useNoteEditor } from '../hooks/useNoteEditor'

export const NotesEditorPage = () => {
  const {
    editor,
    saveStatus,
    lastEdited,
    isDetailsOpen,
    setIsDetailsOpen,
    setTitle,
    setTag,
    handleContentChange,
  } = useNoteEditor()

  if (editor.isLoading) {
    return (
      <div className="min-h-screen p-4 bg-surface">
        <p className="text-sm text-text-muted">Loading note...</p>
      </div>
    )
  }

  if (editor.loadError) {
    return (
      <div className="min-h-screen p-4 bg-surface">
        <p className="text-sm text-red-600">{editor.loadError}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 bg-surface">
      <div className="mx-auto w-full space-y-4">
        <NotesEditorHeader
          title={editor.title}
          onTitleChange={setTitle}
          lastEdited={lastEdited}
          saveStatus={saveStatus}
        />

        <div className="flex items-start gap-4">
          <div
            className={`transition-all duration-200 ${isDetailsOpen ? 'w-full xl:w-[calc(100%-336px)]' : 'mx-auto w-full max-w-4xl'}`}
          >
            <NotesEditorCanvas
              content={editor.content}
              onContentChange={handleContentChange}
            />
          </div>

          {isDetailsOpen ? (
            <NotesDetailsPanel
              isOpen={isDetailsOpen}
              onClose={() => setIsDetailsOpen(false)}
              tag={editor.tag}
              onTagChange={setTag}
              createdAt={editor.createdAt}
              updatedAt={editor.updatedAt}
              plainText={editor.plainText}
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
