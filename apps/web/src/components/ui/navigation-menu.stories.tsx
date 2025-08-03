import type { Meta, StoryObj } from '@storybook/react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu'
import { ComponentStory } from '../StoryWrapper'
import '../../styles/story-fonts.css'
import { cn } from '@/lib/utils'
import {
  MapPin,
  Calendar,
  Plane,
  Home,
  Activity,
  DollarSign,
  FileText,
  Camera,
  MapIcon,
  Users,
  Settings,
  HelpCircle,
} from 'lucide-react'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu-trigger-style'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Components/UI/Navigation-menu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ComponentStory
      title='Navigation Menu - Default'
      description='Basic navigation menu with simple dropdown content for trip planning categories'
      background='gradient-blue'
    >
      <div className='w-full max-w-4xl mx-auto'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Planning</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid gap-3 p-6 md:w-[400px] lg:w-[500px]'>
                  <div className='row-span-3'>
                    <NavigationMenuLink asChild>
                      <a
                        className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                        href='/'
                      >
                        <MapPin className='h-6 w-6' />
                        <div className='mb-2 mt-4 text-lg font-medium'>Trip Planning</div>
                        <p className='text-sm leading-tight text-muted-foreground'>
                          Organize your entire trip from destinations to daily activities
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                  <div className='row-span-3'>
                    <NavigationMenuLink asChild>
                      <a
                        className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-100 to-blue-200 p-6 no-underline outline-none focus:shadow-md'
                        href='/'
                      >
                        <MapIcon className='h-6 w-6' />
                        <div className='mb-2 mt-4 text-lg font-medium'>Explore Destinations</div>
                        <p className='text-sm leading-tight text-muted-foreground'>
                          Discover amazing places around the world
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </div>
                  <div className='grid gap-1'>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <div className='text-sm font-medium'>Popular Cities</div>
                      <p className='text-xs text-muted-foreground'>Tokyo, Paris, New York</p>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <div className='text-sm font-medium'>Beach Destinations</div>
                      <p className='text-xs text-muted-foreground'>Tropical and coastal getaways</p>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <div className='text-sm font-medium'>Mountain Retreats</div>
                      <p className='text-xs text-muted-foreground'>Alpine and scenic locations</p>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Itinerary
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className='mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Navigation Features:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Hover or click triggers to reveal dropdown content</li>
            <li>• Mix of dropdown menus and direct links</li>
            <li>• Smooth animations and transitions</li>
            <li>• Keyboard navigation support</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const TripCategories: Story = {
  render: () => (
    <ComponentStory
      title='Navigation Menu - Trip Categories'
      description='Navigation menu showcasing all trip planning categories with detailed content panels'
      background='gradient-green'
    >
      <div className='w-full max-w-6xl mx-auto'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2'>
                  <div className='col-span-2'>
                    <NavigationMenuLink asChild>
                      <a
                        className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-green-100 to-emerald-200 p-6 no-underline outline-none focus:shadow-md'
                        href='/'
                      >
                        <MapPin className='h-8 w-8 text-green-700' />
                        <div className='mb-2 mt-4 text-xl font-medium text-green-900'>
                          Explore the World
                        </div>
                        <p className='text-sm leading-tight text-green-700'>
                          Discover incredible destinations and plan your perfect getaway
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </div>
                  <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                    <div className='flex items-center gap-2 mb-1'>
                      <MapIcon className='h-4 w-4' />
                      <div className='text-sm font-medium'>City Guides</div>
                    </div>
                    <p className='text-xs text-muted-foreground'>Explore urban destinations</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                    <div className='flex items-center gap-2 mb-1'>
                      <Camera className='h-4 w-4' />
                      <div className='text-sm font-medium'>Photo Spots</div>
                    </div>
                    <p className='text-xs text-muted-foreground'>Instagram-worthy locations</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Planning</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-3'>
                  <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                    <div className='flex items-center gap-2 mb-2'>
                      <Calendar className='h-5 w-5 text-blue-600' />
                      <div className='text-sm font-medium'>Itinerary</div>
                    </div>
                    <p className='text-xs text-muted-foreground'>Day-by-day schedules</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                    <div className='flex items-center gap-2 mb-2'>
                      <DollarSign className='h-5 w-5 text-green-600' />
                      <div className='text-sm font-medium'>Budget</div>
                    </div>
                    <p className='text-xs text-muted-foreground'>Cost planning & tracking</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                    <div className='flex items-center gap-2 mb-2'>
                      <FileText className='h-5 w-5 text-purple-600' />
                      <div className='text-sm font-medium'>Documents</div>
                    </div>
                    <p className='text-xs text-muted-foreground'>Passport, visas, tickets</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Booking</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2'>
                  <NavigationMenuLink className='block p-4 rounded-sm hover:bg-accent'>
                    <div className='flex items-center gap-3 mb-2'>
                      <Plane className='h-6 w-6 text-blue-600' />
                      <div>
                        <div className='text-sm font-medium'>Transportation</div>
                        <p className='text-xs text-muted-foreground'>
                          Flights, trains, car rentals
                        </p>
                      </div>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='block p-4 rounded-sm hover:bg-accent'>
                    <div className='flex items-center gap-3 mb-2'>
                      <Home className='h-6 w-6 text-orange-600' />
                      <div>
                        <div className='text-sm font-medium'>Accommodation</div>
                        <p className='text-xs text-muted-foreground'>
                          Hotels, hostels, vacation rentals
                        </p>
                      </div>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='block p-4 rounded-sm hover:bg-accent'>
                    <div className='flex items-center gap-3 mb-2'>
                      <Activity className='h-6 w-6 text-red-600' />
                      <div>
                        <div className='text-sm font-medium'>Activities</div>
                        <p className='text-xs text-muted-foreground'>
                          Tours, experiences, attractions
                        </p>
                      </div>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='block p-4 rounded-sm hover:bg-accent'>
                    <div className='flex items-center gap-3 mb-2'>
                      <Users className='h-6 w-6 text-purple-600' />
                      <div>
                        <div className='text-sm font-medium'>Group Travel</div>
                        <p className='text-xs text-muted-foreground'>
                          Coordinate with friends & family
                        </p>
                      </div>
                    </div>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                My Trips
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className='mt-8 p-4 bg-green-50 rounded-lg border border-green-100'>
          <h4 className='font-semibold text-green-900 mb-2'>Complete Trip Planning:</h4>
          <ul className='text-sm text-green-800 space-y-1'>
            <li>• Comprehensive category navigation</li>
            <li>• Visual icons for quick recognition</li>
            <li>• Featured sections with highlighted content</li>
            <li>• Mix of detailed dropdowns and direct links</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const WithoutViewport: Story = {
  render: () => (
    <ComponentStory
      title='Navigation Menu - Without Viewport'
      description='Navigation menu without the shared viewport for independent dropdown positioning'
      background='gradient-purple'
    >
      <div className='w-full max-w-4xl mx-auto'>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Quick Actions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid gap-2 p-4 w-[300px]'>
                  <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                    <div className='text-sm font-medium'>Create New Trip</div>
                    <p className='text-xs text-muted-foreground'>
                      Start planning your next adventure
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                    <div className='text-sm font-medium'>Import Itinerary</div>
                    <p className='text-xs text-muted-foreground'>Upload existing travel plans</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                    <div className='text-sm font-medium'>Browse Templates</div>
                    <p className='text-xs text-muted-foreground'>Pre-made trip templates</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid gap-2 p-4 w-[350px]'>
                  <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                    <div className='text-sm font-medium'>Currency Converter</div>
                    <p className='text-xs text-muted-foreground'>Convert between currencies</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                    <div className='text-sm font-medium'>Weather Forecast</div>
                    <p className='text-xs text-muted-foreground'>Check destination weather</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                    <div className='text-sm font-medium'>Time Zone Helper</div>
                    <p className='text-xs text-muted-foreground'>Manage different time zones</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Support
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className='mt-8 p-4 bg-purple-50 rounded-lg border border-purple-100'>
          <h4 className='font-semibold text-purple-900 mb-2'>Without Viewport:</h4>
          <ul className='text-sm text-purple-800 space-y-1'>
            <li>• Each dropdown positions independently</li>
            <li>• No shared content viewport container</li>
            <li>• Better for simpler menu structures</li>
            <li>• Individual backdrop and animations</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const MobileResponsive: Story = {
  render: () => (
    <ComponentStory
      title='Navigation Menu - Mobile Responsive'
      description='Navigation menu optimized for mobile devices with simplified content layout'
      background='gradient-orange'
    >
      <div className='w-full max-w-sm mx-auto'>
        <NavigationMenu>
          <NavigationMenuList className='flex-col sm:flex-row'>
            <NavigationMenuItem>
              <NavigationMenuTrigger className='w-full sm:w-auto'>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid gap-1 p-3 w-[280px] sm:w-[400px]'>
                  <NavigationMenuLink className='flex items-center gap-3 p-3 rounded-sm hover:bg-accent'>
                    <MapPin className='h-5 w-5 text-blue-600' />
                    <div>
                      <div className='text-sm font-medium'>Destinations</div>
                      <p className='text-xs text-muted-foreground'>Places to visit</p>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='flex items-center gap-3 p-3 rounded-sm hover:bg-accent'>
                    <Calendar className='h-5 w-5 text-green-600' />
                    <div>
                      <div className='text-sm font-medium'>Itinerary</div>
                      <p className='text-xs text-muted-foreground'>Daily schedules</p>
                    </div>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='flex items-center gap-3 p-3 rounded-sm hover:bg-accent'>
                    <DollarSign className='h-5 w-5 text-yellow-600' />
                    <div>
                      <div className='text-sm font-medium'>Budget</div>
                      <p className='text-xs text-muted-foreground'>Cost tracking</p>
                    </div>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className='w-full sm:w-auto'>Account</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid gap-1 p-3 w-[280px] sm:w-[300px]'>
                  <NavigationMenuLink className='flex items-center gap-3 p-3 rounded-sm hover:bg-accent'>
                    <Settings className='h-5 w-5' />
                    <span className='text-sm font-medium'>Settings</span>
                  </NavigationMenuLink>
                  <NavigationMenuLink className='flex items-center gap-3 p-3 rounded-sm hover:bg-accent'>
                    <HelpCircle className='h-5 w-5' />
                    <span className='text-sm font-medium'>Help</span>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className='mt-8 p-4 bg-orange-50 rounded-lg border border-orange-100'>
          <h4 className='font-semibold text-orange-900 mb-2'>Mobile Features:</h4>
          <ul className='text-sm text-orange-800 space-y-1'>
            <li>• Full-width triggers on mobile</li>
            <li>• Simplified content layouts</li>
            <li>• Touch-friendly spacing</li>
            <li>• Responsive grid adjustments</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const ComplexLayout: Story = {
  render: () => (
    <ComponentStory
      title='Navigation Menu - Complex Layout'
      description='Advanced navigation menu with rich content, multiple columns, and featured sections'
      background='gradient-red'
    >
      <div className='w-full max-w-7xl mx-auto'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid gap-4 p-6 md:w-[600px] lg:w-[800px] lg:grid-cols-[.75fr_1fr]'>
                  <div className='row-span-4'>
                    <NavigationMenuLink asChild>
                      <a
                        className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-red-100 via-pink-100 to-purple-100 p-6 no-underline outline-none focus:shadow-md'
                        href='/'
                      >
                        <MapIcon className='h-8 w-8 text-red-600' />
                        <div className='mb-2 mt-4 text-xl font-medium text-red-900'>
                          Trending Destinations
                        </div>
                        <p className='text-sm leading-tight text-red-700'>
                          Discover the most popular travel destinations this season
                        </p>
                        <div className='mt-4 flex gap-2'>
                          <span className='inline-flex items-center rounded-full bg-red-200 px-2.5 py-0.5 text-xs font-medium text-red-800'>
                            Hot
                          </span>
                          <span className='inline-flex items-center rounded-full bg-pink-200 px-2.5 py-0.5 text-xs font-medium text-pink-800'>
                            Trending
                          </span>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </div>
                  <div className='grid gap-2'>
                    <h4 className='text-sm font-medium text-gray-900 mb-2'>Popular Categories</h4>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <div className='text-sm font-medium'>Beach Destinations</div>
                          <p className='text-xs text-muted-foreground'>Sun, sand, and sea</p>
                        </div>
                        <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                          254 places
                        </span>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <div className='text-sm font-medium'>City Breaks</div>
                          <p className='text-xs text-muted-foreground'>Urban adventures</p>
                        </div>
                        <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded'>
                          189 places
                        </span>
                      </div>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <div className='text-sm font-medium'>Mountain Escapes</div>
                          <p className='text-xs text-muted-foreground'>Alpine adventures</p>
                        </div>
                        <span className='text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded'>
                          97 places
                        </span>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Plan & Book</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className='grid gap-4 p-6 md:w-[500px] lg:w-[700px] lg:grid-cols-3'>
                  <div className='space-y-3'>
                    <h4 className='text-sm font-medium text-gray-900'>Transportation</h4>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <Plane className='h-5 w-5 mb-2 text-blue-600' />
                      <div className='text-sm font-medium'>Flights</div>
                      <p className='text-xs text-muted-foreground'>Compare and book flights</p>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <div className='text-sm font-medium'>Car Rentals</div>
                      <p className='text-xs text-muted-foreground'>Rent a car for your trip</p>
                    </NavigationMenuLink>
                  </div>
                  <div className='space-y-3'>
                    <h4 className='text-sm font-medium text-gray-900'>Accommodation</h4>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <Home className='h-5 w-5 mb-2 text-orange-600' />
                      <div className='text-sm font-medium'>Hotels</div>
                      <p className='text-xs text-muted-foreground'>Find the perfect stay</p>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <div className='text-sm font-medium'>Vacation Rentals</div>
                      <p className='text-xs text-muted-foreground'>Homes and apartments</p>
                    </NavigationMenuLink>
                  </div>
                  <div className='space-y-3'>
                    <h4 className='text-sm font-medium text-gray-900'>Experiences</h4>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <Activity className='h-5 w-5 mb-2 text-red-600' />
                      <div className='text-sm font-medium'>Activities</div>
                      <p className='text-xs text-muted-foreground'>Tours and experiences</p>
                    </NavigationMenuLink>
                    <NavigationMenuLink className='block p-3 rounded-sm hover:bg-accent'>
                      <div className='text-sm font-medium'>Restaurants</div>
                      <p className='text-xs text-muted-foreground'>Local dining options</p>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                My Trips
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Help
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className='mt-8 grid md:grid-cols-2 gap-4'>
          <div className='p-4 bg-red-50 rounded-lg border border-red-100'>
            <h4 className='font-semibold text-red-900 mb-2'>Complex Features:</h4>
            <ul className='text-sm text-red-800 space-y-1'>
              <li>• Multi-column layouts with rich content</li>
              <li>• Featured hero sections with gradients</li>
              <li>• Category counts and status badges</li>
              <li>• Organized content grouping</li>
            </ul>
          </div>

          <div className='p-4 bg-red-50 rounded-lg border border-red-100'>
            <h4 className='font-semibold text-red-900 mb-2'>Design Elements:</h4>
            <ul className='text-sm text-red-800 space-y-1'>
              <li>• Visual icons for quick recognition</li>
              <li>• Consistent spacing and typography</li>
              <li>• Hover states and focus management</li>
              <li>• Responsive grid systems</li>
            </ul>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

export const SimpleLinks: Story = {
  render: () => (
    <ComponentStory
      title='Navigation Menu - Simple Links'
      description='Navigation menu with only direct links, no dropdowns or complex content'
      background='gradient-cyan'
    >
      <div className='w-full max-w-2xl mx-auto'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Dashboard
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                My Trips
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Favorites
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Calendar
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Budget
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className='mt-8 p-4 bg-cyan-50 rounded-lg border border-cyan-100'>
          <h4 className='font-semibold text-cyan-900 mb-2'>Simple Navigation:</h4>
          <ul className='text-sm text-cyan-800 space-y-1'>
            <li>• Direct links without dropdown menus</li>
            <li>• Clean and minimal design</li>
            <li>• Perfect for simple navigation needs</li>
            <li>• Consistent styling with trigger styles</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
