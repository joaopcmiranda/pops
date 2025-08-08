/**
 * @fileoverview Storybook Stories for ErrorBoundary Component
 *
 * Comprehensive stories showcasing the POps Error Boundary component with different
 * error scenarios, fallback UI variations, and error recovery patterns.
 * Demonstrates robust error handling for the Hub application.
 */

import type { Meta, StoryObj } from '@storybook/react-vite'
import { ErrorBoundary } from './ErrorBoundary'

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Hub/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ErrorBoundary catches JavaScript errors anywhere in the child component tree and displays a fallback UI instead of crashing the entire application. It provides graceful error handling and user-friendly error messages.',
      },
    },
  },
  argTypes: {
    fallback: {
      control: 'object',
      description: 'Custom fallback UI to display when an error occurs',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Component that throws an error for testing purposes
 */
function ThrowError({ message = 'Test error occurred' }: { message?: string }): never {
  throw new Error(message)
}

/**
 * Component that conditionally throws an error
 */
function ConditionalError({
  shouldError = false,
  message = 'Conditional error',
}: {
  shouldError?: boolean
  message?: string
}) {
  if (shouldError) {
    throw new Error(message)
  }
  return (
    <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
      <h3 className='font-semibold text-green-800 mb-2'>✅ Component Working</h3>
      <p className='text-green-700'>This component is rendering successfully without errors.</p>
    </div>
  )
}

/**
 * Component that simulates network error
 */
function NetworkError(): never {
  throw new Error('Failed to fetch data from server: Network request timeout')
}

/**
 * Component that simulates type error
 */
function TypeScriptError(): never {
  throw new TypeError('Cannot read property "name" of undefined')
}

export const Default: Story = {
  render: args => (
    <div className='max-w-md'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>Default Error Boundary</h3>
      <ErrorBoundary {...args}>
        <ThrowError message='Something went wrong in this component' />
      </ErrorBoundary>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default error boundary showing the built-in fallback UI when a child component throws an error.',
      },
    },
  },
}

export const ErrorScenarios: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Error Boundary Scenarios
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-semibold text-red-900 mb-4'>❌ Generic Error</h3>
            <p className='text-gray-600 mb-4'>
              Standard error boundary fallback for general JavaScript errors.
            </p>
            <ErrorBoundary>
              <ThrowError message='A generic error has occurred' />
            </ErrorBoundary>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-semibold text-blue-900 mb-4'>🌐 Network Error</h3>
            <p className='text-gray-600 mb-4'>
              Error boundary handling network-related failures and timeouts.
            </p>
            <ErrorBoundary>
              <NetworkError />
            </ErrorBoundary>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-semibold text-purple-900 mb-4'>🔧 Type Error</h3>
            <p className='text-gray-600 mb-4'>
              Error boundary catching TypeScript-related runtime errors.
            </p>
            <ErrorBoundary>
              <TypeScriptError />
            </ErrorBoundary>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-semibold text-green-900 mb-4'>✅ No Error</h3>
            <p className='text-gray-600 mb-4'>
              Error boundary with normally functioning component.
            </p>
            <ErrorBoundary>
              <ConditionalError shouldError={false} />
            </ErrorBoundary>
          </div>
        </div>

        <div className='mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-100'>
          <h4 className='font-semibold text-yellow-900 mb-4'>Error Handling Features:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h5 className='font-medium text-yellow-800 mb-2'>Error Capture:</h5>
              <ul className='text-sm text-yellow-700 space-y-1'>
                <li>• Catches all JavaScript errors in child tree</li>
                <li>• Prevents error propagation to parent components</li>
                <li>• Maintains application stability</li>
                <li>• Logs errors to console for debugging</li>
                <li>• Provides error details in development</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium text-yellow-800 mb-2'>User Experience:</h5>
              <ul className='text-sm text-yellow-700 space-y-1'>
                <li>• Graceful fallback UI display</li>
                <li>• Clear error messaging</li>
                <li>• Maintains page layout integrity</li>
                <li>• Prevents white screen of death</li>
                <li>• Consistent visual design</li>
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
          'Various error scenarios showing how the error boundary handles different types of errors and failures.',
      },
    },
  },
}

