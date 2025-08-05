import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TripCreationWizard } from './TripCreationWizard'
import { ComponentStory } from './StoryWrapper'
import { Card, CardContent } from './ui/card'
import { MapPin, Calendar, Users, FileText, Check } from 'lucide-react'
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

// Individual Step Stories

const StepWrapper = ({ children, currentStep }: { children: React.ReactNode; currentStep: number }) => {
  const [formData, setFormData] = useState({
    title: 'Tokyo Adventure',
    destination: 'Tokyo',
    country: 'Japan',
    type: 'leisure' as const,
    startDate: '2024-06-15',
    endDate: '2024-06-22',
    description: 'An amazing cultural trip to explore Tokyo\'s rich heritage and modern attractions.',
    budget: 3500,
    currency: 'USD',
    travelers: 2,
  })

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      <div className='max-w-4xl mx-auto px-6 py-12'>
        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
          <div className='p-12'>
            <TripCreationWizard 
              onClose={() => {}} 
              onTripCreated={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const Step1_Where: Story = {
  render: () => (
    <ComponentStory
      title='Step 1: Where - Destination Selection'
      description='First step of the wizard where users select their travel destination and country'
      background='gradient-blue'
    >
      <div className='space-y-8'>
        <div className='bg-blue-50 rounded-lg p-6 border border-blue-100'>
          <h3 className='text-lg font-semibold text-blue-900 mb-4'>Step 1 Features:</h3>
          <ul className='text-sm text-blue-800 space-y-2'>
            <li>• <strong>Large MapPin Icon:</strong> Clear visual indicator for location step</li>
            <li>• <strong>Destination Input:</strong> City selection with placeholder examples</li>
            <li>• <strong>Country Input:</strong> Country selection with validation</li>
            <li>• <strong>Required Fields:</strong> Both destination and country must be filled</li>
            <li>• <strong>Modern Design:</strong> Large inputs with hover/focus effects</li>
          </ul>
        </div>
        
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
          <div className='max-w-4xl mx-auto px-6 py-12'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
              <div className='p-12'>
                <div className='space-y-12'>
                  <div className='text-center'>
                    <MapPin className='w-24 h-24 text-blue-500 mx-auto mb-6' />
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
                      Where are you going?
                    </h2>
                    <p className='text-xl text-gray-600'>Tell us about your destination</p>
                  </div>

                  <div className='space-y-8 max-w-2xl mx-auto'>
                    <div>
                      <label className='block text-lg font-semibold text-gray-700 mb-3'>
                        Destination City *
                      </label>
                      <input
                        type='text'
                        defaultValue=''
                        placeholder='e.g., Paris, Tokyo, New York'
                        className='w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md'
                      />
                    </div>

                    <div>
                      <label className='block text-lg font-semibold text-gray-700 mb-3'>Country *</label>
                      <input
                        type='text'
                        defaultValue=''
                        placeholder='e.g., France, Japan, USA'
                        className='w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Step2_When: Story = {
  render: () => (
    <ComponentStory
      title='Step 2: When - Date Selection'
      description='Second step where users choose their travel dates with duration calculation'
      background='gradient-green'
    >
      <div className='space-y-8'>
        <div className='bg-green-50 rounded-lg p-6 border border-green-100'>
          <h3 className='text-lg font-semibold text-green-900 mb-4'>Step 2 Features:</h3>
          <ul className='text-sm text-green-800 space-y-2'>
            <li>• <strong>Calendar Icon:</strong> Clear visual indicator for date step</li>
            <li>• <strong>Start & End Dates:</strong> Two date pickers with validation</li>
            <li>• <strong>Duration Calculation:</strong> Automatic trip length display</li>
            <li>• <strong>Date Validation:</strong> End date must be after start date</li>
            <li>• <strong>Visual Feedback:</strong> Gradient box showing trip duration</li>
          </ul>
        </div>
        
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
          <div className='max-w-4xl mx-auto px-6 py-12'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
              <div className='p-12'>
                <div className='space-y-12'>
                  <div className='text-center'>
                    <Calendar className='w-24 h-24 text-green-500 mx-auto mb-6' />
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
                      When are you traveling?
                    </h2>
                    <p className='text-xl text-gray-600'>Choose your travel dates</p>
                  </div>

                  <div className='max-w-3xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                      <div>
                        <label className='block text-lg font-semibold text-gray-700 mb-3'>
                          Start Date *
                        </label>
                        <input
                          type='date'
                          defaultValue='2024-06-15'
                          className='w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md'
                        />
                      </div>

                      <div>
                        <label className='block text-lg font-semibold text-gray-700 mb-3'>
                          End Date *
                        </label>
                        <input
                          type='date'
                          defaultValue='2024-06-22'
                          className='w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md'
                        />
                      </div>
                    </div>

                    <div className='bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 text-center mt-8 border border-blue-100'>
                      <p className='text-lg font-semibold text-blue-800'>
                        Trip duration: 7 days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Step3_Who: Story = {
  render: () => (
    <ComponentStory
      title='Step 3: Who - Trip Type & Travelers'
      description='Third step for selecting trip type and number of travelers with visual type selection'
      background='gradient-purple'
    >
      <div className='space-y-8'>
        <div className='bg-purple-50 rounded-lg p-6 border border-purple-100'>
          <h3 className='text-lg font-semibold text-purple-900 mb-4'>Step 3 Features:</h3>
          <ul className='text-sm text-purple-800 space-y-2'>
            <li>• <strong>Users Icon:</strong> Clear visual indicator for traveler step</li>
            <li>• <strong>8 Trip Types:</strong> Visual grid with emojis and labels</li>
            <li>• <strong>Interactive Selection:</strong> Cards with hover and selected states</li>
            <li>• <strong>Traveler Count:</strong> Number input with validation (1-20)</li>
            <li>• <strong>Visual Feedback:</strong> Selected trip type highlighted with scale effect</li>
          </ul>
        </div>
        
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
          <div className='max-w-4xl mx-auto px-6 py-12'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
              <div className='p-12'>
                <div className='space-y-12'>
                  <div className='text-center'>
                    <Users className='w-24 h-24 text-purple-500 mx-auto mb-6' />
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
                      What type of trip?
                    </h2>
                    <p className='text-xl text-gray-600'>Help us personalize your experience</p>
                  </div>

                  <div className='space-y-10 max-w-4xl mx-auto'>
                    <div>
                      <label className='block text-lg font-semibold text-gray-700 mb-6'>
                        Trip Type *
                      </label>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        {[
                          { value: 'leisure', label: 'Leisure', emoji: '🏖️', selected: true },
                          { value: 'business', label: 'Business', emoji: '💼', selected: false },
                          { value: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦', selected: false },
                          { value: 'adventure', label: 'Adventure', emoji: '🏔️', selected: false },
                          { value: 'honeymoon', label: 'Honeymoon', emoji: '💕', selected: false },
                          { value: 'solo', label: 'Solo', emoji: '🚶', selected: false },
                          { value: 'group', label: 'Group', emoji: '👥', selected: false },
                          { value: 'other', label: 'Other', emoji: '✨', selected: false },
                        ].map(type => (
                          <button
                            key={type.value}
                            className={`p-6 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-lg ${
                              type.selected
                                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg scale-105'
                                : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm hover:shadow-md'
                            }`}
                          >
                            <div className='text-3xl mb-2'>{type.emoji}</div>
                            <div className='font-semibold text-base'>{type.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className='max-w-md mx-auto'>
                      <label className='block text-lg font-semibold text-gray-700 mb-3'>
                        Number of Travelers *
                      </label>
                      <input
                        type='number'
                        min='1'
                        max='20'
                        defaultValue='2'
                        className='w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md text-center font-semibold'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Step4_Details: Story = {
  render: () => (
    <ComponentStory
      title='Step 4: Details - Budget & Additional Information'
      description='Fourth step for optional budget, title, and description information'
      background='gradient-orange'
    >
      <div className='space-y-8'>
        <div className='bg-orange-50 rounded-lg p-6 border border-orange-100'>
          <h3 className='text-lg font-semibold text-orange-900 mb-4'>Step 4 Features:</h3>
          <ul className='text-sm text-orange-800 space-y-2'>
            <li>• <strong>FileText Icon:</strong> Clear visual indicator for details step</li>
            <li>• <strong>Optional Fields:</strong> All fields in this step are optional</li>
            <li>• <strong>Trip Title:</strong> Custom title with smart placeholder</li>
            <li>• <strong>Description:</strong> Multi-line text area for trip details</li>
            <li>• <strong>Budget & Currency:</strong> Number input with currency selector</li>
            <li>• <strong>6 Currencies:</strong> USD, EUR, GBP, JPY, CAD, AUD support</li>
          </ul>
        </div>
        
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
          <div className='max-w-4xl mx-auto px-6 py-12'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
              <div className='p-12'>
                <div className='space-y-6'>
                  <div className='text-center mb-8'>
                    <FileText className='w-16 h-16 text-orange-500 mx-auto mb-4' />
                    <h2 className='text-2xl font-bold text-gray-900 mb-2'>Additional Details</h2>
                    <p className='text-gray-600'>Budget and trip information (optional)</p>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Trip Title</label>
                      <input
                        type='text'
                        defaultValue='Tokyo Adventure'
                        placeholder='Tokyo Vacation'
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                      <textarea
                        defaultValue="An amazing cultural trip to explore Tokyo's rich heritage and modern attractions."
                        placeholder='Tell us about your trip plans...'
                        rows={3}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical'
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Budget</label>
                        <input
                          type='number'
                          min='0'
                          defaultValue='3500'
                          placeholder='0'
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg'
                        />
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Currency</label>
                        <select
                          defaultValue='USD'
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg'
                        >
                          <option value='USD'>USD ($)</option>
                          <option value='EUR'>EUR (€)</option>
                          <option value='GBP'>GBP (£)</option>
                          <option value='JPY'>JPY (¥)</option>
                          <option value='CAD'>CAD ($)</option>
                          <option value='AUD'>AUD ($)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Step5_Review: Story = {
  render: () => (
    <ComponentStory
      title='Step 5: Review - Final Confirmation'
      description='Final step showing complete trip summary and title confirmation before creation'
      background='gradient-green'
    >
      <div className='space-y-8'>
        <div className='bg-green-50 rounded-lg p-6 border border-green-100'>
          <h3 className='text-lg font-semibold text-green-900 mb-4'>Step 5 Features:</h3>
          <ul className='text-sm text-green-800 space-y-2'>
            <li>• <strong>Check Icon:</strong> Clear visual indicator for completion step</li>
            <li>• <strong>Complete Summary:</strong> All entered information displayed in cards</li>
            <li>• <strong>Final Title Input:</strong> Required field for trip name</li>
            <li>• <strong>Conditional Display:</strong> Only shows filled optional fields</li>
            <li>• <strong>Create Trip Action:</strong> Final button to submit the form</li>
          </ul>
        </div>
        
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
          <div className='max-w-4xl mx-auto px-6 py-12'>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
              <div className='p-12'>
                <div className='space-y-6'>
                  <div className='text-center mb-8'>
                    <Check className='w-16 h-16 text-green-500 mx-auto mb-4' />
                    <h2 className='text-2xl font-bold text-gray-900 mb-2'>Review Your Trip</h2>
                    <p className='text-gray-600'>Make sure everything looks good</p>
                  </div>

                  <Card>
                    <CardContent className='p-6 space-y-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <h3 className='font-semibold text-gray-900 mb-2'>Destination</h3>
                          <p className='text-gray-600'>Tokyo, Japan</p>
                        </div>

                        <div>
                          <h3 className='font-semibold text-gray-900 mb-2'>Dates</h3>
                          <p className='text-gray-600'>6/15/2024 - 6/22/2024</p>
                        </div>

                        <div>
                          <h3 className='font-semibold text-gray-900 mb-2'>Trip Type</h3>
                          <p className='text-gray-600 capitalize'>Leisure</p>
                        </div>

                        <div>
                          <h3 className='font-semibold text-gray-900 mb-2'>Travelers</h3>
                          <p className='text-gray-600'>2 people</p>
                        </div>
                      </div>

                      <div>
                        <h3 className='font-semibold text-gray-900 mb-2'>Title</h3>
                        <p className='text-gray-600'>Tokyo Adventure</p>
                      </div>

                      <div>
                        <h3 className='font-semibold text-gray-900 mb-2'>Description</h3>
                        <p className='text-gray-600'>An amazing cultural trip to explore Tokyo's rich heritage and modern attractions.</p>
                      </div>

                      <div>
                        <h3 className='font-semibold text-gray-900 mb-2'>Budget</h3>
                        <p className='text-gray-600'>USD 3,500</p>
                      </div>
                    </CardContent>
                  </Card>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Trip Title *</label>
                    <input
                      type='text'
                      defaultValue='Tokyo Adventure'
                      placeholder='Tokyo Vacation'
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
