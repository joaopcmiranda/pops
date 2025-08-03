import type { Meta, StoryObj } from '@storybook/react'
import {
  ErrorScreen,
  NetworkErrorScreen,
  NotFoundErrorScreen,
  LoadingErrorScreen,
  PermissionErrorScreen,
} from './ErrorScreen'
import { Button } from './ui/button/button'
import { ComponentStory, AppLayoutStory } from './StoryWrapper'
import '../styles/story-fonts.css'

const meta: Meta<typeof ErrorScreen> = {
  title: 'Components/ErrorScreen',
  component: ErrorScreen,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AppLayoutStory
      title='Error Screen - Default'
      description='Generic error screen with retry and home navigation options'
      background='gradient-red'
    >
      <ErrorScreen
        onRetry={() => alert('🔄 Retry clicked!')}
        onGoHome={() => alert('🏠 Go home clicked!')}
      />
    </AppLayoutStory>
  ),
}
export const NetworkError: Story = {
  render: () => (
    <AppLayoutStory
      title='Error Screen - Network Error'
      description='Network connectivity error with specific messaging and actions'
      background='gradient-orange'
    >
      <NetworkErrorScreen
        onRetry={() => alert('🔄 Retrying connection...')}
        onGoHome={() => alert('🏠 Going to dashboard...')}
      />
    </AppLayoutStory>
  ),
}
export const NotFoundError: Story = {
  render: () => (
    <AppLayoutStory
      title='Error Screen - Not Found'
      description='404-style error for missing resources with custom messaging'
      background='gradient-purple'
    >
      <NotFoundErrorScreen
        title='Trip Not Found'
        description="The trip you're looking for doesn't exist or has been deleted."
        onRetry={() => alert('🔍 Searching again...')}
        onGoHome={() => alert('🏠 Going to dashboard...')}
      />
    </AppLayoutStory>
  ),
}
export const LoadingError: Story = {
  render: () => (
    <AppLayoutStory
      title='Error Screen - Loading Failed'
      description='Data loading error with specific context and retry functionality'
      background='gradient-blue'
    >
      <LoadingErrorScreen
        title='Failed to Load Trip Data'
        description='There was a problem loading your trip information. This might be a temporary issue.'
        onRetry={() => alert('🔄 Reloading data...')}
      />
    </AppLayoutStory>
  ),
}
export const PermissionError: Story = {
  render: () => (
    <AppLayoutStory
      title='Error Screen - Permission Denied'
      description='Access control error for restricted resources'
      background='gradient-gray'
    >
      <PermissionErrorScreen
        title='Private Trip'
        description="This trip is private and you don't have permission to view it."
        showRetry={false}
      />
    </AppLayoutStory>
  ),
}
export const CustomError: Story = {
  render: () => (
    <AppLayoutStory
      title='Error Screen - Custom Content'
      description='Custom error screen with additional content and support options'
      background='gradient-yellow'
    >
      <ErrorScreen
        type='generic'
        title='Custom Error'
        description='This is a custom error message with additional content.'
        onRetry={() => alert('🔄 Custom retry action')}
        onGoHome={() => alert('🏠 Custom home action')}
      >
        <div className='text-center'>
          <p className='text-sm text-gray-600 mb-4'>Error code: ERR_CUSTOM_001</p>
          <Button variant='outline' size='sm' onClick={() => alert('📞 Contacting support...')}>
            Contact Support
          </Button>
        </div>
      </ErrorScreen>
    </AppLayoutStory>
  ),
}
export const AllErrorTypes: Story = {
  render: () => (
    <ComponentStory
      title='Error Screen - All Types Comparison'
      description='Complete overview of all error screen variants side by side'
      background='gradient-cyan'
    >
      <div className='space-y-8'>
        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>Generic Error</h2>
          <div style={{ height: '400px' }}>
            <ErrorScreen showRetry={false} showHome={false} />
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>Network Error</h2>
          <div style={{ height: '400px' }}>
            <NetworkErrorScreen showRetry={false} showHome={false} />
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>Not Found Error</h2>
          <div style={{ height: '400px' }}>
            <NotFoundErrorScreen showRetry={false} showHome={false} />
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>Loading Error</h2>
          <div style={{ height: '400px' }}>
            <LoadingErrorScreen showRetry={false} showHome={false} />
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>Permission Error</h2>
          <div style={{ height: '400px' }}>
            <PermissionErrorScreen showRetry={false} showHome={false} />
          </div>
        </div>

        <div className='p-4 bg-cyan-50 rounded-lg border border-cyan-100'>
          <h4 className='font-semibold text-cyan-900 mb-2'>Error Screen Types:</h4>
          <ul className='text-sm text-cyan-800 space-y-1'>
            <li>
              • <strong>Generic:</strong> Default fallback for unexpected errors
            </li>
            <li>
              • <strong>Network:</strong> Connection and API communication issues
            </li>
            <li>
              • <strong>Not Found:</strong> Missing resources (404-style errors)
            </li>
            <li>
              • <strong>Loading:</strong> Data fetching and processing failures
            </li>
            <li>
              • <strong>Permission:</strong> Access control and authorization errors
            </li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const WithoutButtons: Story = {
  render: () => (
    <AppLayoutStory
      title='Error Screen - No Actions'
      description='Error screen without any action buttons for informational purposes'
      background='gradient-indigo'
    >
      <ErrorScreen
        title='Error Without Actions'
        description='This error screen has no action buttons.'
        showRetry={false}
        showHome={false}
      />
    </AppLayoutStory>
  ),
}
export const OnlyRetry: Story = {
  render: () => (
    <AppLayoutStory
      title='Error Screen - Retry Only'
      description='Error screen with only retry functionality, no home navigation'
      background='gradient-teal'
    >
      <ErrorScreen
        title='Retry Only'
        description='This error screen only shows the retry button.'
        showHome={false}
        onRetry={() => alert('🔄 Retrying...')}
      />
    </AppLayoutStory>
  ),
}
export const TripSpecificErrors: Story = {
  render: () => (
    <ComponentStory
      title='Error Screen - Trip Context'
      description='Error screens specific to trip management scenarios'
      background='gradient-rose'
    >
      <div className='space-y-8'>
        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>Trip Save Error</h2>
          <div style={{ height: '300px' }}>
            <ErrorScreen
              type='network'
              title='Failed to Save Trip'
              description="Your trip couldn't be saved due to a connection issue. Your changes are stored locally and will be synced when connection is restored."
              onRetry={() => alert('💾 Attempting to save again...')}
            />
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-sm'>
          <h2 className='text-xl font-bold mb-4 text-gray-800'>Trip Access Error</h2>
          <div style={{ height: '300px' }}>
            <PermissionErrorScreen
              title='Trip Access Restricted'
              description='This trip is private. You need to be invited by the trip owner to view or edit it.'
            />
          </div>
        </div>

        <div className='p-4 bg-rose-50 rounded-lg border border-rose-100'>
          <h4 className='font-semibold text-rose-900 mb-2'>Trip Error Scenarios:</h4>
          <ul className='text-sm text-rose-800 space-y-1'>
            <li>
              • <strong>Save Failures:</strong> Offline mode and sync notifications
            </li>
            <li>
              • <strong>Access Control:</strong> Private trip permissions and invitations
            </li>
            <li>
              • <strong>Data Loss:</strong> Automatic local storage and recovery
            </li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
