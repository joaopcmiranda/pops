import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from './drawer'
import { Button } from './button/button'
import { Input } from './input'
import { Label } from './label'
import { ComponentStory, MobileStory } from '../StoryWrapper'
import { MenuIcon, SettingsIcon, UserIcon, FilterIcon, ShoppingCartIcon, XIcon } from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Drawer> = {
  title: 'Components/UI/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const BottomDrawer: Story = {
  render: () => (
    <MobileStory
      title='Bottom Drawer'
      description='A drawer that slides up from the bottom of the screen, perfect for mobile interfaces'
      background='gradient-blue'
    >
      <div className='p-4 space-y-4'>
        <div className='text-center'>
          <h3 className='text-lg font-semibold mb-2'>Mobile App Interface</h3>
          <p className='text-sm text-muted-foreground'>Tap the button to open the bottom drawer</p>
        </div>

        <Drawer direction='bottom'>
          <DrawerTrigger asChild>
            <Button className='w-full'>
              <MenuIcon className='mr-2 h-4 w-4' />
              Open Menu
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Main Menu</DrawerTitle>
              <DrawerDescription>
                Navigate through the app or adjust your settings
              </DrawerDescription>
            </DrawerHeader>
            <div className='p-4 space-y-3'>
              <Button variant='outline' className='w-full justify-start'>
                <UserIcon className='mr-2 h-4 w-4' />
                Profile
              </Button>
              <Button variant='outline' className='w-full justify-start'>
                <SettingsIcon className='mr-2 h-4 w-4' />
                Settings
              </Button>
              <Button variant='outline' className='w-full justify-start'>
                <ShoppingCartIcon className='mr-2 h-4 w-4' />
                Cart (3)
              </Button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant='outline'>Close Menu</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </MobileStory>
  ),
}

export const SideDrawer: Story = {
  render: () => (
    <ComponentStory
      title='Side Drawer'
      description='A drawer that slides in from the side, useful for navigation menus'
      background='gradient-green'
    >
      <div className='p-6'>
        <div className='mb-6 text-center'>
          <h3 className='text-lg font-semibold mb-2'>Desktop Navigation</h3>
          <p className='text-sm text-muted-foreground'>Click to open the side navigation drawer</p>
        </div>

        <Drawer direction='left'>
          <DrawerTrigger asChild>
            <Button>
              <MenuIcon className='mr-2 h-4 w-4' />
              Open Navigation
            </Button>
          </DrawerTrigger>
          <DrawerContent className='w-80'>
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerDescription>Quick access to all sections of the application</DrawerDescription>
            </DrawerHeader>
            <div className='p-4 space-y-2'>
              <h4 className='font-medium text-sm text-muted-foreground mb-3'>MAIN SECTIONS</h4>
              <Button variant='ghost' className='w-full justify-start'>
                Dashboard
              </Button>
              <Button variant='ghost' className='w-full justify-start'>
                Analytics
              </Button>
              <Button variant='ghost' className='w-full justify-start'>
                Reports
              </Button>
              <Button variant='ghost' className='w-full justify-start'>
                Team
              </Button>

              <h4 className='font-medium text-sm text-muted-foreground mb-3 mt-6'>ACCOUNT</h4>
              <Button variant='ghost' className='w-full justify-start'>
                <UserIcon className='mr-2 h-4 w-4' />
                Profile
              </Button>
              <Button variant='ghost' className='w-full justify-start'>
                <SettingsIcon className='mr-2 h-4 w-4' />
                Settings
              </Button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant='outline'>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </ComponentStory>
  ),
}

