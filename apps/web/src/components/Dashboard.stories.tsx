import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button/button'
import { SkeletonCard } from './ui/skeleton'
import {
  MapPin,
  Calendar,
  Plane,
  Home,
  Activity,
  DollarSign,
  FileText,
  Clock,
  Target,
  ArrowRight,
  Plus,
} from 'lucide-react'
import { AppLayoutStory, ComponentStory } from './StoryWrapper'
import '../styles/story-fonts.css'

const categories = [
  { id: 'destinations', name: 'Destinations', icon: MapPin, color: '#3b82f6', count: 3 },
  { id: 'itinerary', name: 'Itinerary', icon: Calendar, color: '#10b981', count: 12 },
  { id: 'transport', name: 'Transport', icon: Plane, color: '#8b5cf6', count: 5 },
  { id: 'accommodation', name: 'Accommodation', icon: Home, color: '#f59e0b', count: 2 },
  { id: 'activities', name: 'Activities', icon: Activity, color: '#ef4444', count: 8 },
  { id: 'budget', name: 'Budget', icon: DollarSign, color: '#eab308', count: 1 },
  { id: 'documents', name: 'Documents', icon: FileText, color: '#64748b', count: 4 },
]

// Mock Dashboard Component for Storybook
function MockDashboard({
  onCategorySelect,
  loading,
}: {
  onCategorySelect: (category: string) => void
  loading?: boolean
}) {
  const upcomingItems = [
    { id: '1', title: 'Flight to Rio', time: '08:00 AM', date: 'March 15', type: 'transport' },
    {
      id: '2',
      title: 'Christ the Redeemer Visit',
      time: '02:00 PM',
      date: 'March 16',
      type: 'activity',
    },
    {
      id: '3',
      title: 'Copacabana Hotel Check-in',
      time: '03:00 PM',
      date: 'March 15',
      type: 'accommodation',
    },
    { id: '4', title: 'Sugarloaf Mountain', time: '10:00 AM', date: 'March 17', type: 'activity' },
  ]

  const stats = [
    { label: 'Days Until Trip', value: '45', icon: Clock, color: '#3b82f6' },
    { label: 'Budget Used', value: '67%', icon: Target, color: '#10b981' },
    { label: 'Activities Planned', value: '8', icon: Activity, color: '#ef4444' },
  ]

  if (loading) {
    return (
      <div className='p-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {[...Array(7)].map((_, i) => (
            <Card key={i} className='category-card'>
              <SkeletonCard />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='dashboard-container p-6 space-y-8'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Rio de Janeiro Trip</h1>
          <p className='text-gray-600'>March 15-22, 2024 • 7 days</p>
        </div>
        <Button onClick={() => alert('Add new content')}>
          <Plus className='w-4 h-4 mr-2' />
          Add Content
        </Button>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {stats.map((stat, index) => (
          <Card key={index} className='hover:shadow-lg transition-shadow'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>{stat.label}</p>
                  <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
                </div>
                <stat.icon className='w-8 h-8' style={{ color: stat.color }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories Grid */}
      <div>
        <h2 className='text-xl font-semibold mb-6'>Trip Categories</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {categories.map(category => (
            <Card
              key={category.id}
              className='category-card hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105'
              onClick={() => onCategorySelect(category.id)}
            >
              <CardContent className='p-6 text-center'>
                <div className='mb-4'>
                  <div
                    className='w-16 h-16 rounded-full mx-auto flex items-center justify-center'
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <category.icon className='w-8 h-8' style={{ color: category.color }} />
                  </div>
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-1'>{category.name}</h3>
                <p className='text-sm text-gray-600'>{category.count} items</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Items */}
      <div>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>Upcoming Activities</h2>
          <Button variant='outline' size='sm'>
            View All
            <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
        </div>
        <div className='space-y-4'>
          {upcomingItems.map(item => (
            <Card key={item.id} className='hover:shadow-md transition-shadow'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-3 h-3 rounded-full bg-blue-500'></div>
                    <div>
                      <h4 className='font-medium text-gray-900'>{item.title}</h4>
                      <p className='text-sm text-gray-500'>
                        {item.date} at {item.time}
                      </p>
                    </div>
                  </div>
                  <span className='text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 capitalize'>
                    {item.type}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof MockDashboard> = {
  title: 'Components/Dashboard',
  component: MockDashboard,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppLayoutStory
      title='Dashboard - Complete Layout'
      description='Full dashboard with categories, stats, and upcoming activities'
      background='gradient-blue'
    >
      <MockDashboard onCategorySelect={category => alert(`🎯 Selected: ${category}`)} />
    </AppLayoutStory>
  ),
}

export const Loading: Story = {
  render: () => (
    <AppLayoutStory
      title='Dashboard - Loading State'
      description='Dashboard skeleton loading state with animated placeholders'
      background='gradient-green'
    >
      <div className='space-y-8'>
        <div className='flex justify-between items-center'>
          <div className='space-y-2'>
            <div className='h-8 w-64 bg-gray-200 rounded animate-pulse'></div>
            <div className='h-4 w-40 bg-gray-200 rounded animate-pulse'></div>
          </div>
          <div className='h-10 w-32 bg-gray-200 rounded animate-pulse'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <SkeletonCard />
            </Card>
          ))}
        </div>

        <div>
          <div className='h-6 w-32 bg-gray-200 rounded animate-pulse mb-6'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {[...Array(7)].map((_, i) => (
              <Card key={i}>
                <SkeletonCard />
              </Card>
            ))}
          </div>
        </div>

        <div className='p-4 bg-green-50 rounded-lg border border-green-100'>
          <h4 className='font-semibold text-green-900 mb-2'>Loading States:</h4>
          <ul className='text-sm text-green-800 space-y-1'>
            <li>• Skeleton components maintain layout structure</li>
            <li>• Animated placeholders provide visual feedback</li>
            <li>• Different skeleton types for different content areas</li>
          </ul>
        </div>
      </div>
    </AppLayoutStory>
  ),
}

export const Empty: Story = {
  render: () => (
    <AppLayoutStory
      title='Dashboard - Empty State'
      description='Dashboard empty state for new trips with onboarding guidance'
      background='gradient-purple'
    >
      <div className='space-y-8'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>New Trip</h1>
            <p className='text-gray-600'>Start planning your adventure</p>
          </div>
          <Button onClick={() => alert('➕ Add Content clicked!')}>
            <Plus className='w-4 h-4 mr-2' />
            Add Content
          </Button>
        </div>

        <div className='bg-white rounded-xl shadow-sm text-center py-12'>
          <MapPin className='w-16 h-16 text-gray-400 mx-auto mb-4' />
          <h2 className='text-xl font-semibold text-gray-900 mb-2'>No content yet</h2>
          <p className='text-gray-600 mb-6'>
            Start by adding some destinations or activities to your trip.
          </p>
          <Button onClick={() => alert('🚀 Get Started clicked!')}>Get Started</Button>
        </div>

        <div className='p-4 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-2'>Empty State Features:</h4>
          <ul className='text-sm text-purple-800 space-y-1'>
            <li>• Clear visual hierarchy with prominent call-to-action</li>
            <li>• Friendly messaging to encourage user engagement</li>
            <li>• Multiple entry points for adding initial content</li>
          </ul>
        </div>
      </div>
    </AppLayoutStory>
  ),
}

export const CategoryGrid: Story = {
  render: () => (
    <ComponentStory
      title='Dashboard - Category Grid'
      description='Interactive grid of trip categories with hover effects and item counts'
      background='gradient-orange'
    >
      <div className='space-y-8'>
        <h2 className='text-xl font-semibold text-gray-800'>Trip Categories</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {categories.map(category => (
            <Card
              key={category.id}
              className='category-card hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105'
              onClick={() => alert(`🎯 Selected: ${category.name}`)}
            >
              <CardContent className='p-6 text-center'>
                <div className='mb-4'>
                  <div
                    className='w-16 h-16 rounded-full mx-auto flex items-center justify-center'
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <category.icon className='w-8 h-8' style={{ color: category.color }} />
                  </div>
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-1'>{category.name}</h3>
                <p className='text-sm text-gray-600'>{category.count} items</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='p-4 bg-orange-50 rounded-lg border border-orange-100'>
          <h4 className='font-semibold text-orange-900 mb-2'>Category Features:</h4>
          <ul className='text-sm text-orange-800 space-y-1'>
            <li>• Color-coded icons for easy visual identification</li>
            <li>• Item counts show content progress</li>
            <li>• Hover effects and scaling for interactivity</li>
            <li>• Responsive grid adapts to screen sizes</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
