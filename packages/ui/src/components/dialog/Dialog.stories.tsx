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
} from './Dialog'
import { Button } from '../button'
import { Input } from '../input'
import { Label } from '../label'
import { AlertTriangleIcon, UserIcon } from 'lucide-react'

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
  )
}

export const FormDialog: Story = {
  render: () => <FormDialogComponent />,
}
