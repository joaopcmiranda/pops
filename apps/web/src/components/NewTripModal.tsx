import { useState } from 'react'
import { X, MapPin, Calendar, Users, DollarSign } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { trpc } from '@/utils/trpc'

interface NewTripModalProps {
  isOpen: boolean
  onClose: () => void
  onTripCreated: (trip: any) => void
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
      }
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
    }
  })

  const createTripMutation = trpc.trip.create.useMutation({
    onSuccess: (trip) => {
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
          }
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
        }
      })
    },
    onError: (error) => {
      console.error('Failed to create trip:', error)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createTripMutation.mutate({
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    })
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <Card style={{ 
        width: '100%', 
        maxWidth: '600px', 
        maxHeight: '90vh', 
        overflow: 'auto',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        <CardContent style={{ padding: '2rem' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '2rem' 
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: '#0f172a',
              margin: 0
            }}>
              Create New Trip
            </h2>
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#64748b',
                cursor: 'pointer'
              }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: '#0f172a', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <MapPin style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
                Trip Details
              </h3>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    Trip Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g., Summer in Europe"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: '#374151', 
                      marginBottom: '0.5rem' 
                    }}>
                      Destination *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => handleChange('destination', e.target.value)}
                      placeholder="e.g., Paris"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: '#374151', 
                      marginBottom: '0.5rem' 
                    }}>
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      placeholder="e.g., France"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    Trip Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value="leisure">Leisure</option>
                    <option value="business">Business</option>
                    <option value="family">Family</option>
                    <option value="adventure">Adventure</option>
                    <option value="honeymoon">Honeymoon</option>
                    <option value="solo">Solo</option>
                    <option value="group">Group</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: '#0f172a', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Calendar style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
                Travel Dates
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    min={formData.startDate}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '0.5rem' 
              }}>
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Tell us about your trip plans..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Actions */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #e2e8f0'
            }}>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createTripMutation.isLoading}
              >
                {createTripMutation.isLoading ? 'Creating...' : 'Create Trip'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}