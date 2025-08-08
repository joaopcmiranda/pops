/**
 * @fileoverview Storybook Stories for QuickStats Component
 *
 * Comprehensive stories showcasing the POps Quick Stats component with different
 * data states, loading scenarios, and metric variations. Demonstrates the
 * cross-application data aggregation and display functionality.
 */

import type { Meta, StoryObj } from '@storybook/react-vite'
import { QuickStats } from './QuickStats'
import { AppSuiteProvider } from '@pops/navigation'
import type { PopsUser, AuthState } from '@pops/navigation'

const meta: Meta<typeof QuickStats> = {
  title: 'Hub/QuickStats',
  component: QuickStats,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'QuickStats displays key metrics and statistics from across all POps applications in a compact grid format. It provides a quick overview of user activity and important numbers.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Mock user for authentication context
const mockUser: PopsUser = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  preferences: {
    theme: 'system' as const,
    locale: 'en-US',
    timezone: 'America/New_York',
    notifications: {
      push: true,
      email: true,
      inApp: true,
      frequency: 'immediate' as const,
    },
  },
  lastActive: new Date().toISOString(),
}

/**
 * Story wrapper with AppSuiteProvider context
 */
function StoryWrapper({
  children,
  user = mockUser,
  authenticated = true,
}: {
  children: React.ReactNode
  user?: PopsUser
  authenticated?: boolean
}) {
  const authState: AuthState = authenticated
    ? {
        isAuthenticated: true,
        user,
        token: 'mock-jwt-token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        refreshToken: 'mock-refresh-token',
      }
    : {
        isAuthenticated: false,
        user: null,
        token: null,
        expiresAt: null,
        refreshToken: null,
      }

  return (
    <AppSuiteProvider currentApp='hub' initialAuthState={authState}>
      <div className='bg-gray-50 p-8'>{children}</div>
    </AppSuiteProvider>
  )
}

export const Default: Story = {
  render: args => (
    <StoryWrapper>
      <QuickStats {...args} />
    </StoryWrapper>
  ),
  args: {
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default quick stats displaying travel metrics with data from the travel application.',
      },
    },
  },
}

export const DataStates: Story = {
  render: () => (
    <div className='space-y-12 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Quick Stats Data States
        </h2>

        <div className='space-y-8'>
          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-green-900 mb-2'>
                ✅ With Data (Travel App Online)
              </h3>
              <p className='text-gray-600'>
                Quick stats showing actual data when the travel application is online and providing
                metrics. Shows realistic numbers for an active user.
              </p>
            </div>
            <StoryWrapper>
              <div className='quick-stats'>
                <div className='stat-card'>
                  <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-blue-50 dark:bg-blue-900/20'>
                    <div className='h-6 w-6 text-blue-600 dark:text-blue-400'>📅</div>
                  </div>
                  <div className='stat-value'>12</div>
                  <div className='stat-label'>Total Trips</div>
                </div>
                <div className='stat-card'>
                  <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-green-50 dark:bg-green-900/20'>
                    <div className='h-6 w-6 text-green-600 dark:text-green-400'>📈</div>
                  </div>
                  <div className='stat-value'>3</div>
                  <div className='stat-label'>Upcoming</div>
                </div>
                <div className='stat-card'>
                  <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-purple-50 dark:bg-purple-900/20'>
                    <div className='h-6 w-6 text-purple-600 dark:text-purple-400'>💰</div>
                  </div>
                  <div className='stat-value'>$24,567</div>
                  <div className='stat-label'>Total Spent</div>
                </div>
                <div className='stat-card'>
                  <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-orange-50 dark:bg-orange-900/20'>
                    <div className='h-6 w-6 text-orange-600 dark:text-orange-400'>👥</div>
                  </div>
                  <div className='stat-value'>5</div>
                  <div className='stat-label'>Active Projects</div>
                </div>
              </div>
            </StoryWrapper>
          </div>

          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-yellow-900 mb-2'>⏳ Loading State</h3>
              <p className='text-gray-600'>
                Quick stats showing loading spinners when data is being fetched from applications.
                This state appears during initial load or refresh operations.
              </p>
            </div>
            <div className='quick-stats'>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-blue-50 dark:bg-blue-900/20'>
                  <div className='h-6 w-6 text-blue-600 dark:text-blue-400'>📅</div>
                </div>
                <div className='stat-value'>
                  <div className='loading-spinner mx-auto'></div>
                </div>
                <div className='stat-label'>Total Trips</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-green-50 dark:bg-green-900/20'>
                  <div className='h-6 w-6 text-green-600 dark:text-green-400'>📈</div>
                </div>
                <div className='stat-value'>
                  <div className='loading-spinner mx-auto'></div>
                </div>
                <div className='stat-label'>Upcoming</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-purple-50 dark:bg-purple-900/20'>
                  <div className='h-6 w-6 text-purple-600 dark:text-purple-400'>💰</div>
                </div>
                <div className='stat-value'>
                  <div className='loading-spinner mx-auto'></div>
                </div>
                <div className='stat-label'>Total Spent</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-orange-50 dark:bg-orange-900/20'>
                  <div className='h-6 w-6 text-orange-600 dark:text-orange-400'>👥</div>
                </div>
                <div className='stat-value'>
                  <div className='loading-spinner mx-auto'></div>
                </div>
                <div className='stat-label'>Active Projects</div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-red-900 mb-2'>
                ❌ No Data (Travel App Offline)
              </h3>
              <p className='text-gray-600'>
                Quick stats showing zero values when the travel application is offline or
                unavailable. Falls back to initial data structure with empty values.
              </p>
            </div>
            <StoryWrapper>
              <QuickStats />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-12 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-4'>Quick Stats Features:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h5 className='font-medium text-blue-800 mb-2'>Data Integration:</h5>
              <ul className='text-sm text-blue-700 space-y-1'>
                <li>• Cross-domain data fetching</li>
                <li>• Real-time updates every 10 minutes</li>
                <li>• App status-aware data loading</li>
                <li>• Graceful fallback to initial values</li>
                <li>• Automatic retry on failure</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium text-blue-800 mb-2'>Visual Design:</h5>
              <ul className='text-sm text-blue-700 space-y-1'>
                <li>• Color-coded stat categories</li>
                <li>• Consistent icon and layout system</li>
                <li>• Loading state animations</li>
                <li>• Dark mode support</li>
                <li>• Responsive grid layout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive view of different data states including loaded data, loading states, and empty states.',
      },
    },
  },
}

