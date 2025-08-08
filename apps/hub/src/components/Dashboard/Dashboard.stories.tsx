/**
 * @fileoverview Storybook Stories for Dashboard Component
 *
 * Comprehensive stories showcasing the POps Hub Dashboard component with different
 * widget configurations, edit modes, layout states, and user interactions.
 * Demonstrates the customizable grid system and widget management features.
 */

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dashboard } from './Dashboard'
import { AppSuiteProvider } from '@pops/navigation'
import type { PopsUser, AuthState } from '@pops/navigation'

const meta: Meta<typeof Dashboard> = {
  title: 'Hub/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The Dashboard provides a customizable widget-based interface for the POps Hub. Users can add, remove, resize, and rearrange widgets to create their personalized dashboard experience.',
      },
    },
  },
  argTypes: {
    onShowApps: {
      action: 'showApps',
      description: 'Callback when user wants to show the app launcher',
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
      <div className='min-h-screen bg-gray-50 p-6'>{children}</div>
    </AppSuiteProvider>
  )
}

export const Default: Story = {
  render: args => (
    <StoryWrapper>
      <Dashboard {...args} />
    </StoryWrapper>
  ),
  args: {
    onShowApps: () => console.log('Show apps clicked'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default dashboard with standard widget configuration showing travel summary, quick actions, and recent activity widgets.',
      },
    },
  },
}

export const DashboardModes: Story = {
  render: () => (
    <div className='space-y-12 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Dashboard Modes & States
        </h2>

        <div className='space-y-12'>
          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>🏠 Standard Dashboard</h3>
              <p className='text-gray-600'>
                Default dashboard layout with quick stats and customizable widget grid. Users can
                interact with widgets and access quick actions.
              </p>
            </div>
            <div className='min-h-[600px]'>
              <StoryWrapper>
                <Dashboard onShowApps={() => console.log('Show apps')} />
              </StoryWrapper>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border p-6'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>✏️ Edit Mode Simulation</h3>
              <p className='text-gray-600'>
                When edit mode is enabled, widgets become draggable and resizable. Click "Edit"
                button to enable widget customization mode.
              </p>
            </div>
            <div className='min-h-[600px]'>
              <StoryWrapper>
                <Dashboard onShowApps={() => console.log('Show apps')} />
              </StoryWrapper>
            </div>
          </div>
        </div>

        <div className='mt-12 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-4'>Dashboard Features:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <ul className='text-sm text-blue-800 space-y-2'>
              <li>
                • <strong>Responsive Grid:</strong> 12-column layout that adapts to screen size
              </li>
              <li>
                • <strong>Drag & Drop:</strong> Reorder widgets by dragging in edit mode
              </li>
              <li>
                • <strong>Resizable:</strong> Adjust widget sizes using resize handles
              </li>
              <li>
                • <strong>Quick Stats:</strong> Overview metrics from all POps applications
              </li>
            </ul>
            <ul className='text-sm text-blue-800 space-y-2'>
              <li>
                • <strong>Widget Gallery:</strong> Add new widgets from the gallery modal
              </li>
              <li>
                • <strong>Persistent Layout:</strong> Widget positions and sizes are saved
              </li>
              <li>
                • <strong>Remove Widgets:</strong> Delete unwanted widgets in edit mode
              </li>
              <li>
                • <strong>Reset Layout:</strong> Restore default widget configuration
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of dashboard in different modes showing standard view and edit mode capabilities.',
      },
    },
  },
}

export const WidgetVariations: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Widget Variations</h2>

        <div className='bg-white rounded-lg shadow-sm border p-6 mb-8'>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>🧩 Available Widget Types</h3>
            <p className='text-gray-600'>
              The dashboard supports multiple widget types with different sizes and functionality.
              Each widget provides specific value from POps applications.
            </p>
          </div>

          <StoryWrapper>
            <Dashboard onShowApps={() => console.log('Show apps')} />
          </StoryWrapper>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>✈️ Travel Summary</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>• Shows next upcoming trip</li>
              <li>• Total trip count</li>
              <li>• Upcoming trips counter</li>
              <li>• Links to Travel app</li>
              <li>• Refreshes every 5 minutes</li>
            </ul>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>⚡ Quick Actions</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>• App launcher shortcut</li>
              <li>• New trip creation</li>
              <li>• Common action buttons</li>
              <li>• Compact grid layout</li>
              <li>• External link handling</li>
            </ul>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>📊 Recent Activity</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>• Cross-app activity feed</li>
              <li>• Real-time updates</li>
              <li>• Placeholder for future</li>
              <li>• Expandable content area</li>
              <li>• Refreshable widget</li>
            </ul>
          </div>
        </div>

        <div className='mt-8 p-6 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-3'>Widget System Architecture:</h4>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-purple-800'>
            <div>
              <h5 className='font-medium mb-2'>Configuration:</h5>
              <ul className='space-y-1'>
                <li>• WidgetConfig interface defines structure</li>
                <li>• Size constraints (w, h, min/max)</li>
                <li>• Position coordinates (x, y)</li>
                <li>• App association and refresh intervals</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium mb-2'>Rendering:</h5>
              <ul className='space-y-1'>
                <li>• Dynamic widget rendering based on type</li>
                <li>• WidgetContainer for consistent styling</li>
                <li>• Mock data integration for development</li>
                <li>• Fallback for unknown widget types</li>
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
          'Detailed view of different widget types and their specific functionality within the dashboard.',
      },
    },
  },
}

