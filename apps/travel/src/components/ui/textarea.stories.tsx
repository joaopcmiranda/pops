import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './textarea'
import { Label } from './label'
import { ComponentStory } from '../StoryWrapper'
import { useState } from 'react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Textarea> = {
  title: 'Components/UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Textarea placeholder='Enter your message...' />,
}

export const BasicStates: Story = {
  render: () => (
    <ComponentStory
      title='Textarea States'
      description='Different textarea states including normal, disabled, readonly, and error states'
      background='gradient-blue'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='normal-textarea' className='block mb-2'>
              Normal State
            </Label>
            <Textarea
              id='normal-textarea'
              placeholder='Describe your travel experience...'
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor='disabled-textarea' className='block mb-2 opacity-50'>
              Disabled State
            </Label>
            <Textarea
              id='disabled-textarea'
              placeholder='This textarea is disabled'
              disabled
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor='readonly-textarea' className='block mb-2'>
              Readonly State
            </Label>
            <Textarea
              id='readonly-textarea'
              value='This content cannot be edited. It contains important travel information that should remain unchanged.'
              readOnly
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor='error-textarea' className='block mb-2 text-red-700'>
              Error State
            </Label>
            <Textarea
              id='error-textarea'
              placeholder='This field has an error'
              className='border-red-300 focus-visible:border-red-500 focus-visible:ring-red-200'
              aria-invalid='true'
              rows={3}
            />
            <p className='text-xs text-red-600 mt-1'>Please provide a valid description</p>
          </div>

          <div>
            <Label htmlFor='success-textarea' className='block mb-2 text-green-700'>
              Success State
            </Label>
            <Textarea
              id='success-textarea'
              value='Your trip review has been successfully submitted!'
              className='border-green-300 focus-visible:border-green-500 focus-visible:ring-green-200'
              readOnly
              rows={2}
            />
            <p className='text-xs text-green-600 mt-1'>Review saved successfully</p>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const TripPlanningTextareas: Story = {
  render: () => (
    <ComponentStory
      title='Trip Planning Textareas'
      description='Real-world examples of textareas used in trip organization'
      background='gradient-green'
    >
      <div className='space-y-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm max-w-2xl'>
          <h3 className='text-lg font-semibold text-gray-900 mb-6'>Trip Planning Form</h3>

          <div className='space-y-6'>
            <div>
              <Label htmlFor='trip-description' className='block mb-2 font-medium'>
                Trip Description
                <span className='text-xs font-normal text-gray-500 ml-1'>(optional)</span>
              </Label>
              <Textarea
                id='trip-description'
                placeholder="Describe what you want to experience on this trip. Include any specific interests, must-see places, or activities you're excited about..."
                rows={4}
              />
              <p className='text-xs text-gray-500 mt-1'>
                This helps us personalize your itinerary recommendations
              </p>
            </div>

            <div>
              <Label htmlFor='special-requirements' className='block mb-2 font-medium'>
                Special Requirements & Preferences
              </Label>
              <Textarea
                id='special-requirements'
                placeholder='Dietary restrictions, accessibility needs, medical considerations, travel pace preferences, accommodation requirements, etc.'
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor='previous-experience' className='block mb-2 font-medium'>
                Previous Travel Experience
                <span className='text-xs font-normal text-gray-500 ml-1'>(optional)</span>
              </Label>
              <Textarea
                id='previous-experience'
                placeholder="Tell us about places you've visited before and what you loved or didn't enjoy about those experiences..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor='additional-notes' className='block mb-2 font-medium'>
                Additional Notes
                <span className='text-xs font-normal text-gray-500 ml-1'>(optional)</span>
              </Label>
              <Textarea
                id='additional-notes'
                placeholder="Any other information you'd like us to know..."
                rows={2}
              />
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const ReviewAndFeedback: Story = {
  render: () => (
    <ComponentStory
      title='Reviews and Feedback'
      description='Textareas for writing reviews, feedback, and detailed comments'
      background='gradient-purple'
    >
      <div className='space-y-6 max-w-2xl'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Hotel Review</h3>
          <div className='flex items-center gap-2 mb-4'>
            <span className='text-sm text-gray-600'>Rating:</span>
            <div className='flex gap-1'>
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} className='text-yellow-400'>
                  ★
                </span>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor='hotel-review' className='block mb-2 font-medium'>
              Share Your Experience
            </Label>
            <Textarea
              id='hotel-review'
              placeholder='Tell other travelers about your stay. What did you love? What could be improved? How was the location, service, amenities, etc.?'
              rows={5}
              defaultValue="Had an amazing stay at Hotel Cosmos in Prague! The location was perfect - just a 5-minute walk from the Old Town Square. The staff was incredibly helpful and spoke great English. Room was clean and spacious with a beautiful view of the city.

The breakfast buffet had a great variety of local and international options. Only minor complaint was that the WiFi was a bit slow in the evenings, but overall it didn't impact our stay.

Would definitely recommend this hotel to anyone visiting Prague. Great value for money!"
            />
            <p className='text-xs text-gray-500 mt-1'>
              Your review helps other travelers make informed decisions
            </p>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Trip Feedback</h3>

          <div>
            <Label htmlFor='trip-feedback' className='block mb-2 font-medium'>
              How was your overall trip experience?
            </Label>
            <Textarea
              id='trip-feedback'
              placeholder="We'd love to hear about your trip! What were the highlights? Any suggestions for improvement? How was the planning process?"
              rows={4}
            />
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const CharacterCounter: Story = () => {
  const [content, setContent] = useState('')
  const maxLength = 500
  const remaining = maxLength - content.length

  return (
    <ComponentStory
      title='Textarea with Character Counter'
      description='Interactive textarea with real-time character counting and limits'
      background='gradient-orange'
    >
      <div className='space-y-6 max-w-md'>
        <div>
          <Label htmlFor='limited-textarea' className='block mb-2 font-medium'>
            Trip Summary
            <span className='text-xs font-normal text-gray-500 ml-1'>(max 500 characters)</span>
          </Label>
          <Textarea
            id='limited-textarea'
            placeholder='Summarize your trip in a few sentences...'
            rows={4}
            maxLength={maxLength}
            value={content}
            onChange={e => setContent(e.target.value)}
            className={
              remaining < 50
                ? 'border-amber-300 focus-visible:border-amber-500 focus-visible:ring-amber-200'
                : ''
            }
          />
          <div className='flex justify-between items-center mt-1'>
            <p
              className={`text-xs ${remaining < 50 ? 'text-amber-600' : remaining < 20 ? 'text-red-600' : 'text-gray-500'}`}
            >
              {remaining} characters remaining
            </p>
            <p className='text-xs text-gray-400'>
              {content.length}/{maxLength}
            </p>
          </div>
        </div>

        <div className='p-4 bg-orange-50 rounded-lg border border-orange-100'>
          <h4 className='font-semibold text-orange-900 mb-2'>Character Counter Features:</h4>
          <ul className='text-sm text-orange-800 space-y-1'>
            <li>• Real-time character counting</li>
            <li>• Color changes when approaching limit</li>
            <li>• Visual feedback for user guidance</li>
            <li>• Prevents content overflow</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  )
}

export const AutoResize: Story = {
  render: () => (
    <ComponentStory
      title='Auto-Resizing Textarea'
      description='Textarea that automatically adjusts height based on content'
      background='gradient-pink'
    >
      <div className='space-y-6 max-w-md'>
        <div>
          <Label htmlFor='auto-resize' className='block mb-2 font-medium'>
            Detailed Itinerary Notes
          </Label>
          <div className='relative'>
            <Textarea
              id='auto-resize'
              placeholder='Start typing your detailed itinerary notes here. This textarea will automatically expand as you add more content...'
              className='resize-none overflow-hidden'
              style={{ fieldSizing: 'content' }}
              onInput={e => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = 'auto'
                target.style.height = target.scrollHeight + 'px'
              }}
            />
          </div>
          <p className='text-xs text-gray-500 mt-1'>Textarea automatically expands as you type</p>
        </div>

        <div className='space-y-3'>
          <h4 className='text-sm font-semibold text-gray-700'>
            Example Content to Test Auto-Resize:
          </h4>
          <div className='text-xs text-gray-600 space-y-2'>
            <p>
              <strong>Day 1:</strong> Arrive in Paris, check into hotel, evening stroll along the
              Seine
            </p>
            <p>
              <strong>Day 2:</strong> Visit Louvre Museum in the morning, lunch at local café,
              afternoon at Eiffel Tower
            </p>
            <p>
              <strong>Day 3:</strong> Day trip to Versailles Palace, return for dinner in Montmartre
            </p>
            <p>
              <strong>Day 4:</strong> Notre-Dame Cathedral, Latin Quarter exploration, evening river
              cruise
            </p>
            <p>
              <strong>Day 5:</strong> Shopping on Champs-Élysées, visit Arc de Triomphe, farewell
              dinner
            </p>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const FormValidation: Story = {
  render: () => (
    <ComponentStory
      title='Textarea Form Validation'
      description='Textareas with various validation states and error handling'
      background='gradient-red'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-5'>
          <div>
            <Label htmlFor='required-field' className='block mb-2 font-medium text-red-700'>
              Emergency Contact Information *
            </Label>
            <Textarea
              id='required-field'
              placeholder='Please provide emergency contact details...'
              className='border-red-300 focus-visible:border-red-500 focus-visible:ring-red-200'
              aria-invalid='true'
              required
              rows={3}
            />
            <p className='text-xs text-red-600 mt-1'>This field is required</p>
          </div>

          <div>
            <Label htmlFor='min-length-field' className='block mb-2 font-medium text-amber-700'>
              Travel Experience Description
            </Label>
            <Textarea
              id='min-length-field'
              placeholder='Please provide at least 50 characters...'
              className='border-amber-300 focus-visible:border-amber-500 focus-visible:ring-amber-200'
              rows={3}
            />
            <p className='text-xs text-amber-600 mt-1'>
              Please provide more details (minimum 50 characters)
            </p>
          </div>

          <div>
            <Label htmlFor='validated-field' className='block mb-2 font-medium text-green-700'>
              Booking Confirmation
            </Label>
            <Textarea
              id='validated-field'
              value='Thank you for your booking! Your reservation has been confirmed for Hotel Paradise, Check-in: March 15th, Check-out: March 20th. Confirmation number: ABC123XYZ.'
              className='border-green-300 focus-visible:border-green-500 focus-visible:ring-green-200'
              readOnly
              rows={3}
            />
            <p className='text-xs text-green-600 mt-1'>✓ Booking details confirmed</p>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const Interactive: Story = () => {
  const [feedback, setFeedback] = useState('')
  const [wordCount, setWordCount] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setFeedback(text)
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    setWordCount(words)
  }

  return (
    <ComponentStory
      title='Interactive Textarea Demo'
      description='Advanced textarea with word counting, validation, and real-time feedback'
      background='gradient-blue'
    >
      <div className='space-y-6 max-w-2xl'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Activity Feedback Form</h3>

          <div>
            <Label htmlFor='interactive-feedback' className='block mb-2 font-medium'>
              Tell us about your experience
              <span className='text-xs font-normal text-gray-500 ml-1'>
                (minimum 20 words recommended)
              </span>
            </Label>
            <Textarea
              id='interactive-feedback'
              placeholder="Share your thoughts about the activity, what you enjoyed, what could be improved, and whether you'd recommend it to others..."
              rows={5}
              value={feedback}
              onChange={handleChange}
              className={
                wordCount > 0 && wordCount < 20
                  ? 'border-amber-300 focus-visible:border-amber-500 focus-visible:ring-amber-200'
                  : wordCount >= 20
                    ? 'border-green-300 focus-visible:border-green-500 focus-visible:ring-green-200'
                    : ''
              }
            />

            <div className='flex justify-between items-center mt-2'>
              <div className='flex items-center gap-4'>
                <p
                  className={`text-xs ${wordCount >= 20 ? 'text-green-600' : wordCount > 0 ? 'text-amber-600' : 'text-gray-500'}`}
                >
                  {wordCount} word{wordCount !== 1 ? 's' : ''}
                </p>
                <p className='text-xs text-gray-400'>{feedback.length} characters</p>
              </div>

              {wordCount >= 20 && (
                <p className='text-xs text-green-600'>✓ Good length for feedback</p>
              )}
              {wordCount > 0 && wordCount < 20 && (
                <p className='text-xs text-amber-600'>Consider adding more detail</p>
              )}
            </div>
          </div>

          {feedback && (
            <div className='mt-4 p-3 bg-gray-50 rounded-lg'>
              <h4 className='text-sm font-medium text-gray-700 mb-2'>Preview:</h4>
              <p className='text-sm text-gray-600'>{feedback}</p>
            </div>
          )}
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Interactive Features:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Real-time word and character counting</li>
            <li>• Dynamic validation feedback</li>
            <li>• Live preview of content</li>
            <li>• Visual indicators for quality thresholds</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  )
}
