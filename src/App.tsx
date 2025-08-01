import { useState } from 'react'
import { MapPin, Calendar, Plane, Home, Activity, DollarSign, FileText } from 'lucide-react'
import { AppHeader } from '@/components/AppHeader'
import { AppSidebar } from '@/components/AppSidebar'
import { Dashboard } from '@/components/Dashboard'
import { ItineraryView } from '@/components/ItineraryView'
import { CategoryPageMinimal } from '@/components/CategoryPageMinimal'
import { ReadmeView } from '@/components/ReadmeView'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('dashboard')
  const [currentView, setCurrentView] = useState('dashboard')

  const handleCategorySelect = (category: string) => {
    console.log('Category selected:', category)
    setActiveCategory(category)
    setCurrentView(category)
    setSidebarOpen(false)
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

  const renderCurrentView = () => {
    if (currentView === 'dashboard') {
      return <Dashboard onCategorySelect={handleCategorySelect} />
    }

    if (currentView === 'itinerary') {
      return <ItineraryView />
    }

    if (currentView === 'analytics') {
      return (
        <main className='app-content'>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>Analytics</h1>
          <p style={{ color: '#64748b' }}>Trip analytics coming soon...</p>
        </main>
      )
    }

    if (currentView === 'readme') {
      return <ReadmeView />
    }

    if (currentView === 'settings') {
      return (
        <main className='app-content'>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>Settings</h1>
          <p style={{ color: '#64748b' }}>App settings coming soon...</p>
        </main>
      )
    }

    // Category pages
    const meta = categoryMetadata[currentView as keyof typeof categoryMetadata]
    if (meta) {
      return (
        <CategoryPageMinimal
          category={currentView}
          categoryName={meta.name}
          categoryIcon={meta.icon}
        />
      )
    }

    // Fallback to dashboard
    return <Dashboard onCategorySelect={handleCategorySelect} />
  }

  return (
    <div className='app-layout'>
      <AppSidebar
        isOpen={sidebarOpen}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />

      <div className='app-main'>
        <AppHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        {renderCurrentView()}
      </div>
    </div>
  )
}

export default App