export const MetricVariations: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Metric Variations & Scenarios
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-green-900 mb-2'>🏆 Active User</h3>
              <p className='text-gray-600'>
                Stats for a user with significant travel activity and multiple ongoing projects.
              </p>
            </div>
            <div className='quick-stats'>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-blue-50'>
                  <div className='h-6 w-6 text-blue-600'>📅</div>
                </div>
                <div className='stat-value'>47</div>
                <div className='stat-label'>Total Trips</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-green-50'>
                  <div className='h-6 w-6 text-green-600'>📈</div>
                </div>
                <div className='stat-value'>8</div>
                <div className='stat-label'>Upcoming</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-purple-50'>
                  <div className='h-6 w-6 text-purple-600'>💰</div>
                </div>
                <div className='stat-value'>$127,890</div>
                <div className='stat-label'>Total Spent</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-orange-50'>
                  <div className='h-6 w-6 text-orange-600'>👥</div>
                </div>
                <div className='stat-value'>12</div>
                <div className='stat-label'>Active Projects</div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-blue-900 mb-2'>🌱 New User</h3>
              <p className='text-gray-600'>
                Stats for a new user just getting started with minimal activity.
              </p>
            </div>
            <div className='quick-stats'>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-blue-50'>
                  <div className='h-6 w-6 text-blue-600'>📅</div>
                </div>
                <div className='stat-value'>2</div>
                <div className='stat-label'>Total Trips</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-green-50'>
                  <div className='h-6 w-6 text-green-600'>📈</div>
                </div>
                <div className='stat-value'>1</div>
                <div className='stat-label'>Upcoming</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-purple-50'>
                  <div className='h-6 w-6 text-purple-600'>💰</div>
                </div>
                <div className='stat-value'>$1,245</div>
                <div className='stat-label'>Total Spent</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-orange-50'>
                  <div className='h-6 w-6 text-orange-600'>👥</div>
                </div>
                <div className='stat-value'>1</div>
                <div className='stat-label'>Active Projects</div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-purple-900 mb-2'>💼 Business Traveler</h3>
              <p className='text-gray-600'>
                Stats for a frequent business traveler with high activity and spending.
              </p>
            </div>
            <div className='quick-stats'>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-blue-50'>
                  <div className='h-6 w-6 text-blue-600'>📅</div>
                </div>
                <div className='stat-value'>156</div>
                <div className='stat-label'>Total Trips</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-green-50'>
                  <div className='h-6 w-6 text-green-600'>📈</div>
                </div>
                <div className='stat-value'>23</div>
                <div className='stat-label'>Upcoming</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-purple-50'>
                  <div className='h-6 w-6 text-purple-600'>💰</div>
                </div>
                <div className='stat-value'>$567,234</div>
                <div className='stat-label'>Total Spent</div>
              </div>
              <div className='stat-card'>
                <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-orange-50'>
                  <div className='h-6 w-6 text-orange-600'>👥</div>
                </div>
                <div className='stat-value'>34</div>
                <div className='stat-label'>Active Projects</div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>🏠 Empty State</h3>
              <p className='text-gray-600'>
                Stats for a user with no activity or when data is unavailable.
              </p>
            </div>
            <StoryWrapper>
              <QuickStats />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-100'>
          <h4 className='font-semibold text-emerald-900 mb-4'>Metric Categories:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-4 h-4 bg-blue-500 rounded'></div>
                <h5 className='font-medium text-gray-900'>Total Trips</h5>
              </div>
              <p className='text-sm text-gray-600'>
                Cumulative count of all trips taken by the user
              </p>
            </div>
            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-4 h-4 bg-green-500 rounded'></div>
                <h5 className='font-medium text-gray-900'>Upcoming</h5>
              </div>
              <p className='text-sm text-gray-600'>Number of planned trips in the future</p>
            </div>
            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-4 h-4 bg-purple-500 rounded'></div>
                <h5 className='font-medium text-gray-900'>Total Spent</h5>
              </div>
              <p className='text-sm text-gray-600'>Sum of all travel expenses across all trips</p>
            </div>
            <div className='bg-white p-4 rounded-lg'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-4 h-4 bg-orange-500 rounded'></div>
                <h5 className='font-medium text-gray-900'>Active Projects</h5>
              </div>
              <p className='text-sm text-gray-600'>
                Number of ongoing travel projects or itineraries
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different metric scenarios showing how quick stats appear for various user types and activity levels.',
      },
    },
  },
}

