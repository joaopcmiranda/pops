/**
 * @fileoverview Dashboard Component for POps Hub
 *
 * The main dashboard that displays widgets with information from all POps
 * applications. Supports customizable layout and real-time updates.
 */

import { useState, useCallback } from 'react'
import { Responsive, WidthProvider, Layout } from 'react-grid-layout'
import { Plus, Grid, Settings, RotateCcw } from 'lucide-react'
import { Button } from '@pops/ui'
import {
  TravelSummaryWidget,
  WidgetContainer,
  type WidgetConfig,
  type WidgetData,
} from '@pops/widgets'
// import { useAppSuite } from '@pops/navigation' // TODO: Use for widget health status
import { QuickStats } from './QuickStats'
import { WidgetGallery } from './WidgetGallery'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

// Make ResponsiveGridLayout responsive
const ResponsiveGridLayout = WidthProvider(Responsive)

/**
 * Dashboard props interface
 */
interface DashboardProps {
  onShowApps: () => void
}

/**
 * Default widget configuration
 */
const defaultWidgets: WidgetConfig[] = [
  {
    id: 'travel-summary',
    type: 'travel-summary',
    title: 'Travel Summary',
    size: { w: 4, h: 3 },
    position: { x: 0, y: 0 },
    removable: true,
    app: 'travel' as const,
    refreshInterval: 300000, // 5 minutes
  },
  {
    id: 'quick-actions',
    type: 'quick-actions',
    title: 'Quick Actions',
    size: { w: 4, h: 2 },
    position: { x: 4, y: 0 },
    removable: true,
  },
  {
    id: 'recent-activity',
    type: 'recent-activity',
    title: 'Recent Activity',
    size: { w: 4, h: 4 },
    position: { x: 8, y: 0 },
    removable: true,
  },
]

/**
 * Convert widget config to grid layout
 */
function widgetConfigToLayout(widgets: WidgetConfig[]): Layout[] {
  return widgets.map(widget => ({
    i: widget.id,
    x: widget.position?.x || 0,
    y: widget.position?.y || 0,
    w: widget.size.w,
    h: widget.size.h,
    minW: widget.size.minW,
    minH: widget.size.minH,
    maxW: widget.size.maxW,
    maxH: widget.size.maxH,
  }))
}

/**
 * Dashboard Component
 *
 * Main dashboard interface displaying customizable widgets with data
 * from all POps applications.
 *
 * @param props - Component props
 * @returns JSX element
 */
