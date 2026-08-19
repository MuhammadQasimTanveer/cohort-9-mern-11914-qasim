import { FiArrowLeft, FiMoreHorizontal } from 'react-icons/fi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BiCheckDouble } from 'react-icons/bi'
import type { SaveStatus } from '../../../hooks/useDebouncedAutoSave'
import { Button } from '../../ui/Button'

interface NotesEditorHeaderProps {
  title: string
  onTitleChange: (value: string) => void
  lastEdited?: string
  saveStatus: SaveStatus
  autosaveEnabled: boolean
  hasUnsavedChanges: boolean
  onBack: () => void
  onManualSave: () => void
  isManualSaveLoading: boolean
}

export const NotesEditorHeader = ({
  title,
  onTitleChange,
  lastEdited,
  saveStatus,
  autosaveEnabled,
  hasUnsavedChanges,
  onBack,
  onManualSave,
  isManualSaveLoading,
}: NotesEditorHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md p-2 text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
          aria-label="Back to notes"
        >
          <FiArrowLeft />
        </button>
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          className="min-w-[220px] border-none bg-transparent text-lg font-semibold text-text-primary outline-none"
        />
      </div>

      <div className="flex items-center gap-3 text-sm text-text-secondary">
        <span className="hidden sm:inline">{lastEdited ?? 'Last edited just now'}</span>

        {saveStatus === 'saving' ? (
          <span className="flex items-center gap-1 rounded-md px-2 py-1">
            <AiOutlineLoading3Quarters className="animate-spin" />
            Saving
          </span>
        ) : saveStatus === 'saved' ? (
          <span className="flex items-center gap-1 rounded-md px-2 py-1 text-emerald-600">
              <BiCheckDouble />
              Saved
            </span>
        ) 
       : null}

        {!autosaveEnabled ? (
          <Button
            type="button"
            onClick={onManualSave}
            isLoading={isManualSaveLoading}
            disabled={!hasUnsavedChanges}
            className="px-3 py-2"
          >
            Save
          </Button>
        ) : null}

        <button type="button" className="rounded-md p-2 hover:bg-surface-secondary" aria-label="More actions">
          <FiMoreHorizontal />
        </button>
      </div>
    </header>
  )
}
