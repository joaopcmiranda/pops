import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AppSidebar } from './AppSidebar'
import { AppLayoutStory } from './StoryWrapper'

import { SidebarProvider } from '@/components/ui/sidebar/sidebar'

const meta: Meta<typeof AppSidebar> = {
  title: 'Components/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    activeCategory: {
      control: 'select',
      options: [
        'dashboard',
        'calendar',
        'analytics',
        'destinations',
        'itinerary',
        'transport',
        'accommodation',
        'activities',
        'budget',
        'documents',
        'readme',
        'settings',
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppLayoutStory
      title='App Sidebar - Default Layout'
      description='Main application sidebar with navigation categories'
    >
      <SidebarProvider defaultOpen={true}>
        <div className='flex h-screen'>
          <AppSidebar
            activeCategory='dashboard'
            onCategorySelect={category => alert(`📂 Selected: ${category}`)}
          />
          <div className='flex-1 bg-gray-50'>
            <div className='p-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>Main Content Area</h2>
              <p className='text-gray-600 mb-6'>
                This area would show the content for the selected category. Click on any sidebar
                item to see the selection.
              </p>

              <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-800 mb-3'>Navigation Features</h3>
                <ul className='text-sm text-gray-600 space-y-2'>
                  <li>
                    • <strong>Overview Section:</strong> Dashboard, Calendar, Analytics
                  </li>
                  <li>
                    • <strong>Trip Planning:</strong> Destinations, Itinerary, Transport, etc.
                  </li>
                  <li>
                    • <strong>Settings:</strong> Documentation and preferences
                  </li>
                  <li>
                    • <strong>Active States:</strong> Highlight current section
                  </li>
                  <li>
                    • <strong>Hover Effects:</strong> Interactive feedback
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </AppLayoutStory>
  ),
}

