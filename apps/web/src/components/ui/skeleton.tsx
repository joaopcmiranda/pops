import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className='flex flex-col space-y-3'>
      <Skeleton className='h-[125px] w-[250px] rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  )
}

export function SkeletonStats() {
  return (
    <div className='flex space-x-4'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[100px]' />
        <Skeleton className='h-4 w-[80px]' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[100px]' />
        <Skeleton className='h-4 w-[80px]' />
      </div>
    </div>
  )
}

export function SkeletonContent() {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-6 w-[300px]' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-[80%]' />
    </div>
  )
}

export function SkeletonItineraryDay() {
  return (
    <div className='space-y-3 p-4 border rounded-lg'>
      <Skeleton className='h-5 w-[150px]' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-[90%]' />
        <Skeleton className='h-4 w-[70%]' />
      </div>
    </div>
  )
}
