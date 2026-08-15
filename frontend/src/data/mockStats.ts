import type { DashboardStat, Note, ProjectItem, TaskPreviewItem } from '../types/note.types'
import {
  FiBookOpen,
  FiCheckSquare,
  FiFolder
} from 'react-icons/fi'
import { FaRegLightbulb } from "react-icons/fa6";


export const mockStats: DashboardStat[] = [
  { id: 'notes', label: 'Notes', value: 128, helper: 'Total notes', Icon: FiBookOpen },
  { id: 'tasks', label: 'Tasks', value: 24, helper: 'Pending tasks', Icon: FiCheckSquare },
  { id: 'projects', label: 'Projects', value: 5, helper: 'Active projects', Icon: FiFolder },
  { id: 'ideas', label: 'Ideas', value: 12, helper: 'Unstructured', Icon: FaRegLightbulb },
]

export const mockTasks: TaskPreviewItem[] = [
  { id: 'task-1', title: 'Review project proposal', due: 'Due today' },
  { id: 'task-2', title: 'Update landing page', due: 'Due today' },
  { id: 'task-3', title: 'Send invoices', due: 'Due tomorrow' },
]

export const mockProjects: ProjectItem[] = [
  { id: 'proj-1', name: 'Website Redesign', status: 'In Progress', owner: 'Design Team' },
  { id: 'proj-2', name: 'Mobile App', status: 'Planning', owner: 'Product Team' },
  { id: 'proj-3', name: 'CRM Migration', status: 'On Hold', owner: 'Engineering' },
]

export const mockRecentNotes: Note[] = [
  { id: 'note-1', title: 'Project Roadmap', updatedAt: 'Updated 2h ago', tag: 'Work' },
  { id: 'note-2', title: 'Design System Ideas', updatedAt: 'Updated 5h ago', tag: 'Memo' },
  { id: 'note-3', title: 'Client Meeting Notes', updatedAt: 'Updated 1d ago', tag: 'Work' },
]
