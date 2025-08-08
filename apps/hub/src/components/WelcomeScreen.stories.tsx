/**
 * @fileoverview Storybook Stories for WelcomeScreen Component
 *
 * Comprehensive stories showcasing the POps Welcome Screen component with different
 * authentication states, feature highlights, and user onboarding flows.
 * Demonstrates the initial experience for new users and login functionality.
 */

import type { Meta, StoryObj } from '@storybook/react-vite'
import { WelcomeScreen } from './WelcomeScreen'
import { AppSuiteProvider } from '@pops/navigation'
import type { AuthState } from '@pops/navigation'

const meta: Meta<typeof WelcomeScreen> = {
  title: 'Hub/WelcomeScreen',
  component: WelcomeScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The WelcomeScreen provides an onboarding experience for new users and handles authentication flow. It showcases key POps features and provides a clear path to get started.',
      },
    },
  },
  argTypes: {
    onGetStarted: {
      action: 'getStarted',
      description: 'Callback when user completes the welcome flow',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Story wrapper with AppSuiteProvider context
 */
function StoryWrapper({
  children,
  authenticated = false,
}: {
  children: React.ReactNode
  authenticated?: boolean
}) {
  const authState: AuthState = {
    isAuthenticated: authenticated,
    user: null,
    token: null,
    expiresAt: null,
    refreshToken: null,
  }

  return (
    <AppSuiteProvider currentApp='hub' initialAuthState={authState}>
      {children}
    </AppSuiteProvider>
  )
}

export const Default: Story = {
  render: args => (
    <StoryWrapper>
      <WelcomeScreen {...args} />
    </StoryWrapper>
  ),
  args: {
    onGetStarted: () => console.log('Get started clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default welcome screen with feature showcase and get started button for new users.',
      },
    },
  },
}

export const WelcomeVariations: Story = {
  render: () => (
    <div className='space-y-12'>
      <div className='min-h-screen'>
        <div className='bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 min-h-screen'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-8 pt-16'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>🎉 Light Theme Welcome</h2>
              <p className='text-gray-600'>
                The welcome screen in light theme with bright, inviting colors and clear feature
                highlights.
              </p>
            </div>

            <StoryWrapper>
              <WelcomeScreen
                onGetStarted={() => {
                  console.log('Get started clicked')
                  alert('Demo login successful! Welcome to POps!')
                }}
              />
            </StoryWrapper>
          </div>
        </div>
      </div>

      <div className='min-h-screen'>
        <div className='dark'>
          <div className='bg-gradient-to-br from-gray-900 to-gray-800 p-4 min-h-screen'>
            <div className='max-w-4xl mx-auto'>
              <div className='text-center mb-8 pt-16'>
                <h2 className='text-3xl font-bold text-gray-100 mb-4'>🌙 Dark Theme Welcome</h2>
                <p className='text-gray-400'>
                  The welcome screen in dark theme with sophisticated colors and reduced eye strain.
                </p>
              </div>

              <StoryWrapper>
                <WelcomeScreen
                  onGetStarted={() => {
                    console.log('Get started clicked')
                    alert('Demo login successful! Welcome to POps!')
                  }}
                />
              </StoryWrapper>
            </div>
          </div>
        </div>
      </div>

      <div className='p-8 bg-gray-50'>
        <div className='max-w-4xl mx-auto'>
          <div className='p-6 bg-indigo-50 rounded-lg border border-indigo-100'>
            <h4 className='font-semibold text-indigo-900 mb-4'>Welcome Screen Features:</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h5 className='font-medium text-indigo-800 mb-2'>Visual Elements:</h5>
                <ul className='text-sm text-indigo-700 space-y-1'>
                  <li>• Gradient background design</li>
                  <li>• POps branding with blue accent</li>
                  <li>• Feature cards with icons</li>
                  <li>• Responsive layout design</li>
                  <li>• Dark/light theme support</li>
                </ul>
              </div>
              <div>
                <h5 className='font-medium text-indigo-800 mb-2'>Functionality:</h5>
                <ul className='text-sm text-indigo-700 space-y-1'>
                  <li>• Demo authentication flow</li>
                  <li>• Feature showcase presentation</li>
                  <li>• Get started call-to-action</li>
                  <li>• Context-aware messaging</li>
                  <li>• Smooth onboarding transition</li>
                </ul>
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
          'Welcome screen variations showing light and dark theme presentations with feature highlights.',
      },
    },
  },
}

