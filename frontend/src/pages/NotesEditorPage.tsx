import { FiSidebar } from 'react-icons/fi'
import { NotesDetailsPanel } from '../components/notes/editor/NotesDetailsPanel'
import { NotesEditorCanvas } from '../components/notes/editor/NotesEditorCanvas'
import { NotesEditorHeader } from '../components/notes/editor/NotesEditorHeader'
import { useNoteEditor } from '../hooks/useNoteEditor'
import { useSettingsStore } from '../store/settingsStore'

export const NotesEditorPage = () => {
  const showWordCount = useSettingsStore((state) => state.showWordCount)
  const {
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
          autosaveEnabled={autosaveEnabled}
          hasUnsavedChanges={hasUnsavedChanges}
          onBack={handleBack}
          onManualSave={handleManualSave}
          isManualSaveLoading={isManualSaving}
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
              showWordCount={showWordCount}
            />
          ) : null}
        </div>

        {!isDetailsOpen ? (
          <div className="absolute right-6 top-16">
            <button
              type="button"
              onClick={() => setIsDetailsOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm text-text-secondary cursor-pointer hover:bg-surface-secondary"
            >
              <FiSidebar /> Open Details Panel
            </button>
          </div>
        ) : null}
      </div>

      {isExitPromptOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl border border-border-subtle bg-surface p-5 shadow-lg">
            <h3 className="text-base font-semibold text-text-primary">Unsaved changes</h3>
            <p className="mt-2 text-sm text-text-secondary">
              You have unsaved note changes. Save before leaving?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsExitPromptOpen(false)}
                className="rounded-lg border border-border-subtle px-3 py-2 text-sm text-text-secondary hover:bg-surface-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAndExit}
                disabled={isSavingBeforeExit}
                className="rounded-lg bg-primary px-3 py-2 text-sm text-white disabled:opacity-60"
              >
                {isSavingBeforeExit ? 'Saving...' : 'Save & Exit'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
