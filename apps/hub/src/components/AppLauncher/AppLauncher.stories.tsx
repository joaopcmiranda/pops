/**
 * @fileoverview Storybook Stories for AppLauncher Component
 *
 * Comprehensive stories showcasing the POps App Launcher component with different
 * app states, connection statuses, and grid layouts. Demonstrates the central
 * navigation hub for accessing all POps applications.
 */

import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppLauncher } from './AppLauncher'
import { AppSuiteProvider } from '@pops/navigation'
import type { PopsUser, AuthState } from '@pops/navigation'

const meta: Meta<typeof AppLauncher> = {
  title: 'Hub/AppLauncher',
  component: AppLauncher,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The AppLauncher displays all available POps applications in a grid format with status indicators and quick access links. It serves as the central navigation hub for the POps ecosystem.',
      },
    },
  },
  argTypes: {
    onBackToDashboard: {
      action: 'backToDashboard',
      description: 'Callback when user wants to return to dashboard',
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
      <div className='min-h-screen bg-gray-50'>{children}</div>
    </AppSuiteProvider>
  )
}

export const Default: Story = {
  render: args => (
    <StoryWrapper>
      <AppLauncher {...args} />
    </StoryWrapper>
  ),
  args: {
    onBackToDashboard: () => console.log('Back to dashboard clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default app launcher showing all POps applications with online status indicators.',
      },
    },
  },
}

export const AppStatusVariations: Story = {
  render: () => (
    <div className='space-y-12 bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto p-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>App Status Variations</h2>

        <div className='space-y-12'>
          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-green-900 mb-2'>✅ All Apps Online</h3>
              <p className='text-gray-600'>
                Ideal state where all POps applications are running and responding normally. All
                status indicators show green with "Available" labels.
              </p>
            </div>
            <StoryWrapper>
              <AppLauncher onBackToDashboard={() => console.log('Back to dashboard')} />
            </StoryWrapper>
          </div>

          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-yellow-900 mb-2'>⚠️ Mixed App States</h3>
              <p className='text-gray-600'>
                Realistic scenario showing different app states: some online, some degraded
                performance, some offline, and some under maintenance. Each status has its own
                visual indicator.
              </p>
            </div>
            <StoryWrapper>
              <AppLauncher onBackToDashboard={() => console.log('Back to dashboard')} />
            </StoryWrapper>
          </div>

          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-red-900 mb-2'>❌ All Apps Offline</h3>
              <p className='text-gray-600'>
                System outage scenario where all applications are unavailable. Shows how the
                launcher handles complete system downtime with appropriate visual feedback.
              </p>
            </div>
            <StoryWrapper>
              <AppLauncher onBackToDashboard={() => console.log('Back to dashboard')} />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-12 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-4'>Status Indicator Legend:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='flex items-center gap-3 bg-white p-3 rounded-lg'>
              <div className='w-3 h-3 bg-green-500 rounded-full'></div>
              <div>
                <div className='font-medium text-gray-900'>Online</div>
                <div className='text-sm text-gray-600'>Fully operational</div>
              </div>
            </div>
            <div className='flex items-center gap-3 bg-white p-3 rounded-lg'>
              <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
              <div>
                <div className='font-medium text-gray-900'>Degraded</div>
                <div className='text-sm text-gray-600'>Slow performance</div>
              </div>
            </div>
            <div className='flex items-center gap-3 bg-white p-3 rounded-lg'>
              <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
              <div>
                <div className='font-medium text-gray-900'>Maintenance</div>
                <div className='text-sm text-gray-600'>Scheduled downtime</div>
              </div>
            </div>
            <div className='flex items-center gap-3 bg-white p-3 rounded-lg'>
              <div className='w-3 h-3 bg-red-500 rounded-full'></div>
              <div>
                <div className='font-medium text-gray-900'>Offline</div>
                <div className='text-sm text-gray-600'>Not responding</div>
              </div>
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
          'Comprehensive view of different app status scenarios showing how the launcher handles various system states.',
      },
    },
  },
}

