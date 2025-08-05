import type { Meta, StoryObj } from '@storybook/react-vite'
import InlineContentEditor from './InlineContentEditor'
import type { ContentItem } from '../../services/contentService'

interface InlineContentEditorProps {
  contentItem: ContentItem
  category: string
  onSave?: (content: ContentItem) => Promise<void>
  onCancel?: () => void
  className?: string
  showToolbar?: boolean
  placeholder?: string
}

const meta: Meta<typeof InlineContentEditor> = {
  title: 'Editor/InlineContentEditor',
  component: InlineContentEditor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An inline editor that allows click-to-edit functionality for quick content updates without opening a modal.',
      },
    },
  },
  argTypes: {
    showToolbar: {
      control: 'boolean',
      description: 'Whether to show the formatting toolbar when editing',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when content is empty',
    },
    onSave: {
      action: 'onSave',
      description: 'Callback when content is saved',
    },
    onCancel: {
      action: 'onCancel',
      description: 'Callback when editing is cancelled',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleContentItem: ContentItem = {
  id: 'quick-note',
  title: 'Quick Travel Note',
  slug: 'quick-note',
  category: 'destinations',
  content: `
    <p>This is a quick travel note that can be edited inline. <strong>Click anywhere</strong> on this text to start editing!</p>
    <p>You can format text with <em>italic</em>, <strong>bold</strong>, and even add links or lists:</p>
    <ul>
      <li>Flight details</li>
      <li>Hotel confirmation</li>
      <li>Activity bookings</li>
    </ul>
  `,
  lastModified: new Date(),
}

const shortContentItem: ContentItem = {
  id: 'short-note',
  title: 'Short Note',
  slug: 'short-note',
  category: 'destinations',
  content: "<p>A short travel reminder: Don't forget your passport!</p>",
  lastModified: new Date(),
}

const emptyContentItem: ContentItem = {
  id: 'empty-note',
  title: 'Empty Note',
  slug: 'empty-note',
  category: 'destinations',
  content: '',
  lastModified: new Date(),
}

export const Default: Story = {
  render: (args: InlineContentEditorProps) => <InlineContentEditor {...args} />,
  args: {
    contentItem: sampleContentItem,
    category: 'destinations',
    showToolbar: true,
    placeholder: 'Click to add your travel notes...',
  },
}

export const WithoutToolbar: Story = {
  render: (args: InlineContentEditorProps) => <InlineContentEditor {...args} />,
  args: {
    contentItem: sampleContentItem,
    category: 'destinations',
    showToolbar: false,
    placeholder: 'Click to edit...',
  },
}
WithoutToolbar.parameters = {
  docs: {
    description: {
      story: 'Inline editor without the formatting toolbar for minimal editing interface.',
    },
  },
}

export const ShortContent: Story = {
  render: (args: InlineContentEditorProps) => <InlineContentEditor {...args} />,
  args: {
    contentItem: shortContentItem,
    category: 'destinations',
    showToolbar: true,
    placeholder: 'Add a quick note...',
  },
}
ShortContent.parameters = {
  docs: {
    description: {
      story: 'Inline editor with short content to demonstrate the compact interface.',
    },
  },
}

export const EmptyContent: Story = {
  render: (args: InlineContentEditorProps) => <InlineContentEditor {...args} />,
  args: {
    contentItem: emptyContentItem,
    category: 'destinations',
    showToolbar: true,
    placeholder: 'Click here to add your first travel note...',
  },
}
EmptyContent.parameters = {
  docs: {
    description: {
      story: 'Inline editor with empty content showing the placeholder state.',
    },
  },
}

export const ItineraryNote: Story = {
  render: (args: InlineContentEditorProps) => <InlineContentEditor {...args} />,
  args: {
    contentItem: {
      id: 'itinerary-note',
      title: 'Itinerary Note',
      slug: 'itinerary-note',
      category: 'itinerary',
      content: `
        <ul class="task-list">
          <li><input type="checkbox" checked> Pack sunscreen</li>
          <li><input type="checkbox"> Confirm hotel check-in time</li>
          <li><input type="checkbox"> Download offline maps</li>
        </ul>
        <p><strong>Meeting point:</strong> Hotel lobby at 8:00 AM</p>
      `,
      lastModified: new Date(),
    },
    category: 'itinerary',
    showToolbar: true,
    placeholder: 'Add itinerary notes...',
  },
}
ItineraryNote.parameters = {
  docs: {
    description: {
      story: 'Inline editor for itinerary content with task lists and scheduling notes.',
    },
  },
}

export const BudgetNote: Story = {
  render: (args: InlineContentEditorProps) => <InlineContentEditor {...args} />,
  args: {
    contentItem: {
      id: 'budget-note',
      title: 'Budget Note',
      slug: 'budget-note',
      category: 'budget',
      content: `
        <p><strong>Daily Budget:</strong> $150</p>
        <ul>
          <li>Meals: $50</li>
          <li>Transport: $20</li>
          <li>Activities: $60</li>
          <li>Miscellaneous: $20</li>
        </ul>
        <blockquote>
          <p>💡 Tip: Keep receipts for tax deduction!</p>
        </blockquote>
      `,
      lastModified: new Date(),
    },
    category: 'budget',
    showToolbar: true,
    placeholder: 'Add budget notes...',
  },
}
BudgetNote.parameters = {
  docs: {
    description: {
      story: 'Inline editor for budget content with financial information and tips.',
    },
  },
}

export const MultipleEditors: Story = () => (
  <div className='space-y-8'>
    <div>
      <h3 className='text-lg font-semibold mb-4'>Travel Notes</h3>
      <InlineContentEditor
        contentItem={sampleContentItem}
        category='destinations'
        showToolbar={true}
        placeholder='Add travel notes...'
      />
    </div>

    <div>
      <h3 className='text-lg font-semibold mb-4'>Quick Reminder</h3>
      <InlineContentEditor
        contentItem={shortContentItem}
        category='destinations'
        showToolbar={false}
        placeholder='Add a quick reminder...'
      />
    </div>

    <div>
      <h3 className='text-lg font-semibold mb-4'>New Note</h3>
      <InlineContentEditor
        contentItem={emptyContentItem}
        category='destinations'
        showToolbar={true}
        placeholder='Click to add your first note...'
      />
    </div>
  </div>
)
MultipleEditors.parameters = {
  docs: {
    description: {
      story:
        'Multiple inline editors showing how they can be used together in a content management interface.',
    },
  },
}
