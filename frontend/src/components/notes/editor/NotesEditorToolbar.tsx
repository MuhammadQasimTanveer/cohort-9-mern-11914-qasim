import { Editor } from '@tiptap/react'
import {
  FiBold,
  FiItalic,
  FiLink,
  FiList,
  FiPaperclip,
  FiType,
} from 'react-icons/fi'

interface NotesEditorToolbarProps {
  editor: Editor | null
}

const toolbarButtonClass = 'rounded-md p-2 text-text-secondary hover:bg-surface-secondary hover:text-text-primary'

export const NotesEditorToolbar = ({ editor }: NotesEditorToolbarProps) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border-subtle px-3 py-2">
      <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <FiType />
      </button>
      <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </button>
      <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().toggleBold().run()}>
        <FiBold />
      </button>
      <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <FiItalic />
      </button>
      <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <FiList />
      </button>
      <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1.
      </button>
      <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <FiPaperclip />
      </button>
      <button type="button" className={toolbarButtonClass} onClick={() => editor.chain().focus().setParagraph().run()}>
        <FiLink />
      </button>
    </div>
  )
}
