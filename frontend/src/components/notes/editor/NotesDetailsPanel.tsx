import { useEffect, useRef, useState } from 'react'
import { FiX } from 'react-icons/fi'
import {
  formatNoteDate,
  getReadTimeLabel,
  getWordCount,
} from '../../../lib/noteHelpers'

interface NotesDetailsPanelProps {
  isOpen: boolean
  onClose: () => void
  tag: string
  onTagChange: (tag: string) => void
  createdAt: string
  updatedAt: string
  plainText: string
  showWordCount: boolean
}

const tagClasses: Record<string, string> = {
  Work: 'bg-blue-100 text-blue-700',
  Memo: 'bg-violet-100 text-violet-700',
  Life: 'bg-amber-100 text-amber-700',
  Study: 'bg-emerald-100 text-emerald-700',
}

export const NotesDetailsPanel = ({
  isOpen,
  onClose,
  tag,
  onTagChange,
  createdAt,
  updatedAt,
  plainText,
  showWordCount,
}: NotesDetailsPanelProps) => {
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const tagInputRef = useRef<HTMLInputElement>(null)

  const wordCount = getWordCount(plainText)
  const readTime = getReadTimeLabel(wordCount)

  useEffect(() => {
    if (isAddingTag) {
      tagInputRef.current?.focus()
    }
  }, [isAddingTag])

  const handleAddTag = () => {
    const nextTag = tagInput.trim()
    if (!nextTag) {
      setIsAddingTag(false)
      setTagInput('')
      return
    }

    onTagChange(nextTag)
    setTagInput('')
    setIsAddingTag(false)
  }

  if (!isOpen) {
    return null
  }

  return (
    <aside className="w-full rounded-xl border border-border-subtle bg-surface p-4 xl:w-[320px]">
      <div className="flex items-center justify-between border-b border-border-subtle pb-2">
        <div className="flex items-center gap-3">
          <button type="button" className="text-sm font-semibold text-text-primary">Document</button>
          <button type="button" className="text-sm text-text-muted">Info</button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
          aria-label="Close details panel"
        >
          <FiX />
        </button>
      </div>

      <div className="mt-4 space-y-6 text-sm">
        <section>
          <h3 className="mb-2 font-semibold text-text-primary">Tag</h3>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {tag ? (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${tagClasses[tag] ?? 'bg-slate-100 text-slate-700'}`}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onTagChange('')}
                  className="rounded-full p-0.5 hover:bg-black/10"
                  aria-label={`Remove ${tag} tag`}
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            ) : null}

            {isAddingTag ? (
              <input
                ref={tagInputRef}
                type="text"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    handleAddTag()
                  }

                  if (event.key === 'Escape') {
                    setIsAddingTag(false)
                    setTagInput('')
                  }
                }}
                onBlur={handleAddTag}
                placeholder="Enter tag"
                className="min-w-[80px] border-none bg-transparent text-xs text-text-primary outline-none"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingTag(true)}
                className="text-xs text-text-muted hover:text-text-primary"
              >
                Add tag...
              </button>
            )}
          </div>
        </section>

        <section className="space-y-2 text-text-secondary">
          <div className="flex justify-between"><span>Created</span><span>{formatNoteDate(createdAt)}</span></div>
          <div className="flex justify-between"><span>Updated</span><span>{formatNoteDate(updatedAt)}</span></div>
          {showWordCount ? <div className="flex justify-between"><span>Word count</span><span>{wordCount}</span></div> : null}
          <div className="flex justify-between"><span>Read time</span><span>{readTime}</span></div>
        </section>
      </div>
    </aside>
  )
}
