import { useState } from 'react'
import { FiSidebar } from 'react-icons/fi'
import { NotesDetailsPanel } from '../components/notes/editor/NotesDetailsPanel'
import { NotesEditorCanvas } from '../components/notes/editor/NotesEditorCanvas'
import { NotesEditorHeader } from '../components/notes/editor/NotesEditorHeader'

export const NotesEditorPage = () => {
  const [title, setTitle] = useState('Project Roadmap')
  const [isDetailsOpen, setIsDetailsOpen] = useState(true)

  return (
    <div className="min-h-screen p-4 bg-surface">
      <div className="mx-auto w-full space-y-4">
        <NotesEditorHeader title={title} onTitleChange={setTitle} />

        <div className="flex items-start gap-4">
          <div className={`transition-all duration-200 ${isDetailsOpen ? 'w-full xl:w-[calc(100%-336px)]' : 'mx-auto w-full max-w-4xl'}`}>
            <NotesEditorCanvas />
          </div>

          {isDetailsOpen ? <NotesDetailsPanel isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} /> : null}
        </div>

        {!isDetailsOpen ? (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsDetailsOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border-subtle bg-white px-3 py-2 text-sm text-text-secondary hover:bg-surface"
            >
              <FiSidebar /> Open Details Panel
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
