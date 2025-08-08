/**
 * @fileoverview Storybook Stories for DomainSwitcher Component
 *
 * Comprehensive stories showcasing the POps Domain Switcher component in various
 * states, configurations, and edge cases. Demonstrates app switching, status
 * indicators, and interactive functionality.
 */

import type { Meta, StoryObj } from '@storybook/react-vite'
import { DomainSwitcher } from './DomainSwitcher'
import { AppSuiteProvider } from '../../contexts/AppSuiteContext'
import type { PopsAppId } from '../../config/domains'
import type { PopsUser, AuthState } from '../../types'

const meta: Meta<typeof DomainSwitcher> = {
  title: 'Navigation/DomainSwitcher',
  component: DomainSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The DomainSwitcher provides a dropdown interface for switching between different POps applications. It shows app status indicators and provides quick navigation across the entire POps suite.',
      },
    },
  },
  argTypes: {
    currentApp: {
      control: 'select',
      options: [
        'hub',
        'travel',
        'money',
        'accounts',
        'events',
        'documents',
        'recipes',
        'home',
        'health',
        'admin',
      ],
      description: 'The currently active POps application',
    },
    showStatus: {
      control: 'boolean',
      description: 'Whether to show app status indicators',
    },
    onAppSelect: {
      action: 'app-selected',
      description: 'Callback fired when an app is selected',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Mock user for authenticated stories
const mockUser: PopsUser = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  preferences: {
    theme: 'system',
    locale: 'en-US',
    timezone: 'America/New_York',
    notifications: {
      push: true,
      email: true,
      inApp: true,
      frequency: 'immediate',
    },
  },
  lastActive: new Date().toISOString(),
}

const mockAuthState: AuthState = {
  isAuthenticated: true,
  user: mockUser,
  token: 'mock-jwt-token',
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  refreshToken: 'mock-refresh-token',
}

/**
 * Story wrapper with AppSuiteProvider context
 */
function StoryWrapper({
  children,
  currentApp = 'travel',
  authenticated = true,
}: {
  children: React.ReactNode
  currentApp?: PopsAppId
  authenticated?: boolean
}) {
  return (
    <AppSuiteProvider
      currentApp={currentApp}
      initialAuthState={
        authenticated
          ? mockAuthState
          : { isAuthenticated: false, user: null, token: null, expiresAt: null, refreshToken: null }
      }
    >
      <div className='p-8 bg-gray-50 min-h-screen'>
        <div className='max-w-md'>{children}</div>
      </div>
    </AppSuiteProvider>
  )
}

export const Default: Story = {
  render: args => (
    <StoryWrapper>
      <DomainSwitcher {...args} />
    </StoryWrapper>
  ),
  args: {
    currentApp: 'travel',
    showStatus: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default domain switcher showing the Travel app as current with status indicators enabled.',
      },
    },
  },
}

export const AllApps: Story = {
  render: () => (
    <div className='space-y-8 p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl'>
        <h2 className='text-xl font-semibold mb-6 text-gray-900'>
          Domain Switcher - All Applications
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {(
            [
              'hub',
              'travel',
              'money',
              'accounts',
              'events',
              'documents',
              'recipes',
              'home',
              'health',
              'admin',
            ] as PopsAppId[]
          ).map(app => (
            <div key={app} className='bg-white p-4 rounded-lg border border-gray-200'>
              <h3 className='text-sm font-medium text-gray-600 mb-3 capitalize'>Current: {app}</h3>
              <StoryWrapper currentApp={app}>
                <DomainSwitcher currentApp={app} showStatus={true} />
              </StoryWrapper>
            </div>
          ))}
        </div>

        <div className='mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Usage Notes:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Each app shows its distinct icon and name</li>
            <li>
              • Status indicators show app health (green = online, red = offline, yellow = degraded)
            </li>
            <li>• Current app is highlighted and shows "Current" label</li>
            <li>• Clicking external apps opens them in new tab/window</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Showcase of domain switcher with different current apps to demonstrate the full range of POps applications.',
      },
    },
  },
}

export const WithoutStatus: Story = {
  render: args => (
    <StoryWrapper>
      <DomainSwitcher {...args} />
    </StoryWrapper>
  ),
  args: {
    currentApp: 'travel',
    showStatus: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Domain switcher with status indicators disabled for a cleaner appearance.',
      },
    },
  },
}

