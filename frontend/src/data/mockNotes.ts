import type { Note } from '../types/note.types'

export const mockNotes: Note[] = [
  {
    id: 'note-1',
    title: 'Project Roadmap',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Q3 Goals' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Launch beta by July. Focus on performance improvements, user onboarding, and analytics integration across the platform.',
            },
          ],
        },
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Complete API integration with backend services' }],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Finalize dashboard wireframes and design tokens' }],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Ship notes editor with rich text support' }],
                },
              ],
            },
          ],
        },
      ],
    },
    createdAt: '2025-05-18T09:00:00.000Z',
    updatedAt: '2025-05-20T08:00:00.000Z',
    tag: 'Work',
  },
  {
    id: 'note-2',
    title: 'Design System Ideas',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Explore typography scale, spacing tokens, and reusable card patterns for the workspace dashboard.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Consider adding semantic color roles for success, warning, and info states in both light and dark themes.',
            },
          ],
        },
      ],
    },
    createdAt: '2025-05-17T14:30:00.000Z',
    updatedAt: '2025-05-20T05:00:00.000Z',
    tag: 'Memo',
  },
  {
    id: 'note-3',
    title: 'Client Meeting Notes',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Meeting Summary' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Discussed timeline for phase two delivery. Client requested weekly progress updates and a shared demo environment.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Action items: send revised estimate, schedule design review, and prepare onboarding documentation.',
            },
          ],
        },
      ],
    },
    createdAt: '2025-05-16T11:15:00.000Z',
    updatedAt: '2025-05-19T16:45:00.000Z',
    tag: 'Work',
  },
  {
    id: 'note-4',
    title: 'Personal Goals',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Read two technical books this quarter. Maintain a consistent workout schedule and improve sleep routine.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Track progress weekly and reflect on habits every Sunday evening.',
            },
          ],
        },
      ],
    },
    createdAt: '2025-05-14T07:00:00.000Z',
    updatedAt: '2025-05-18T20:30:00.000Z',
    tag: 'Life',
  },
  {
    id: 'note-5',
    title: 'Learning Plan',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Week 1: TypeScript generics and utility types. Week 2: React performance patterns and memoization.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Week 3: Testing with Vitest and React Testing Library. Week 4: Build a small full-stack capstone project.',
            },
          ],
        },
      ],
    },
    createdAt: '2025-05-12T10:00:00.000Z',
    updatedAt: '2025-05-16T09:20:00.000Z',
    tag: 'Study',
  },
]

export const getNoteById = (noteId: string) => mockNotes.find((note) => note.id === noteId)
