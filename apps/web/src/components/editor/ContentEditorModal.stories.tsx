import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import ContentEditorModal from './ContentEditorModal'
import { Button } from '../ui/button/button'
import type { ContentEditorModalProps } from './types'
import type { ContentItem } from '../../services/contentService'

const meta: Meta<typeof ContentEditorModal> = {
  title: 'Editor/ContentEditorModal',
  component: ContentEditorModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A full-screen modal editor for creating and editing travel content with distraction-free writing experience.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    category: {
      control: 'select',
      options: [
        'destinations',
        'itinerary',
        'transport',
        'accommodation',
        'activities',
        'budget',
        'documents',
      ],
      description: 'Content category',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when modal is closed',
    },
    onSave: {
      action: 'onSave',
      description: 'Callback when content is saved',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleContentItem: ContentItem = {
  id: 'rio-de-janeiro',
  title: 'Rio de Janeiro Travel Guide',
  slug: 'rio-de-janeiro',
  category: 'destinations',
  content: `
    <h1>Rio de Janeiro</h1>
    <h2>Overview</h2>
    <p>The vibrant city known for its beaches, culture, and iconic landmarks.</p>
    <h2>Must-See Attractions</h2>
    <ul>
      <li><strong>Christ the Redeemer</strong> - Iconic statue atop Corcovado Mountain</li>
      <li><strong>Sugarloaf Mountain</strong> - Cable car with panoramic views</li>
      <li><strong>Copacabana Beach</strong> - Famous beach with stunning coastline</li>
      <li><strong>Ipanema Beach</strong> - Trendy beach neighborhood</li>
    </ul>
    <h2>Transportation</h2>
    <p><strong>Getting There:</strong> Galeão International Airport (GIG)</p>
    <p><strong>Getting Around:</strong> Metro, buses, taxis, Uber</p>
    <blockquote>
      <p>💡 <strong>Travel Tip:</strong> Plan for at least 3-4 days to see the main attractions!</p>
    </blockquote>
  `,
  lastModified: new Date(),
}

export const EditExistingContent: Story = {
  render: (args: ContentEditorModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className='p-8'>
        <Button onClick={() => setIsOpen(true)}>Open Content Editor</Button>
        <ContentEditorModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  },
  args: {
    contentItem: sampleContentItem,
    category: 'destinations',
    slug: 'rio-de-janeiro',
    title: 'Rio de Janeiro',
    isOpen: false,
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal editor for editing existing content with pre-filled title and content.',
      },
    },
  },
}

export const CreateNewContent: Story = {
  render: (args: ContentEditorModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className='p-8'>
        <Button onClick={() => setIsOpen(true)}>Open Content Editor</Button>
        <ContentEditorModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  },
  args: {
    contentItem: null,
    category: 'destinations',
    slug: 'new-destination',
    title: 'New Destination',
    isOpen: false,
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal editor for creating new content from scratch.',
      },
    },
  },
}

export const ItineraryContent: Story = {
  render: (args: ContentEditorModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className='p-8'>
        <Button onClick={() => setIsOpen(true)}>Open Content Editor</Button>
        <ContentEditorModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  },
  args: {
    contentItem: {
      id: 'day-1-rio',
      title: 'Day 1 - Arrival in Rio',
      slug: 'day-1-rio',
      category: 'itinerary',
      content: `
        <h1>Day 1 - Arrival in Rio de Janeiro</h1>
        <h2>Morning</h2>
        <ul class="task-list">
          <li><input type="checkbox" checked> <strong>9:00 AM</strong> - Land at Galeão International Airport</li>
          <li><input type="checkbox"> <strong>10:30 AM</strong> - Take taxi/Uber to hotel in Copacabana</li>
          <li><input type="checkbox"> <strong>12:00 PM</strong> - Light lunch at local café</li>
        </ul>
        <h2>Afternoon</h2>
        <ul class="task-list">
          <li><input type="checkbox"> <strong>2:00 PM</strong> - Walk along Copacabana Beach</li>
          <li><input type="checkbox"> <strong>3:30 PM</strong> - Visit Forte de Copacabana</li>
          <li><input type="checkbox"> <strong>5:00 PM</strong> - Explore local shops</li>
        </ul>
      `,
      lastModified: new Date(),
    },
    category: 'itinerary',
    slug: 'day-1-rio',
    title: 'Itinerary Planning',
    isOpen: false,
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal editor configured for itinerary content with task lists and scheduling.',
      },
    },
  },
}

export const BudgetContent: Story = {
  render: (args: ContentEditorModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className='p-8'>
        <Button onClick={() => setIsOpen(true)}>Open Content Editor</Button>
        <ContentEditorModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  },
  args: {
    contentItem: {
      id: 'rio-budget',
      title: 'Rio Trip Budget',
      slug: 'rio-budget',
      category: 'budget',
      content: `
        <h1>Rio Trip Budget Breakdown</h1>
        <h2>Accommodation</h2>
        <table>
          <thead>
            <tr><th>Item</th><th>Cost</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td>Hotel (7 nights)</td><td>$1,200</td><td>Copacabana Palace</td></tr>
            <tr><td>Resort fees</td><td>$50</td><td>-</td></tr>
          </tbody>
        </table>
        <h2>Transportation</h2>
        <table>
          <thead>
            <tr><th>Item</th><th>Cost</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td>Flights (roundtrip)</td><td>$850</td><td>Economy class</td></tr>
            <tr><td>Airport transfers</td><td>$60</td><td>Taxi/Uber</td></tr>
            <tr><td>Local transport</td><td>$100</td><td>Metro, buses</td></tr>
          </tbody>
        </table>
        <blockquote>
          <p><strong>Total Estimated Cost: $2,260</strong></p>
        </blockquote>
      `,
      lastModified: new Date(),
    },
    category: 'budget',
    slug: 'rio-budget',
    title: 'Budget Planning',
    isOpen: false,
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal editor for budget content with tables and financial calculations.',
      },
    },
  },
}

export const StaticDemo: Story = {
  render: (args: ContentEditorModalProps) => <ContentEditorModal {...args} />,
  args: {
    isOpen: true,
    contentItem: sampleContentItem,
    category: 'destinations',
    slug: 'rio-de-janeiro',
    title: 'Rio de Janeiro',
    onClose: () => {},
    onSave: async () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Static demo showing the modal editor interface (always open for demonstration).',
      },
    },
  },
}
