/**
 * @fileoverview Storybook Stories for WidgetGallery Component
 *
 * Comprehensive stories showcasing the POps Widget Gallery component with different
 * widget selections, categories, and user interaction flows. Demonstrates the
 * modal interface for adding new widgets to the dashboard.
 */

import type { Meta, StoryObj } from '@storybook/react-vite'
import { WidgetGallery } from './WidgetGallery'
import type { WidgetConfig } from '@pops/widgets'

const meta: Meta<typeof WidgetGallery> = {
  title: 'Hub/WidgetGallery',
  component: WidgetGallery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The WidgetGallery is a modal component for selecting and adding new widgets to the dashboard. It displays available widgets organized by category with clear descriptions and size information.',
      },
    },
  },
  argTypes: {
    onAddWidget: {
      action: 'addWidget',
      description: 'Callback when user selects a widget to add',
    },
    onClose: {
      action: 'close',
      description: 'Callback when user closes the gallery modal',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <div className='bg-gray-50 min-h-screen'>
      <WidgetGallery {...args} />
    </div>
  ),
  args: {
    onAddWidget: (widgetConfig: WidgetConfig) => {
      console.log('Widget added:', widgetConfig)
    },
    onClose: () => {
      console.log('Gallery closed')
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default widget gallery modal showing all available widgets organized in a grid layout.',
      },
    },
  },
}

export const WidgetCategories: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Widget Categories & Selection
        </h2>

        <div className='bg-white rounded-lg shadow-sm border p-6 mb-8'>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>🧩 Available Widgets</h3>
            <p className='text-gray-600'>
              The widget gallery organizes available widgets into categories for easy discovery.
              Each widget shows its icon, name, description, category, and size dimensions.
            </p>
          </div>

          <WidgetGallery
            onAddWidget={widgetConfig => {
              console.log('Widget selected:', widgetConfig)
              alert(
                `Added ${widgetConfig.title} widget (${widgetConfig.size.w}×${widgetConfig.size.h})`
              )
            }}
            onClose={() => {
              console.log('Gallery closed')
              alert('Widget gallery closed')
            }}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='text-2xl'>✈️</div>
              <div>
                <h4 className='font-semibold text-gray-900'>Travel Category</h4>
                <span className='text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded'>travel</span>
              </div>
            </div>
            <h5 className='font-medium text-gray-900 mb-2'>Travel Summary</h5>
            <p className='text-sm text-gray-600 mb-3'>
              Overview of trips and travel statistics including next trip, total trips, and upcoming
              travel plans.
            </p>
            <div className='flex items-center justify-between text-xs text-gray-500'>
              <span>Size: 4×3 grid units</span>
              <span>Updates: Every 5 min</span>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='text-2xl'>⚡</div>
              <div>
                <h4 className='font-semibold text-gray-900'>Utility Category</h4>
                <span className='text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded'>
                  utility
                </span>
              </div>
            </div>
            <h5 className='font-medium text-gray-900 mb-2'>Quick Actions</h5>
            <p className='text-sm text-gray-600 mb-3'>
              Shortcuts to common tasks like launching apps, creating new trips, and accessing
              frequently used features.
            </p>
            <div className='flex items-center justify-between text-xs text-gray-500'>
              <span>Size: 4×2 grid units</span>
              <span>Interactive buttons</span>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='text-2xl'>📊</div>
              <div>
                <h4 className='font-semibold text-gray-900'>Activity Category</h4>
                <span className='text-sm text-green-600 bg-green-50 px-2 py-1 rounded'>
                  activity
                </span>
              </div>
            </div>
            <h5 className='font-medium text-gray-900 mb-2'>Recent Activity</h5>
            <p className='text-sm text-gray-600 mb-3'>
              Latest updates across all apps including new trips, completed tasks, and system
              notifications.
            </p>
            <div className='flex items-center justify-between text-xs text-gray-500'>
              <span>Size: 4×4 grid units</span>
              <span>Real-time updates</span>
            </div>
          </div>
        </div>

        <div className='mt-8 p-6 bg-indigo-50 rounded-lg border border-indigo-100'>
          <h4 className='font-semibold text-indigo-900 mb-4'>Widget Selection Features:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h5 className='font-medium text-indigo-800 mb-2'>Visual Information:</h5>
              <ul className='text-sm text-indigo-700 space-y-1'>
                <li>• Descriptive icons for quick identification</li>
                <li>• Category labels with color coding</li>
                <li>• Size dimensions for layout planning</li>
                <li>• Clear widget descriptions</li>
                <li>• Visual hover feedback</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium text-indigo-800 mb-2'>Interaction Design:</h5>
              <ul className='text-sm text-indigo-700 space-y-1'>
                <li>• Click anywhere on card to select</li>
                <li>• Clear add button indicator</li>
                <li>• Responsive grid layout</li>
                <li>• Accessible keyboard navigation</li>
                <li>• Modal overlay for focus</li>
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
          'Detailed view of widget categories showing the different types of widgets available for dashboard customization.',
      },
    },
  },
}

