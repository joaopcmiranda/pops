import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import { Button } from '../button/button'
import { Input } from '../input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select'
import { Checkbox } from '../checkbox'
import { RadioGroup, RadioGroupItem } from '../radio-group'
import { Switch } from '../switch'
import { ComponentStory } from '../../StoryWrapper'
import '../../../styles/story-fonts.css'

// Basic form schema
const basicFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  age: z
    .number()
    .min(18, 'Must be at least 18 years old')
    .max(120, 'Must be less than 120 years old'),
})

const meta: Meta<typeof Form> = {
  title: 'Components/UI/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const BasicFormComponent = () => {
  const form = useForm<z.infer<typeof basicFormSchema>>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 25,
    },
  })

  const onSubmit = (values: z.infer<typeof basicFormSchema>) => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <ComponentStory
      title='Basic Form'
      description='A simple form with validation using react-hook-form and zod'
      background='gradient-blue'
    >
      <div className='w-full max-w-md mx-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your name' {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormDescription>We'll never share your email with anyone else.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='age'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter your age'
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>You must be at least 18 years old.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </ComponentStory>
  )
}

export const BasicForm: Story = {
  render: () => <BasicFormComponent />,
}

// Registration form schema
const registrationSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    country: z.string().min(1, 'Please select a country'),
    agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

const RegistrationFormComponent = () => {
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      agreeToTerms: false,
    },
  })

  const onSubmit = (values: z.infer<typeof registrationSchema>) => {
    alert('Registration successful!\n' + JSON.stringify(values, null, 2))
  }

  return (
    <ComponentStory
      title='Registration Form'
      description='A comprehensive registration form with various input types and validation'
      background='gradient-green'
    >
      <div className='w-full max-w-md mx-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Choose a username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='your@email.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Enter password' {...field} />
                  </FormControl>
                  <FormDescription>Must be at least 8 characters long.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Confirm password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a country' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='us'>United States</SelectItem>
                      <SelectItem value='uk'>United Kingdom</SelectItem>
                      <SelectItem value='ca'>Canada</SelectItem>
                      <SelectItem value='au'>Australia</SelectItem>
                      <SelectItem value='de'>Germany</SelectItem>
                      <SelectItem value='fr'>France</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='agreeToTerms'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>I agree to the terms and conditions</FormLabel>
                    <FormDescription>
                      You must agree to our terms to create an account.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Create Account
            </Button>
          </form>
        </Form>
      </div>
    </ComponentStory>
  )
}

export const RegistrationForm: Story = {
  render: () => <RegistrationFormComponent />,
}

// Profile settings schema
const profileSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    marketing: z.boolean(),
  }),
  theme: z.enum(['light', 'dark', 'system']),
  language: z.string().min(1, 'Please select a language'),
})

const ProfileSettingsComponent = () => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: 'John Doe',
      bio: '',
      website: '',
      notifications: {
        email: true,
        push: false,
        marketing: false,
      },
      theme: 'system',
      language: 'en',
    },
  })

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    alert('Profile updated!\n' + JSON.stringify(values, null, 2))
  }

  return (
    <ComponentStory
      title='Profile Settings Form'
      description='A complex form with radio groups, switches, and nested objects'
      background='gradient-purple'
    >
      <div className='w-full max-w-md mx-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='displayName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Your display name' {...field} />
                  </FormControl>
                  <FormDescription>This is how others will see your name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder='Tell us about yourself...'
                      className='w-full min-h-[80px] p-2 border rounded-md resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional. Max 500 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder='https://yourwebsite.com' {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional. Your personal or professional website.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-3'>
              <FormLabel>Notification Preferences</FormLabel>
              <FormField
                control={form.control}
                name='notifications.email'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                    <div className='space-y-0.5'>
                      <FormLabel>Email Notifications</FormLabel>
                      <FormDescription>Receive notifications via email</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='notifications.push'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                    <div className='space-y-0.5'>
                      <FormLabel>Push Notifications</FormLabel>
                      <FormDescription>Receive push notifications on your device</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='notifications.marketing'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3'>
                    <div className='space-y-0.5'>
                      <FormLabel>Marketing Communications</FormLabel>
                      <FormDescription>
                        Receive updates about new features and offers
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='theme'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Theme Preference</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='light' />
                        </FormControl>
                        <FormLabel className='font-normal'>Light</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='dark' />
                        </FormControl>
                        <FormLabel className='font-normal'>Dark</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='system' />
                        </FormControl>
                        <FormLabel className='font-normal'>System</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='language'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a language' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='en'>English</SelectItem>
                      <SelectItem value='es'>Spanish</SelectItem>
                      <SelectItem value='fr'>French</SelectItem>
                      <SelectItem value='de'>German</SelectItem>
                      <SelectItem value='it'>Italian</SelectItem>
                      <SelectItem value='pt'>Portuguese</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </ComponentStory>
  )
}

