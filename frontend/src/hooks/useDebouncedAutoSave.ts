import { useCallback, useEffect, useRef, useState } from 'react'

export type SaveStatus = 'idle' | 'saving' | 'saved'

interface UseDebouncedAutoSaveOptions<T> {
  data: T
  onSave: (data: T) => Promise<void>
  delay?: number
  enabled?: boolean
  resetKey?: string
}

export const useDebouncedAutoSave = <T>({
  data,
  onSave,
  delay = 1500,
  enabled = true,
  resetKey,
}: UseDebouncedAutoSaveOptions<T>) => {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)
  const isFirstRender = useRef(true)
  const saveRequestId = useRef(0)
  const onSaveRef = useRef(onSave)

  onSaveRef.current = onSave

  useEffect(() => {
    isFirstRender.current = true
  }, [resetKey])

  const stableSave = useCallback(async (payload: T) => {
    await onSaveRef.current(payload)
  }, [])

  useEffect(() => {
    if (!enabled) {
      return
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setSaveStatus('idle')

    const timer = window.setTimeout(async () => {
      const requestId = ++saveRequestId.current
      setSaveStatus('saving')

      try {
        await stableSave(data)

        if (requestId === saveRequestId.current) {
          setLastSavedAt(new Date().toISOString())
          setSaveStatus('saved')
        }
      } catch {
        if (requestId === saveRequestId.current) {
          setSaveStatus('idle')
        }
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [data, delay, stableSave, enabled])

  return { saveStatus, lastSavedAt }
}
