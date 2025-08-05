import { useState } from 'react'
import { MapPin, Calendar } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Button } from './ui/button/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { trpc } from '@/utils/trpc'
import { Alert, AlertDescription } from './ui/alert'

// Type interface for Trip
import type { Trip } from '@/types/trip'

interface NewTripModalProps {
  isOpen: boolean
  onClose: () => void
  onTripCreated: (trip: Trip) => void
}

export function NewTripModal({ isOpen, onClose, onTripCreated }: NewTripModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destination: '',
    country: '',
    type: 'leisure' as const,
    startDate: '',
    endDate: '',
    budget: {
      total: 0,
      currency: 'USD',
      categories: {
        accommodation: 0,
        transport: 0,
        activities: 0,
        food: 0,
        shopping: 0,
        other: 0,
      },
    },
    settings: {
      timezone: 'UTC',
      dateFormat: 'US' as const,
      currency: 'USD',
      notifications: {
        email: true,
        push: true,
        reminders: true,
      },
      privacy: 'private' as const,
    },
  })
  const [validationError, setValidationError] = useState<string | null>(null)

  const createTripMutation = trpc.trip.create.useMutation({
    onSuccess: trip => {
      onTripCreated(trip)
      onClose()
      // Reset form
      setFormData({
        title: '',
        description: '',
        destination: '',
        country: '',
        type: 'leisure',
        startDate: '',
        endDate: '',
        budget: {
          total: 0,
          currency: 'USD',
          categories: {
            accommodation: 0,
            transport: 0,
            activities: 0,
            food: 0,
            shopping: 0,
            other: 0,
          },
        },
        settings: {
          timezone: 'UTC',
          dateFormat: 'US',
          currency: 'USD',
          notifications: {
            email: true,
            push: true,
            reminders: true,
          },
          privacy: 'private',
        },
      })
      setValidationError(null)
    },
    onError: error => {
      setValidationError(error.message || 'Failed to create trip')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)

    // Basic validation
    if (!formData.title.trim()) {
      setValidationError('Please enter a trip title')
      return
    }
    if (!formData.destination.trim()) {
      setValidationError('Please enter a destination')
      return
    }
    if (!formData.startDate) {
      setValidationError('Please select a start date')
      return
    }
    if (!formData.endDate) {
      setValidationError('Please select an end date')
      return
    }
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setValidationError('End date must be after start date')
      return
    }

    createTripMutation.mutate(formData)
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Create New Trip</DialogTitle>
          <DialogDescription>
            Start planning your next adventure by filling in the basic details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6 mt-4'>
          {validationError && (
            <Alert variant='destructive'>
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}

          {/* Basic Info */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2 text-lg font-semibold'>
              <MapPin className='h-5 w-5' />
              Trip Details
            </div>

            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='title'>Trip Title *</Label>
                <Input
                  id='title'
                  value={formData.title}
                  onChange={e => handleChange('title', e.target.value)}
                  placeholder='Summer in Japan'
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  value={formData.description}
                  onChange={e => handleChange('description', e.target.value)}
                  placeholder='A two-week adventure exploring Tokyo, Kyoto, and Osaka...'
                  rows={3}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='destination'>Destination *</Label>
                  <Input
                    id='destination'
                    value={formData.destination}
                    onChange={e => handleChange('destination', e.target.value)}
                    placeholder='Tokyo'
                    required
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='country'>Country</Label>
                  <Input
                    id='country'
                    value={formData.country}
                    onChange={e => handleChange('country', e.target.value)}
                    placeholder='Japan'
                  />
                </div>
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='type'>Trip Type</Label>
                <Select value={formData.type} onValueChange={value => handleChange('type', value)}>
                  <SelectTrigger id='type'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='leisure'>Leisure</SelectItem>
                    <SelectItem value='business'>Business</SelectItem>
                    <SelectItem value='adventure'>Adventure</SelectItem>
                    <SelectItem value='cultural'>Cultural</SelectItem>
                    <SelectItem value='family'>Family</SelectItem>
                    <SelectItem value='honeymoon'>Honeymoon</SelectItem>
                    <SelectItem value='backpacking'>Backpacking</SelectItem>
                    <SelectItem value='roadtrip'>Road Trip</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2 text-lg font-semibold'>
              <Calendar className='h-5 w-5' />
              Travel Dates
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='startDate'>Start Date *</Label>
                <Input
                  id='startDate'
                  type='date'
                  value={formData.startDate}
                  onChange={e => handleChange('startDate', e.target.value)}
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='endDate'>End Date *</Label>
                <Input
                  id='endDate'
                  type='date'
                  value={formData.endDate}
                  onChange={e => handleChange('endDate', e.target.value)}
                  min={formData.startDate}
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-3 pt-4'>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' disabled={createTripMutation.isLoading}>
              {createTripMutation.isLoading ? 'Creating...' : 'Create Trip'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
