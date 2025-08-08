import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'
import { Label } from '../label'
import { Button } from '../button'

const meta: Meta<typeof Textarea> = {
  title: 'Components/UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
    },
    className: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default textarea
 */
export const Default: Story = {
  render: args => <Textarea {...args} />,
  args: {
    placeholder: 'Type your message here...',
  },
}

/**
 * Textarea with label
 */
export const WithLabel: Story = {
  render: () => (
    <div className='space-y-2 w-96'>
      <Label htmlFor='message'>Message</Label>
      <Textarea id='message' placeholder='Enter your message...' />
    </div>
  ),
}

/**
 * Different sizes and configurations
 */
export const Sizes: Story = {
  render: () => (
    <div className='space-y-8 w-96'>
      <div className='space-y-2'>
        <Label htmlFor='small-textarea'>Small Textarea (3 rows)</Label>
        <Textarea
          id='small-textarea'
          placeholder='Small textarea...'
          rows={3}
          className='min-h-[80px]'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='medium-textarea'>Medium Textarea (5 rows)</Label>
        <Textarea
          id='medium-textarea'
          placeholder='Medium textarea...'
          rows={5}
          className='min-h-[120px]'
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='large-textarea'>Large Textarea (8 rows)</Label>
        <Textarea
          id='large-textarea'
          placeholder='Large textarea...'
          rows={8}
          className='min-h-[200px]'
        />
      </div>

      <div className='p-4 bg-green-50 rounded-lg border border-green-100'>
        <h4 className='font-semibold text-green-900 mb-2'>Size Guidelines:</h4>
        <ul className='text-sm text-green-800 space-y-1'>
          <li>• Small: Short comments, quick notes</li>
          <li>• Medium: Feedback, descriptions, short articles</li>
          <li>• Large: Long-form content, detailed responses</li>
        </ul>
      </div>
    </div>
  ),
}

/**
 * Textarea states
 */
export const States: Story = {
  render: () => (
    <div className='space-y-6 w-96'>
      <div className='space-y-2'>
        <Label htmlFor='normal-textarea'>Normal State</Label>
        <Textarea id='normal-textarea' placeholder='Normal textarea...' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='focused-textarea'>Focused State (click to focus)</Label>
        <Textarea id='focused-textarea' placeholder='Click to focus...' autoFocus />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='disabled-textarea' className='text-muted-foreground'>
          Disabled State
        </Label>
        <Textarea id='disabled-textarea' placeholder='Disabled textarea...' disabled />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='error-textarea' className='text-destructive'>
          Error State
        </Label>
        <Textarea
          id='error-textarea'
          placeholder='Textarea with error...'
          aria-invalid='true'
          className='border-destructive'
        />
        <p className='text-sm text-destructive'>This field is required</p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='readonly-textarea'>Read-only State</Label>
        <Textarea
          id='readonly-textarea'
          value='This is read-only content that cannot be edited by the user.'
          readOnly
          className='bg-muted'
        />
      </div>
    </div>
  ),
}

/**
 * Textarea with character count
 */
export const WithCharacterCount: Story = {
  render: () => {
    return (
      <div className='space-y-6 w-96'>
        <div className='space-y-2'>
          <Label htmlFor='tweet-textarea'>Tweet (280 characters max)</Label>
          <Textarea id='tweet-textarea' placeholder="What's happening?" maxLength={280} rows={3} />
          <div className='flex justify-between text-sm text-muted-foreground'>
            <span>Character limit: 280</span>
            <span>Remaining: 280</span>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='bio-textarea'>Bio (500 characters max)</Label>
          <Textarea
            id='bio-textarea'
            placeholder='Tell us about yourself...'
            maxLength={500}
            rows={4}
          />
          <div className='flex justify-between text-sm text-muted-foreground'>
            <span>Character limit: 500</span>
            <span>Remaining: 500</span>
          </div>
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Character Count Implementation:</h4>
          <p className='text-sm text-blue-800'>
            For dynamic character counting, you'll need to implement JavaScript to track the current
            length and update the display. The maxLength attribute provides browser-level
            validation.
          </p>
        </div>
      </div>
    )
  },
}

/**
 * Textarea in forms
 */
