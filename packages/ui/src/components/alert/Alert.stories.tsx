import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertTitle, AlertDescription } from './Alert'
import {
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  MapPin,
  Calendar,
  DollarSign,
} from 'lucide-react'

const meta: Meta<typeof Alert> = {
  title: 'Components/UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertDescription>This is a default alert.</AlertDescription>
    </Alert>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className='space-y-6 max-w-2xl'>
      <div className='space-y-4'>
        <Alert>
          <Info className='h-4 w-4' />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Your trip to Paris has been successfully saved to your itinerary.
          </AlertDescription>
        </Alert>

        <Alert variant='destructive'>
          <XCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Unable to book accommodation. Please check your payment details and try again.
          </AlertDescription>
        </Alert>
      </div>

      <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
        <h4 className='font-semibold text-blue-900 mb-2'>Variant Guidelines:</h4>
        <ul className='text-sm text-blue-800 space-y-1'>
          <li>
            • <strong>Default:</strong> General information, confirmations, neutral messages
          </li>
          <li>
            • <strong>Destructive:</strong> Errors, warnings, critical issues requiring attention
          </li>
        </ul>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className='space-y-4 max-w-2xl'>
      <Alert>
        <CheckCircle className='h-4 w-4' />
        <AlertTitle>Trip Confirmed</AlertTitle>
        <AlertDescription>
          Your 7-day European adventure has been confirmed. Check your email for booking details.
        </AlertDescription>
      </Alert>

      <Alert>
        <MapPin className='h-4 w-4' />
        <AlertTitle>New Destination Added</AlertTitle>
        <AlertDescription>
          Barcelona has been added to your itinerary. Don't forget to check visa requirements.
        </AlertDescription>
      </Alert>

      <Alert>
        <Calendar className='h-4 w-4' />
        <AlertTitle>Schedule Update</AlertTitle>
        <AlertDescription>
          Your flight departure time has been moved to 2:30 PM. Please arrive at the airport 2 hours
          early.
        </AlertDescription>
      </Alert>

      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Budget Alert</AlertTitle>
        <AlertDescription>
          You've exceeded your daily budget by $45. Consider adjusting your spending for upcoming
          days.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

export const TripOrganizationExamples: Story = {
  render: () => (
    <div className='space-y-4 max-w-2xl'>
      <Alert>
        <CheckCircle className='h-4 w-4' />
        <AlertTitle>Accommodation Booked</AlertTitle>
        <AlertDescription>
          Hotel Cosmos in Prague has been booked for 3 nights (June 15-18). Confirmation number:
          #HTC789456
        </AlertDescription>
      </Alert>

      <Alert>
        <Info className='h-4 w-4' />
        <AlertTitle>Weather Update</AlertTitle>
        <AlertDescription>
          Expect rain in Amsterdam this weekend. Pack an umbrella and consider indoor activities
          like visiting the Van Gogh Museum.
        </AlertDescription>
      </Alert>

      <Alert variant='destructive'>
        <XCircle className='h-4 w-4' />
        <AlertTitle>Flight Cancelled</AlertTitle>
        <AlertDescription>
          Your flight BA456 on March 20th has been cancelled. We've automatically rebooked you on
          the next available flight departing 4 hours later.
        </AlertDescription>
      </Alert>

      <Alert>
        <DollarSign className='h-4 w-4' />
        <AlertTitle>Budget Tracking</AlertTitle>
        <AlertDescription>
          You've spent $280 of your $500 daily budget. You have $220 remaining for dinner and
          evening activities.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

export const WithoutTitle: Story = {
  render: () => (
    <div className='space-y-4 max-w-2xl'>
      <Alert>
        <CheckCircle className='h-4 w-4' />
        <AlertDescription>Your itinerary has been automatically saved.</AlertDescription>
      </Alert>

      <Alert>
        <Info className='h-4 w-4' />
        <AlertDescription>
          Remember to check-in online 24 hours before your flight.
        </AlertDescription>
      </Alert>

      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertDescription>Internet connection lost. Working in offline mode.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const LongContent: Story = {
  render: () => (
    <div className='space-y-4 max-w-2xl'>
      <Alert>
        <Info className='h-4 w-4' />
        <AlertTitle>Travel Insurance Recommendation</AlertTitle>
        <AlertDescription>
          <p>
            We highly recommend purchasing travel insurance for your upcoming European trip. Travel
            insurance can protect you from unexpected costs related to:
          </p>
          <ul className='mt-2 ml-4 list-disc space-y-1'>
            <li>Trip cancellations or interruptions</li>
            <li>Medical emergencies abroad</li>
            <li>Lost or stolen luggage</li>
            <li>Flight delays and missed connections</li>
          </ul>
          <p className='mt-2'>
            Visit our insurance partners page to compare options and get quotes.
          </p>
        </AlertDescription>
      </Alert>

      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Important Visa Information</AlertTitle>
        <AlertDescription>
          Your passport expires in 4 months. Many countries require passports to be valid for at
          least 6 months beyond your travel dates. Please check the specific requirements for your
          destinations: France, Italy, and Spain. Consider renewing your passport before your trip
          to avoid any travel complications or entry denials at border control.
        </AlertDescription>
      </Alert>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <div className='space-y-4 max-w-2xl'>
      <Alert
        className='cursor-pointer hover:bg-accent/50 transition-colors'
        onClick={() => alert('Alert clicked! This could navigate to trip details.')}
      >
        <MapPin className='h-4 w-4' />
        <AlertTitle>New Destination Suggestion</AlertTitle>
        <AlertDescription>
          Based on your interests, we recommend adding Porto to your Portugal itinerary. Click to
          explore.
        </AlertDescription>
      </Alert>

      <Alert
        variant='destructive'
        className='cursor-pointer hover:bg-destructive/5 transition-colors'
        onClick={() => alert('Critical alert clicked! This could open a help dialog.')}
      >
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Action Required</AlertTitle>
        <AlertDescription>
          Your credit card on file expires next month. Update your payment method to avoid booking
          issues.
        </AlertDescription>
      </Alert>
    </div>
  ),
}