export function Dashboard({ onShowApps }: DashboardProps) {
  // const { appStatuses } = useAppSuite() // TODO: Use for widget health status
  const [widgets, setWidgets] = useState(defaultWidgets)
  const [layouts, setLayouts] = useState<Record<string, Layout[]>>({
    lg: widgetConfigToLayout(defaultWidgets),
  })
  const [editMode, setEditMode] = useState(false)
  const [showGallery, setShowGallery] = useState(false)

  /**
   * Handle layout changes
   */
  const handleLayoutChange = useCallback((layout: Layout[], layouts: Record<string, Layout[]>) => {
    setLayouts(layouts)

    // Update widget positions
    setWidgets(prevWidgets =>
      prevWidgets.map(widget => {
        const layoutItem = layout.find(item => item.i === widget.id)
        if (layoutItem) {
          return {
            ...widget,
            position: { x: layoutItem.x, y: layoutItem.y },
            size: {
              ...widget.size,
              w: layoutItem.w,
              h: layoutItem.h,
            },
          }
        }
        return widget
      })
    )
  }, [])

  /**
   * Add new widget
   */
  const handleAddWidget = useCallback((widgetConfig: WidgetConfig) => {
    const newWidget: WidgetConfig = {
      ...widgetConfig,
      id: `widget-${Date.now()}`,
      position: { x: 0, y: 0 },
      removable: true,
    }

    setWidgets(prev => [...prev, newWidget])
    setLayouts(prev => ({
      ...prev,
      lg: [
        ...prev.lg,
        {
          i: newWidget.id,
          x: 0,
          y: 0,
          w: newWidget.size.w,
          h: newWidget.size.h,
        },
      ],
    }))
    setShowGallery(false)
  }, [])

  /**
   * Remove widget
   */
  const handleRemoveWidget = useCallback((widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId))
    setLayouts(prev => ({
      ...prev,
      lg: prev.lg.filter(item => item.i !== widgetId),
    }))
  }, [])

  /**
   * Reset to default layout
   */
  const handleResetLayout = useCallback(() => {
    setWidgets(defaultWidgets)
    setLayouts({ lg: widgetConfigToLayout(defaultWidgets) })
    setEditMode(false)
  }, [])

  /**
   * Render widget content
   */
  const renderWidget = useCallback(
    (widget: WidgetConfig) => {
      const commonProps = {
        config: widget,
        onRemove: () => handleRemoveWidget(widget.id),
        editMode,
      }

      switch (widget.type) {
        case 'travel-summary': {
          const mockData: WidgetData = {
            data: {
              nextTrip: { destination: 'Paris', date: '2024-03-15' },
              totalTrips: 12,
              upcomingTrips: 3,
            },
            loading: false,
            error: null,
            lastUpdate: new Date().toISOString(),
            stale: false,
          }
          return <TravelSummaryWidget {...commonProps} data={mockData} />
        }

        case 'quick-actions':
          return (
            <WidgetContainer
              title='Quick Actions'
              icon={<Grid className='h-4 w-4 text-purple-500' />}
              size={widget.size?.w === 2 ? 'small' : 'medium'}
            >
              <div className='grid grid-cols-2 gap-3'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={onShowApps}
                  className='flex flex-col items-center gap-1 h-auto py-3'
                >
                  <Grid className='h-5 w-5' />
                  <span className='text-xs'>Apps</span>
                </Button>

                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => window.open('https://travel.mypops.io/trips/new', '_blank')}
                  className='flex flex-col items-center gap-1 h-auto py-3'
                >
                  <Plus className='h-5 w-5' />
                  <span className='text-xs'>Trip</span>
                </Button>
              </div>
            </WidgetContainer>
          )

        case 'recent-activity':
          return (
            <WidgetContainer
              title='Recent Activity'
              refreshable={true}
              size={widget.size?.h > 2 ? 'large' : 'medium'}
            >
              <div className='space-y-3'>
                <div className='text-sm text-gray-500 dark:text-gray-400 text-center py-8'>
                  Activity feed will be implemented when other apps are created
                </div>
              </div>
            </WidgetContainer>
          )

        default:
          return (
            <WidgetContainer title='Unknown Widget'>
              <div className='flex items-center justify-center h-full text-gray-400'>
                Unknown widget type: {widget.type}
              </div>
            </WidgetContainer>
          )
      }
    },
    [editMode, onShowApps, handleRemoveWidget]
  )

  return (
    <div className='dashboard-grid'>
      {/* Quick Stats */}
      <QuickStats className='mb-6' />

      {/* Dashboard Controls */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Dashboard</h2>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setShowGallery(true)}
            disabled={editMode}
          >
            <Plus className='h-4 w-4 mr-1' />
            Add Widget
          </Button>

          <Button variant='outline' size='sm' onClick={() => setEditMode(!editMode)}>
            <Settings className='h-4 w-4 mr-1' />
            {editMode ? 'Done' : 'Edit'}
          </Button>

          {editMode && (
            <Button variant='outline' size='sm' onClick={handleResetLayout}>
              <RotateCcw className='h-4 w-4 mr-1' />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Widget Grid */}
      <div className='widget-grid'>
        <ResponsiveGridLayout
          className='layout'
          layouts={layouts}
          onLayoutChange={handleLayoutChange}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={60}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          isDraggable={editMode}
          isResizable={editMode}
          resizeHandles={['se']}
          compactType='vertical'
          preventCollision={false}
        >
          {widgets.map(widget => (
            <div key={widget.id} className='widget-item'>
              {renderWidget(widget)}
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>

      {/* Widget Gallery Modal */}
      {showGallery && (
        <WidgetGallery onAddWidget={handleAddWidget} onClose={() => setShowGallery(false)} />
      )}
    </div>
  )
}
