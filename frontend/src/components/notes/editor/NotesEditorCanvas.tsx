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


export const NotesEditorCanvas = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
      Underline,
      Highlight,
      Link,
      Image,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'min-h-[520px] px-6 py-5 text-[17px] leading-8 text-text-primary outline-none prose-headings:font-semibold',
      },
    },
  })

  return (
    <section className="w-full rounded-xl border border-border-subtle bg-white">
      <NotesEditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </section>
  )
}
