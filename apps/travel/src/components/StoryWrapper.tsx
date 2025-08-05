import React from 'react'

interface StoryWrapperProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'app-frame' | 'modal-frame' | 'mobile-frame'
  background?:
    | 'default'
    | 'gradient-blue'
    | 'gradient-purple'
    | 'gradient-green'
    | 'gradient-orange'
    | 'gradient-pink'
}

const backgrounds = {
  default: 'bg-slate-50',
  'gradient-blue': 'bg-gradient-to-br from-slate-50 to-blue-50',
  'gradient-purple': 'bg-gradient-to-br from-purple-50 to-pink-50',
  'gradient-green': 'bg-gradient-to-br from-green-50 to-emerald-50',
  'gradient-orange': 'bg-gradient-to-br from-yellow-50 to-orange-50',
  'gradient-pink': 'bg-gradient-to-br from-rose-50 to-pink-50',
}

export function StoryWrapper({
  title,
  description,
  children,
  className = '',
  variant = 'default',
  background = 'default',
}: StoryWrapperProps) {
  if (variant === 'app-frame') {
    // Full app layout frame
    return (
      <div className={`${backgrounds[background]} min-h-screen p-6`}>
        <div className='max-w-6xl mx-auto'>
          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='bg-gray-50 border-b px-6 py-4'>
              <h2 className="text-2xl font-bold text-gray-900 font-['Poppins']">{title}</h2>
              {description && <p className='text-gray-600 mt-1'>{description}</p>}
            </div>
            <div className='p-0'>
              <div className='w-full h-full'>{children}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'modal-frame') {
    // Modal demonstration frame
    return (
      <div
        className={`${backgrounds[background]} min-h-screen p-6 flex items-center justify-center`}
      >
        <div className='w-full max-w-2xl'>
          <div className='text-center mb-8'>
            <h2 className="text-2xl font-bold text-gray-900 font-['Poppins']">{title}</h2>
            {description && <p className='text-gray-600 mt-2'>{description}</p>}
          </div>
          <div className='relative'>{children}</div>
        </div>
      </div>
    )
  }

  if (variant === 'mobile-frame') {
    // Mobile device frame
    return (
      <div
        className={`${backgrounds[background]} min-h-screen p-6 flex items-center justify-center`}
      >
        <div className='w-full max-w-md'>
          <div className='text-center mb-8'>
            <h2 className="text-2xl font-bold text-gray-900 font-['Poppins']">{title}</h2>
            {description && <p className='text-gray-600 mt-2'>{description}</p>}
          </div>
          <div className='max-w-sm mx-auto'>
            <div className='bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200'>
              {/* Mobile frame decoration */}
              <div className='bg-gray-900 h-6 flex items-center justify-center'>
                <div className='w-12 h-1 bg-gray-600 rounded-full'></div>
              </div>
              <div className='relative'>{children}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default frame
  return (
    <div className={`${backgrounds[background]} min-h-screen p-6 ${className}`}>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
          <div className='bg-gray-50 border-b px-6 py-4'>
            <h2 className="text-2xl font-bold text-gray-900 font-['Poppins']">{title}</h2>
            {description && <p className='text-gray-600 mt-1'>{description}</p>}
          </div>
          <div className='p-6'>{children}</div>
        </div>
      </div>
    </div>
  )
}

// Convenience wrapper for app layout stories
export function AppLayoutStory({
  title,
  description,
  children,
  background = 'gradient-blue',
}: Omit<StoryWrapperProps, 'variant'>) {
  return (
    <StoryWrapper
      title={title}
      description={description}
      variant='app-frame'
      background={background}
    >
      {children}
    </StoryWrapper>
  )
}

// Convenience wrapper for component stories
export function ComponentStory({
  title,
  description,
  children,
  background = 'gradient-blue',
}: Omit<StoryWrapperProps, 'variant'>) {
  return (
    <StoryWrapper title={title} description={description} variant='default' background={background}>
      {children}
    </StoryWrapper>
  )
}

// Convenience wrapper for modal stories
export function ModalStory({
  title,
  description,
  children,
  background = 'gradient-purple',
}: Omit<StoryWrapperProps, 'variant'>) {
  return (
    <StoryWrapper
      title={title}
      description={description}
      variant='modal-frame'
      background={background}
    >
      {children}
    </StoryWrapper>
  )
}

// Convenience wrapper for mobile stories
export function MobileStory({
  title,
  description,
  children,
  background = 'gradient-green',
}: Omit<StoryWrapperProps, 'variant'>) {
  return (
    <StoryWrapper
      title={title}
      description={description}
      variant='mobile-frame'
      background={background}
    >
      {children}
    </StoryWrapper>
  )
}
