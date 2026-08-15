import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/dashboard/Sidebar'

export const DashLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface">
      <aside
        className={`fixed left-0 top-0 h-screen border-r border-border-subtle bg-[#fbfbfb] p-4 transition-all duration-200 ${
          isCollapsed ? 'w-[74px]' : 'w-[250px]'
        }`}
      >
        <Sidebar isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed((prev) => !prev)} />
      </aside>

      <main
        className={`h-screen overflow-y-auto p-4 transition-all duration-200 md:p-6 ${
          isCollapsed ? 'ml-[74px] w-[calc(100%-74px)]' : 'ml-[250px] w-[calc(100%-250px)]'
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}
