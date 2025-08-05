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
import { TripSelector } from '@/components/TripSelector'
import { TripCreationWizard } from '@/components/TripCreationWizard'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { TripProvider } from '@/contexts/TripContext'
import { useTripContext } from '@/hooks/useTripContext'
import { TripService } from '@/services/tripService'
import { SidebarInset, SidebarProvider } from '@pops/ui'
import '@/styles/animations.css'

// Type interfaces
import type { Trip } from '@/types/trip'

function AppContent() {
  const [activeCategory, setActiveCategory] = useState('dashboard')
  const [currentView, setCurrentView] = useState('dashboard')
  const {
    currentTrip,
    setCurrentTrip,
    isSelectingTrip,
    setIsSelectingTrip,
    setShowNewTripModal,
    showNewTripModal,
  } = useTripContext()

  // Fetch trip details when a trip is selected
  // const _tripQuery = trpc.trip.getById.useQuery(
  //   { id: currentTrip?.id || '' },
  //   { enabled: !!currentTrip?.id }
  // )

  const handleCategorySelect = (category: string) => {
    console.log('Category selected:', category)
    setActiveCategory(category)
    setCurrentView(category)
  }

  const handleTripSelect = (tripId: string) => {
    // Fetch the actual trip data from the service
    const trip = TripService.getTripById(tripId)
    if (trip) {
      setCurrentTrip(trip)
    } else {
      console.error('Trip not found:', tripId)
    }
  }

  const handleNewTrip = () => {
    setShowNewTripModal(true)
  }

  const handleTripCreated = (trip: Trip) => {
    setCurrentTrip(trip)
    setShowNewTripModal(false)
  }

  // Show wizard if user wants to create new trip
  if (showNewTripModal) {
    return (
      <TripCreationWizard
        onClose={() => setShowNewTripModal(false)}
        onTripCreated={handleTripCreated}
      />
    )
  }

  // Show trip selector if no trip is selected
  if (isSelectingTrip || !currentTrip) {
    return (
      <>
        <TripSelector onTripSelect={handleTripSelect} onNewTrip={handleNewTrip} />
      </>
    )
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
          onAddEvent={(date: Date) => {
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

  // Main app layout when trip is selected
  return (
    <SidebarProvider>
      <ErrorBoundary
        fallback={
          <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#dc2626' }}>
            Navigation error occurred. Please refresh the page.
          </div>
        }
      >
        <AppSidebar activeCategory={activeCategory} onCategorySelect={handleCategorySelect} />
      </ErrorBoundary>

      <SidebarInset>
        <ErrorBoundary
          fallback={
            <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#dc2626' }}>
              Header error occurred. Please refresh the page.
            </div>
          }
        >
          <AppHeader currentTrip={currentTrip} onTripSwitch={() => setIsSelectingTrip(true)} />
        </ErrorBoundary>

        <ErrorBoundary>{renderCurrentView()}</ErrorBoundary>
      </SidebarInset>
    </SidebarProvider>
  )
}

function App() {
  return (
    <TripProvider>
      <ErrorBoundary
        onError={(error: Error, errorInfo: React.ErrorInfo) => {
          console.error('App Error Boundary:', error, errorInfo)
          // In production, you would send this to your error reporting service
        }}
      >
        <AppContent />
      </ErrorBoundary>
    </TripProvider>
  )
}

export default App
