import axiosInstance from './axiosInstance'
import type { Note } from '../types/note.types'

export interface CreateNotePayload {
  title?: string
  content?: Record<string, unknown>
  tag?: string
}

export interface UpdateNotePayload {
  title?: string
  content?: Record<string, unknown>
  tag?: string
}

export interface NoteResponse {
  message?: string
  note: Note
}

export interface NotesListResponse {
  notes: Note[]
}

export const notesAPI = {
  getNotes: () => axiosInstance.get<NotesListResponse>('/notes'),

  getNoteById: (id: string) => axiosInstance.get<NoteResponse>(`/notes/${id}`),

  createNote: (data?: CreateNotePayload) =>
    axiosInstance.post<NoteResponse>('/notes', data ?? {}),

  updateNote: (id: string, data: UpdateNotePayload) =>
    axiosInstance.put<NoteResponse>(`/notes/${id}`, data),

  deleteNote: (id: string) => axiosInstance.delete<NoteResponse>(`/notes/${id}`),
}