export const InteractiveSelection: Story = {
  render: args => (
    <div className='space-y-8 p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-2xl'>
        <h2 className='text-xl font-semibold mb-4 text-gray-900'>Interactive App Selection</h2>
        <p className='text-gray-600 mb-6'>
          Click the domain switcher and select different apps to see the interaction in action. The
          onAppSelect callback will fire and log the selected app.
        </p>

        <StoryWrapper>
          <DomainSwitcher {...args} />
        </StoryWrapper>

        <div className='mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100'>
          <h4 className='font-semibold text-amber-900 mb-2'>Interactive Features:</h4>
          <ul className='text-sm text-amber-800 space-y-1'>
            <li>• Keyboard navigation support (arrow keys, Enter, Space)</li>
            <li>• Current app is disabled and shows "Current" label</li>
            <li>• External link icon for non-current apps</li>
            <li>• Hover states and smooth animations</li>
            <li>• Accessibility labels and ARIA support</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  args: {
    currentApp: 'money',
    showStatus: true,
    onAppSelect: (app: PopsAppId) => {
      console.log('Selected app:', app)
      alert(`Selected: ${app}`)
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive version with custom onAppSelect callback to demonstrate the selection behavior.',
      },
    },
  },
}

export const CustomStyling: Story = {
  render: args => (
    <div className='space-y-8 p-8 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen'>
      <div className='max-w-md'>
        <h2 className='text-xl font-semibold mb-4 text-purple-900'>Custom Styled Variants</h2>

        <div className='space-y-4'>
          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>Default Styling</h3>
            <StoryWrapper>
              <DomainSwitcher {...args} />
            </StoryWrapper>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-sm border'>
            <h3 className='text-sm font-medium text-gray-600 mb-2'>Custom Class Names</h3>
            <StoryWrapper>
              <DomainSwitcher
                {...args}
                className='border-2 border-purple-200 bg-purple-50 hover:bg-purple-100'
              />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-2'>Styling Notes:</h4>
          <ul className='text-sm text-purple-800 space-y-1'>
            <li>• Accepts custom className prop for styling overrides</li>
            <li>• Uses Tailwind classes for consistent styling</li>
            <li>• Supports light and dark modes</li>
            <li>• Inherits theme from parent context</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  args: {
    currentApp: 'events',
    showStatus: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of domain switcher with custom styling applied through className prop.',
      },
    },
  },
}

export const LoadingAndError: Story = {
  render: () => (
    <div className='space-y-8 p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-2xl'>
        <h2 className='text-xl font-semibold mb-6 text-gray-900'>Loading and Error States</h2>

        <div className='grid gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-3'>Offline/Degraded Status</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Shows apps with different health statuses including offline and degraded states.
            </p>
            <StoryWrapper>
              <DomainSwitcher currentApp='travel' showStatus={true} />
            </StoryWrapper>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-3'>No Status Indicators</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Clean appearance when status monitoring is disabled.
            </p>
            <StoryWrapper>
              <DomainSwitcher currentApp='documents' showStatus={false} />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-6 p-4 bg-red-50 rounded-lg border border-red-100'>
          <h4 className='font-semibold text-red-900 mb-2'>Status Indicators:</h4>
          <ul className='text-sm text-red-800 space-y-1'>
            <li>
              • 🟢 <strong>Online:</strong> App is healthy and responding
            </li>
            <li>
              • 🟡 <strong>Degraded:</strong> App is responding but with issues
            </li>
            <li>
              • 🔴 <strong>Offline:</strong> App is not responding
            </li>
            <li>
              • 🔵 <strong>Maintenance:</strong> App is under maintenance
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
          'Examples showing how the domain switcher handles different app status states and error conditions.',
      },
    },
  },
}

export const EdgeCases: Story = {
  render: () => (
    <div className='space-y-8 p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl'>
        <h2 className='text-xl font-semibold mb-6 text-gray-900'>Edge Cases and Accessibility</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-3'>Long App Names</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Text truncation and overflow handling for longer app names.
            </p>
            <div className='max-w-48'>
              <StoryWrapper>
                <DomainSwitcher currentApp='documents' showStatus={true} />
              </StoryWrapper>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-3'>Compact Width</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Behavior in constrained widths with responsive design.
            </p>
            <div className='max-w-32'>
              <StoryWrapper>
                <DomainSwitcher currentApp='hub' showStatus={true} />
              </StoryWrapper>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-3'>Keyboard Navigation</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Full keyboard accessibility with Tab, Enter, and Space key support.
            </p>
            <StoryWrapper>
              <DomainSwitcher currentApp='health' showStatus={true} />
            </StoryWrapper>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-3'>Screen Reader</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Proper ARIA labels and announcements for assistive technology.
            </p>
            <StoryWrapper>
              <DomainSwitcher currentApp='recipes' showStatus={true} />
            </StoryWrapper>
          </div>
        </div>

        <div className='mt-8 p-4 bg-green-50 rounded-lg border border-green-100'>
          <h4 className='font-semibold text-green-900 mb-2'>Accessibility Features:</h4>
          <ul className='text-sm text-green-800 space-y-1'>
            <li>• Full keyboard navigation support</li>
            <li>• Proper ARIA labels and roles</li>
            <li>• Screen reader announcements</li>
            <li>• Focus management and indicators</li>
            <li>• Semantic HTML structure</li>
            <li>• High contrast support</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge cases testing text truncation, responsive behavior, keyboard navigation, and accessibility features.',
      },
    },
  },
}