export const CustomFallbacks: Story = {
  render: () => {
    const customFallbacks = {
      minimal: (
        <div className='text-center py-4'>
          <span className='text-red-500'>⚠️ Error occurred</span>
        </div>
      ),
      detailed: (
        <div className='p-6 bg-red-50 border border-red-200 rounded-lg max-w-md'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='text-2xl'>🚨</div>
            <div>
              <h3 className='font-semibold text-red-800'>Application Error</h3>
              <p className='text-sm text-red-600'>Something unexpected happened</p>
            </div>
          </div>
          <div className='space-y-3'>
            <p className='text-sm text-red-700'>
              We apologize for the inconvenience. The application encountered an error that
              prevented this component from loading properly.
            </p>
            <div className='flex gap-2'>
              <button
                onClick={() => window.location.reload()}
                className='px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700'
              >
                Reload Page
              </button>
              <button
                onClick={() => alert('Support contacted')}
                className='px-3 py-2 bg-red-100 text-red-800 text-sm rounded hover:bg-red-200'
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      ),
      dashboard: (
        <div className='p-6 bg-blue-50 border border-blue-200 rounded-lg max-w-lg'>
          <div className='text-center mb-4'>
            <div className='text-4xl mb-2'>📊</div>
            <h3 className='font-semibold text-blue-800 mb-1'>Dashboard Component Error</h3>
            <p className='text-sm text-blue-600'>Unable to load dashboard widget</p>
          </div>
          <div className='space-y-3 text-sm text-blue-700'>
            <p>This dashboard component is temporarily unavailable. You can:</p>
            <ul className='space-y-1 ml-4'>
              <li>• Try refreshing the page</li>
              <li>• Check your internet connection</li>
              <li>• Contact support if the issue persists</li>
            </ul>
            <div className='pt-2'>
              <button
                onClick={() => window.location.reload()}
                className='w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
              >
                Refresh Dashboard
              </button>
            </div>
          </div>
        </div>
      ),
    }

    return (
      <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Custom Fallback UIs</h2>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
            <div className='bg-white p-6 rounded-lg border border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Minimal Fallback</h3>
              <p className='text-gray-600 mb-4'>
                Simple error message for non-critical components.
              </p>
              <ErrorBoundary fallback={customFallbacks.minimal}>
                <ThrowError message='Minor component error' />
              </ErrorBoundary>
            </div>

            <div className='bg-white p-6 rounded-lg border border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Detailed Fallback</h3>
              <p className='text-gray-600 mb-4'>Comprehensive error UI with recovery options.</p>
              <ErrorBoundary fallback={customFallbacks.detailed}>
                <ThrowError message='Critical system error' />
              </ErrorBoundary>
            </div>

            <div className='bg-white p-6 rounded-lg border border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Dashboard Fallback</h3>
              <p className='text-gray-600 mb-4'>
                Context-specific error UI for dashboard components.
              </p>
              <ErrorBoundary fallback={customFallbacks.dashboard}>
                <ThrowError message='Dashboard widget failed to load' />
              </ErrorBoundary>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Default Fallback</h3>
            <p className='text-gray-600 mb-4'>
              Built-in fallback UI when no custom fallback is provided.
            </p>
            <ErrorBoundary>
              <ThrowError message='Using default error boundary fallback' />
            </ErrorBoundary>
          </div>

          <div className='mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100'>
            <h4 className='font-semibold text-indigo-900 mb-4'>Custom Fallback Design:</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h5 className='font-medium text-indigo-800 mb-2'>Design Principles:</h5>
                <ul className='text-sm text-indigo-700 space-y-1'>
                  <li>• Match application's visual design</li>
                  <li>• Provide clear, non-technical messaging</li>
                  <li>• Offer actionable recovery options</li>
                  <li>• Maintain consistent color schemes</li>
                  <li>• Include helpful icons or illustrations</li>
                </ul>
              </div>
              <div>
                <h5 className='font-medium text-indigo-800 mb-2'>Recovery Actions:</h5>
                <ul className='text-sm text-indigo-700 space-y-1'>
                  <li>• Reload page or component</li>
                  <li>• Contact support or help</li>
                  <li>• Navigate to safe fallback page</li>
                  <li>• Retry failed operations</li>
                  <li>• Report the error</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates different custom fallback UI options for various error scenarios and component contexts.',
      },
    },
  },
}

