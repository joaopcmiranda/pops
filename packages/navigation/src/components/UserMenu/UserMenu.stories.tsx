/**
 * @fileoverview Storybook Stories for UserMenu Component
 *
 * Comprehensive stories showcasing the POps User Menu component with different
 * user profiles, theme switching capabilities, menu interactions, and responsive
 * behavior. Demonstrates authentication states and accessibility features.
 */

import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserMenu } from './UserMenu'
import { AppSuiteProvider } from '../../contexts/AppSuiteContext'
import type { PopsUser, AuthState } from '../../types'

const meta: Meta<typeof UserMenu> = {
  title: 'Navigation/UserMenu',
  component: UserMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The UserMenu provides user profile access, theme switching, settings, and logout functionality. It integrates with the global AppSuite context for consistent user management across all POps applications.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Mock users for different scenarios
const mockUsers = {
  standard: {
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
  },
  longName: {
    id: '2',
    email: 'alexandra.christina.montgomery@verylongdomainname.com',
    name: 'Alexandra Christina Montgomery-Williams',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    preferences: {
      theme: 'light' as const,
      locale: 'en-US',
      timezone: 'Europe/London',
      notifications: {
        push: false,
        email: true,
        inApp: true,
        frequency: 'daily' as const,
      },
    },
    lastActive: new Date().toISOString(),
  },
  noAvatar: {
    id: '3',
    email: 'jane.smith@company.org',
    name: 'Jane Smith',
    preferences: {
      theme: 'dark' as const,
      locale: 'en-US',
      timezone: 'America/Los_Angeles',
      notifications: {
        push: true,
        email: false,
        inApp: true,
        frequency: 'hourly' as const,
      },
    },
    lastActive: new Date().toISOString(),
  },
  initials: {
    id: '4',
    email: 'rb@example.com',
    name: 'Robert Brown',
    preferences: {
      theme: 'system' as const,
      locale: 'en-US',
      timezone: 'America/Chicago',
      notifications: {
        push: true,
        email: true,
        inApp: false,
        frequency: 'weekly' as const,
      },
    },
    lastActive: new Date().toISOString(),
  },
  singleName: {
    id: '5',
    email: 'cher@example.com',
    name: 'Cher',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    preferences: {
      theme: 'light' as const,
      locale: 'en-US',
      timezone: 'America/Los_Angeles',
      notifications: {
        push: true,
        email: true,
        inApp: true,
        frequency: 'immediate' as const,
      },
    },
    lastActive: new Date().toISOString(),
  },
} satisfies Record<string, PopsUser>

/**
 * Story wrapper with AppSuiteProvider context
 */
function StoryWrapper({
  children,
  user = mockUsers.standard,
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
    <AppSuiteProvider currentApp='travel' initialAuthState={authState}>
      <div className='p-8 bg-gray-50 min-h-screen'>
        <div className='flex justify-center'>{children}</div>
      </div>
    </AppSuiteProvider>
  )
}

export const Default: Story = {
  render: () => (
    <StoryWrapper>
      <UserMenu />
    </StoryWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default user menu with a standard user profile showing avatar, name, email, and all menu options.',
      },
    },
  },
}

export const UserVariations: Story = {
  render: () => (
    <div className='space-y-8 p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900'>User Profile Variations</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Standard User</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Normal user with avatar, standard name length, and common email domain.
            </p>
            <StoryWrapper user={mockUsers.standard}>
              <UserMenu />
            </StoryWrapper>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Long Name User</h3>
            <p className='text-sm text-gray-600 mb-4'>
              User with very long name and email to test truncation behavior.
            </p>
            <StoryWrapper user={mockUsers.longName}>
              <UserMenu />
            </StoryWrapper>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>No Avatar</h3>
            <p className='text-sm text-gray-600 mb-4'>
              User without profile picture showing initials fallback.
            </p>
            <StoryWrapper user={mockUsers.noAvatar}>
              <UserMenu />
            </StoryWrapper>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Initials Display</h3>
            <p className='text-sm text-gray-600 mb-4'>
              User with clear initials for testing avatar fallback.
            </p>
            <StoryWrapper user={mockUsers.initials}>
              <UserMenu />
            </StoryWrapper>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Single Name</h3>
            <p className='text-sm text-gray-600 mb-4'>
              User with single name (mononym) to test edge case handling.
            </p>
            <StoryWrapper user={mockUsers.singleName}>
              <UserMenu />
            </StoryWrapper>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Unauthenticated</h3>
            <p className='text-sm text-gray-600 mb-4'>
              No user menu shown when user is not authenticated.
            </p>
            <StoryWrapper authenticated={false}>
              <UserMenu />
            </StoryWrapper>
            <p className='text-xs text-gray-500 mt-2 italic'>
              (UserMenu returns null when unauthenticated)
            </p>
          </div>
        </div>

        <div className='mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100'>
          <h4 className='font-semibold text-indigo-900 mb-2'>User Display Features:</h4>
          <ul className='text-sm text-indigo-800 space-y-1'>
            <li>
              • <strong>Avatar:</strong> Shows profile image with fallback to initials
            </li>
            <li>
              • <strong>Name Truncation:</strong> Long names are truncated with ellipsis
            </li>
            <li>
              • <strong>Email Truncation:</strong> Long emails are truncated for layout
            </li>
            <li>
              • <strong>Initials:</strong> Up to 2 letters from first/last name
            </li>
            <li>
              • <strong>Responsive:</strong> Name/email hidden on small screens
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of user menu with different user profile scenarios including edge cases.',
      },
    },
  },
}

