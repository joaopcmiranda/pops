import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className='w-full max-w-md mx-auto'>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const Multiple: Story = {
  render: () => (
    <div className='w-full max-w-md mx-auto'>
      <Accordion type='multiple' defaultValue={['item-1', 'item-3']}>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Trip Planning</AccordionTrigger>
          <AccordionContent>
            Plan your perfect trip with our comprehensive tools including itinerary builder, budget
            tracker, and destination guides.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Accommodation</AccordionTrigger>
          <AccordionContent>
            Find and book the perfect place to stay. Compare hotels, hostels, vacation rentals, and
            more.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Activities</AccordionTrigger>
          <AccordionContent>
            Discover exciting activities and experiences at your destination. Book tours, tickets,
            and unique local experiences.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const TripFAQ: Story = {
  render: () => (
    <div className='w-full max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Frequently Asked Questions</h2>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>How do I create a new trip?</AccordionTrigger>
          <AccordionContent>
            Click the "New Trip" button in the dashboard. You'll be guided through a step-by-step
            wizard where you can enter your destination, dates, trip type, and other details.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Can I share my trip with others?</AccordionTrigger>
          <AccordionContent>
            Yes! You can invite collaborators to your trip by clicking the "Share" button in the
            trip settings. They'll be able to view and edit the trip details with you in real-time.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>How do I track my budget?</AccordionTrigger>
          <AccordionContent>
            Navigate to the Budget section of your trip. You can add expenses, set budget limits for
            different categories, and track your spending throughout your journey.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4'>
          <AccordionTrigger>Is my data backed up?</AccordionTrigger>
          <AccordionContent>
            All your trip data is automatically backed up to the cloud. You can access your trips
            from any device by logging into your account.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className='w-full max-w-md mx-auto'>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Available Feature</AccordionTrigger>
          <AccordionContent>This feature is available for all users.</AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2' disabled>
          <AccordionTrigger disabled>Premium Feature (Disabled)</AccordionTrigger>
          <AccordionContent>
            This content is not accessible because the item is disabled.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Another Available Feature</AccordionTrigger>
          <AccordionContent>This feature is also available for all users.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