export const NestedBoundaries: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Nested Error Boundaries
        </h2>

        <div className='bg-white p-6 rounded-lg border border-gray-200 mb-8'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Error Isolation Strategy</h3>
          <p className='text-gray-600 mb-4'>
            Multiple error boundaries can be nested to provide granular error handling. When a child
            component errors, only the nearest error boundary catches it.
          </p>

          <div className='space-y-4'>
            <div className='p-4 border border-blue-200 rounded-lg bg-blue-50'>
              <h4 className='font-medium text-blue-800 mb-2'>Outer Error Boundary</h4>
              <ErrorBoundary
                fallback={
                  <div className='p-3 bg-blue-100 border border-blue-300 rounded text-blue-800'>
                    🛡️ Outer boundary caught an error
                  </div>
                }
              >
                <div className='p-4 border border-green-200 rounded-lg bg-green-50'>
                  <h5 className='font-medium text-green-800 mb-2'>Working Component</h5>
                  <ConditionalError shouldError={false} />
                </div>

                <div className='p-4 border border-red-200 rounded-lg bg-red-50 mt-4'>
                  <h5 className='font-medium text-red-800 mb-2'>Inner Error Boundary</h5>
                  <ErrorBoundary
                    fallback={
                      <div className='p-3 bg-red-100 border border-red-300 rounded text-red-800'>
                        🚨 Inner boundary caught an error - outer components continue working
                      </div>
                    }
                  >
                    <ThrowError message='Error in nested component' />
                  </ErrorBoundary>
                </div>

                <div className='p-4 border border-green-200 rounded-lg bg-green-50 mt-4'>
                  <h5 className='font-medium text-green-800 mb-2'>Another Working Component</h5>
                  <ConditionalError shouldError={false} />
                </div>
              </ErrorBoundary>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>🎯 Isolation Benefits</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Granular Control:</strong> Isolate errors to specific components
              </li>
              <li>
                • <strong>Partial Functionality:</strong> Keep working parts of UI functional
              </li>
              <li>
                • <strong>Better UX:</strong> Users can still interact with unaffected areas
              </li>
              <li>
                • <strong>Specific Handling:</strong> Different fallbacks for different contexts
              </li>
              <li>
                • <strong>Error Containment:</strong> Prevent cascade failures
              </li>
            </ul>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>🏗️ Implementation Strategy</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Page Level:</strong> Top-level boundary for entire page
              </li>
              <li>
                • <strong>Feature Level:</strong> Boundaries around major features
              </li>
              <li>
                • <strong>Component Level:</strong> Boundaries for individual components
              </li>
              <li>
                • <strong>Critical Paths:</strong> Extra protection for important flows
              </li>
              <li>
                • <strong>Data Boundaries:</strong> Separate UI from data layer errors
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 p-6 bg-cyan-50 rounded-lg border border-cyan-100'>
          <h4 className='font-semibold text-cyan-900 mb-3'>💡 Best Practices:</h4>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-cyan-800'>
            <div>
              <h5 className='font-medium mb-2'>Error Boundary Placement:</h5>
              <ul className='space-y-1'>
                <li>• Place at route level for page-wide protection</li>
                <li>• Wrap complex components that might fail</li>
                <li>• Isolate third-party components</li>
                <li>• Protect critical user workflows</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium mb-2'>Fallback Design:</h5>
              <ul className='space-y-1'>
                <li>• Match context and importance of failed component</li>
                <li>• Provide recovery actions when possible</li>
                <li>• Maintain visual hierarchy and spacing</li>
                <li>• Consider progressive degradation</li>
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
          'Demonstrates nested error boundaries and how they provide granular error isolation without affecting sibling components.',
      },
    },
  },
}

