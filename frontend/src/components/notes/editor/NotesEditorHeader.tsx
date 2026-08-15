import { FiArrowLeft, FiMoreHorizontal } from 'react-icons/fi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BiCheckDouble } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import type { SaveStatus } from '../../../hooks/useDebouncedAutoSave'

interface NotesEditorHeaderProps {
  title: string
  onTitleChange: (value: string) => void
  lastEdited?: string
  saveStatus: SaveStatus
}

export const NotesEditorHeader = ({
  title,
  onTitleChange,
  lastEdited,
  saveStatus,
}: NotesEditorHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/dashboard/notes" className="rounded-md p-2 text-text-secondary hover:bg-surface-secondary hover:text-text-primary">
          <FiArrowLeft />
        </Link>
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
        ) :  <span className="flex items-center gap-1 rounded-md px-2 py-1 text-emerald-6  00">
              <BiCheckDouble />
              Saved
            </span>
        }

        <button type="button" className="rounded-md p-2 hover:bg-surface-secondary" aria-label="More actions">
          <FiMoreHorizontal />
        </button>
      </div>
    </header>
  )
}
