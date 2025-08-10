import React, { useState, useEffect, type ErrorInfo } from 'react'
import {
  MapPin,
  Calendar as CalIcon,
  Plane,
  Home,
  Activity,
  DollarSign,
  FileText,
} from 'lucide-react'
import { UnifiedHeader } from '@pops/navigation'
import { AppSidebar } from '@/components/AppSidebar'
import { Dashboard } from '@/components/Dashboard'
import { ItineraryView } from '@/components/ItineraryView'
import { Calendar } from '@/components/Calendar'
import { CategoryPageMinimal } from '@/components/CategoryPageMinimal'
import { ReadmeView } from '@/components/ReadmeView'
import { WishlistView } from '@/components/WishlistView'
import { BudgetCalculator } from '@/components/BudgetCalculator'
import { TripSelector } from '@/components/TripSelector'
import { TripCreationWizard } from '@/components/TripCreationWizard'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AppSuiteProvider } from '@pops/navigation'
import { AuthProvider } from '@/contexts/AuthContext'
import { TripProvider } from '@/contexts/TripContext'
import { useTripContext } from '@/hooks/useTripContext'
import { TripService } from '@/services/tripService'
import { SidebarInset, SidebarProvider } from '@pops/ui'
import { useIsMobile } from '@/hooks/use-mobile'
import { useSwipeGesture } from '@/hooks/use-mobile-gestures'
import '@/styles/animations.css'
import '@/styles/mobile.css'

// Type interfaces
import type { Trip } from '@pops/types'

function AppContent() {
  const [activeCategory, setActiveCategory] = useState('dashboard')
  const [currentView, setCurrentView] = useState('dashboard')
  const [availableTrips, setAvailableTrips] = useState<Trip[]>([])
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const isMobile = useIsMobile()
  const { currentTrip, setCurrentTrip, isSelectingTrip, setShowNewTripModal, showNewTripModal } =
    useTripContext()

  // Mobile swipe gestures for sidebar
  const swipeGestures = useSwipeGesture({
    onSwipeRight: () => {
      if (isMobile && !isMobileSidebarOpen) {
        setIsMobileSidebarOpen(true)
      }
    },
    onSwipeLeft: () => {
      if (isMobile && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false)
      }
    },
    threshold: 75,
  })

  // Load available trips
  useEffect(() => {
    const loadTrips = async () => {
      try {
        const trips = await TripService.getAllTrips()
        setAvailableTrips(trips)
      } catch (error) {
        console.error('Failed to load trips:', error)
        setAvailableTrips([])
      }
    }

    if (currentTrip) {
      loadTrips()
    }
  }, [currentTrip])

  const handleCategorySelect = (category: string) => {
    console.log('Category selected:', category)
    setActiveCategory(category)
    setCurrentView(category)
    // Close mobile sidebar when category is selected
    if (isMobile) {
      setIsMobileSidebarOpen(false)
    }
  }

  const handleTripSelect = async (tripId: string) => {
    // Fetch the actual trip data from the service
    const trip = TripService.getTripById(tripId)
    if (trip) {
      setCurrentTrip(await trip)
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

  const getPageTitle = (view: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      wishlist: 'Wishlist',
      destinations: 'Destinations',
      itinerary: 'Itinerary',
      transport: 'Transport',
      accommodation: 'Accommodation',
      activities: 'Activities',
      budget: 'Budget',
      documents: 'Documents',
      calendar: 'Calendar',
      analytics: 'Analytics',
      settings: 'Settings',
      readme: 'Documentation',
    }
    return titles[view] || 'Trip Organizer'
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
    wishlist: { name: 'Wishlist', icon: MapPin },
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

    if (currentView === 'wishlist') {
      return <WishlistView />
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

    if (currentView === 'budget') {
      return <BudgetCalculator />
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
    <div
      className={`app-container ${isMobile ? 'mobile' : 'desktop'} ${isMobile && isMobileSidebarOpen ? 'sidebar-open' : ''}`}
      {...(isMobile ? swipeGestures : {})}
    >
      <SidebarProvider>
        {/* Mobile overlay */}
        {isMobile && isMobileSidebarOpen && (
          <div className='mobile-sidebar-overlay' onClick={() => setIsMobileSidebarOpen(false)} />
        )}

        <ErrorBoundary
          fallback={
            <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#dc2626' }}>
              Navigation error occurred. Please refresh the page.
            </div>
          }
        >
          <AppSidebar
            activeCategory={activeCategory}
            onCategorySelect={handleCategorySelect}
            availableTrips={availableTrips}
            isMobile={isMobile}
            isOpen={!isMobile || isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          />
        </ErrorBoundary>

        <SidebarInset>
          <ErrorBoundary
            fallback={
              <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#dc2626' }}>
                Header error occurred. Please refresh the page.
              </div>
            }
          >
            <UnifiedHeader
              currentApp='travel'
              title={getPageTitle(currentView)}
              showDomainSwitcher={!isMobile}
              showNotifications={!isMobile}
              showSearch={!isMobile}
              onMenuToggle={
                isMobile ? () => setIsMobileSidebarOpen(!isMobileSidebarOpen) : undefined
              }
            />
          </ErrorBoundary>

          <div className={`main-content ${isMobile ? 'mobile-content' : ''}`}>
            <ErrorBoundary>{renderCurrentView()}</ErrorBoundary>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

function App() {
  return (
    <AppSuiteProvider currentApp='travel'>
      <AuthProvider>
        <ProtectedRoute>
          <TripProvider>
            <ErrorBoundary
              onError={(error: Error, errorInfo: ErrorInfo) => {
                console.error('App Error Boundary:', error, errorInfo)
                // In production, you would send this to your error reporting service
              }}
            >
              <AppContent />
            </ErrorBoundary>
          </TripProvider>
        </ProtectedRoute>
      </AuthProvider>
    </AppSuiteProvider>
  )
}

export default App
