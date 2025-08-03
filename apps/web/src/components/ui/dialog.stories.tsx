import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialog'
import { Button } from './button/button'
import { Input } from './input'
import { Label } from './label'
import { ModalStory } from '../StoryWrapper'
import {
  AlertTriangleIcon,
  InfoIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  SettingsIcon,
} from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Dialog> = {
  title: 'Components/UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ModalStory
      title='Basic Dialog'
      description='A simple dialog with trigger button and basic content'
      background='gradient-blue'
    >
      <div className='text-center'>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a basic dialog with a title and description. You can place any content here.
              </DialogDescription>
            </DialogHeader>
            <div className='py-4'>
              <p className='text-sm text-muted-foreground'>
                This is the main content area of the dialog. You can add forms, text, or any other
                components here.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ModalStory>
  ),
}

const ConfirmationDialogComponent = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setDeleteOpen(false)
      alert('Item deleted successfully!')
    }, 2000)
  }

  return (
    <ModalStory
      title='Confirmation Dialog'
      description='A destructive confirmation dialog with warning icon and actions'
      background='gradient-orange'
    >
      <div className='text-center'>
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger asChild>
            <Button variant='destructive'>Delete Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div className='flex items-center gap-2'>
                <AlertTriangleIcon className='h-5 w-5 text-red-500' />
                <DialogTitle>Delete Confirmation</DialogTitle>
              </div>
              <DialogDescription>
                Are you sure you want to delete this item? This action cannot be undone and will
                permanently remove the data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className='py-4'>
              <div className='bg-red-50 border border-red-200 rounded-md p-3'>
                <p className='text-sm text-red-800 font-medium'>This action is irreversible</p>
                <p className='text-sm text-red-700'>Once deleted, this item cannot be recovered.</p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' disabled={isDeleting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button variant='destructive' onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ModalStory>
  )
}

export const ConfirmationDialog: Story = {
  render: () => <ConfirmationDialogComponent />,
}

