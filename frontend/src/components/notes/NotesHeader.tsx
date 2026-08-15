import { FiGrid, FiList, FiPlus, FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { cn } from '../../lib/helpers'

type NotesViewMode = 'grid' | 'list'

interface NotesHeaderProps {
  query: string
  viewMode: NotesViewMode
  onQueryChange: (value: string) => void
  onViewModeChange: (mode: NotesViewMode) => void
}

export const NotesHeader = ({
  query,
  viewMode,
  onQueryChange,
  onViewModeChange,
}: NotesHeaderProps) => {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary mb-2">My Notes</h1>
        </div>
        <Button className="px-4 py-3 text-md font-light" onClick={() => navigate('/dashboard/notes/new')}>
          Add Note <FiPlus />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <div className="flex items-center gap-2 rounded-lg border border-border-subtle px-3 py-2">
            <FiSearch className="text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search notes..."
              className="w-full bg-transparent text-sm text-text-primary outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'rounded-lg border border-border-subtle p-2 transition-colors',
              viewMode === 'grid'
                ? 'bg-surface-secondary text-text-primary'
                : 'text-text-secondary hover:bg-surface-secondary',
            )}
            aria-label="Show notes in grid view"
          >
            <FiGrid />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={cn(
              'rounded-lg border border-border-subtle p-2 transition-colors',
              viewMode === 'list'
                ? 'bg-surface-secondary text-text-primary'
                : 'text-text-secondary hover:bg-surface-secondary',
            )}
            aria-label="Show notes in list view"
          >
            <FiList />
          </button>
        </div>
      </div>
    </div>
  )
}
