import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { MapPin, Calendar, Plane, Home, Activity, DollarSign, FileText } from 'lucide-react'
import { AppHeader } from '@/components/AppHeader'
import { AppSidebar } from '@/components/AppSidebar'
import { Dashboard } from '@/components/Dashboard'
import { CategoryPage } from '@/components/CategoryPage'

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get current active category from URL
  const getActiveCategory = () => {
    const path = location.pathname
    if (path === '/') return 'dashboard'
    if (path.startsWith('/analytics')) return 'analytics'
    if (path.startsWith('/settings')) return 'settings'
    
    // Extract category from paths like /destinations, /itinerary, etc.
    const category = path.substring(1).split('/')[0]
    return category || 'dashboard'
  }

  const activeCategory = getActiveCategory()

  const handleCategorySelect = (category: string) => {
    if (category === 'dashboard') {
      navigate('/')
    } else if (category === 'analytics' || category === 'settings') {
      navigate(`/${category}`)
    } else {
      navigate(`/${category}`)
    }
    setSidebarOpen(false) // Close sidebar on mobile after selection
  }

  const categoryMetadata = {
    destinations: { name: 'Destinations', icon: MapPin },
    itinerary: { name: 'Itinerary', icon: Calendar },
    transport: { name: 'Transport', icon: Plane },
    accommodation: { name: 'Accommodation', icon: Home },
    activities: { name: 'Activities', icon: Activity },
    budget: { name: 'Budget', icon: DollarSign },
    documents: { name: 'Documents', icon: FileText },
  }

  return (
    <div className="app-layout">
      <AppSidebar
        isOpen={sidebarOpen}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      <div className="app-main">
        <AppHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <Routes>
          <Route 
            path="/" 
            element={<Dashboard onCategorySelect={handleCategorySelect} />} 
          />
          <Route 
            path="/analytics" 
            element={
              <main className="app-content">
                <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>
                  Analytics
                </h1>
                <p style={{ color: '#64748b' }}>Trip analytics coming soon...</p>
              </main>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <main className="app-content">
                <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>
                  Settings
                </h1>
                <p style={{ color: '#64748b' }}>App settings coming soon...</p>
              </main>
            } 
          />
          {Object.entries(categoryMetadata).map(([category, meta]) => (
            <Route
              key={category}
              path={`/${category}`}
              element={
                <main className="app-content">
                  <CategoryPage
                    category={category}
                    categoryName={meta.name}
                    categoryIcon={meta.icon}
                  />
                </main>
              }
            />
          ))}
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
