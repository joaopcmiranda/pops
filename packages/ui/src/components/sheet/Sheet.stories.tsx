import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../button'
import { Input } from '../input'
import { Label } from '../label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet'

const meta: Meta<typeof Sheet> = {
  title: 'Components/UI/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default sheet from the right side
 */
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className='py-4'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' defaultValue='John Doe' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' defaultValue='john@example.com' />
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant='outline'>Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Save Changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Sheets from different sides
 */
export const DifferentSides: Story = {
  render: () => (
    <div className='flex gap-4 flex-wrap'>
      {/* Right Side (default) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button>Right Side</Button>
        </SheetTrigger>
        <SheetContent side='right'>
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the right side.</SheetDescription>
          </SheetHeader>
          <div className='py-4'>
            <p>Content of the right-side sheet.</p>
          </div>
        </SheetContent>
      </Sheet>

      {/* Left Side */}
      <Sheet>
        <SheetTrigger asChild>
          <Button>Left Side</Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the left side.</SheetDescription>
          </SheetHeader>
          <div className='py-4'>
            <p>Content of the left-side sheet.</p>
          </div>
        </SheetContent>
      </Sheet>

      {/* Top Side */}
      <Sheet>
        <SheetTrigger asChild>
          <Button>Top Side</Button>
        </SheetTrigger>
        <SheetContent side='top'>
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the top.</SheetDescription>
          </SheetHeader>
          <div className='py-4'>
            <p>Content of the top sheet. Perfect for notifications or quick actions.</p>
          </div>
        </SheetContent>
      </Sheet>

      {/* Bottom Side */}
      <Sheet>
        <SheetTrigger asChild>
          <Button>Bottom Side</Button>
        </SheetTrigger>
        <SheetContent side='bottom'>
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
            <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
          </SheetHeader>
          <div className='py-4'>
            <p>Content of the bottom sheet. Great for mobile-like experiences.</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  ),
}

/**
 * Sheet with form
 */
export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Create Account</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Account</SheetTitle>
          <SheetDescription>
            Fill out the form below to create a new account. All fields marked with * are required.
          </SheetDescription>
        </SheetHeader>
        <div className='py-4'>
          <form className='space-y-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='firstName'>
                  First Name <span className='text-destructive'>*</span>
                </Label>
                <Input id='firstName' placeholder='Enter your first name' required />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='lastName'>
                  Last Name <span className='text-destructive'>*</span>
                </Label>
                <Input id='lastName' placeholder='Enter your last name' required />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='formEmail'>
                  Email Address <span className='text-destructive'>*</span>
                </Label>
                <Input id='formEmail' type='email' placeholder='Enter your email' required />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='formPassword'>
                  Password <span className='text-destructive'>*</span>
                </Label>
                <Input id='formPassword' type='password' placeholder='Create a password' required />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>
                  Confirm Password <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='Confirm your password'
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input id='phone' type='tel' placeholder='(555) 123-4567' />
              </div>
            </div>
          </form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant='outline'>Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Create Account</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Sheet with long content to show scrolling
 */
export const WithLongContent: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>View Terms</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Terms and Conditions</SheetTitle>
          <SheetDescription>
            Please read our terms and conditions carefully before proceeding.
          </SheetDescription>
        </SheetHeader>
        <div className='py-4 overflow-y-auto'>
          <div className='space-y-4 text-sm'>
            <section>
              <h3 className='font-semibold text-base mb-2'>1. Acceptance of Terms</h3>
              <p>
                By accessing and using this service, you accept and agree to be bound by the terms
                and provision of this agreement. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </section>

            <section>
              <h3 className='font-semibold text-base mb-2'>2. Privacy Policy</h3>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use,
                and protect your information when you use our service. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>

            <section>
              <h3 className='font-semibold text-base mb-2'>3. User Responsibilities</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account and
                password. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </p>
            </section>

            <section>
              <h3 className='font-semibold text-base mb-2'>4. Prohibited Uses</h3>
              <p>
                You may not use our service for any unlawful purpose or to solicit others to perform
                unlawful acts. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum.
              </p>
            </section>

            <section>
              <h3 className='font-semibold text-base mb-2'>5. Service Availability</h3>
              <p>
                We strive to maintain the highest possible service availability, but we cannot
                guarantee uninterrupted access to our service. Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem accusantium doloremque laudantium.
              </p>
            </section>

            <section>
              <h3 className='font-semibold text-base mb-2'>6. Limitation of Liability</h3>
              <p>
                In no event shall we be liable for any indirect, incidental, special, or
                consequential damages arising out of or in connection with your use of our service.
                Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
              </p>
            </section>

            <section>
              <h3 className='font-semibold text-base mb-2'>7. Changes to Terms</h3>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of the
                service constitutes acceptance of such changes. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit.
              </p>
            </section>

            <section>
              <h3 className='font-semibold text-base mb-2'>8. Contact Information</h3>
              <p>
                If you have any questions about these terms, please contact us at the address
                provided on our contact page. Sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </p>
            </section>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant='outline'>Decline</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Accept Terms</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Simple sheet without header or footer
 */
export const SimpleContent: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Quick Actions</Button>
      </SheetTrigger>
      <SheetContent>
        <div className='py-6'>
          <div className='space-y-4'>
            <Button className='w-full justify-start' variant='ghost'>
              📊 View Analytics
            </Button>
            <Button className='w-full justify-start' variant='ghost'>
              ⚙️ Settings
            </Button>
            <Button className='w-full justify-start' variant='ghost'>
              📝 Create New
            </Button>
            <Button className='w-full justify-start' variant='ghost'>
              👥 Invite Users
            </Button>
            <Button className='w-full justify-start' variant='ghost'>
              🔔 Notifications
            </Button>
            <Button className='w-full justify-start' variant='ghost'>
              ❓ Help & Support
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Sheet for mobile menu simulation
 */
export const MobileMenu: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>☰ Menu</Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className='py-4'>
          <nav className='space-y-2'>
            <Button className='w-full justify-start' variant='ghost'>
              🏠 Home
            </Button>
            <Button className='w-full justify-start' variant='ghost'>
              📦 Products
            </Button>
            <Button className='w-full justify-start' variant='ghost'>
              💼 Services
            </Button>
            <Button className='w-full justify-start' variant='ghost'>
              📞 Contact
            </Button>
            <Button className='w-full justify-start' variant='ghost'>
              ℹ️ About
            </Button>
            <hr className='my-4' />
            <Button className='w-full justify-start' variant='ghost'>
              👤 Account
            </Button>
            <Button className='w-full justify-start' variant='ghost'>
              🔧 Settings
            </Button>
            <Button className='w-full justify-start' variant='ghost'>
              🚪 Logout
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Sheet with custom content and no padding
 */
export const CustomContent: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Image Gallery</Button>
      </SheetTrigger>
      <SheetContent className='p-0'>
        <div className='h-full flex flex-col'>
          <div className='p-6 border-b'>
            <SheetTitle>Image Gallery</SheetTitle>
            <SheetDescription>Browse through our collection of images</SheetDescription>
          </div>

          <div className='flex-1 p-6 overflow-y-auto'>
            <div className='grid grid-cols-1 gap-4'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className='aspect-video bg-muted rounded-lg flex items-center justify-center'
                >
                  <span className='text-muted-foreground'>Image {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='p-6 border-t'>
            <SheetClose asChild>
              <Button className='w-full'>Close Gallery</Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

/**
 * Demonstration of different use cases
 */
export const UseCases: Story = {
  render: () => (
    <div className='space-y-6'>
      <div className='p-4 bg-slate-50 rounded-lg'>
        <h3 className='font-semibold mb-3'>Common Sheet Use Cases</h3>
        <div className='grid grid-cols-2 gap-4'>
          {/* Settings/Preferences */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' className='h-auto flex-col py-4'>
                <span className='text-lg mb-1'>⚙️</span>
                <span>Settings</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Application Settings</SheetTitle>
                <SheetDescription>Customize your application preferences</SheetDescription>
              </SheetHeader>
              <div className='py-4'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span>Dark Mode</span>
                    <Button variant='outline' size='sm'>
                      Toggle
                    </Button>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Notifications</span>
                    <Button variant='outline' size='sm'>
                      Configure
                    </Button>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Language</span>
                    <Button variant='outline' size='sm'>
                      Change
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Shopping Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' className='h-auto flex-col py-4'>
                <span className='text-lg mb-1'>🛒</span>
                <span>Cart (3)</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>3 items in your cart</SheetDescription>
              </SheetHeader>
              <div className='py-4'>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center p-3 border rounded'>
                    <span>Product A</span>
                    <span>$29.99</span>
                  </div>
                  <div className='flex justify-between items-center p-3 border rounded'>
                    <span>Product B</span>
                    <span>$19.99</span>
                  </div>
                  <div className='flex justify-between items-center p-3 border rounded'>
                    <span>Product C</span>
                    <span>$39.99</span>
                  </div>
                  <hr />
                  <div className='flex justify-between font-semibold'>
                    <span>Total:</span>
                    <span>$89.97</span>
                  </div>
                </div>
              </div>
              <SheetFooter>
                <Button className='w-full'>Checkout</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' className='h-auto flex-col py-4'>
                <span className='text-lg mb-1'>🔍</span>
                <span>Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Search Filters</SheetTitle>
                <SheetDescription>Refine your search results</SheetDescription>
              </SheetHeader>
              <div className='py-4 space-y-4'>
                <div>
                  <Label htmlFor='price-range'>Price Range</Label>
                  <Input id='price-range' placeholder='$0 - $1000' />
                </div>
                <div>
                  <Label htmlFor='category'>Category</Label>
                  <select id='category' className='w-full px-3 py-2 border rounded-md'>
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Books</option>
                  </select>
                </div>
              </div>
              <SheetFooter>
                <Button variant='outline'>Clear</Button>
                <Button>Apply Filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Help/Support */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' className='h-auto flex-col py-4'>
                <span className='text-lg mb-1'>❓</span>
                <span>Help</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Help & Support</SheetTitle>
                <SheetDescription>Get help with using our application</SheetDescription>
              </SheetHeader>
              <div className='py-4'>
                <div className='space-y-3'>
                  <Button className='w-full justify-start' variant='ghost'>
                    📖 User Guide
                  </Button>
                  <Button className='w-full justify-start' variant='ghost'>
                    🎥 Video Tutorials
                  </Button>
                  <Button className='w-full justify-start' variant='ghost'>
                    💬 Contact Support
                  </Button>
                  <Button className='w-full justify-start' variant='ghost'>
                    📝 Report a Bug
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  ),
}
