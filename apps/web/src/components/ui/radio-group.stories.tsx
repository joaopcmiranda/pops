import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { Label } from './label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { ComponentStory } from '../StoryWrapper'
import {
  CreditCardIcon,
  BanknotesIcon,
  SmartphoneIcon,
  PlaneIcon,
  CarIcon,
  TrainIcon,
} from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/UI/Radio-group',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const BasicComponent = () => {
  const [value, setValue] = useState('option1')

  return (
    <ComponentStory
      title='Basic Radio Group'
      description='Simple radio group with multiple options'
      background='gradient-blue'
    >
      <div className='max-w-md mx-auto space-y-4'>
        <RadioGroup value={value} onValueChange={setValue}>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option1' id='r1' />
            <Label htmlFor='r1'>Option 1</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option2' id='r2' />
            <Label htmlFor='r2'>Option 2</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='option3' id='r3' />
            <Label htmlFor='r3'>Option 3</Label>
          </div>
        </RadioGroup>

        <div className='p-3 bg-blue-50 border border-blue-200 rounded-md'>
          <p className='text-sm text-blue-900'>
            <strong>Selected:</strong> {value}
          </p>
        </div>
      </div>
    </ComponentStory>
  )
}

export const Basic: Story = {
  render: () => <BasicComponent />,
}