export const FeatureShowcase: Story = {
  render: () => (
    <div className='bg-gray-50 min-h-screen p-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Feature Showcase Analysis
        </h2>

        <div className='bg-white rounded-lg shadow-sm border p-6 mb-8'>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>🎯 POps Value Proposition</h3>
            <p className='text-gray-600'>
              The welcome screen effectively communicates the three core value propositions of POps
              through visual feature cards with descriptive content.
            </p>
          </div>

          <StoryWrapper>
            <WelcomeScreen onGetStarted={() => console.log('Get started')} />
          </StoryWrapper>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <div className='text-center mb-4'>
              <div className='w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3'>
                <div className='text-2xl text-blue-600'>🏗️</div>
              </div>
              <h4 className='font-semibold text-gray-900'>Unified Dashboard</h4>
            </div>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>• Central access point for all apps</li>
              <li>• Consistent navigation experience</li>
              <li>• Integrated status monitoring</li>
              <li>• Cross-app data aggregation</li>
              <li>• Streamlined workflow management</li>
            </ul>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <div className='text-center mb-4'>
              <div className='w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3'>
                <div className='text-2xl text-green-600'>⚡</div>
              </div>
              <h4 className='font-semibold text-gray-900'>Real-time Updates</h4>
            </div>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>• Live data synchronization</li>
              <li>• Instant notification delivery</li>
              <li>• Real-time collaboration</li>
              <li>• Dynamic content updates</li>
              <li>• Responsive user interfaces</li>
            </ul>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <div className='text-center mb-4'>
              <div className='w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3'>
                <div className='text-2xl text-purple-600'>🛡️</div>
              </div>
              <h4 className='font-semibold text-gray-900'>Secure & Private</h4>
            </div>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>• Enterprise-grade security</li>
              <li>• Data privacy protection</li>
              <li>• Encrypted communications</li>
              <li>• Access control management</li>
              <li>• Audit trail logging</li>
            </ul>
          </div>
        </div>

        <div className='p-6 bg-emerald-50 rounded-lg border border-emerald-100'>
          <h4 className='font-semibold text-emerald-900 mb-3'>🎨 Design Principles:</h4>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-emerald-800'>
            <div>
              <h5 className='font-medium mb-2'>Visual Hierarchy:</h5>
              <ul className='space-y-1'>
                <li>• Clear headline with POps branding</li>
                <li>• Descriptive subtitle for context</li>
                <li>• Feature cards with consistent styling</li>
                <li>• Prominent call-to-action button</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium mb-2'>User Experience:</h5>
              <ul className='space-y-1'>
                <li>• Immediate value communication</li>
                <li>• Low friction demo authentication</li>
                <li>• Progressive disclosure of features</li>
                <li>• Clear next steps guidance</li>
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
          'Detailed analysis of the feature showcase section showing how POps communicates its value proposition.',
      },
    },
  },
}

export const AuthenticationFlow: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Authentication & Onboarding
        </h2>

        <div className='bg-white rounded-lg shadow-sm border p-6 mb-8'>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>🔑 Demo Authentication</h3>
            <p className='text-gray-600 mb-4'>
              The welcome screen provides a streamlined demo login experience that allows users to
              explore POps without complex registration. Click "Get Started" to see the flow.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div className='bg-blue-50 p-4 rounded-lg'>
                <h4 className='font-medium text-blue-900 mb-2'>✨ No Registration Required</h4>
                <p className='text-sm text-blue-700'>
                  Users can immediately access POps with demo credentials, reducing friction and
                  enabling quick exploration of features.
                </p>
              </div>
              <div className='bg-green-50 p-4 rounded-lg'>
                <h4 className='font-medium text-green-900 mb-2'>🚀 Instant Access</h4>
                <p className='text-sm text-green-700'>
                  The authentication flow is optimized for speed, getting users into the application
                  within seconds of clicking get started.
                </p>
              </div>
            </div>
          </div>

          <StoryWrapper>
            <WelcomeScreen
              onGetStarted={() => {
                console.log('Authentication flow started')
                // Simulate authentication success
                setTimeout(() => {
                  alert(
                    '🎉 Demo login successful!\n\nYou are now logged in as demo@mypops.io\nWelcome to your Personal Operations Suite!'
                  )
                }, 1000)
              }}
            />
          </StoryWrapper>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>🔐 Authentication Features</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Demo Login:</strong> Instant access with demo@mypops.io
              </li>
              <li>
                • <strong>Context Integration:</strong> Uses AppSuite authentication
              </li>
              <li>
                • <strong>Error Handling:</strong> Graceful failure management
              </li>
              <li>
                • <strong>State Management:</strong> Persistent login state
              </li>
              <li>
                • <strong>Security:</strong> Production-ready auth architecture
              </li>
            </ul>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>👤 User Experience Flow</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Landing:</strong> Feature overview and value prop
              </li>
              <li>
                • <strong>CTA:</strong> Clear "Get Started" button
              </li>
              <li>
                • <strong>Authentication:</strong> One-click demo login
              </li>
              <li>
                • <strong>Onboarding:</strong> Callback to parent component
              </li>
              <li>
                • <strong>Dashboard:</strong> Direct access to main interface
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-100'>
          <h4 className='font-semibold text-yellow-900 mb-3'>🏗️ Production Considerations:</h4>
          <div className='text-sm text-yellow-800 space-y-2'>
            <p>
              <strong>Real Authentication:</strong> In production, this would redirect to
              accounts.mypops.io for proper OAuth flow with secure token management.
            </p>
            <p>
              <strong>Registration Flow:</strong> New users would go through a proper signup process
              with email verification and profile setup.
            </p>
            <p>
              <strong>Session Management:</strong> Full session handling with refresh tokens and
              secure logout functionality.
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
          'Demonstrates the authentication flow and onboarding process with demo login functionality.',
      },
    },
  },
}

