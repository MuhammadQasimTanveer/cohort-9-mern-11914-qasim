import { FiArrowLeft, FiMoreHorizontal, FiShare2, FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface NotesEditorHeaderProps {
  title: string
  onTitleChange: (value: string) => void
}

export const NotesEditorHeader = ({ title, onTitleChange }: NotesEditorHeaderProps) => {
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
        <span className="hidden sm:inline">Last edited 2h ago</span>
        <button type="button" className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-surface-secondary">
          <FiShare2 /> Share
        </button>
        <button type="button" className="rounded-md p-2 hover:bg-surface-secondary" aria-label="Favorite note">
          <FiStar />
        </button>
        <button type="button" className="rounded-md p-2 hover:bg-surface-secondary" aria-label="More actions">
          <FiMoreHorizontal />
        </button>
      </div>
    </header>
  )
}
