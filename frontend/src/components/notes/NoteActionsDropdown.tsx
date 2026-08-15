import { useEffect, useRef, useState } from 'react'
import { FiEdit2, FiMoreVertical, FiTrash2 } from 'react-icons/fi'

interface NoteActionsDropdownProps {
  onEdit: () => void
  onDelete: () => void
}

export const NoteActionsDropdown = ({ onEdit, onDelete }: NoteActionsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          setIsOpen((current) => !current)
        }}
        className="rounded-md p-2 text-text-secondary hover:bg-surface-tertiary hover:text-text-primary"
        aria-label="Open note actions"
        aria-expanded={isOpen}
      >
        <FiMoreVertical className="inline" />
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-border-subtle bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setIsOpen(false)
              onEdit()
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-text-primary hover:bg-surface-secondary"
          >
            <FiEdit2 className="text-text-secondary" />
            Edit note
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setIsOpen(false)
              onDelete()
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <FiTrash2 />
            Delete note
          </button>
        </div>
      ) : null}
    </div>
  )
}
