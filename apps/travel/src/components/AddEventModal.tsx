import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Textarea } from '@pops/ui'
import { useIsMobile } from '@/hooks/use-mobile'

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: EventFormData) => void | Promise<void>
  selectedDate?: Date | null
}

interface EventFormData {
  title: string
  description: string
  startDate: Date
  endDate?: Date
  startTime: string
  endTime?: string
  location?: string
  type: 'event' | 'accommodation' | 'transport' | 'activity'
  isAllDay: boolean
}

export function AddEventModal({ isOpen, onClose, onSubmit, selectedDate }: AddEventModalProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    startDate: selectedDate || new Date(),
    startTime: '09:00',
    location: '',
    type: 'event',
    isAllDay: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isMobile = useIsMobile()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form
      setFormData({
        title: '',
        description: '',
        startDate: selectedDate || new Date(),
        startTime: '09:00',
        location: '',
        type: 'event',
        isAllDay: false
      })
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
      // TODO: Show error toast
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const eventTypes = [
    { value: 'event', label: 'General Event', icon: '📅' },
    { value: 'accommodation', label: 'Accommodation', icon: '🏨' },
    { value: 'transport', label: 'Transport', icon: '✈️' },
    { value: 'activity', label: 'Activity', icon: '🎯' }
  ]

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      display: 'flex', 
      alignItems: isMobile ? 'flex-start' : 'center', 
      justifyContent: 'center', 
      zIndex: 50,
      padding: isMobile ? '0.5rem' : '1rem',
      paddingTop: isMobile ? '2rem' : '1rem'
    }}>
      <Card style={{ 
        width: '100%', 
        maxWidth: isMobile ? '100%' : '600px', 
        maxHeight: isMobile ? '95vh' : '90vh', 
        overflowY: 'auto',
        margin: isMobile ? '0' : 'auto'
      }}>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <CardTitle>Add Event</CardTitle>
              <CardDescription>
                {selectedDate 
                  ? `Create a new event for ${selectedDate.toLocaleDateString()}`
                  : 'Create a new event for your trip'
                }
              </CardDescription>
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={onClose}
              disabled={isSubmitting}
              style={{ 
                padding: isMobile ? '0.75rem' : '0.5rem',
                minHeight: isMobile ? '44px' : 'auto',
                minWidth: isMobile ? '44px' : 'auto'
              }}
            >
              <X style={{ width: isMobile ? '20px' : '16px', height: isMobile ? '20px' : '16px' }} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Event Title */}
            <div>
              <label 
                htmlFor='title'
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '0.5rem' 
                }}
              >
                Event Title
              </label>
              <Input
                id='title'
                type='text'
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Visit Eiffel Tower"
                disabled={isSubmitting}
                required
                style={{
                  minHeight: isMobile ? '44px' : 'auto',
                  fontSize: isMobile ? '16px' : '14px'
                }}
              />
            </div>

            {/* Event Type */}
            <div>
              <label 
                htmlFor='type'
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '0.5rem' 
                }}
              >
                Event Type
              </label>
              <select
                id='type'
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'event' | 'accommodation' | 'transport' | 'activity' }))}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: isMobile ? '0.75rem' : '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: isMobile ? '16px' : '0.875rem',
                  minHeight: isMobile ? '44px' : 'auto'
                }}
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
              gap: '1rem' 
            }}>
              <div>
                <label 
                  htmlFor='startDate'
                  style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}
                >
                  Date
                </label>
                <Input
                  id='startDate'
                  type='date'
                  value={formatDateForInput(formData.startDate)}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    startDate: new Date(e.target.value) 
                  }))}
                  disabled={isSubmitting}
                  required
                  style={{
                    minHeight: isMobile ? '44px' : 'auto',
                    fontSize: isMobile ? '16px' : '14px'
                  }}
                />
              </div>

              <div>
                <label 
                  htmlFor='startTime'
                  style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}
                >
                  Time
                </label>
                <Input
                  id='startTime'
                  type='time'
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  disabled={isSubmitting || formData.isAllDay}
                  style={{
                    minHeight: isMobile ? '44px' : 'auto',
                    fontSize: isMobile ? '16px' : '14px'
                  }}
                />
              </div>
            </div>

            {/* All Day Toggle */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: isMobile ? '0.5rem' : '0'
            }}>
              <input
                type='checkbox'
                id='isAllDay'
                checked={formData.isAllDay}
                onChange={(e) => setFormData(prev => ({ ...prev, isAllDay: e.target.checked }))}
                disabled={isSubmitting}
                style={{
                  width: isMobile ? '20px' : '16px',
                  height: isMobile ? '20px' : '16px',
                  cursor: 'pointer'
                }}
              />
              <label htmlFor='isAllDay' style={{ fontSize: '0.875rem', color: '#374151' }}>
                All day event
              </label>
            </div>

            {/* Location */}
            <div>
              <label 
                htmlFor='location'
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '0.5rem' 
                }}
              >
                Location (optional)
              </label>
              <Input
                id='location'
                type='text'
                value={formData.location || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Champ de Mars, Paris"
                disabled={isSubmitting}
                style={{
                  minHeight: isMobile ? '44px' : 'auto',
                  fontSize: isMobile ? '16px' : '14px'
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label 
                htmlFor='description'
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: '500', 
                  color: '#374151', 
                  marginBottom: '0.5rem' 
                }}
              >
                Description (optional)
              </label>
              <Textarea
                id='description'
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Add details about the event, meeting points, notes, etc."
                disabled={isSubmitting}
                rows={isMobile ? 4 : 3}
                style={{
                  fontSize: isMobile ? '16px' : '14px',
                  minHeight: isMobile ? '100px' : 'auto'
                }}
              />
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              gap: isMobile ? '0.75rem' : '0.5rem', 
              marginTop: '1rem',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <Button 
                type='button'
                variant='outline' 
                onClick={onClose}
                disabled={isSubmitting}
                style={{ 
                  flex: 1,
                  minHeight: isMobile ? '48px' : 'auto',
                  order: isMobile ? 2 : 1
                }}
              >
                Cancel
              </Button>
              <Button 
                type='submit'
                disabled={isSubmitting || !formData.title.trim()}
                style={{ 
                  flex: 1,
                  minHeight: isMobile ? '48px' : 'auto',
                  order: isMobile ? 1 : 2
                }}
              >
                {isSubmitting ? (
                  'Adding...'
                ) : (
                  <>
                    <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                    Add Event
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}