export const InteractionFlows: Story = {
  render: () => (
    <div className='space-y-12 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Widget Gallery Interactions
        </h2>

        <div className='bg-white rounded-lg shadow-sm border p-6 mb-8'>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              🎮 Interactive Widget Selection
            </h3>
            <p className='text-gray-600 mb-4'>
              Click any widget card to add it to the dashboard. The gallery provides immediate
              feedback and closes automatically after selection. Use the X button to close without
              adding a widget.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
              <div className='bg-blue-50 p-4 rounded-lg'>
                <h4 className='font-medium text-blue-900 mb-2'>🖱️ Widget Selection</h4>
                <p className='text-sm text-blue-700'>
                  Click anywhere on a widget card to select and add it to the dashboard. The gallery
                  will close and the widget will appear on the dashboard.
                </p>
              </div>
              <div className='bg-red-50 p-4 rounded-lg'>
                <h4 className='font-medium text-red-900 mb-2'>❌ Cancel Action</h4>
                <p className='text-sm text-red-700'>
                  Use the X button in the header to close the gallery without adding any widgets.
                  This returns you to the dashboard unchanged.
                </p>
              </div>
            </div>
          </div>

          <WidgetGallery
            onAddWidget={widgetConfig => {
              console.log('Widget interaction:', widgetConfig)
              alert(
                `✅ Added "${widgetConfig.title}" widget!\n\nSize: ${widgetConfig.size.w}×${widgetConfig.size.h}\nCategory: ${widgetConfig.type}\n\nThe widget would now appear on your dashboard.`
              )
            }}
            onClose={() => {
              console.log('Gallery closed via X button')
              alert('❌ Widget gallery closed without adding widgets.')
            }}
          />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>🔄 User Flow</h4>
            <div className='space-y-3 text-sm text-gray-700'>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold'>
                  1
                </div>
                <div>
                  <strong>Open Gallery:</strong> User clicks "Add Widget" on dashboard
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold'>
                  2
                </div>
                <div>
                  <strong>Browse Options:</strong> User reviews available widget types
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold'>
                  3
                </div>
                <div>
                  <strong>Select Widget:</strong> User clicks on desired widget card
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold'>
                  4
                </div>
                <div>
                  <strong>Confirm Addition:</strong> Widget appears on dashboard
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>⚙️ Technical Features</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Modal Overlay:</strong> Focuses user attention on widget selection
              </li>
              <li>
                • <strong>Callback Pattern:</strong> Clean integration with parent dashboard
              </li>
              <li>
                • <strong>Responsive Design:</strong> Works on desktop and mobile devices
              </li>
              <li>
                • <strong>Accessibility:</strong> Keyboard navigation and screen reader support
              </li>
              <li>
                • <strong>Error Handling:</strong> Graceful fallbacks for missing data
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 p-6 bg-green-50 rounded-lg border border-green-100'>
          <h4 className='font-semibold text-green-900 mb-3'>💡 Design Principles:</h4>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-green-800'>
            <div>
              <h5 className='font-medium mb-2'>User Experience:</h5>
              <ul className='space-y-1'>
                <li>• Clear visual hierarchy with prominent headings</li>
                <li>• Consistent card-based layout for easy scanning</li>
                <li>• Immediate feedback on user interactions</li>
                <li>• Escape routes (close button) for user control</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium mb-2'>Information Architecture:</h5>
              <ul className='space-y-1'>
                <li>• Logical grouping by widget categories</li>
                <li>• Essential information visible at a glance</li>
                <li>• Progressive disclosure of widget details</li>
                <li>• Consistent terminology and labeling</li>
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
          'Interactive demonstration of the widget gallery showing selection flow and user interaction patterns.',
      },
    },
  },
}

