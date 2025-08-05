import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton, SkeletonCard, SkeletonStats, SkeletonContent } from './Skeleton'
import { Card, CardContent } from '../card'

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
    <div className='space-y-4'>
      <Skeleton className='h-4 w-[200px]' />
      <Skeleton className='h-4 w-[150px]' />
      <Skeleton className='h-4 w-[100px]' />
    </div>
  ),
}

export const AllSkeletonTypes: Story = {
  render: () => (
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
    </div>
  ),
}

export const LoadingStates: Story = {
  render: () => (
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
    </div>
  ),
}

export const ShapesAndSizes: Story = {
  render: () => (
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
    </div>
  ),
}
