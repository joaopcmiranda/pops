import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default card with all sections
 */
export const Default: Story = {
  render: () => (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a card description that provides additional context about the card content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This is the main content area of the card. You can put any content here, such as text,
          forms, images, or other components.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
        <Button variant='outline'>Cancel</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Card with action button in header
 */
export const WithHeaderAction: Story = {
  render: () => (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences.</CardDescription>
        <CardAction>
          <Button variant='ghost' size='sm'>
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>Email notifications</span>
            <span className='text-sm text-muted-foreground'>Enabled</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>Two-factor authentication</span>
            <span className='text-sm text-muted-foreground'>Disabled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * Simple card with just title and content
 */
export const Simple: Story = {
  render: () => (
    <Card className='w-80'>
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a simple card with just a title and content, no description or footer.</p>
      </CardContent>
    </Card>
  ),
}

/**
 * Content-only card without header or footer
 */
export const ContentOnly: Story = {
  render: () => (
    <Card className='w-80'>
      <CardContent>
        <div className='text-center py-8'>
          <h3 className='text-lg font-semibold mb-2'>No Header Card</h3>
          <p className='text-muted-foreground'>
            This card contains only content without a separate header or footer section.
          </p>
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * Card with long content to show overflow handling
 */
export const WithLongContent: Story = {
  render: () => (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Article Preview</CardTitle>
        <CardDescription>A sample article with extensive content</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='mb-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className='mb-4'>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Card with form elements
 */
export const WithForm: Story = {
  render: () => (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium mb-1'>
              Email
            </label>
            <input
              id='email'
              type='email'
              placeholder='Enter your email'
              className='w-full px-3 py-2 border border-input rounded-md'
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium mb-1'>
              Password
            </label>
            <input
              id='password'
              type='password'
              placeholder='Enter your password'
              className='w-full px-3 py-2 border border-input rounded-md'
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Sign In</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Cards in different sizes
 */
export const DifferentSizes: Story = {
  render: () => (
    <div className='space-y-8'>
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Small Card</h3>
        <Card className='w-64'>
          <CardHeader>
            <CardTitle className='text-base'>Compact</CardTitle>
            <CardDescription>Small card for limited space</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm'>Minimal content for a compact layout.</p>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Medium Card</h3>
        <Card className='w-96'>
          <CardHeader>
            <CardTitle>Standard Size</CardTitle>
            <CardDescription>Default card size for most use cases</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This is the standard card size that works well for most content types and layouts.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>
      </div>

      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Large Card</h3>
        <Card className='w-[500px]'>
          <CardHeader>
            <CardTitle className='text-xl'>Large Format</CardTitle>
            <CardDescription>
              Expanded card for detailed content and complex layouts with more information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='mb-4'>
              This large card format provides more space for detailed content, multiple sections,
              and complex layouts. It's ideal for dashboards, detailed forms, or comprehensive
              information displays.
            </p>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <h4 className='font-medium mb-2'>Left Column</h4>
                <p className='text-sm text-muted-foreground'>Additional content area</p>
              </div>
              <div>
                <h4 className='font-medium mb-2'>Right Column</h4>
                <p className='text-sm text-muted-foreground'>More information here</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Primary Action</Button>
            <Button variant='outline'>Secondary</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
}

/**
 * Interactive card example
 */
export const Interactive: Story = {
  render: () => (
    <Card className='w-80 cursor-pointer transition-shadow hover:shadow-md'>
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Click anywhere on this card</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This card has hover effects and can be clicked. It demonstrates how cards can be used as
          interactive elements.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant='ghost' size='sm'>
          Learn More →
        </Button>
      </CardFooter>
    </Card>
  ),
}