export const ResponsiveModal: Story = {
  render: () => (
    <div className='space-y-8 bg-gray-50 min-h-screen p-8'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Responsive Modal Design
        </h2>

        <div className='space-y-8'>
          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='p-6 bg-blue-50 border-b border-blue-100'>
              <h3 className='text-xl font-semibold text-blue-900'>🖥️ Desktop Modal</h3>
              <p className='text-blue-700 mt-2'>
                Full-width modal with multi-column widget grid for desktop screens
              </p>
            </div>
            <div className='relative min-h-96 bg-gray-100'>
              <WidgetGallery
                onAddWidget={widgetConfig => {
                  console.log('Desktop widget selection:', widgetConfig)
                }}
                onClose={() => {
                  console.log('Desktop modal closed')
                }}
              />
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='p-6 bg-green-50 border-b border-green-100'>
              <h3 className='text-xl font-semibold text-green-900'>📱 Mobile Modal</h3>
              <p className='text-green-700 mt-2'>
                Single column layout optimized for mobile screens with touch interactions
              </p>
            </div>
            <div className='max-w-md mx-auto border-x-2 border-gray-300 bg-gray-100 min-h-96 relative'>
              <WidgetGallery
                onAddWidget={widgetConfig => {
                  console.log('Mobile widget selection:', widgetConfig)
                }}
                onClose={() => {
                  console.log('Mobile modal closed')
                }}
              />
            </div>
          </div>
        </div>

        <div className='mt-8 p-6 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-4'>Modal Responsive Features:</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h5 className='font-medium text-purple-800 mb-2'>Layout Adaptation:</h5>
              <ul className='text-sm text-purple-700 space-y-1'>
                <li>
                  • <strong>Desktop:</strong> 3-column widget grid
                </li>
                <li>
                  • <strong>Tablet:</strong> 2-column layout
                </li>
                <li>
                  • <strong>Mobile:</strong> Single column stack
                </li>
                <li>• Max width constraints for readability</li>
                <li>• Scrollable content area</li>
              </ul>
            </div>
            <div>
              <h5 className='font-medium text-purple-800 mb-2'>Mobile Optimization:</h5>
              <ul className='text-sm text-purple-700 space-y-1'>
                <li>• Touch-friendly button sizes</li>
                <li>• Adequate spacing between cards</li>
                <li>• Easy-to-tap close button</li>
                <li>• Optimized modal height</li>
                <li>• Smooth scroll behavior</li>
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
          'Demonstrates how the widget gallery modal adapts to different screen sizes while maintaining usability.',
      },
    },
  },
}

export const EmptyGalleryState: Story = {
  render: () => (
    <div className='bg-gray-50 min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Widget Gallery Edge Cases
        </h2>

        <div className='bg-white rounded-lg shadow-sm border p-6 mb-8'>
          <div className='mb-6'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              📭 Empty Gallery Simulation
            </h3>
            <p className='text-gray-600'>
              In rare cases where no widgets are available, the gallery would show an empty state
              with helpful messaging. This simulates that scenario.
            </p>
          </div>

          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <div className='bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto'>
              {/* Header */}
              <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
                <div>
                  <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                    Add Widget
                  </h2>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                    Choose a widget to add to your dashboard
                  </p>
                </div>
                <button
                  onClick={() => alert('Close clicked')}
                  className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
                >
                  <div className='w-4 h-4'>✕</div>
                </button>
              </div>

              {/* Empty State */}
              <div className='p-12 text-center'>
                <div className='text-6xl text-gray-400 mb-4'>🧩</div>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2'>
                  No Widgets Available
                </h3>
                <p className='text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto'>
                  There are currently no widgets available to add. Check back later or contact
                  support if you believe this is an error.
                </p>
                <button
                  onClick={() => alert('Refresh clicked')}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                >
                  Refresh Gallery
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>🛡️ Error Handling</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Empty State:</strong> Graceful messaging when no widgets available
              </li>
              <li>
                • <strong>Loading State:</strong> Spinner while fetching widget data
              </li>
              <li>
                • <strong>Network Error:</strong> Retry mechanism for failed requests
              </li>
              <li>
                • <strong>Fallback Content:</strong> Default widgets when API unavailable
              </li>
              <li>
                • <strong>User Guidance:</strong> Clear next steps for users
              </li>
            </ul>
          </div>

          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-3'>🔄 Recovery Options</h4>
            <ul className='text-sm text-gray-700 space-y-2'>
              <li>
                • <strong>Refresh Button:</strong> Manual retry for loading widgets
              </li>
              <li>
                • <strong>Close Option:</strong> Exit gracefully without adding widgets
              </li>
              <li>
                • <strong>Support Contact:</strong> Link to help resources
              </li>
              <li>
                • <strong>Fallback Widgets:</strong> Basic widgets always available
              </li>
              <li>
                • <strong>Cache Strategy:</strong> Show previously loaded widgets
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 p-6 bg-amber-50 rounded-lg border border-amber-100'>
          <h4 className='font-semibold text-amber-900 mb-3'>🏗️ Implementation Notes:</h4>
          <div className='text-sm text-amber-800 space-y-2'>
            <p>
              <strong>Widget Registry:</strong> The availableWidgets array could be fetched from an
              API endpoint to support dynamic widget loading and updates.
            </p>
            <p>
              <strong>Category Management:</strong> Widget categories could be managed centrally to
              support filtering and organization as the widget ecosystem grows.
            </p>
            <p>
              <strong>Permissions:</strong> Future versions could include user-specific widget
              availability based on subscriptions or permissions.
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
          'Shows how the widget gallery handles edge cases like empty states and error scenarios.',
      },
    },
  },
}
