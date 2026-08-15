import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { ForgotPassword } from './pages/ForgotPassword'
import { Toaster } from 'react-hot-toast'
import { DashLayout } from './layouts/DashLayout'
import { DashboardPage } from './pages/DashboardPage'
import { NotesPage } from './pages/NotesPage'
import { TasksPage } from './pages/TasksPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { SettingsPage } from './pages/SettingsPage'
import { NotesEditorPage } from './pages/NotesEditorPage'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard/notes/new"
          element={
            <ProtectedRoute>
              <NotesEditorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  )
}

export default App
