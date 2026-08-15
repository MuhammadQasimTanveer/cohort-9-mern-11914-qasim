import { FiCalendar, FiGrid, FiList, FiSearch, FiTag } from 'react-icons/fi'

export const NotesToolbar = () => {
  return (
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto] py-4">
        <div className="flex items-center gap-2 rounded-lg border border-border-subtle px-3 py-2">
          <FiSearch className="text-text-muted" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full bg-transparent text-sm text-text-primary outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="rounded-lg border border-border-subtle px-3 py-2 text-xs text-text-secondary hover:bg-surface-secondary">
            <FiTag className="inline" /> Tags
          </button>
          <button type="button" className="rounded-lg border border-border-subtle px-3 py-2 text-xs text-text-secondary hover:bg-surface-secondary">
            <FiCalendar className="inline" /> Date Modified
          </button>
          <button type="button" className="rounded-lg border border-border-subtle p-2 text-text-secondary hover:bg-surface-secondary">
            <FiGrid />
          </button>
          <button type="button" className="rounded-lg border border-border-subtle p-2 text-text-secondary hover:bg-surface-secondary">
            <FiList />
          </button>
        </div>
      </div>
  )
}
