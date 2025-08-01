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
    <aside className={`app-sidebar ${isOpen ? 'open' : ''} animate-slide-in-left`}>
      <div className='sidebar-header'>
        <a href='#' className='sidebar-brand'>
          🇧🇷
          <span>Brazil Trip</span>
        </a>
      </div>

      <nav className='sidebar-nav'>
        <div className='nav-section-title'>Overview</div>
        <button
          className={`nav-item nav-item-hover focus-ring ${activeCategory === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('dashboard')}
        >
          <Home className='nav-item-icon' />
          Dashboard
        </button>

        <button
          className={`nav-item nav-item-hover focus-ring ${activeCategory === 'calendar' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('calendar')}
        >
          <CalendarDays className='nav-item-icon' />
          Calendar
        </button>

        <button
          className={`nav-item nav-item-hover focus-ring ${activeCategory === 'analytics' ? 'active' : ''}`}
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
              className={`nav-item nav-item-hover focus-ring ${activeCategory === category.id ? 'active' : ''}`}
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
          className={`nav-item nav-item-hover focus-ring ${activeCategory === 'readme' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('readme')}
        >
          <BookOpen className='nav-item-icon' />
          Documentation
        </button>

        <button
          className={`nav-item nav-item-hover focus-ring ${activeCategory === 'settings' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('settings')}
        >
          <Settings className='nav-item-icon' />
          Settings
        </button>
      </nav>
    </aside>
  )
}
