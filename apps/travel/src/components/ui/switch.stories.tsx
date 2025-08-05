import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './switch'
import { Label } from './label'
import { ComponentStory } from '../StoryWrapper'
import { useState } from 'react'
import { Bell, Mail, Shield, MapPin, DollarSign, Smartphone } from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Switch> = {
  title: 'Components/UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = () => <Switch />

export const BasicStates: Story = {
  render: () => (
    <ComponentStory
      title='Switch States'
      description='All basic switch states including off, on, and disabled'
      background='gradient-blue'
    >
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div className='flex items-center space-x-3'>
            <Switch id='switch-off' />
            <Label htmlFor='switch-off'>Off state (default)</Label>
          </div>

          <div className='flex items-center space-x-3'>
            <Switch id='switch-on' defaultChecked />
            <Label htmlFor='switch-on'>On state (checked)</Label>
          </div>

          <div className='flex items-center space-x-3'>
            <Switch id='switch-disabled-off' disabled />
            <Label htmlFor='switch-disabled-off' className='opacity-50'>
              Disabled off
            </Label>
          </div>

          <div className='flex items-center space-x-3'>
            <Switch id='switch-disabled-on' disabled defaultChecked />
            <Label htmlFor='switch-disabled-on' className='opacity-50'>
              Disabled on
            </Label>
          </div>
        </div>

        <div className='p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Switch Guidelines:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Use switches for binary on/off settings</li>
            <li>• Always pair with descriptive labels</li>
            <li>• Show immediate effect when toggled</li>
            <li>• Use disabled state when option is conditionally unavailable</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const NotificationSettings: Story = {
  render: () => (
    <ComponentStory
      title='Notification Settings'
      description='Real-world example of switches for managing notification preferences'
      background='gradient-green'
    >
      <div className='space-y-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm max-w-md'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <Bell className='w-5 h-5' />
            Notification Preferences
          </h3>

          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Mail className='w-4 h-4 text-gray-500' />
                <Label htmlFor='email-notifications' className='font-medium'>
                  Email Notifications
                </Label>
              </div>
              <Switch id='email-notifications' defaultChecked />
            </div>
            <p className='text-xs text-gray-500 ml-7'>
              Receive booking confirmations and trip updates via email
            </p>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Smartphone className='w-4 h-4 text-gray-500' />
                <Label htmlFor='push-notifications' className='font-medium'>
                  Push Notifications
                </Label>
              </div>
              <Switch id='push-notifications' />
            </div>
            <p className='text-xs text-gray-500 ml-7'>
              Get instant alerts for flight changes and important updates
            </p>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Shield className='w-4 h-4 text-gray-500' />
                <Label htmlFor='security-alerts' className='font-medium'>
                  Security Alerts
                </Label>
              </div>
              <Switch id='security-alerts' defaultChecked />
            </div>
            <p className='text-xs text-gray-500 ml-7'>
              Notify me of login attempts and account changes
            </p>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <MapPin className='w-4 h-4 text-gray-500' />
                <Label htmlFor='location-updates' className='font-medium'>
                  Location-Based Updates
                </Label>
              </div>
              <Switch id='location-updates' />
            </div>
            <p className='text-xs text-gray-500 ml-7'>
              Get recommendations and alerts based on your current location
            </p>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <DollarSign className='w-4 h-4 text-gray-500' />
                <Label htmlFor='deal-alerts' className='font-medium'>
                  Deal Alerts
                </Label>
              </div>
              <Switch id='deal-alerts' defaultChecked />
            </div>
            <p className='text-xs text-gray-500 ml-7'>
              Receive notifications about special offers and discounts
            </p>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const TripSettings: Story = {
  render: () => (
    <ComponentStory
      title='Trip Planning Settings'
      description='Trip-specific settings and preferences using switches'
      background='gradient-purple'
    >
      <div className='space-y-6'>
        <div className='bg-white p-6 rounded-lg border shadow-sm max-w-md'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            European Adventure 2024 - Settings
          </h3>

          <div className='space-y-5'>
            <div>
              <h4 className='text-sm font-semibold text-gray-700 mb-3'>Sharing & Privacy</h4>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='public-trip' className='font-medium'>
                    Make trip public
                  </Label>
                  <Switch id='public-trip' />
                </div>
                <p className='text-xs text-gray-500'>
                  Allow others to discover and follow your trip
                </p>

                <div className='flex items-center justify-between'>
                  <Label htmlFor='allow-followers' className='font-medium'>
                    Allow followers
                  </Label>
                  <Switch id='allow-followers' defaultChecked />
                </div>
                <p className='text-xs text-gray-500'>
                  Let people follow your trip updates and photos
                </p>
              </div>
            </div>

            <div>
              <h4 className='text-sm font-semibold text-gray-700 mb-3'>Booking Preferences</h4>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='auto-book' className='font-medium'>
                    Automatic booking
                  </Label>
                  <Switch id='auto-book' />
                </div>
                <p className='text-xs text-gray-500'>
                  Automatically book recommended activities when available
                </p>

                <div className='flex items-center justify-between'>
                  <Label htmlFor='budget-alerts' className='font-medium'>
                    Budget tracking
                  </Label>
                  <Switch id='budget-alerts' defaultChecked />
                </div>
                <p className='text-xs text-gray-500'>
                  Get alerts when approaching your spending limits
                </p>
              </div>
            </div>

            <div>
              <h4 className='text-sm font-semibold text-gray-700 mb-3'>Smart Features</h4>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='weather-sync' className='font-medium'>
                    Weather sync
                  </Label>
                  <Switch id='weather-sync' defaultChecked />
                </div>
                <p className='text-xs text-gray-500'>
                  Adjust recommendations based on weather forecasts
                </p>

                <div className='flex items-center justify-between'>
                  <Label htmlFor='offline-mode' className='font-medium'>
                    Offline mode
                  </Label>
                  <Switch id='offline-mode' />
                </div>
                <p className='text-xs text-gray-500'>
                  Download maps and essential info for offline access
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const InteractiveDemo: Story = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(false)
  const [locationSharing, setLocationSharing] = useState(true)
  return (
    <ComponentStory
      title='Interactive Switch Demo'
      description='Dynamic switches with state management and visual feedback'
      background='gradient-orange'
    >
      <div className='space-y-6 max-w-md'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>App Preferences</h3>

          <div className='space-y-4'>
            <div className='flex items-center justify-between p-3 rounded-lg bg-gray-50'>
              <div>
                <Label htmlFor='dark-mode-switch' className='font-medium'>
                  Dark Mode
                </Label>
                <p className='text-xs text-gray-500'>
                  {darkMode ? 'Dark theme enabled' : 'Light theme active'}
                </p>
              </div>
              <Switch id='dark-mode-switch' checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className='flex items-center justify-between p-3 rounded-lg bg-gray-50'>
              <div>
                <Label htmlFor='notifications-switch' className='font-medium'>
                  Push Notifications
                </Label>
                <p className='text-xs text-gray-500'>
                  {notifications ? 'You will receive notifications' : 'Notifications are disabled'}
                </p>
              </div>
              <Switch
                id='notifications-switch'
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className='flex items-center justify-between p-3 rounded-lg bg-gray-50'>
              <div>
                <Label htmlFor='auto-save-switch' className='font-medium'>
                  Auto-save Changes
                </Label>
                <p className='text-xs text-gray-500'>
                  {autoSave ? 'Changes saved automatically' : 'Manual save required'}
                </p>
              </div>
              <Switch id='auto-save-switch' checked={autoSave} onCheckedChange={setAutoSave} />
            </div>

            <div className='flex items-center justify-between p-3 rounded-lg bg-gray-50'>
              <div>
                <Label htmlFor='location-switch' className='font-medium'>
                  Location Sharing
                </Label>
                <p className='text-xs text-gray-500'>
                  {locationSharing
                    ? 'Sharing location with trip members'
                    : 'Location sharing disabled'}
                </p>
              </div>
              <Switch
                id='location-switch'
                checked={locationSharing}
                onCheckedChange={setLocationSharing}
              />
            </div>
          </div>

          <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100'>
            <h4 className='font-semibold text-blue-900 mb-2'>Current Settings:</h4>
            <ul className='text-sm text-blue-800 space-y-1'>
              <li>• Dark Mode: {darkMode ? 'Enabled' : 'Disabled'}</li>
              <li>• Notifications: {notifications ? 'Enabled' : 'Disabled'}</li>
              <li>• Auto-save: {autoSave ? 'Enabled' : 'Disabled'}</li>
              <li>• Location: {locationSharing ? 'Shared' : 'Private'}</li>
            </ul>
          </div>
        </div>

        <div className='p-4 bg-orange-50 rounded-lg border border-orange-100'>
          <h4 className='font-semibold text-orange-900 mb-2'>Interactive Features:</h4>
          <ul className='text-sm text-orange-800 space-y-1'>
            <li>• Real-time state updates</li>
            <li>• Dynamic description changes</li>
            <li>• Visual feedback on toggle</li>
            <li>• Settings summary display</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  )
}

export const AccessibilityDemo: Story = {
  render: () => (
    <ComponentStory
      title='Accessibility Settings'
      description='Switches for accessibility and user experience preferences'
      background='gradient-pink'
    >
      <div className='space-y-6 max-w-md'>
        <div className='bg-white p-6 rounded-lg border shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>Accessibility Preferences</h3>

          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='reduce-motion' className='font-medium'>
                  Reduce motion
                </Label>
                <p className='text-xs text-gray-500'>Minimize animations and transitions</p>
              </div>
              <Switch id='reduce-motion' />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='high-contrast' className='font-medium'>
                  High contrast mode
                </Label>
                <p className='text-xs text-gray-500'>Increase contrast for better visibility</p>
              </div>
              <Switch id='high-contrast' />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='large-text' className='font-medium'>
                  Large text
                </Label>
                <p className='text-xs text-gray-500'>Increase font size for better readability</p>
              </div>
              <Switch id='large-text' />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='screen-reader' className='font-medium'>
                  Screen reader optimized
                </Label>
                <p className='text-xs text-gray-500'>Optimize interface for screen readers</p>
              </div>
              <Switch id='screen-reader' />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <Label htmlFor='keyboard-nav' className='font-medium'>
                  Enhanced keyboard navigation
                </Label>
                <p className='text-xs text-gray-500'>Show focus indicators and shortcuts</p>
              </div>
              <Switch id='keyboard-nav' defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const CompactLayout: Story = {
  render: () => (
    <ComponentStory
      title='Compact Switch Layout'
      description='Switches in compact layouts and card configurations'
      background='gradient-green'
    >
      <div className='space-y-6 max-w-sm'>
        <div className='bg-white rounded-lg border shadow-sm divide-y'>
          <div className='p-4'>
            <h3 className='font-semibold text-gray-900 mb-3'>Quick Settings</h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='wifi' className='text-sm'>
                  WiFi
                </Label>
                <Switch id='wifi' defaultChecked />
              </div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='bluetooth' className='text-sm'>
                  Bluetooth
                </Label>
                <Switch id='bluetooth' />
              </div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='mobile-data' className='text-sm'>
                  Mobile Data
                </Label>
                <Switch id='mobile-data' defaultChecked />
              </div>
            </div>
          </div>

          <div className='p-4'>
            <h4 className='font-medium text-gray-900 mb-3'>Privacy</h4>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='location-services' className='text-sm'>
                  Location Services
                </Label>
                <Switch id='location-services' defaultChecked />
              </div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='analytics' className='text-sm'>
                  Analytics
                </Label>
                <Switch id='analytics' />
              </div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='crash-reports' className='text-sm'>
                  Crash Reports
                </Label>
                <Switch id='crash-reports' defaultChecked />
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <div className='bg-white p-4 rounded-lg border shadow-sm text-center'>
            <h4 className='font-medium text-gray-900 mb-2'>Offline Maps</h4>
            <Switch id='offline-maps' />
            <p className='text-xs text-gray-500 mt-2'>Download for offline use</p>
          </div>

          <div className='bg-white p-4 rounded-lg border shadow-sm text-center'>
            <h4 className='font-medium text-gray-900 mb-2'>Auto Backup</h4>
            <Switch id='auto-backup' defaultChecked />
            <p className='text-xs text-gray-500 mt-2'>Backup trip data daily</p>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
