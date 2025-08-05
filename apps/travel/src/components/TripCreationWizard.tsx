import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  FileText,
  Check,
  X,
} from 'lucide-react'
import { Button, Card, CardContent } from '@pops/ui'
import { trpc } from '@/utils/trpc'
import type { Trip } from '@/types/trip'

interface TripCreationWizardProps {
  onClose: () => void
  onTripCreated: (trip: Trip) => void
}

interface FormData {
  title: string
  destination: string
  country: string
  type: 'leisure' | 'business' | 'family' | 'adventure' | 'honeymoon' | 'solo' | 'group' | 'other'
  startDate: string
  endDate: string
  description: string
  budget: number
  currency: string
  travelers: number
}

const initialFormData: FormData = {
  title: '',
  destination: '',
  country: '',
  type: 'leisure',
  startDate: '',
  endDate: '',
  description: '',
  budget: 0,
  currency: 'USD',
  travelers: 1,
}

export function TripCreationWizard({ onClose, onTripCreated }: TripCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createTripMutation = trpc.trip.create.useMutation({
    onSuccess: data => {
      if (data?.data) {
        onTripCreated(data.data)
      }
    },
    onError: error => {
      console.error('Failed to create trip:', error)
    },
  })

  const steps = [
    { number: 1, title: 'Where', description: 'Choose your destination', icon: MapPin },
    { number: 2, title: 'When', description: 'Pick your dates', icon: Calendar },
    { number: 3, title: 'Who', description: 'Trip type & travelers', icon: Users },
    { number: 4, title: 'Details', description: 'Budget & more info', icon: FileText },
    { number: 5, title: 'Review', description: 'Confirm and create', icon: Check },
  ]

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await createTripMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        destination: formData.destination,
        country: formData.country,
        type: formData.type,
        startDate: formData.startDate,
        endDate: formData.endDate,
        budget: {
          total: formData.budget,
          currency: formData.currency,
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
          currency: formData.currency,
          notifications: {
            email: true,
            push: true,
            reminders: true,
          },
          privacy: 'private' as const,
        },
      })
    } catch (error) {
      console.error('Failed to create trip:', error)
    }
    setIsSubmitting(false)
  }

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.destination && formData.country
      case 2:
        return formData.startDate && formData.endDate
      case 3:
        return formData.type && formData.travelers > 0
      case 4:
        return true // Optional step
      case 5:
        return formData.title
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='space-y-12'>
            <div className='text-center'>
              <MapPin className='w-24 h-24 text-blue-500 mx-auto mb-6' />
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
                Where are you going?
              </h2>
              <p className='text-xl text-gray-600'>Tell us about your destination</p>
            </div>

            <div className='space-y-8 max-w-2xl mx-auto'>
              <div>
                <label className='block text-lg font-semibold text-gray-700 mb-3'>
                  Destination City *
                </label>
                <input
                  type='text'
                  value={formData.destination}
                  onChange={e => updateFormData('destination', e.target.value)}
                  placeholder='e.g., Paris, Tokyo, New York'
                  className='w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md'
                />
              </div>

              <div>
                <label className='block text-lg font-semibold text-gray-700 mb-3'>Country *</label>
                <input
                  type='text'
                  value={formData.country}
                  onChange={e => updateFormData('country', e.target.value)}
                  placeholder='e.g., France, Japan, USA'
                  className='w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md'
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className='space-y-12'>
            <div className='text-center'>
              <Calendar className='w-24 h-24 text-green-500 mx-auto mb-6' />
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
                When are you traveling?
              </h2>
              <p className='text-xl text-gray-600'>Choose your travel dates</p>
            </div>

            <div className='max-w-3xl mx-auto'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <label className='block text-lg font-semibold text-gray-700 mb-3'>
                    Start Date *
                  </label>
                  <input
                    type='date'
                    value={formData.startDate}
                    onChange={e => updateFormData('startDate', e.target.value)}
                    className='w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md'
                  />
                </div>

                <div>
                  <label className='block text-lg font-semibold text-gray-700 mb-3'>
                    End Date *
                  </label>
                  <input
                    type='date'
                    value={formData.endDate}
                    onChange={e => updateFormData('endDate', e.target.value)}
                    min={formData.startDate}
                    className='w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md'
                  />
                </div>
              </div>

              {formData.startDate && formData.endDate && (
                <div className='bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 text-center mt-8 border border-blue-100'>
                  <p className='text-lg font-semibold text-blue-800'>
                    Trip duration:{' '}
                    {Math.ceil(
                      (new Date(formData.endDate).getTime() -
                        new Date(formData.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{' '}
                    days
                  </p>
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className='space-y-12'>
            <div className='text-center'>
              <Users className='w-24 h-24 text-purple-500 mx-auto mb-6' />
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
                What type of trip?
              </h2>
              <p className='text-xl text-gray-600'>Help us personalize your experience</p>
            </div>

            <div className='space-y-10 max-w-4xl mx-auto'>
              <div>
                <label className='block text-lg font-semibold text-gray-700 mb-6'>
                  Trip Type *
                </label>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {[
                    { value: 'leisure', label: 'Leisure', emoji: '🏖️' },
                    { value: 'business', label: 'Business', emoji: '💼' },
                    { value: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
                    { value: 'adventure', label: 'Adventure', emoji: '🏔️' },
                    { value: 'honeymoon', label: 'Honeymoon', emoji: '💕' },
                    { value: 'solo', label: 'Solo', emoji: '🚶' },
                    { value: 'group', label: 'Group', emoji: '👥' },
                    { value: 'other', label: 'Other', emoji: '✨' },
                  ].map(type => (
                    <button
                      key={type.value}
                      onClick={() => updateFormData('type', type.value)}
                      className={`p-6 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-lg ${
                        formData.type === type.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className='text-3xl mb-2'>{type.emoji}</div>
                      <div className='font-semibold text-base'>{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className='max-w-md mx-auto'>
                <label className='block text-lg font-semibold text-gray-700 mb-3'>
                  Number of Travelers *
                </label>
                <input
                  type='number'
                  min='1'
                  max='20'
                  value={formData.travelers}
                  onChange={e => updateFormData('travelers', parseInt(e.target.value) || 1)}
                  className='w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md text-center font-semibold'
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className='space-y-6'>
            <div className='text-center mb-8'>
              <FileText className='w-16 h-16 text-orange-500 mx-auto mb-4' />
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>Additional Details</h2>
              <p className='text-gray-600'>Budget and trip information (optional)</p>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Trip Title</label>
                <input
                  type='text'
                  value={formData.title}
                  onChange={e => updateFormData('title', e.target.value)}
                  placeholder={`${formData.destination} ${formData.type === 'leisure' ? 'Vacation' : formData.type === 'business' ? 'Trip' : 'Adventure'}`}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => updateFormData('description', e.target.value)}
                  placeholder='Tell us about your trip plans...'
                  rows={3}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical'
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Budget</label>
                  <input
                    type='number'
                    min='0'
                    value={formData.budget}
                    onChange={e => updateFormData('budget', parseFloat(e.target.value) || 0)}
                    placeholder='0'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Currency</label>
                  <select
                    value={formData.currency}
                    onChange={e => updateFormData('currency', e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg'
                  >
                    <option value='USD'>USD ($)</option>
                    <option value='EUR'>EUR (€)</option>
                    <option value='GBP'>GBP (£)</option>
                    <option value='JPY'>JPY (¥)</option>
                    <option value='CAD'>CAD ($)</option>
                    <option value='AUD'>AUD ($)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className='space-y-6'>
            <div className='text-center mb-8'>
              <Check className='w-16 h-16 text-green-500 mx-auto mb-4' />
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>Review Your Trip</h2>
              <p className='text-gray-600'>Make sure everything looks good</p>
            </div>

            <Card>
              <CardContent className='p-6 space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Destination</h3>
                    <p className='text-gray-600'>
                      {formData.destination}, {formData.country}
                    </p>
                  </div>

                  <div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Dates</h3>
                    <p className='text-gray-600'>
                      {new Date(formData.startDate).toLocaleDateString()} -{' '}
                      {new Date(formData.endDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Trip Type</h3>
                    <p className='text-gray-600 capitalize'>{formData.type}</p>
                  </div>

                  <div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Travelers</h3>
                    <p className='text-gray-600'>
                      {formData.travelers} {formData.travelers === 1 ? 'person' : 'people'}
                    </p>
                  </div>
                </div>

                {formData.title && (
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Title</h3>
                    <p className='text-gray-600'>{formData.title}</p>
                  </div>
                )}

                {formData.description && (
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Description</h3>
                    <p className='text-gray-600'>{formData.description}</p>
                  </div>
                )}

                {formData.budget > 0 && (
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-2'>Budget</h3>
                    <p className='text-gray-600'>
                      {formData.currency} {formData.budget.toLocaleString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Trip Title *</label>
              <input
                type='text'
                value={formData.title}
                onChange={e => updateFormData('title', e.target.value)}
                placeholder={`${formData.destination} ${formData.type === 'leisure' ? 'Vacation' : formData.type === 'business' ? 'Trip' : 'Adventure'}`}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg'
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-6xl mx-auto px-6 py-6 flex items-center justify-between'>
          <div className='flex items-center space-x-6'>
            <Button
              variant='ghost'
              onClick={onClose}
              className='p-3 hover:bg-gray-100 transition-colors'
              aria-label='Close wizard'
            >
              <X className='w-6 h-6' />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 font-['Poppins']">Create New Trip</h1>
          </div>

          <div className='text-lg font-medium text-gray-600'>
            Step {currentStep} of {steps.length}
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className='bg-white border-b'>
        <div className='max-w-6xl mx-auto px-6 py-8'>
          <div className='flex items-center justify-between'>
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className='flex items-center'>
                  <div className='flex flex-col items-center'>
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center border-3 transition-all duration-200 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white shadow-lg'
                          : isActive
                            ? 'bg-blue-500 border-blue-500 text-white shadow-lg scale-110'
                            : 'border-gray-300 text-gray-400 bg-white'
                      }`}
                    >
                      {isCompleted ? <Check className='w-7 h-7' /> : <Icon className='w-7 h-7' />}
                    </div>
                    <div className='mt-4 text-center'>
                      <div
                        className={`text-lg font-semibold ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}
                      >
                        {step.title}
                      </div>
                      <div className='text-sm text-gray-500 hidden sm:block mt-1'>
                        {step.description}
                      </div>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-6 rounded-full transition-colors duration-300 ${
                        currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-4xl mx-auto px-6 py-12'>
        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
          <div className='p-12'>{renderStep()}</div>

          {/* Navigation Buttons */}
          <div className='bg-gray-50 px-12 py-8 border-t border-gray-100'>
            <div className='flex justify-between'>
              <Button
                variant='outline'
                onClick={handleBack}
                disabled={currentStep === 1}
                className='flex items-center space-x-3 px-8 py-4 text-lg font-medium border-2 hover:bg-gray-50 transition-all duration-200'
              >
                <ChevronLeft className='w-5 h-5' />
                <span>Back</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                className='flex items-center space-x-3 px-10 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl'
              >
                <span>
                  {currentStep === 5 ? (isSubmitting ? 'Creating...' : 'Create Trip') : 'Next'}
                </span>
                {currentStep < 5 && <ChevronRight className='w-5 h-5' />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
