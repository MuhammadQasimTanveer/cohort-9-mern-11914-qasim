import {
  FiBarChart2,
  FiBookOpen,
  FiCheckSquare,
  FiFolder,
  FiSettings,
  FiSidebar,
} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
}

const mainItem = {
  to: '/dashboard',
  label: 'Dashboard',
  icon: FiBarChart2,
}

const toolItems = [
  { to: '/dashboard/notes', label: 'Notes', icon: FiBookOpen },
  { to: '/dashboard/tasks', label: 'Tasks', icon: FiCheckSquare },
  { to: '/dashboard/projects', label: 'Projects', icon: FiFolder },
]

const settingsItem = {
  to: '/dashboard/settings',
  label: 'Settings',
  icon: FiSettings,
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors ${
    isActive ? 'bg-primary-light text-primary' : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
  }`

interface SidebarLinkProps {
  to: string
  label: string
  Icon: React.ComponentType<{ className?: string }>
  isCollapsed: boolean
  className?: string
}

const SidebarLink = ({ to, label, Icon, isCollapsed, className = '' }: SidebarLinkProps) => {
  return (
    <NavLink to={to} className={(state) => `${navClass(state)} ${className}`.trim()} end={to === '/dashboard'}>
      {({ isActive }) => (
        <>
          <Icon className={`text-base ${isActive ? 'text-primary' : 'text-current'}`} />
          {!isCollapsed ? <span className="ml-2">{label}</span> : null}
        </>
      )}
    </NavLink>
  )
}

export const Sidebar = ({ isCollapsed, onToggleCollapse }: SidebarProps) => {
  return (
    <div className="flex h-full flex-col">
      <div>
        <div className={`mb-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed ? (
            <div className="flex items-center gap-2">
              <img src={logo} alt="web-logo" width="22" />
              <span className="text-lg font-semibold">mystuff</span>
            </div>
          ) : (
            null
          )}

          <button
            type="button"
            onClick={onToggleCollapse}
            className="text-lg rounded-md p-1 text-text-muted hover:bg-surface-tertiary hover:text-text-primary cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <FiSidebar />
          </button>
        </div>

        {!isCollapsed ? <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Main</p> : null}
        <div className="mt-2 space-y-1">
          <SidebarLink to={mainItem.to} label={mainItem.label} Icon={mainItem.icon} isCollapsed={isCollapsed} />
        </div>

        {!isCollapsed ? <p className="mt-5 pl-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Tools</p> : null}
        <div className="mt-2 space-y-1">
          {toolItems.map((item) => (
            <SidebarLink
              key={item.to}
              to={item.to}
              label={item.label}
              Icon={item.icon}
              isCollapsed={isCollapsed}
              className={isCollapsed ? 'justify-center' : 'ml-3 w-[calc(100%-0.75rem)]'}
            />
          ))}
        </div>

        <div className="mt-4">
          <SidebarLink to={settingsItem.to} label={settingsItem.label} Icon={settingsItem.icon} isCollapsed={isCollapsed} />
        </div>
      </div>

      <div className={`mt-auto border-t border-border-subtle pt-3 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">ZH</div>
          {!isCollapsed ? (
            <div>
              <p className="text-sm font-semibold text-text-primary">Zami Holmes</p>
              <p className="text-xs text-text-muted">Product Designer</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