export const ProfileSettings: Story = {
  render: () => <ProfileSettingsComponent />,
}

// Trip planning form schema
const tripPlanningSchema = z.object({
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  budget: z.number().min(1, 'Budget must be greater than 0'),
  travelers: z.number().min(1, 'At least 1 traveler is required'),
  accommodationType: z.enum(['hotel', 'hostel', 'airbnb', 'camping']),
  activities: z.array(z.string()).min(1, 'Select at least one activity'),
  specialRequirements: z.string().optional(),
})

const TripPlanningFormComponent = () => {
  const form = useForm<z.infer<typeof tripPlanningSchema>>({
    resolver: zodResolver(tripPlanningSchema),
    defaultValues: {
      destination: '',
      startDate: '',
      endDate: '',
      budget: 1000,
      travelers: 2,
      accommodationType: 'hotel',
      activities: [],
      specialRequirements: '',
    },
  })

  const onSubmit = (values: z.infer<typeof tripPlanningSchema>) => {
    alert('Trip planned!\n' + JSON.stringify(values, null, 2))
  }

  const activityOptions = [
    'sightseeing',
    'adventure',
    'culture',
    'food',
    'nightlife',
    'shopping',
    'nature',
    'relaxation',
  ]

  return (
    <ComponentStory
      title='Trip Planning Form'
      description='A specialized form for trip planning with various input types'
      background='gradient-orange'
    >
      <div className='w-full max-w-md mx-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='destination'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input placeholder='Where do you want to go?' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='budget'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget ($)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='1000'
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='travelers'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Travelers</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='2'
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='accommodationType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accommodation Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select accommodation type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='hotel'>Hotel</SelectItem>
                      <SelectItem value='hostel'>Hostel</SelectItem>
                      <SelectItem value='airbnb'>Airbnb</SelectItem>
                      <SelectItem value='camping'>Camping</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='activities'
              render={() => (
                <FormItem>
                  <div className='mb-4'>
                    <FormLabel>Preferred Activities</FormLabel>
                    <FormDescription>Select all activities you're interested in</FormDescription>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    {activityOptions.map(activity => (
                      <FormField
                        key={activity}
                        control={form.control}
                        name='activities'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={activity}
                              className='flex flex-row items-start space-x-3 space-y-0'
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(activity)}
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange([...field.value, activity])
                                      : field.onChange(
                                          field.value?.filter(value => value !== activity)
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='text-sm font-normal capitalize'>
                                {activity}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='specialRequirements'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requirements</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder='Any special requirements or requests...'
                      className='w-full min-h-[60px] p-2 border rounded-md resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional. Accessibility needs, dietary restrictions, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              Plan My Trip
            </Button>
          </form>
        </Form>
      </div>
    </ComponentStory>
  )
}

export const TripPlanningForm: Story = {
  render: () => <TripPlanningFormComponent />,
}