export const ApplicationGrid: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          POps Application Ecosystem
        </h2>

        <div className='bg-white rounded-lg shadow-sm border p-6 mb-8'>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>🎯 Complete App Suite</h3>
            <p className='text-gray-600'>
              The POps ecosystem includes 10 specialized applications, each designed for specific
              personal operations tasks. Click any app card to navigate to that application.
            </p>
          </div>

          <StoryWrapper>
            <AppLauncher onBackToDashboard={() => console.log('Back to dashboard')} />
          </StoryWrapper>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>🏠 Hub</h4>
            <p className='text-sm text-gray-600'>
              Central dashboard for accessing all applications and viewing unified metrics
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>✈️ Travel</h4>
            <p className='text-sm text-gray-600'>
              Trip planning, itinerary management, and travel expense tracking
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>💰 Money</h4>
            <p className='text-sm text-gray-600'>
              Budget tracking, expense management, and financial planning tools
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>👤 Accounts</h4>
            <p className='text-sm text-gray-600'>
              User profile, authentication, and account security management
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>🎉 Events</h4>
            <p className='text-sm text-gray-600'>
              Event planning, RSVP management, and social calendar coordination
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>📄 Documents</h4>
            <p className='text-sm text-gray-600'>
              Document storage, organization, and sharing with version control
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>🍳 Recipes</h4>
            <p className='text-sm text-gray-600'>
              Recipe collection, meal planning, and grocery list generation
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>🏡 Home</h4>
            <p className='text-sm text-gray-600'>
              Home automation, maintenance tracking, and household management
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>🏥 Health</h4>
            <p className='text-sm text-gray-600'>
              Health tracking, fitness goals, and wellness monitoring tools
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>⚙️ Admin</h4>
            <p className='text-sm text-gray-600'>
              System administration, user management, and configuration settings
            </p>
          </div>
        </div>

        <div className='mt-8 p-6 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-4'>Application Features:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h5 className='font-medium text-purple-800 mb-2'>Visual Design:</h5>
              <ul className='text-sm text-purple-700 space-y-1'>
                <li>• Consistent card-based layout</li>
                <li>• Distinctive app icons and colors</li>
                <li>• Status indicators for each app</li>
                <li>• Hover effects and transitions</li>
                <li>• Responsive grid layout</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium text-purple-800 mb-2'>Functionality:</h5>
              <ul className='text-sm text-purple-700 space-y-1'>
                <li>• Click to navigate to app</li>
                <li>• Real-time status monitoring</li>
                <li>• External link handling</li>
                <li>• Back to dashboard navigation</li>
                <li>• Accessibility support</li>
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
          'Complete overview of all POps applications with descriptions and their purposes in the ecosystem.',
      },
    },
  },
}

export const ResponsiveGrid: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Responsive App Grid</h2>

        <div className='space-y-8'>
          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='p-6 bg-blue-50 border-b border-blue-100'>
              <h3 className='text-xl font-semibold text-blue-900'>🖥️ Desktop Layout</h3>
              <p className='text-blue-700 mt-2'>
                Full grid layout with multiple columns for optimal desktop viewing
              </p>
            </div>
            <div className='p-6'>
              <StoryWrapper>
                <AppLauncher onBackToDashboard={() => console.log('Back to dashboard')} />
              </StoryWrapper>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='p-6 bg-green-50 border-b border-green-100'>
              <h3 className='text-xl font-semibold text-green-900'>📱 Mobile Layout</h3>
              <p className='text-green-700 mt-2'>
                Single column stack for mobile devices with touch-friendly targets
              </p>
            </div>
            <div className='max-w-md mx-auto border-x-2 border-gray-300'>
              <StoryWrapper>
                <AppLauncher onBackToDashboard={() => console.log('Back to dashboard')} />
              </StoryWrapper>
            </div>
          </div>
        </div>

        <div className='mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-100'>
          <h4 className='font-semibold text-emerald-900 mb-4'>Responsive Design Features:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h5 className='font-medium text-emerald-800 mb-2'>Grid Breakpoints:</h5>
              <ul className='text-sm text-emerald-700 space-y-1'>
                <li>
                  • <strong>Desktop:</strong> Multi-column grid (3-4 per row)
                </li>
                <li>
                  • <strong>Tablet:</strong> 2-column layout
                </li>
                <li>
                  • <strong>Mobile:</strong> Single column stack
                </li>
                <li>• Automatic gap adjustments</li>
                <li>• Consistent card proportions</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium text-emerald-800 mb-2'>Touch Optimization:</h5>
              <ul className='text-sm text-emerald-700 space-y-1'>
                <li>• Minimum 44px touch targets</li>
                <li>• Adequate spacing between cards</li>
                <li>• Clear visual feedback on tap</li>
                <li>• Swipe-friendly navigation</li>
                <li>• Accessible button sizes</li>
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
          'Demonstrates how the app launcher grid adapts to different screen sizes and maintains usability.',
      },
    },
  },
}

