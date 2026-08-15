import { useRef } from 'react'
import type { Editor } from '@tiptap/react'

import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiCode,
  FiLink,
  FiImage,
  FiList,
  FiCheckSquare,
  FiMinus,
  FiCornerDownLeft,
  FiCornerDownRight,
} from 'react-icons/fi'

import {
  LuHeading1,
  LuHeading2,
  LuListOrdered,
  LuQuote,
  LuUndo2,
  LuRedo2
} from 'react-icons/lu'
import { HighlightColorPicker } from './HighlightColorPicker'

interface NotesEditorToolbarProps {
  editor: Editor | null
}

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  children: React.ReactNode
}

const ToolbarButton = ({
  onClick,
  isActive,
  children,
}: ToolbarButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex h-9 w-9 items-center justify-center rounded-lg transition-all
        ${
          isActive
            ? 'bg-primary text-white'
            : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
        }
      `}
    >
      {children}
    </button>
  )
}

const Divider = () => {
  return (
    <div className="mx-1 h-5 w-px bg-border-subtle" />
  )
}

export const NotesEditorToolbar = ({
  editor,
}: NotesEditorToolbarProps) => {
  const fileInputRef =
    useRef<HTMLInputElement | null>(null)

  if (!editor) return null

  const setLink = () => {
    const previousUrl =
      editor.getAttributes('link').href
  
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: previousUrl || '#',
        target: '_blank',
      })
      .run()
  }
  
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    editor
      .chain()
      .focus()
      .setImage({
        src: imageUrl,
      })
      .run()
  }

  return (
    <>
      <div className="sticky top-0 z-40 flex flex-wrap items-center gap-1 border-b border-border-subtle bg-white px-4 py-3">

        {/* Hidden Upload Input */}
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleImageUpload}
        />

        {/* Undo / Redo */}
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().undo().run()
          }
        >
          <LuUndo2 size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().redo().run()
          }
        >
          <LuRedo2 size={16} />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton
          isActive={editor.isActive('heading', {
            level: 1,
          })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run()
          }
        >
          <LuHeading1 size={16} />
        </ToolbarButton>

        <ToolbarButton
          isActive={editor.isActive('heading', {
            level: 2,
          })}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
        >
          <LuHeading2 size={16} />
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton
          isActive={editor.isActive('bulletList')}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
        >
          <FiList size={16} />
        </ToolbarButton>

        <ToolbarButton
          isActive={editor.isActive('orderedList')}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
        >
          <LuListOrdered size={16} />
        </ToolbarButton>

        <ToolbarButton
          isActive={editor.isActive('taskList')}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleTaskList()
              .run()
          }
        >
          <FiCheckSquare size={16} />
        </ToolbarButton>

        <Divider />

        {/* Formatting */}
        <ToolbarButton
          isActive={editor.isActive('bold')}
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          <FiBold size={16} />
        </ToolbarButton>

        <ToolbarButton
          isActive={editor.isActive('italic')}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
        >
          <FiItalic size={16} />
        </ToolbarButton>

        <ToolbarButton
          isActive={editor.isActive('underline')}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
        >
          <FiUnderline size={16} />
        </ToolbarButton>

        <HighlightColorPicker editor={editor} />

        <Divider />

        {/* Quote / Code */}
        <ToolbarButton
          isActive={editor.isActive('blockquote')}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
        >
          <LuQuote size={16} />
        </ToolbarButton>

        <ToolbarButton
          isActive={editor.isActive('codeBlock')}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleCodeBlock()
              .run()
          }
        >
          <FiCode size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .setHorizontalRule()
              .run()
          }
        >
          <FiMinus size={16} />
        </ToolbarButton>

        <Divider />

        {/* Media */}
        <ToolbarButton onClick={setLink}>
          <FiLink size={16} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          <FiImage size={16} />
        </ToolbarButton>
      </div>
    </>
  )
}