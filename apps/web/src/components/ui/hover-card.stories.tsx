import type { Meta, StoryObj } from '@storybook/react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card'
import { Button } from './button/button'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Badge } from './badge/badge'
import { ComponentStory } from '../StoryWrapper'
import { UserIcon, CalendarIcon, MapPinIcon, MailIcon, PhoneIcon, GlobeIcon } from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof HoverCard> = {
  title: 'Components/UI/Hover-card',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ComponentStory
      title='Basic Hover Card'
      description='A simple hover card that shows additional information on hover'
      background='gradient-blue'
    >
      <div className='text-center'>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant='link'>@johndoe</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className='flex justify-between space-x-4'>
              <Avatar>
                <AvatarImage src='https://github.com/vercel.png' />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className='space-y-1'>
                <h4 className='text-sm font-semibold'>@johndoe</h4>
                <p className='text-sm text-muted-foreground'>
                  Software engineer passionate about building great user experiences.
                </p>
                <div className='flex items-center pt-2'>
                  <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />
                  <span className='text-xs text-muted-foreground'>Joined December 2021</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </ComponentStory>
  ),
}

export const UserProfile: Story = {
  render: () => (
    <ComponentStory
      title='User Profile Hover Card'
      description='A detailed user profile card with avatar, stats, and contact information'
      background='gradient-green'
    >
      <div className='text-center space-y-4'>
        <p className='text-muted-foreground'>Hover over the user mentions below:</p>

        <div className='space-y-2'>
          <p>
            Great work on the project by{' '}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant='link' className='p-0 h-auto'>
                  @sarah_dev
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div className='flex justify-between space-x-4'>
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div className='space-y-1 flex-1'>
                    <div className='flex items-center gap-2'>
                      <h4 className='text-sm font-semibold'>Sarah Developer</h4>
                      <Badge variant='secondary'>Pro</Badge>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Senior Frontend Developer at TechCorp. Loves React, TypeScript, and building
                      accessible UIs.
                    </p>
                    <div className='flex items-center pt-2 space-x-4'>
                      <div className='flex items-center'>
                        <CalendarIcon className='mr-1 h-3 w-3 opacity-70' />
                        <span className='text-xs text-muted-foreground'>Joined March 2020</span>
                      </div>
                      <div className='flex items-center'>
                        <MapPinIcon className='mr-1 h-3 w-3 opacity-70' />
                        <span className='text-xs text-muted-foreground'>San Francisco, CA</span>
                      </div>
                    </div>
                    <div className='flex pt-2 space-x-4'>
                      <div className='text-center'>
                        <div className='text-sm font-semibold'>234</div>
                        <div className='text-xs text-muted-foreground'>Following</div>
                      </div>
                      <div className='text-center'>
                        <div className='text-sm font-semibold'>1.2k</div>
                        <div className='text-xs text-muted-foreground'>Followers</div>
                      </div>
                      <div className='text-center'>
                        <div className='text-sm font-semibold'>89</div>
                        <div className='text-xs text-muted-foreground'>Projects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>{' '}
            and{' '}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant='link' className='p-0 h-auto'>
                  @mike_designer
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div className='flex justify-between space-x-4'>
                  <Avatar>
                    <AvatarImage src='https://github.com/github.png' />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <div className='space-y-1 flex-1'>
                    <div className='flex items-center gap-2'>
                      <h4 className='text-sm font-semibold'>Mike Designer</h4>
                      <Badge variant='outline'>Design</Badge>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      UI/UX Designer focused on creating beautiful, intuitive user experiences.
                    </p>
                    <div className='flex items-center pt-2 space-x-4'>
                      <div className='flex items-center'>
                        <CalendarIcon className='mr-1 h-3 w-3 opacity-70' />
                        <span className='text-xs text-muted-foreground'>Joined July 2022</span>
                      </div>
                      <div className='flex items-center'>
                        <MapPinIcon className='mr-1 h-3 w-3 opacity-70' />
                        <span className='text-xs text-muted-foreground'>New York, NY</span>
                      </div>
                    </div>
                    <div className='flex pt-2 space-x-4'>
                      <div className='text-center'>
                        <div className='text-sm font-semibold'>156</div>
                        <div className='text-xs text-muted-foreground'>Following</div>
                      </div>
                      <div className='text-center'>
                        <div className='text-sm font-semibold'>892</div>
                        <div className='text-xs text-muted-foreground'>Followers</div>
                      </div>
                      <div className='text-center'>
                        <div className='text-sm font-semibold'>45</div>
                        <div className='text-xs text-muted-foreground'>Designs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </p>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const TripDestination: Story = {
  render: () => (
    <ComponentStory
      title='Trip Destination Hover Cards'
      description='Hover cards showing destination information for trip planning'
      background='gradient-purple'
    >
      <div className='text-center space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-4'>Popular Destinations</h3>
          <div className='flex justify-center gap-6 flex-wrap'>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant='outline' className='h-20 w-32 flex flex-col'>
                  <div className='text-2xl mb-1'>🗼</div>
                  <span className='text-sm'>Paris</span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <div className='text-2xl'>🗼</div>
                    <div>
                      <h4 className='text-lg font-semibold'>Paris, France</h4>
                      <p className='text-sm text-muted-foreground'>The City of Light</p>
                    </div>
                  </div>
                  <p className='text-sm'>
                    Known for its art, fashion, gastronomy, and culture. Home to iconic landmarks
                    like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.
                  </p>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div>
                      <div className='font-medium'>Best Time to Visit</div>
                      <div className='text-muted-foreground'>April - June, Sept - Oct</div>
                    </div>
                    <div>
                      <div className='font-medium'>Average Budget</div>
                      <div className='text-muted-foreground'>$150-200/day</div>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Badge>Culture</Badge>
                    <Badge>Art</Badge>
                    <Badge>Food</Badge>
                    <Badge>Romance</Badge>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant='outline' className='h-20 w-32 flex flex-col'>
                  <div className='text-2xl mb-1'>🏯</div>
                  <span className='text-sm'>Tokyo</span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <div className='text-2xl'>🏯</div>
                    <div>
                      <h4 className='text-lg font-semibold'>Tokyo, Japan</h4>
                      <p className='text-sm text-muted-foreground'>
                        Modern Metropolis meets Traditional Culture
                      </p>
                    </div>
                  </div>
                  <p className='text-sm'>
                    A vibrant city where ultra-modern skyscrapers stand alongside traditional
                    temples. Famous for technology, anime culture, incredible food, and unique
                    experiences.
                  </p>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div>
                      <div className='font-medium'>Best Time to Visit</div>
                      <div className='text-muted-foreground'>March - May, Sept - Nov</div>
                    </div>
                    <div>
                      <div className='font-medium'>Average Budget</div>
                      <div className='text-muted-foreground'>$120-180/day</div>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Badge>Technology</Badge>
                    <Badge>Culture</Badge>
                    <Badge>Food</Badge>
                    <Badge>Shopping</Badge>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant='outline' className='h-20 w-32 flex flex-col'>
                  <div className='text-2xl mb-1'>🏛️</div>
                  <span className='text-sm'>Rome</span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <div className='text-2xl'>🏛️</div>
                    <div>
                      <h4 className='text-lg font-semibold'>Rome, Italy</h4>
                      <p className='text-sm text-muted-foreground'>The Eternal City</p>
                    </div>
                  </div>
                  <p className='text-sm'>
                    A living museum with nearly 3,000 years of history. Home to the Colosseum,
                    Vatican City, and some of the world's greatest art and architecture.
                  </p>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div>
                      <div className='font-medium'>Best Time to Visit</div>
                      <div className='text-muted-foreground'>April - June, Sept - Oct</div>
                    </div>
                    <div>
                      <div className='font-medium'>Average Budget</div>
                      <div className='text-muted-foreground'>$100-150/day</div>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Badge>History</Badge>
                    <Badge>Art</Badge>
                    <Badge>Architecture</Badge>
                    <Badge>Food</Badge>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const ContactCard: Story = {
  render: () => (
    <ComponentStory
      title='Contact Information Hover Card'
      description='Hover card displaying contact details and social information'
      background='gradient-orange'
    >
      <div className='text-center space-y-4'>
        <p className='text-muted-foreground'>Hover over the contact links below:</p>

        <div className='space-y-4'>
          <div className='flex justify-center gap-4'>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant='outline' size='sm'>
                  <MailIcon className='mr-2 h-4 w-4' />
                  Email Support
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <MailIcon className='h-5 w-5 text-blue-500' />
                    <div>
                      <h4 className='font-semibold'>Email Support</h4>
                      <p className='text-sm text-muted-foreground'>Get help via email</p>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div className='text-sm'>
                      <div className='font-medium'>General Support</div>
                      <div className='text-muted-foreground'>support@triporganizer.com</div>
                    </div>
                    <div className='text-sm'>
                      <div className='font-medium'>Technical Issues</div>
                      <div className='text-muted-foreground'>tech@triporganizer.com</div>
                    </div>
                    <div className='text-sm'>
                      <div className='font-medium'>Response Time</div>
                      <div className='text-muted-foreground'>Usually within 24 hours</div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant='outline' size='sm'>
                  <PhoneIcon className='mr-2 h-4 w-4' />
                  Phone Support
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <PhoneIcon className='h-5 w-5 text-green-500' />
                    <div>
                      <h4 className='font-semibold'>Phone Support</h4>
                      <p className='text-sm text-muted-foreground'>Speak with our team</p>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div className='text-sm'>
                      <div className='font-medium'>US & Canada</div>
                      <div className='text-muted-foreground'>+1 (555) 123-4567</div>
                    </div>
                    <div className='text-sm'>
                      <div className='font-medium'>International</div>
                      <div className='text-muted-foreground'>+1 (555) 123-4568</div>
                    </div>
                    <div className='text-sm'>
                      <div className='font-medium'>Hours</div>
                      <div className='text-muted-foreground'>Mon-Fri 9AM-6PM EST</div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant='outline' size='sm'>
                  <GlobeIcon className='mr-2 h-4 w-4' />
                  Website
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-2'>
                    <GlobeIcon className='h-5 w-5 text-purple-500' />
                    <div>
                      <h4 className='font-semibold'>Visit Our Website</h4>
                      <p className='text-sm text-muted-foreground'>
                        Complete trip planning resources
                      </p>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div className='text-sm'>
                      <div className='font-medium'>Main Site</div>
                      <div className='text-muted-foreground'>www.triporganizer.com</div>
                    </div>
                    <div className='text-sm'>
                      <div className='font-medium'>Help Center</div>
                      <div className='text-muted-foreground'>help.triporganizer.com</div>
                    </div>
                    <div className='text-sm'>
                      <div className='font-medium'>Community</div>
                      <div className='text-muted-foreground'>community.triporganizer.com</div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const InteractiveDemo: Story = {
  render: () => (
    <ComponentStory
      title='Interactive Hover Card Demo'
      description='Multiple hover cards with different content and styling'
      background='gradient-pink'
    >
      <div className='text-center space-y-6'>
        <div>
          <h3 className='text-lg font-semibold mb-4'>Team Members</h3>
          <div className='flex justify-center gap-3 flex-wrap'>
            {[
              {
                name: 'Alice Johnson',
                role: 'Product Manager',
                avatar: 'AJ',
                color: 'bg-blue-500',
              },
              { name: 'Bob Smith', role: 'Lead Developer', avatar: 'BS', color: 'bg-green-500' },
              { name: 'Carol Davis', role: 'UX Designer', avatar: 'CD', color: 'bg-purple-500' },
              { name: 'David Wilson', role: 'QA Engineer', avatar: 'DW', color: 'bg-orange-500' },
            ].map((member, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <Button variant='ghost' className='h-16 w-16 rounded-full p-0'>
                    <Avatar className='h-14 w-14'>
                      <AvatarFallback className={member.color + ' text-white'}>
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className='flex items-center space-x-3'>
                    <Avatar>
                      <AvatarFallback className={member.color + ' text-white'}>
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className='font-semibold'>{member.name}</h4>
                      <p className='text-sm text-muted-foreground'>{member.role}</p>
                      <div className='flex items-center pt-2'>
                        <UserIcon className='mr-2 h-3 w-3 opacity-70' />
                        <span className='text-xs text-muted-foreground'>
                          Team member since 2023
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        <div className='mt-8 p-4 bg-pink-50 rounded-lg border border-pink-100'>
          <h4 className='font-semibold text-pink-900 mb-2'>Hover Card Features:</h4>
          <ul className='text-sm text-pink-800 space-y-1'>
            <li>• Appears on hover with customizable delay</li>
            <li>• Supports rich content including avatars, badges, and text</li>
            <li>• Automatically positions to stay within viewport</li>
            <li>• Dismisses when mouse leaves trigger or content area</li>
            <li>• Accessible with keyboard navigation support</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