export const ResponsiveBehavior: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Responsive Dashboard</h2>

        <div className='space-y-8'>
          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='p-6 bg-blue-50 border-b border-blue-100'>
              <h3 className='text-xl font-semibold text-blue-900'>🖥️ Desktop Layout</h3>
              <p className='text-blue-700 mt-2'>
                Full 12-column grid with optimal spacing for large screens
              </p>
            </div>
            <div className='p-6'>
              <StoryWrapper>
                <Dashboard onShowApps={() => console.log('Show apps')} />
              </StoryWrapper>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='p-6 bg-green-50 border-b border-green-100'>
              <h3 className='text-xl font-semibold text-green-900'>📱 Mobile Simulation</h3>
              <p className='text-green-700 mt-2'>
                Widgets stack vertically and adjust sizes for mobile screens
              </p>
            </div>
            <div className='max-w-md mx-auto border-x-2 border-gray-300'>
              <StoryWrapper>
                <Dashboard onShowApps={() => console.log('Show apps')} />
              </StoryWrapper>
            </div>
          </div>
        </div>

        <div className='mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-100'>
          <h4 className='font-semibold text-emerald-900 mb-4'>Responsive Grid System:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h5 className='font-medium text-emerald-800 mb-2'>Breakpoints:</h5>
              <ul className='text-sm text-emerald-700 space-y-1'>
                <li>
                  • <strong>lg (1200px+):</strong> 12 columns
                </li>
                <li>
                  • <strong>md (996px+):</strong> 10 columns
                </li>
                <li>
                  • <strong>sm (768px+):</strong> 6 columns
                </li>
                <li>
                  • <strong>xs (480px+):</strong> 4 columns
                </li>
                <li>
                  • <strong>xxs (0px+):</strong> 2 columns
                </li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium text-emerald-800 mb-2'>Adaptive Features:</h5>
              <ul className='text-sm text-emerald-700 space-y-1'>
                <li>• Automatic widget reflow</li>
                <li>• Proportional sizing</li>
                <li>• Touch-friendly controls</li>
                <li>• Optimal spacing adjustments</li>
                <li>• Vertical stacking on mobile</li>
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
          'Demonstrates how the dashboard adapts to different screen sizes with responsive grid layouts.',
      },
    },
  },
}

export const InteractiveFeatures: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Interactive Dashboard Features
        </h2>

        <div className='bg-white rounded-lg shadow-sm border p-6 mb-8'>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>🎮 Interactive Dashboard</h3>
            <p className='text-gray-600 mb-4'>
              Try the interactive features: click "Edit" to enable drag & drop, "Add Widget" to open
              the gallery, and interact with the quick action buttons in the widgets.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
              <div className='bg-blue-50 p-4 rounded-lg'>
                <h4 className='font-medium text-blue-900 mb-2'>🎯 Edit Mode</h4>
                <p className='text-sm text-blue-700'>
                  Click "Edit" button to enable widget customization. Widgets become draggable and
                  resizable.
                </p>
              </div>
              <div className='bg-green-50 p-4 rounded-lg'>
                <h4 className='font-medium text-green-900 mb-2'>➕ Add Widgets</h4>
                <p className='text-sm text-green-700'>
                  Use "Add Widget" to open the widget gallery and add new widgets to your dashboard.
                </p>
              </div>
              <div className='bg-purple-50 p-4 rounded-lg'>
                <h4 className='font-medium text-purple-900 mb-2'>🔄 Reset Layout</h4>
                <p className='text-sm text-purple-700'>
                  In edit mode, use "Reset" to restore the default widget configuration.
                </p>
              </div>
            </div>
          </div>

          <StoryWrapper>
            <Dashboard
              onShowApps={() => {
                console.log('Show apps clicked')
                alert('App launcher would open here!')
              }}
            />
          </StoryWrapper>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>🖱️ Interaction Features</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Drag & Drop:</strong> Reposition widgets in edit mode
              </li>
              <li>
                • <strong>Resize:</strong> Adjust widget dimensions with handles
              </li>
              <li>
                • <strong>Quick Actions:</strong> Launch apps and create new trips
              </li>
              <li>
                • <strong>Widget Gallery:</strong> Modal for adding new widgets
              </li>
              <li>
                • <strong>Remove Widgets:</strong> Delete widgets using remove buttons
              </li>
            </ul>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>⚙️ State Management</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Layout Persistence:</strong> Widget positions saved locally
              </li>
              <li>
                • <strong>Edit Mode Toggle:</strong> Switch between view/edit modes
              </li>
              <li>
                • <strong>Dynamic Updates:</strong> Real-time layout changes
              </li>
              <li>
                • <strong>Error Handling:</strong> Graceful fallbacks for widget errors
              </li>
              <li>
                • <strong>Performance:</strong> Optimized re-renders with useCallback
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-100'>
          <h4 className='font-semibold text-yellow-900 mb-3'>💡 Usage Tips:</h4>
          <div className='text-sm text-yellow-800 space-y-2'>
            <p>
              <strong>For Developers:</strong> The Dashboard uses react-grid-layout for drag & drop
              functionality. Widget configs are managed with React state and can be persisted to
              localStorage or a backend API.
            </p>
            <p>
              <strong>For Users:</strong> Customize your dashboard by entering edit mode, then drag
              widgets around and resize them as needed. Add new widgets from the gallery or reset to
              defaults anytime.
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
          'Interactive demonstration of dashboard features including edit mode, widget management, and user interactions.',
      },
    },
  },
}