const PaymentMethodsComponent = () => {
  const [paymentMethod, setPaymentMethod] = useState('card')

  return (
    <ComponentStory
      title='Payment Method Selection'
      description='Radio group for selecting payment methods with icons and descriptions'
      background='gradient-green'
    >
      <div className='max-w-lg mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle>Choose Payment Method</CardTitle>
            <CardDescription>Select how you'd like to pay for your trip</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className='space-y-4'
            >
              <div className='flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50'>
                <RadioGroupItem value='card' id='card' />
                <CreditCardIcon className='h-5 w-5 text-gray-500' />
                <div className='flex-1'>
                  <Label htmlFor='card' className='font-medium'>
                    Credit Card
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    Pay securely with your credit or debit card
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50'>
                <RadioGroupItem value='paypal' id='paypal' />
                <div className='h-5 w-5 bg-blue-600 rounded flex items-center justify-center'>
                  <span className='text-white text-xs font-bold'>P</span>
                </div>
                <div className='flex-1'>
                  <Label htmlFor='paypal' className='font-medium'>
                    PayPal
                  </Label>
                  <p className='text-sm text-muted-foreground'>Pay with your PayPal account</p>
                </div>
              </div>

              <div className='flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50'>
                <RadioGroupItem value='bank' id='bank' />
                <BanknotesIcon className='h-5 w-5 text-gray-500' />
                <div className='flex-1'>
                  <Label htmlFor='bank' className='font-medium'>
                    Bank Transfer
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    Direct transfer from your bank account
                  </p>
                </div>
              </div>

              <div className='flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50'>
                <RadioGroupItem value='apple' id='apple' />
                <SmartphoneIcon className='h-5 w-5 text-gray-500' />
                <div className='flex-1'>
                  <Label htmlFor='apple' className='font-medium'>
                    Apple Pay
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    Quick and secure payment with Touch ID
                  </p>
                </div>
              </div>
            </RadioGroup>

            <div className='mt-6 p-3 bg-green-50 border border-green-200 rounded-md'>
              <p className='text-sm text-green-900'>
                <strong>Selected Method:</strong>{' '}
                {paymentMethod === 'card'
                  ? 'Credit Card'
                  : paymentMethod === 'paypal'
                    ? 'PayPal'
                    : paymentMethod === 'bank'
                      ? 'Bank Transfer'
                      : 'Apple Pay'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ComponentStory>
  )
}

export const PaymentMethods: Story = {
  render: () => <PaymentMethodsComponent />,
}

const TravelOptionsComponent = () => {
  const [transport, setTransport] = useState('plane')

  return (
    <ComponentStory
      title='Travel Transportation Options'
      description='Radio group for selecting transportation method with detailed information'
      background='gradient-purple'
    >
      <div className='max-w-2xl mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle>Choose Transportation</CardTitle>
            <CardDescription>
              Select your preferred method of travel to your destination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={transport} onValueChange={setTransport} className='space-y-4'>
              <div className='flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50'>
                <RadioGroupItem value='plane' id='plane' className='mt-1' />
                <PlaneIcon className='h-6 w-6 text-gray-500 mt-0.5' />
                <div className='flex-1'>
                  <Label htmlFor='plane' className='font-medium text-base'>
                    Flight
                  </Label>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Fastest option - Direct flights available
                  </p>
                  <div className='mt-2 flex items-center space-x-4 text-xs text-muted-foreground'>
                    <span>⏱️ 2-8 hours</span>
                    <span>💰 $200-800</span>
                    <span>🌍 Global coverage</span>
                  </div>
                </div>
              </div>

              <div className='flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50'>
                <RadioGroupItem value='car' id='car' className='mt-1' />
                <CarIcon className='h-6 w-6 text-gray-500 mt-0.5' />
                <div className='flex-1'>
                  <Label htmlFor='car' className='font-medium text-base'>
                    Rental Car
                  </Label>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Freedom to explore - Stop anywhere you want
                  </p>
                  <div className='mt-2 flex items-center space-x-4 text-xs text-muted-foreground'>
                    <span>⏱️ Variable</span>
                    <span>💰 $30-100/day</span>
                    <span>🗺️ Door-to-door</span>
                  </div>
                </div>
              </div>

              <div className='flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50'>
                <RadioGroupItem value='train' id='train' className='mt-1' />
                <TrainIcon className='h-6 w-6 text-gray-500 mt-0.5' />
                <div className='flex-1'>
                  <Label htmlFor='train' className='font-medium text-base'>
                    Train
                  </Label>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Scenic route - Comfortable and eco-friendly
                  </p>
                  <div className='mt-2 flex items-center space-x-4 text-xs text-muted-foreground'>
                    <span>⏱️ 4-12 hours</span>
                    <span>💰 $50-300</span>
                    <span>🌱 Eco-friendly</span>
                  </div>
                </div>
              </div>

              <div className='flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50'>
                <RadioGroupItem value='bus' id='bus' className='mt-1' />
                <div className='h-6 w-6 bg-gray-400 rounded flex items-center justify-center mt-0.5'>
                  <span className='text-white text-xs font-bold'>🚌</span>
                </div>
                <div className='flex-1'>
                  <Label htmlFor='bus' className='font-medium text-base'>
                    Bus
                  </Label>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Budget-friendly - Meet fellow travelers
                  </p>
                  <div className='mt-2 flex items-center space-x-4 text-xs text-muted-foreground'>
                    <span>⏱️ 6-20 hours</span>
                    <span>💰 $20-150</span>
                    <span>👥 Social experience</span>
                  </div>
                </div>
              </div>
            </RadioGroup>

            <div className='mt-6 p-4 bg-purple-50 border border-purple-200 rounded-md'>
              <h4 className='font-medium text-purple-900 mb-2'>Your Selection:</h4>
              <p className='text-sm text-purple-800'>
                You've chosen{' '}
                <strong>
                  {transport === 'plane'
                    ? 'Flight'
                    : transport === 'car'
                      ? 'Rental Car'
                      : transport === 'train'
                        ? 'Train'
                        : 'Bus'}
                </strong>{' '}
                as your transportation method.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ComponentStory>
  )
}

export const TravelOptions: Story = {
  render: () => <TravelOptionsComponent />,
}

const SettingsComponent = () => {
  const [theme, setTheme] = useState('system')
  const [notifications, setNotifications] = useState('all')
  const [privacy, setPrivacy] = useState('friends')

  return (
    <ComponentStory
      title='Settings & Preferences'
      description='Multiple radio groups for different setting categories'
      background='gradient-orange'
    >
      <div className='max-w-2xl mx-auto space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Display Theme</CardTitle>
            <CardDescription>Choose your preferred color theme</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={setTheme}>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='light' id='light' />
                <Label htmlFor='light'>Light theme</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='dark' id='dark' />
                <Label htmlFor='dark'>Dark theme</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='system' id='system' />
                <Label htmlFor='system'>System default</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Control what notifications you receive</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={notifications} onValueChange={setNotifications}>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='all' id='all' />
                <Label htmlFor='all'>All notifications</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='important' id='important' />
                <Label htmlFor='important'>Important only</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='none' id='none' />
                <Label htmlFor='none'>No notifications</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy Level</CardTitle>
            <CardDescription>Who can see your travel plans</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={privacy} onValueChange={setPrivacy}>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='public' id='public' />
                <Label htmlFor='public'>Public - Anyone can see</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='friends' id='friends' />
                <Label htmlFor='friends'>Friends only</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='private' id='private' />
                <Label htmlFor='private'>Private - Only me</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className='bg-orange-50 p-4 border border-orange-200 rounded-lg'>
          <h4 className='font-medium text-orange-900 mb-2'>Current Settings:</h4>
          <div className='text-sm text-orange-800 space-y-1'>
            <p>
              <strong>Theme:</strong>{' '}
              {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System Default'}
            </p>
            <p>
              <strong>Notifications:</strong>{' '}
              {notifications === 'all'
                ? 'All notifications'
                : notifications === 'important'
                  ? 'Important only'
                  : 'No notifications'}
            </p>
            <p>
              <strong>Privacy:</strong>{' '}
              {privacy === 'public' ? 'Public' : privacy === 'friends' ? 'Friends only' : 'Private'}
            </p>
          </div>
        </div>
      </div>
    </ComponentStory>
  )
}

export const Settings: Story = {
  render: () => <SettingsComponent />,
}

const DisabledStatesComponent = () => {
  const [value, setValue] = useState('option1')

  return (
    <ComponentStory
      title='Disabled Radio Options'
      description='Radio group with some disabled options and states'
      background='gradient-pink'
    >
      <div className='max-w-md mx-auto space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>Choose your plan (some options may be unavailable)</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={value} onValueChange={setValue} className='space-y-4'>
              <div className='flex items-start space-x-3 p-3 border rounded-lg'>
                <RadioGroupItem value='option1' id='free' />
                <div className='flex-1'>
                  <Label htmlFor='free' className='font-medium'>
                    Free Plan
                  </Label>
                  <p className='text-sm text-muted-foreground'>Basic features, limited trips</p>
                  <div className='text-xs text-green-600 font-medium'>Available</div>
                </div>
              </div>

              <div className='flex items-start space-x-3 p-3 border rounded-lg'>
                <RadioGroupItem value='option2' id='pro' />
                <div className='flex-1'>
                  <Label htmlFor='pro' className='font-medium'>
                    Pro Plan
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    Unlimited trips, advanced features
                  </p>
                  <div className='text-xs text-green-600 font-medium'>$9.99/month</div>
                </div>
              </div>

              <div className='flex items-start space-x-3 p-3 border rounded-lg opacity-50'>
                <RadioGroupItem value='option3' id='enterprise' disabled />
                <div className='flex-1'>
                  <Label htmlFor='enterprise' className='font-medium'>
                    Enterprise Plan
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    Team features, custom integrations
                  </p>
                  <div className='text-xs text-red-600 font-medium'>Coming Soon</div>
                </div>
              </div>

              <div className='flex items-start space-x-3 p-3 border rounded-lg opacity-50'>
                <RadioGroupItem value='option4' id='lifetime' disabled />
                <div className='flex-1'>
                  <Label htmlFor='lifetime' className='font-medium'>
                    Lifetime Access
                  </Label>
                  <p className='text-sm text-muted-foreground'>One-time payment, lifetime access</p>
                  <div className='text-xs text-red-600 font-medium'>Sold Out</div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className='bg-pink-50 p-4 border border-pink-200 rounded-lg'>
          <h4 className='font-medium text-pink-900 mb-2'>Disabled Options:</h4>
          <ul className='text-sm text-pink-800 space-y-1'>
            <li>• Enterprise Plan: Feature in development</li>
            <li>• Lifetime Access: Limited availability reached</li>
            <li>• Disabled options cannot be selected</li>
            <li>• Visual styling indicates unavailable state</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  )
}

export const DisabledStates: Story = {
  render: () => <DisabledStatesComponent />,
}

const FormIntegrationComponent = () => {
  const [formData, setFormData] = useState({
    size: 'medium',
    crust: 'thin',
    delivery: 'pickup',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Order submitted!\n${JSON.stringify(formData, null, 2)}`)
  }

  return (
    <ComponentStory
      title='Radio Groups in Forms'
      description='Radio groups integrated within a form with validation and submission'
      background='gradient-blue'
    >
      <div className='max-w-lg mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle>Pizza Order Form</CardTitle>
            <CardDescription>Customize your pizza order</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <h4 className='font-medium mb-3'>Size</h4>
                <RadioGroup
                  value={formData.size}
                  onValueChange={value => setFormData(prev => ({ ...prev, size: value }))}
                >
                  <div className='flex items-center justify-between p-2 border rounded'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='small' id='small' />
                      <Label htmlFor='small'>Small (8")</Label>
                    </div>
                    <span className='text-sm text-muted-foreground'>$12.99</span>
                  </div>
                  <div className='flex items-center justify-between p-2 border rounded'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='medium' id='medium' />
                      <Label htmlFor='medium'>Medium (12")</Label>
                    </div>
                    <span className='text-sm text-muted-foreground'>$16.99</span>
                  </div>
                  <div className='flex items-center justify-between p-2 border rounded'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='large' id='large' />
                      <Label htmlFor='large'>Large (16")</Label>
                    </div>
                    <span className='text-sm text-muted-foreground'>$20.99</span>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h4 className='font-medium mb-3'>Crust Type</h4>
                <RadioGroup
                  value={formData.crust}
                  onValueChange={value => setFormData(prev => ({ ...prev, crust: value }))}
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='thin' id='thin' />
                    <Label htmlFor='thin'>Thin & Crispy</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='thick' id='thick' />
                    <Label htmlFor='thick'>Thick & Chewy</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='stuffed' id='stuffed' />
                    <Label htmlFor='stuffed'>Stuffed Crust (+$2.00)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h4 className='font-medium mb-3'>Delivery Option</h4>
                <RadioGroup
                  value={formData.delivery}
                  onValueChange={value => setFormData(prev => ({ ...prev, delivery: value }))}
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='pickup' id='pickup' />
                    <Label htmlFor='pickup'>Pickup (Free)</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='delivery' id='delivery' />
                    <Label htmlFor='delivery'>Delivery (+$3.99)</Label>
                  </div>
                </RadioGroup>
              </div>

              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors'
              >
                Place Order
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ComponentStory>
  )
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationComponent />,
}
