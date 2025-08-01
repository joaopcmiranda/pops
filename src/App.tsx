import { useState } from 'react'
import {
  MapPin,
  Calendar as CalIcon,
  Plane,
  Home,
  Activity,
  DollarSign,
  FileText,
} from 'lucide-react'
import { AppHeader } from '@/components/AppHeader'
import { AppSidebar } from '@/components/AppSidebar'
import { Dashboard } from '@/components/Dashboard'
import { ItineraryView } from '@/components/ItineraryView'
import { Calendar } from '@/components/Calendar'
import { CategoryPageMinimal } from '@/components/CategoryPageMinimal'
import { ReadmeView } from '@/components/ReadmeView'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ToastProvider } from '@/components/Toast'
import '@/styles/animations.css'

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
    itinerary: { name: 'Itinerary', icon: CalIcon },
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

    if (currentView === 'calendar') {
      return (
        <Calendar
          onEventClick={event => {
            console.log('Event clicked:', event)
            // Could open event details modal here
          }}
          onAddEvent={date => {
            console.log('Add event for date:', date)
            // Could open add event modal here
          }}
        />
      )
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
    <ToastProvider>
      <ErrorBoundary
        onError={(error, errorInfo) => {
          console.error('App Error Boundary:', error, errorInfo)
          // In production, you would send this to your error reporting service
        }}
      >
        <div className='app-layout'>
          <ErrorBoundary
            fallback={
              <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#dc2626' }}>
                Navigation error occurred. Please refresh the page.
              </div>
            }
          >
            <AppSidebar
              isOpen={sidebarOpen}
              activeCategory={activeCategory}
              onCategorySelect={handleCategorySelect}
            />
          </ErrorBoundary>

          <div className='app-main'>
            <ErrorBoundary
              fallback={
                <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#dc2626' }}>
                  Header error occurred. Please refresh the page.
                </div>
              }
            >
              <AppHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            </ErrorBoundary>

            <ErrorBoundary>{renderCurrentView()}</ErrorBoundary>
          </div>
        </div>
      </ErrorBoundary>
    </ToastProvider>
  )
}

export default App
