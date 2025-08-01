import {
  MapPin,
  Calendar,
  Plane,
  Home as HomeIcon,
  Activity,
  DollarSign,
  FileText,
  BarChart3,
  Settings,
  Home,
} from 'lucide-react'

interface AppSidebarProps {
  isOpen?: boolean
  activeCategory?: string
  onCategorySelect?: (category: string) => void
}

export function AppSidebar({
  isOpen = true,
  activeCategory = 'dashboard',
  onCategorySelect,
}: AppSidebarProps) {
  const categories = [
    { id: 'destinations', name: 'Destinations', icon: MapPin },
    { id: 'itinerary', name: 'Itinerary', icon: Calendar },
    { id: 'transport', name: 'Transport', icon: Plane },
    { id: 'accommodation', name: 'Accommodation', icon: HomeIcon },
    { id: 'activities', name: 'Activities', icon: Activity },
    { id: 'budget', name: 'Budget', icon: DollarSign },
    { id: 'documents', name: 'Documents', icon: FileText },
  ]

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect?.(categoryId)
  }

  return (
    <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
      <div className='sidebar-header'>
        <a href='#' className='sidebar-brand'>
          🇧🇷
          <span>Brazil Trip</span>
        </a>
      </div>

      <nav className='sidebar-nav'>
        <div className='nav-section-title'>Overview</div>
        <button
          className={`nav-item ${activeCategory === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('dashboard')}
        >
          <Home className='nav-item-icon' />
          Dashboard
        </button>

        <button
          className={`nav-item ${activeCategory === 'analytics' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('analytics')}
        >
          <BarChart3 className='nav-item-icon' />
          Analytics
        </button>

        <div className='nav-section-title' style={{ marginTop: '2rem' }}>
          Trip Planning
        </div>

        {categories.map(category => {
          const IconComponent = category.icon
          return (
            <button
              key={category.id}
              className={`nav-item ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <IconComponent className='nav-item-icon' />
              {category.name}
            </button>
          )
        })}

        <div className='nav-section-title' style={{ marginTop: '2rem' }}>
          Settings
        </div>

        <button
          className={`nav-item ${activeCategory === 'settings' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('settings')}
        >
          <Settings className='nav-item-icon' />
          Settings
        </button>
      </nav>
    </aside>
  )
}
