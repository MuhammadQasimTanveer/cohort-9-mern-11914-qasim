import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'

export const NotesHeader = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary mb-2">My Notes</h1>
      </div>
      <Button className="px-4 py-3 text-md font-light" onClick={() => navigate('/dashboard/notes/new')}>
        Add Note <FiPlus />
      </Button>
    </div>
  )
}
