import { FiX } from 'react-icons/fi'

interface NotesDetailsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export const NotesDetailsPanel = ({ isOpen, onClose }: NotesDetailsPanelProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <aside className="w-full rounded-xl border border-border-subtle bg-white p-4 xl:w-[320px]">
      <div className="flex items-center justify-between border-b border-border-subtle pb-2">
        <div className="flex items-center gap-3">
          <button type="button" className="text-sm font-semibold text-text-primary">Document</button>
          <button type="button" className="text-sm text-text-muted">Info</button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
          aria-label="Close details panel"
        >
          <FiX />
        </button>
      </div>

      <div className="mt-4 space-y-6 text-sm">
        <section>
          <h3 className="mb-2 font-semibold text-text-primary">Tags</h3>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700">Work</span>
            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">Roadmap</span>
          </div>
          <button type="button" className="text-xs text-text-muted hover:text-text-primary">Add tag...</button>
        </section>

        <section className="space-y-2 text-text-secondary">
          <div className="flex justify-between"><span>Created</span><span>May 18, 2025</span></div>
          <div className="flex justify-between"><span>Updated</span><span>May 18, 2025</span></div>
          <div className="flex justify-between"><span>Word count</span><span>124</span></div>
          <div className="flex justify-between"><span>Read time</span><span>1 min</span></div>
        </section>
      </div>
    </aside>
  )
}