const FormDialogComponent = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form submitted!\nName: ${name}\nEmail: ${email}`)
    setFormOpen(false)
    setName('')
    setEmail('')
  }

  return (
    <ModalStory
      title='Form Dialog'
      description='A dialog containing a form with input fields and validation'
      background='gradient-green'
    >
      <div className='text-center'>
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserIcon className='mr-2 h-4 w-4' />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Fill in the user details below. All fields are required.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className='space-y-4 py-4'>
                <div>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    placeholder='Enter full name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter email address'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type='button' variant='outline'>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type='submit' disabled={!name || !email}>
                  Add User
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </ModalStory>
  )
}

export const FormDialog: Story = {
  render: () => <FormDialogComponent />,
}

export const AlertDialogs: Story = {
  render: () => (
    <ModalStory
      title='Alert Dialogs'
      description='Different types of alert dialogs for various use cases'
      background='gradient-purple'
    >
      <div className='grid grid-cols-2 gap-4 max-w-md mx-auto'>
        {/* Success Alert */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='text-green-600 border-green-200 hover:bg-green-50'>
              Success
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div className='flex items-center gap-2'>
                <CheckCircleIcon className='h-5 w-5 text-green-500' />
                <DialogTitle className='text-green-900'>Success!</DialogTitle>
              </div>
              <DialogDescription>
                Your operation completed successfully. All changes have been saved.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>OK</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Error Alert */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='text-red-600 border-red-200 hover:bg-red-50'>
              Error
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div className='flex items-center gap-2'>
                <XCircleIcon className='h-5 w-5 text-red-500' />
                <DialogTitle className='text-red-900'>Error Occurred</DialogTitle>
              </div>
              <DialogDescription>
                Something went wrong while processing your request. Please try again later.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Dismiss</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Try Again</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Warning Alert */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='outline'
              className='text-yellow-600 border-yellow-200 hover:bg-yellow-50'
            >
              Warning
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div className='flex items-center gap-2'>
                <AlertTriangleIcon className='h-5 w-5 text-yellow-500' />
                <DialogTitle className='text-yellow-900'>Warning</DialogTitle>
              </div>
              <DialogDescription>
                This action may have unintended consequences. Please review your changes before
                proceeding.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Proceed</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Info Alert */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='text-blue-600 border-blue-200 hover:bg-blue-50'>
              Info
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div className='flex items-center gap-2'>
                <InfoIcon className='h-5 w-5 text-blue-500' />
                <DialogTitle className='text-blue-900'>Information</DialogTitle>
              </div>
              <DialogDescription>
                Here's some important information you should know about this feature or process.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Got it</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ModalStory>
  ),
}

export const CustomSizes: Story = {
  render: () => (
    <ModalStory
      title='Dialog Sizes'
      description='Dialogs with different sizes and content layouts'
      background='gradient-pink'
    >
      <div className='grid grid-cols-3 gap-4 max-w-2xl mx-auto'>
        {/* Small Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' size='sm'>
              Small
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Small Dialog</DialogTitle>
              <DialogDescription>This is a compact dialog for simple messages.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button size='sm'>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Default Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>Default</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Default Dialog</DialogTitle>
              <DialogDescription>
                This is the standard dialog size with balanced content space.
              </DialogDescription>
            </DialogHeader>
            <div className='py-4'>
              <p className='text-sm text-muted-foreground'>
                Content area with more details and information.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button>Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Large Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' size='lg'>
              Large
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-2xl'>
            <DialogHeader>
              <DialogTitle>Large Dialog</DialogTitle>
              <DialogDescription>
                This is a spacious dialog for complex content and forms.
              </DialogDescription>
            </DialogHeader>
            <div className='py-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label>First Column</Label>
                  <Input placeholder='Enter text' />
                </div>
                <div>
                  <Label>Second Column</Label>
                  <Input placeholder='Enter text' />
                </div>
              </div>
              <div className='mt-4'>
                <Label>Full Width Field</Label>
                <Input placeholder='This field spans the full width' />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ModalStory>
  ),
}

export const NoCloseButton: Story = {
  render: () => (
    <ModalStory
      title='Dialog Without Close Button'
      description='A dialog that requires explicit user action to close'
      background='gradient-blue'
    >
      <div className='text-center'>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <SettingsIcon className='mr-2 h-4 w-4' />
              Important Setup
            </Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Complete Setup Required</DialogTitle>
              <DialogDescription>
                This setup step is mandatory and cannot be skipped. Please complete all required
                fields.
              </DialogDescription>
            </DialogHeader>
            <div className='py-4'>
              <div className='bg-yellow-50 border border-yellow-200 rounded-md p-3'>
                <p className='text-sm text-yellow-800 font-medium'>Required Action</p>
                <p className='text-sm text-yellow-700'>
                  You must complete this setup to continue using the application.
                </p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Skip (Not Recommended)</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Complete Setup</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ModalStory>
  ),
}

const InteractiveComponent = () => {
  const [step, setStep] = useState(1)
  const [wizardOpen, setWizardOpen] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setWizardOpen(false)
      setStep(1)
      alert('Wizard completed!')
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <ModalStory
      title='Multi-Step Wizard Dialog'
      description='An interactive dialog with multiple steps and navigation'
      background='gradient-green'
    >
      <div className='text-center'>
        <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
          <DialogTrigger asChild>
            <Button>Start Setup Wizard</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Setup Wizard - Step {step} of 3</DialogTitle>
              <DialogDescription>
                {step === 1 && "Let's start by gathering some basic information."}
                {step === 2 && "Now let's configure your preferences."}
                {step === 3 && "Finally, let's review your settings."}
              </DialogDescription>
            </DialogHeader>

            <div className='py-4'>
              {/* Progress indicator */}
              <div className='flex items-center gap-2 mb-4'>
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i <= step ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Step content */}
              {step === 1 && (
                <div className='space-y-3'>
                  <div>
                    <Label>Your Name</Label>
                    <Input placeholder='Enter your name' />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type='email' placeholder='Enter your email' />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className='space-y-3'>
                  <div>
                    <Label>Preferred Theme</Label>
                    <select className='w-full p-2 border rounded-md'>
                      <option>Light</option>
                      <option>Dark</option>
                      <option>Auto</option>
                    </select>
                  </div>
                  <div>
                    <Label>Notifications</Label>
                    <div className='flex items-center gap-2'>
                      <input type='checkbox' id='email-notifications' />
                      <label htmlFor='email-notifications' className='text-sm'>
                        Email notifications
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className='bg-gray-50 p-4 rounded-md'>
                  <h4 className='font-medium mb-2'>Review Your Settings</h4>
                  <ul className='text-sm space-y-1 text-muted-foreground'>
                    <li>• Name: John Doe</li>
                    <li>• Email: john@example.com</li>
                    <li>• Theme: Light</li>
                    <li>• Email notifications: Enabled</li>
                  </ul>
                </div>
              )}
            </div>

            <DialogFooter>
              {step > 1 && (
                <Button variant='outline' onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              <Button onClick={handleNext}>{step < 3 ? 'Next' : 'Complete'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ModalStory>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveComponent />,
}
