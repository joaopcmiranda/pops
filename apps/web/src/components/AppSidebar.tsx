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
} from '@/components/ui/sidebar/sidebar.tsx'

interface AppSidebarProps {
  activeCategory?: string
  onCategorySelect?: (category: string) => void
}

export function AppSidebar({ activeCategory = 'dashboard', onCategorySelect }: AppSidebarProps) {
  const overviewItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'calendar', name: 'Calendar', icon: CalendarDays },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ]

  const planningItems = [
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
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <button
          className='flex items-center gap-2 px-2 py-1 text-left w-full hover:bg-accent rounded-md transition-colors'
          onClick={() => handleCategoryClick('dashboard')}
        >
          <span className='text-xl'>✈️</span>
          <span className='font-semibold'>Trip Organizer</span>
        </button>
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
