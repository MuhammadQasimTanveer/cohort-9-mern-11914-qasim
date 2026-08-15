import { DashboardHeader } from '../components/dashboard/DashboardHeader'

export const SettingsPage = () => {
  return (
    <div className="space-y-4">
      <DashboardHeader title="Settings" subtitle="Static settings placeholder." />
      <section className="rounded-xl border border-border-subtle bg-white p-5">
        <p className="text-sm text-text-secondary">Settings content will go here.</p>
      </section>
    </div>
  )
}
