export interface Note {
  id: string
  title: string
  updatedAt: string
  tag: string
}

export interface DashboardStat {
  id: string
  label: string
  value: number
  helper: string
  Icon: React.ComponentType<{ className?: string }>
}

export interface TaskPreviewItem {
  id: string
  title: string
  due: string
}

export interface ProjectItem {
  id: string
  name: string
  status: string
  owner: string
}
