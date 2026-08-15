import { FiMoreVertical } from 'react-icons/fi'

export const NoteActionsDropdown = () => {
  return (
    <button
      type="button"
      className="rounded-md p-2 text-text-secondary hover:bg-surface-tertiary hover:text-text-primary"
      aria-label="Open note actions: edit, delete, share"
      title="Actions: Edit, Delete, Share"
    >
      <FiMoreVertical className="inline" />
    </button>
  )
}