export const ResponsiveDesign: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Responsive Welcome Design
        </h2>

        <div className='space-y-8'>
          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='p-6 bg-blue-50 border-b border-blue-100'>
              <h3 className='text-xl font-semibold text-blue-900'>🖥️ Desktop Experience</h3>
              <p className='text-blue-700 mt-2'>
                Full layout with three-column feature grid and optimal spacing for large screens
              </p>
            </div>
            <div className='min-h-96'>
              <StoryWrapper>
                <WelcomeScreen onGetStarted={() => console.log('Desktop get started')} />
              </StoryWrapper>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='p-6 bg-green-50 border-b border-green-100'>
              <h3 className='text-xl font-semibold text-green-900'>📱 Mobile Experience</h3>
              <p className='text-green-700 mt-2'>
                Single column layout with stacked features and touch-optimized interactions
              </p>
            </div>
            <div className='max-w-sm mx-auto border-x-2 border-gray-300'>
              <StoryWrapper>
                <WelcomeScreen onGetStarted={() => console.log('Mobile get started')} />
              </StoryWrapper>
            </div>
          </div>
        </div>

        <div className='mt-8 p-6 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-4'>📱 Responsive Features:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h5 className='font-medium text-purple-800 mb-2'>Layout Adaptation:</h5>
              <ul className='text-sm text-purple-700 space-y-1'>
                <li>• Three-column grid on desktop</li>
                <li>• Single column stack on mobile</li>
                <li>• Proportional spacing adjustments</li>
                <li>• Optimal content hierarchy</li>
                <li>• Consistent visual branding</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium text-purple-800 mb-2'>Touch Optimization:</h5>
              <ul className='text-sm text-purple-700 space-y-1'>
                <li>• Large touch targets (44px minimum)</li>
                <li>• Adequate spacing between elements</li>
                <li>• Swipe-friendly navigation</li>
                <li>• Optimized text sizes</li>
                <li>• Fast loading performance</li>
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
          'Shows how the welcome screen adapts to different screen sizes while maintaining visual appeal and usability.',
      },
    },
  },
}

export const OnboardingStates: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Onboarding State Management
        </h2>

        <div className='bg-white rounded-lg shadow-sm border p-6 mb-8'>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>🎯 Interactive Onboarding</h3>
            <p className='text-gray-600 mb-4'>
              The welcome screen manages different states of the onboarding process and provides
              feedback to users during authentication and transition flows.
            </p>
          </div>

          <div className='space-y-6'>
            <div className='bg-gray-50 p-6 rounded-lg'>
              <h4 className='font-medium text-gray-900 mb-4'>Standard Welcome State</h4>
              <StoryWrapper>
                <WelcomeScreen
                  onGetStarted={() => {
                    console.log('Standard flow started')
                    alert('Standard onboarding flow initiated!')
                  }}
                />
              </StoryWrapper>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>🔄 State Management</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Initial Load:</strong> Feature showcase presentation
              </li>
              <li>
                • <strong>User Interaction:</strong> Get started button activation
              </li>
              <li>
                • <strong>Authentication:</strong> Demo login processing
              </li>
              <li>
                • <strong>Success:</strong> Callback to parent component
              </li>
              <li>
                • <strong>Error Handling:</strong> Graceful failure recovery
              </li>
            </ul>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>🎨 Visual States</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Default:</strong> Full feature showcase display
              </li>
              <li>
                • <strong>Hover:</strong> Interactive button feedback
              </li>
              <li>
                • <strong>Active:</strong> Button press state indication
              </li>
              <li>
                • <strong>Loading:</strong> Processing state (future)
              </li>
              <li>
                • <strong>Success:</strong> Completion confirmation
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 p-6 bg-cyan-50 rounded-lg border border-cyan-100'>
          <h4 className='font-semibold text-cyan-900 mb-3'>🚀 Integration Architecture:</h4>
          <div className='text-sm text-cyan-800 space-y-2'>
            <p>
              <strong>Context Integration:</strong> Uses AppSuiteProvider for authentication state
              management and cross-app navigation.
            </p>
            <p>
              <strong>Callback Pattern:</strong> onGetStarted prop allows parent components to
              handle successful authentication transitions.
            </p>
            <p>
              <strong>Error Boundaries:</strong> Wrapped with error handling to gracefully manage
              authentication failures or network issues.
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
          'Demonstrates the different states and transitions in the onboarding process with interactive examples.',
      },
    },
  },
}
