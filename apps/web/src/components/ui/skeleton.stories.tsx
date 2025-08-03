import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Skeleton,
  SkeletonCard,
  SkeletonStats,
  SkeletonContent,
  SkeletonItineraryDay,
} from './skeleton'
import { Card, CardContent } from './card'
import { ComponentStory } from '../StoryWrapper'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ComponentStory
      title='Skeleton - Basic Lines'
      description='Simple skeleton loading lines of different widths'
      background='gradient-blue'
    >
      <div className='space-y-4'>
        <Skeleton className='h-4 w-[200px]' />
        <Skeleton className='h-4 w-[150px]' />
        <Skeleton className='h-4 w-[100px]' />
      </div>
    </ComponentStory>
  ),
}
export const AllSkeletonTypes: Story = {
  render: () => (
    <ComponentStory
      title='Skeleton - All Component Types'
      description='Complete showcase of all skeleton variants for different content types'
      background='gradient-green'
    >
      <div className='space-y-8'>
        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Basic Skeleton</h3>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
            <Skeleton className='h-4 w-[150px]' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Skeleton Card</h3>
          <Card className='max-w-sm'>
            <SkeletonCard />
          </Card>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Skeleton Stats</h3>
          <Card className='max-w-sm'>
            <SkeletonStats />
          </Card>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Skeleton Content</h3>
          <Card className='max-w-lg'>
            <CardContent className='p-6'>
              <SkeletonContent />
            </CardContent>
          </Card>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Skeleton Itinerary Day</h3>
          <Card className='max-w-2xl'>
            <CardContent className='p-6'>
              <SkeletonItineraryDay />
            </CardContent>
          </Card>
        </div>

        <div className='p-4 bg-green-50 rounded-lg border border-green-100'>
          <h4 className='font-semibold text-green-900 mb-2'>Skeleton Usage:</h4>
          <ul className='text-sm text-green-800 space-y-1'>
            <li>• Use during data loading to maintain layout</li>
            <li>• Match skeleton shape to actual content structure</li>
            <li>• Provide visual feedback during async operations</li>
            <li>• Improve perceived performance with smooth transitions</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const LoadingStates: Story = {
  render: () => (
    <ComponentStory
      title='Skeleton - Loading States'
      description='Grid layouts showing skeleton states for dashboard and statistics'
      background='gradient-purple'
    >
      <div className='space-y-8'>
        <div>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Loading Dashboard</h3>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className='w-[200px]'>
                <SkeletonCard />
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Loading Stats</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {[1, 2, 3].map(i => (
              <Card key={i} className='w-[250px]'>
                <SkeletonStats />
              </Card>
            ))}
          </div>
        </div>

        <div className='p-4 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-2'>Grid Loading Patterns:</h4>
          <ul className='text-sm text-purple-800 space-y-1'>
            <li>• Consistent skeleton sizing maintains grid structure</li>
            <li>• Multiple items simulate realistic loading scenarios</li>
            <li>• Different skeleton types for different content areas</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const ShapesAndSizes: Story = {
  render: () => (
    <ComponentStory
      title='Skeleton - Shapes & Sizes'
      description='Different skeleton shapes and sizes for various UI elements'
      background='gradient-orange'
    >
      <div className='space-y-8'>
        <div>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Different Shapes</h3>
          <div className='flex gap-4 items-center flex-wrap'>
            <div className='text-center'>
              <Skeleton className='h-12 w-12 rounded-full mx-auto mb-2' />
              <span className='text-xs text-gray-600'>Avatar</span>
            </div>
            <div className='text-center'>
              <Skeleton className='h-12 w-12 rounded-lg mx-auto mb-2' />
              <span className='text-xs text-gray-600'>Icon</span>
            </div>
            <div className='text-center'>
              <Skeleton className='h-12 w-12 mx-auto mb-2' />
              <span className='text-xs text-gray-600'>Square</span>
            </div>
            <div className='text-center'>
              <Skeleton className='h-6 w-32 rounded-full mx-auto mb-2' />
              <span className='text-xs text-gray-600'>Pill</span>
            </div>
            <div className='text-center'>
              <Skeleton className='h-4 w-48 mx-auto mb-2' />
              <span className='text-xs text-gray-600'>Line</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-4 text-gray-800'>Different Sizes</h3>
          <div className='space-y-3'>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-2 w-full' />
              <span className='text-xs text-gray-600 whitespace-nowrap'>Thin (h-2)</span>
            </div>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-4 w-3/4' />
              <span className='text-xs text-gray-600 whitespace-nowrap'>Small (h-4)</span>
            </div>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-6 w-1/2' />
              <span className='text-xs text-gray-600 whitespace-nowrap'>Medium (h-6)</span>
            </div>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-8 w-1/3' />
              <span className='text-xs text-gray-600 whitespace-nowrap'>Large (h-8)</span>
            </div>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-12 w-1/4' />
              <span className='text-xs text-gray-600 whitespace-nowrap'>XL (h-12)</span>
            </div>
          </div>
        </div>

        <div className='p-4 bg-orange-50 rounded-lg border border-orange-100'>
          <h4 className='font-semibold text-orange-900 mb-2'>Shape Guidelines:</h4>
          <ul className='text-sm text-orange-800 space-y-1'>
            <li>
              • <strong>Circular:</strong> User avatars, profile pictures
            </li>
            <li>
              • <strong>Rounded:</strong> Icons, buttons, small cards
            </li>
            <li>
              • <strong>Rectangular:</strong> Text content, paragraphs
            </li>
            <li>
              • <strong>Pills:</strong> Tags, badges, status indicators
            </li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
