import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Textarea,
} from '@pops/ui'

interface AddContentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ContentFormData) => void | Promise<void>
  category: string
  categoryName: string
}

interface ContentFormData {
  title: string
  content: string
  type?: string
  tags?: string[]
}

export function AddContentModal({
  isOpen,
  onClose,
  onSubmit,
  category,
  categoryName,
}: AddContentModalProps) {
  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    content: '',
    type: '',
    tags: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form
      setFormData({ title: '', content: '', type: '', tags: [] })
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
      // TODO: Show error toast
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPlaceholders = () => {
    switch (category) {
      case 'destinations':
        return {
          title: 'e.g., Paris, France',
          content: 'Describe the destination, what makes it special, best time to visit...',
        }
      case 'accommodation':
        return {
          title: 'e.g., Hotel Ritz Paris',
          content: 'Hotel details, amenities, location, booking information...',
        }
      case 'transport':
        return {
          title: 'e.g., Flight to Paris',
          content: 'Flight details, airline, times, confirmation numbers...',
        }
      case 'activities':
        return {
          title: 'e.g., Eiffel Tower Visit',
          content: 'Activity description, timings, booking details, what to expect...',
        }
      case 'budget':
        return {
          title: 'e.g., Accommodation Budget',
          content: 'Budget details, expected costs, actual expenses...',
        }
      case 'documents':
        return {
          title: 'e.g., Passport',
          content: 'Document details, expiry dates, location, important notes...',
        }
      default:
        return {
          title: `Enter ${categoryName.toLowerCase().slice(0, -1)} title...`,
          content: `Describe your ${categoryName.toLowerCase().slice(0, -1)}...`,
        }
    }
  }

  const placeholders = getPlaceholders()

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '1rem',
      }}
    >
      <Card style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <CardTitle>Add {categoryName.slice(0, -1)}</CardTitle>
              <CardDescription>
                Create a new {categoryName.toLowerCase().slice(0, -1)} for your trip
              </CardDescription>
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={onClose}
              disabled={isSubmitting}
              style={{ padding: '0.5rem' }}
            >
              <X style={{ width: '16px', height: '16px' }} />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label
                htmlFor='title'
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem',
                }}
              >
                Title
              </label>
              <Input
                id='title'
                type='text'
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={placeholders.title}
                disabled={isSubmitting}
                required
              />
            </div>

            <div>
              <label
                htmlFor='content'
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem',
                }}
              >
                Description
              </label>
              <Textarea
                id='content'
                value={formData.content}
                onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder={placeholders.content}
                disabled={isSubmitting}
                rows={6}
                required
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '0.5rem',
                marginTop: '1rem',
              }}
            >
              <Button
                type='button'
                variant='outline'
                onClick={onClose}
                disabled={isSubmitting}
                style={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
                style={{ flex: 1 }}
              >
                {isSubmitting ? (
                  'Adding...'
                ) : (
                  <>
                    <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                    Add {categoryName.slice(0, -1)}
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