export const ThemeSwitching: Story = {
  render: () => (
    <div className='space-y-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen'>
      <div className='max-w-4xl'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900'>Theme Switching Functionality</h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Light Theme Context</h3>
            <p className='text-sm text-gray-600 mb-4'>
              User menu in light theme with theme switching submenu. Click the theme option to see
              all available theme choices.
            </p>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <StoryWrapper>
                <UserMenu />
              </StoryWrapper>
            </div>
          </div>

          <div className='bg-slate-900 text-white p-6 rounded-lg border border-slate-700 shadow-sm'>
            <h3 className='text-lg font-medium text-white mb-4'>Dark Theme Context</h3>
            <p className='text-sm text-slate-300 mb-4'>
              User menu simulated in dark theme context. The actual theme switching would apply dark
              mode styles throughout the application.
            </p>
            <div className='bg-slate-800 p-4 rounded-lg'>
              <div className='dark'>
                <StoryWrapper>
                  <UserMenu />
                </StoryWrapper>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-100'>
          <h4 className='font-semibold text-emerald-900 mb-2'>Theme Switching Features:</h4>
          <ul className='text-sm text-emerald-800 space-y-1'>
            <li>
              • 🌞 <strong>Light Theme:</strong> Standard light color scheme
            </li>
            <li>
              • 🌙 <strong>Dark Theme:</strong> Dark color scheme for low-light environments
            </li>
            <li>
              • 💻 <strong>System Theme:</strong> Follows OS/browser preference automatically
            </li>
            <li>• Theme preference is saved to localStorage</li>
            <li>• Immediate visual feedback when switching themes</li>
            <li>• Submenu with clear icons for each theme option</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of theme switching functionality with light and dark mode examples.',
      },
    },
  },
}

export const MenuInteractions: Story = {
  render: () => (
    <div className='space-y-8 p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-2xl mx-auto'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900 text-center'>
          Menu Interactions & Navigation
        </h2>

        <p className='text-gray-600 mb-6 text-center'>
          Click the user menu to explore all available options. Each menu item has proper hover
          states, keyboard navigation, and appropriate actions.
        </p>

        <div className='flex justify-center'>
          <StoryWrapper>
            <UserMenu />
          </StoryWrapper>
        </div>

        <div className='mt-8 space-y-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-3'>Menu Options</h3>
            <div className='space-y-2 text-sm text-gray-700'>
              <div className='flex items-center gap-2'>
                <span className='w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs'>
                  👤
                </span>
                <span>
                  <strong>Profile:</strong> Navigates to user profile page in Accounts app
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs'>
                  🎨
                </span>
                <span>
                  <strong>Theme:</strong> Submenu with Light, Dark, and System options
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs'>
                  ⚙️
                </span>
                <span>
                  <strong>Settings:</strong> Navigates to settings page in Accounts app
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs'>
                  🚪
                </span>
                <span>
                  <strong>Sign out:</strong> Logs out user and redirects to login
                </span>
              </div>
            </div>
          </div>

          <div className='bg-amber-50 p-4 rounded-lg border border-amber-100'>
            <h4 className='font-semibold text-amber-900 mb-2'>Interaction Features:</h4>
            <ul className='text-sm text-amber-800 space-y-1'>
              <li>• Full keyboard navigation (Tab, Enter, Arrow keys)</li>
              <li>• Hover states and focus indicators</li>
              <li>• Accessible ARIA labels and roles</li>
              <li>• Smooth dropdown animations</li>
              <li>• Click outside to close functionality</li>
              <li>• Cross-domain navigation to Accounts app</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive user menu showcasing all menu options and their behaviors.',
      },
    },
  },
}

