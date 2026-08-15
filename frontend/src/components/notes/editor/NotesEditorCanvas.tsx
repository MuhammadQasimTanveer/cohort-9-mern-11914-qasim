import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import Image from '@tiptap/extension-image'
import TaskItem from '@tiptap/extension-task-item'
import { NotesEditorToolbar } from './NotesEditorToolbar'
import { emptyNoteContent, getPlainTextFromContent } from '../../../lib/noteHelpers'

interface NotesEditorCanvasProps {
  content: Record<string, unknown>
  onContentChange: (content: Record<string, unknown>, plainText: string) => void
}

export const NotesEditorCanvas = ({ content, onContentChange }: NotesEditorCanvasProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Image,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: content ?? emptyNoteContent(),
    editorProps: {
      attributes: {
        class:
          'min-h-[520px] px-6 py-5 text-[17px] leading-8 text-text-primary outline-none prose-headings:font-semibold',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const json = currentEditor.getJSON() as Record<string, unknown>
      onContentChange(json, getPlainTextFromContent(json))
    },
  })

  useEffect(() => {
    if (!editor) {
      return
    }

    const currentContent = JSON.stringify(editor.getJSON())
    const nextContent = JSON.stringify(content)

    if (currentContent !== nextContent) {
      editor.commands.setContent(content ?? emptyNoteContent())
    }
  }, [content, editor])

  return (
    <section className="w-full min-h-[90vh] rounded-xl border border-border-subtle bg-white">
      <NotesEditorToolbar editor={editor} />
      <EditorContent editor={editor} className="tiptap" />
    </section>
  )
}
