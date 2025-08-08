/**
 * @fileoverview Widget Gallery Component
 *
 * Modal component for selecting and adding new widgets to the dashboard.
 */

import { X, Plus } from 'lucide-react'
import { Button, Card, CardContent } from '@pops/ui'
import type { WidgetConfig } from '@pops/widgets'

interface WidgetGalleryProps {
  onAddWidget: (widgetConfig: WidgetConfig) => void
  onClose: () => void
}

const availableWidgets: (WidgetConfig & {
  name: string
  description: string
  icon: string
  category: string
})[] = [
  {
    id: 'template-travel-summary',
    type: 'travel-summary',
    name: 'Travel Summary',
    description: 'Overview of trips and travel statistics',
    category: 'travel',
    size: { w: 4, h: 3 },
    icon: '✈️',
  },
  {
    id: 'template-quick-actions',
    type: 'quick-actions',
    name: 'Quick Actions',
    description: 'Shortcuts to common tasks',
    category: 'utility',
    size: { w: 4, h: 2 },
    icon: '⚡',
  },
  {
    id: 'template-recent-activity',
    type: 'recent-activity',
    name: 'Recent Activity',
    description: 'Latest updates across all apps',
    category: 'activity',
    size: { w: 4, h: 4 },
    icon: '📊',
  },
]

export function WidgetGallery({ onAddWidget, onClose }: WidgetGalleryProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Add Widget</h2>
            <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
              Choose a widget to add to your dashboard
            </p>
          </div>
          <Button variant='ghost' size='sm' onClick={onClose}>
            <X className='h-4 w-4' />
          </Button>
        </div>

        {/* Widget Grid */}
        <div className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {availableWidgets.map(widget => (
              <Card
                key={widget.type}
                className='cursor-pointer hover:shadow-md transition-shadow'
                onClick={() =>
                  onAddWidget({
                    id: widget.id,
                    type: widget.type,
                    title: widget.name,
                    size: widget.size,
                  })
                }
              >
                <CardContent className='p-4'>
                  <div className='flex items-start gap-3 mb-3'>
                    <div className='text-2xl'>{widget.icon}</div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-medium text-gray-900 dark:text-gray-100 mb-1'>
                        {widget.name}
                      </h3>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {widget.description}
                      </p>
                    </div>
                    <Plus className='h-4 w-4 text-gray-400' />
                  </div>

                  <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
                    <span className='capitalize'>{widget.category}</span>
                    <span>
                      {widget.size.w}×{widget.size.h}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
