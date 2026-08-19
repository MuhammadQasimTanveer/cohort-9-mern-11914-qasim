import { useMemo } from 'react'
import { FiBookOpen, FiCheckSquare, FiFolder } from 'react-icons/fi'
import { FaRegLightbulb } from 'react-icons/fa6'
import { useNotesStore } from '../store/notesStore'
import type { DashboardStat } from '../types/note.types'

export const useDashboardStats = (): DashboardStat[] => {
  const notesCount = useNotesStore((state) => state.notes.length)

  return useMemo(
    () => [
      { id: 'notes', label: 'Notes', value: notesCount, helper: 'Total notes', Icon: FiBookOpen },
      { id: 'tasks', label: 'Tasks', value: 0, helper: 'Pending tasks', Icon: FiCheckSquare },
      { id: 'projects', label: 'Projects', value: 0, helper: 'Active projects', Icon: FiFolder },
      { id: 'ideas', label: 'Ideas', value: 0, helper: 'Unstructured', Icon: FaRegLightbulb },
    ],
    [notesCount],
  )
}