export const ResponsiveBehavior: Story = {
  render: () => (
    <div className='space-y-8 p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900'>Responsive Behavior</h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Desktop View</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Full user menu showing avatar, name, email, and chevron indicator.
            </p>
            <div className='flex justify-center p-4 bg-gray-50 rounded-lg'>
              <StoryWrapper>
                <UserMenu />
              </StoryWrapper>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Mobile View</h3>
            <p className='text-sm text-gray-600 mb-4'>
              Compact user menu showing only avatar on small screens.
            </p>
            <div className='flex justify-center p-4 bg-gray-50 rounded-lg'>
              <div className='max-w-xs border-x-2 border-gray-300'>
                <StoryWrapper>
                  <UserMenu />
                </StoryWrapper>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 bg-white p-6 rounded-lg border border-gray-200'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>Adaptive Width Demonstration</h3>
          <p className='text-sm text-gray-600 mb-4'>
            The user menu adapts to container width, hiding text elements when space is constrained.
          </p>

          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <span className='text-sm font-medium text-gray-700 w-24'>Full width:</span>
              <div className='flex-1 bg-gray-50 p-3 rounded-lg'>
                <StoryWrapper>
                  <UserMenu />
                </StoryWrapper>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <span className='text-sm font-medium text-gray-700 w-24'>Medium:</span>
              <div className='w-96 bg-gray-50 p-3 rounded-lg'>
                <StoryWrapper>
                  <UserMenu />
                </StoryWrapper>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <span className='text-sm font-medium text-gray-700 w-24'>Compact:</span>
              <div className='w-48 bg-gray-50 p-3 rounded-lg'>
                <StoryWrapper>
                  <UserMenu />
                </StoryWrapper>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 p-4 bg-cyan-50 rounded-lg border border-cyan-100'>
          <h4 className='font-semibold text-cyan-900 mb-2'>Responsive Features:</h4>
          <ul className='text-sm text-cyan-800 space-y-1'>
            <li>
              • <strong>Breakpoint-based:</strong> Uses sm: prefix for responsive behavior
            </li>
            <li>
              • <strong>Text Hiding:</strong> Name and email hidden on small screens
            </li>
            <li>
              • <strong>Icon Preservation:</strong> Avatar always visible for user identification
            </li>
            <li>
              • <strong>Chevron Management:</strong> Dropdown indicator hidden on mobile
            </li>
            <li>
              • <strong>Touch Friendly:</strong> Maintains adequate touch targets
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
          'Demonstration of how the user menu adapts to different screen sizes and container widths.',
      },
    },
  },
}

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className='space-y-8 p-8 bg-gray-50 min-h-screen'>
      <div className='max-w-3xl mx-auto'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-900 text-center'>
          Accessibility Features
        </h2>

        <div className='bg-white p-6 rounded-lg border border-gray-200 mb-6'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>Accessible User Menu</h3>
          <p className='text-sm text-gray-600 mb-4'>
            This user menu includes comprehensive accessibility features. Try using keyboard
            navigation (Tab, Enter, Arrow keys) and screen reader announcements.
          </p>

          <div className='flex justify-center p-6 bg-gray-50 rounded-lg'>
            <StoryWrapper>
              <UserMenu />
            </StoryWrapper>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-green-50 p-4 rounded-lg border border-green-100'>
            <h4 className='font-semibold text-green-900 mb-2'>✅ Keyboard Navigation</h4>
            <ul className='text-sm text-green-800 space-y-1'>
              <li>• Tab: Navigate to menu button</li>
              <li>• Enter/Space: Open dropdown menu</li>
              <li>• Arrow keys: Navigate menu items</li>
              <li>• Enter: Activate menu item</li>
              <li>• Escape: Close menu</li>
            </ul>
          </div>

          <div className='bg-blue-50 p-4 rounded-lg border border-blue-100'>
            <h4 className='font-semibold text-blue-900 mb-2'>🔊 Screen Reader</h4>
            <ul className='text-sm text-blue-800 space-y-1'>
              <li>• Proper ARIA labels on all elements</li>
              <li>• Role="menu" and role="menuitem"</li>
              <li>• aria-expanded state announcements</li>
              <li>• Avatar alt text with user name</li>
              <li>• Descriptive button labels</li>
            </ul>
          </div>

          <div className='bg-purple-50 p-4 rounded-lg border border-purple-100'>
            <h4 className='font-semibold text-purple-900 mb-2'>🎯 Focus Management</h4>
            <ul className='text-sm text-purple-800 space-y-1'>
              <li>• Visible focus indicators</li>
              <li>• Focus trapping within dropdown</li>
              <li>• Return focus to trigger button</li>
              <li>• Logical tab order</li>
              <li>• High contrast focus rings</li>
            </ul>
          </div>

          <div className='bg-orange-50 p-4 rounded-lg border border-orange-100'>
            <h4 className='font-semibold text-orange-900 mb-2'>🎨 Visual Accessibility</h4>
            <ul className='text-sm text-orange-800 space-y-1'>
              <li>• High contrast color ratios</li>
              <li>• Clear visual hierarchy</li>
              <li>• Adequate touch target sizes</li>
              <li>• Consistent styling patterns</li>
              <li>• Support for high contrast mode</li>
            </ul>
          </div>
        </div>

        <div className='mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100'>
          <h4 className='font-semibold text-indigo-900 mb-2'>WCAG 2.1 Compliance:</h4>
          <p className='text-sm text-indigo-800'>
            This UserMenu component follows WCAG 2.1 AA standards for accessibility, including
            proper semantic HTML, keyboard navigation, screen reader support, and color contrast
            ratios. It's designed to be fully accessible to users with disabilities.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive demonstration of accessibility features including keyboard navigation, screen reader support, and WCAG compliance.',
      },
    },
  },
}