export const ProductionScenarios: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-5xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Production Error Scenarios
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>🔌 API Connection Error</h3>
            <p className='text-gray-600 mb-4'>
              Simulates errors when API endpoints are unavailable or return unexpected data.
            </p>
            <ErrorBoundary
              fallback={
                <div className='p-4 bg-orange-50 border border-orange-200 rounded-lg'>
                  <h4 className='font-medium text-orange-800 mb-2'>
                    ⚠️ Service Temporarily Unavailable
                  </h4>
                  <p className='text-sm text-orange-700 mb-3'>
                    We're having trouble connecting to our services. Please try again in a few
                    moments.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className='px-3 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700'
                  >
                    Try Again
                  </button>
                </div>
              }
            >
              <ThrowError message='Network Error: Failed to fetch /api/dashboard/stats' />
            </ErrorBoundary>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>🏗️ Component Load Error</h3>
            <p className='text-gray-600 mb-4'>
              Handles errors when dynamic components fail to load or render.
            </p>
            <ErrorBoundary
              fallback={
                <div className='p-4 bg-purple-50 border border-purple-200 rounded-lg'>
                  <h4 className='font-medium text-purple-800 mb-2'>📦 Component Unavailable</h4>
                  <p className='text-sm text-purple-700 mb-3'>
                    This feature is temporarily unavailable. The page will continue to work without
                    it.
                  </p>
                  <div className='text-xs text-purple-600'>Error ID: COMP_LOAD_${Date.now()}</div>
                </div>
              }
            >
              <ThrowError message='ChunkLoadError: Failed to import dynamic component' />
            </ErrorBoundary>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border border-gray-200 mb-8'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>🎯 Dashboard Widget Error</h3>
          <p className='text-gray-600 mb-4'>
            Production-ready error handling for dashboard widgets with recovery options.
          </p>
          <ErrorBoundary
            fallback={
              <div className='p-6 bg-gray-50 border border-gray-200 rounded-lg'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <div className='text-2xl'>⚙️</div>
                    <div>
                      <h4 className='font-medium text-gray-800'>Widget Error</h4>
                      <p className='text-sm text-gray-600'>This widget couldn't load</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Widget removed from dashboard')}
                    className='text-gray-400 hover:text-gray-600'
                  >
                    ✕
                  </button>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => window.location.reload()}
                    className='px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700'
                  >
                    Refresh
                  </button>
                  <button
                    onClick={() => alert('Error reported to support')}
                    className='px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300'
                  >
                    Report Issue
                  </button>
                </div>
              </div>
            }
          >
            <ThrowError message='Widget rendering failed: Invalid data structure' />
          </ErrorBoundary>
        </div>

        <div className='p-6 bg-emerald-50 rounded-lg border border-emerald-100'>
          <h4 className='font-semibold text-emerald-900 mb-4'>🚀 Production Considerations:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-emerald-800'>
            <div>
              <h5 className='font-medium mb-2'>Error Monitoring:</h5>
              <ul className='space-y-1'>
                <li>• Integrate with error tracking services (Sentry, Bugsnag)</li>
                <li>• Log errors with context and user information</li>
                <li>• Set up alerts for critical error thresholds</li>
                <li>• Track error recovery success rates</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium mb-2'>User Experience:</h5>
              <ul className='space-y-1'>
                <li>• Provide clear, non-technical error messages</li>
                <li>• Offer meaningful recovery actions</li>
                <li>• Maintain visual consistency with app design</li>
                <li>• Consider progressive disclosure of technical details</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium mb-2'>Error Classification:</h5>
              <ul className='space-y-1'>
                <li>• Critical: Breaks main user workflows</li>
                <li>• High: Major features unavailable</li>
                <li>• Medium: Minor features affected</li>
                <li>• Low: Nice-to-have features impacted</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium mb-2'>Recovery Strategies:</h5>
              <ul className='space-y-1'>
                <li>• Automatic retries with exponential backoff</li>
                <li>• Graceful degradation to simpler UI</li>
                <li>• Cached fallback content when available</li>
                <li>• User-initiated recovery actions</li>
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
          'Real-world error scenarios with production-ready fallback UIs and recovery mechanisms.',
      },
    },
  },
}
