import { create } from 'zustand'
import toast from 'react-hot-toast'
import { notesAPI, type CreateNotePayload, type UpdateNotePayload } from '../api/notes'
import { getApiErrorMessage } from '../lib/apiError'
import { emptyNoteContent, getPlainTextFromContent } from '../lib/noteHelpers'
import type { Note } from '../types/note.types'

export type NotesViewMode = 'grid' | 'list'

export interface NoteSavePayload {
  title: string
  content: Record<string, unknown>
  tag: string
}

interface NoteEditorState {
  activeNoteId: string | null
  title: string
  tag: string
  content: Record<string, unknown>
  plainText: string
  createdAt: string
  updatedAt: string
  isLoading: boolean
  loadError: string | null
}

const createInitialEditorState = (): NoteEditorState => ({
  activeNoteId: null,
  title: 'Untitled Note',
  tag: '',
  content: emptyNoteContent(),
  plainText: getPlainTextFromContent(emptyNoteContent()),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isLoading: false,
  loadError: null,
})

interface NotesState {
  notes: Note[]
  listLoading: boolean
  isCreating: boolean
  query: string
  viewMode: NotesViewMode
  editor: NoteEditorState

  setQuery: (query: string) => void
  setViewMode: (mode: NotesViewMode) => void
  fetchNotes: () => Promise<void>
  deleteNote: (noteId: string) => Promise<void>
  createNote: (payload?: CreateNotePayload) => Promise<string | null>
  loadNote: (noteId: string) => Promise<void>
  initNewNote: () => void
  saveNote: (payload: NoteSavePayload) => Promise<string | null>
  setActiveNoteId: (noteId: string) => void
  setTitle: (title: string) => void
  setTag: (tag: string) => void
  setContent: (content: Record<string, unknown>, plainText: string) => void
  resetEditor: () => void
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  listLoading: false,
  isCreating: false,
  query: '',
  viewMode: 'list',
  editor: createInitialEditorState(),

  setQuery: (query) => set({ query }),

  setViewMode: (viewMode) => set({ viewMode }),

  fetchNotes: async () => {
    set({ listLoading: true })

    try {
      const { data } = await notesAPI.getNotes()
      set({ notes: data.notes })
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load notes'))
    } finally {
      set({ listLoading: false })
    }
  },

  deleteNote: async (noteId) => {
    try {
      await notesAPI.deleteNote(noteId)
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== noteId),
      }))
      toast.success('Note deleted')
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to delete note'))
    }
  },

  createNote: async (payload) => {
    set({ isCreating: true })

    try {
      const { data } = await notesAPI.createNote(payload)
      const note = data.note

      set((state) => ({
        notes: [note, ...state.notes],
      }))

      return note.id
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to create note'))
      return null
    } finally {
      set({ isCreating: false })
    }
  },

  loadNote: async (noteId) => {
    set((state) => ({
      editor: {
        ...state.editor,
        activeNoteId: noteId,
        isLoading: true,
        loadError: null,
      },
    }))

    try {
      const { data } = await notesAPI.getNoteById(noteId)
      const note = data.note

      set({
        editor: {
          activeNoteId: note.id,
          title: note.title,
          tag: note.tag,
          content: note.content,
          plainText: getPlainTextFromContent(note.content),
          createdAt: note.createdAt,
          updatedAt: note.updatedAt,
          isLoading: false,
          loadError: null,
        },
      })
    } catch (error) {
      const message = getApiErrorMessage(error, 'Failed to load note')

      set((state) => ({
        editor: {
          ...state.editor,
          isLoading: false,
          loadError: message,
        },
      }))

      toast.error(message)
    }
  },

  initNewNote: () => {
    set({ editor: createInitialEditorState() })
  },

  saveNote: async (payload) => {
    const { editor } = get()
    const noteId = editor.activeNoteId

    try {
      if (!noteId) {
        const { data } = await notesAPI.createNote(payload)
        const note = data.note

        set((state) => ({
          notes: [note, ...state.notes.filter((item) => item.id !== note.id)],
          editor: {
            ...state.editor,
            activeNoteId: note.id,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
          },
        }))

        return note.id
      }

      const { data } = await notesAPI.updateNote(noteId, payload as UpdateNotePayload)

      set((state) => ({
        notes: state.notes.map((note) => (note.id === noteId ? data.note : note)),
        editor: {
          ...state.editor,
          updatedAt: data.note.updatedAt,
        },
      }))

      return noteId
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to save note'))
      throw error
    }
  },

  setActiveNoteId: (noteId) => {
    set((state) => ({
      editor: { ...state.editor, activeNoteId: noteId },
    }))
  },

  setTitle: (title) => {
    set((state) => ({
      editor: { ...state.editor, title },
    }))
  },

  setTag: (tag) => {
    set((state) => ({
      editor: { ...state.editor, tag },
    }))
  },

  setContent: (content, plainText) => {
    set((state) => ({
      editor: { ...state.editor, content, plainText },
    }))
  },

  resetEditor: () => {
    set({ editor: createInitialEditorState() })
  },
}))

