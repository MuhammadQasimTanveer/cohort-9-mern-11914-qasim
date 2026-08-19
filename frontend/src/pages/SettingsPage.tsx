import { useNavigate } from 'react-router-dom'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { useAuthStore } from '../store/authStore'
import { useSettingsStore } from '../store/settingsStore'
import { Button } from '../components/ui/Button'

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: () => void
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`relative inline-flex h-7 w-11 items-center rounded-full transition-colors ${
      checked ? 'bg-primary' : 'bg-border-strong'
    }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-5' : 'translate-x-0.5'
      }`}
    />
  </button>
)

export const SettingsPage = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const { theme, autosaveEnabled, showWordCount, setTheme, toggleAutosave, toggleWordCount } = useSettingsStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="space-y-5">
      <DashboardHeader title="Settings" subtitle="Manage your workspace preferences" />

      <section className="rounded-xl border border-border-subtle bg-surface p-5">
        <h2 className="text-base font-semibold text-text-primary">Profile Information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="form-field">
            <label className="form-label">Full Name</label>
            <input className="input" value={user?.fullName ?? ''} readOnly />
          </div>
          <div className="form-field">
            <label className="form-label">Email</label>
            <input className="input bg-surface-secondary text-text-muted" value={user?.email ?? ''} readOnly disabled />
          </div>
        </div>
      </section>

      <section className="flex justify-between items-center rounded-xl border border-border-subtle bg-surface p-5">
        <div>
          <h2 className="text-base font-semibold text-text-primary">Appearance</h2>
          <p className="mt-1 text-sm text-text-secondary">Theme toggle</p>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-border-subtle p-1 w-fit">
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`rounded-md px-3 py-1.5 cursor-pointer text-sm ${theme === 'light' ? 'bg-surface-secondary text-text-primary' : 'text-text-secondary'}`}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`rounded-md px-3 py-1.5 cursor-pointer text-sm ${theme === 'dark' ? 'bg-surface-secondary text-text-primary' : 'text-text-secondary'}`}
          >
            Dark
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-border-subtle bg-surface p-5">
        <h2 className="text-base font-semibold text-text-primary">Editor Preferences</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border-subtle px-3 py-3">
            <div>
              <p className="text-sm font-medium text-text-primary">Autosave notes</p>
              <p className="text-xs text-text-secondary">When off, notes save only when you click Save.</p>
            </div>
            <Toggle checked={autosaveEnabled} onChange={toggleAutosave} />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border-subtle px-3 py-3">
            <div>
              <p className="text-sm font-medium text-text-primary">Show word count</p>
              <p className="text-xs text-text-secondary">Control word count visibility in note details.</p>
            </div>
            <Toggle checked={showWordCount} onChange={toggleWordCount} />
          </div>
        </div>
      </section>

      <div>
        <Button variant="danger" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  )
}
