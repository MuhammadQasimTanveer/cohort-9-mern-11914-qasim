const WORDS_PER_MINUTE = 200

export const formatNoteDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const formatRelativeUpdatedAt = (isoDate: string) => {
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 60) {
    return `Updated ${Math.max(diffMinutes, 1)}m ago`
  }

  if (diffHours < 24) {
    return `Updated ${diffHours}h ago`
  }

  return `Updated ${diffDays}d ago`
}

const extractTextFromNode = (node: Record<string, unknown>): string => {
  if (node.type === 'text' && typeof node.text === 'string') {
    return node.text
  }

  if (!Array.isArray(node.content)) {
    return ''
  }

  return (node.content as Record<string, unknown>[])
    .map((child) => extractTextFromNode(child))
    .join(' ')
}

export const getPlainTextFromContent = (content: Record<string, unknown>) => {
  return extractTextFromNode(content).replace(/\s+/g, ' ').trim()
}

export const getWordCount = (text: string) => {
  if (!text.trim()) {
    return 0
  }

  return text.trim().split(/\s+/).length
}

export const getReadTimeLabel = (wordCount: number) => {
  if (wordCount === 0) {
    return '0 min'
  }

  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
  return `${minutes} min`
}

export const emptyNoteContent = (): Record<string, unknown> => ({
  type: 'doc',
  content: [{ type: 'paragraph' }],
})
