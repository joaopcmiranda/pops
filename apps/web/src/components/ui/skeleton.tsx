import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('skeleton rounded-md', className)} {...props} />
}

function SkeletonCard() {
  return (
    <div className='animate-scale-in'>
      <div className='p-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <Skeleton className='h-6 w-16 rounded-full' />
        </div>
        <div className='space-y-3'>
          <Skeleton className='h-6 w-3/4' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-2/3' />
        </div>
        <div className='flex gap-2'>
          <Skeleton className='h-9 flex-1' />
          <Skeleton className='h-9 flex-1' />
        </div>
      </div>
    </div>
  )
}

function SkeletonStats() {
  return (
    <div className='animate-fade-in'>
      <div className='p-6 space-y-3'>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-8 w-12' />
            <Skeleton className='h-3 w-16' />
          </div>
          <Skeleton className='h-12 w-12 rounded-xl' />
        </div>
      </div>
    </div>
  )
}

function SkeletonContent() {
  return (
    <div className='animate-fade-in-up space-y-6'>
      <div className='space-y-2'>
        <Skeleton className='h-8 w-1/3' />
        <Skeleton className='h-4 w-1/2' />
      </div>
      <div className='space-y-3'>
        <Skeleton className='h-6 w-1/4' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
      </div>
      <div className='space-y-3'>
        <Skeleton className='h-6 w-1/3' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-2/3' />
        </div>
      </div>
    </div>
  )
}

function SkeletonItineraryDay() {
  return (
    <div className='animate-fade-in-up space-y-4'>
      <div className='space-y-2'>
        <Skeleton className='h-7 w-48' />
        <Skeleton className='h-4 w-20' />
      </div>
      <div className='space-y-3'>
        {[1, 2, 3].map(i => (
          <div key={i} className='flex gap-3 p-4 border rounded-lg'>
            <Skeleton className='h-6 w-6 rounded-full flex-shrink-0 mt-1' />
            <div className='flex-1 space-y-2'>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-5 w-1/3' />
                <Skeleton className='h-4 w-16' />
              </div>
              <Skeleton className='h-4 w-full' />
              <div className='flex gap-2'>
                <Skeleton className='h-6 w-16 rounded-full' />
                <Skeleton className='h-6 w-20 rounded-full' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Skeleton, SkeletonCard, SkeletonStats, SkeletonContent, SkeletonItineraryDay }
