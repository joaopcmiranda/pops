import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { WorkoutTracker } from './components/WorkoutTracker'
import { ProgressView } from './components/ProgressView'
import { ProfileView } from './components/ProfileView'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workouts" element={<WorkoutTracker />} />
        <Route path="/progress" element={<ProgressView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </div>
  )
}

export default App