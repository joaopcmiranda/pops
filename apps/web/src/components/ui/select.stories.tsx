import type { Meta, StoryObj } from '@storybook/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './select'
import { Label } from './label'
import { ComponentStory } from '../StoryWrapper'
import { MapPin, Users, Calendar, Plane, DollarSign, Clock } from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Select> = {
  title: 'Components/UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className='w-48'>
        <SelectValue placeholder='Select an option' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Option 1</SelectItem>
        <SelectItem value='option2'>Option 2</SelectItem>
        <SelectItem value='option3'>Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const BasicSelects: Story = {
  render: () => (
    <ComponentStory
      title='Basic Select Components'
      description='Different select configurations and sizes'
      background='gradient-blue'
    >
      <div className='space-y-6'>
        <div className='space-y-4 max-w-md'>
          <div>
            <Label htmlFor='basic-select' className='block mb-2'>
              Choose Destination
            </Label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a destination' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='paris'>Paris, France</SelectItem>
                <SelectItem value='tokyo'>Tokyo, Japan</SelectItem>
                <SelectItem value='london'>London, UK</SelectItem>
                <SelectItem value='new-york'>New York, USA</SelectItem>
                <SelectItem value='rome'>Rome, Italy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor='small-select' className='block mb-2'>
              Small Select
            </Label>
            <Select>
              <SelectTrigger size='sm' className='w-40'>
                <SelectValue placeholder='Size: Small' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='sm'>Small</SelectItem>
                <SelectItem value='md'>Medium</SelectItem>
                <SelectItem value='lg'>Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor='disabled-select' className='block mb-2 opacity-50'>
              Disabled Select
            </Label>
            <Select disabled>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='This select is disabled' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='option1'>Option 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Select Guidelines:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Use clear, descriptive placeholder text</li>
            <li>• Group related options with SelectGroup and SelectLabel</li>
            <li>• Consider searchable selects for long lists</li>
            <li>• Provide appropriate sizing for different contexts</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const TripPlanningSelects: Story = {
  render: () => (
    <ComponentStory
      title='Trip Planning Selects'
      description='Real-world examples of select components in trip organization'
      background='gradient-green'
    >
      <div className='space-y-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm max-w-2xl'>
          <h3 className='text-lg font-semibold text-gray-900 mb-6'>Plan Your Trip</h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <Label className='block mb-2 font-medium flex items-center gap-2'>
                <MapPin className='w-4 h-4' />
                Primary Destination
              </Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Where do you want to go?' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Popular European Cities</SelectLabel>
                    <SelectItem value='paris'>Paris, France</SelectItem>
                    <SelectItem value='rome'>Rome, Italy</SelectItem>
                    <SelectItem value='barcelona'>Barcelona, Spain</SelectItem>
                    <SelectItem value='amsterdam'>Amsterdam, Netherlands</SelectItem>
                    <SelectItem value='prague'>Prague, Czech Republic</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Asian Destinations</SelectLabel>
                    <SelectItem value='tokyo'>Tokyo, Japan</SelectItem>
                    <SelectItem value='bangkok'>Bangkok, Thailand</SelectItem>
                    <SelectItem value='singapore'>Singapore</SelectItem>
                    <SelectItem value='seoul'>Seoul, South Korea</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>American Cities</SelectLabel>
                    <SelectItem value='new-york'>New York, USA</SelectItem>
                    <SelectItem value='san-francisco'>San Francisco, USA</SelectItem>
                    <SelectItem value='toronto'>Toronto, Canada</SelectItem>
                    <SelectItem value='mexico-city'>Mexico City, Mexico</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block mb-2 font-medium flex items-center gap-2'>
                <Users className='w-4 h-4' />
                Number of Travelers
              </Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='How many people?' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>1 traveler (Solo)</SelectItem>
                  <SelectItem value='2'>2 travelers (Couple)</SelectItem>
                  <SelectItem value='3'>3 travelers</SelectItem>
                  <SelectItem value='4'>4 travelers (Small group)</SelectItem>
                  <SelectItem value='5-8'>5-8 travelers (Medium group)</SelectItem>
                  <SelectItem value='9+'>9+ travelers (Large group)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block mb-2 font-medium flex items-center gap-2'>
                <Calendar className='w-4 h-4' />
                Trip Duration
              </Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='How long is your trip?' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='weekend'>Weekend (2-3 days)</SelectItem>
                  <SelectItem value='short'>Short trip (4-6 days)</SelectItem>
                  <SelectItem value='week'>One week (7-10 days)</SelectItem>
                  <SelectItem value='extended'>Extended (2-3 weeks)</SelectItem>
                  <SelectItem value='month'>Month or longer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block mb-2 font-medium flex items-center gap-2'>
                <DollarSign className='w-4 h-4' />
                Budget Range
              </Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="What's your budget?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Per Person (USD)</SelectLabel>
                    <SelectItem value='budget'>Budget: Under $1,000</SelectItem>
                    <SelectItem value='mid-range'>Mid-range: $1,000 - $3,000</SelectItem>
                    <SelectItem value='comfortable'>Comfortable: $3,000 - $5,000</SelectItem>
                    <SelectItem value='luxury'>Luxury: $5,000 - $10,000</SelectItem>
                    <SelectItem value='premium'>Premium: Over $10,000</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const BookingSelects: Story = {
  render: () => (
    <ComponentStory
      title='Booking and Reservation Selects'
      description='Select components for booking flights, hotels, and activities'
      background='gradient-purple'
    >
      <div className='space-y-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm max-w-md'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <Plane className='w-5 h-5' />
            Flight Booking
          </h3>

          <div className='space-y-4'>
            <div>
              <Label className='block mb-2 font-medium'>Flight Type</Label>
              <Select defaultValue='round-trip'>
                <SelectTrigger className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='round-trip'>Round Trip</SelectItem>
                  <SelectItem value='one-way'>One Way</SelectItem>
                  <SelectItem value='multi-city'>Multi-City</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block mb-2 font-medium'>Cabin Class</Label>
              <Select defaultValue='economy'>
                <SelectTrigger className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='economy'>Economy</SelectItem>
                  <SelectItem value='premium-economy'>Premium Economy</SelectItem>
                  <SelectItem value='business'>Business Class</SelectItem>
                  <SelectItem value='first'>First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block mb-2 font-medium'>Departure Time Preference</Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Any time' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Morning</SelectLabel>
                    <SelectItem value='early-morning'>Early Morning (6:00 - 9:00 AM)</SelectItem>
                    <SelectItem value='morning'>Morning (9:00 AM - 12:00 PM)</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Afternoon</SelectLabel>
                    <SelectItem value='afternoon'>Afternoon (12:00 - 6:00 PM)</SelectItem>
                    <SelectItem value='evening'>Evening (6:00 - 9:00 PM)</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Night</SelectLabel>
                    <SelectItem value='night'>Night (9:00 PM - 12:00 AM)</SelectItem>
                    <SelectItem value='late-night'>Late Night (12:00 - 6:00 AM)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border shadow-sm max-w-md'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Hotel Preferences</h3>

          <div className='space-y-4'>
            <div>
              <Label className='block mb-2 font-medium'>Room Type</Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select room type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='single'>Single Room</SelectItem>
                  <SelectItem value='double'>Double Room</SelectItem>
                  <SelectItem value='twin'>Twin Beds</SelectItem>
                  <SelectItem value='suite'>Suite</SelectItem>
                  <SelectItem value='family'>Family Room</SelectItem>
                  <SelectItem value='dormitory'>Dormitory (Hostel)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block mb-2 font-medium'>Hotel Star Rating</Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Any rating' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='any'>Any Rating</SelectItem>
                  <SelectItem value='3+'>3+ Stars</SelectItem>
                  <SelectItem value='4+'>4+ Stars</SelectItem>
                  <SelectItem value='5'>5 Stars (Luxury)</SelectItem>
                  <SelectItem value='boutique'>Boutique Hotels</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block mb-2 font-medium'>Cancellation Policy</Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Any policy' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='free'>Free Cancellation</SelectItem>
                  <SelectItem value='partial'>Partial Refund</SelectItem>
                  <SelectItem value='non-refundable'>Non-Refundable (Best Price)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const FilterSelects: Story = {
  render: () => (
    <ComponentStory
      title='Filter and Search Selects'
      description='Select components used for filtering and refining search results'
      background='gradient-orange'
    >
      <div className='space-y-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Filter Your Results</h3>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <Label className='block mb-2 text-sm font-medium'>Sort by</Label>
              <Select defaultValue='relevance'>
                <SelectTrigger className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='relevance'>Most Relevant</SelectItem>
                  <SelectItem value='price-low'>Price: Low to High</SelectItem>
                  <SelectItem value='price-high'>Price: High to Low</SelectItem>
                  <SelectItem value='rating'>Highest Rated</SelectItem>
                  <SelectItem value='newest'>Newest First</SelectItem>
                  <SelectItem value='distance'>Closest to Me</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block mb-2 text-sm font-medium'>Trip Type</Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='All types' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='adventure'>Adventure</SelectItem>
                  <SelectItem value='cultural'>Cultural</SelectItem>
                  <SelectItem value='relaxation'>Relaxation</SelectItem>
                  <SelectItem value='business'>Business</SelectItem>
                  <SelectItem value='family'>Family</SelectItem>
                  <SelectItem value='romantic'>Romantic</SelectItem>
                  <SelectItem value='solo'>Solo Travel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block mb-2 text-sm font-medium'>Duration</Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Any duration' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1-3'>1-3 days</SelectItem>
                  <SelectItem value='4-7'>4-7 days</SelectItem>
                  <SelectItem value='8-14'>1-2 weeks</SelectItem>
                  <SelectItem value='15-30'>2-4 weeks</SelectItem>
                  <SelectItem value='30+'>Over a month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            <div>
              <Label className='block mb-2 text-sm font-medium'>Best Time to Visit</Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Any season' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Seasons</SelectLabel>
                    <SelectItem value='spring'>Spring (Mar-May)</SelectItem>
                    <SelectItem value='summer'>Summer (Jun-Aug)</SelectItem>
                    <SelectItem value='fall'>Fall (Sep-Nov)</SelectItem>
                    <SelectItem value='winter'>Winter (Dec-Feb)</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Special Periods</SelectLabel>
                    <SelectItem value='peak'>Peak Season</SelectItem>
                    <SelectItem value='shoulder'>Shoulder Season</SelectItem>
                    <SelectItem value='off'>Off Season</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block mb-2 text-sm font-medium'>Activity Level</Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Any level' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='low'>Low - Mostly relaxing</SelectItem>
                  <SelectItem value='moderate'>Moderate - Some walking/activities</SelectItem>
                  <SelectItem value='high'>High - Active and adventurous</SelectItem>
                  <SelectItem value='extreme'>Extreme - Challenging activities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <ComponentStory
      title='Selects with Icons'
      description='Enhanced select components with contextual icons'
      background='gradient-pink'
    >
      <div className='space-y-6 max-w-md'>
        <div className='space-y-4'>
          <div>
            <Label className='block mb-2 font-medium'>Transportation Method</Label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='How will you travel?' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='flight'>
                  <span className='flex items-center gap-2'>
                    <Plane className='w-4 h-4' />
                    Flight
                  </span>
                </SelectItem>
                <SelectItem value='train'>
                  <span className='flex items-center gap-2'>
                    <span className='w-4 h-4 flex items-center justify-center'>🚂</span>
                    Train
                  </span>
                </SelectItem>
                <SelectItem value='car'>
                  <span className='flex items-center gap-2'>
                    <span className='w-4 h-4 flex items-center justify-center'>🚗</span>
                    Car Rental
                  </span>
                </SelectItem>
                <SelectItem value='bus'>
                  <span className='flex items-center gap-2'>
                    <span className='w-4 h-4 flex items-center justify-center'>🚌</span>
                    Bus
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className='block mb-2 font-medium'>Meeting Time</Label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='When should we meet?' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='morning'>
                  <span className='flex items-center gap-2'>
                    <Clock className='w-4 h-4' />
                    Morning (8:00 AM)
                  </span>
                </SelectItem>
                <SelectItem value='afternoon'>
                  <span className='flex items-center gap-2'>
                    <Clock className='w-4 h-4' />
                    Afternoon (2:00 PM)
                  </span>
                </SelectItem>
                <SelectItem value='evening'>
                  <span className='flex items-center gap-2'>
                    <Clock className='w-4 h-4' />
                    Evening (6:00 PM)
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className='block mb-2 font-medium'>Currency</Label>
            <Select>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select currency' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='usd'>
                  <span className='flex items-center gap-2'>
                    <DollarSign className='w-4 h-4' />
                    USD - US Dollar
                  </span>
                </SelectItem>
                <SelectItem value='eur'>
                  <span className='flex items-center gap-2'>
                    <span className='w-4 h-4 flex items-center justify-center font-bold'>€</span>
                    EUR - Euro
                  </span>
                </SelectItem>
                <SelectItem value='gbp'>
                  <span className='flex items-center gap-2'>
                    <span className='w-4 h-4 flex items-center justify-center font-bold'>£</span>
                    GBP - British Pound
                  </span>
                </SelectItem>
                <SelectItem value='jpy'>
                  <span className='flex items-center gap-2'>
                    <span className='w-4 h-4 flex items-center justify-center font-bold'>¥</span>
                    JPY - Japanese Yen
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const Interactive: Story = {
  render: () => (
    <ComponentStory
      title='Interactive Select Demo'
      description='Dynamic select behavior with dependent options and real-time updates'
      background='gradient-blue'
    >
      <div className='space-y-6 max-w-2xl'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Trip Configuration</h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <div>
              <Label className='block mb-2 font-medium'>Continent</Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Choose continent' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='europe'>Europe</SelectItem>
                  <SelectItem value='asia'>Asia</SelectItem>
                  <SelectItem value='north-america'>North America</SelectItem>
                  <SelectItem value='south-america'>South America</SelectItem>
                  <SelectItem value='africa'>Africa</SelectItem>
                  <SelectItem value='oceania'>Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className='block mb-2 font-medium'>Travel Style</Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Your travel style' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='backpacker'>Backpacker - Budget-friendly</SelectItem>
                  <SelectItem value='standard'>Standard - Comfortable</SelectItem>
                  <SelectItem value='luxury'>Luxury - Premium experience</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='p-4 bg-gray-50 rounded-lg'>
            <h4 className='font-semibold text-gray-900 mb-2'>Selection Summary</h4>
            <p className='text-sm text-gray-600'>
              Make your selections above to see a customized trip recommendation.
            </p>
          </div>
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Interactive Features:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Cascading options based on previous selections</li>
            <li>• Real-time summary updates</li>
            <li>• Grouped options for better organization</li>
            <li>• Icon integration for visual clarity</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