export const FormExamples: Story = {
  render: () => (
    <div className='space-y-8 w-96'>
      {/* Contact Form */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Contact Form</h3>
        <div className='space-y-4 p-6 border rounded-lg'>
          <div className='space-y-2'>
            <Label htmlFor='contact-name'>Name *</Label>
            <input
              id='contact-name'
              type='text'
              placeholder='Your name'
              className='w-full px-3 py-2 border border-input rounded-md'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='contact-email'>Email *</Label>
            <input
              id='contact-email'
              type='email'
              placeholder='your.email@example.com'
              className='w-full px-3 py-2 border border-input rounded-md'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='contact-subject'>Subject *</Label>
            <input
              id='contact-subject'
              type='text'
              placeholder='What is this about?'
              className='w-full px-3 py-2 border border-input rounded-md'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='contact-message'>Message *</Label>
            <Textarea
              id='contact-message'
              placeholder='Please describe your inquiry in detail...'
              rows={5}
              required
            />
          </div>

          <Button className='w-full'>Send Message</Button>
        </div>
      </div>

      {/* Feedback Form */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Feedback Form</h3>
        <div className='space-y-4 p-6 border rounded-lg'>
          <div className='space-y-2'>
            <Label htmlFor='feedback-rating'>How would you rate your experience?</Label>
            <select
              id='feedback-rating'
              className='w-full px-3 py-2 border border-input rounded-md'
            >
              <option value=''>Select a rating...</option>
              <option value='5'>⭐⭐⭐⭐⭐ Excellent</option>
              <option value='4'>⭐⭐⭐⭐ Good</option>
              <option value='3'>⭐⭐⭐ Average</option>
              <option value='2'>⭐⭐ Poor</option>
              <option value='1'>⭐ Very Poor</option>
            </select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='feedback-comments'>Comments (optional)</Label>
            <Textarea
              id='feedback-comments'
              placeholder='Share any additional thoughts or suggestions...'
              rows={4}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='feedback-improvements'>What could we improve? (optional)</Label>
            <Textarea
              id='feedback-improvements'
              placeholder='Tell us how we can make your experience better...'
              rows={3}
            />
          </div>

          <Button className='w-full'>Submit Feedback</Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Textarea with custom styling
 */
export const CustomStyling: Story = {
  render: () => (
    <div className='space-y-6 w-96'>
      <div className='space-y-2'>
        <Label htmlFor='custom-border'>Custom Border Color</Label>
        <Textarea
          id='custom-border'
          placeholder='Custom border textarea...'
          className='border-blue-500 focus-visible:border-blue-600'
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='custom-bg'>Custom Background</Label>
        <Textarea
          id='custom-bg'
          placeholder='Custom background textarea...'
          className='bg-slate-50'
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='rounded-lg'>Large Rounded Corners</Label>
        <Textarea
          id='rounded-lg'
          placeholder='Large rounded corners...'
          className='rounded-xl'
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='no-shadow'>No Shadow</Label>
        <Textarea
          id='no-shadow'
          placeholder='No shadow textarea...'
          className='shadow-none'
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='monospace'>Monospace Font (for code)</Label>
        <Textarea
          id='monospace'
          placeholder='function hello() {
  console.log("Hello, World!");
}'
          className='font-mono text-sm'
          rows={5}
        />
      </div>
    </div>
  ),
}

/**
 * Textarea with resize options
 */
export const ResizeOptions: Story = {
  render: () => (
    <div className='space-y-6 w-96'>
      <div className='space-y-2'>
        <Label htmlFor='resize-both'>Resize Both (default)</Label>
        <Textarea
          id='resize-both'
          placeholder='You can resize this textarea in both directions...'
          className='resize'
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='resize-vertical'>Resize Vertical Only</Label>
        <Textarea
          id='resize-vertical'
          placeholder='You can only resize this textarea vertically...'
          className='resize-y'
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='resize-horizontal'>Resize Horizontal Only</Label>
        <Textarea
          id='resize-horizontal'
          placeholder='You can only resize this textarea horizontally...'
          className='resize-x'
          rows={3}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='resize-none'>No Resize</Label>
        <Textarea
          id='resize-none'
          placeholder='This textarea cannot be resized...'
          className='resize-none'
          rows={3}
        />
      </div>

      <div className='p-4 bg-amber-50 rounded-lg border border-amber-100'>
        <h4 className='font-semibold text-amber-900 mb-2'>Resize Guidelines:</h4>
        <ul className='text-sm text-amber-800 space-y-1'>
          <li>• Default: Allow both horizontal and vertical resize</li>
          <li>• Vertical only: Good for constrained layouts</li>
          <li>• Horizontal only: Rare, usually not recommended</li>
          <li>• No resize: Use when layout must remain fixed</li>
        </ul>
      </div>
    </div>
  ),
}

/**
 * Textarea use cases
 */
export const UseCases: Story = {
  render: () => (
    <div className='space-y-8 w-96'>
      <div className='p-4 bg-slate-50 rounded-lg'>
        <h3 className='font-semibold mb-4'>Common Textarea Use Cases</h3>

        <div className='space-y-6'>
          {/* Comment Box */}
          <div className='space-y-2'>
            <Label htmlFor='comment-box' className='flex items-center gap-2'>
              💬 Comment Box
            </Label>
            <Textarea
              id='comment-box'
              placeholder='Add a comment...'
              rows={3}
              className='resize-none'
            />
            <div className='flex justify-between items-center'>
              <span className='text-xs text-muted-foreground'>Max 500 characters</span>
              <Button size='sm'>Post Comment</Button>
            </div>
          </div>

          {/* Code Editor */}
          <div className='space-y-2'>
            <Label htmlFor='code-editor' className='flex items-center gap-2'>
              💻 Code Editor
            </Label>
            <Textarea
              id='code-editor'
              placeholder='// Enter your code here...'
              className='font-mono text-sm bg-gray-900 text-gray-100 border-gray-700'
              rows={6}
            />
          </div>

          {/* Long-form Content */}
          <div className='space-y-2'>
            <Label htmlFor='article-content' className='flex items-center gap-2'>
              📝 Article Content
            </Label>
            <Textarea
              id='article-content'
              placeholder='Write your article content here...'
              rows={8}
            />
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>Auto-save enabled</span>
              <span>0 words</span>
            </div>
          </div>

          {/* Quick Note */}
          <div className='space-y-2'>
            <Label htmlFor='quick-note' className='flex items-center gap-2'>
              📄 Quick Note
            </Label>
            <Textarea
              id='quick-note'
              placeholder='Jot down a quick note...'
              rows={2}
              className='resize-none'
            />
          </div>
        </div>
      </div>
    </div>
  ),
}
