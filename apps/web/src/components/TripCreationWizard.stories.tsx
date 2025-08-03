import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TripCreationWizard } from './TripCreationWizard'
import { ComponentStory } from './StoryWrapper'
import '../styles/story-fonts.css'

const WizardDemo = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {!isOpen && (
        <div className='text-center p-8'>
          <button
            onClick={() => setIsOpen(true)}
            className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Open Trip Creation Wizard
          </button>
        </div>
      )}

      {isOpen && (
        <TripCreationWizard
          onClose={() => setIsOpen(false)}
          onTripCreated={trip => {
            alert(`🎉 Trip created: ${trip.title || 'New Trip'}`)
            setIsOpen(false)
          }}
        />
      )}
    </>
  )
}

const meta: Meta<typeof TripCreationWizard> = {
  title: 'Components/TripCreationWizard',
  component: TripCreationWizard,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ComponentStory
      title='Trip Creation Wizard - Complete Flow'
      description='Full-page wizard for creating a new trip with 5 steps: Where → When → Who → Details → Review'
      background='gradient-blue'
    >
      <WizardDemo />
    </ComponentStory>
  ),
}

export const Interactive: Story = {
  render: () => (
    <ComponentStory
      title='Trip Creation Wizard - Interactive Demo'
      description='Click through the entire trip creation process with realistic form validation'
      background='gradient-green'
    >
      <div className='space-y-6'>
        <div className='bg-green-50 rounded-lg p-6 border border-green-100'>
          <h3 className='text-lg font-semibold text-green-900 mb-4'>Wizard Features:</h3>
          <ul className='text-sm text-green-800 space-y-2'>
            <li>
              • <strong>Step 1 - Where:</strong> Destination and country selection
            </li>
            <li>
              • <strong>Step 2 - When:</strong> Travel date picker with duration calculation
            </li>
            <li>
              • <strong>Step 3 - Who:</strong> Trip type selection and traveler count
            </li>
            <li>
              • <strong>Step 4 - Details:</strong> Budget, title, and description (optional)
            </li>
            <li>
              • <strong>Step 5 - Review:</strong> Final review and trip creation
            </li>
          </ul>
        </div>

        <div className='bg-blue-50 rounded-lg p-6 border border-blue-100'>
          <h3 className='text-lg font-semibold text-blue-900 mb-4'>UX Improvements:</h3>
          <ul className='text-sm text-blue-800 space-y-2'>
            <li>
              • <strong>Mobile-First:</strong> Responsive design for all screen sizes
            </li>
            <li>
              • <strong>Progressive Disclosure:</strong> One step at a time reduces cognitive load
            </li>
            <li>
              • <strong>Visual Progress:</strong> Clear step indicators and completion states
            </li>
            <li>
              • <strong>Smart Validation:</strong> Real-time validation with helpful feedback
            </li>
            <li>
              • <strong>Full-Page Experience:</strong> No modal constraints, plenty of space
            </li>
          </ul>
        </div>

        <WizardDemo />
      </div>
    </ComponentStory>
  ),
}

export const StepByStep: Story = {
  render: () => (
    <ComponentStory
      title='Trip Creation Wizard - Step Showcase'
      description='Visual breakdown of each wizard step with explanations'
      background='gradient-purple'
    >
      <div className='space-y-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[
            {
              step: 1,
              title: 'Where',
              description: 'Destination Selection',
              features: ['City and country input', 'Location autocomplete', 'Validation required'],
              color: 'blue',
            },
            {
              step: 2,
              title: 'When',
              description: 'Date Selection',
              features: ['Start and end date pickers', 'Duration calculation', 'Date validation'],
              color: 'green',
            },
            {
              step: 3,
              title: 'Who',
              description: 'Trip Type & Travelers',
              features: ['8 trip type options', 'Traveler count input', 'Visual type selection'],
              color: 'purple',
            },
            {
              step: 4,
              title: 'Details',
              description: 'Additional Information',
              features: ['Optional trip title', 'Budget and currency', 'Description field'],
              color: 'orange',
            },
            {
              step: 5,
              title: 'Review',
              description: 'Final Confirmation',
              features: ['Complete trip summary', 'Final title input', 'Create trip action'],
              color: 'green',
            },
          ].map(step => (
            <div key={step.step} className='bg-white rounded-xl p-6 shadow-sm border'>
              <div
                className={`w-12 h-12 rounded-full bg-${step.color}-500 text-white flex items-center justify-center font-bold text-lg mb-4`}
              >
                {step.step}
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>{step.title}</h3>
              <p className='text-gray-600 mb-4'>{step.description}</p>
              <ul className='text-sm text-gray-700 space-y-1'>
                {step.features.map((feature, index) => (
                  <li key={index} className='flex items-center'>
                    <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mr-2'></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='bg-purple-50 rounded-lg p-6 border border-purple-100'>
          <h3 className='text-lg font-semibold text-purple-900 mb-4'>Design Principles:</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800'>
            <div>
              <h4 className='font-semibold mb-2'>User Experience</h4>
              <ul className='space-y-1'>
                <li>• Progressive disclosure reduces complexity</li>
                <li>• Clear visual hierarchy and navigation</li>
                <li>• Contextual help and validation feedback</li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>Technical Features</h4>
              <ul className='space-y-1'>
                <li>• Form state management across steps</li>
                <li>• Real-time validation and error handling</li>
                <li>• Mobile-responsive design patterns</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='text-center'>
          <WizardDemo />
        </div>
      </div>
    </ComponentStory>
  ),
}

export const MobileOptimized: Story = {
  render: () => (
    <ComponentStory
      title='Trip Creation Wizard - Mobile Experience'
      description='Mobile-optimized wizard with touch-friendly interface and responsive design'
      background='gradient-cyan'
    >
      <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-cyan-50 rounded-lg p-6 border border-cyan-100'>
            <h3 className='text-lg font-semibold text-cyan-900 mb-4'>Mobile Features:</h3>
            <ul className='text-sm text-cyan-800 space-y-2'>
              <li>
                • <strong>Touch-Friendly:</strong> 44px minimum touch targets
              </li>
              <li>
                • <strong>Responsive Steps:</strong> Optimized for small screens
              </li>
              <li>
                • <strong>Smart Keyboard:</strong> Appropriate input types
              </li>
              <li>
                • <strong>Scroll Optimization:</strong> Smooth scrolling on mobile
              </li>
              <li>
                • <strong>Safe Areas:</strong> iOS notch and bottom bar support
              </li>
            </ul>
          </div>

          <div className='bg-blue-50 rounded-lg p-6 border border-blue-100'>
            <h3 className='text-lg font-semibold text-blue-900 mb-4'>Accessibility:</h3>
            <ul className='text-sm text-blue-800 space-y-2'>
              <li>
                • <strong>Keyboard Navigation:</strong> Full keyboard support
              </li>
              <li>
                • <strong>Screen Readers:</strong> Proper ARIA labels
              </li>
              <li>
                • <strong>Focus Management:</strong> Clear focus indicators
              </li>
              <li>
                • <strong>High Contrast:</strong> WCAG compliant colors
              </li>
              <li>
                • <strong>Error Handling:</strong> Clear validation messages
              </li>
            </ul>
          </div>
        </div>

        <div className='text-center'>
          <p className='text-gray-600 mb-4'>
            Test the wizard on different screen sizes to see the responsive behavior
          </p>
          <WizardDemo />
        </div>
      </div>
    </ComponentStory>
  ),
}