export const AllStates: Story = {
  render: () => {
    const categories = [
      'dashboard',
      'calendar',
      'analytics',
      'destinations',
      'itinerary',
      'transport',
      'accommodation',
      'activities',
      'budget',
      'documents',
      'readme',
      'settings',
    ]

    return (
      <div className='bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen p-8'>
        <div className='max-w-7xl mx-auto space-y-6'>
          <h2 className='text-3xl font-bold text-gray-800 text-center'>
            Sidebar with Different Active States
          </h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {categories.slice(0, 6).map(category => (
              <div key={category} className='bg-white rounded-xl shadow-lg overflow-hidden'>
                <SidebarProvider defaultOpen={true}>
                  <div className='flex h-80'>
                    <AppSidebar
                      activeCategory={category}
                      onCategorySelect={cat => alert(`📂 ${cat} selected`)}
                    />
                    <div className='flex-1 p-6 bg-gray-50 flex items-center justify-center'>
                      <div className='text-center'>
                        <h3 className='text-xl font-semibold text-gray-800 capitalize'>
                          {category}
                        </h3>
                        <p className='text-gray-600 mt-2'>Active state preview</p>
                      </div>
                    </div>
                  </div>
                </SidebarProvider>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

export const Collapsed: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <div className='text-center space-y-2'>
          <h2 className='text-2xl font-bold text-gray-800'>Collapsed Sidebar</h2>
          <p className='text-gray-600'>Space-saving layout for smaller screens</p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <SidebarProvider defaultOpen={false}>
            <div className='flex h-96'>
              <AppSidebar
                activeCategory='destinations'
                onCategorySelect={category => alert(`📂 Selected: ${category}`)}
              />
              <div className='flex-1 p-8 bg-gray-50'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>Expanded Content Area</h2>
                <p className='text-gray-600 mb-4'>
                  When the sidebar is collapsed, more space is available for content. This is ideal
                  for mobile devices or when users want to focus on content.
                </p>
                <div className='bg-green-100 rounded-lg p-4'>
                  <h3 className='font-semibold text-green-800 mb-2'>Benefits of Collapsed Mode:</h3>
                  <ul className='text-sm text-green-700 space-y-1'>
                    <li>• More screen real estate for content</li>
                    <li>• Better mobile experience</li>
                    <li>• Icons remain visible for quick navigation</li>
                    <li>• Hover states can show labels</li>
                  </ul>
                </div>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </div>
  ),
}

const InteractiveComponent = () => {
  const [activeCategory, setActiveCategory] = useState('dashboard')
  const [isOpen, setIsOpen] = useState(true)

  const categoryDescriptions = {
    dashboard: 'Overview of your entire trip with quick stats and recent activity',
    calendar: 'Timeline view of all your trip events and activities',
    analytics: 'Insights and statistics about your travel patterns and spending',
    destinations: 'Places you want to visit with details and recommendations',
    itinerary: 'Day-by-day schedule and planned activities',
    transport: 'Flights, trains, buses, and other transportation bookings',
    accommodation: 'Hotels, hostels, and other places you will stay',
    activities: 'Tours, experiences, and things to do at your destination',
    budget: 'Track expenses and manage your travel budget',
    documents: 'Important papers, tickets, and travel documents',
    readme: 'Help documentation and user guides',
    settings: 'App preferences and account settings',
  }

  return (
    <div className='bg-gradient-to-br from-indigo-50 to-cyan-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto space-y-6'>
        <div className='text-center space-y-2'>
          <h2 className='text-3xl font-bold text-gray-800'>Interactive Sidebar Demo</h2>
          <p className='text-gray-600'>Click on any menu item to see content change</p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
            <div className='flex h-[600px]'>
              <AppSidebar
                activeCategory={activeCategory}
                onCategorySelect={category => {
                  setActiveCategory(category)
                  // Simulate page navigation
                  setTimeout(() => {
                    alert(`🎯 Navigated to ${category.charAt(0).toUpperCase() + category.slice(1)}`)
                  }, 100)
                }}
              />
              <div className='flex-1 p-8 bg-gray-50'>
                <div className='max-w-2xl'>
                  <div className='flex gap-4 mb-6'>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                    >
                      {isOpen ? '◀ Collapse' : '▶ Expand'} Sidebar
                    </button>
                  </div>

                  <h2 className='text-3xl font-bold text-gray-800 mb-4 capitalize'>
                    {activeCategory === 'readme' ? 'Documentation' : activeCategory}
                  </h2>
                  <p className='text-gray-600 mb-6'>
                    {categoryDescriptions[activeCategory as keyof typeof categoryDescriptions]}
                  </p>

                  <div className='bg-white rounded-xl p-6 shadow-sm'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                      Current Section:{' '}
                      {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                    </h3>

                    <div className='space-y-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                        <span className='text-gray-700'>Interactive navigation working</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                        <span className='text-gray-700'>Active state highlighting</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <div className='w-3 h-3 bg-purple-500 rounded-full'></div>
                        <span className='text-gray-700'>Responsive collapse/expand</span>
                      </div>
                    </div>
                  </div>

                  <div className='mt-6 p-4 bg-indigo-50 rounded-lg'>
                    <h4 className='font-semibold text-indigo-800 mb-2'>Try These Actions:</h4>
                    <ul className='text-sm text-indigo-700 space-y-1'>
                      <li>• Click different menu items to see content change</li>
                      <li>• Toggle the sidebar collapse/expand</li>
                      <li>• Notice the smooth transitions and hover effects</li>
                      <li>• Check how icons and labels work together</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
}

export const ResponsiveDemo: Story = {
  render: () => (
    <div className='bg-gradient-to-br from-rose-50 to-orange-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        <div className='text-center space-y-2'>
          <h2 className='text-2xl font-bold text-gray-800'>Responsive Sidebar Behavior</h2>
          <p className='text-gray-600'>How the sidebar adapts to different screen sizes</p>
        </div>

        {/* Desktop */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700'>🖥️ Desktop View (Full Width)</h3>
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <SidebarProvider defaultOpen={true}>
              <div className='flex h-64'>
                <AppSidebar
                  activeCategory='itinerary'
                  onCategorySelect={cat => alert(`Desktop: ${cat}`)}
                />
                <div className='flex-1 p-6 bg-gray-50 flex items-center justify-center'>
                  <span className='text-gray-600'>Desktop content area with full sidebar</span>
                </div>
              </div>
            </SidebarProvider>
          </div>
        </div>

        {/* Tablet */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700'>📱 Tablet View (Collapsed)</h3>
          <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
            <SidebarProvider defaultOpen={false}>
              <div className='flex h-64'>
                <AppSidebar
                  activeCategory='activities'
                  onCategorySelect={cat => alert(`Tablet: ${cat}`)}
                />
                <div className='flex-1 p-6 bg-gray-50 flex items-center justify-center'>
                  <span className='text-gray-600'>Tablet content with collapsed sidebar</span>
                </div>
              </div>
            </SidebarProvider>
          </div>
        </div>

        {/* Mobile */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700'>📱 Mobile View (Hidden/Overlay)</h3>
          <div className='max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='p-6 bg-gray-50 h-64 flex items-center justify-center'>
              <div className='text-center'>
                <span className='text-gray-600 block'>Mobile content (full width)</span>
                <span className='text-xs text-gray-500 mt-2'>Sidebar becomes an overlay</span>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-orange-50 rounded-xl p-6'>
          <h4 className='font-semibold text-gray-700 mb-2'>Responsive Behavior:</h4>
          <ul className='text-sm text-gray-600 space-y-1'>
            <li>
              • <strong>Desktop:</strong> Sidebar always visible, can be collapsed
            </li>
            <li>
              • <strong>Tablet:</strong> Sidebar collapsed by default, icons visible
            </li>
            <li>
              • <strong>Mobile:</strong> Sidebar hidden, accessible via hamburger menu
            </li>
            <li>
              • <strong>Touch:</strong> Swipe gestures for opening/closing on mobile
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
}

const NavigationFlowComponent = () => {
  const [currentFlow, setCurrentFlow] = useState(0)

  const flows = [
    { category: 'dashboard', description: 'Start at the dashboard for trip overview' },
    { category: 'destinations', description: 'Browse and select destinations to visit' },
    { category: 'accommodation', description: 'Find and book places to stay' },
    { category: 'transport', description: 'Book flights, trains, and local transport' },
    { category: 'activities', description: 'Discover and plan activities and tours' },
    { category: 'itinerary', description: 'Organize everything into a daily schedule' },
    { category: 'budget', description: 'Track expenses and manage your budget' },
    { category: 'documents', description: 'Store tickets, confirmations, and documents' },
  ]

  const nextFlow = () => {
    setCurrentFlow(prev => (prev + 1) % flows.length)
  }

  const currentFlowData = flows[currentFlow]

  return (
    <div className='bg-gradient-to-br from-violet-50 to-fuchsia-50 min-h-screen p-8'>
      <div className='max-w-6xl mx-auto space-y-8'>
        <div className='text-center space-y-2'>
          <h2 className='text-3xl font-bold text-gray-800'>Trip Planning Navigation Flow</h2>
          <p className='text-gray-600'>Follow the typical user journey through trip planning</p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <SidebarProvider defaultOpen={true}>
            <div className='flex h-[500px]'>
              <AppSidebar
                activeCategory={currentFlowData.category}
                onCategorySelect={category => {
                  const flowIndex = flows.findIndex(f => f.category === category)
                  if (flowIndex !== -1) setCurrentFlow(flowIndex)
                }}
              />
              <div className='flex-1 p-8 bg-gray-50'>
                <div className='max-w-xl'>
                  <div className='flex items-center gap-4 mb-6'>
                    <div className='bg-violet-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>
                      {currentFlow + 1}
                    </div>
                    <h2 className='text-2xl font-bold text-gray-800 capitalize'>
                      {currentFlowData.category}
                    </h2>
                  </div>

                  <p className='text-gray-600 mb-8 text-lg'>{currentFlowData.description}</p>

                  <div className='space-y-4'>
                    <button
                      onClick={nextFlow}
                      className='bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors'
                    >
                      Next Step ({((currentFlow + 1) % flows.length) + 1}/8)
                    </button>

                    <div className='bg-violet-50 rounded-lg p-4'>
                      <h4 className='font-semibold text-violet-800 mb-2'>
                        Planning Flow Progress:
                      </h4>
                      <div className='flex gap-2'>
                        {flows.map((_, index) => (
                          <div
                            key={index}
                            className={`w-8 h-2 rounded-full ${
                              index <= currentFlow ? 'bg-violet-600' : 'bg-violet-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SidebarProvider>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {flows.map((flow, index) => (
            <div
              key={flow.category}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                index === currentFlow
                  ? 'bg-violet-100 border-2 border-violet-300'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setCurrentFlow(index)}
            >
              <div className='flex items-center gap-2 mb-2'>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === currentFlow ? 'bg-violet-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <h4 className='font-semibold text-gray-800 capitalize'>{flow.category}</h4>
              </div>
              <p className='text-xs text-gray-600'>{flow.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const NavigationFlow: Story = {
  render: () => <NavigationFlowComponent />,
}
