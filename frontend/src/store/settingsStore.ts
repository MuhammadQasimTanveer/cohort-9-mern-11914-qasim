import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark'

interface SettingsState {
  theme: ThemeMode
  autosaveEnabled: boolean
  showWordCount: boolean
  setTheme: (theme: ThemeMode) => void
  toggleAutosave: () => void
  toggleWordCount: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      autosaveEnabled: true,
      showWordCount: true,
      setTheme: (theme) => set({ theme }),
      toggleAutosave: () => set((state) => ({ autosaveEnabled: !state.autosaveEnabled })),
      toggleWordCount: () => set((state) => ({ showWordCount: !state.showWordCount })),
    }),
    {
      name: 'settings-storage',
    },
  ),
)