const FilterDrawerComponent = () => {
  const [priceRange] = useState([100, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  return (
    <MobileStory
      title='Filter Drawer'
      description='A drawer for filtering and sorting options in mobile apps'
      background='gradient-purple'
    >
      <div className='p-4'>
        <div className='mb-6 text-center'>
          <h3 className='text-lg font-semibold mb-2'>Product Catalog</h3>
          <p className='text-sm text-muted-foreground'>Use filters to refine your search results</p>
        </div>

        <div className='grid grid-cols-2 gap-3 mb-6'>
          <div className='bg-white p-3 rounded-lg border'>
            <div className='w-full h-20 bg-gray-200 rounded mb-2'></div>
            <p className='text-sm font-medium'>Product 1</p>
            <p className='text-xs text-muted-foreground'>$299</p>
          </div>
          <div className='bg-white p-3 rounded-lg border'>
            <div className='w-full h-20 bg-gray-200 rounded mb-2'></div>
            <p className='text-sm font-medium'>Product 2</p>
            <p className='text-xs text-muted-foreground'>$199</p>
          </div>
        </div>

        <Drawer direction='bottom'>
          <DrawerTrigger asChild>
            <Button className='w-full'>
              <FilterIcon className='mr-2 h-4 w-4' />
              Filter & Sort
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filter Products</DrawerTitle>
              <DrawerDescription>Refine your search with these filter options</DrawerDescription>
            </DrawerHeader>
            <div className='p-4 space-y-6'>
              {/* Price Range */}
              <div>
                <Label className='text-sm font-medium'>Price Range</Label>
                <div className='mt-2 space-y-2'>
                  <div className='flex justify-between text-sm text-muted-foreground'>
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <div className='w-full h-2 bg-gray-200 rounded'>
                    <div className='h-2 bg-blue-500 rounded' style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <Label className='text-sm font-medium'>Categories</Label>
                <div className='mt-2 space-y-2'>
                  {['Electronics', 'Clothing', 'Books', 'Home & Garden'].map(category => (
                    <div key={category} className='flex items-center'>
                      <input
                        type='checkbox'
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className='mr-2'
                      />
                      <Label htmlFor={category} className='text-sm'>
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <Label className='text-sm font-medium'>Sort By</Label>
                <select className='w-full mt-2 p-2 border rounded-md'>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>
            <DrawerFooter>
              <div className='flex gap-3'>
                <Button variant='outline' className='flex-1'>
                  Clear All
                </Button>
                <DrawerClose asChild>
                  <Button className='flex-1'>Apply Filters</Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </MobileStory>
  )
}

export const FilterDrawer: Story = {
  render: () => <FilterDrawerComponent />,
}

const FormDrawerComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(
      `Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    )
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <ComponentStory
      title='Form Drawer'
      description='A drawer containing a form for data input and submission'
      background='gradient-orange'
    >
      <div className='p-6 text-center'>
        <h3 className='text-lg font-semibold mb-2'>Contact Us</h3>
        <p className='text-sm text-muted-foreground mb-6'>
          Have a question? Send us a message using the form below.
        </p>

        <Drawer direction='right'>
          <DrawerTrigger asChild>
            <Button>
              <UserIcon className='mr-2 h-4 w-4' />
              Open Contact Form
            </Button>
          </DrawerTrigger>
          <DrawerContent className='w-96'>
            <DrawerHeader>
              <DrawerTitle>Contact Form</DrawerTitle>
              <DrawerDescription>
                Fill out the form below and we'll get back to you soon.
              </DrawerDescription>
            </DrawerHeader>
            <form onSubmit={handleSubmit} className='p-4 space-y-4'>
              <div>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  placeholder='Enter your full name'
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor='message'>Message</Label>
                <textarea
                  id='message'
                  placeholder='Enter your message'
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className='w-full p-2 border rounded-md resize-none'
                  required
                />
              </div>
            </form>
            <DrawerFooter>
              <div className='flex gap-3'>
                <DrawerClose asChild>
                  <Button variant='outline' className='flex-1'>
                    Cancel
                  </Button>
                </DrawerClose>
                <Button
                  type='submit'
                  className='flex-1'
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.message}
                >
                  Send Message
                </Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </ComponentStory>
  )
}

export const FormDrawer: Story = {
  render: () => <FormDrawerComponent />,
}

export const FullscreenDrawer: Story = {
  render: () => (
    <MobileStory
      title='Fullscreen Drawer'
      description='A drawer that takes up the full screen, useful for detailed views'
      background='gradient-pink'
    >
      <div className='p-4'>
        <div className='text-center mb-6'>
          <h3 className='text-lg font-semibold mb-2'>Product Details</h3>
          <p className='text-sm text-muted-foreground'>View complete product information</p>
        </div>

        <div className='bg-white p-4 rounded-lg border mb-4'>
          <div className='w-full h-32 bg-gray-200 rounded mb-3'></div>
          <h4 className='font-medium'>Premium Headphones</h4>
          <p className='text-sm text-muted-foreground'>High-quality wireless headphones</p>
          <p className='text-lg font-semibold text-blue-600 mt-2'>$199.99</p>
        </div>

        <Drawer direction='bottom'>
          <DrawerTrigger asChild>
            <Button className='w-full'>View Full Details</Button>
          </DrawerTrigger>
          <DrawerContent className='h-[90vh]'>
            <DrawerHeader className='border-b'>
              <div className='flex items-center justify-between'>
                <div>
                  <DrawerTitle>Premium Headphones</DrawerTitle>
                  <DrawerDescription>
                    Complete product information and specifications
                  </DrawerDescription>
                </div>
                <DrawerClose asChild>
                  <Button variant='ghost' size='sm'>
                    <XIcon className='h-4 w-4' />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <div className='flex-1 overflow-y-auto p-4 space-y-6'>
              {/* Product Images */}
              <div>
                <h4 className='font-medium mb-3'>Product Images</h4>
                <div className='grid grid-cols-2 gap-3'>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className='aspect-square bg-gray-200 rounded-lg'></div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className='font-medium mb-3'>Description</h4>
                <p className='text-sm text-muted-foreground'>
                  Experience crystal-clear audio with these premium wireless headphones. Featuring
                  active noise cancellation, 30-hour battery life, and premium comfort design.
                </p>
              </div>

              {/* Specifications */}
              <div>
                <h4 className='font-medium mb-3'>Specifications</h4>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Battery Life</span>
                    <span>30 hours</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Connectivity</span>
                    <span>Bluetooth 5.0</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Weight</span>
                    <span>250g</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Color Options</span>
                    <span>Black, White, Blue</span>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h4 className='font-medium mb-3'>Customer Reviews</h4>
                <div className='space-y-3'>
                  <div className='border rounded-lg p-3'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='text-yellow-400'>★★★★★</div>
                      <span className='text-sm font-medium'>John D.</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Amazing sound quality and comfort. The noise cancellation works perfectly!
                    </p>
                  </div>
                  <div className='border rounded-lg p-3'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='text-yellow-400'>★★★★☆</div>
                      <span className='text-sm font-medium'>Sarah M.</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Great headphones overall. The battery life is impressive.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DrawerFooter className='border-t'>
              <div className='flex gap-3'>
                <Button variant='outline' className='flex-1'>
                  Add to Wishlist
                </Button>
                <Button className='flex-1'>
                  <ShoppingCartIcon className='mr-2 h-4 w-4' />
                  Add to Cart - $199.99
                </Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </MobileStory>
  ),
}

export const NestedDrawers: Story = {
  render: () => (
    <ComponentStory
      title='Nested Drawers'
      description='Multiple drawers that can be opened from within each other'
      background='gradient-red'
    >
      <div className='p-6 text-center'>
        <h3 className='text-lg font-semibold mb-2'>Settings Panel</h3>
        <p className='text-sm text-muted-foreground mb-6'>
          Navigate through different settings sections
        </p>

        <Drawer direction='right'>
          <DrawerTrigger asChild>
            <Button>
              <SettingsIcon className='mr-2 h-4 w-4' />
              Open Settings
            </Button>
          </DrawerTrigger>
          <DrawerContent className='w-80'>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>Manage your account and preferences</DrawerDescription>
            </DrawerHeader>
            <div className='p-4 space-y-3'>
              <Drawer direction='right'>
                <DrawerTrigger asChild>
                  <Button variant='outline' className='w-full justify-start'>
                    <UserIcon className='mr-2 h-4 w-4' />
                    Account Settings
                  </Button>
                </DrawerTrigger>
                <DrawerContent className='w-80'>
                  <DrawerHeader>
                    <DrawerTitle>Account Settings</DrawerTitle>
                    <DrawerDescription>Manage your personal information</DrawerDescription>
                  </DrawerHeader>
                  <div className='p-4 space-y-4'>
                    <div>
                      <Label htmlFor='username'>Username</Label>
                      <Input id='username' placeholder='Enter username' />
                    </div>
                    <div>
                      <Label htmlFor='email'>Email</Label>
                      <Input id='email' type='email' placeholder='Enter email' />
                    </div>
                    <div className='flex items-center space-x-2'>
                      <input type='checkbox' id='newsletter' />
                      <Label htmlFor='newsletter' className='text-sm'>
                        Subscribe to newsletter
                      </Label>
                    </div>
                  </div>
                  <DrawerFooter>
                    <div className='flex gap-3'>
                      <DrawerClose asChild>
                        <Button variant='outline' className='flex-1'>
                          Cancel
                        </Button>
                      </DrawerClose>
                      <Button className='flex-1'>Save Changes</Button>
                    </div>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              <Button variant='outline' className='w-full justify-start'>
                Privacy Settings
              </Button>
              <Button variant='outline' className='w-full justify-start'>
                Notification Preferences
              </Button>
              <Button variant='outline' className='w-full justify-start'>
                Theme Settings
              </Button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant='outline'>Close Settings</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </ComponentStory>
  ),
}
