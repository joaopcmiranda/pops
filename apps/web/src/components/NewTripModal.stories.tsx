import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from './ui/button/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { TripFormBasicInfo } from './forms/TripFormBasicInfo'
import { TripFormDates } from './forms/TripFormDates'
import { TripFormDescription } from './forms/TripFormDescription'

// Mock NewTripModal component using smaller components
function MockNewTripModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    country: '',
    type: 'leisure',
    startDate: '',
    endDate: '',
    description: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    alert(`✈️ Trip Created: "${formData.title}" to ${formData.destination}`)
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Create New Trip</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <TripFormBasicInfo data={formData} onChange={handleChange} />

          <TripFormDates data={formData} onChange={handleChange} />

          <TripFormDescription data={formData} onChange={handleChange} />

          <div className='flex justify-end gap-3 pt-4'>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Trip'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const meta: Meta<typeof MockNewTripModal> = {
  title: 'Components/NewTripModal',
  component: MockNewTripModal,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const DefaultComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='p-8'>
      <Button onClick={() => setIsOpen(true)}>Open New Trip Modal</Button>
      <MockNewTripModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export const Default: Story = {
  render: () => <DefaultComponent />,
}

export const AlwaysOpen: Story = {
  render: () => (
    <div className='p-8'>
      <MockNewTripModal isOpen={true} onClose={() => alert('Modal closed')} />
    </div>
  ),
}

const WithPrefilledDataComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='p-8'>
      <Button onClick={() => setIsOpen(true)}>Open Prefilled Modal</Button>
      <MockNewTripModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export const WithPrefilledData: Story = {
  render: () => <WithPrefilledDataComponent />,
}

const InteractiveComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [tripCount, setTripCount] = useState(0)

  return (
    <div className='p-8 space-y-4'>
      <div className='text-center'>
        <h3 className='text-lg font-semibold mb-2'>Interactive Trip Creation</h3>
        <p className='text-gray-600'>Trips created: {tripCount}</p>
      </div>

      <Button onClick={() => setIsOpen(true)}>Create New Trip</Button>

      <MockNewTripModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setTripCount(prev => prev + 1)
        }}
      />
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
}
