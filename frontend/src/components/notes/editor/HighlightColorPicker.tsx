import { useEffect, useRef, useState } from 'react'
import type { Editor } from '@tiptap/react'
import { LuHighlighter } from 'react-icons/lu'
import { FiX } from 'react-icons/fi'

export const HIGHLIGHT_COLORS = [
  { name: 'Yellow', value: '#fef08a' },
  { name: 'Green', value: '#bbf7d0' },
  { name: 'Blue', value: '#bfdbfe' },
  { name: 'Pink', value: '#fbcfe8' },
  { name: 'Orange', value: '#fed7aa' },
  { name: 'Purple', value: '#e9d5ff' },
] as const

interface HighlightColorPickerProps {
  editor: Editor
}

export const HighlightColorPicker = ({ editor }: HighlightColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeColor = HIGHLIGHT_COLORS.find((color) =>
    editor.isActive('highlight', { color: color.value }),
  )?.value

  const isHighlighted = editor.isActive('highlight')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const applyHighlight = (color: string) => {
    if (editor.isActive('highlight', { color })) {
      editor.chain().focus().unsetHighlight().run()
    } else {
      editor.chain().focus().toggleHighlight({ color }).run()
    }

    setIsOpen(false)
  }

  const removeHighlight = () => {
    editor.chain().focus().unsetHighlight().run()
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`
          flex h-9 items-center justify-center gap-1 rounded-lg px-2 transition-all
          ${
            isHighlighted
              ? 'bg-primary text-white'
              : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
          }
        `}
        aria-label="Highlight text"
        aria-expanded={isOpen}
        title="Highlight"
      >
        <LuHighlighter size={16} />
        <span
          className="h-3 w-3 rounded-sm border border-black/10"
          style={{ backgroundColor: activeColor ?? HIGHLIGHT_COLORS[0].value }}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border border-border-subtle bg-white p-2 shadow-lg">
          <p className="mb-2 px-1 text-xs font-medium text-text-muted">Highlight color</p>
          <div className="flex items-center gap-1.5">
            {HIGHLIGHT_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => applyHighlight(color.value)}
                className={`h-7 w-7 rounded-md border-2 transition-transform hover:scale-110 ${
                  activeColor === color.value ? 'border-primary' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.value }}
                aria-label={`Highlight ${color.name}`}
                title={color.name}
              />
            ))}
            {isHighlighted ? (
              <button
                type="button"
                onClick={removeHighlight}
                className="ml-1 flex h-7 w-7 items-center justify-center rounded-md text-text-muted hover:bg-surface-secondary hover:text-text-primary"
                aria-label="Remove highlight"
                title="Remove highlight"
              >
                <FiX size={14} />
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
