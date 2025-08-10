import {
  MapPin,
  Calendar,
  CalendarDays,
  Plane,
  Home as HomeIcon,
  Activity,
  DollarSign,
  FileText,
  BarChart3,
  Settings,
  Home,
  BookOpen,
  Heart,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@pops/ui'

import { TripSelectorSidebar } from './TripSelectorSidebar'
import { useTripContext } from '@/hooks/useTripContext'
import type { Trip } from '@pops/types'

interface AppSidebarProps {
  activeCategory?: string
  onCategorySelect?: (category: string) => void
  availableTrips?: Trip[]
  isMobile?: boolean
  isOpen?: boolean
  onClose?: () => void
}

export function AppSidebar({
  activeCategory = 'dashboard',
  onCategorySelect,
  availableTrips = [],
  isMobile = false,
  isOpen = true,
  onClose,
}: AppSidebarProps) {
  const { currentTrip, setCurrentTrip, setShowNewTripModal } = useTripContext()
  const overviewItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'calendar', name: 'Calendar', icon: CalendarDays },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ]

  const planningItems = [
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'destinations', name: 'Destinations', icon: MapPin },
    { id: 'itinerary', name: 'Itinerary', icon: Calendar },
    { id: 'transport', name: 'Transport', icon: Plane },
    { id: 'accommodation', name: 'Accommodation', icon: HomeIcon },
    { id: 'activities', name: 'Activities', icon: Activity },
    { id: 'budget', name: 'Budget', icon: DollarSign },
    { id: 'documents', name: 'Documents', icon: FileText },
  ]

  const settingsItems = [
    { id: 'readme', name: 'Documentation', icon: BookOpen },
    { id: 'settings', name: 'Settings', icon: Settings },
  ]

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect?.(categoryId)
    // Close mobile sidebar when category is selected
    if (isMobile) {
      onClose?.()
    }
  }

  const handleTripChange = (trip: Trip) => {
    setCurrentTrip(trip)
  }

  const handleCreateTrip = () => {
    setShowNewTripModal(true)
  }

  return (
    <Sidebar 
      collapsible='none' 
      className={`${isMobile ? 'mobile-sidebar' : ''} ${!isOpen ? 'sidebar-hidden' : ''}`}
    >
      <SidebarHeader>
        <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
          <button
            className='flex items-center gap-2 px-2 py-1 text-left w-full hover:bg-accent rounded-md transition-colors'
            onClick={() => handleCategoryClick('dashboard')}
          >
            <span className='text-xl'>✈️</span>
            <span className='font-semibold'>Trip Organizer</span>
          </button>
        </div>

        <TripSelectorSidebar
          currentTrip={currentTrip}
          availableTrips={availableTrips}
          onTripChange={handleTripChange}
          onCreateNew={handleCreateTrip}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {overviewItems.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeCategory === item.id}
                    onClick={() => handleCategoryClick(item.id)}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Trip Planning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {planningItems.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeCategory === item.id}
                    onClick={() => handleCategoryClick(item.id)}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map(item => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeCategory === item.id}
                    onClick={() => handleCategoryClick(item.id)}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