export const InteractionStates: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          App Launcher Interactions
        </h2>

        <div className='bg-white rounded-lg shadow-sm border p-6 mb-8'>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>🎮 Interactive App Grid</h3>
            <p className='text-gray-600 mb-4'>
              Click any app card to navigate to that application. The "Back to Dashboard" button
              returns you to the main hub. Each app shows its current status and availability.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
              <div className='bg-blue-50 p-4 rounded-lg'>
                <h4 className='font-medium text-blue-900 mb-2'>🖱️ Click to Launch</h4>
                <p className='text-sm text-blue-700'>
                  App cards are clickable and will navigate to the respective application domain.
                </p>
              </div>
              <div className='bg-green-50 p-4 rounded-lg'>
                <h4 className='font-medium text-green-900 mb-2'>🔄 Real-time Status</h4>
                <p className='text-sm text-green-700'>
                  Status indicators update in real-time to show current app availability.
                </p>
              </div>
              <div className='bg-purple-50 p-4 rounded-lg'>
                <h4 className='font-medium text-purple-900 mb-2'>↩️ Easy Navigation</h4>
                <p className='text-sm text-purple-700'>
                  Back button provides clear path to return to the main dashboard.
                </p>
              </div>
            </div>
          </div>

          <StoryWrapper>
            <AppLauncher
              onBackToDashboard={() => {
                console.log('Back to dashboard clicked')
                alert('Would navigate back to dashboard')
              }}
            />
          </StoryWrapper>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>🎯 User Interactions</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>App Launch:</strong> Click cards to navigate to applications
              </li>
              <li>
                • <strong>Status Check:</strong> Visual indicators show app availability
              </li>
              <li>
                • <strong>Back Navigation:</strong> Return to dashboard with one click
              </li>
              <li>
                • <strong>Hover Effects:</strong> Cards provide visual feedback on hover
              </li>
              <li>
                • <strong>External Links:</strong> Apps open in current window or new tab
              </li>
            </ul>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>⚡ Performance Features</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Fast Rendering:</strong> Optimized app grid rendering
              </li>
              <li>
                • <strong>Status Caching:</strong> Efficient status indicator updates
              </li>
              <li>
                • <strong>Lazy Loading:</strong> App metadata loaded on demand
              </li>
              <li>
                • <strong>Memory Efficient:</strong> Minimal resource usage
              </li>
              <li>
                • <strong>Responsive:</strong> Smooth interactions across devices
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-100'>
          <h4 className='font-semibold text-yellow-900 mb-3'>🔗 Navigation Architecture:</h4>
          <div className='text-sm text-yellow-800 space-y-2'>
            <p>
              <strong>Cross-Domain Navigation:</strong> The AppLauncher handles navigation between
              different POps application domains using the navigation package's navigateToApp
              function.
            </p>
            <p>
              <strong>Status Integration:</strong> Real-time app status is provided by the AppSuite
              context, showing connection health and response times for each application.
            </p>
            <p>
              <strong>Context Preservation:</strong> User authentication and preferences are
              maintained across all application transitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demonstration of app launcher functionality including navigation, status monitoring, and user interactions.',
      },
    },
  },
}