export const ResponsiveBehavior: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Responsive Quick Stats
        </h2>

        <div className='space-y-8'>
          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='p-6 bg-blue-50 border-b border-blue-100'>
              <h3 className='text-xl font-semibold text-blue-900'>🖥️ Desktop Layout</h3>
              <p className='text-blue-700 mt-2'>
                Horizontal grid layout with four stats side by side for optimal desktop viewing
              </p>
            </div>
            <div className='p-6'>
              <StoryWrapper>
                <QuickStats />
              </StoryWrapper>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='p-6 bg-green-50 border-b border-green-100'>
              <h3 className='text-xl font-semibold text-green-900'>📱 Mobile Layout</h3>
              <p className='text-green-700 mt-2'>
                Grid adjusts to 2x2 layout on smaller screens for better mobile experience
              </p>
            </div>
            <div className='max-w-sm mx-auto border-x-2 border-gray-300 p-6'>
              <StoryWrapper>
                <QuickStats />
              </StoryWrapper>
            </div>
          </div>
        </div>

        <div className='mt-8 p-6 bg-violet-50 rounded-lg border border-violet-100'>
          <h4 className='font-semibold text-violet-900 mb-4'>Responsive Grid Features:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h5 className='font-medium text-violet-800 mb-2'>Layout Breakpoints:</h5>
              <ul className='text-sm text-violet-700 space-y-1'>
                <li>
                  • <strong>Desktop:</strong> 4 columns in a row
                </li>
                <li>
                  • <strong>Tablet:</strong> 4 columns with adjusted spacing
                </li>
                <li>
                  • <strong>Mobile:</strong> 2x2 grid layout
                </li>
                <li>• Consistent card proportions</li>
                <li>• Optimal spacing for all sizes</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium text-violet-800 mb-2'>Visual Adaptation:</h5>
              <ul className='text-sm text-violet-700 space-y-1'>
                <li>• Icons remain prominent at all sizes</li>
                <li>• Text scales appropriately</li>
                <li>• Colors and contrast maintained</li>
                <li>• Touch targets optimized for mobile</li>
                <li>• Loading states work across devices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the quick stats component adapts to different screen sizes while maintaining readability and visual appeal.',
      },
    },
  },
}

export const IntegrationStates: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          App Integration States
        </h2>

        <div className='space-y-8'>
          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-green-900 mb-2'>🟢 Travel App Online</h3>
              <p className='text-gray-600'>
                Quick stats with live data from the travel application. Shows current metrics and
                updates automatically every 10 minutes.
              </p>
            </div>
            <StoryWrapper>
              <QuickStats />
            </StoryWrapper>
          </div>

          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-yellow-900 mb-2'>🟡 Travel App Degraded</h3>
              <p className='text-gray-600'>
                Quick stats when travel application is experiencing slow performance. Data may be
                stale or take longer to load but is still available.
              </p>
            </div>
            <StoryWrapper>
              <QuickStats />
            </StoryWrapper>
          </div>

          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-red-900 mb-2'>🔴 Travel App Offline</h3>
              <p className='text-gray-600'>
                Quick stats when travel application is unavailable. Shows default values and
                indicates that fresh data cannot be fetched.
              </p>
            </div>
            <StoryWrapper>
              <QuickStats />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-8 p-6 bg-amber-50 rounded-lg border border-amber-100'>
          <h4 className='font-semibold text-amber-900 mb-4'>Cross-Domain Integration:</h4>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-amber-800'>
            <div>
              <h5 className='font-medium mb-2'>Data Fetching:</h5>
              <ul className='space-y-1'>
                <li>• Uses useCrossDomainData hook</li>
                <li>• 10-minute refresh interval</li>
                <li>• Conditional fetching based on app status</li>
                <li>• Graceful fallback to initial data</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium mb-2'>State Management:</h5>
              <ul className='space-y-1'>
                <li>• App status monitoring from AppSuite</li>
                <li>• Loading state handling</li>
                <li>• Error state management</li>
                <li>• Automatic retry mechanisms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how quick stats behave with different travel app connection states and data availability.',
      },
    },
  },
}