export const EmptyState: Story = {
  render: () => (
    <div className='bg-gray-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Empty Dashboard State</h2>

        <div className='bg-white rounded-lg shadow-sm border p-6'>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>📋 New User Experience</h3>
            <p className='text-gray-600'>
              This simulates how the dashboard would appear for a new user or after clearing all
              widgets. The QuickStats would still show but the widget grid would be empty.
            </p>
          </div>

          <StoryWrapper>
            <div className='dashboard-grid'>
              {/* Quick Stats */}
              <div className='quick-stats mb-6'>
                <div className='stat-card'>
                  <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-blue-50'>
                    <div className='h-6 w-6 text-blue-600'>📅</div>
                  </div>
                  <div className='stat-value'>0</div>
                  <div className='stat-label'>Total Trips</div>
                </div>
                <div className='stat-card'>
                  <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-green-50'>
                    <div className='h-6 w-6 text-green-600'>📈</div>
                  </div>
                  <div className='stat-value'>0</div>
                  <div className='stat-label'>Upcoming</div>
                </div>
                <div className='stat-card'>
                  <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-purple-50'>
                    <div className='h-6 w-6 text-purple-600'>💰</div>
                  </div>
                  <div className='stat-value'>$0</div>
                  <div className='stat-label'>Total Spent</div>
                </div>
                <div className='stat-card'>
                  <div className='w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-orange-50'>
                    <div className='h-6 w-6 text-orange-600'>👥</div>
                  </div>
                  <div className='stat-value'>0</div>
                  <div className='stat-label'>Active Projects</div>
                </div>
              </div>

              {/* Dashboard Controls */}
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-semibold text-gray-900'>Dashboard</h2>
                <div className='flex items-center gap-2'>
                  <button className='px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50'>
                    ➕ Add Widget
                  </button>
                </div>
              </div>

              {/* Empty State */}
              <div className='min-h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center'>
                <div className='text-center'>
                  <div className='text-6xl text-gray-400 mb-4'>📱</div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>No Widgets Added Yet</h3>
                  <p className='text-gray-600 mb-4'>
                    Get started by adding widgets to customize your dashboard experience.
                  </p>
                  <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                    Add Your First Widget
                  </button>
                </div>
              </div>
            </div>
          </StoryWrapper>
        </div>

        <div className='mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100'>
          <h4 className='font-semibold text-indigo-900 mb-3'>Empty State Design Principles:</h4>
          <ul className='text-sm text-indigo-800 space-y-2'>
            <li>
              • <strong>Clear Guidance:</strong> Explain what the user can do next
            </li>
            <li>
              • <strong>Visual Appeal:</strong> Use illustrations and friendly messaging
            </li>
            <li>
              • <strong>Quick Action:</strong> Provide immediate path to add content
            </li>
            <li>
              • <strong>Context Preservation:</strong> Keep navigation and core UI elements
            </li>
            <li>
              • <strong>Progressive Disclosure:</strong> Don't overwhelm new users
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the dashboard appears when no widgets are present, with appropriate empty state messaging and calls-to-action.',
      },
    },
  },
}
